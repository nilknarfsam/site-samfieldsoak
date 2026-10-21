import { albuns, artista, buscarAlbum, series } from '../dados/albuns.js';
import { detalheAlbum, botoesPerfis } from '../modules/templates-musica.js';
import { naoEncontrado } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';
import { prepararPlayerSpotify } from '../modules/player.js';
import { protegerCapas } from '../modules/protecao.js';

// Devolve o título da aba.
export function iniciarMusicaDetalhe(app, slug) {
  const alvo = app.querySelector('[data-detalhe]');
  const a = buscarAlbum(slug);
  if (!a) {
    alvo.classList.add('container--texto');
    alvo.innerHTML = naoEncontrado('Música', '#/musica');
    return 'Conteúdo não encontrado';
  }
  const serie = a.serie ? series[a.serie] : null;
  const ordemRomana = { I: 1, II: 2, III: 3, IV: 4 };
  const ordem = (x) => ordemRomana[x.volume] || Number(x.volume) || 0;
  const irmaos = serie
    ? albuns.filter((x) => x.serie === a.serie && x.slug !== a.slug).sort((x, y) => ordem(x) - ordem(y))
    : [];
  alvo.innerHTML = detalheAlbum(a, serie, irmaos);
  if (a.spotifyId) {
    prepararPlayerSpotify(alvo.querySelector('[data-player-album]'), {
      tipo: 'album', id: a.spotifyId, titulo: `${a.titulo} no Spotify`,
    });
  }
  alvo.querySelector('[data-perfis]').innerHTML = botoesPerfis(artista);
  animarCartoes(alvo);
  protegerCapas(alvo);
  return a.subtitulo ? `${a.titulo} (${a.subtitulo})` : a.titulo;
}
