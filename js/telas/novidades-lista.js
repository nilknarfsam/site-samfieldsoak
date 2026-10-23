import { novidades } from '../dados/novidades.js';
import { renderizarLista, escapar } from '../modules/templates.js';
import { cartaoNovidadeLista, rotuloTema } from '../modules/templates-novidades.js';
import { animarCartoes } from '../modules/movimento.js';

const TODOS = 'todos';

function aplicarFiltro(app) {
  const tema = app.querySelector('[data-filtro-tema]').elements.tema.value;
  const lista = novidades.filter((n) => tema === TODOS || n.tema === tema);
  renderizarLista(app.querySelector('[data-lista]'), lista, cartaoNovidadeLista);
  app.querySelector('[data-contagem]').textContent = lista.length === 1 ? '1 novidade' : `${lista.length} novidades`;
  app.querySelector('[data-vazio]').hidden = lista.length > 0;
  animarCartoes(app.querySelector('[data-lista]'));
}

// Pilha de novidades (#/novidades), com filtro por tema (só os temas que têm conteúdo).
export function iniciarNovidadesLista(app) {
  const form = app.querySelector('[data-filtro-tema]');
  const temas = [...new Set(novidades.map((n) => n.tema))];
  form.querySelector('[data-opcoes]').innerHTML = [TODOS, ...temas].map((t, i) => `
    <label class="chip"><input type="radio" name="tema" value="${escapar(t)}"${i === 0 ? ' checked' : ''}>
    <span>${escapar(t === TODOS ? 'Todas' : rotuloTema(t))}</span></label>`).join('');
  form.addEventListener('change', () => aplicarFiltro(app));
  form.addEventListener('submit', (e) => e.preventDefault());
  aplicarFiltro(app);
}
