import { albuns, singles, artista, albumDestaque, salmosCobertos } from '../dados/albuns.js';
import { heroAlbum, cartaoNota, jornadaSalmos, cartaoAlbumCapa, cartaoSingle, botoesPerfis } from '../modules/templates-musica.js';
import { animarCartoes } from '../modules/movimento.js';
import { prepararPlayerSpotify } from '../modules/player.js';
import { protegerCapas } from '../modules/protecao.js';

export function iniciarMusica(app) {
  const destaque = albumDestaque();
  app.querySelector('[data-hero]').innerHTML = heroAlbum(destaque);
  if (destaque.spotifyId) {
    prepararPlayerSpotify(app.querySelector('[data-player-album]'), {
      tipo: 'album', id: destaque.spotifyId, titulo: `${destaque.titulo} no Spotify`, rotulo: 'Ouvir agora',
    });
  }

  const comNotas = albuns.filter((a) => a.notas?.length);
  const notas = app.querySelector('[data-notas]');
  notas.innerHTML = comNotas.map(cartaoNota).join('');
  notas.closest('section').hidden = comNotas.length === 0;

  app.querySelector('[data-jornada]').innerHTML = jornadaSalmos(salmosCobertos());

  prepararPlayerSpotify(app.querySelector('[data-player]'), {
    tipo: 'artist', id: artista.spotifyId, titulo: 'Franklin Carvalho no Spotify',
  });
  app.querySelector('[data-perfis]').innerHTML = botoesPerfis(artista);

  const lista = app.querySelector('[data-lista]');
  lista.innerHTML = albuns.map(cartaoAlbumCapa).join('');
  app.querySelector('[data-singles]').innerHTML = singles.map(cartaoSingle).join('');
  app.querySelectorAll('[data-player-single]').forEach((el) => prepararPlayerSpotify(el, {
    tipo: 'album', id: el.dataset.playerSingle, titulo: `${el.dataset.titulo} no Spotify`, rotulo: 'Ouvir', compacto: true,
  }));
  animarCartoes(app);
  protegerCapas(app);
}
