// HTML das Novidades (lista, cartão da home e página de cada novidade). Todo texto de dados passa por escapar().

import { escapar, dataBR, linkExterno } from './templates.js';
import { temasNovidade, rotaNovidade } from '../dados/novidades.js';

const tem = (lista) => Array.isArray(lista) && lista.length > 0;
export const rotuloTema = (t) => temasNovidade[t] || t;

// Imagem no meio do texto: { imagem, alt, legenda }. Só caminhos do próprio site.
const figura = (f) => (/^imagens\//.test(f.imagem || '') ? `
  <figure class="novidade-figura">
    <img src="${escapar(f.imagem)}" alt="${escapar(f.alt)}" loading="lazy">
    ${f.legenda ? `<figcaption>${escapar(f.legenda)}</figcaption>` : ''}
  </figure>` : '');

// "## " vira subtítulo, "- " vira item de lista (itens seguidos ficam na mesma lista),
// "> " vira destaque e um objeto { imagem, alt, legenda } vira figura.
function corpo(paragrafos) {
  const partes = [];
  let itens = [];
  const fecharLista = () => {
    if (itens.length) partes.push(`<ul class="lista-marcada">${itens.join('')}</ul>`);
    itens = [];
  };
  paragrafos.forEach((t) => {
    if (t && typeof t === 'object') { fecharLista(); partes.push(figura(t)); return; }
    t = String(t ?? '');
    if (t.startsWith('- ')) { itens.push(`<li>${escapar(t.slice(2))}</li>`); return; }
    fecharLista();
    if (t.startsWith('## ')) partes.push(`<h2>${escapar(t.slice(3))}</h2>`);
    else if (t.startsWith('> ')) partes.push(`<p class="novidade-destaque">${escapar(t.slice(2))}</p>`);
    else partes.push(`<p>${escapar(t)}</p>`);
  });
  fecharLista();
  return partes.join('');
}

// Cartão da lista (#/novidades)
export const cartaoNovidadeLista = (n) => `
  <li data-animar>
    <a class="cartao cartao--link novidade-item" href="${escapar(rotaNovidade(n))}">
      ${n.carrossel?.capa ? `<img class="novidade-item__capa" src="${escapar(n.carrossel.capa)}" alt="" width="108" height="135" loading="lazy">` : ''}
      <span class="novidade-item__texto">
        <span class="novidade-item__meta"><span class="selo selo--tema selo--${escapar(n.tema)}">${escapar(rotuloTema(n.tema))}</span> <time datetime="${escapar(n.data)}">${escapar(dataBR(n.data))}</time></span>
        <strong class="novidade-item__titulo">${escapar(n.titulo)}</strong>
        <span class="texto-suave">${escapar(n.resumo)}</span>
      </span>
      <span class="botao-bio__seta" aria-hidden="true">→</span>
    </a>
  </li>`;

// Página de uma novidade (#/novidades/<slug>)
export function detalheNovidade(n) {
  const partes = [`
    <p class="sobretitulo"><a href="#/novidades">Novidades</a> · ${escapar(rotuloTema(n.tema))} · <time datetime="${escapar(n.data)}">${escapar(dataBR(n.data))}</time></p>
    <h1>${escapar(n.titulo)}</h1>
    <p class="lead">${escapar(n.resumo)}</p>`];

  if (tem(n.paragrafos)) partes.push(`<div class="novidade-corpo">${corpo(n.paragrafos)}</div>`);
  if (n.rota) partes.push(`<p><a class="botao" href="${escapar(n.rota)}">Ver no site</a></p>`);

  if (n.carrossel?.cards?.length) {
    const total = n.carrossel.cards.length;
    partes.push(`<section class="bloco"><h2>O carrossel</h2>
      <ul class="galeria" tabindex="0" aria-label="Cards do carrossel (role para o lado)">
        ${n.carrossel.cards.map((c, i) => `<li><img src="${escapar(c.src)}" alt="Card ${i + 1} de ${total}: ${escapar(c.alt)}" width="1080" height="1350" loading="lazy"></li>`).join('')}
      </ul>
      ${n.carrossel.post ? `<p>${linkExterno(n.carrossel.post, 'Ver o post no Instagram')}</p>` : ''}</section>`);
  }

  if (tem(n.links)) {
    partes.push(`<section class="bloco"><h2>Links</h2><ul class="lista-marcada">${n.links.map((l) => `<li>${linkExterno(l.url, l.rotulo)}</li>`).join('')}</ul></section>`);
  }
  if (tem(n.fontes)) {
    partes.push(`<section class="bloco"><h2>Fontes</h2><ul class="lista-marcada fontes">${n.fontes.map((f) => `<li>${linkExterno(f.url, f.rotulo)}</li>`).join('')}</ul>
      ${n.conferidoEm ? `<p class="nota">Conferido em ${escapar(dataBR(n.conferidoEm))}.</p>` : ''}</section>`);
  }
  partes.push('<p class="mt-5"><a class="botao botao--contorno" href="#/novidades">Ver todas as novidades</a></p>');
  return partes.join('');
}
