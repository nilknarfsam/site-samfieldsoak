// HTML das primeiras versões com player próprio (#/primeiras-versoes e #/primeiras-versoes/<slug>).
// Todo texto de dados passa por escapar().

import { escapar, icone, linkExterno, botaoCompartilhar } from './templates.js';
import { capaAlbum } from './templates-musica.js';
import { formatarTempo } from './tocador.js';

export const rotaPrimeira = (slug) => `#/primeiras-versoes/${encodeURIComponent(slug)}`;

export function detalhePrimeira(a, dados) {
  const total = dados.faixas.reduce((s, f) => s + f.duracao, 0);
  return `
    <a class="voltar" href="#/primeiras-versoes">← Primeiras versões</a>
    <header class="album-topo">
      <div class="album-topo__capa">${capaAlbum({ ...a, subtitulo: 'Primeira versão' }, { tamanho: 960, carregamento: 'eager', classe: 'capa--antiga' })}</div>
      <div>
        <p class="hero-album__serie">Primeira versão</p>
        <h1 class="hero-album__titulo">${escapar(a.titulo)}</h1>
        <p class="nota mt-0">${escapar([a.base, a.estilo, `${dados.faixas.length} faixas`, `${Math.round(total / 60)} min`].filter(Boolean).join(' · '))}</p>
        <p class="primeira-aviso" role="note">Primeira versão, criada com IA no Suno, antes da série que está hoje no Spotify. As letras são minhas, escritas a partir da Bíblia com ajuda de IA.</p>
        <p class="primeira-acoes"><button class="botao" type="button" data-acao="tocar-album">${icone('play')} Tocar o álbum</button></p>
        ${botaoCompartilhar()}
      </div>
    </header>
    <section class="bloco" aria-labelledby="titulo-faixas">
      <h2 id="titulo-faixas">Faixas</h2>
      <ol class="faixas faixas--tocaveis">${dados.faixas.map((f, i) => `
        <li data-faixa="${i}">
          <button class="faixa-tocar" type="button" data-tocar="${i}" aria-label="${escapar(`Tocar: ${f.titulo}`)}">${icone('play')}</button>
          <span class="faixas__titulo">${escapar(f.titulo)}</span>
          <span class="faixas__texto">${escapar(f.texto)}</span>
          <span class="faixas__duracao">${formatarTempo(f.duracao)}</span>
        </li>`).join('')}
      </ol>
      <p class="nota">O player fica no rodapé e continua tocando enquanto você navega pelo site.</p>
      <p class="nota">Também no Suno: ${linkExterno(a.suno, 'ouvir a página do álbum no Suno')}</p>
    </section>`;
}

export const cartaoPrimeiraPagina = (a, tocavel) => `
  <li data-animar>
    <article class="cartao primeira-versao">
      ${capaAlbum({ ...a, subtitulo: 'Primeira versão' }, { classe: 'cartao-album__capa capa--antiga' })}
      <span class="album__base">${escapar(a.base)}</span>
      <strong class="cartao-album__titulo">${escapar(a.titulo)}</strong>
      ${a.estilo ? `<span class="cartao-album__meta">${escapar(a.estilo)}</span>` : ''}
      ${tocavel
        ? `<a class="botao" href="${rotaPrimeira(a.slug)}">Ouvir aqui<span class="visualmente-oculto">: ${escapar(a.titulo)}</span></a>`
        : linkExterno(a.suno, 'Ouvir no Suno', 'botao botao--contorno')}
    </article>
  </li>`;
