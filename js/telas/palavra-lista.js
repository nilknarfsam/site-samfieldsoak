import { reflexoes } from '../dados/reflexoes.js';

// A lista e o detalhe da Palavra entram com a primeira reflexão da caixa de entrada.
export function iniciarPalavraLista(app) {
  app.querySelector('[data-vazio]').hidden = reflexoes.length > 0;
}
