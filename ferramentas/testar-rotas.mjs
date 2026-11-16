// Abre todas as páginas do site em 390px e 1280px e confere o básico (docs/10-sistema-de-publicacao.md):
// um h1 por tela, sem rolagem lateral, imagens com alt, sem erro de JavaScript, sem arquivo local faltando.
// Uso, na raiz do repositório: node ferramentas/testar-rotas.mjs [--capturas]
// Precisa do Playwright (no GitHub Actions ele é instalado na hora; no PC: npm i -g playwright).
// Sobe um servidor local próprio na porta 8099; não precisa do python -m http.server rodando.

import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';
import { strict as assert } from 'node:assert';

import { novidades } from '../js/dados/novidades.js';
import { ferramentas } from '../js/dados/ferramentas.js';
import { reflexoes } from '../js/dados/reflexoes.js';
import { albuns, destaqueSuno } from '../js/dados/albuns.js';

const require = createRequire(import.meta.url);   // require acha o Playwright instalado globalmente
const { chromium } = require('playwright');

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORTA = 8099;
const BASE = `http://127.0.0.1:${PORTA}`;
const CAPTURAS = process.argv.includes('--capturas');
const LARGURAS = [390, 1280];
const EXTERNOS = /gc\.zgo\.at|goatcounter\.com|open\.spotify\.com|scdn\.co|https:\/\/suno\.com\/embed\//;   // fora do site: não contam (inclusive iframe encerrado na troca)

// Testa a integração do site sem depender de cookies, rede ou áudio dos provedores.
// O HTML neutro só substitui o conteúdo remoto; nossos botões e iframes são reais.
async function conferirPlayers(pagina, rota) {
  const containers = pagina.locator('[data-player-suno]');
  if (rota === 'inicio' && !destaqueSuno) {
    assert.equal(await containers.count(), 0);
    return;
  }
  assert.equal(await containers.count(), rota === 'inicio' ? 1 : 12);
  assert.equal(await pagina.locator('#app iframe').count(), 0, 'player carregou antes do clique');
  const primeira = containers.first();
  const ultima = containers.last();
  await primeira.locator('button').click();
  const idInicial = rota === 'inicio'
    ? albuns.find((a) => a.slug === destaqueSuno.album).faixasLista[destaqueSuno.faixa - 1].sunoId
    : 'b570fd08-038b-4149-95dd-4f1c1591c05d';
  assert.equal(await primeira.locator('iframe').getAttribute('src'), `https://suno.com/embed/${idInicial}`);
  assert.equal(await primeira.locator('iframe').getAttribute('height'), '240');
  assert.equal(await primeira.locator('iframe').getAttribute('loading'), 'lazy');
  assert.equal(await primeira.locator('iframe').getAttribute('allow'), 'autoplay; encrypted-media; fullscreen');
  assert.equal(await pagina.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, 'rolagem lateral com Suno aberto');
  if (rota !== 'inicio') {
    await ultima.locator('button').click();
    assert.equal(await primeira.locator('iframe').count(), 0, 'primeira faixa continuou aberta');
    assert.equal(await ultima.locator('iframe').getAttribute('src'), 'https://suno.com/embed/f239f506-cb98-4f7a-a419-00fea876416c');
    assert.equal(await pagina.locator('#app iframe').count(), 1);
    const letra = pagina.locator('[data-faixa="11"] details');
    await letra.locator('summary').click();
    assert.equal(await letra.getAttribute('open'), '', 'Ver letra não abriu junto do player');
  }
  await pagina.locator('[data-player-album] button').click();
  assert.equal(await pagina.locator('[data-player-suno] iframe').count(), 0, 'Suno continuou junto do Spotify');
  assert.equal(await pagina.locator('#app iframe').count(), 1);
  await primeira.locator('button').click();
  assert.equal(await pagina.locator('[data-player-album] iframe').count(), 0, 'Spotify continuou junto do Suno');
  await primeira.getByRole('button', { name: 'Encerrar reprodução' }).click();
  assert.equal(await pagina.locator('#app iframe').count(), 0);
  assert.equal(await primeira.locator('button').evaluate((b) => b === document.activeElement), true);
  await primeira.locator('button').click();
  await pagina.locator('a[href="#/sobre"]').last().click();
  await pagina.waitForFunction(() => location.hash === '#/sobre' && document.querySelector('h1')?.textContent.includes('Sobre'));
  assert.equal(await pagina.locator('#app iframe').count(), 0, 'player não encerrou ao trocar de página');
  // A próxima rota não deve abortar a foto iniciada pela navegação deste teste
  // e atribuir essa requisição antiga à nova página (net::ERR_ABORTED).
  await pagina.locator('.sobre__foto img').evaluate((img) => img.decode());
}

const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };

const servidor = createServer(async (req, res) => {
  const caminho = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  try {
    const arquivo = join(RAIZ, caminho.endsWith('/') ? caminho + 'index.html' : caminho);
    const corpo = await readFile(arquivo);
    res.writeHead(200, { 'Content-Type': tipos[extname(arquivo)] || 'application/octet-stream' });
    res.end(corpo);
  } catch {
    res.writeHead(404); res.end('404');
  }
});
await new Promise((ok) => servidor.listen(PORTA, '127.0.0.1', ok));

const rotas = [
  'inicio', 'novidades', 'ia-sem-labia', 'musica', 'palavra', 'sobre',
  'musica/discografia', 'novidades/nao-existe', 'rota-que-nao-existe',
  ...novidades.filter((n) => !n.rota).map((n) => `novidades/${n.slug}`),
  ...ferramentas.map((f) => `ia-sem-labia/${f.slug}`),
  ...reflexoes.map((r) => `palavra/${r.slug}`),
  ...albuns.map((a) => `musica/${a.slug}`),
];

// Exercita a lista e os filtros sem depender de títulos ou quantidade fixa de publicações.
async function conferirOrdemIa(pagina) {
  const originais = ferramentas.map((f) => f.slug);
  const conferir = async (categoria, status) => {
    const slugs = await pagina.locator('[data-lista] .cartao__link').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href').split('/').pop()));
    const elegiveis = ferramentas.filter((f) =>
      (categoria === 'todas' || f.categoria === categoria) && (status === 'todas' || f.status === status));
    assert.equal(slugs.length, elegiveis.length, 'contagem de cards após filtrar');
    assert.equal(new Set(slugs).size, slugs.length, 'cards duplicados');
    assert.deepEqual([...slugs].sort(), elegiveis.map((f) => f.slug).sort(), 'filtro perdeu ou incluiu um artigo indevido');
    for (let i = 1; i < slugs.length; i++) {
      const anterior = ferramentas.find((f) => f.slug === slugs[i - 1]);
      const atual = ferramentas.find((f) => f.slug === slugs[i]);
      assert.ok(anterior.analisadoEm >= atual.analisadoEm, 'artigo antigo apareceu antes de um recente');
      if (anterior.analisadoEm === atual.analisadoEm) {
        assert.ok(originais.indexOf(anterior.slug) > originais.indexOf(atual.slug), 'empate não favoreceu o último cadastro');
      }
    }
    assert.equal((await pagina.locator('[data-contagem]').textContent()).trim(),
      elegiveis.length === 1 ? '1 página' : `${elegiveis.length} páginas`);
  };
  await conferir('todas', 'todas');
  const variosStatus = new Set(ferramentas.map((f) => f.status)).size > 1;
  for (const categoria of ['todas', ...new Set(ferramentas.map((f) => f.categoria))]) {
    await pagina.locator(`input[name="categoria"][value="${categoria}"]`).press('Space');
    for (const status of variosStatus ? ['todas', ...new Set(ferramentas.map((f) => f.status))] : ['todas']) {
      if (variosStatus) await pagina.locator(`input[name="status"][value="${status}"]`).press('Space');
      await conferir(categoria, status);
    }
  }
  // Voltar a Todas deve restaurar a lista completa, ainda na ordem correta.
  await pagina.locator('input[name="categoria"][value="todas"]').press('Space');
  if (await pagina.locator('[data-filtro-status]').isVisible()) {
    await pagina.locator('input[name="status"][value="todas"]').press('Space');
  }
  await conferir('todas', 'todas');
  // Os filtros reiniciam a entrada dos cards; a captura deve mostrar a lista já visível.
  await pagina.locator('[data-lista]').evaluate((lista) =>
    Promise.all(lista.getAnimations({ subtree: true }).map((animacao) => animacao.finished)));
}

async function conferirRetornoFiltrosIa(pagina, navegar) {
  const ultima = ferramentas.at(-1);
  if (!ultima) return;
  const lerLista = () => pagina.locator('[data-filtros]').evaluate((form) => ({
    categoria: form.elements.categoria.value,
    status: form.elements.status.value,
    contagem: document.querySelector('[data-contagem]').textContent,
    links: [...document.querySelectorAll('[data-lista] .cartao__link')].map((a) => a.getAttribute('href')),
  }));
  const selecionar = async () => {
    await pagina.locator(`input[name="categoria"][value="${ultima.categoria}"]`).press('Space');
    if (await pagina.locator('[data-filtro-status]').isVisible()) {
      await pagina.locator(`input[name="status"][value="${ultima.status}"]`).press('Space');
    }
  };
  // Este fluxo verifica estado e navegação; imagens lazy fora da tela não precisam carregar.
  const abrirArtigo = () => navegar(async () => {
    await pagina.locator('[data-lista] .cartao__link').first().click();
    await pagina.locator('[data-detalhe] h1').waitFor({ state: 'visible' });
  });
  await selecionar();
  const antes = await lerLista();
  await abrirArtigo();
  await navegar(async () => {
    await pagina.goBack();
    await pagina.locator('[data-filtros]').waitFor({ state: 'visible' });
  });
  assert.deepEqual(await lerLista(), antes, 'Voltar do navegador perdeu filtros, contagem ou ordem');
  if (CAPTURAS) {
    await pagina.locator('[data-lista]').evaluate((lista) =>
      Promise.all(lista.getAnimations({ subtree: true }).map((a) => a.finished)));
    await pagina.screenshot({ path: join(RAIZ, 'ferramentas/capturas', `${pagina.viewportSize().width}-ia-sem-labia-retorno.png`), fullPage: true });
  }
  await abrirArtigo();
  await navegar(async () => {
    await pagina.getByRole('link', { name: '← IA sem lábia', exact: true }).click();
    await pagina.locator('[data-filtros]').waitFor({ state: 'visible' });
  });
  assert.deepEqual(await lerLista(), antes, 'link de retorno perdeu os filtros');
  await navegar(async () => {
    await pagina.locator('.rodape a[href="#/novidades"]').click();
    await pagina.locator('[data-filtro-tema]').waitFor({ state: 'visible' });
  });
  await navegar(async () => {
    await pagina.locator('.rodape a[href="#/ia-sem-labia"]').click();
    await pagina.locator('[data-filtros]').waitFor({ state: 'visible' });
  });
  assert.deepEqual(await lerLista(), antes, 'trocar de seção perdeu os filtros da aba');
  await pagina.locator('input[name="categoria"][value="todas"]').press('Space');
  if (await pagina.locator('[data-filtro-status]').isVisible()) {
    await pagina.locator('input[name="status"][value="todas"]').press('Space');
  }
  const todas = await lerLista();
  assert.equal(todas.links.length, ferramentas.length, 'Todas não limpou os filtros');
  await selecionar();
  await navegar(async () => {
    await pagina.reload();
    await pagina.locator('[data-filtros]').waitFor({ state: 'visible' });
  });
  assert.deepEqual(await lerLista(), todas, 'recarregar não começou com Todas');
}

async function conferirDatasIa(pagina, rota) {
  const dataBR = (iso) => new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })
    .format(new Date(`${iso}T12:00:00Z`));
  const conferir = (registro, f) => {
    assert.ok(f, 'card com slug de IA desconhecido');
    assert.ok(registro.texto.includes('Análise:'), 'data da análise sem rótulo');
    assert.ok(registro.texto.includes('Fontes conferidas em'), 'conferência das fontes sem rótulo');
    assert.deepEqual(registro.datas, [f.analisadoEm, f.conferidoEm], 'datas não correspondem ao cadastro');
    assert.deepEqual(registro.textos, [dataBR(f.analisadoEm), dataBR(f.conferidoEm)], 'datas fora do formato brasileiro');
    assert.equal(registro.ocultas, false, 'datas ocultas do leitor de tela');
  };
  const cards = await pagina.locator('.cartao:has(.cartao__link[href^="#/ia-sem-labia/"])').evaluateAll((itens) =>
    itens.map((card) => ({
      slug: card.querySelector('.cartao__link').getAttribute('href').split('/').pop(),
      texto: card.querySelector('.cartao__meta')?.textContent || '',
      datas: [...card.querySelectorAll('.cartao__meta time')].map((t) => t.getAttribute('datetime')),
      textos: [...card.querySelectorAll('.cartao__meta time')].map((t) => t.textContent),
      ocultas: !!card.querySelector('.cartao__meta')?.closest('[aria-hidden="true"]'),
    })));
  cards.forEach((card) => conferir(card, ferramentas.find((f) => f.slug === card.slug)));
  if (rota === 'ia-sem-labia') assert.equal(cards.length, ferramentas.length);
  else {
    const cabecalho = await pagina.locator('[data-detalhe] header').evaluate((el) => ({
      texto: el.textContent,
      datas: [...el.querySelectorAll('time')].map((t) => t.getAttribute('datetime')),
      textos: [...el.querySelectorAll('time')].map((t) => t.textContent),
      ocultas: [...el.querySelectorAll('time')].some((t) => !!t.closest('[aria-hidden="true"]')),
    }));
    conferir(cabecalho, ferramentas.find((f) => f.slug === rota.split('/')[1]));
  }
}

// T-27: apresentação ampla, categoria útil e status sem filtro redundante.
async function conferirApresentacaoIa(pagina) {
  assert.ok((await pagina.locator('.sobretitulo').textContent()).includes('IA e tecnologia prática'));
  const categorias = await pagina.locator('[data-opcoes="categoria"] .chip span').allTextContents();
  assert.ok(categorias.includes('Windows e segurança'));
  assert.ok(!categorias.includes('Outros'), 'categoria antiga ainda aparece sem artigos');
  const variosStatus = new Set(ferramentas.map((f) => f.status)).size > 1;
  assert.equal(await pagina.locator('[data-filtro-status]').isVisible(), variosStatus);
  assert.equal(await pagina.locator('[data-filtro-status]').evaluate((el) => el.disabled), !variosStatus, 'fieldset de status não corresponde à variedade');
  assert.equal(await pagina.locator('[data-opcoes="status"] input').first().isDisabled(), !variosStatus, 'radios de status não herdaram a desabilitação');
  assert.equal(await pagina.locator('[data-status-unico]').isVisible(), !variosStatus);
  if (!variosStatus) {
    assert.equal(await pagina.locator('[data-filtros]').evaluate((form) => form.elements.status.value), 'todas');
    assert.ok((await pagina.locator('[data-status-unico]').textContent()).includes('Analisado'));
  }
  await pagina.locator('input[name="categoria"][value="windows"]').press('Space');
  const guias = await pagina.locator('[data-lista] .cartao__link').evaluateAll((links) => links.map((el) => el.getAttribute('href').split('/').pop()));
  assert.deepEqual(guias.sort(), ['otimizadores-de-pc', 'precisa-pagar-antivirus']);
  const selos = await pagina.locator('[data-lista] .selo--categoria').allTextContents();
  assert.ok(selos.every((texto) => texto === 'Windows e segurança'));
  await pagina.locator('input[name="categoria"][value="todas"]').press('Space');

  // Simula uma base com status diferentes sem gravar ou alterar o cadastro servido.
  const resultado = await pagina.evaluate(async () => {
    const { ferramentas } = await import('/js/dados/ferramentas.js');
    const original = ferramentas[0].status;
    const amostra = document.createElement('div');
    amostra.innerHTML = document.querySelector('#app').innerHTML;
    document.body.append(amostra);
    try {
      ferramentas[0].status = 'testado';
      const modulo = await import('/js/telas/ia-lista.js?amostra-t27');
      modulo.registrarEventosIaLista(amostra);
      modulo.iniciarIaLista(amostra);
      const grupo = amostra.querySelector('[data-filtro-status]');
      const teste = amostra.querySelector('input[name="status"][value="testado"]');
      teste.click();
      const soTestado = amostra.querySelectorAll('[data-lista] .cartao__link').length;
      const categoria = amostra.querySelector('input[name="categoria"][value="instagram"]');
      categoria.click();
      modulo.iniciarIaLista(amostra);
      const salvo = amostra.querySelector('[data-filtros]').elements.status.value;
      const salvoCategoria = amostra.querySelector('[data-filtros]').elements.categoria.value;
      amostra.querySelector('input[name="status"][value="todas"]').click();
      const todosDaCategoria = amostra.querySelectorAll('[data-lista] .cartao__link').length;
      return { visivel: !grupo.hidden && !grupo.disabled, avisoOculto: amostra.querySelector('[data-status-unico]').hidden,
        soTestado, salvo, salvoCategoria, todosDaCategoria };
    } finally {
      ferramentas[0].status = original;
      amostra.remove();
    }
  });
  assert.deepEqual(resultado, { visivel: true, avisoOculto: true, soTestado: 1, salvo: 'testado', salvoCategoria: 'instagram',
    todosDaCategoria: ferramentas.filter((f) => f.categoria === 'instagram').length });
}

// T-26: atalhos por teclado preservam a rota e levam o foco para seções reais.
async function conferirLeituraIa(pagina) {
  await pagina.evaluate(() => document.fonts.ready);
  const indice = pagina.getByRole('navigation', { name: 'Nesta página', exact: true });
  const botoes = indice.getByRole('button');
  const titulos = pagina.locator('[data-corpo-ia] > section > h2');
  assert.equal(await botoes.count(), await titulos.count(), 'índice omitiu ou inventou uma seção');
  assert.ok(await botoes.count() > 0);
  const rota = pagina.url();
  const tamanhoHistorico = await pagina.evaluate(() => history.length);
  for (let i = 0; i < await botoes.count(); i++) {
    const botao = botoes.nth(i);
    const titulo = titulos.nth(i);
    const nome = await titulo.evaluate((el) => [...el.childNodes]
      .filter((no) => no.nodeType === Node.TEXT_NODE).map((no) => no.textContent).join('').trim());
    assert.equal(await botao.textContent(), nome, 'índice não usa o título atual ou repetiu selo');
    assert.equal(await botao.getAttribute('aria-controls'), await titulo.getAttribute('id'));
    await botao.focus();
    assert.equal(await botao.evaluate((el) => getComputedStyle(el).outlineStyle), 'solid', 'foco invisível no índice');
    await botao.press(i % 2 ? 'Space' : 'Enter');
    assert.ok(await titulo.evaluate((el) => el === document.activeElement), 'atalho não levou foco à seção');
    assert.ok(await titulo.evaluate((el) => el.getBoundingClientRect().top >= document.querySelector('.topo').getBoundingClientRect().bottom), 'título coberto pelo cabeçalho');
    assert.ok(await botao.evaluate((el) => el.getBoundingClientRect().height >= 44), 'alvo de toque pequeno');
    assert.equal(pagina.url(), rota, 'índice alterou o endereço do artigo');
  }
  assert.equal(await pagina.evaluate(() => history.length), tamanhoHistorico, 'índice criou entradas no histórico');
  assert.equal(await pagina.locator('[data-acao="compartilhar"]').count(), 1);
  assert.match(await pagina.locator('[data-tempo-leitura]').textContent(), /^Leitura estimada: [1-9]\d* min$/);
  // Regressão com texto controlado: 401 palavras, sem contar relacionados/galeria.
  const amostra = await pagina.evaluate(async () => {
    const { iniciarLeituraIa } = await import('/js/modules/leitura-ia.js');
    const alvo = document.createElement('div');
    alvo.innerHTML = '<h1>Título</h1><p class="lead">Resumo</p><p data-tempo-leitura></p><nav data-indice-artigo></nav><div data-corpo-ia></div><section><h2>Relacionadas</h2></section>';
    const corpo = alvo.querySelector('[data-corpo-ia]');
    const p = document.createElement('p');
    p.textContent = Array(399).fill('palavra').join(' ');
    corpo.append(p);
    const galeria = document.createElement('ul');
    galeria.className = 'galeria';
    galeria.textContent = Array(500).fill('imagem').join(' ');
    corpo.append(galeria);
    iniciarLeituraIa(alvo);
    return { tempo: alvo.querySelector('[data-tempo-leitura]').textContent, vazio: alvo.querySelector('[data-indice-artigo]').hidden };
  });
  assert.deepEqual(amostra, { tempo: 'Leitura estimada: 3 min', vazio: true });
  // A captura mostra o início e o índice, depois dos saltos por teclado.
  await pagina.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await pagina.locator('[data-detalhe] h1').focus();
}

// Só desconsidera cancelamentos de requisições ligadas às navegações deste teste.
// O WeakSet mantém a atribuição quando o evento de cancelamento chega após a ação.
function acompanharNavegacao(pagina, registrarErro) {
  const ativos = new Set();
  const ligadosANavegacao = new WeakSet();
  let navegando = false;
  pagina.on('request', (r) => {
    ativos.add(r);
    if (navegando) ligadosANavegacao.add(r);
  });
  pagina.on('requestfinished', (r) => ativos.delete(r));
  pagina.on('requestfailed', (r) => {
    ativos.delete(r);
    const erro = r.failure()?.errorText || 'sem detalhe';
    if (erro === 'net::ERR_ABORTED' && ligadosANavegacao.has(r)) return;
    if (!EXTERNOS.test(r.url())) registrarErro(`falhou: ${r.url()} (${erro})`);
  });
  return async (acao) => {
    ativos.forEach((r) => ligadosANavegacao.add(r));
    navegando = true;
    try { await acao(); }
    finally { navegando = false; }
  };
}

const navegador = await chromium.launch();
const falhas = [];
if (CAPTURAS) await mkdir(join(RAIZ, 'ferramentas/capturas'), { recursive: true });

for (const largura of LARGURAS) {
  for (const rota of rotas) {
    // Uma página por rota: requisições canceladas na anterior não contaminam a próxima.
    const pagina = await navegador.newPage({ viewport: { width: largura, height: 900 } });
    let pedidosPlayer = 0;
    for (const url of ['https://suno.com/embed/**', 'https://open.spotify.com/embed/**']) {
      await pagina.route(url, (r) => {
        pedidosPlayer++;
        return r.fulfill({ contentType: 'text/html', body: '<!doctype html><html lang="pt-BR"><title>Player simulado para teste</title><body>Player simulado: teste da integração, sem áudio.</body></html>' });
      });
    }
    let errosDaRota = [];
    pagina.on('pageerror', (e) => errosDaRota.push(`erro de JavaScript: ${e.message}`));
    pagina.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) errosDaRota.push(`arquivo faltando (${r.status()}): ${r.url().slice(BASE.length)}`); });
    const navegar = acompanharNavegacao(pagina, (erro) => errosDaRota.push(erro));

    errosDaRota = [];
    const pedidosAntes = pedidosPlayer;
    await pagina.goto(`${BASE}/#/${rota}`);
    await pagina.waitForTimeout(700);
    const r = await pagina.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      rolagemLateral: document.documentElement.scrollWidth > window.innerWidth + 1,
      semAlt: document.querySelectorAll('img:not([alt])').length,
      titulo: document.title,
    }));
    const problemas = [...errosDaRota];
    if (r.h1 !== 1) problemas.push(`${r.h1} h1 (precisa de exatamente 1)`);
    if (r.rolagemLateral) problemas.push('rolagem lateral');
    if (r.semAlt) problemas.push(`${r.semAlt} imagem(ns) sem alt`);
    if (!r.titulo.includes('|')) problemas.push(`título da aba estranho: ${r.titulo}`);
    if (pedidosPlayer !== pedidosAntes) problemas.push('requisição de player antes do clique');
    problemas.forEach((p) => falhas.push(`${largura}px #/${rota}: ${p}`));
    if (rota === 'ia-sem-labia' || rota.startsWith('ia-sem-labia/')) {
      try { await conferirDatasIa(pagina, rota); }
      catch (e) { falhas.push(`${largura}px #/${rota}: datas: ${e.message}`); }
    }
    if (rota.startsWith('ia-sem-labia/')) {
      try {
        if (['otimizadores-de-pc', 'precisa-pagar-antivirus'].includes(rota.split('/')[1])) {
          assert.equal(await pagina.locator('[data-detalhe] header .selo--categoria').textContent(), 'Windows e segurança');
        }
        await conferirLeituraIa(pagina);
      }
      catch (e) { falhas.push(`${largura}px #/${rota}: leitura: ${e.message}`); }
    }
    if (rota === 'ia-sem-labia') {
      try {
        await conferirApresentacaoIa(pagina);
        await conferirRetornoFiltrosIa(pagina, navegar);
        await conferirOrdemIa(pagina);
        const novosErros = errosDaRota.filter((e) => !problemas.includes(e));
        assert.equal(novosErros.length, 0, novosErros.join('; '));
      }
      catch (e) { falhas.push(`${largura}px #/${rota}: ordem e filtros: ${e.message}`); }
    }
    if (CAPTURAS) await pagina.screenshot({ path: join(RAIZ, 'ferramentas/capturas', `${largura}-${rota.replace(/\//g, '_')}.png`), fullPage: true });
    if (rota === 'inicio' || rota === 'musica/santuario-do-altissimo') {
      try {
        await conferirPlayers(pagina, rota);
        const novosErros = errosDaRota.filter((e) => !problemas.includes(e));
        assert.equal(novosErros.length, 0, novosErros.join('; '));
      }
      catch (e) { falhas.push(`${largura}px #/${rota}: players: ${e.message}`); }
    }
    await pagina.close();
  }
}

await navegador.close();
servidor.close();

if (falhas.length) {
  console.log(`❌ ${falhas.length} problema(s):\n`);
  falhas.forEach((f) => console.log(' - ' + f));
  process.exit(1);
}
console.log(`✅ ${rotas.length} rotas em ${LARGURAS.join(' e ')}px: um h1, sem rolagem lateral, imagens com alt, sem erro.${CAPTURAS ? ' Capturas em ferramentas/capturas/.' : ''}`);
