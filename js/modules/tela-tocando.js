// Tela "Tocando agora" (T-30, docs/15): abre ao tocar na barra do player, no jeito dos apps de música.
// Capa grande, tempo, controles e duas abas: "A seguir" (a fila) e "Letra" (a letra da faixa atual).
// É um <dialog> modal: prende o foco, fecha com Esc e com o Voltar do celular. Nada novo é baixado
// até a pessoa abrir a aba Letra (o arquivo de letras do álbum vem sob demanda e fica guardado).

import { escapar, icone } from './templates.js';
import { faixasPrimeiras } from '../dados/primeiras-versoes.js';
import { aoMudar, aoTempo, estado, filaAtual, tempo, irPara, tocarNaFila, alternar, proxima, anterior, formatarTempo } from './tocador.js';
import { rotaPrimeira } from './templates-primeiras.js';
import { protegerCapas } from './protecao.js';
import { contarEvento } from './contador.js';
import { barrinhas } from './templates-primeiras.js';
import { idDaFaixa, naPlaylist, adicionar, remover, aoMudarPlaylist } from './playlist.js';

let tela, aba = 'fila', faixaMostrada = null, arrastando = false;
const letrasCarregadas = new Map();   // slug do arquivo de letras → Promise das letras
const letraContada = new Set();

const abas = [['fila', 'A seguir'], ['letra', 'Letra']];

function montar() {
  if (tela) return;
  tela = document.createElement('dialog');
  tela.className = 'tocando';
  tela.setAttribute('aria-labelledby', 'tocando-titulo');
  tela.innerHTML = `
    <div class="tocando__fundo" data-tocando-fundo aria-hidden="true"></div>
    <div class="tocando__topo">
      <button class="tocador__botao" type="button" data-tocando="fechar" aria-label="Fechar a tela Tocando agora">${icone('descer')}</button>
      <p class="tocando__rotulo">Tocando agora</p>
      <a class="tocando__album-link" data-tocando-album-link href="#/ouvir">Ver o álbum</a>
    </div>
    <div class="tocando__corpo">
      <div class="tocando__principal">
        <div class="tocando__capa" data-tocando-capa data-protegida></div>
        <div class="tocando__info">
          <h2 class="tocando__titulo" id="tocando-titulo" data-tocando-titulo></h2>
          <p class="tocando__album" data-tocando-album></p>
        </div>
        <div class="tocando__acoes">
          <button class="tocando__pilula" type="button" data-tocando="salvar" aria-pressed="false">${icone('mais')} <span data-tocando-salvar-rotulo>Salvar</span></button>
          <button class="tocando__pilula" type="button" data-tocando="compartilhar">${icone('compartilhar')} Compartilhar</button>
        </div>
        <p class="visualmente-oculto" aria-live="polite" data-tocando-aviso></p>
        <div class="tocando__tempo">
          <input class="tocador__barra" type="range" min="0" max="0" step="1" value="0" aria-label="Posição na música" data-tocando-posicao>
          <span class="tocando__numeros"><span data-tocando-agora>0:00</span><span data-tocando-total>0:00</span></span>
        </div>
        <div class="tocando__controles">
          <button class="tocador__botao" type="button" data-tocando="anterior" aria-label="Faixa anterior">${icone('anterior')}</button>
          <button class="tocador__botao tocador__botao--principal tocando__alternar" type="button" data-tocando="alternar" aria-label="Tocar">${icone('play')}</button>
          <button class="tocador__botao" type="button" data-tocando="proxima" aria-label="Próxima faixa">${icone('proxima')}</button>
        </div>
      </div>
      <div class="tocando__lado">
        <div class="tocando__abas" role="tablist" aria-label="Fila e letra">
          ${abas.map(([id, rotulo]) => `<button class="tocando__aba" type="button" role="tab" id="tocando-aba-${id}" aria-controls="tocando-painel-${id}" data-tocando-aba="${id}">${rotulo}</button>`).join('')}
        </div>
        <ol class="tocando__painel tocando__fila lista-limpa" role="tabpanel" id="tocando-painel-fila" aria-labelledby="tocando-aba-fila" data-tocando-painel="fila"></ol>
        <div class="tocando__painel tocando__letra" role="tabpanel" id="tocando-painel-letra" aria-labelledby="tocando-aba-letra" data-tocando-painel="letra" tabindex="0" data-protegida></div>
      </div>
    </div>`;
  document.body.append(tela);

  tela.addEventListener('click', (e) => {
    const acao = e.target.closest('[data-tocando]')?.dataset.tocando;
    if (acao === 'fechar') fecharTela();
    else if (acao === 'alternar') alternar();
    else if (acao === 'anterior') anterior();
    else if (acao === 'proxima') proxima();
    else if (acao === 'salvar') salvar();
    else if (acao === 'compartilhar') compartilhar();
    const item = e.target.closest('[data-tocando-fila]');
    if (item) tocarNaFila(Number(item.dataset.tocandoFila));
    const trocar = e.target.closest('[data-tocando-aba]');
    if (trocar) mostrarAba(trocar.dataset.tocandoAba);
    const link = e.target.closest('[data-tocando-album-link]');
    if (link) {
      // Fecha primeiro (o Voltar tira o degrau da tela) e só depois troca de página.
      e.preventDefault();
      const destino = link.getAttribute('href');
      if (history.state?.tocando) window.addEventListener('popstate', () => { location.hash = destino; }, { once: true });
      else setTimeout(() => { location.hash = destino; });
      fecharTela();
    }
  });
  // Setas trocam de aba (padrão de abas acessíveis).
  tela.querySelector('.tocando__abas').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const i = abas.findIndex(([id]) => id === aba);
    const proximaAba = abas[(i + (e.key === 'ArrowRight' ? 1 : abas.length - 1)) % abas.length][0];
    mostrarAba(proximaAba);
    tela.querySelector(`[data-tocando-aba="${proximaAba}"]`).focus();
  });
  const posicao = tela.querySelector('[data-tocando-posicao]');
  posicao.addEventListener('input', () => { arrastando = true; tela.querySelector('[data-tocando-agora]').textContent = formatarTempo(Number(posicao.value)); });
  posicao.addEventListener('change', () => { arrastando = false; irPara(Number(posicao.value)); });
  // Fechou por Esc (ou pelo próprio navegador): tira o degrau que a tela pôs no histórico.
  tela.addEventListener('close', () => {
    document.documentElement.classList.remove('com-tela-tocando');
    if (history.state?.tocando) history.back();
  });
  // Voltar do celular fecha a tela em vez de sair da página.
  window.addEventListener('popstate', () => { if (tela.open) tela.close(); });

  protegerCapas(tela);
  aoMudarPlaylist(() => { if (tela.open) marcarSalvar(); });
  aoMudar(() => { if (tela.open) desenhar(); });
  aoTempo((t) => { if (tela.open) atualizarTempo(t); });
}

function abrirTela() {
  if (!estado().faixa) return;
  montar();
  if (tela.open) return;
  faixaMostrada = null;
  desenhar();
  history.pushState({ tocando: true }, '');   // mesmo endereço: o roteador não percebe, só o Voltar
  tela.showModal();
  document.documentElement.classList.add('com-tela-tocando');
  tela.querySelector('[data-tocando="alternar"]').focus();
  contarEvento('tocando/abrir');
}

function fecharTela() {
  if (!tela?.open) return;
  tela.close();   // o evento close limpa o histórico
}

function desenhar() {
  const { faixa, tocando } = estado();
  if (!faixa) { fecharTela(); return; }
  const alternarBotao = tela.querySelector('[data-tocando="alternar"]');
  alternarBotao.innerHTML = icone(tocando ? 'pausa' : 'play');
  alternarBotao.setAttribute('aria-label', tocando ? 'Pausar' : 'Tocar');
  const { fila, atual } = filaAtual();
  tela.querySelector('[data-tocando="anterior"]').disabled = atual <= 0 && tempo().agora < 3;
  tela.querySelector('[data-tocando="proxima"]').disabled = atual >= fila.length - 1;
  if (faixaMostrada !== faixa.src) {
    faixaMostrada = faixa.src;
    tela.querySelector('[data-tocando-titulo]').textContent = faixa.titulo;
    tela.querySelector('[data-tocando-album]').textContent = [faixa.texto, faixa.albumTitulo].filter(Boolean).join(' · ');
    tela.querySelector('[data-tocando-album-link]').href = rotaPrimeira(faixa.albumSlug);
    const capa = faixa.capa ? `<img src="${escapar(faixa.capa)}-960.webp" alt="" width="480" height="480" draggable="false">` : '';
    tela.querySelector('[data-tocando-capa]').innerHTML = capa
      ? capa.replace('alt=""', `alt="${escapar(`Capa de ${faixa.albumTitulo}`)}"`) : '';
    tela.querySelector('[data-tocando-fundo]').style.backgroundImage = faixa.capa ? `url("${faixa.capa}-480.webp")` : '';
    if (aba === 'letra') desenharLetra(faixa);
  }
  desenharFila(fila, atual, tocando);
  marcarSalvar();
  mostrarAba(aba, false);
  atualizarTempo(tempo());
}

// "Salvar" = pôr ou tirar a faixa da Minha playlist (a mesma do "+" das páginas dos álbuns).
const idAtual = () => {
  const f = estado().faixa;
  return f ? idDaFaixa(f.albumSlug, Number(String(f.arquivo).slice(0, 2)) - 1) : null;
};
function marcarSalvar() {
  const id = idAtual();
  const salvo = Boolean(id && naPlaylist(id));
  const botao = tela.querySelector('[data-tocando="salvar"]');
  botao.setAttribute('aria-pressed', String(salvo));
  botao.querySelector('svg')?.replaceWith(document.createRange().createContextualFragment(icone(salvo ? 'certo' : 'mais')));
  tela.querySelector('[data-tocando-salvar-rotulo]').textContent = salvo ? 'Na playlist' : 'Salvar';
}
function salvar() {
  const id = idAtual();
  if (!id) return;
  if (naPlaylist(id)) { remover(id); anunciar('Faixa tirada da sua playlist.'); }
  else { adicionar(id); contarEvento('playlist/adicionar'); anunciar('Faixa salva na sua playlist.'); }
}
async function compartilhar() {
  const f = estado().faixa;
  if (!f) return;
  const url = `${location.origin}${location.pathname}${rotaPrimeira(f.albumSlug)}`;
  contarEvento('tocando/compartilhar');
  try {
    if (navigator.share) await navigator.share({ title: `${f.titulo} · ${f.albumTitulo}`, url });
    else { await navigator.clipboard.writeText(url); anunciar('Link do álbum copiado.'); }
  } catch (erro) { if (erro.name !== 'AbortError') anunciar(`Copie o link: ${url}`); }
}
function anunciar(texto) {
  const aviso = tela.querySelector('[data-tocando-aviso]');
  aviso.textContent = '';
  requestAnimationFrame(() => { aviso.textContent = texto; });
}

function desenharFila(fila, atual, tocando) {
  tela.querySelector('[data-tocando-painel="fila"]').innerHTML = fila.map((f, i) => `
    <li>
      <button class="tocando__item" type="button" data-tocando-fila="${i}" ${i === atual ? 'aria-current="true"' : ''}>
        <span class="tocando__item-icone">${i === atual ? barrinhas(tocando) : `<span class="tocando__item-numero">${i + 1}</span>`}</span>
        <span class="tocando__item-textos">
          <span class="tocando__item-titulo">${escapar(f.titulo)}</span>
          <span class="tocando__item-sub">${escapar([f.texto, f.albumTitulo].filter(Boolean).join(' · '))}</span>
        </span>
        <span class="tocando__item-duracao">${formatarTempo(f.duracao)}</span>
      </button>
    </li>`).join('');
  tela.querySelector('[data-tocando-fila][aria-current]')?.scrollIntoView({ block: 'nearest' });
}

function mostrarAba(id, trocou = true) {
  aba = id;
  abas.forEach(([cada]) => {
    const ativa = cada === id;
    const botao = tela.querySelector(`[data-tocando-aba="${cada}"]`);
    botao.setAttribute('aria-selected', String(ativa));
    botao.tabIndex = ativa ? 0 : -1;
    tela.querySelector(`[data-tocando-painel="${cada}"]`).hidden = !ativa;
  });
  if (trocou && id === 'letra') desenharLetra(estado().faixa);
}

// A letra da faixa atual: o arquivo de letras do álbum, na posição da faixa (01-... → 0).
function letraDa(faixa) {
  const dados = faixasPrimeiras[faixa.albumSlug];
  const indice = Number(String(faixa.arquivo || '').slice(0, 2)) - 1;
  if (!dados?.letras || !/^[a-z0-9-]+$/.test(dados.letras) || indice < 0) return Promise.resolve(null);
  if (!letrasCarregadas.has(dados.letras)) {
    letrasCarregadas.set(dados.letras, import(`../dados/letras/${dados.letras}.js`).then((m) => m.letras)
      .catch((e) => { letrasCarregadas.delete(dados.letras); throw e; }));
  }
  return letrasCarregadas.get(dados.letras).then((letras) => letras?.[faixa.albumSlug]?.[indice] || null);
}

function desenharLetra(faixa) {
  const painel = tela.querySelector('[data-tocando-painel="letra"]');
  if (!faixa) return;
  painel.dataset.faixa = faixa.src;
  painel.innerHTML = '<p class="tocando__aviso">Carregando a letra…</p>';
  letraDa(faixa).then((linhas) => {
    if (painel.dataset.faixa !== faixa.src) return;   // trocou de faixa enquanto carregava
    if (!linhas?.length) { painel.innerHTML = '<p class="tocando__aviso">Esta faixa ainda não tem letra aqui no site.</p>'; return; }
    // Linha vazia separa as partes da música (estrofe, refrão).
    painel.innerHTML = `<div class="tocando__estrofes">${linhas.map((l) => (l ? `<p class="tocando__linha">${escapar(l)}</p>` : '<span class="tocando__pausa"></span>')).join('')}</div>`;
    painel.scrollTop = 0;
    const id = `${faixa.albumSlug}/${String(faixa.arquivo).replace(/\.mp3$/, '')}`;
    if (!letraContada.has(id)) { letraContada.add(id); contarEvento(`letra/${id}`, faixa.titulo); }
  }).catch((e) => {
    console.error('[letras]', e);
    if (painel.dataset.faixa === faixa.src) painel.innerHTML = '<p class="tocando__aviso">Não foi possível carregar a letra agora.</p>';
  });
}

function atualizarTempo({ agora, total }) {
  const posicao = tela.querySelector('[data-tocando-posicao]');
  posicao.max = String(Math.floor(total));
  if (!arrastando) {
    posicao.value = String(Math.floor(agora));
    tela.querySelector('[data-tocando-agora]').textContent = formatarTempo(agora);
  }
  posicao.setAttribute('aria-valuetext', `${formatarTempo(agora)} de ${formatarTempo(total)}`);
  tela.querySelector('[data-tocando-total]').textContent = formatarTempo(total);
}

export function registrarTelaTocando() {
  document.addEventListener('abrir-tocando', abrirTela);
}
