// Confere os dados do site antes de abrir um PR (docs/10-sistema-de-publicacao.md).
// Uso, na raiz do repositório: node ferramentas/conferir-dados.mjs
// Sem dependências. Sai com código 1 se encontrar erro (o GitHub Actions marca o PR com ❌).

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { novidades, temasNovidade } from '../js/dados/novidades.js';
import { ferramentas } from '../js/dados/ferramentas.js';
import { reflexoes } from '../js/dados/reflexoes.js';
import { albuns, singles, primeirasVersoes } from '../js/dados/albuns.js';
import { linksBio } from '../js/dados/links.js';
import { perfil } from '../js/dados/perfil.js';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const erros = [];
const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ID_SPOTIFY = /^[A-Za-z0-9]{22}$/;
// Só a novidade de 23/10/2026 pode usar o campo carrossel (legado, docs/07).
const CARROSSEL_LEGADO = ['claude-code-outubro-2026'];

function dataValida(texto, { mesBasta = false } = {}) {
  if (mesBasta && /^\d{4}-\d{2}$/.test(texto)) texto += '-01';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(texto || '')) return false;
  const d = new Date(texto + 'T12:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === texto;
}

function conferirSlugs(lista, nome) {
  const vistos = new Set();
  lista.forEach((item, i) => {
    const onde = `${nome}[${i}] ${item.slug || '(sem slug)'}`;
    if (!SLUG.test(item.slug || '')) erro(onde, 'slug vazio ou fora do padrão (minúsculas, sem acento, com hífen)');
    if (vistos.has(item.slug)) erro(onde, 'slug repetido');
    vistos.add(item.slug);
  });
}

// Percorre todos os textos de um objeto: imagens, links e HTML escondido.
function conferirTextos(valor, onde) {
  if (typeof valor === 'string') {
    if (/^imagens\//.test(valor) && /\.(webp|png|jpe?g|svg|gif)$/i.test(valor) && !existsSync(join(RAIZ, valor))) {
      erro(onde, `imagem não existe: ${valor}`);
    }
    if (/^http:\/\//i.test(valor)) erro(onde, `link sem https: ${valor}`);
    if (/<\/?[a-z][\s\S]*?>/i.test(valor)) erro(onde, 'tem HTML dentro do texto (proibido: os templates escapam tudo)');
    return;
  }
  if (Array.isArray(valor)) { valor.forEach((v, i) => conferirTextos(v, `${onde}[${i}]`)); return; }
  if (valor && typeof valor === 'object') Object.entries(valor).forEach(([k, v]) => conferirTextos(v, `${onde}.${k}`));
}

// Capas sem extensão ('imagens/albuns/<slug>') precisam das duas versões de tela.
function conferirCapa(base, onde, tamanhos = [480, 960]) {
  if (!base) return;
  tamanhos.forEach((t) => {
    if (!existsSync(join(RAIZ, `${base}-${t}.webp`))) erro(onde, `capa não existe: ${base}-${t}.webp`);
  });
}

// ---------- Novidades ----------
conferirSlugs(novidades, 'novidades');
novidades.forEach((n) => {
  const onde = `novidades ${n.slug}`;
  if (!dataValida(n.data)) erro(onde, `data inválida: ${n.data} (use AAAA-MM-DD)`);
  if (!temasNovidade[n.tema]) erro(onde, `tema desconhecido: ${n.tema}`);
  if (!n.titulo) erro(onde, 'sem título');
  if (!n.resumo) erro(onde, 'sem resumo');
  if (!n.rota && !(n.paragrafos?.length)) erro(onde, 'precisa de rota ou de paragrafos');
  if (n.rota && !/^#\/[a-z0-9-]+(\/[a-z0-9-]+)?$/.test(n.rota)) erro(onde, `rota fora do padrão: ${n.rota}`);
  if (n.tema === 'tecnologia' && !n.rota) {
    if (!n.fontes?.length) erro(onde, 'tecnologia sem fontes');
    if (!dataValida(n.conferidoEm)) erro(onde, 'tecnologia sem conferidoEm (AAAA-MM-DD)');
  }
  if (n.conferidoEm && !dataValida(n.conferidoEm)) erro(onde, `conferidoEm inválido: ${n.conferidoEm}`);
  if (n.carrossel && !CARROSSEL_LEGADO.includes(n.slug)) erro(onde, 'campo carrossel é legado: não usar em novidades novas');
  (n.paragrafos || []).forEach((p, i) => {
    if (p && typeof p === 'object' && (!/^imagens\//.test(p.imagem || '') || !p.alt)) erro(`${onde}.paragrafos[${i}]`, 'imagem precisa de caminho em imagens/ e de alt');
  });
  conferirTextos(n, onde);
});

// ---------- IA sem lábia ----------
conferirSlugs(ferramentas, 'ferramentas');
const slugsFerramentas = new Set(ferramentas.map((f) => f.slug));
ferramentas.forEach((f) => {
  const onde = `ferramentas ${f.slug}`;
  if (!['analisado', 'testado', 'em-uso'].includes(f.status)) erro(onde, `status inválido: ${f.status}`);
  if (!dataValida(f.analisadoEm)) erro(onde, `analisadoEm inválido: ${f.analisadoEm}`);
  if (f.custos?.length && !dataValida(f.conferidoEm)) erro(onde, 'tem custos mas não tem conferidoEm');
  (f.relacionadas || []).forEach((r) => { if (!slugsFerramentas.has(r)) erro(onde, `relacionada não existe: ${r}`); });
  conferirTextos(f, onde);
});

// ---------- Palavra ----------
conferirSlugs(reflexoes, 'reflexoes');
const slugsAlbuns = new Set(albuns.map((a) => a.slug));
reflexoes.forEach((r) => {
  const onde = `reflexoes ${r.slug}`;
  if (!dataValida(r.data)) erro(onde, `data inválida: ${r.data}`);
  ['titulo', 'referencia', 'versao', 'livro', 'resumo'].forEach((c) => { if (!r[c]) erro(onde, `sem ${c}`); });
  if (!r.secoes?.length) erro(onde, 'sem secoes');
  if (r.musica && !slugsAlbuns.has(r.musica.album)) erro(onde, `musica.album não existe: ${r.musica.album}`);
  conferirTextos(r, onde);
});

// ---------- Música ----------
conferirSlugs(albuns, 'albuns');
conferirSlugs(singles, 'singles');
conferirSlugs(primeirasVersoes.albuns, 'primeirasVersoes');
const destaques = albuns.filter((a) => a.destaque);
if (destaques.length !== 1) erro('albuns', `precisa de exatamente 1 álbum com destaque: true (tem ${destaques.length})`);
[...albuns, ...singles].forEach((a) => {
  const onde = `musica ${a.slug}`;
  if (a.lancamento && !dataValida(a.lancamento, { mesBasta: true })) erro(onde, `lancamento inválido: ${a.lancamento}`);
  if (a.spotifyId && !ID_SPOTIFY.test(a.spotifyId)) erro(onde, `spotifyId precisa ter 22 caracteres: ${a.spotifyId}`);
  if (a.letras && !existsSync(join(RAIZ, `js/dados/letras/${a.letras}.js`))) erro(onde, `arquivo de letras não existe: ${a.letras}`);
  conferirCapa(a.capa, onde, a.slug && singles.includes(a) ? [480] : [480, 960]);
  conferirTextos(a, onde);
});
primeirasVersoes.albuns.forEach((a) => { conferirCapa(a.capa, `primeirasVersoes ${a.slug}`, [480]); conferirTextos(a, `primeirasVersoes ${a.slug}`); });

// Âncoras da página Música não podem ter o nome de um álbum (o roteador abriria a seção no lugar do álbum).
const main = readFileSync(join(RAIZ, 'js/main.js'), 'utf8');
const ancoras = (main.match(/ancoras:\s*\[([^\]]*)\]/) || [, ''])[1].match(/'[^']+'/g) || [];
ancoras.map((a) => a.slice(1, -1)).forEach((a) => { if (slugsAlbuns.has(a)) erro('js/main.js', `âncora da Música igual a slug de álbum: ${a}`); });

// ---------- Início ----------
linksBio.forEach((l, i) => {
  if (!l.rotulo || !l.destino) erro(`linksBio[${i}]`, 'precisa de rotulo e destino');
  if (!/^(#\/|https:\/\/)/.test(l.destino || '')) erro(`linksBio[${i}]`, `destino deve começar com #/ ou https://: ${l.destino}`);
});
const outrosAtalhos = linksBio.filter((l) => !l.destaque).length;
if (outrosAtalhos % 4 !== 0) erro('linksBio', `${outrosAtalhos} atalhos sem destaque: use múltiplo de 4 para a grade fechar (docs/09, T-06)`);
conferirCapa(perfil.foto, 'perfil.foto', [240, 480]);

// ---------- Resultado ----------
if (erros.length) {
  console.log(`❌ ${erros.length} problema(s) nos dados:\n`);
  erros.forEach((e) => console.log(' - ' + e));
  process.exit(1);
}
console.log(`✅ Dados conferidos: ${novidades.length} novidades, ${ferramentas.length} páginas de IA, ${reflexoes.length} pregações, ${albuns.length} álbuns, ${singles.length} singles.`);
