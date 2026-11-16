// Endereços permanentes: o mesmo cadastro serve ao gerador e ao botão Compartilhar.
import { novidades } from '../dados/novidades.js';
import { ferramentas } from '../dados/ferramentas.js';
import { reflexoes } from '../dados/reflexoes.js';
import { albuns } from '../dados/albuns.js';

export const ORIGEM_PUBLICA = 'https://samfieldsoak.com.br';
export const IMAGEM_PADRAO = 'imagens/compartilhar/samfieldsoak-1200x630.jpg';

export function listarPaginasPublicas(dados = { novidades, ferramentas, reflexoes, albuns }) {
  const paginas = [];
  const adicionar = (secao, item, fonteImagem = '') => {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.slug)) throw new Error(`Slug inválido: ${item.slug}`);
    const caminho = `/p/${secao}/${item.slug}/`;
    if (paginas.some((p) => p.caminho === caminho)) throw new Error(`Página repetida: ${caminho}`);
    paginas.push({ secao, slug: item.slug, caminho, url: ORIGEM_PUBLICA + caminho,
      rota: `#/${secao}/${encodeURIComponent(item.slug)}`,
      titulo: item.titulo || item.nome,
      resumo: item.resumo || item.descricao || item.base || 'Conteúdo de Franklin Carvalho.',
      fonteImagem,
      imagem: fonteImagem ? `imagens/compartilhar/geradas/${secao}-${item.slug}-1200x630.jpg` : IMAGEM_PADRAO,
    });
  };
  // Chamadas que só apontam para outra página não ganham uma segunda passagem.
  (dados.novidades || []).filter((n) => !n.rota).forEach((n) => adicionar('novidades', n, n.carrossel?.capa));
  (dados.ferramentas || []).forEach((f) => adicionar('ia-sem-labia', f, f.carrossel?.capa));
  (dados.reflexoes || []).forEach((r) => adicionar('palavra', r, r.capa));
  (dados.albuns || []).forEach((a) => adicionar('musica', a, a.capa ? `${a.capa}-960.webp` : ''));
  return paginas.sort((a, b) => a.caminho.localeCompare(b.caminho, 'en'));
}

const paginas = listarPaginasPublicas();
export const paginaPorRota = (rota) => paginas.find((p) => p.rota === rota);
