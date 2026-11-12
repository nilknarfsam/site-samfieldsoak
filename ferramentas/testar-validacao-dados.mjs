// Regressões do validador real, executado em cópias temporárias: nunca altera o cadastro publicado.
// Uso: node --test ferramentas/testar-validacao-dados.mjs (Node 22+, sem dependências).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const copia = mkdtempSync(join(tmpdir(), 'site-validacao-'));
mkdirSync(join(copia, 'ferramentas'));
cpSync(join(raiz, 'js/dados'), join(copia, 'js/dados'), { recursive: true });
cpSync(join(raiz, 'js/main.js'), join(copia, 'js/main.js'));
cpSync(join(raiz, 'ferramentas/conferir-dados.mjs'), join(copia, 'ferramentas/conferir-dados.mjs'));
// As imagens só são consultadas pelo validador; não são copiadas nem modificadas.
symlinkSync(join(raiz, 'imagens'), join(copia, 'imagens'), 'dir');

function executar(arquivo, alteracao = '') {
  const destino = arquivo && join(copia, arquivo);
  const original = destino && readFileSync(destino, 'utf8');
  if (destino) writeFileSync(destino, original + '\n' + alteracao + '\n');
  try {
    return spawnSync(process.execPath, [join(copia, 'ferramentas/conferir-dados.mjs')],
      { encoding: 'utf8', timeout: 15000 });
  } finally {
    if (destino) writeFileSync(destino, original);
  }
}

const casos = [
  ['buraco no cadastro', 'ferramentas.js', 'ferramentas.length++;', /posição vazia na lista/],
  ['null no cadastro', 'ferramentas.js', 'ferramentas.push(null);', /entrada nula ou indefinida/],
  ['undefined no cadastro', 'ferramentas.js', 'ferramentas.push(undefined);', /entrada nula ou indefinida/],
  ['texto no lugar de artigo', 'ferramentas.js', "ferramentas.push('artigo');", /entrada precisa ser um objeto/],
  ['número no lugar de artigo', 'ferramentas.js', 'ferramentas.push(42);', /entrada precisa ser um objeto/],
  ['lista no lugar de artigo', 'ferramentas.js', 'ferramentas.push([]);', /entrada precisa ser um objeto/],
  ['buraco em Novidades', 'novidades.js', 'novidades.length++;', /posição vazia na lista/],
  ['null em Palavra', 'reflexoes.js', 'reflexoes.push(null);', /entrada nula ou indefinida/],
  ['buraco nos papéis do perfil', 'perfil.js', 'perfil.papeis.length++;', /posição vazia na lista/],
  ['buraco dentro do artigo', 'ferramentas.js', 'ferramentas[0].verdade.length++;', /posição vazia na lista/],
  ['null dentro do artigo', 'ferramentas.js', 'ferramentas[0].verdade.push(null);', /entrada nula ou indefinida/],
  ['número no lugar de parágrafo', 'ferramentas.js', 'ferramentas[0].verdade.push(42);', /entrada precisa ser texto não vazio/],
  ['objeto no lugar da lista de parágrafos', 'ferramentas.js', 'ferramentas[0].verdade = {};', /precisa ser uma lista/],
  ['texto no lugar da fonte', 'ferramentas.js', "ferramentas[0].fontes = ['site'];", /entrada precisa ser um objeto/],
  ['título e nome ausentes', 'ferramentas.js', 'delete ferramentas[0].titulo; delete ferramentas[0].nome;', /precisa de titulo ou nome/],
  ['resumo vazio', 'ferramentas.js', "ferramentas[0].resumo = '  ';", /resumo precisa ser texto não vazio/],
  ['categoria desconhecida', 'ferramentas.js', "ferramentas[0].categoria = 'inventada';", /categoria desconhecida/],
  ['data de conferência impossível', 'ferramentas.js', "ferramentas[0].conferidoEm = '2026-02-30';", /fontes sem conferidoEm válido/],
  ['nenhuma fonte ou link', 'ferramentas.js', 'ferramentas[0].fontes = []; ferramentas[0].links = [];', /precisa de fontes ou links oficiais/],
  ['fonte sem rótulo', 'ferramentas.js', "ferramentas[0].fontes = [{url:'https://example.com'}];", /precisa de rotulo e url https/],
  ['fonte sem https', 'ferramentas.js', "ferramentas[0].fontes = [{rotulo:'Fonte',url:'http://example.com'}];", /precisa de rotulo e url https/],
  ['artigo interno inexistente', 'novidades.js', "novidades[0].rota = '#/ia-sem-labia/artigo-inexistente';", /destino interno não existe/],
  ['seção interna inexistente', 'links.js', "linksBio[0].destino = '#/secao-inexistente';", /destino interno não existe/],
  ['âncora musical inexistente', 'links.js', "linksBio[0].destino = '#/musica/secao-inexistente';", /destino interno não existe/],
  ['single sem página de detalhe', 'links.js', "linksBio[0].destino = '#/musica/pelo-teu-nome';", /destino interno não existe/],
  ['buraco em letra', 'letras/romanos.js', "letras['toda-boca-se-cale'][0].length++;", /posição vazia na lista/],
  ['falha durante importação', 'ferramentas.js', "throw new Error('amostra de falha na importação');", /Não foi possível ler.*amostra de falha/],
];

test('cadastro atual passa no validador real', () => {
  const r = executar();
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /✅ Dados conferidos/);
});

for (const [nome, arquivo, alteracao, mensagem] of casos) {
  test(nome, () => {
    const r = executar('js/dados/' + arquivo, alteracao);
    assert.equal(r.status, 1, r.stdout + r.stderr);
    assert.match(r.stdout + r.stderr, mensagem);
    assert.doesNotMatch(r.stdout, /✅ Dados conferidos/);
  });
}

for (const [nome, alteracao] of [
  ['nome como alternativa ao título', "delete ferramentas[0].titulo; ferramentas[0].nome = 'Nome válido';"],
  ['links oficiais como fontes do cadastro antigo', 'ferramentas[0].fontes = [];'],
]) {
  test(nome, () => {
    const r = executar('js/dados/ferramentas.js', alteracao);
    assert.equal(r.status, 0, r.stdout + r.stderr);
  });
}

test('âncoras musicais e páginas de detalhe válidas continuam aceitas', () => {
  for (const destino of ['#/musica/discografia', '#/musica/como-eu-faco',
    '#/ia-sem-labia/precisa-pagar-antivirus', '#/palavra/balsamo-de-gileade']) {
    const r = executar('js/dados/links.js', `linksBio[0].destino = '${destino}';`);
    assert.equal(r.status, 0, r.stdout + r.stderr);
  }
});
