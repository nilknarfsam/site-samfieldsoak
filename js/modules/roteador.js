import { marcarMenuAtivo, fecharMenu } from './menu.js';
import { telaErro } from './templates.js';
import { animarTela } from './movimento.js';

const NOME_SITE = 'Samfield';
let rotas = {}, app, navegacaoAtual = 0;
const cache = new Map();

async function carregarView(caminho) {
  if (!cache.has(caminho)) {
    const resposta = await fetch(caminho);
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status + ' em ' + caminho); // fetch não rejeita em 404
    cache.set(caminho, await resposta.text());
  }
  return cache.get(caminho);
}

async function renderizar() {
  let [nome, segundo] = location.hash.slice(2).split('/').map(decodeURIComponent);
  if (!nome || !rotas[nome]) { nome = 'inicio'; segundo = undefined; history.replaceState(null, '', '#/inicio'); }
  const rota = rotas[nome];
  // Seções com páginas de detalhe usam o segundo segmento como slug (#/ia-sem-labia/<slug>)
  // Âncoras declaradas na rota (#/musica/como-eu-faco) rolam até a seção em vez de abrir um detalhe.
  const ancora = segundo && (!rota.detalhe || (rota.ancoras || []).includes(segundo)) ? segundo : null;
  const alvoRota = segundo && rota.detalhe && !ancora ? rota.detalhe : rota;
  const esta = ++navegacaoAtual;                 // descarta resposta atrasada (condição de corrida)
  app.setAttribute('aria-busy', 'true');
  let html, titulo = rota.titulo, ok = true;
  try { html = await carregarView(alvoRota.view); }
  catch (erro) { console.error('[roteador]', erro); ok = false; titulo = 'Página indisponível'; html = telaErro(titulo, navigator.onLine ? 'Conteúdo não encontrado.' : 'Você parece estar sem conexão.'); }
  if (esta !== navegacaoAtual) return;
  const molde = document.createElement('template');
  molde.innerHTML = html;
  app.replaceChildren(molde.content);
  app.removeAttribute('aria-busy');
  marcarMenuAtivo(ok ? nome : '');
  if (ok && alvoRota.iniciar) {
    try { titulo = alvoRota.iniciar(app, segundo) || titulo; } catch (e) { console.error('[roteador]', e); }
  }
  document.title = NOME_SITE + ' | ' + titulo;
  window.scrollTo(0, 0);
  animarTela(app);
  const secaoAncora = ancora && document.getElementById(ancora);
  const alvo = secaoAncora || app.querySelector('h1');
  if (alvo) { alvo.setAttribute('tabindex', '-1'); alvo.focus({ preventScroll: true }); } // foco gerenciado para leitor de tela
  if (secaoAncora) secaoAncora.scrollIntoView();
}

export function iniciarRoteador(mapa) {
  rotas = mapa; app = document.getElementById('app');
  window.addEventListener('hashchange', () => {
    if (!location.hash.startsWith('#/')) return;  // âncoras comuns (ex.: #app) não são rotas
    fecharMenu(); renderizar();
  });
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', renderizar);
  else renderizar();
  app.addEventListener('click', (e) => { if (e.target.closest('[data-acao="recarregar-view"]')) renderizar(); });
}
