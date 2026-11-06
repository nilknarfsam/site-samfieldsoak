import { icone, escapar } from './templates.js';

const ID_SUNO = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
let restaurarPlayerAtivo = null;

// Remover o iframe encerra o áudio sem depender de APIs dos provedores.
// A fachada volta; abrir a faixa novamente não retoma a posição anterior.
export function encerrarPlayerAtivo() {
  const restaurar = restaurarPlayerAtivo;
  restaurarPlayerAtivo = null;
  restaurar?.();
}

function carregarExclusivo(container, criarQuadro, restaurar, { encerrar = false } = {}) {
  encerrarPlayerAtivo();
  const quadro = criarQuadro();
  container.replaceChildren(quadro);
  restaurarPlayerAtivo = restaurar;
  if (encerrar) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'botao botao--contorno player__encerrar';
    botao.textContent = 'Encerrar reprodução';
    botao.addEventListener('click', () => {
      encerrarPlayerAtivo();
      container.querySelector('button')?.focus();
    }, { once: true });
    container.append(botao);
  }
  quadro.focus();
}

export function prepararPlayerSuno(container, { id, titulo }) {
  if (!container) return;
  if (!ID_SUNO.test(id || '')) { container.hidden = true; return; }
  const restaurar = () => {
    container.innerHTML = `<button class="player__fachada player__fachada--compacta" type="button" aria-label="${escapar('Ouvir no Suno: ' + titulo)}">
      <span class="player__icone" aria-hidden="true">${icone('play')}</span>
      <span class="player__texto"><strong>Ouvir no Suno</strong></span>
    </button>`;
    container.querySelector('button').addEventListener('click', () => carregarExclusivo(container, () => {
      const quadro = document.createElement('iframe');
      quadro.className = 'player__quadro player__quadro--suno';
      quadro.src = `https://suno.com/embed/${id}`;
      quadro.title = `${titulo} no Suno`;
      quadro.width = '100%';
      quadro.height = '240';
      quadro.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
      quadro.setAttribute('allowfullscreen', '');
      quadro.setAttribute('loading', 'lazy');
      return quadro;
    }, restaurar, { encerrar: true }), { once: true });
  };
  restaurar();
}

// Player do Spotify com carregamento no toque ("fachada").
// Nada é pedido ao Spotify até a pessoa tocar em "Ouvir aqui": o site continua
// leve e sem cookies de terceiros enquanto ninguém quer ouvir (regra "sem coleta de dados").

const TIPOS = ['artist', 'album', 'playlist', 'track'];
const ID_VALIDO = /^[A-Za-z0-9]{22}$/;   // IDs do Spotify têm 22 caracteres base62

export function prepararPlayerSpotify(container, { tipo, id, titulo, rotulo = 'Ouvir aqui', compacto = false }) {
  if (!container) return;
  if (!TIPOS.includes(tipo) || !ID_VALIDO.test(id)) { container.hidden = true; return; }
  const restaurar = () => {
    container.innerHTML = compacto
    ? `<button class="player__fachada player__fachada--compacta" type="button" data-acao="carregar-player">
      <span class="player__icone" aria-hidden="true">${icone('play')}</span>
      <span class="player__texto"><strong>${rotulo}</strong></span>
    </button>`
    : `
    <button class="player__fachada" type="button" data-acao="carregar-player">
      <span class="player__icone" aria-hidden="true">${icone('play')}</span>
      <span class="player__texto">
        <strong>${rotulo}</strong>
        <small>Player do Spotify</small>
      </span>
    </button>`;
    container.querySelector('button').addEventListener('click', () => carregarExclusivo(container, () => {
      const quadro = document.createElement('iframe');
      quadro.className = compacto ? 'player__quadro player__quadro--compacto' : 'player__quadro';
      quadro.src = `https://open.spotify.com/embed/${tipo}/${id}?theme=0`;
      quadro.title = titulo;
      quadro.loading = 'lazy';
      quadro.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
      return quadro;
    }, restaurar), { once: true });
  };
  restaurar();
}
