// Casos do índice em memória, sem navegador ou alteração dos dados publicados.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criarIndiceBusca, buscarNoIndice } from '../js/modules/busca.js';
import { resultadoBusca } from '../js/modules/templates-busca.js';
import { novidades } from '../js/dados/novidades.js';
import { ferramentas } from '../js/dados/ferramentas.js';
import { reflexoes } from '../js/dados/reflexoes.js';
import { albuns } from '../js/dados/albuns.js';

const dados = { novidades, ferramentas, reflexoes, albuns };
const indice = criarIndiceBusca(dados);
const rotas = (termo) => buscarNoIndice(indice, termo).map((item) => item.rota);

test('consultas de referência alcançam estudo, álbum e análise', () => {
  assert.ok(rotas('salmo 73').includes('#/palavra/quando-a-visao-engana'));
  assert.ok(rotas('salmo 73').includes('#/musica/santuario-do-altissimo'));
  assert.ok(rotas('claude').includes('#/ia-sem-labia/ootto'));
  assert.ok(rotas('graça').includes('#/musica/reinara-a-graca'));
});

test('normaliza acentos, caixa, espaços e pontuação', () => {
  assert.deepEqual(rotas('  GRACA  '), rotas('graça'));
  assert.deepEqual(rotas('Salmo: 73'), rotas('salmo 73'));
});

test('consulta vazia ou sem correspondência não devolve catálogo', () => {
  for (const termo of ['', '   ', '!?', 'zzzz92837']) assert.deepEqual(rotas(termo), []);
});

test('anúncio e destino aparecem uma vez, inclusive ao buscar pelo título do anúncio', () => {
  const amostra = criarIndiceBusca({ ferramentas: [{ slug: 'guia', titulo: 'Página principal', resumo: 'Um resumo' }],
    novidades: [{ slug: 'chamada', titulo: 'Título exclusivo do anúncio', rota: '#/ia-sem-labia/guia' }] });
  const encontrados = buscarNoIndice(amostra, 'exclusivo');
  assert.equal(encontrados.length, 1);
  assert.equal(encontrados[0].titulo, 'Página principal');
  assert.equal(encontrados[0].rota, '#/ia-sem-labia/guia');
  assert.deepEqual(rotas('otimizadores'), ['#/ia-sem-labia/otimizadores-de-pc']);
  assert.equal(new Set(indice.map((item) => item.rota)).size, indice.length);
});

test('termos são combinados, título tem prioridade e não há mutação do índice', () => {
  const amostra = criarIndiceBusca({ reflexoes: [
    { slug: 'resumo', titulo: 'Outra página', resumo: 'Graça de Deus' },
    { slug: 'titulo', titulo: 'Graça de Deus', resumo: '' },
  ] });
  const antes = structuredClone(amostra);
  assert.equal(buscarNoIndice(amostra, 'graça deus')[0].rota, '#/palavra/titulo');
  assert.deepEqual(buscarNoIndice(amostra, 'graça inexistente'), []);
  assert.deepEqual(amostra, antes);
});

test('indexa metadados e referências das faixas sem copiar corpo ou letras', () => {
  const amostra = criarIndiceBusca({ albuns: [{ slug: 'album', titulo: 'Um álbum',
    faixasLista: [{ titulo: 'Uma faixa', texto: 'Salmo 73' }], letras: 'segredo', notas: ['corpo exclusivo'] }],
    reflexoes: [{ slug: 'estudo', titulo: 'Um estudo', temas: ['Esperança'], introducao: ['texto exclusivo'] }] });
  assert.equal(buscarNoIndice(amostra, 'salmo 73').length, 1);
  assert.equal(buscarNoIndice(amostra, 'esperança').length, 1);
  for (const termo of ['segredo', 'exclusivo']) assert.deepEqual(buscarNoIndice(amostra, termo), []);
});

test('template escapa título, resumo, seção e referência', () => {
  const html = resultadoBusca({ titulo: '<img src=x>', resumo: '<script>alert(1)</script>',
    referencia: 'A & B', secao: '<b>Palavra</b>', rota: '#/palavra/estudo' });
  assert.ok(html.includes('&lt;img'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('A &amp; B'));
  assert.ok(html.includes('&lt;b&gt;Palavra&lt;/b&gt;'));
  assert.ok(!html.includes('<script>'));
});
