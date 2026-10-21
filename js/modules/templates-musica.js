// HTML da seção Música (landing e página de cada álbum). Todo texto de dados passa por escapar().

import { escapar, dataBR, linkExterno } from './templates.js';

const tem = (lista) => Array.isArray(lista) && lista.length > 0;
const rotaAlbum = (a) => `#/musica/${encodeURIComponent(a.slug)}`;
const ano = (iso) => (iso ? iso.slice(0, 4) : '');

// Capa protegida: só a versão de tela (até 960px), sem arrastar, sem menu de "salvar imagem".
// Sem arquivo de capa, mostra uma capa tipográfica no estilo do site.
export function capaAlbum(a, { tamanho = 480, carregamento = 'lazy', classe = '' } = {}) {
  const rotulo = `Capa do álbum ${a.subtitulo ? a.subtitulo + ' — ' : ''}${a.titulo}`;
  if (!a.capa) {
    return `<div class="capa capa--texto ${classe}" role="img" aria-label="${escapar(rotulo)}">
      ${a.volume ? `<span class="capa__volume">Vol. ${escapar(a.volume)}</span>` : ''}
      <span class="capa__titulo">${escapar(a.titulo)}</span>
      <span class="capa__artista">Franklin Carvalho</span>
    </div>`;
  }
  const src = `${a.capa}-${tamanho}.webp`;
  const srcset = `${a.capa}-480.webp 480w, ${a.capa}-960.webp 960w`;
  return `<div class="capa ${classe}" data-protegida>
    <img src="${escapar(src)}" srcset="${escapar(srcset)}" sizes="(min-width: 992px) 28rem, 90vw"
      alt="${escapar(rotulo)}" width="${tamanho}" height="${tamanho}" loading="${carregamento}" draggable="false">
  </div>`;
}

const linhaMeta = (a) => [a.base, a.faixas ? `${a.faixas} faixas` : '', ano(a.lancamento)].filter(Boolean).join(' · ');

// ---------- Landing (#/musica) ----------

export function heroAlbum(a) {
  return `
    <div class="hero-album__capa">${capaAlbum(a, { tamanho: 960, carregamento: 'eager' })}</div>
    <div class="hero-album__texto">
      <p class="sobretitulo">Lançamento${a.lancamento ? ' · ' + escapar(dataBR(a.lancamento)) : ''}</p>
      ${a.subtitulo ? `<p class="hero-album__serie">${escapar(a.subtitulo)}</p>` : ''}
      <h2 class="hero-album__titulo">${escapar(a.titulo)}</h2>
      ${a.frase ? `<p class="lead">${escapar(a.frase)}</p>` : ''}
      <p class="nota mt-0">${escapar(linhaMeta(a))}</p>
      <div class="player mt-3" data-player-album></div>
      <p class="mt-3"><a class="botao botao--contorno" href="${rotaAlbum(a)}">Por trás do álbum →</a></p>
    </div>`;
}

// Uma nota de criação por álbum (a primeira), para a seção "Por trás das músicas".
export const cartaoNota = (a) => `
  <li class="col-md-6" data-animar>
    <a class="cartao cartao--link nota-criacao" href="${rotaAlbum(a)}">
      <span class="album__base">${escapar(a.subtitulo || a.titulo)}</span>
      <strong class="nota-criacao__titulo">${escapar(a.notas[0].titulo)}</strong>
      <span class="nota-criacao__texto">${escapar(a.notas[0].texto)}</span>
      <span class="nota-criacao__mais">Ler mais sobre o álbum <span aria-hidden="true">→</span></span>
    </a>
  </li>`;

// Barra 1–150 com os trechos dos Salmos que já viraram álbum.
export function jornadaSalmos(trechos) {
  const total = trechos.reduce((s, t) => s + (t.ate - t.de + 1), 0);
  const segmentos = trechos.map((t) => `
    <a class="jornada__trecho" href="${rotaAlbum(t.album)}"
       style="--inicio:${t.de - 1};--tamanho:${t.ate - t.de + 1}"
       title="${escapar(t.album.titulo)}: Salmos ${t.de}–${t.ate}">
      <span class="visualmente-oculto">${escapar(t.album.titulo)}: Salmos ${t.de} a ${t.ate}</span>
    </a>`).join('');
  return `
    <p class="jornada__contagem"><strong>${total}</strong> de 150 salmos já viraram música</p>
    <div class="jornada__barra">${segmentos}</div>
    <div class="jornada__escala" aria-hidden="true"><span>1</span><span>50</span><span>100</span><span>150</span></div>
    <ul class="jornada__legenda lista-limpa">${trechos.map((t) => `<li><a href="${rotaAlbum(t.album)}">${escapar(t.album.titulo)}</a> <span>${t.de}–${t.ate}</span></li>`).join('')}</ul>`;
}

export const cartaoAlbumCapa = (a) => `
  <li class="col-md-6 col-lg-4" data-animar>
    <a class="cartao cartao--link cartao-album" href="${rotaAlbum(a)}">
      ${capaAlbum(a, { classe: 'cartao-album__capa' })}
      <span class="album__base">${escapar(a.subtitulo || a.base || 'Álbum')}</span>
      <strong class="cartao-album__titulo">${escapar(a.titulo)}</strong>
      <span class="cartao-album__meta">${escapar([a.estilo, a.faixas ? a.faixas + ' faixas' : ''].filter(Boolean).join(' · '))}</span>
    </a>
  </li>`;

// ---------- Página do álbum (#/musica/<slug>) ----------

export function detalheAlbum(a, serie, irmaos) {
  const partes = [`
    <a class="voltar" href="#/musica">← Música</a>
    <header class="album-topo">
      <div class="album-topo__capa">${capaAlbum(a, { tamanho: 960, carregamento: 'eager' })}</div>
      <div>
        ${a.subtitulo ? `<p class="hero-album__serie">${escapar(a.subtitulo)}</p>` : ''}
        <h1 class="hero-album__titulo">${escapar(a.titulo)}</h1>
        ${a.frase ? `<p class="lead">${escapar(a.frase)}</p>` : ''}
        <p class="nota mt-0">${escapar([linhaMeta(a), a.estilo].filter(Boolean).join(' · '))}</p>
      </div>
    </header>`];

  partes.push(a.spotifyId
    ? `<section class="bloco"><h2>Ouça o álbum</h2><div class="player" data-player-album></div>
        <ul class="links-oficiais mt-3" data-perfis></ul></section>`
    : `<section class="bloco"><h2>Ouça</h2><p class="nota">${escapar(a.situacao || 'Links do álbum em breve. Enquanto isso, ouça no perfil de artista.')}</p>
        <ul class="links-oficiais mt-3" data-perfis></ul></section>`);

  if (tem(a.notas)) {
    partes.push(`<section class="bloco"><h2>Por trás do álbum</h2>
      <div class="notas">${a.notas.map((n) => `<article class="nota-album"><h3>${escapar(n.titulo)}</h3><p>${escapar(n.texto)}</p></article>`).join('')}</div>
    </section>`);
  }

  if (tem(a.faixasLista)) {
    partes.push(`<section class="bloco"><h2>Faixas</h2>
      <ol class="faixas">${a.faixasLista.map((f) => `<li><span class="faixas__titulo">${escapar(f.titulo)}</span><span class="faixas__texto">${escapar(f.texto)}</span></li>`).join('')}</ol>
      <p class="nota">Letras baseadas na tradução Almeida, em domínio público.</p>
    </section>`);
  }

  if (serie) {
    partes.push(`<section class="bloco"><h2>${escapar(serie.titulo)}</h2>
      <p>${escapar(serie.resumo)}</p><p class="texto-suave">${escapar(serie.planejado)}</p>
      ${tem(irmaos) ? `<ul class="grid lista-limpa discografia mt-3">${irmaos.map(cartaoAlbumCapa).join('')}</ul>` : ''}
      ${serie.aCaminho ? `<p class="nota">${escapar(serie.aCaminho)}</p>` : ''}
    </section>`);
  }
  return partes.join('');
}

export const botoesPerfis = (artista) => [
  linkExterno(artista.spotify, 'Ouvir no Spotify', 'botao'),
  linkExterno(artista.youtubeMusic, 'Ouvir no YouTube Music', 'botao botao--contorno'),
].map((l) => `<li>${l}</li>`).join('');
