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
  'rugido-dos-justos': {
    letras: 'rugido-dos-justos',
    faixas: [
      { titulo: 'A Verdadeira Felicidade', texto: 'Salmo 1', arquivo: '01-salmo-1.mp3', duracao: 249 },
      { titulo: 'O Rei Escolhido por Deus', texto: 'Salmo 2', arquivo: '02-salmo-2.mp3', duracao: 265 },
      { titulo: 'Oração na Batalha', texto: 'Salmo 3', arquivo: '03-salmo-3.mp3', duracao: 228 },
      { titulo: 'Deus, Meu Defensor', texto: 'Salmo 4', arquivo: '04-salmo-4.mp3', duracao: 259 },
      { titulo: 'Oração de Guerra e Refúgio', texto: 'Salmo 5', arquivo: '05-salmo-5.mp3', duracao: 277 },
      { titulo: 'Clamor na Noite', texto: 'Salmo 6', arquivo: '06-salmo-6.mp3', duracao: 310 },
      { titulo: 'Clamor por Justiça', texto: 'Salmo 7', arquivo: '07-salmo-7.mp3', duracao: 226 },
      { titulo: 'Majestade e Glória', texto: 'Salmo 8', arquivo: '08-salmo-8.mp3', duracao: 259 },
      { titulo: 'Vitória e Justiça', texto: 'Salmo 9', arquivo: '09-salmo-9.mp3', duracao: 255 },
      { titulo: 'Clamor Contra a Injustiça', texto: 'Salmo 10', arquivo: '10-salmo-10.mp3', duracao: 280 },
      { titulo: 'O Senhor é Meu Refúgio', texto: 'Salmo 11', arquivo: '11-salmo-11.mp3', duracao: 313 },
      { titulo: 'A Palavra Que Permanece', texto: 'Salmo 12', arquivo: '12-salmo-12.mp3', duracao: 230 },
      { titulo: 'Até Quando?', texto: 'Salmo 13', arquivo: '13-salmo-13.mp3', duracao: 276 },
      { titulo: 'O Tolo Diz', texto: 'Salmo 14', arquivo: '14-salmo-14.mp3', duracao: 301 },
      { titulo: 'Quem Habitará no Teu Santo Monte', texto: 'Salmo 15', arquivo: '15-salmo-15.mp3', duracao: 215 },
      { titulo: 'O Senhor é Minha Herança', texto: 'Salmo 16', arquivo: '16-salmo-16.mp3', duracao: 265 },
      { titulo: 'Oração por Justiça', texto: 'Salmo 17', arquivo: '17-salmo-17.mp3', duracao: 253 },
      { titulo: 'O Senhor é Minha Fortaleza', texto: 'Salmo 18', arquivo: '18-salmo-18.mp3', duracao: 279 },
      { titulo: 'A Glória de Deus', texto: 'Salmo 19', arquivo: '19-salmo-19.mp3', duracao: 306 },
      { titulo: 'Oração pela Vitória', texto: 'Salmo 20', arquivo: '20-salmo-20.mp3', duracao: 255 },
      { titulo: 'Vitória do Rei', texto: 'Salmo 21', arquivo: '21-salmo-21.mp3', duracao: 239 },
      { titulo: 'Do Clamor à Vitória', texto: 'Salmo 22', arquivo: '22-salmo-22.mp3', duracao: 231 },
      { titulo: 'O Senhor é Meu Pastor', texto: 'Salmo 23', arquivo: '23-salmo-23.mp3', duracao: 271 },
      { titulo: 'O Rei da Glória', texto: 'Salmo 24', arquivo: '24-salmo-24.mp3', duracao: 218 },
      { titulo: 'Guia-me na Tua Verdade', texto: 'Salmo 25', arquivo: '25-salmo-25.mp3', duracao: 258 },
      { titulo: 'Integridade Diante do Senhor', texto: 'Salmo 26', arquivo: '26-salmo-26.mp3', duracao: 270 },
      { titulo: 'O Senhor é Minha Luz', texto: 'Salmo 27', arquivo: '27-salmo-27.mp3', duracao: 220 },
      { titulo: 'O Senhor é Minha Força', texto: 'Salmo 28', arquivo: '28-salmo-28.mp3', duracao: 234 },
      { titulo: 'A Voz do Senhor', texto: 'Salmo 29', arquivo: '29-salmo-29.mp3', duracao: 240 },
      { titulo: 'Transformaste Meu Pranto em Dança', texto: 'Salmo 30', arquivo: '30-salmo-30.mp3', duracao: 268 },
      { titulo: 'Nas Tuas Mãos Entrego Meu Espírito', texto: 'Salmo 31', arquivo: '31-salmo-31.mp3', duracao: 269 },
      { titulo: 'A Alegria do Perdão', texto: 'Salmo 32', arquivo: '32-salmo-32.mp3', duracao: 245 },
      { titulo: 'Louvor ao Criador', texto: 'Salmo 33', arquivo: '33-salmo-33.mp3', duracao: 283 },
      { titulo: 'Provai e Vede', texto: 'Salmo 34', arquivo: '34-salmo-34.mp3', duracao: 254 },
      { titulo: 'O Senhor Pelejará por Mim', texto: 'Salmo 35', arquivo: '35-salmo-35.mp3', duracao: 239 },
    ],
  },
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
  'altar-da-contricao': {
    letras: 'altar-da-contricao',
    faixas: [
      { titulo: 'Cria em Mim um Coração Puro', texto: 'Salmo 51', arquivo: '01-salmo-51.mp3', duracao: 295 },
      { titulo: 'A Maldade e a Bondade de Deus', texto: 'Salmo 52', arquivo: '02-salmo-52.mp3', duracao: 201 },
      { titulo: 'O Insensato Diz: Não Há Deus', texto: 'Salmo 53', arquivo: '03-salmo-53.mp3', duracao: 195 },
      { titulo: 'Salva-me Pelo Teu Nome', texto: 'Salmo 54', arquivo: '04-salmo-54.mp3', duracao: 274 },
      { titulo: 'Lança Teu Peso no Senhor', texto: 'Salmo 55', arquivo: '05-salmo-55.mp3', duracao: 277 },
      { titulo: 'Em Deus Não Temerei', texto: 'Salmo 56', arquivo: '06-salmo-56.mp3', duracao: 265 },
      { titulo: 'À Sombra das Tuas Asas', texto: 'Salmo 57', arquivo: '07-salmo-57.mp3', duracao: 309 },
      { titulo: 'O Juízo dos Ímpios', texto: 'Salmo 58', arquivo: '08-salmo-58.mp3', duracao: 277 },
      { titulo: 'O Senhor é Minha Fortaleza', texto: 'Salmo 59', arquivo: '09-salmo-59.mp3', duracao: 279 },
      { titulo: 'A Vitória Vem do Senhor', texto: 'Salmo 60', arquivo: '10-salmo-60.mp3', duracao: 304 },
      { titulo: 'A Rocha Mais Alta', texto: 'Salmo 61', arquivo: '11-salmo-61.mp3', duracao: 288 },
      { titulo: 'Somente em Deus', texto: 'Salmo 62', arquivo: '12-salmo-62.mp3', duracao: 210 },
      { titulo: 'A Minha Alma Tem Sede de Ti', texto: 'Salmo 63', arquivo: '13-salmo-63.mp3', duracao: 268 },
      { titulo: 'O Senhor Derruba os Ímpios', texto: 'Salmo 64', arquivo: '14-salmo-64.mp3', duracao: 239 },
      { titulo: 'O Deus da Colheita e da Criação', texto: 'Salmo 65', arquivo: '15-salmo-65.mp3', duracao: 264 },
    ],
  },
  'codigos-da-eternidade': {
    letras: 'codigos-da-eternidade',
    faixas: [
      { titulo: 'No Princípio', texto: '', arquivo: '01-no-principio.mp3', duracao: 254 },
      { titulo: 'Arca da Promessa', texto: '', arquivo: '02-arca-da-promessa.mp3', duracao: 310 },
      { titulo: 'Pai da Promessa', texto: '', arquivo: '03-pai-da-promessa.mp3', duracao: 262 },
      { titulo: 'O Deus de Isaac e Jacó', texto: '', arquivo: '04-o-deus-de-isaac-e-jaco.mp3', duracao: 275 },
      { titulo: 'Dos Sonhos à Promessa (José)', texto: '', arquivo: '05-dos-sonhos-a-promessa-jose.mp3', duracao: 213 },
      { titulo: 'Deus da Libertação', texto: '', arquivo: '06-deus-da-libertacao.mp3', duracao: 315 },
      { titulo: 'A Voz do Sinai', texto: '', arquivo: '07-a-voz-do-sinai.mp3', duracao: 248 },
      { titulo: 'Seja Forte e Corajoso', texto: '', arquivo: '08-seja-forte-e-corajoso.mp3', duracao: 244 },
      { titulo: 'Heróis Pela Fé', texto: '', arquivo: '09-herois-pela-fe.mp3', duracao: 288 },
      { titulo: 'O Deus das Batalhas', texto: '', arquivo: '10-o-deus-das-batalhas.mp3', duracao: 221 },
      { titulo: 'A Casa da Glória', texto: '', arquivo: '11-a-casa-da-gloria.mp3', duracao: 267 },
      { titulo: 'Emanuel', texto: '', arquivo: '12-emanuel.mp3', duracao: 289 },
      { titulo: 'Choram os Profetas', texto: '', arquivo: '13-choram-os-profetas.mp3', duracao: 273 },
      { titulo: 'Sopro de Vida', texto: '', arquivo: '14-sopro-de-vida.mp3', duracao: 320 },
      { titulo: 'Reino Inabalável', texto: '', arquivo: '15-reino-inabalavel.mp3', duracao: 285 },
      { titulo: 'Amor e Fogo', texto: '', arquivo: '16-amor-e-fogo.mp3', duracao: 274 },
      { titulo: 'Justiça e Misericórdia', texto: '', arquivo: '17-justica-e-misericordia.mp3', duracao: 276 },
      { titulo: 'No Ventre da Graça', texto: '', arquivo: '18-no-ventre-da-graca.mp3', duracao: 263 },
      { titulo: 'O Justo Viverá Pela Fé', texto: '', arquivo: '19-o-justo-vivera-pela-fe.mp3', duracao: 260 },
      { titulo: 'Restaura-nos, Senhor', texto: '', arquivo: '20-restaura-nos-senhor.mp3', duracao: 251 },
      { titulo: 'O Sol da Justiça', texto: '', arquivo: '21-o-sol-da-justica.mp3', duracao: 283 },
    ],
  },
  'o-caminho-de-jesus': {
    letras: 'o-caminho-de-jesus',
    faixas: [
      { titulo: 'Águas do Jordão', texto: '', arquivo: '01-aguas-do-jordao.mp3', duracao: 186 },
      { titulo: 'Chamado do Reino', texto: '', arquivo: '02-chamado-do-reino.mp3', duracao: 182 },
      { titulo: 'Monte das Bem-Aventuranças', texto: '', arquivo: '03-monte-das-bem-aventurancas.mp3', duracao: 159 },
      { titulo: 'Luz do Mundo', texto: '', arquivo: '04-luz-do-mundo.mp3', duracao: 182 },
      { titulo: 'Entre as Multidões', texto: '', arquivo: '05-entre-as-multidoes.mp3', duracao: 178 },
      { titulo: 'O Mar se Acalmou', texto: '', arquivo: '06-o-mar-se-acalmou.mp3', duracao: 215 },
      { titulo: 'O Pão que Desceu do Céu', texto: '', arquivo: '07-o-pao-que-desceu-do-ceu.mp3', duracao: 187 },
      { titulo: 'No Jardim', texto: '', arquivo: '08-no-jardim.mp3', duracao: 225 },
      { titulo: 'Cruz de Amor', texto: '', arquivo: '09-cruz-de-amor.mp3', duracao: 210 },
      { titulo: 'A Luz Ressuscitou', texto: '', arquivo: '10-a-luz-ressuscitou.mp3', duracao: 215 },
    ],
  },
};

export const urlAudio = (slug, arquivo) => `${AUDIO_BASE}/${slug}/${arquivo}`;
export const temPlayerProprio = (slug) => Boolean(faixasPrimeiras[slug]?.faixas?.length);
