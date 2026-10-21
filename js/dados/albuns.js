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
  salmos: {
    titulo: 'A série dos Salmos',
    resumo: 'O livro dos Salmos cantado em ordem, doze salmos por álbum.',
    planejado: 'Já lançados: álbuns 1 a 4 (Salmos 1–48) e 7 a 9 (Salmos 73–108).',
  },
};

// As primeiras versões: álbuns antigos que ficaram só no Suno (abertos para ouvir sem conta).
// Saíram do Spotify por um problema na distribuidora; a obra foi refeita em novos estilos.
export const primeirasVersoes = {
  texto: 'Antes da série que está hoje no Spotify, eu já tinha transformado os Salmos e outros livros da Bíblia em música, em outros estilos. Precisei tirar esses álbuns das plataformas por um problema na distribuidora e aproveitei para refazer tudo do zero. As primeiras versões continuam no Suno, e qualquer pessoa pode ouvir sem precisar de conta.',
  albuns: [
    { titulo: 'Rugido dos Justos', slug: 'rugido-dos-justos', capa: 'imagens/albuns/rugido-dos-justos', base: 'Salmos 1–35', estilo: '', suno: 'https://suno.com/s/3Vb7kwK3TAKQWNuV' },
    { titulo: 'Trono de Fogo', slug: 'trono-de-fogo', capa: 'imagens/albuns/trono-de-fogo', base: 'Salmos 36–50', estilo: 'Rock', suno: 'https://suno.com/s/vPLdRdYVncNyF6xW' },
    { titulo: 'Altar da Contrição', slug: 'altar-da-contricao', capa: 'imagens/albuns/altar-da-contricao', base: 'Salmos 51–65', estilo: '', suno: 'https://suno.com/s/6Nl2r7tjKZKlgEYg' },
    { titulo: 'O Caminho da Sabedoria', slug: 'o-caminho-da-sabedoria', capa: 'imagens/albuns/o-caminho-da-sabedoria', base: 'Provérbios 1–9', estilo: 'Rap com beat hip hop clássico', suno: 'https://suno.com/s/N1BW5uHOBZvKZGpq' },
    { titulo: 'Integridade', slug: 'integridade', capa: 'imagens/albuns/integridade', base: 'Provérbios 10–22', estilo: 'Rap intenso e cinematográfico', suno: 'https://suno.com/s/eqXRvU5wUhsu5ebB' },
    { titulo: 'Códigos da Eternidade', slug: 'codigos-da-eternidade', capa: 'imagens/albuns/codigos-da-eternidade', base: 'Antigo Testamento', estilo: 'Rock worship épico', suno: 'https://suno.com/s/ZAwzn2IRMtpMF5WW' },
    { titulo: 'O Caminho de Jesus', slug: 'o-caminho-de-jesus', capa: 'imagens/albuns/o-caminho-de-jesus', base: 'Evangelhos', estilo: 'Folk-surf acústico', suno: 'https://suno.com/s/O4JAxHbtpTXgS6oS' },
  ],
};

// Singles e EPs oficiais (Spotify).
export const singles = [
  { slug: 'pelo-teu-nome', capa: 'imagens/albuns/pelo-teu-nome', titulo: 'Pelo Teu Nome', base: 'Salmo 54', lancamento: '2026-08-09', spotifyId: '2LzNT6BCFzrPnaTHqypNHf' },
  { slug: 'ao-som-da-harpa', titulo: 'Ao Som da Harpa', base: '', lancamento: '2026-06-27', spotifyId: '2Yq3bSlxaRWG3mZQIwl2z7' },
  { slug: 'o-corre-do-aldeney', capa: 'imagens/albuns/o-corre-do-aldeney', titulo: 'O Corre do Aldeney', base: '', lancamento: '2026-06-18', spotifyId: '3ejdXr4DkkUvuZt47Sfoti' },
];

export const albuns = [
  {
    slug: 'reinara-a-graca',
    serie: 'tratado-de-romanos', volume: 'II',
    titulo: 'Reinará a Graça', subtitulo: 'Tratado de Romanos, Vol. II',
    base: 'Romanos 5–8', estilo: 'Nu-metal e metal alternativo', faixas: 9,
    lancamento: '2026-10-03', spotifyId: '0gFuqI5kLJjNuafW25r81d',
    notaLetras: 'Letras baseadas na tradução Almeida, em domínio público.',
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
    notaLetras: 'Letras baseadas na tradução Almeida, em domínio público.',
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
  {
    slug: 'o-reino-inabalavel',
    titulo: 'O Reino Inabalável', base: 'Hebreus', estilo: '', faixas: 15,
    lancamento: '2026-09-07', spotifyId: '4lCEJvWc3CsPcuhCK5eTcP',
    capa: 'imagens/albuns/o-reino-inabalavel',
    frase: 'A carta aos Hebreus: Cristo acima de tudo, um reino que não pode ser abalado.',
    faixasLista: [
      { titulo: 'Acima dos Anjos - Esplendor da Glória' },
      { titulo: 'O Trono da Graça' },
      { titulo: 'Escrita no Coração - A Nova Aliança' },
      { titulo: 'O Véu Rasgado' },
      { titulo: 'Não Retrocedo - Não Abro Mão' },
      { titulo: 'A Âncora da Alma' },
      { titulo: 'O Meu Descanso - Em Casa' },
      { titulo: 'A Escritura de Posse - Já é Meu' },
      { titulo: 'Olhos Fitos - O Autor e Consumador' },
      { titulo: 'Sacrifício de Louvor - A Oferta' },
      { titulo: 'A Melhor Riqueza' },
      { titulo: 'O Grande Pastor' },
      { titulo: 'O Mesmo Deus - Ontem, Hoje e Sempre' },
      { titulo: 'Inabalável - Monte Sião' },
      { titulo: 'O Único e Suficiente' },
    ],
  },
  { slug: 'a-forca-da-promessa', serie: 'salmos', volume: '3', subtitulo: 'Série dos Salmos, Álbum 3', titulo: 'A Força da Promessa', base: 'Salmos 25–36', estilo: '', faixas: 12, lancamento: '2026-08-16', spotifyId: '3j3YEwJq94gmhfdc8oUoAn', capa: 'imagens/albuns/a-forca-da-promessa' },
  { slug: 'refugio-inabalavel', serie: 'salmos', volume: '2', subtitulo: 'Série dos Salmos, Álbum 2', titulo: 'Refúgio Inabalável', base: 'Salmos 13–24', estilo: '', faixas: 12, lancamento: '2026-08-09', spotifyId: '5VoZbzP2XHzGKJI7tA9AqL', capa: 'imagens/albuns/refugio-inabalavel' },
  { slug: 'o-rei-dos-povos', serie: 'salmos', volume: '9', subtitulo: 'Série dos Salmos, Álbum 9', titulo: 'O Rei dos Povos', base: 'Salmos 97–108', estilo: 'Metal épico', faixas: 12, lancamento: '2026-07-15', spotifyId: '6lLIScGkvmEHiqRMlTgEOP', suno: 'https://suno.com/s/TJ2IG1oF2J1txVIo', capa: 'imagens/albuns/o-rei-dos-povos' },
  { slug: 'o-trono-intocavel', serie: 'salmos', volume: '4', subtitulo: 'Série dos Salmos, Álbum 4', titulo: 'O Trono Intocável', base: 'Salmos 37–48', estilo: '', faixas: 12, lancamento: '2026-06-27', spotifyId: '7CKFwj4A12IwN3ubuf4CSO', capa: 'imagens/albuns/o-trono-intocavel' },
  { slug: 'ecos-de-adoracao', serie: 'salmos', volume: '8', subtitulo: 'Série dos Salmos, Álbum 8', titulo: 'Ecos de Adoração', base: 'Salmos 85–96', estilo: 'Doom metal / rock atmosférico', faixas: 12, lancamento: '2026-05-21', spotifyId: '6E8L5CSoLCFMqGCn2tk8hw', suno: 'https://suno.com/s/mE98iPfpt0KOV6MR', capa: 'imagens/albuns/ecos-de-adoracao' },
  { slug: 'o-despertar-do-justo', serie: 'salmos', volume: '1', subtitulo: 'Série dos Salmos, Álbum 1', titulo: 'O Despertar do Justo', base: 'Salmos 1–12', estilo: '', faixas: 12, lancamento: '2026-04-19', spotifyId: '5mNZTCUDzL64oLjtS6i1K3', capa: 'imagens/albuns/o-despertar-do-justo' },
  { slug: 'santuario-do-altissimo', serie: 'salmos', volume: '7', subtitulo: 'Série dos Salmos, Álbum 7', titulo: 'Santuário do Altíssimo', base: 'Salmos 73–84', estilo: '', faixas: 12, lancamento: '2026-03-20', spotifyId: '5P3UmxFhhORrQmSoxDr8f9', suno: 'https://suno.com/s/MonMgpICt9kvQWml', capa: 'imagens/albuns/santuario-do-altissimo' },
];

export const buscarAlbum = (slug) => albuns.find((a) => a.slug === slug);
export const albumDestaque = () => albuns.find((a) => a.destaque) || albuns[0];

// Faixas dos Salmos já cobertas, a partir do campo base ("Salmos 1–35").
// Salmos já cobertos, a partir do campo base ("Salmos 1–35" nos álbuns, "Salmo 54" nos singles).
// Um single dentro de um trecho que um álbum já cobre não conta de novo.
export function salmosCobertos() {
  const trechos = albuns.flatMap((a) => {
    const m = /^Salmos (\d+)[–-](\d+)$/.exec(a.base || '');
    return m ? [{ de: Number(m[1]), ate: Number(m[2]), album: a }] : [];
  });
  singles.forEach((s) => {
    const m = /^Salmo (\d+)$/.exec(s.base || '');
    if (!m) return;
    const n = Number(m[1]);
    if (!trechos.some((t) => n >= t.de && n <= t.ate)) trechos.push({ de: n, ate: n, album: s, single: true });
  });
  return trechos.sort((x, y) => x.de - y.de);
}

// Transparência: como as músicas são feitas (texto do Franklin, em primeira pessoa).
export const comoFaco = {
  selo: 'Minhas músicas são criadas com IA. Eu escolho o texto bíblico e escrevo as letras com ajuda de IA, revisando cada verso para ficar fiel à Bíblia e teologicamente correto. As vozes e os instrumentos são gerados no Suno, e a masterização é automática, no LANDR.',
  seloCurto: 'Música criada com IA',
  passos: [
    { titulo: 'O texto', texto: 'Escolho o trecho da Bíblia e estudo o que ele diz antes de qualquer coisa.' },
    { titulo: 'A letra', texto: 'Escrevo com ajuda de IA e reviso cada verso para ficar fiel ao texto e teologicamente correto.' },
    { titulo: 'O estilo', texto: 'Defino o som de cada álbum (rock, metal, folk) e o clima de cada faixa.' },
    { titulo: 'A geração', texto: 'As vozes e os instrumentos são gerados por IA no Suno. Não há banda nem cantor gravando.' },
    { titulo: 'A escolha', texto: 'Ouço as versões geradas e escolho a melhor. O que não ficou bom, eu refaço.' },
    { titulo: 'A masterização', texto: 'Automática, no LANDR. Não é masterização de estúdio: é um ajuste final automático do som.' },
    { titulo: 'O lançamento', texto: 'Distribuo pelo DistroKid para o Spotify, o YouTube Music e as outras plataformas.' },
  ],
};
