const seletorMenu = '.menu';

export function marcarMenuAtivo(nome) {
  document.querySelectorAll('.menu__link').forEach((link) => {
    if (link.dataset.rota === nome) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

// Abre ou fecha o painel e troca o rótulo do botão ("☰ Menu" ↔ "✕ Fechar").
function definirAberto(menu, aberto) {
  const botao = menu.querySelector('.menu__botao');
  menu.classList.toggle('menu--aberto', aberto);
  botao.setAttribute('aria-expanded', String(aberto));
  botao.querySelector('[data-menu-icone]').textContent = aberto ? '✕' : '☰';
  botao.querySelector('[data-menu-rotulo]').textContent = aberto ? 'Fechar' : 'Menu';
}

export function fecharMenu() {
  const menu = document.querySelector(seletorMenu);
  if (menu) definirAberto(menu, false);
}

export function registrarMenu() {
  document.addEventListener('click', (e) => {
    const botao = e.target.closest('.menu__botao');
    if (botao) {
      definirAberto(botao.closest(seletorMenu), botao.getAttribute('aria-expanded') !== 'true');
      return;
    }
    if (!e.target.closest(seletorMenu)) fecharMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const menu = document.querySelector(seletorMenu);
    if (menu.classList.contains('menu--aberto')) { fecharMenu(); menu.querySelector('.menu__botao').focus(); }
  });
}
