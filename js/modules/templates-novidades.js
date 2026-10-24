// HTML das Novidades (lista, cartão da home e página de cada novidade). Todo texto de dados passa por escapar().

import { escapar, dataBR, linkExterno, botaoCompartilhar } from './templates.js';
import { temasNovidade, iconesTema, rotaNovidade } from '../dados/novidades.js';

const tem = (lista) => Array.isArray(lista) && lista.length > 0;
export const rotuloTema = (t) => temasNovidade[t] || t;

// Capa da novidade, ou o ícone do tema no mesmo tamanho (os cartões ficam alinhados).
export const capaNovidade = (n, classe, largura, altura) => (n.carrossel?.capa
  ? `<img class="${classe}" src="${escapar(n.carrossel.capa)}" alt="" width="${largura}" height="${altura}" loading="lazy">`
  : `<span class="${classe} capa-icone capa-icone--${escapar(n.tema)}" aria-hidden="true">${escapar(iconesTema[n.tema] || '★')}</span>`);

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
      ${capaNovidade(n, 'novidade-item__capa', 108, 135)}
      <span class="novidade-item__texto">
        <span class="novidade-item__meta"><span class="selo selo--tema selo--${escapar(n.tema)}">${escapar(rotuloTema(n.tema))}</span> <time datetime="${escapar(n.data)}">${escapar(dataBR(n.data))}</time></span>
        <strong class="novidade-item__titulo">${escapar(n.titulo)}</strong>
        <span class="texto-suave">${escapar(n.resumo)}</span>
      </span>
      <span class="botao-bio__seta" aria-hidden="true">→</span>
    </a>
  </li>`;

// Minutos de leitura (200 palavras por minuto), contando só o texto de paragrafos.
function minutosLeitura(paragrafos) {
  const palavras = paragrafos.filter((t) => typeof t === 'string').join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(palavras / 200));
}

// Página de uma novidade (#/novidades/<slug>). vizinhas: { anterior, proxima } da pilha.
export function detalheNovidade(n, vizinhas = {}) {
  const leitura = tem(n.paragrafos) ? ` · ${minutosLeitura(n.paragrafos)} min de leitura` : '';
  const partes = [`
    <a class="voltar" href="#/novidades">← Novidades</a>
    <p class="sobretitulo">${escapar(rotuloTema(n.tema))} · <time datetime="${escapar(n.data)}">${escapar(dataBR(n.data))}</time>${leitura}</p>
    <h1>${escapar(n.titulo)}</h1>
    <p class="lead">${escapar(n.resumo)}</p>
    ${botaoCompartilhar()}`];

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
  const { anterior, proxima } = vizinhas;
  if (anterior || proxima) {
    partes.push(`<nav class="vizinhas mt-5" aria-label="Outras novidades">
      ${anterior ? `<a class="cartao cartao--link vizinhas__link" href="${escapar(rotaNovidade(anterior))}"><span class="sobretitulo mb-0">← Anterior</span><strong>${escapar(anterior.titulo)}</strong></a>` : ''}
      ${proxima ? `<a class="cartao cartao--link vizinhas__link vizinhas__link--proxima" href="${escapar(rotaNovidade(proxima))}"><span class="sobretitulo mb-0">Próxima →</span><strong>${escapar(proxima.titulo)}</strong></a>` : ''}
    </nav>`);
  }
  partes.push('<p class="mt-5"><a class="botao botao--contorno" href="#/novidades">Ver todas as novidades</a></p>');
  return partes.join('');
}
