import { buscarFerramenta } from '../dados/ferramentas.js';
import { detalheFerramenta, naoEncontrado } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';

// Devolve o título da aba.
export function iniciarIaDetalhe(app, slug) {
  const alvo = app.querySelector('[data-detalhe]');
  const f = buscarFerramenta(slug);
  if (!f) {
    alvo.innerHTML = naoEncontrado('IA sem lábia', '#/ia-sem-labia');
    return 'Conteúdo não encontrado';
  }
  const relacionadas = (f.relacionadas || []).map(buscarFerramenta).filter(Boolean);
  alvo.innerHTML = detalheFerramenta(f, relacionadas);
  animarCartoes(alvo);
  return f.titulo || f.nome;
}
