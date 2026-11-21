// Contador de visitas (GoatCounter). Só liga se houver código em js/dados/perfil.js.
// Sem cookies e sem dados pessoais: conta a página (rota do hash) e o site de origem.
import { contador } from '../dados/perfil.js';

let pronto = null;

function carregar() {
  if (pronto) return pronto;
  pronto = new Promise((resolve) => {
    window.goatcounter = { no_onload: true };
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.dataset.goatcounter = `https://${contador.codigo}.goatcounter.com/count`;
    s.onload = resolve;
    s.onerror = resolve;   // contador fora do ar não pode quebrar o site
    document.head.appendChild(s);
  });
  return pronto;
}

export function contarVisita() {
  if (!contador.codigo || !/^[a-z0-9-]+$/.test(contador.codigo)) return;
  carregar().then(() => {
    const rota = (location.hash || '#/inicio').split('?')[0];
    window.goatcounter?.count?.({ path: rota.replace(/^#/, '') || '/inicio', title: document.title });
  });
}

// Eventos anônimos (T-29): o que foi tocado e ouvido, nunca quem. Ex.: 'play/trono-de-fogo/01-salmo-36'.
// Mesmo contador e mesmas regras: sem cookies, sem dados pessoais; desligado sem código em perfil.js.
export function contarEvento(nome, titulo = '') {
  if (!contador.codigo || !/^[a-z0-9-]+$/.test(contador.codigo)) return;
  if (!/^[a-z0-9][a-z0-9/-]*$/.test(nome || '')) return;
  carregar().then(() => window.goatcounter?.count?.({ path: nome, title: titulo, event: true }));
}
