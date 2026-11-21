// HTML das primeiras versões com player próprio (#/ouvir e #/ouvir/<slug>).
// Todo texto de dados passa por escapar().

import { escapar, icone, linkExterno, botaoCompartilhar } from './templates.js';
import { capaAlbum } from './templates-musica.js';
import { formatarTempo } from './tocador.js';

// Número da faixa; na que está tocando, barrinhas animadas (como nos apps de música).
export const barrinhas = (tocando) => `<span class="barrinhas${tocando ? ' barrinhas--tocando' : ''}" aria-hidden="true"><span></span><span></span><span></span></span>`;
export const conteudoBotaoFaixa = (i, atual, tocando) => (atual ? barrinhas(tocando) : `<span class="faixa-tocar__numero" aria-hidden="true">${i + 1}</span>`);

export const rotaPrimeira = (slug) => `#/ouvir/${encodeURIComponent(slug)}`;

export function detalhePrimeira(a, dados) {
  const total = dados.faixas.reduce((s, f) => s + f.duracao, 0);
  return `
    <a class="voltar" href="#/ouvir">← Ouvir</a>
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
          <button class="faixa-tocar" type="button" data-tocar="${i}" aria-label="${escapar(`Tocar: ${f.titulo}`)}">${conteudoBotaoFaixa(i, false, false)}</button>
          <span class="faixas__titulo">${escapar(f.titulo)}</span>
          ${f.texto ? `<span class="faixas__texto">${escapar(f.texto)}</span>` : ''}
          <span class="faixas__duracao">${formatarTempo(f.duracao)}</span>
          ${botaoPlaylist(i, f.titulo)}
        </li>`).join('')}
      </ol>
      <p class="nota">O player fica no rodapé e continua tocando enquanto você navega pelo site. Toque nele para abrir a tela cheia, com a fila e a letra.</p>
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

// "+" da Minha playlist. O estado (na lista ou não) é marcado pela tela com marcarBotaoPlaylist.
const botaoPlaylist = (i, titulo) => `<button class="faixa-mais" type="button" data-playlist="${i}" data-titulo="${escapar(titulo)}"
  aria-pressed="false" aria-label="${escapar(`Adicionar à minha playlist: ${titulo}`)}">${icone('mais')}</button>`;

export function marcarBotaoPlaylist(botao, naLista) {
  const titulo = botao.dataset.titulo;
  botao.setAttribute('aria-pressed', String(naLista));
  botao.setAttribute('aria-label', `${naLista ? 'Tirar da minha playlist' : 'Adicionar à minha playlist'}: ${titulo}`);
  botao.innerHTML = icone(naLista ? 'certo' : 'mais');
}

// Linha da página Minha playlist (#/playlist). Com remover = false, a lista é só para ouvir (link compartilhado).
export const linhaPlaylist = (f, i, remover) => `
  <li data-faixa="${i}">
    <button class="faixa-tocar" type="button" data-tocar="${i}" aria-label="${escapar(`Tocar: ${f.titulo}`)}">${conteudoBotaoFaixa(i, false, false)}</button>
    <span class="faixas__titulo">${escapar(f.titulo)}</span>
    <span class="faixas__texto">${escapar([f.texto, f.albumTitulo].filter(Boolean).join(' · '))}</span>
    <span class="faixas__duracao">${formatarTempo(f.duracao)}</span>
    ${remover ? `<button class="faixa-mais" type="button" data-remover="${escapar(f.id)}" aria-label="${escapar(`Tirar da playlist: ${f.titulo}`)}">${icone('fechar')}</button>` : ''}
  </li>`;

// Faixa da semana (Início): uma faixa das primeiras versões, que muda sozinha toda semana.
export const faixaDaSemana = (f) => `
  <section class="faixa-semana" aria-labelledby="faixa-semana-titulo">
    <div class="faixa-semana__capa">${capaAlbum({ titulo: f.albumTitulo, capa: f.capa, subtitulo: 'Primeira versão' }, { classe: 'capa--antiga' })}</div>
    <div>
      <p class="sobretitulo">Faixa da semana · Primeira versão</p>
      <h3 id="faixa-semana-titulo">${escapar(f.titulo)}</h3>
      <p class="nota mt-0">${escapar([f.texto, f.albumTitulo].filter(Boolean).join(' · '))}</p>
      <p class="primeira-acoes">
        <button class="botao" type="button" data-acao="tocar-semana">${icone('play')} Tocar</button>
        <a class="botao botao--contorno" href="${rotaPrimeira(f.albumSlug)}">Ver o álbum</a>
      </p>
    </div>
  </section>`;
