// Confere os dados do site antes de abrir um PR (docs/10-sistema-de-publicacao.md).
// Uso, na raiz do repositório: node ferramentas/conferir-dados.mjs
// Sem dependências. Sai com código 1 se encontrar erro (o GitHub Actions marca o PR com ❌).

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

// Erros em dados que são ordenados ao importar também precisam de diagnóstico e saída 1.
async function importarDados(caminho) {
  try { return await import(caminho); }
  catch (e) {
    console.error(`❌ Não foi possível ler ${caminho}: ${e.message}`);
    process.exit(1);
  }
}

const { novidades, temasNovidade, iconesTema } = await importarDados('../js/dados/novidades.js');
const { ferramentas } = await importarDados('../js/dados/ferramentas.js');
const { reflexoes } = await importarDados('../js/dados/reflexoes.js');
const { albuns, singles, primeirasVersoes, series, destaqueSuno } = await importarDados('../js/dados/albuns.js');
const { linksBio } = await importarDados('../js/dados/links.js');
const { AUDIO_BASE, faixasPrimeiras } = await importarDados('../js/dados/primeiras-versoes.js');
const { perfil } = await importarDados('../js/dados/perfil.js');

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const erros = [];
const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ID_SPOTIFY = /^[A-Za-z0-9]{22}$/;
const ID_SUNO = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
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

// forEach pula buracos de arrays; percorrer os índices impede um falso positivo.
function conferirEstrutura(valor, onde, tipoItem) {
  const antes = erros.length;
  if (tipoItem && !Array.isArray(valor)) { erro(onde, 'precisa ser uma lista'); return false; }
  if (Array.isArray(valor)) {
    for (let i = 0; i < valor.length; i++) {
      const caminho = `${onde}[${i}]`;
      if (!Object.hasOwn(valor, i)) { erro(caminho, 'posição vazia na lista'); continue; }
      const item = valor[i];
      if (item === null || item === undefined) { erro(caminho, 'entrada nula ou indefinida'); continue; }
      if (tipoItem === 'objeto' && (typeof item !== 'object' || Array.isArray(item))) {
        erro(caminho, 'entrada precisa ser um objeto'); continue;
      }
      if (tipoItem === 'lista' && !Array.isArray(item)) { erro(caminho, 'entrada precisa ser uma lista'); continue; }
      if (tipoItem === 'texto' && (typeof item !== 'string' || !item.trim())) {
        erro(caminho, 'entrada precisa ser texto não vazio'); continue;
      }
      conferirEstrutura(item, caminho);
    }
  } else if (valor && typeof valor === 'object') {
    Object.entries(valor).forEach(([k, v]) => conferirEstrutura(v, `${onde}.${k}`));
  }
  return erros.length === antes;
}

function encerrarSeErros() {
  if (!erros.length) return;
  console.log(`❌ ${erros.length} problema(s) nos dados:\n`);
  erros.forEach((e) => console.log(' - ' + e));
  process.exit(1);
}

// Primeiro protege os percursos abaixo contra entradas que fariam map/forEach quebrar.
for (const [nome, lista] of Object.entries({ novidades, ferramentas, reflexoes, albuns, singles,
  primeirasVersoes: primeirasVersoes?.albuns, linksBio })) {
  conferirEstrutura(lista, nome, 'objeto');
}
for (const [nome, valor] of Object.entries({ perfil, temasNovidade, iconesTema, series, primeirasVersoes })) {
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) erro(nome, 'precisa ser um objeto');
  else conferirEstrutura(valor, nome);
}
encerrarSeErros();

const camposTextoIa = ['promete', 'verdade', 'requisitos', 'naoConta', 'paraQuem',
  'naoServePara', 'caminhoGratis', 'comoComecar', 'perguntas', 'relacionadas'];
const camposObjetoIa = ['quemFaz', 'custos', 'links', 'fontes'];
ferramentas.forEach((f, i) => {
  for (const [tipo, campos] of [['texto', camposTextoIa], ['objeto', camposObjetoIa]]) {
    campos.forEach((campo) => {
      if (Object.hasOwn(f, campo)) conferirEstrutura(f[campo], `ferramentas[${i}].${campo}`, tipo);
    });
  }
});
encerrarSeErros();

// As seções e âncoras vêm do mapa do roteador; os detalhes vêm do cadastro real.
const main = readFileSync(join(RAIZ, 'js/main.js'), 'utf8');
const ancoras = (main.match(/ancoras:\s*\[([^\]]*)\]/) || [, ''])[1].match(/'[^']+'/g) || [];
const rotasConhecidas = new Set([...main.matchAll(/^  (?:'([^']+)'|([a-z][a-z-]*)):\s*\{/gm)]
  .map((m) => `#/${m[1] || m[2]}`));
for (const [secao, lista] of [['novidades', novidades], ['ia-sem-labia', ferramentas],
  ['palavra', reflexoes], ['musica', albuns]]) {
  lista.forEach((item) => rotasConhecidas.add(`#/${secao}/${item.slug}`));
}
Object.keys(faixasPrimeiras || {}).forEach((slug) => {
  rotasConhecidas.add(`#/ouvir/${slug}`);
  rotasConhecidas.add(`#/primeiras-versoes/${slug}`);   // endereço antigo, redireciona para #/ouvir
});
ancoras.forEach((a) => rotasConhecidas.add(`#/musica/${a.slice(1, -1)}`));

// Percorre todos os textos de um objeto: imagens, links e HTML escondido.
function conferirTextos(valor, onde) {
  if (typeof valor === 'string') {
    if (/^imagens\//.test(valor) && /\.(webp|png|jpe?g|svg|gif)$/i.test(valor) && !existsSync(join(RAIZ, valor))) {
      erro(onde, `imagem não existe: ${valor}`);
    }
    if (valor.startsWith('#/') && !rotasConhecidas.has(valor)) erro(onde, `destino interno não existe: ${valor}`);
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
  const texto = (v) => typeof v === 'string' && v.trim().length > 0;
  if (!texto(f.titulo) && !texto(f.nome)) erro(onde, 'precisa de titulo ou nome não vazio');
  if (!texto(f.resumo)) erro(onde, 'resumo precisa ser texto não vazio');
  if (!['instagram', 'video', 'voz', 'whatsapp', 'dev', 'design', 'windows', 'outros'].includes(f.categoria)) {
    erro(onde, `categoria desconhecida: ${f.categoria}`);
  }
  if (!dataValida(f.conferidoEm)) erro(onde, 'fontes sem conferidoEm válido (AAAA-MM-DD)');
  // Os cadastros antigos usam Links oficiais como fontes; preservar esse formato válido.
  if (!f.fontes?.length && !f.links?.length) erro(onde, 'precisa de fontes ou links oficiais');
  for (const campo of ['fontes', 'links']) {
    (f[campo] || []).forEach((l, i) => {
      if (!texto(l.rotulo) || typeof l.url !== 'string' || !/^https:\/\/[^\s]+$/.test(l.url)) {
        erro(`${onde}.${campo}[${i}]`, 'fonte/link precisa de rotulo e url https://');
      }
    });
  }
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
  if (!a.titulo) erro(onde, 'sem titulo');
  if (a.faixasLista?.length && a.faixas && a.faixas !== a.faixasLista.length) erro(onde, `faixas diz ${a.faixas}, mas faixasLista tem ${a.faixasLista.length}`);
  const sunos = new Set();
  (a.faixasLista || []).forEach((f, i) => {
    if (!f.titulo) erro(`${onde}.faixasLista[${i}]`, 'faixa sem titulo');
    if (f.sunoId !== undefined) {
      if (typeof f.sunoId !== 'string' || !ID_SUNO.test(f.sunoId)) erro(`${onde}.faixasLista[${i}]`, 'sunoId precisa ser o UUID da música, não um link de álbum/playlist');
      if (sunos.has(f.sunoId)) erro(`${onde}.faixasLista[${i}]`, 'sunoId repetido neste álbum');
      sunos.add(f.sunoId);
    }
  });
  if (a.serie && !series[a.serie]) erro(onde, `serie desconhecida: ${a.serie} (cadastre em series, no topo de albuns.js)`);
  (a.links || []).forEach((l, i) => { if (!/^https:\/\//.test(l.url || '') || !l.rotulo) erro(`${onde}.links[${i}]`, 'link precisa de rotulo e url https://'); });
  if (a.lancamento && !dataValida(a.lancamento, { mesBasta: true })) erro(onde, `lancamento inválido: ${a.lancamento}`);
  if (a.spotifyId && !ID_SPOTIFY.test(a.spotifyId)) erro(onde, `spotifyId precisa ter 22 caracteres: ${a.spotifyId}`);
  if (a.letras && !existsSync(join(RAIZ, `js/dados/letras/${a.letras}.js`))) erro(onde, `arquivo de letras não existe: ${a.letras}`);
  conferirCapa(a.capa, onde, a.slug && singles.includes(a) ? [480] : [480, 960]);
  conferirTextos(a, onde);
});
primeirasVersoes.albuns.forEach((a) => { conferirCapa(a.capa, `primeirasVersoes ${a.slug}`, [480]); conferirTextos(a, `primeirasVersoes ${a.slug}`); });

if (destaqueSuno) {
  const album = albuns.find((a) => a.slug === destaqueSuno.album);
  if (!Number.isInteger(destaqueSuno.faixa) || destaqueSuno.faixa < 1 || !ID_SUNO.test(album?.faixasLista?.[destaqueSuno.faixa - 1]?.sunoId || '')) {
    erro('destaqueSuno', 'precisa apontar para um álbum e uma faixa com sunoId válido (numeração começa em 1)');
  }
}

// Letras: cada álbum com o campo letras precisa de uma letra por faixa, na mesma ordem.
for (const a of albuns.filter((x) => x.letras && /^[a-z0-9-]+$/.test(x.letras))) {
  const caminho = join(RAIZ, `js/dados/letras/${a.letras}.js`);
  if (!existsSync(caminho)) continue;   // já acusado acima
  const { letras } = await importarDados(pathToFileURL(caminho).href);
  const doAlbum = letras?.[a.slug];
  if (!Array.isArray(doAlbum)) { erro(`letras ${a.letras}`, `não tem a chave "${a.slug}" (o slug do álbum)`); continue; }
  if (!conferirEstrutura(doAlbum, `letras ${a.slug}`, 'lista')) continue;
  if (a.faixasLista?.length && doAlbum.length > a.faixasLista.length) erro(`letras ${a.slug}`, `${doAlbum.length} letras para ${a.faixasLista.length} faixas`);
  doAlbum.forEach((linhas, i) => { if (!Array.isArray(linhas) || linhas.some((l) => typeof l !== 'string')) erro(`letras ${a.slug}[${i}]`, 'cada letra é uma lista de linhas de texto'); });
  conferirTextos(doAlbum, `letras ${a.slug}`);
}

// Primeiras versões com player próprio (T-28, docs/15): áudio em https, um arquivo por faixa, letra por faixa.
if (!/^https:\/\/[^\s]+[^/]$/.test(AUDIO_BASE || '')) erro('primeiras-versoes AUDIO_BASE', `precisa ser https e sem barra no fim: ${AUDIO_BASE}`);
const ARQUIVO_AUDIO = /^\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.mp3$/;
for (const [slug, dados] of Object.entries(faixasPrimeiras || {})) {
  const onde = `primeiras-versoes ${slug}`;
  if (!primeirasVersoes.albuns.some((a) => a.slug === slug)) erro(onde, 'slug não existe em primeirasVersoes.albuns (albuns.js)');
  if (!Array.isArray(dados?.faixas) || !dados.faixas.length) { erro(onde, 'faixas precisa ser uma lista com pelo menos uma faixa'); continue; }
  const arquivos = new Set();
  dados.faixas.forEach((f, i) => {
    const ondeF = `${onde}.faixas[${i}]`;
    if (!f?.titulo) erro(ondeF, 'precisa de titulo');
    if (f?.texto !== undefined && typeof f.texto !== 'string') erro(ondeF, 'texto (referência bíblica) é opcional, mas precisa ser texto');
    if (!ARQUIVO_AUDIO.test(f?.arquivo || '')) erro(ondeF, `arquivo no formato NN-slug.mp3: ${f?.arquivo}`);
    else if (Number(f.arquivo.slice(0, 2)) !== i + 1) erro(ondeF, `numeração do arquivo fora da ordem: ${f.arquivo}`);
    if (arquivos.has(f?.arquivo)) erro(ondeF, `arquivo repetido: ${f.arquivo}`);
    arquivos.add(f?.arquivo);
    if (!Number.isInteger(f?.duracao) || f.duracao <= 0) erro(ondeF, 'duracao em segundos inteiros, maior que zero');
    conferirTextos(f, ondeF);
  });
  if (dados.letras) {
    const caminho = join(RAIZ, `js/dados/letras/${dados.letras}.js`);
    if (!/^[a-z0-9-]+$/.test(dados.letras) || !existsSync(caminho)) { erro(onde, `arquivo de letras não existe: ${dados.letras}`); continue; }
    const { letras } = await importarDados(pathToFileURL(caminho).href);
    const doAlbum = letras?.[slug];
    if (!Array.isArray(doAlbum)) erro(`letras ${dados.letras}`, `não tem a chave "${slug}"`);
    else {
      if (doAlbum.length !== dados.faixas.length) erro(`letras ${slug}`, `${doAlbum.length} letras para ${dados.faixas.length} faixas`);
      doAlbum.forEach((linhas, i) => { if (!Array.isArray(linhas) || linhas.some((l) => typeof l !== 'string')) erro(`letras ${slug}[${i}]`, 'cada letra é uma lista de linhas de texto'); });
      conferirTextos(doAlbum, `letras ${slug}`);
      // Letra sincronizada (T-31): um tempo por linha, null nas linhas vazias, em ordem e dentro da faixa.
      if (dados.tempos) {
        const caminhoT = join(RAIZ, `js/dados/tempos/${dados.tempos}.js`);
        if (!/^[a-z0-9-]+$/.test(dados.tempos) || !existsSync(caminhoT)) erro(onde, `arquivo de tempos não existe: ${dados.tempos}`);
        else {
          const { tempos } = await importarDados(pathToFileURL(caminhoT).href);
          const doAlbumT = tempos?.[slug];
          if (!Array.isArray(doAlbumT)) erro(`tempos ${dados.tempos}`, `não tem a chave "${slug}"`);
          else {
            if (doAlbumT.length !== doAlbum.length) erro(`tempos ${slug}`, `${doAlbumT.length} faixas com tempos para ${doAlbum.length} letras`);
            doAlbumT.forEach((ts, i) => {
              const ondeT = `tempos ${slug}[${i}]`, linhas = doAlbum[i] || [];
              if (!Array.isArray(ts) || ts.length !== linhas.length) { erro(ondeT, `precisa de um tempo por linha da letra (${linhas.length})`); return; }
              let antes = -1;
              ts.forEach((t, j) => {
                if (!linhas[j]) { if (t !== null) erro(ondeT, `linha ${j + 1} é vazia: o tempo precisa ser null`); return; }
                if (typeof t !== 'number' || !Number.isFinite(t) || t < 0) { erro(ondeT, `linha ${j + 1} sem tempo em segundos`); return; }
                if (t <= antes) erro(ondeT, `linha ${j + 1} começa antes da anterior (${t}s)`);
                if (t > (dados.faixas[i]?.duracao || Infinity)) erro(ondeT, `linha ${j + 1} passa da duração da faixa (${t}s)`);
                antes = t;
              });
            });
          }
        }
      }
    }
  }
}

// Ícones: todo nome usado precisa existir no sprite (imagens/icones/sprite.svg).
const sprite = readFileSync(join(RAIZ, 'imagens/icones/sprite.svg'), 'utf8');
const icones = new Set([...sprite.matchAll(/<symbol id="([a-z0-9-]+)"/g)].map((m) => m[1]));
linksBio.forEach((l, i) => { if (!icones.has(l.icone)) erro(`linksBio[${i}]`, `ícone não existe no sprite: ${l.icone}`); });
Object.entries(iconesTema).forEach(([tema, nome]) => { if (!icones.has(nome)) erro(`iconesTema.${tema}`, `ícone não existe no sprite: ${nome}`); });
Object.keys(temasNovidade).forEach((t) => { if (!iconesTema[t]) erro('iconesTema', `tema sem ícone: ${t}`); });

// Âncoras da página Música não podem ter o nome de um álbum.
ancoras.map((a) => a.slice(1, -1)).forEach((a) => { if (slugsAlbuns.has(a)) erro('js/main.js', `âncora da Música igual a slug de álbum: ${a}`); });

// ---------- Início ----------
linksBio.forEach((l, i) => {
  if (!l.rotulo || !l.destino) erro(`linksBio[${i}]`, 'precisa de rotulo e destino');
  if (!/^(#\/|https:\/\/)/.test(l.destino || '')) erro(`linksBio[${i}]`, `destino deve começar com #/ ou https://: ${l.destino}`);
  conferirTextos(l, `linksBio[${i}]`);
});
const outrosAtalhos = linksBio.filter((l) => !l.destaque).length;
if (outrosAtalhos % 4 !== 0) erro('linksBio', `${outrosAtalhos} atalhos sem destaque: use múltiplo de 4 para a grade fechar (docs/09, T-06)`);
conferirCapa(perfil.foto, 'perfil.foto', [240, 480]);

// ---------- Resultado ----------
encerrarSeErros();
console.log(`✅ Dados conferidos: ${novidades.length} novidades, ${ferramentas.length} páginas de IA, ${reflexoes.length} pregações, ${albuns.length} álbuns, ${singles.length} singles, ${Object.keys(faixasPrimeiras).length} primeira(s) versão(ões) com player.`);
