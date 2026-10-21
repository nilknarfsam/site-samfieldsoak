import { buscarReflexao } from '../dados/reflexoes.js';
import { buscarAlbum } from '../dados/albuns.js';
import { detalheReflexao } from '../modules/templates-palavra.js';
import { naoEncontrado } from '../modules/templates.js';
import { animarCartoes } from '../modules/movimento.js';

// Devolve o título da aba.
export function iniciarPalavraDetalhe(app, slug) {
  const alvo = app.querySelector('[data-detalhe]');
  const r = buscarReflexao(slug);
  if (!r) {
    alvo.innerHTML = naoEncontrado('Palavra', '#/palavra');
    return 'Conteúdo não encontrado';
  }
  const album = r.musica ? buscarAlbum(r.musica.album) : null;
  alvo.innerHTML = detalheReflexao(r, album);
  animarCartoes(alvo);
  return `${r.titulo} (${r.referencia})`;
}
