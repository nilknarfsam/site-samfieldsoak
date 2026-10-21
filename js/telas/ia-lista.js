import { ferramentas } from '../dados/ferramentas.js';
import { renderizarLista, cartaoFerramenta, escapar, rotuloCategoria, rotuloStatus } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';

const TODAS = 'todas';

// Só mostra as opções de filtro que têm conteúdo.
const valoresUnicos = (campo) => [...new Set(ferramentas.map((f) => f[campo]))];

function opcoes(campo, rotulo) {
  return [TODAS, ...valoresUnicos(campo)].map((valor, i) => `
    <label class="chip"><input type="radio" name="${campo}" value="${escapar(valor)}"${i === 0 ? ' checked' : ''}>
    <span>${escapar(valor === TODAS ? 'Todas' : rotulo(valor))}</span></label>`).join('');
}

function aplicarFiltro(app) {
  const form = app.querySelector('[data-filtros]');
  const categoria = form.elements.categoria.value;
  const status = form.elements.status.value;
  const lista = ferramentas.filter((f) =>
    (categoria === TODAS || f.categoria === categoria) && (status === TODAS || f.status === status));
  renderizarLista(app.querySelector('[data-lista]'), lista, cartaoFerramenta);
  app.querySelector('[data-contagem]').textContent =
    lista.length === 1 ? '1 página' : `${lista.length} páginas`;
  animarCartoes(app.querySelector('[data-lista]'));
}

export function iniciarIaLista(app) {
  app.querySelector('[data-opcoes="categoria"]').innerHTML = opcoes('categoria', rotuloCategoria);
  app.querySelector('[data-opcoes="status"]').innerHTML = opcoes('status', rotuloStatus);
  aplicarFiltro(app);
}

// Delegação: registrado uma vez no main.js
export function registrarEventosIaLista(app) {
  app.addEventListener('change', (e) => {
    if (e.target.closest('[data-filtros]')) aplicarFiltro(app);
  });
  app.addEventListener('submit', (e) => {
    if (e.target.closest('[data-filtros]')) e.preventDefault();
  });
}
