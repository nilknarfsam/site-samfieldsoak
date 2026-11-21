import { lerPlaylist, resolverFaixa, idsDoEndereco, remover, esvaziar, substituir, linkDaPlaylist, aoMudarPlaylist } from '../modules/playlist.js';
import { linhaPlaylist } from '../modules/templates-primeiras.js';
import { tocarFila, tocarOuAlternar, aoMudar, estado } from '../modules/tocador.js';
import { icone } from '../modules/templates.js';
import { contarEvento } from '../modules/contador.js';

let pararDeAcompanhar = [];

// #/playlist (a lista deste navegador) e #/playlist?f=... (lista recebida por link). Devolve o título da aba.
export function iniciarPlaylist(app) {
  pararDeAcompanhar.forEach((fn) => fn());
  pararDeAcompanhar = [];
  const recebida = idsDoEndereco();
  const compartilhada = recebida !== null;
  if (compartilhada) contarEvento('playlist/abrir-compartilhada');
  const lista = app.querySelector('[data-playlist]');
  const acoes = app.querySelector('[data-playlist-acoes]');
  const aviso = app.querySelector('[data-playlist-aviso]');
  let fila = [];

  if (compartilhada) {
    app.querySelector('[data-playlist-titulo]').textContent = 'Playlist compartilhada';
    app.querySelector('[data-playlist-lead]').textContent = 'Alguém mandou esta lista de faixas das primeiras versões para você. Dá para ouvir aqui e guardar na sua playlist.';
  }

  const desenhar = () => {
    const ids = compartilhada ? recebida : lerPlaylist();
    fila = ids.map(resolverFaixa).filter(Boolean);
    if (!fila.length) {
      acoes.innerHTML = '';
      lista.innerHTML = `<li class="playlist-vazia">${compartilhada
        ? 'Este link não tem faixas que ainda existam no site.'
        : 'Sua playlist está vazia. Nas páginas das <a href="#/primeiras-versoes">primeiras versões</a>, toque no + ao lado de uma faixa para trazê-la para cá.'}</li>`;
      return;
    }
    acoes.innerHTML = `<button class="botao" type="button" data-acao="tocar-playlist">${icone('play')} Tocar tudo</button>
      ${compartilhada
        ? `<button class="botao botao--contorno" type="button" data-acao="guardar-playlist">Juntar à minha playlist</button>`
        : `<button class="botao botao--contorno" type="button" data-acao="compartilhar-playlist">${icone('compartilhar')} Compartilhar link</button>
           <button class="botao botao--contorno" type="button" data-acao="esvaziar-playlist">Esvaziar</button>`}`;
    lista.innerHTML = fila.map((f, i) => linhaPlaylist(f, i, !compartilhada)).join('');
    marcar(estado());
  };

  const marcar = ({ faixa, tocando }) => {
    lista.querySelectorAll('li[data-faixa]').forEach((li, i) => {
      const esta = faixa?.src === fila[i]?.src;
      li.classList.toggle('faixa--atual', esta);
      if (esta) li.setAttribute('aria-current', 'true'); else li.removeAttribute('aria-current');
      const botao = li.querySelector('[data-tocar]');
      const pausar = esta && tocando;
      botao.innerHTML = icone(pausar ? 'pausa' : 'play');
      botao.setAttribute('aria-label', `${pausar ? 'Pausar' : 'Tocar'}: ${fila[i].titulo}`);
    });
  };

  const anunciar = (texto) => { aviso.textContent = ''; requestAnimationFrame(() => { aviso.textContent = texto; }); };

  app.querySelector('.musica').addEventListener('click', async (e) => {
    const tocar = e.target.closest('[data-tocar]');
    if (tocar) { tocarOuAlternar(fila, Number(tocar.dataset.tocar)); return; }
    const tirar = e.target.closest('[data-remover]');
    if (tirar) { remover(tirar.dataset.remover); anunciar('Faixa tirada da playlist.'); return; }
    const acao = e.target.closest('[data-acao]')?.dataset.acao;
    if (acao === 'tocar-playlist') tocarFila(fila, 0);
    else if (acao === 'guardar-playlist') {
      substituir([...lerPlaylist(), ...recebida]);
      anunciar('Pronto: as faixas foram juntadas à sua playlist.');
    } else if (acao === 'compartilhar-playlist') {
      const url = linkDaPlaylist(fila.map((f) => f.id));
      contarEvento('playlist/compartilhar');
      try {
        if (navigator.share) await navigator.share({ title: 'Minha playlist · primeiras versões', url });
        else { await navigator.clipboard.writeText(url); anunciar('Link copiado.'); }
      } catch (erro) { if (erro.name !== 'AbortError') anunciar(`Copie o link: ${url}`); }
    } else if (acao === 'esvaziar-playlist') {
      // Dois toques, sem janela de confirmação: o botão pede a confirmação no próprio rótulo.
      const botao = e.target.closest('[data-acao]');
      if (botao.dataset.confirmar) { esvaziar(); anunciar('Playlist esvaziada.'); }
      else { botao.dataset.confirmar = '1'; botao.textContent = 'Toque de novo para esvaziar'; }
    }
  });

  desenhar();
  pararDeAcompanhar.push(aoMudar((e) => { if (lista.isConnected) marcar(e); }));
  if (!compartilhada) pararDeAcompanhar.push(aoMudarPlaylist(() => { if (lista.isConnected) desenhar(); }));
  return compartilhada ? 'Playlist compartilhada' : 'Minha playlist';
}

