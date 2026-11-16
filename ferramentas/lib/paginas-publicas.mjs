import { escapar } from '../../js/modules/templates.js';
import { ORIGEM_PUBLICA } from '../../js/modules/paginas-publicas.js';

export function renderizarPassagem(p) {
  const imagem = `${ORIGEM_PUBLICA}/${p.imagem}`;
  const titulo = `${p.titulo} · Franklin Carvalho`;
  // O destino tem seção fixa e slug validado, nunca texto editorial dentro do script.
  const destino = `/${p.rota}`;
  return `<!DOCTYPE html>
<!-- Gerado por ferramentas/gerar-paginas.mjs. Não editar à mão. -->
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapar(titulo)}</title>
  <meta name="description" content="${escapar(p.resumo)}">
  <link rel="canonical" href="${escapar(p.url)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Franklin Carvalho · @samfieldsoak">
  <meta property="og:title" content="${escapar(p.titulo)}">
  <meta property="og:description" content="${escapar(p.resumo)}">
  <meta property="og:url" content="${escapar(p.url)}">
  <meta property="og:image" content="${escapar(imagem)}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapar(p.fonteImagem ? `Capa de ${p.titulo}` : 'Franklin Carvalho · Fé, música e tecnologia')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapar(p.titulo)}">
  <meta name="twitter:description" content="${escapar(p.resumo)}">
  <meta name="twitter:image" content="${escapar(imagem)}">
  <link rel="stylesheet" href="/css/variaveis.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/componentes.css">
  <script>try { location.replace(${JSON.stringify(destino)}); } catch { /* O link abaixo continua disponível. */ }</script>
</head>
<body>
  <main class="principal container container--texto">
    <p class="sobretitulo">Franklin Carvalho · @samfieldsoak</p>
    <h1>${escapar(p.titulo)}</h1>
    <p class="lead">${escapar(p.resumo)}</p>
    <p><a class="botao" href="${escapar(destino)}">Abrir página</a></p>
  </main>
</body>
</html>
`;
}

export function renderizarSitemap(paginas) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[ORIGEM_PUBLICA + '/', ...paginas.map((p) => p.url)].map((url) => `  <url><loc>${escapar(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
}

// Lê os marcadores de dimensão do JPEG sem decodificar ou reprocessar a imagem no CI.
export function conferirJpeg(bytes, nome) {
  if (bytes.length >= 300000) throw new Error(`${nome}: precisa ter menos de 300.000 bytes`);
  if (bytes.readUInt16BE(0) !== 0xffd8 || bytes.readUInt16BE(bytes.length - 2) !== 0xffd9) throw new Error(`${nome}: JPEG inválido`);
  let pos = 2;
  while (pos + 4 < bytes.length) {
    if (bytes[pos++] !== 0xff) throw new Error(`${nome}: marcador JPEG inválido`);
    while (bytes[pos] === 0xff) pos++;
    const marcador = bytes[pos++];
    const tamanho = bytes.readUInt16BE(pos);
    if (tamanho < 2 || pos + tamanho > bytes.length) break;
    if ([0xc0, 0xc1, 0xc2].includes(marcador)) {
      if (bytes.readUInt16BE(pos + 3) !== 630 || bytes.readUInt16BE(pos + 5) !== 1200) throw new Error(`${nome}: precisa medir 1200x630`);
      return;
    }
    pos += tamanho;
  }
  throw new Error(`${nome}: dimensões JPEG não encontradas`);
}
