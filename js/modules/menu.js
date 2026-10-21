const seletorMenu = '.menu';

export function marcarMenuAtivo(nome) {
  document.querySelectorAll('.menu__link').forEach((link) => {
    if (link.dataset.rota === nome) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

export function fecharMenu() {
  const menu = document.querySelector(seletorMenu);
  if (!menu) return;
  menu.classList.remove('menu--aberto');
  menu.querySelector('.menu__botao').setAttribute('aria-expanded', 'false');
}

export function registrarMenu() {
  document.addEventListener('click', (e) => {
    const botao = e.target.closest('.menu__botao');
    if (botao) {
      const aberto = botao.getAttribute('aria-expanded') === 'true';
      botao.setAttribute('aria-expanded', String(!aberto));
      botao.closest(seletorMenu).classList.toggle('menu--aberto', !aberto);
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
