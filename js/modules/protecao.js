// Proteção leve das capas: sem menu "salvar imagem" (clique direito e toque longo) e sem arrastar.
// Não existe proteção total na web: quem quiser pode tirar print. Por isso o site só publica
// a versão de tela (até 960px); o arquivo de 3000px fica no Drive e na distribuidora.

export function protegerCapas(raiz) {
  raiz.querySelectorAll('[data-protegida]').forEach((el) => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('dragstart', (e) => e.preventDefault());
  });
}
