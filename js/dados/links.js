import { artista } from './albuns.js';

// Botões da bio (Início), em ordem. Destino: rota interna (#/...) ou URL externa.

export const linksBio = [
  { rotulo: 'IA sem lábia', dica: 'Ferramentas de IA: o que o post não conta', icone: '⚡', destino: '#/ia-sem-labia', destaque: true },
  { rotulo: 'Guia: as verdades sobre IA no Instagram', icone: '📌', destino: '#/ia-sem-labia/verdades-ia-instagram' },
  { rotulo: 'Minhas músicas', dica: 'Salmos, Hebreus e Romanos', icone: '♪', destino: '#/musica' },
  { rotulo: 'Ouvir no Spotify', icone: '♫', destino: artista.spotify },
  { rotulo: 'Ouvir no YouTube Music', icone: '▶', destino: artista.youtubeMusic },
  { rotulo: 'Palavra', dica: 'Pregações e reflexões', icone: '✝', destino: '#/palavra' },
  { rotulo: 'Instagram @samfieldsoak', icone: '◎', destino: 'https://instagram.com/samfieldsoak' },
  { rotulo: 'GitHub', icone: '⌘', destino: 'https://github.com/nilknarfsam' },
];

// "Novidade" do Início: a publicação em destaque (seção + slug).
export const novidade = { secao: 'palavra', slug: 'quem-me-livrara' };
