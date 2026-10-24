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

import { novidades } from '../js/dados/novidades.js';
import { ferramentas } from '../js/dados/ferramentas.js';
import { reflexoes } from '../js/dados/reflexoes.js';
import { albuns } from '../js/dados/albuns.js';

const require = createRequire(import.meta.url);   // require acha o Playwright instalado globalmente
const { chromium } = require('playwright');

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORTA = 8099;
const BASE = `http://127.0.0.1:${PORTA}`;
const CAPTURAS = process.argv.includes('--capturas');
const LARGURAS = [390, 1280];
const EXTERNOS = /gc\.zgo\.at|goatcounter\.com|open\.spotify\.com|scdn\.co/;   // fora do site: não contam

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

const navegador = await chromium.launch();
const falhas = [];
if (CAPTURAS) await mkdir(join(RAIZ, 'ferramentas/capturas'), { recursive: true });

for (const largura of LARGURAS) {
  const pagina = await navegador.newPage({ viewport: { width: largura, height: 900 } });
  let errosDaRota = [];
  pagina.on('pageerror', (e) => errosDaRota.push(`erro de JavaScript: ${e.message}`));
  pagina.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(BASE)) errosDaRota.push(`arquivo faltando (${r.status()}): ${r.url().slice(BASE.length)}`); });
  pagina.on('requestfailed', (r) => { if (!EXTERNOS.test(r.url())) errosDaRota.push(`falhou: ${r.url()}`); });

  for (const rota of rotas) {
    errosDaRota = [];
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
    problemas.forEach((p) => falhas.push(`${largura}px #/${rota}: ${p}`));
    if (CAPTURAS) await pagina.screenshot({ path: join(RAIZ, 'ferramentas/capturas', `${largura}-${rota.replace(/\//g, '_')}.png`), fullPage: true });
  }
  await pagina.close();
}

await navegador.close();
servidor.close();

if (falhas.length) {
  console.log(`❌ ${falhas.length} problema(s):\n`);
  falhas.forEach((f) => console.log(' - ' + f));
  process.exit(1);
}
console.log(`✅ ${rotas.length} rotas em ${LARGURAS.join(' e ')}px: um h1, sem rolagem lateral, imagens com alt, sem erro.${CAPTURAS ? ' Capturas em ferramentas/capturas/.' : ''}`);
