import { artista } from './albuns.js';

// Botões da bio (Início), em ordem. Destino: rota interna (#/...) ou URL externa.
// icone: nome de um <symbol> de imagens/icones/sprite.svg (a conferência acusa nome que não existe).
// O botão com destaque: true fica em primeiro e ocupa a linha inteira; os outros 8 fecham a grade
// (2 colunas no celular, 4 no computador). Acrescentou um? Mantenha os outros em múltiplo de 4.

export const linksBio = [
  { rotulo: 'IA sem lábia', dica: 'Ferramentas de IA: o que o post não conta', icone: 'raio', destino: '#/ia-sem-labia', destaque: true },
  { rotulo: 'Novidades', dica: 'O que acabou de entrar no site', icone: 'brilho', destino: '#/novidades' },
  { rotulo: 'Guia: IA no Instagram', dica: 'As verdades que ninguém conta', icone: 'alfinete', destino: '#/ia-sem-labia/verdades-ia-instagram' },
  { rotulo: 'Minhas músicas', dica: 'Salmos, Hebreus e Romanos', icone: 'musica', destino: '#/musica' },
  { rotulo: 'Ouvir no Spotify', icone: 'fone', destino: artista.spotify },
  { rotulo: 'Ouvir no YouTube Music', icone: 'play-circulo', destino: artista.youtubeMusic },
  { rotulo: 'Palavra', dica: 'Pregações e reflexões', icone: 'livro', destino: '#/palavra' },
  { rotulo: 'Instagram @samfieldsoak', icone: 'camera', destino: 'https://instagram.com/samfieldsoak' },
  { rotulo: 'GitHub', icone: 'codigo', destino: 'https://github.com/nilknarfsam' },
];

// As "Novidades" do Início vêm sozinhas de js/dados/novidades.js (as 3 mais novas).
