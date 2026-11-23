// Tela "Tocando agora" (T-30, docs/15): abre ao tocar na barra do player, no jeito do YouTube Music.
// Capa grande, Letra/Salvar/Compartilhar, tempo e controles. Embaixo, uma gaveta com "A seguir" (a fila)
// e "Letra": no celular ela aparece só como uma alça; puxar para cima (ou tocar) abre a gaveta na tela
// toda, com um mini player no topo; puxar para baixo, tocar na alça ou o Voltar devolve ao player.
// No computador (1024px+) a gaveta fica sempre aberta, à direita da capa.
// É um <dialog> modal: prende o foco, fecha com Esc e com o Voltar do celular. A letra só é baixada
// quando a pessoa abre a aba Letra (o arquivo de letras do álbum vem sob demanda e fica guardado).
// Letra sincronizada (T-31): se o álbum tiver tempos (js/dados/tempos/), a linha cantada fica destacada,
// a letra rola sozinha (para por uns segundos quando a pessoa rola com o dedo) e tocar numa linha pula
// a música para ali. Sem tempos, a letra aparece inteira e parada, como antes.

import { escapar, icone } from './templates.js';
import { faixasPrimeiras } from '../dados/primeiras-versoes.js';
import { aoMudar, aoTempo, estado, filaAtual, tempo, irPara, tocarNaFila, alternar, proxima, anterior, formatarTempo } from './tocador.js';
import { rotaPrimeira, barrinhas } from './templates-primeiras.js';
import { protegerCapas } from './protecao.js';
import { contarEvento } from './contador.js';
import { idDaFaixa, naPlaylist, adicionar, remover, aoMudarPlaylist } from './playlist.js';

let tela, gaveta, aba = 'fila', faixaMostrada = null, arrastandoTempo = false;
const letrasCarregadas = new Map();   // slug do arquivo de letras → Promise das letras
const temposCarregados = new Map();   // slug do arquivo de tempos → Promise dos tempos
let linhaAtual = -1, gestoNaLetra = 0;
const PAUSA_ROLAGEM = 4000;   // ms sem rolar sozinha depois que a pessoa rola a letra
const ADIANTO = 0.3;          // s: acende a linha um pouco antes da voz
const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)');
const letraContada = new Set();
const abas = [['fila', 'A seguir'], ['letra', 'Letra']];
const computador = window.matchMedia('(min-width: 1024px)');
const PUXAO = 60;   // px de arrasto que bastam para abrir ou fechar a gaveta

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
          <button class="tocando__pilula" type="button" data-tocando="letra">${icone('letra')} Letra</button>
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
      <section class="tocando__gaveta" data-tocando-gaveta aria-label="Fila e letra">
        <div class="tocando__cabeca" data-tocando-cabeca>
          <button class="tocando__puxador" type="button" data-tocando="puxador" aria-expanded="false" aria-label="Abrir a fila e a letra"><span aria-hidden="true"></span></button>
          <div class="tocando__mini">
            <span class="tocando__mini-capa" data-tocando-mini-capa></span>
            <span class="tocando__mini-textos">
              <span class="tocando__mini-titulo" data-tocando-mini-titulo></span>
              <span class="tocando__mini-album" data-tocando-mini-album></span>
            </span>
            <button class="tocador__botao" type="button" data-tocando="alternar" aria-label="Tocar">${icone('play')}</button>
          </div>
          <div class="tocando__abas" role="tablist" aria-label="Fila e letra">
            ${abas.map(([id, rotulo]) => `<button class="tocando__aba" type="button" role="tab" id="tocando-aba-${id}" aria-controls="tocando-painel-${id}" data-tocando-aba="${id}">${rotulo}</button>`).join('')}
          </div>
        </div>
        <ol class="tocando__painel tocando__fila lista-limpa" role="tabpanel" id="tocando-painel-fila" aria-labelledby="tocando-aba-fila" data-tocando-painel="fila"></ol>
        <div class="tocando__painel tocando__letra" role="tabpanel" id="tocando-painel-letra" aria-labelledby="tocando-aba-letra" data-tocando-painel="letra" tabindex="0" data-protegida></div>
      </section>
    </div>`;
  document.body.append(tela);
  gaveta = tela.querySelector('[data-tocando-gaveta]');

  tela.addEventListener('click', (e) => {
    if (gaveta.dataset.arrastou) { delete gaveta.dataset.arrastou; e.preventDefault(); return; }   // foi arrasto, não toque
    const acao = e.target.closest('[data-tocando]')?.dataset.tocando;
    if (acao === 'fechar') fecharTela();
    else if (acao === 'alternar') alternar();
    else if (acao === 'anterior') anterior();
    else if (acao === 'proxima') proxima();
    else if (acao === 'salvar') salvar();
    else if (acao === 'compartilhar') compartilhar();
    else if (acao === 'letra') abrirGaveta('letra');
    else if (acao === 'puxador') { if (gavetaAberta()) fecharGaveta(); else abrirGaveta(aba); }
    const linha = e.target.closest('[data-tocando-t]');
    if (linha) { irPara(Number(linha.dataset.tocandoT)); gestoNaLetra = 0; marcarLinha(Number(linha.dataset.tocandoT), true); }
    const item = e.target.closest('[data-tocando-fila]');
    if (item) tocarNaFila(Number(item.dataset.tocandoFila));
    const trocar = e.target.closest('[data-tocando-aba]');
    if (trocar) abrirGaveta(trocar.dataset.tocandoAba);
    const link = e.target.closest('[data-tocando-album-link]');
    if (link) {
      // Fecha primeiro (o Voltar tira os degraus da tela) e só depois troca de página.
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
  posicao.addEventListener('input', () => { arrastandoTempo = true; tela.querySelector('[data-tocando-agora]').textContent = formatarTempo(Number(posicao.value)); });
  posicao.addEventListener('change', () => { arrastandoTempo = false; irPara(Number(posicao.value)); });
  prepararArrasto();
  const painelLetra = tela.querySelector('[data-tocando-painel="letra"]');
  ['wheel', 'touchmove', 'keydown'].forEach((tipo) => painelLetra.addEventListener(tipo, () => { gestoNaLetra = Date.now(); }, { passive: true }));
  // Fechou (setinha, Esc, Voltar): tira os degraus que a tela e a gaveta puseram no histórico.
  tela.addEventListener('close', () => {
    document.documentElement.classList.remove('com-tela-tocando');
    marcarGaveta(false);
    const passos = history.state?.gaveta ? 2 : history.state?.tocando ? 1 : 0;
    if (passos) history.go(-passos);
  });
  // Voltar do celular: primeiro recolhe a gaveta, depois fecha a tela, sem sair da página.
  window.addEventListener('popstate', () => {
    if (!tela.open) return;
    if (gavetaAberta() && !history.state?.gaveta) marcarGaveta(false);
    if (!history.state?.tocando) tela.close();
  });
  computador.addEventListener('change', () => { if (computador.matches && history.state?.gaveta) history.back(); });

  protegerCapas(tela);
  aoMudarPlaylist(() => { if (tela.open) marcarSalvar(); });
  aoMudar(() => { if (tela.open) desenhar(); });
  aoTempo((t) => { if (tela.open) { atualizarTempo(t); marcarLinha(t.agora); } });
}

// ---------- Gaveta (fila e letra) ----------
const gavetaAberta = () => gaveta.dataset.aberta === 'true';

function marcarGaveta(aberta) {
  gaveta.dataset.aberta = String(aberta);
  const puxador = tela.querySelector('[data-tocando="puxador"]');
  puxador.setAttribute('aria-expanded', String(aberta));
  puxador.setAttribute('aria-label', aberta ? 'Recolher a fila e a letra' : 'Abrir a fila e a letra');
}

function abrirGaveta(id) {
  mostrarAba(id);
  if (computador.matches || gavetaAberta()) return;   // no computador a gaveta já fica sempre à mostra
  marcarGaveta(true);
  history.pushState({ tocando: true, gaveta: true }, '');   // o Voltar recolhe a gaveta
}

function fecharGaveta() {
  if (!gavetaAberta()) return;
  if (history.state?.gaveta) history.back();   // o popstate recolhe
  else marcarGaveta(false);
}

// Arrastar a cabeça da gaveta (alça, mini player e abas) para cima ou para baixo, seguindo o dedo.
function prepararArrasto() {
  const cabeca = tela.querySelector('[data-tocando-cabeca]');
  let inicio = null, base = 0, ultimo = 0;
  // Movimento e soltura escutados na janela: o arrasto continua mesmo se o dedo/mouse sair da cabeça,
  // e um toque simples continua sendo clique no botão tocado (alça, aba, tocar).
  const mover = (e) => {
    ultimo = e.clientY - inicio;
    if (Math.abs(ultimo) < 8 && !gaveta.classList.contains('tocando__gaveta--arrastando')) return;
    gaveta.classList.add('tocando__gaveta--arrastando');
    tela.classList.add('tocando--arrastando');
    gaveta.style.transform = `translateY(${Math.max(0, base + ultimo)}px)`;
  };
  const soltar = () => {
    window.removeEventListener('pointermove', mover);
    window.removeEventListener('pointerup', soltar);
    window.removeEventListener('pointercancel', soltar);
    inicio = null;
    if (!gaveta.classList.contains('tocando__gaveta--arrastando')) return;   // foi só um toque
    gaveta.classList.remove('tocando__gaveta--arrastando');
    tela.classList.remove('tocando--arrastando');
    gaveta.style.transform = '';
    gaveta.dataset.arrastou = '1';   // engole o clique que o navegador manda logo depois do arrasto
    setTimeout(() => { delete gaveta.dataset.arrastou; }, 0);
    if (ultimo < -PUXAO) abrirGaveta(aba);
    else if (ultimo > PUXAO) fecharGaveta();
  };
  cabeca.addEventListener('pointerdown', (e) => {
    if (computador.matches || e.button !== 0) return;
    inicio = e.clientY; ultimo = 0;
    base = gaveta.getBoundingClientRect().top - tela.getBoundingClientRect().top;
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', soltar);
    window.addEventListener('pointercancel', soltar);
  });
}

// ---------- Abrir e fechar a tela ----------
function abrirTela() {
  if (!estado().faixa) return;
  montar();
  if (tela.open) return;
  faixaMostrada = null;
  marcarGaveta(false);
  desenhar();
  history.pushState({ tocando: true }, '');   // mesmo endereço: o roteador não percebe, só o Voltar
  tela.showModal();
  document.documentElement.classList.add('com-tela-tocando');
  tela.querySelector('[data-tocando="alternar"]').focus();
  contarEvento('tocando/abrir');
}

function fecharTela() {
  if (tela?.open) tela.close();   // o evento close limpa o histórico
}

function desenhar() {
  const { faixa, tocando } = estado();
  if (!faixa) { fecharTela(); return; }
  tela.querySelectorAll('[data-tocando="alternar"]').forEach((botao) => {
    botao.innerHTML = icone(tocando ? 'pausa' : 'play');
    botao.setAttribute('aria-label', tocando ? 'Pausar' : 'Tocar');
  });
  const { fila, atual } = filaAtual();
  tela.querySelector('[data-tocando="anterior"]').disabled = atual <= 0 && tempo().agora < 3;
  tela.querySelector('[data-tocando="proxima"]').disabled = atual >= fila.length - 1;
  if (faixaMostrada !== faixa.src) {
    faixaMostrada = faixa.src;
    const sub = [faixa.texto, faixa.albumTitulo].filter(Boolean).join(' · ');
    tela.querySelector('[data-tocando-titulo]').textContent = faixa.titulo;
    tela.querySelector('[data-tocando-album]').textContent = sub;
    tela.querySelector('[data-tocando-mini-titulo]').textContent = faixa.titulo;
    tela.querySelector('[data-tocando-mini-album]').textContent = sub;
    tela.querySelector('[data-tocando-album-link]').href = rotaPrimeira(faixa.albumSlug);
    tela.querySelector('[data-tocando-capa]').innerHTML = faixa.capa
      ? `<img src="${escapar(faixa.capa)}-960.webp" alt="${escapar(`Capa de ${faixa.albumTitulo}`)}" width="480" height="480" draggable="false">` : '';
    tela.querySelector('[data-tocando-mini-capa]').innerHTML = faixa.capa
      ? `<img src="${escapar(faixa.capa)}-480.webp" alt="" width="48" height="48" draggable="false">` : '';
    tela.querySelector('[data-tocando-fundo]').style.backgroundImage = faixa.capa ? `url("${faixa.capa}-480.webp")` : '';
    if (aba === 'letra') desenharLetra(faixa);
  }
  desenharFila(fila, atual, tocando);
  marcarSalvar();
  mostrarAba(aba, false);
  atualizarTempo(tempo());
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
  const mudou = aba !== id;
  aba = id;
  abas.forEach(([cada]) => {
    const ativa = cada === id;
    const botao = tela.querySelector(`[data-tocando-aba="${cada}"]`);
    botao.setAttribute('aria-selected', String(ativa));
    botao.tabIndex = ativa ? 0 : -1;
    tela.querySelector(`[data-tocando-painel="${cada}"]`).hidden = !ativa;
  });
  const painel = tela.querySelector('[data-tocando-painel="letra"]');
  if (trocou && id === 'letra' && (mudou || painel.dataset.faixa !== estado().faixa?.src)) desenharLetra(estado().faixa);
}

// ---------- Salvar e compartilhar ----------
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

// ---------- Letra ----------
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

// Os tempos de cada linha (segundos), na mesma posição das letras; null se o álbum ainda não tem.
function temposDa(faixa) {
  const dados = faixasPrimeiras[faixa.albumSlug];
  const indice = Number(String(faixa.arquivo || '').slice(0, 2)) - 1;
  if (!dados?.tempos || !/^[a-z0-9-]+$/.test(dados.tempos) || indice < 0) return Promise.resolve(null);
  if (!temposCarregados.has(dados.tempos)) {
    temposCarregados.set(dados.tempos, import(`../dados/tempos/${dados.tempos}.js`).then((m) => m.tempos)
      .catch((e) => { temposCarregados.delete(dados.tempos); console.error('[tempos]', e); return null; }));
  }
  return temposCarregados.get(dados.tempos).then((tempos) => tempos?.[faixa.albumSlug]?.[indice] || null);
}

function desenharLetra(faixa) {
  const painel = tela.querySelector('[data-tocando-painel="letra"]');
  if (!faixa) return;
  painel.dataset.faixa = faixa.src;
  painel.innerHTML = '<p class="tocando__aviso">Carregando a letra…</p>';
  Promise.all([letraDa(faixa), temposDa(faixa)]).then(([linhas, tempos]) => {
    if (painel.dataset.faixa !== faixa.src) return;   // trocou de faixa enquanto carregava
    if (!linhas?.length) { painel.innerHTML = '<p class="tocando__aviso">Esta faixa ainda não tem letra aqui no site.</p>'; return; }
    // Linha vazia separa as partes da música (estrofe, refrão).
    // Com tempos, cada linha guarda o segundo em que começa (só aceita tempos de tamanho igual ao da letra).
    const sinc = Array.isArray(tempos) && tempos.length === linhas.length;
    const linha = (l, i) => (sinc && Number.isFinite(tempos[i])
      ? `<p class="tocando__linha tocando__linha--sinc" data-tocando-t="${tempos[i]}">${escapar(l)}</p>`
      : `<p class="tocando__linha">${escapar(l)}</p>`);
    painel.innerHTML = `${sinc ? '<p class="tocando__aviso tocando__aviso--sinc">Toque numa linha para ir até ela.</p>' : ''}
      <div class="tocando__estrofes${sinc ? ' tocando__estrofes--sinc' : ''}">${linhas.map((l, i) => (l ? linha(l, i) : '<span class="tocando__pausa"></span>')).join('')}</div>`;
    painel.scrollTop = 0;
    linhaAtual = -1;
    if (sinc) marcarLinha(tempo().agora, true);
    const id = `${faixa.albumSlug}/${String(faixa.arquivo).replace(/\.mp3$/, '')}`;
    if (!letraContada.has(id)) { letraContada.add(id); contarEvento(`letra/${id}`, faixa.titulo); }
  }).catch((e) => {
    console.error('[letras]', e);
    if (painel.dataset.faixa === faixa.src) painel.innerHTML = '<p class="tocando__aviso">Não foi possível carregar a letra agora.</p>';
  });
}

// Acende a linha que está sendo cantada, apaga as anteriores e rola para deixá-la à vista.
function marcarLinha(agora, forcar = false) {
  if (aba !== 'letra') return;
  const painel = tela.querySelector('[data-tocando-painel="letra"]');
  const linhas = [...painel.querySelectorAll('[data-tocando-t]')];
  if (!linhas.length) return;
  let atual = -1;
  for (let i = 0; i < linhas.length; i += 1) { if (Number(linhas[i].dataset.tocandoT) <= agora + ADIANTO) atual = i; else break; }
  if (atual === linhaAtual && !forcar) return;
  linhaAtual = atual;
  linhas.forEach((l, i) => {
    l.classList.toggle('tocando__linha--atual', i === atual);
    l.classList.toggle('tocando__linha--passada', i < atual);
    if (i === atual) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
  });
  if (atual < 0 || painel.hidden || Date.now() - gestoNaLetra < PAUSA_ROLAGEM) return;
  const alvo = linhas[atual];
  const topo = alvo.offsetTop - painel.clientHeight * 0.35;   // o painel é o offsetParent (position: relative)
  painel.scrollTo({ top: Math.max(0, topo), behavior: semAnimacao.matches ? 'auto' : 'smooth' });
}

function atualizarTempo({ agora, total }) {
  const posicao = tela.querySelector('[data-tocando-posicao]');
  posicao.max = String(Math.floor(total));
  if (!arrastandoTempo) {
    posicao.value = String(Math.floor(agora));
    tela.querySelector('[data-tocando-agora]').textContent = formatarTempo(agora);
  }
  posicao.setAttribute('aria-valuetext', `${formatarTempo(agora)} de ${formatarTempo(total)}`);
  tela.querySelector('[data-tocando-total]').textContent = formatarTempo(total);
}

export function registrarTelaTocando() {
  document.addEventListener('abrir-tocando', abrirTela);
}
