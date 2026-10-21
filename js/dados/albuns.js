// Música (conteudo/musica-e-links.md). Só links oficiais e capas dos lançamentos do Franklin.
// Ordem da página: lançamento mais recente, série dos Salmos, Provérbios e os demais.
//
// Campos de um álbum:
//   slug, titulo, base, estilo, faixas (número) — obrigatórios
//   serie, volume, subtitulo   — álbuns que fazem parte de uma obra maior
//   lancamento ('AAAA-MM-DD'), spotifyId (álbum), capa ('imagens/albuns/<slug>' sem -480/-960.webp)
//   resumo     — uma frase para cartões e para o topo da página do álbum
//   faixasLista — [{ titulo, texto }] (texto = referência bíblica)
//   notas      — "Por trás do álbum": parágrafos curtos sobre como o álbum foi feito
//   situacao   — aviso quando ainda não há links

// Perfis oficiais de artista (links sem parâmetros de rastreio ?si= / utm_).
export const artista = {
  spotifyId: '3GPXN15BS5UPhtmy94hwsR',
  spotify: 'https://open.spotify.com/artist/3GPXN15BS5UPhtmy94hwsR',
  youtubeMusic: 'https://music.youtube.com/@franklincarvalho-oficial',
};

// Obras em vários volumes (a página do álbum mostra os irmãos).
export const series = {
  'tratado-de-romanos': {
    titulo: 'Tratado de Romanos',
    resumo: 'A carta aos Romanos inteira em quatro volumes, um por ato, cantada na tradução Almeida (domínio público).',
    planejado: 'Quatro volumes e 34 faixas. Cada volume termina onde o próprio texto fecha um ato: 4.25, 8.39, 11.36 e 16.25-27, que reencontra as palavras do começo da carta (1.1-5).',
    aCaminho: 'Vol. III (Romanos 9–11) e Vol. IV (Romanos 12–16) estão a caminho.',
  },
};

export const albuns = [
  {
    slug: 'reinara-a-graca',
    serie: 'tratado-de-romanos', volume: 'II',
    titulo: 'Reinará a Graça', subtitulo: 'Tratado de Romanos, Vol. II',
    base: 'Romanos 5–8', estilo: 'Nu-metal e metal alternativo', faixas: 9,
    lancamento: '2026-10-03', spotifyId: '0gFuqI5kLJjNuafW25r81d',
    capa: 'imagens/albuns/tratado-de-romanos-vol-2', destaque: true,
    frase: 'De “quem me livrará” a “quem nos separará”.',
    resumo: 'Da paz com Deus ao “nada nos separará”: Romanos 5 a 8 em nove faixas.',
    faixasLista: [
      { titulo: 'Enquanto Éramos Inimigos', texto: 'Romanos 5.1-11' },
      { titulo: 'Dois Adãos', texto: 'Romanos 5.12-21' },
      { titulo: 'Sepultados', texto: 'Romanos 6.1-14' },
      { titulo: 'O Salário', texto: 'Romanos 6.15-23' },
      { titulo: 'Miserável Homem', texto: 'Romanos 7.1-25' },
      { titulo: 'Nenhuma Condenação', texto: 'Romanos 8.1-11' },
      { titulo: 'Abba', texto: 'Romanos 8.12-17' },
      { titulo: 'O Gemido', texto: 'Romanos 8.18-30' },
      { titulo: 'Quem Nos Separará', texto: 'Romanos 8.31-39' },
    ],
    notas: [
      { titulo: 'Sem ar, depois o ar entrando', texto: 'O disco gira em torno de duas faixas vizinhas. “Miserável Homem” (Romanos 7) termina perguntando quem vai livrar; “Nenhuma Condenação” (Romanos 8) responde logo em seguida. Romanos 7 tinha que soar sem ar. Romanos 8, como o ar voltando.' },
      { titulo: 'A única fora do padrão', texto: '“Miserável Homem” é a única faixa que sai da base sonora do projeto: um nu-metal lento, a 66 batidas por minuto. A letra final é uma versão mais enxuta, que abre sussurrando “não cobiçarás” e troca o grito por um silêncio dentro do refrão.' },
      { titulo: 'Abba não é balada', texto: 'A primeira versão de “Abba” saiu pesada demais. A nova ficou no mínimo: baixo e voz quase sozinhos, com um refrão que abre sem aumentar o volume.' },
      { titulo: 'A capa', texto: 'Mãos de pedra abertas, com as correntes partidas ao lado, e o vermelho profundo como cor do volume: o domínio que mudou de mão.' },
    ],
  },
  {
    slug: 'toda-boca-se-cale',
    serie: 'tratado-de-romanos', volume: 'I',
    titulo: 'Toda Boca Se Cale', subtitulo: 'Tratado de Romanos, Vol. I',
    base: 'Romanos 1–4', estilo: 'Nu-metal e metal alternativo', faixas: 8,
    lancamento: '2026-09-16', spotifyId: '11GUZ9cbmvq0etqGEA1Swe',
    capa: 'imagens/albuns/tratado-de-romanos-vol-1',
    frase: 'A acusação e a absolvição que ninguém pediu.',
    resumo: 'Romanos 1 a 4: o tribunal em que todos se calam e a justiça que vem de graça.',
    faixasLista: [
      { titulo: 'Não Me Envergonho', texto: 'Romanos 1.16-17' },
      { titulo: 'Entregues', texto: 'Romanos 1.18-32' },
      { titulo: 'O Banco dos Réus', texto: 'Romanos 2.1-16' },
      { titulo: 'Feita Por Dentro', texto: 'Romanos 2.17-29' },
      { titulo: 'Não Há Um Justo', texto: 'Romanos 3.9-20' },
      { titulo: 'Mas Agora', texto: 'Romanos 3.21-31' },
      { titulo: 'Creditado', texto: 'Romanos 4.1-12' },
      { titulo: 'Contra a Esperança', texto: 'Romanos 4.13-25' },
    ],
    notas: [
      { titulo: 'Um tribunal', texto: 'O volume segue o argumento de Paulo como um julgamento: a tese, a acusação, o juiz que vira réu, a religião de fachada, a sentença e, em “Mas Agora”, a virada. Quem ouve entra como espectador e sai como réu absolvido.' },
      { titulo: 'As preferidas viraram a regra', texto: '“Entregues”, “O Banco dos Réus” e “Não Há Um Justo” foram as preferidas na escuta. O que as três tinham em comum virou a base sonora do projeto inteiro, e as outras faixas foram refeitas nessa base sem mudar uma palavra da letra.' },
      { titulo: 'A que não cresce', texto: '“Creditado” é a única faixa que não cresce, de propósito. E “Não Me Envergonho” abre o disco cantável por uma igreja: o projeto não podia alcançar só quem gosta de rock.' },
      { titulo: 'A capa', texto: 'Uma boca de pedra fechada, com uma trinca no lábio. É o título ao pé da letra: “para que toda boca se cale” (Romanos 3.19).' },
    ],
  },
  { slug: 'o-reino-inabalavel', titulo: 'O Reino Inabalável', base: '', estilo: '', faixas: 15, situacao: 'No Spotify e no YouTube Music (perfil de artista acima).' },
  { slug: 'rugido-dos-justos', titulo: 'Rugido dos Justos', base: 'Salmos 1–35', estilo: '', faixas: null },
  { slug: 'fogo-devorador', titulo: 'Fogo Devorador', base: 'Salmos 36–50', estilo: 'Rock', faixas: null, situacao: 'Relançamento (antigo "Trono de Fogo"). Links em breve.' },
  { slug: 'altar-da-contricao', titulo: 'Altar da Contrição', base: 'Salmos 51–65', estilo: '', faixas: null },
  { slug: 'santuario-do-altissimo', titulo: 'Santuário do Altíssimo', base: 'Salmos 73–84', estilo: '', faixas: 12 },
  { slug: 'ecos-de-adoracao', titulo: 'Ecos de Adoração', base: 'Salmos 85–96', estilo: 'Doom metal / rock atmosférico', faixas: 12 },
  { slug: 'o-rei-dos-povos', titulo: 'O Rei dos Povos', base: 'Salmos 97–108', estilo: 'Metal épico', faixas: null },
  { slug: 'o-caminho-da-sabedoria', titulo: 'O Caminho da Sabedoria', base: 'Provérbios 1–9', estilo: 'Rap com beat hip hop clássico', faixas: 9 },
  { slug: 'integridade', titulo: 'Integridade', base: 'Provérbios 10–22', estilo: 'Rap intenso e cinematográfico', faixas: 13 },
  { slug: 'codigos-da-eternidade', titulo: 'Códigos da Eternidade', base: 'Antigo Testamento', estilo: 'Rock worship épico', faixas: 21 },
  { slug: 'o-caminho-de-jesus', titulo: 'O Caminho de Jesus', base: 'Evangelhos', estilo: 'Folk-surf acústico', faixas: 10 },
];

export const buscarAlbum = (slug) => albuns.find((a) => a.slug === slug);
export const albumDestaque = () => albuns.find((a) => a.destaque) || albuns[0];

// Faixas dos Salmos já cobertas, a partir do campo base ("Salmos 1–35").
export function salmosCobertos() {
  return albuns.flatMap((a) => {
    const m = /^Salmos (\d+)[–-](\d+)$/.exec(a.base || '');
    return m ? [{ de: Number(m[1]), ate: Number(m[2]), album: a }] : [];
  }).sort((x, y) => x.de - y.de);
}
