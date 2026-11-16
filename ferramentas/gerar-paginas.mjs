// Gera os arquivos versionados. --check só lê e confere; não precisa de Pillow.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { listarPaginasPublicas, IMAGEM_PADRAO } from '../js/modules/paginas-publicas.js';
import { renderizarPassagem, renderizarSitemap, conferirJpeg } from './lib/paginas-publicas.mjs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const conferir = process.argv.includes('--check');
const paginas = listarPaginasPublicas();
const erros = [];
const caminhoManifesto = 'imagens/compartilhar/geradas/fontes.json';
const fundo = readFileSync(join(raiz, 'css/variaveis.css'), 'utf8').match(/--cor-fundo:\s*(#[0-9a-f]{6})/i)?.[1];
if (!fundo) throw new Error('Token --cor-fundo não encontrado');

function fonteLocal(caminho) {
  if (!/^imagens\/[a-zA-Z0-9_./-]+$/.test(caminho) || caminho.split('/').includes('..')) throw new Error(`Capa inválida: ${caminho}`);
  return readFileSync(join(raiz, caminho));
}

function escrever(caminho, conteudo) {
  const destino = join(raiz, caminho);
  if (existsSync(destino) && readFileSync(destino, 'utf8') === conteudo) return;
  if (conferir) { erros.push(`Ausente ou desatualizado: ${caminho}`); return; }
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, conteudo);
}

try {
  const imagens = paginas.filter((p) => p.fonteImagem).map((p) => ({ fonte: p.fonteImagem, destino: p.imagem,
    sha256: createHash('sha256').update(fonteLocal(p.fonteImagem)).digest('hex') }));
  const manifesto = { versao: 1, fundo, largura: 1200, altura: 630, ajuste: 'conter-centralizado', imagens };
  const anterior = existsSync(join(raiz, caminhoManifesto)) ? JSON.parse(readFileSync(join(raiz, caminhoManifesto), 'utf8')) : null;
  if (!conferir) {
    const imagemValida = (item) => {
      try { conferirJpeg(readFileSync(join(raiz, item.destino)), item.destino); return true; }
      catch { return false; }
    };
    const preparar = imagens.filter((item) => !imagemValida(item)
      || anterior?.versao !== manifesto.versao || anterior?.fundo !== fundo
      || !anterior?.imagens?.some((a) => a.fonte === item.fonte && a.destino === item.destino && a.sha256 === item.sha256));
    if (preparar.length) {
      const python = spawnSync(process.env.PYTHON || 'python3', [join(raiz, 'ferramentas/preparar-compartilhamento.py')],
        { input: JSON.stringify({ fundo, imagens: preparar }), encoding: 'utf8' });
      if (python.status !== 0) throw new Error(`Não foi possível preparar as capas com Pillow. ${python.error?.message || python.stderr}`);
    }
  }
  for (const imagem of new Set([IMAGEM_PADRAO, ...imagens.map((i) => i.destino)])) {
    try { conferirJpeg(readFileSync(join(raiz, imagem)), imagem); }
    catch (e) { erros.push(e.message); }
  }
  // A assinatura da fonte acusa capa alterada sem regenerar. O CI nunca processa pixels.
  escrever(caminhoManifesto, JSON.stringify(manifesto, null, 2) + '\n');
  const esperados = new Set(paginas.map((p) => `p/${p.secao}/${p.slug}/index.html`));
  const percorrer = (pasta) => {
    if (!existsSync(join(raiz, pasta))) return;
    for (const item of readdirSync(join(raiz, pasta), { withFileTypes: true })) {
      const caminho = `${pasta}/${item.name}`;
      if (item.isDirectory()) percorrer(caminho);
      else if (!esperados.has(caminho)) erros.push(`Arquivo sem cadastro: ${caminho}. Não foi apagado; revisar a permanência desse link.`);
    }
  };
  percorrer('p');
  paginas.forEach((p) => escrever(`p/${p.secao}/${p.slug}/index.html`, renderizarPassagem(p)));
  escrever('sitemap.xml', renderizarSitemap(paginas));
  if (erros.length) throw new Error(erros.join('\n'));
  console.log(`✅ ${paginas.length} páginas permanentes, ${imagens.length} capas e sitemap ${conferir ? 'conferidos' : 'gerados'}.`);
} catch (e) {
  console.error(`❌ ${e.message}\nRode: node ferramentas/gerar-paginas.mjs (Python 3 + Pillow para adaptar capas novas).`);
  process.exitCode = 1;
}
