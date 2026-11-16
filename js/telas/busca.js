import { novidades } from '../dados/novidades.js';
import { ferramentas } from '../dados/ferramentas.js';
import { reflexoes } from '../dados/reflexoes.js';
import { albuns } from '../dados/albuns.js';
import { criarIndiceBusca, buscarNoIndice, normalizarBusca } from '../modules/busca.js';
import { renderizarLista } from '../modules/templates.js';
import { resultadoBusca } from '../modules/templates-busca.js';

const indice = criarIndiceBusca({ novidades, ferramentas, reflexoes, albuns });

export function iniciarBusca(app) {
  const form = app.querySelector('[data-busca]');
  const campo = form.elements.termo;
  const lista = app.querySelector('[data-resultados-busca]');
  const contagem = app.querySelector('[data-contagem-busca]');
  const vazio = app.querySelector('[data-vazio-busca]');
  const atualizar = () => {
    const temTermo = Boolean(normalizarBusca(campo.value));
    const resultados = buscarNoIndice(indice, campo.value);
    renderizarLista(lista, resultados, resultadoBusca);
    contagem.textContent = temTermo
      ? (resultados.length === 1 ? '1 resultado' : `${resultados.length} resultados`)
      : 'Digite um assunto para buscar no site.';
    vazio.hidden = !temTermo || resultados.length > 0;
  };
  // O termo vive somente no campo desta tela: não entra na URL, armazenamento ou contador.
  campo.value = '';
  form.addEventListener('input', atualizar);
  form.addEventListener('submit', (e) => { e.preventDefault(); atualizar(); });
  form.addEventListener('reset', (e) => {
    e.preventDefault();
    campo.value = '';
    atualizar();
    campo.focus();
  });
  atualizar();
}
