import { reflexoes } from '../dados/reflexoes.js';
import { renderizarLista } from '../modules/templates.js';
import { cartaoReflexao } from '../modules/templates-palavra.js';
import { animarCartoes } from '../modules/movimento.js';

// Lista das pregações e reflexões (mais recente primeiro).
export function iniciarPalavraLista(app) {
  const lista = app.querySelector('[data-lista]');
  renderizarLista(lista, reflexoes, cartaoReflexao);
  app.querySelector('[data-vazio]').hidden = reflexoes.length > 0;
  animarCartoes(app);
}
