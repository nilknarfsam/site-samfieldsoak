// Animações do site: tempero discreto, só transform e opacity.
// As durações e curvas ficam em css/variaveis.css; aqui só se aplica a classe.
// Quem pediu "reduzir movimento" recebe a versão do CSS em
// @media (prefers-reduced-motion: reduce): só opacidade, sem deslocamento nem cascata.

const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');

export const prefereMenosMovimento = () => consulta.matches;

// Reinicia uma animação CSS no elemento (precisa tirar a classe e forçar um reflow).
function reiniciar(elemento, classe) {
  elemento.classList.remove(classe);
  void elemento.offsetWidth;
  elemento.classList.add(classe);
}

// Fade rápido na troca de rota.
export function animarTela(app) {
  reiniciar(app, 'mov-tela');
}

// Entrada em cascata curta dos cartões de uma lista. Limite de 8 posições
// para a cascata nunca atrasar a leitura (8 × 50ms = 400ms no máximo).
export function animarCartoes(container, seletor = '[data-animar]') {
  container.querySelectorAll(seletor).forEach((item, i) => {
    item.style.setProperty('--ordem', String(Math.min(i, 8)));
    reiniciar(item, 'mov-cartao');
  });
}
