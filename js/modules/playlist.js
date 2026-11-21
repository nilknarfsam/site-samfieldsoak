// "Minha playlist" das primeiras versões (T-29, docs/15).
// Sem cadastro e sem servidor: a lista fica só no navegador da pessoa (localStorage).
// Compartilhar = um link com as faixas no endereço: #/playlist?f=trono-de-fogo.01,altar-da-contricao.05

import { primeirasVersoes } from '../dados/albuns.js';
import { faixasPrimeiras, urlAudio } from '../dados/primeiras-versoes.js';

const CHAVE = 'samfieldsoak-playlist';
const ID = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.(\d{2})$/;
export const LIMITE = 200;
const ouvintes = new Set();

// Faixa → item da fila do tocador. Id inválido ou faixa que não existe mais: null.
export function resolverFaixa(id) {
  const m = ID.exec(id || '');
  if (!m) return null;
  const [, slug, nn] = m;
  const album = primeirasVersoes.albuns.find((a) => a.slug === slug);
  const f = faixasPrimeiras[slug]?.faixas?.[Number(nn) - 1];
  if (!album || !f) return null;
  return { id, albumSlug: slug, albumTitulo: album.titulo, capa: album.capa, titulo: f.titulo, texto: f.texto,
    arquivo: f.arquivo, src: urlAudio(slug, f.arquivo), duracao: f.duracao };
}

export const idDaFaixa = (slug, indice) => `${slug}.${String(indice + 1).padStart(2, '0')}`;

// Só ids válidos, sem repetir, até o limite.
export const limpar = (ids) => [...new Set((ids || []).filter((id) => resolverFaixa(id)))].slice(0, LIMITE);

export function lerPlaylist() {
  try { return limpar(JSON.parse(localStorage.getItem(CHAVE) || '[]')); }
  catch { return []; }   // navegador sem armazenamento (aba anônima, bloqueio): lista vazia, sem quebrar
}

function gravar(ids) {
  const lista = limpar(ids);
  try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch { /* sem armazenamento: segue só nesta tela */ }
  ouvintes.forEach((fn) => fn(lista));
  return lista;
}

export const aoMudarPlaylist = (fn) => { ouvintes.add(fn); return () => ouvintes.delete(fn); };
export const naPlaylist = (id) => lerPlaylist().includes(id);
export const adicionar = (id) => gravar([...lerPlaylist(), id]);
export const remover = (id) => gravar(lerPlaylist().filter((x) => x !== id));
export const substituir = (ids) => gravar(ids);
export const esvaziar = () => gravar([]);

// Link de compartilhar e leitura do link recebido.
export const linkDaPlaylist = (ids) => `${location.origin}${location.pathname}#/playlist?f=${limpar(ids).join(',')}`;
export function idsDoEndereco(hash = location.hash) {
  const consulta = hash.split('?')[1] || '';
  const f = new URLSearchParams(consulta).get('f');
  return f === null ? null : limpar(f.split(','));
}
