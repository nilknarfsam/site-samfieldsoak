// Novidades: a pilha de publicações do site. A mais nova aparece primeiro, sozinha:
// o site ordena pela data. Para publicar, ACRESCENTE uma entrada no fim da lista
// (não precisa mexer na ordem). No mesmo dia, a que estiver mais abaixo aparece primeiro.
//
// Passo a passo para quem publica (Claude ou ChatGPT/Codex): docs/07-novidades.md.
//
// Campos:
//   slug       obrigatório. Minúsculas, sem acento, com hífen. Único.
//   data       obrigatório. 'AAAA-MM-DD' (dia da publicação).
//   tema       obrigatório. 'tecnologia' | 'musica' | 'palavra' | 'site'.
//   titulo     obrigatório. Curto.
//   resumo     obrigatório. Uma ou duas frases (aparece no cartão).
//   rota       opcional. Se a novidade só aponta para uma página que já existe no site
//              (ex.: '#/musica/o-despertar-do-justo'), use rota e deixe paragrafos vazio.
//   paragrafos opcional. Texto da página própria (#/novidades/<slug>). Cada item é um parágrafo.
//              "## " no começo vira subtítulo; "- " no começo vira item de lista.
//   links      opcional. [{ rotulo, url }] (links úteis para o leitor).
//   fontes     opcional. [{ rotulo, url }] (de onde veio a informação; obrigatório em tecnologia).
//   conferidoEm opcional. 'AAAA-MM-DD' (quando as fontes foram conferidas).
//   arte       opcional. 'pendente' enquanto o carrossel não chegou (a novidade entra no ar sem imagem).
//   carrossel  opcional. { capa, post, cards: [{ src, alt }] }. Imagens em imagens/novidades/<slug>/.

export const temasNovidade = {
  tecnologia: 'Tecnologia',
  musica: 'Música',
  palavra: 'Palavra',
  site: 'Site',
};

const lista = [
  {
    slug: 'quatro-pregacoes-novas',
    data: '2026-10-21',
    tema: 'palavra',
    titulo: 'Quatro pregações novas na Palavra',
    resumo: 'Salmo 73, o mistério dos machados (Salmo 74), Salmo 94 e Melquisedeque (Hebreus 7), ponto a ponto.',
    rota: '#/palavra',
  },
  {
    slug: 'letras-despertar-e-inabalavel',
    data: '2026-10-21',
    tema: 'musica',
    titulo: 'Letras de O Despertar do Justo e O Reino Inabalável',
    resumo: 'Agora dá para ler a letra de cada faixa dos dois álbuns, direto na página do álbum.',
    rota: '#/musica/o-despertar-do-justo',
  },
  {
    slug: 'nova-pagina-novidades',
    data: '2026-10-23',
    tema: 'site',
    titulo: 'Nova página: Novidades',
    resumo: 'Tudo o que entra no site, num lugar só, com o mais novo sempre em cima.',
    paragrafos: [
      'A partir de hoje, cada coisa nova que eu publicar aqui aparece nesta página, em pilha: a mais recente fica em primeiro lugar.',
      '## O que vai aparecer',
      '- Tecnologia: novidades de IA e programação, explicadas sem exagero e com fonte.',
      '- Música: lançamentos e letras novas.',
      '- Palavra: pregações e reflexões novas.',
      'Dá para filtrar pelo tema no topo da página.',
    ],
  },
];

// Mais nova primeiro; no mesmo dia, a que foi acrescentada por último vem antes.
export const novidades = lista
  .map((n, i) => ({ ...n, _ordem: i }))
  .sort((a, b) => (a.data === b.data ? b._ordem - a._ordem : b.data.localeCompare(a.data)));

export const buscarNovidade = (slug) => novidades.find((n) => n.slug === slug);

// Para onde o cartão leva: a página que já existe (rota) ou a página própria da novidade.
export const rotaNovidade = (n) => n.rota || `#/novidades/${encodeURIComponent(n.slug)}`;
