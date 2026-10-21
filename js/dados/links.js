// Botões da bio (Início), em ordem. Destino: rota interna (#/...) ou URL externa.

export const linksBio = [
  { rotulo: 'IA sem lábia', dica: 'Ferramentas de IA: o que o post não conta', icone: '⚡', destino: '#/ia-sem-labia', destaque: true },
  { rotulo: 'Guia: as verdades sobre IA no Instagram', icone: '📌', destino: '#/ia-sem-labia/verdades-ia-instagram' },
  { rotulo: 'Minhas músicas', dica: 'Álbuns dos Salmos, Provérbios e mais', icone: '♪', destino: '#/musica' },
  { rotulo: 'Palavra', dica: 'Versículos e reflexões', icone: '✝', destino: '#/palavra' },
  { rotulo: 'Instagram @samfieldsoak', icone: '◎', destino: 'https://instagram.com/samfieldsoak' },
  { rotulo: 'GitHub', icone: '⌘', destino: 'https://github.com/nilknarfsam' },
  // Spotify (perfil de artista): entra quando o Franklin passar o link.
];

// "Novidade" do Início: a publicação em destaque (seção + slug).
export const novidade = { secao: 'ia-sem-labia', slug: 'verdades-ia-instagram' };
