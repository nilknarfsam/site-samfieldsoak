// Player próprio das primeiras versões (T-28, docs/15).
// Um <audio> só para o site todo, numa barra fixa no rodapé, fora do #app: continua tocando quando a
// pessoa troca de página. Nada é baixado até alguém apertar tocar (preload="none").
// Um som por vez: tocar aqui fecha o embed do Spotify/Suno aberto; abrir um embed pausa este player.

import { escapar, icone } from './templates.js';
import { encerrarPlayerAtivo } from './player.js';
import { contarEvento } from './contador.js';

let audio, barra, fila = [], atual = -1;
let contado = { play: false, ouviu30: false };   // métricas da faixa atual (T-29), uma vez por faixa
const idFaixa = (f) => `${f.albumSlug}/${f.arquivo || ''}`.replace(/\.mp3$/, '');
const ouvintes = new Set();
const ouvintesTempo = new Set();

export const formatarTempo = (s) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const t = Math.floor(s);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

// A tela pode acompanhar o player (faixa atual destacada, botão tocar/pausar).
export function aoMudar(fn) { ouvintes.add(fn); return () => ouvintes.delete(fn); }
export const estado = () => ({ faixa: fila[atual] || null, tocando: Boolean(audio && !audio.paused) });
// Tela "Tocando agora" (T-30): fila, tempo e pular para um ponto da música.
export const filaAtual = () => ({ fila: [...fila], atual });
export const tempo = () => ({ agora: audio?.currentTime || 0, total: Number.isFinite(audio?.duration) ? audio.duration : (fila[atual]?.duracao || 0) });
export function aoTempo(fn) { ouvintesTempo.add(fn); return () => ouvintesTempo.delete(fn); }
export function irPara(segundos) { if (audio && atual >= 0 && Number.isFinite(segundos)) audio.currentTime = Math.max(0, segundos); }
export function tocarNaFila(i) { if (fila[i]) tocarIndice(i); }
const avisar = () => { const e = estado(); ouvintes.forEach((fn) => { try { fn(e); } catch (erro) { console.error('[tocador]', erro); } }); };

function montar() {
  if (audio) return;
  audio = document.createElement('audio');
  audio.preload = 'none';
  barra = document.createElement('section');
  barra.className = 'tocador';
  barra.hidden = true;
  barra.setAttribute('aria-label', 'Player das primeiras versões');
  barra.innerHTML = `
    <button class="tocador__faixa" type="button" data-tocador="abrir" aria-haspopup="dialog">
      <span class="tocador__capa" data-tocador-capa></span>
      <span class="tocador__textos">
        <span class="tocador__titulo" data-tocador-titulo></span>
        <span class="tocador__album" data-tocador-album></span>
      </span>
      <span class="tocador__abrir">${icone('subir')}<span class="visualmente-oculto">Abrir a tela Tocando agora, com a fila e a letra</span></span>
    </button>
    <div class="tocador__controles">
      <button class="tocador__botao" type="button" data-tocador="anterior" aria-label="Faixa anterior">${icone('anterior')}</button>
      <button class="tocador__botao tocador__botao--principal" type="button" data-tocador="alternar" aria-label="Tocar">${icone('play')}</button>
      <button class="tocador__botao" type="button" data-tocador="proxima" aria-label="Próxima faixa">${icone('proxima')}</button>
    </div>
    <div class="tocador__tempo">
      <span class="tocador__numero" data-tocador-agora>0:00</span>
      <input class="tocador__barra" type="range" min="0" max="0" step="1" value="0" aria-label="Posição na música" data-tocador-posicao>
      <span class="tocador__numero" data-tocador-total>0:00</span>
    </div>
    <label class="tocador__volume"><span class="visualmente-oculto">Volume</span>
      <input type="range" min="0" max="1" step="0.05" value="1" data-tocador-volume>
    </label>
    <button class="tocador__botao tocador__fechar" type="button" data-tocador="fechar" aria-label="Fechar o player">${icone('fechar')}</button>
    <p class="visualmente-oculto" aria-live="polite" data-tocador-aviso></p>`;
  barra.append(audio);
  document.body.append(barra);

  barra.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-tocador]')?.dataset.tocador;
    if (acao === 'alternar') alternar();
    else if (acao === 'anterior') anterior();
    else if (acao === 'proxima') proxima();
    else if (acao === 'fechar') fechar();
    else if (acao === 'abrir') document.dispatchEvent(new Event('abrir-tocando'));
  });
  const posicao = barra.querySelector('[data-tocador-posicao]');
  posicao.addEventListener('input', () => { audio.currentTime = Number(posicao.value); });
  barra.querySelector('[data-tocador-volume]').addEventListener('input', (e) => { audio.volume = Number(e.target.value); });

  audio.addEventListener('timeupdate', () => {
    atualizarTempo();
    avisarTempo();
    const f = fila[atual];
    if (f && !contado.ouviu30 && audio.currentTime >= 30) { contado.ouviu30 = true; contarEvento(`ouviu30/${idFaixa(f)}`, f.titulo); }
  });
  audio.addEventListener('loadedmetadata', () => { atualizarTempo(); avisarTempo(); });
  audio.addEventListener('seeked', avisarTempo);
  audio.addEventListener('play', () => {
    encerrarPlayerAtivo(); atualizarBotao(); avisar();
    const f = fila[atual];
    if (f && !contado.play) { contado.play = true; contarEvento(`play/${idFaixa(f)}`, f.titulo); }
  });
  audio.addEventListener('pause', () => { atualizarBotao(); avisar(); });
  audio.addEventListener('ended', () => { const f = fila[atual]; if (f) contarEvento(`fim/${idFaixa(f)}`, f.titulo); if (atual < fila.length - 1) tocarIndice(atual + 1); else { audio.currentTime = 0; atualizarBotao(); avisar(); } });
  audio.addEventListener('error', () => {
    if (!audio.getAttribute('src')) return;
    anunciar('Não foi possível carregar esta música agora. Tente de novo em instantes.');
    atualizarBotao(); avisar();
  });

  // Embed do Spotify/Suno abriu: este player pausa (um som por vez).
  document.addEventListener('player-externo', () => audio.pause());
  // Espaço tocar/pausar, só quando o foco não está num campo ou botão (que já usam o espaço).
  document.addEventListener('keydown', (e) => {
    if (e.key !== ' ' || barra.hidden || e.altKey || e.ctrlKey || e.metaKey) return;
    const alvo = document.activeElement;
    if (alvo && alvo !== document.body && alvo.id !== 'app' && !alvo.matches?.('h1, h2, [tabindex="-1"]')) return;
    e.preventDefault();
    alternar();
  });
  if ('mediaSession' in navigator) {
    const acoes = { play: () => alternar(true), pause: () => audio.pause(), previoustrack: anterior, nexttrack: proxima,
      seekto: (d) => { if (Number.isFinite(d.seekTime)) audio.currentTime = d.seekTime; } };
    for (const [acao, fn] of Object.entries(acoes)) { try { navigator.mediaSession.setActionHandler(acao, fn); } catch { /* ação sem suporte */ } }
  }
}

function avisarTempo() {
  const t = tempo();
  ouvintesTempo.forEach((fn) => { try { fn(t); } catch (erro) { console.error('[tocador]', erro); } });
}

function anunciar(texto) {
  const aviso = barra.querySelector('[data-tocador-aviso]');
  aviso.textContent = '';
  requestAnimationFrame(() => { aviso.textContent = texto; });
}

function atualizarTempo() {
  const total = Number.isFinite(audio.duration) ? audio.duration : (fila[atual]?.duracao || 0);
  const posicao = barra.querySelector('[data-tocador-posicao]');
  posicao.max = String(Math.floor(total));
  posicao.value = String(Math.floor(audio.currentTime));
  posicao.setAttribute('aria-valuetext', `${formatarTempo(audio.currentTime)} de ${formatarTempo(total)}`);
  barra.querySelector('[data-tocador-agora]').textContent = formatarTempo(audio.currentTime);
  barra.querySelector('[data-tocador-total]').textContent = formatarTempo(total);
}

function atualizarBotao() {
  const botao = barra.querySelector('[data-tocador="alternar"]');
  const tocando = !audio.paused;
  botao.setAttribute('aria-label', tocando ? 'Pausar' : 'Tocar');
  botao.innerHTML = icone(tocando ? 'pausa' : 'play');
  barra.querySelector('[data-tocador="anterior"]').disabled = atual <= 0 && audio.currentTime < 3;
  barra.querySelector('[data-tocador="proxima"]').disabled = atual >= fila.length - 1;
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = tocando ? 'playing' : 'paused';
}

function mostrarFaixa(f) {
  barra.hidden = false;
  document.body.classList.add('com-tocador');
  barra.querySelector('[data-tocador-titulo]').textContent = f.titulo;
  barra.querySelector('[data-tocador-album]').textContent = [f.texto, f.albumTitulo].filter(Boolean).join(' · ');
  barra.querySelector('[data-tocador-capa]').innerHTML = f.capa
    ? `<img src="${escapar(f.capa)}-480.webp" alt="" width="48" height="48" draggable="false">` : '';
  if ('mediaSession' in navigator && 'MediaMetadata' in window) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: f.titulo, artist: 'Franklin Carvalho', album: `${f.albumTitulo} (primeira versão)`,
      artwork: f.capa ? [{ src: new URL(`${f.capa}-480.webp`, location.href).href, sizes: '480x480', type: 'image/webp' }] : [],
    });
  }
}

function tocarIndice(i) {
  const f = fila[i];
  if (!f) return;
  atual = i;
  contado = { play: false, ouviu30: false };
  mostrarFaixa(f);
  audio.src = f.src;
  atualizarTempo();
  avisar();   // a tela Tocando agora troca de faixa já, sem esperar o áudio carregar
  tocar();
}

function tocar() {
  audio.play().catch((e) => { if (e.name !== 'AbortError') console.error('[tocador]', e); atualizarBotao(); avisar(); });
}

// fila: [{ albumSlug, albumTitulo, capa, titulo, texto, src, duracao }]
export function tocarFila(novaFila, inicio = 0) {
  montar();
  fila = novaFila;
  tocarIndice(inicio);
}

// Mesma faixa: alterna tocar/pausar; outra: começa a fila a partir dela.
export function tocarOuAlternar(novaFila, indice) {
  const f = fila[atual];
  const alvo = novaFila[indice];
  if (f && alvo && f.src === alvo.src) { alternar(); return; }
  tocarFila(novaFila, indice);
}

export function alternar(forcarTocar = false) {
  if (!audio || atual < 0) return;
  if (audio.paused || forcarTocar) tocar(); else audio.pause();
}

export function proxima() { if (atual < fila.length - 1) tocarIndice(atual + 1); }
export function anterior() {
  if (audio.currentTime > 3 || atual <= 0) { audio.currentTime = 0; return; }
  tocarIndice(atual - 1);
}

export function fechar() {
  if (!audio) return;
  audio.pause();
  audio.removeAttribute('src');
  audio.load();
  fila = []; atual = -1;
  barra.hidden = true;
  document.body.classList.remove('com-tocador');
  if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
  avisar();
  document.getElementById('app')?.focus({ preventScroll: true });
}
