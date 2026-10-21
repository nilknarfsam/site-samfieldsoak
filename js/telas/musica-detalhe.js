import { albuns, artista, buscarAlbum, series, comoFaco } from '../dados/albuns.js';
import { detalheAlbum, botoesPerfis, seloIA, blocoLetra } from '../modules/templates-musica.js';
import { naoEncontrado } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';
import { prepararPlayerSpotify } from '../modules/player.js';
import { protegerCapas } from '../modules/protecao.js';
import { blocoPalavraDoAlbum } from '../modules/templates-palavra.js';

// Devolve o título da aba.
export function iniciarMusicaDetalhe(app, slug) {
  const alvo = app.querySelector('[data-detalhe]');
  const a = buscarAlbum(slug);
  if (!a) {
    alvo.classList.add('container--texto');
    alvo.innerHTML = naoEncontrado('Música', '#/musica');
    return 'Conteúdo não encontrado';
  }
  const serie = a.serie ? series[a.serie] : null;
  const ordemRomana = { I: 1, II: 2, III: 3, IV: 4 };
  const ordem = (x) => ordemRomana[x.volume] || Number(x.volume) || 0;
  const irmaos = serie
    ? albuns.filter((x) => x.serie === a.serie && x.slug !== a.slug).sort((x, y) => ordem(x) - ordem(y))
    : [];
  alvo.innerHTML = detalheAlbum(a, serie, irmaos);
  const selo = alvo.querySelector('[data-selo-ia]');
  if (selo) selo.innerHTML = seloIA(comoFaco, false);
  if (a.spotifyId) {
    prepararPlayerSpotify(alvo.querySelector('[data-player-album]'), {
      tipo: 'album', id: a.spotifyId, titulo: `${a.titulo} no Spotify`,
    });
  }
  alvo.querySelector('[data-perfis]').innerHTML = botoesPerfis(artista);
  // Pregações ligadas a este álbum, logo depois das faixas.
  const palavra = blocoPalavraDoAlbum(a.slug);
  const faixas = alvo.querySelector('.faixas');
  if (palavra && faixas) faixas.closest('section').insertAdjacentHTML('afterend', palavra);
  if (a.letras && /^[a-z0-9-]+$/.test(a.letras)) {
    import(`../dados/letras/${a.letras}.js`).then(({ letras }) => {
      (letras[a.slug] || []).forEach((linhas, i) => {
        const li = alvo.querySelector(`[data-faixa="${i}"]`);
        if (li && a.faixasLista[i]) li.insertAdjacentHTML('beforeend', blocoLetra(a.faixasLista[i].titulo, linhas));
      });
      protegerCapas(alvo);
    }).catch((e) => console.error('[letras]', e));   // sem letras, a lista de faixas continua normal
  }
  animarCartoes(alvo);
  protegerCapas(alvo);
  return a.subtitulo ? `${a.titulo} (${a.subtitulo})` : a.titulo;
}
