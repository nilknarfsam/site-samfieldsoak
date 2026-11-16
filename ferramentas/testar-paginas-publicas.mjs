import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, cpSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { listarPaginasPublicas, paginaPorRota, IMAGEM_PADRAO } from '../js/modules/paginas-publicas.js';
import { renderizarPassagem, renderizarSitemap, conferirJpeg } from './lib/paginas-publicas.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const paginas = listarPaginasPublicas();

test('cadastro público tem destinos únicos e não cria páginas para chamadas de Novidades', () => {
  assert.equal(new Set(paginas.map((p) => p.url)).size, paginas.length);
  assert.equal(paginaPorRota('#/musica/santuario-do-altissimo').caminho, '/p/musica/santuario-do-altissimo/');
  assert.equal(paginaPorRota('#/busca'), undefined);
  const amostra = listarPaginasPublicas({ novidades: [{ slug: 'chamada', rota: '#/palavra/estudo' }],
    reflexoes: [{ slug: 'estudo', titulo: 'Um estudo', resumo: 'Resumo' }] });
  assert.equal(amostra.length, 1);
  assert.equal(amostra[0].imagem, IMAGEM_PADRAO);
  assert.throws(() => listarPaginasPublicas({ albuns: [{ slug: '../fora' }] }), /Slug inválido/);
});

test('HTML escapa aspas, &, < e mantém texto visível e metadados próprios', () => {
  const p = listarPaginasPublicas({ reflexoes: [{ slug: 'amostra', titulo: 'Um "título" & <b>texto</b>',
    resumo: 'Resumo com \'aspas\' & <script>texto</script>' }] })[0];
  const html = renderizarPassagem(p);
  assert.ok(html.includes('<h1>Um &quot;título&quot; &amp; &lt;b&gt;texto&lt;/b&gt;</h1>'));
  assert.ok(html.includes('Resumo com &#39;aspas&#39; &amp; &lt;script&gt;texto&lt;/script&gt;'));
  assert.ok(html.includes(`property="og:url" content="${p.url}"`));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(html.includes(`rel="canonical" href="${p.url}"`));
  assert.ok(html.includes(`location.replace("/${p.rota}")`));
  assert.ok(html.includes(`href="/${p.rota}">Abrir página</a>`));
  assert.doesNotMatch(html, /goatcounter|count\.js|js\/main|http-equiv="refresh"/i);
});

test('sitemap contém a raiz e todos os links permanentes, sem hash ou datas presumidas', () => {
  const xml = renderizarSitemap(paginas);
  assert.equal((xml.match(/<loc>/g) || []).length, paginas.length + 1);
  for (const p of paginas) assert.ok(xml.includes(`<loc>${p.url}</loc>`));
  assert.doesNotMatch(xml, /#|<lastmod>/);
});

test('todas as imagens prontas são JPEG 1200x630 com menos de 300.000 bytes', () => {
  for (const imagem of new Set(paginas.map((p) => p.imagem))) {
    assert.doesNotThrow(() => conferirJpeg(readFileSync(join(raiz, imagem)), imagem));
  }
  assert.throws(() => conferirJpeg(Buffer.alloc(300000), 'grande.jpg'), /menos de 300/);
  const bytes = Buffer.from(readFileSync(join(raiz, IMAGEM_PADRAO)));
  let pos = 2;
  while (bytes[pos + 1] !== 0xc0 && bytes[pos + 1] !== 0xc2) pos += 2 + bytes.readUInt16BE(pos + 2);
  bytes.writeUInt16BE(1, pos + 7); // largura no marcador SOF
  assert.throws(() => conferirJpeg(bytes, 'dimensao.jpg'), /1200x630/);
});

// Ensaios negativos em cópia isolada: --check precisa falhar sem corrigir os arquivos.
const copia = mkdtempSync(join(tmpdir(), 'site-paginas-publicas-'));
for (const pasta of ['js', 'css', 'imagens', 'p', 'ferramentas/lib']) {
  cpSync(join(raiz, pasta), join(copia, pasta), { recursive: true });
}
mkdirSync(join(copia, 'ferramentas'), { recursive: true });
cpSync(join(raiz, 'ferramentas/gerar-paginas.mjs'), join(copia, 'ferramentas/gerar-paginas.mjs'));
cpSync(join(raiz, 'sitemap.xml'), join(copia, 'sitemap.xml'));
after(() => rmSync(copia, { recursive: true, force: true }));
const executar = () => spawnSync(process.execPath, ['ferramentas/gerar-paginas.mjs', '--check'],
  { cwd: copia, env: { ...process.env, PYTHON: 'nao-existe-ci-nao-processa-imagens' }, encoding: 'utf8', timeout: 15000 });

test('--check aprova arquivos atuais sem Python/Pillow', () => {
  const r = executar();
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

for (const [nome, caminho, alterar] of [
  ['HTML alterado', `p/${paginas[0].secao}/${paginas[0].slug}/index.html`, (s) => s + '\nManual'],
  ['sitemap antigo', 'sitemap.xml', () => '<xml>antigo</xml>'],
  ['capa-fonte alterada', paginas.find((p) => p.fonteImagem).fonteImagem, (s) => Buffer.concat([s, Buffer.from('alterada')])],
]) {
  test(`--check rejeita ${nome} e não grava correções`, () => {
    const arquivo = join(copia, caminho);
    const original = readFileSync(arquivo);
    const mudado = alterar(nome === 'capa-fonte alterada' ? original : original.toString('utf8'));
    writeFileSync(arquivo, mudado);
    try {
      const r = executar();
      assert.equal(r.status, 1, r.stdout + r.stderr);
      assert.match(r.stderr, /desatualizado/);
      assert.deepEqual(readFileSync(arquivo), Buffer.from(mudado));
    } finally { writeFileSync(arquivo, original); }
  });
}

test('--check rejeita página ausente', () => {
  const caminho = `p/${paginas[0].secao}/${paginas[0].slug}/index.html`;
  const original = readFileSync(join(copia, caminho));
  rmSync(join(copia, caminho));
  try {
    const r = executar();
    assert.equal(r.status, 1);
    assert.match(r.stderr, /Ausente ou desatualizado/);
  } finally { writeFileSync(join(copia, caminho), original); }
});
