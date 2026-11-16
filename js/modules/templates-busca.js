import { escapar } from './templates.js';

export const resultadoBusca = (item) => `
  <li>
    <article class="cartao cartao--clicavel">
      <p class="cartao__meta">${escapar(item.secao)}</p>
      <h2><a class="cartao__link" href="${escapar(item.rota)}">${escapar(item.titulo)}</a></h2>
      ${item.referencia ? `<p>${escapar(item.referencia)}</p>` : ''}
      ${item.resumo ? `<p>${escapar(item.resumo)}</p>` : ''}
      <p class="cartao__rodape" aria-hidden="true"><span class="cartao__acao">Abrir página →</span></p>
    </article>
  </li>`;
