import { buscarNovidade } from '../dados/novidades.js';
import { detalheNovidade } from '../modules/templates-novidades.js';
import { naoEncontrado } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';

// Devolve o título da aba.
export function iniciarNovidadesDetalhe(app, slug) {
  const alvo = app.querySelector('[data-detalhe]');
  const n = buscarNovidade(slug);
  if (!n) {
    alvo.innerHTML = naoEncontrado('as novidades', '#/novidades');
    return 'Conteúdo não encontrado';
  }
  alvo.innerHTML = detalheNovidade(n);
  animarCartoes(alvo);
  return n.titulo;
}
