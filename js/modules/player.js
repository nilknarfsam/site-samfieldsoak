// Player do Spotify com carregamento no toque ("fachada").
// Nada é pedido ao Spotify até a pessoa tocar em "Ouvir aqui": o site continua
// leve e sem cookies de terceiros enquanto ninguém quer ouvir (regra "sem coleta de dados").

const TIPOS = ['artist', 'album', 'playlist', 'track'];
const ID_VALIDO = /^[A-Za-z0-9]{22}$/;   // IDs do Spotify têm 22 caracteres base62

export function prepararPlayerSpotify(container, { tipo, id, titulo, rotulo = 'Ouvir aqui', compacto = false }) {
  if (!container) return;
  if (!TIPOS.includes(tipo) || !ID_VALIDO.test(id)) { container.hidden = true; return; }
  container.innerHTML = compacto
    ? `<button class="player__fachada player__fachada--compacta" type="button" data-acao="carregar-player">
      <span class="player__icone" aria-hidden="true">▶</span>
      <span class="player__texto"><strong>${rotulo}</strong></span>
    </button>`
    : `
    <button class="player__fachada" type="button" data-acao="carregar-player">
      <span class="player__icone" aria-hidden="true">▶</span>
      <span class="player__texto">
        <strong>${rotulo}</strong>
        <small>Player do Spotify. Carrega só quando você tocar.</small>
      </span>
    </button>`;
  container.querySelector('button').addEventListener('click', () => {
    const quadro = document.createElement('iframe');
    quadro.className = compacto ? 'player__quadro player__quadro--compacto' : 'player__quadro';
    quadro.src = `https://open.spotify.com/embed/${tipo}/${id}?theme=0`;
    quadro.title = titulo;
    quadro.loading = 'lazy';
    quadro.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    container.replaceChildren(quadro);
    quadro.focus();
  }, { once: true });
}
