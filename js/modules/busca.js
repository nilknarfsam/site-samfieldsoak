import { rotuloCategoria } from './templates.js';

// Índice em memória, feito só com os metadados públicos; não lê letras nem o corpo dos artigos.
export const normalizarBusca = (texto) => String(texto ?? '').normalize('NFD')
  .replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR')
  .replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export function criarIndiceBusca({ novidades = [], ferramentas = [], reflexoes = [], albuns = [] }) {
  const paginas = new Map();
  const adicionar = (item, secao, rota, extras = []) => {
    const titulo = item.titulo || item.nome;
    const resumo = item.resumo || item.descricao || '';
    const referencia = item.referencia || item.base || '';
    const texto = normalizarBusca([titulo, resumo, referencia, ...extras].join(' '));
    if (paginas.has(rota)) {
      // A chamada em Novidades acrescenta termos ao destino, sem duplicar o resultado.
      paginas.get(rota).texto += ' ' + texto;
      return;
    }
    paginas.set(rota, { titulo, resumo, referencia, secao, rota, texto, tituloNormalizado: normalizarBusca(titulo) });
  };
  ferramentas.forEach((f) => adicionar(f, 'IA sem lábia', `#/ia-sem-labia/${f.slug}`, [f.categoria, rotuloCategoria(f.categoria)]));
  reflexoes.forEach((r) => adicionar(r, 'Palavra', `#/palavra/${r.slug}`, [r.livro, ...(r.temas || [])]));
  albuns.forEach((a) => adicionar(a, 'Música', `#/musica/${a.slug}`,
    [a.subtitulo, a.serie, a.estilo, ...(a.faixasLista || []).flatMap((f) => [f.titulo, f.texto])]));
  const secoes = { novidades: 'Novidades', 'ia-sem-labia': 'IA sem lábia', palavra: 'Palavra', musica: 'Música' };
  novidades.forEach((n) => adicionar(n, secoes[n.rota?.split('/')[1]] || 'Novidades',
    n.rota || `#/novidades/${n.slug}`, [n.tema]));
  return [...paginas.values()];
}

export function buscarNoIndice(indice, termo) {
  const frase = normalizarBusca(termo);
  if (!frase) return [];
  const palavras = frase.split(/\s+/);
  const prioridade = (item) => item.tituloNormalizado.includes(frase) ? 0
    : palavras.every((p) => item.tituloNormalizado.includes(p)) ? 1 : 2;
  return indice.filter((item) => palavras.every((p) => item.texto.includes(p)))
    .sort((a, b) => prioridade(a) - prioridade(b) || a.titulo.localeCompare(b.titulo, 'pt-BR'));
}
