import { albuns } from '../dados/albuns.js';
import { renderizarLista, cartaoAlbum } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';

export function iniciarMusica(app) {
  const lista = app.querySelector('[data-lista]');
  renderizarLista(lista, albuns, cartaoAlbum);
  animarCartoes(lista);
}
