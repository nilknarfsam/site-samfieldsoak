// Proteção leve das capas e das letras: sem menu "salvar imagem"/"copiar" (clique direito e toque longo),
// sem arrastar, sem selecionar e sem copiar.
// Não existe proteção total na web: quem quiser pode tirar print. Por isso o site só publica
// a versão de tela (até 960px); o arquivo de 3000px fica no Drive e na distribuidora.

export function protegerCapas(raiz) {
  raiz.querySelectorAll('[data-protegida]').forEach((el) => {
    if (el.dataset.protecaoAtiva) return;   // não registrar duas vezes
    el.dataset.protecaoAtiva = '1';
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('dragstart', (e) => e.preventDefault());
    el.addEventListener('copy', (e) => e.preventDefault());
    el.addEventListener('selectstart', (e) => e.preventDefault());
  });
}
