// Primeiras versões com player próprio (T-28, docs/15). Os álbuns (título, capa, base, estilo, link do Suno)
// continuam em `primeirasVersoes` (albuns.js); aqui ficam só as faixas que o site toca.
//
// O áudio fica no Cloudflare R2 (bucket samfieldsoak-musicas), fora do GitHub:
//   <AUDIO_BASE>/<slug-do-album>/<NN>-<slug-da-faixa>.mp3   (MP3 320 kbps, a masterização do LANDR sem recompressão)
// Para trocar de endereço (ex.: audio.samfieldsoak.com.br), mudar só AUDIO_BASE.
//
// Campos de uma faixa: titulo, texto (referência bíblica; opcional, '' quando o álbum não segue capítulos), arquivo, duracao (segundos, do próprio MP3).
// letras: nome do arquivo em js/dados/letras/ (mesma ordem das faixas).

export const AUDIO_BASE = 'https://pub-878c1d4e680145ccb7325b27f82f547a.r2.dev/primeiras-versoes';

export const faixasPrimeiras = {
  'trono-de-fogo': {
    letras: 'trono-de-fogo',
    lancamentoSuno: '2026-10-05',
    faixas: [
      { titulo: 'O Amor Incomparável de Deus', texto: 'Salmo 36', arquivo: '01-salmo-36.mp3', duracao: 245 },
      { titulo: 'Confia no Senhor', texto: 'Salmo 37', arquivo: '02-salmo-37.mp3', duracao: 282 },
      { titulo: 'O Peso do Pecado e a Esperança em Deus', texto: 'Salmo 38', arquivo: '03-salmo-38.mp3', duracao: 214 },
      { titulo: 'Minha Esperança Está no Senhor', texto: 'Salmo 39', arquivo: '04-salmo-39.mp3', duracao: 238 },
      { titulo: 'Um Novo Cântico', texto: 'Salmo 40', arquivo: '05-salmo-40.mp3', duracao: 327 },
      { titulo: 'O Senhor Sustenta o Justo', texto: 'Salmo 41', arquivo: '06-salmo-41.mp3', duracao: 273 },
      { titulo: 'Sede de Deus', texto: 'Salmo 42', arquivo: '07-salmo-42.mp3', duracao: 279 },
      { titulo: 'Envia Tua Luz', texto: 'Salmo 43', arquivo: '08-salmo-43.mp3', duracao: 234 },
      { titulo: 'Levanta-Te, Senhor!', texto: 'Salmo 44', arquivo: '09-salmo-44.mp3', duracao: 271 },
      { titulo: 'O Rei e Sua Noiva', texto: 'Salmo 45', arquivo: '10-salmo-45.mp3', duracao: 294 },
      { titulo: 'Deus é o Nosso Refúgio', texto: 'Salmo 46', arquivo: '11-salmo-46.mp3', duracao: 301 },
      { titulo: 'O Rei Sobre Toda a Terra', texto: 'Salmo 47', arquivo: '12-salmo-47.mp3', duracao: 165 },
      { titulo: 'A Cidade do Grande Rei', texto: 'Salmo 48', arquivo: '13-salmo-48.mp3', duracao: 294 },
      { titulo: 'Só Deus Redime', texto: 'Salmo 49', arquivo: '14-salmo-49.mp3', duracao: 287 },
      { titulo: 'O Juiz Supremo', texto: 'Salmo 50', arquivo: '15-salmo-50.mp3', duracao: 290 },
    ],
  },
};

export const urlAudio = (slug, arquivo) => `${AUDIO_BASE}/${slug}/${arquivo}`;
export const temPlayerProprio = (slug) => Boolean(faixasPrimeiras[slug]?.faixas?.length);
