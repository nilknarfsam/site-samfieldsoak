// O índice usa o texto já renderizado: seções opcionais e títulos próprios ficam em sincronia.
export function iniciarLeituraIa(alvo) {
  const corpo = alvo.querySelector('[data-corpo-ia]');
  const indice = alvo.querySelector('[data-indice-artigo]');
  const titulos = [...corpo.querySelectorAll(':scope > section > h2')];
  const rotulo = document.createElement('p');
  rotulo.className = 'indice-artigo__titulo';
  rotulo.textContent = 'Nesta página';
  const lista = document.createElement('ul');
  lista.className = 'indice-artigo__lista lista-limpa';

  titulos.forEach((titulo, i) => {
    titulo.id = `ia-secao-${i + 1}`;
    titulo.tabIndex = -1;
    // Os selos repetem a informação; o índice mostra somente o título da seção.
    const copia = titulo.cloneNode(true);
    copia.querySelectorAll('.selo').forEach((selo) => selo.remove());
    const item = document.createElement('li');
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'indice-artigo__botao';
    botao.textContent = copia.textContent.trim();
    botao.setAttribute('aria-controls', titulo.id);
    botao.addEventListener('click', () => {
      titulo.focus({ preventScroll: true });
      titulo.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    item.append(botao);
    lista.append(item);
  });
  // Botões movem o foco dentro do artigo sem alterar o hash usado pelo roteador/Compartilhar.
  indice.replaceChildren(rotulo, lista);
  indice.hidden = titulos.length === 0;

  const texto = corpo.cloneNode(true);
  texto.querySelectorAll('.galeria, .visualmente-oculto').forEach((el) => el.remove());
  // Separar os nós de texto evita juntar palavras entre itens ou células adjacentes.
  const nos = document.createTreeWalker(texto, NodeFilter.SHOW_TEXT);
  const trechos = [alvo.querySelector('h1').textContent, alvo.querySelector('.lead').textContent];
  while (nos.nextNode()) trechos.push(nos.currentNode.textContent);
  const palavras = trechos.join(' ').trim().split(/\s+/).filter(Boolean).length;
  const minutos = Math.max(1, Math.ceil(palavras / 200));
  alvo.querySelector('[data-tempo-leitura]').textContent = `Leitura estimada: ${minutos} min`;
}
