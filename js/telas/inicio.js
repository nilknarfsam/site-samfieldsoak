import { linksBio, novidade } from '../dados/links.js';
import { buscarFerramenta } from '../dados/ferramentas.js';
import { renderizarLista, botaoBio, cartaoNovidade } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';

// Seções que podem aparecer como "Novidade" (cresce quando a Palavra tiver conteúdo).
const secoes = {
  'ia-sem-labia': { buscar: buscarFerramenta, rotulo: 'IA sem lábia' },
};

export function iniciarInicio(app) {
  renderizarLista(app.querySelector('[data-links]'), linksBio, botaoBio);

  const secao = secoes[novidade.secao];
  const item = secao && secao.buscar(novidade.slug);
  if (item) {
    app.querySelector('[data-novidade]').innerHTML = cartaoNovidade(item, `#/${novidade.secao}/${item.slug}`, secao.rotulo);
    app.querySelector('#novidade').hidden = false;
  }
  animarCartoes(app);
}
