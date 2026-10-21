import { albuns, artista } from '../dados/albuns.js';
import { renderizarLista, cartaoAlbum, linkExterno } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';
import { prepararPlayerSpotify } from '../modules/player.js';

export function iniciarMusica(app) {
  prepararPlayerSpotify(app.querySelector('[data-player]'), {
    tipo: 'artist', id: artista.spotifyId, titulo: 'Franklin Carvalho no Spotify',
  });
  app.querySelector('[data-perfis]').innerHTML = [
    linkExterno(artista.spotify, 'Ouvir no Spotify', 'botao'),
    linkExterno(artista.youtubeMusic, 'Ouvir no YouTube Music', 'botao botao--contorno'),
  ].map((a) => `<li>${a}</li>`).join('');
  const lista = app.querySelector('[data-lista]');
  renderizarLista(lista, albuns, cartaoAlbum);
  animarCartoes(lista);
}
