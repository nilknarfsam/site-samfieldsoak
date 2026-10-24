// Botão "Compartilhar" das páginas de detalhe. No celular abre a folha de compartilhar do sistema
// (Web Share API); no computador copia o link. Nenhum SDK de rede social: nada sai daqui sem a pessoa querer.

const TEMPO_AVISO = 2000;

async function compartilhar(botao) {
  const rotulo = botao.querySelector('[data-rotulo]');
  const dados = { title: document.title, url: location.href };
  try {
    if (navigator.share) { await navigator.share(dados); return; }
    await navigator.clipboard.writeText(dados.url);
    rotulo.textContent = 'Link copiado';
  } catch (e) {
    if (e.name === 'AbortError') return;   // a pessoa cancelou
    rotulo.textContent = 'Não deu para copiar';
  }
  setTimeout(() => { rotulo.textContent = 'Compartilhar'; }, TEMPO_AVISO);
}

// Delegação: registrado uma vez no main.js.
export function registrarCompartilhar(app) {
  app.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-acao="compartilhar"]');
    if (botao) compartilhar(botao);
  });
}
