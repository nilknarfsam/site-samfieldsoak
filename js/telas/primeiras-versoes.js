import { primeirasVersoes } from '../dados/albuns.js';
import { faixasPrimeiras, urlAudio, temPlayerProprio } from '../dados/primeiras-versoes.js';
import { detalhePrimeira, cartaoPrimeiraPagina, marcarBotaoPlaylist } from '../modules/templates-primeiras.js';
import { idDaFaixa, naPlaylist, adicionar, remover, aoMudarPlaylist } from '../modules/playlist.js';
import { blocoLetra } from '../modules/templates-musica.js';
import { naoEncontrado, icone } from '../modules/templates.js';
import { tocarFila, tocarOuAlternar, aoMudar, estado } from '../modules/tocador.js';
import { animarCartoes } from '../modules/movimento.js';
import { protegerCapas } from '../modules/protecao.js';
import { contarEvento } from '../modules/contador.js';

// #/primeiras-versoes: os 7 álbuns; os que já têm áudio no site abrem a página com player.
export function iniciarPrimeirasLista(app) {
  app.querySelector('[data-primeiras-texto]').textContent = primeirasVersoes.texto;
  app.querySelector('[data-primeiras]').innerHTML = primeirasVersoes.albuns
    .map((a) => cartaoPrimeiraPagina(a, temPlayerProprio(a.slug))).join('');
  animarCartoes(app);
  protegerCapas(app);
}

// Para de acompanhar o player quando a pessoa sai da página do álbum.
let pararDeAcompanhar = null;

// #/primeiras-versoes/<slug>. Devolve o título da aba.
export function iniciarPrimeirasAlbum(app, slug) {
  pararDeAcompanhar?.();
  pararDeAcompanhar = null;
  const alvo = app.querySelector('[data-detalhe]');
  const a = primeirasVersoes.albuns.find((x) => x.slug === slug);
  const dados = faixasPrimeiras[slug];
  if (!a || !dados?.faixas?.length) {
    alvo.classList.add('container--texto');
    alvo.innerHTML = naoEncontrado('Primeiras versões', '#/primeiras-versoes');
    return 'Conteúdo não encontrado';
  }
  alvo.innerHTML = detalhePrimeira(a, dados);
  const fila = dados.faixas.map((f) => ({
    albumSlug: a.slug, albumTitulo: a.titulo, capa: a.capa, titulo: f.titulo, texto: f.texto,
    arquivo: f.arquivo, src: urlAudio(a.slug, f.arquivo), duracao: f.duracao,
  }));

  alvo.querySelector('[data-acao="tocar-album"]').addEventListener('click', () => tocarFila(fila, 0));
  alvo.querySelector('.faixas').addEventListener('click', (e) => {
    const botao = e.target.closest('[data-tocar]');
    if (botao) tocarOuAlternar(fila, Number(botao.dataset.tocar));
    const mais = e.target.closest('[data-playlist]');
    if (mais) {
      const id = idDaFaixa(a.slug, Number(mais.dataset.playlist));
      if (naPlaylist(id)) remover(id);
      else { adicionar(id); contarEvento('playlist/adicionar'); }
    }
  });
  const marcarPlaylist = () => alvo.querySelectorAll('[data-playlist]').forEach((b) =>
    marcarBotaoPlaylist(b, naPlaylist(idDaFaixa(a.slug, Number(b.dataset.playlist)))));
  marcarPlaylist();
  const pararPlaylist = aoMudarPlaylist(() => { if (alvo.isConnected) marcarPlaylist(); else pararPlaylist(); });

  // Destaca a faixa que está tocando e troca o ícone do botão dela.
  const marcar = ({ faixa, tocando }) => {
    alvo.querySelectorAll('.faixas li').forEach((li, i) => {
      const esta = faixa?.src === fila[i].src;
      li.classList.toggle('faixa--atual', esta);
      if (esta) li.setAttribute('aria-current', 'true'); else li.removeAttribute('aria-current');
      const botao = li.querySelector('[data-tocar]');
      const pausar = esta && tocando;
      botao.innerHTML = icone(pausar ? 'pausa' : 'play');
      botao.setAttribute('aria-label', `${pausar ? 'Pausar' : 'Tocar'}: ${fila[i].titulo}`);
    });
  };
  pararDeAcompanhar = aoMudar((e) => { if (alvo.isConnected) marcar(e); else { pararDeAcompanhar?.(); pararDeAcompanhar = null; } });
  marcar(estado());

  if (dados.letras && /^[a-z0-9-]+$/.test(dados.letras)) {
    import(`../dados/letras/${dados.letras}.js`).then(({ letras }) => {
      (letras[a.slug] || []).forEach((linhas, i) => {
        const li = alvo.querySelector(`[data-faixa="${i}"]`);
        if (li && dados.faixas[i]) li.insertAdjacentHTML('beforeend', blocoLetra(dados.faixas[i].titulo, linhas));
      });
      // Métrica anônima (T-29): qual letra foi aberta, uma vez por página.
      alvo.querySelectorAll('.faixas details.letra').forEach((d) => d.addEventListener('toggle', () => {
        const i = Number(d.closest('[data-faixa]')?.dataset.faixa);
        if (d.open && dados.faixas[i]) contarEvento(`letra/${a.slug}/${dados.faixas[i].arquivo.replace(/\.mp3$/, '')}`, dados.faixas[i].titulo);
      }, { once: true }));
      protegerCapas(alvo);
    }).catch((e) => console.error('[letras]', e));   // sem letras, as faixas continuam tocando
  }
  animarCartoes(alvo);
  protegerCapas(alvo);
  return `${a.titulo} (primeira versão)`;
}
