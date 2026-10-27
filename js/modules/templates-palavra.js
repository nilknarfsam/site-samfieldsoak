// HTML da seção Palavra (lista e página de cada pregação). Todo texto de dados passa por escapar().

import { escapar, dataBR, linkExterno, botaoCompartilhar } from './templates.js';
import { reflexoes, nomesVersao, creditoNVI } from '../dados/reflexoes.js';

const tem = (lista) => Array.isArray(lista) && lista.length > 0;
const rotaReflexao = (r) => `#/palavra/${encodeURIComponent(r.slug)}`;

// Destaca a palavra-chave do título na faixa dourada (campo faixa).
function tituloComFaixa(r) {
  if (!r.faixa || !r.titulo.includes(r.faixa)) return escapar(r.titulo);
  const i = r.titulo.indexOf(r.faixa);
  return `${escapar(r.titulo.slice(0, i))}<span class="titulo-faixa__marca">${escapar(r.faixa)}</span>${escapar(r.titulo.slice(i + r.faixa.length))}`;
}

// Parágrafo comum ou subtítulo (texto que começa com "## ").
const paragrafo = (t) => (t.startsWith('## ') ? `<h3>${escapar(t.slice(3))}</h3>` : `<p>${escapar(t)}</p>`);

export const citacao = (c, versao = 'NVI', classe = '') => `
  <blockquote class="citacao${classe ? ' ' + classe : ''}">
    <p>${escapar(c.texto)}</p>
    <footer><cite>${escapar(c.ref)}</cite> <span class="citacao__versao">${escapar(versao)}</span></footer>
  </blockquote>`;

// Nota de estudo recolhível: explicação de passagem difícil ou debatida.
const notaEstudo = (n) => `
  <details class="nota-estudo">
    <summary><span class="nota-estudo__rotulo">Para entender melhor</span><span class="nota-estudo__titulo">${escapar(n.titulo)}</span></summary>
    <div class="nota-estudo__corpo">${n.paragrafos.map(paragrafo).join('')}</div>
  </details>`;

// ---------- Lista (#/palavra) ----------

// Mesmo padrão do cartaoFerramenta (templates.js): título como link esticado, rodapé preso embaixo.
export const cartaoReflexao = (r) => `
  <li class="col-md-6 col-lg-4" data-animar>
    <article class="cartao cartao--clicavel">
      <p class="cartao__meta">${escapar(r.referencia)} · ${escapar(r.versao)}</p>
      <h2 class="cartao__titulo"><a class="cartao__link" href="${rotaReflexao(r)}">${escapar(r.titulo)}</a></h2>
      <p class="cartao__resumo">${escapar(r.resumo)}</p>
      <p class="cartao__rodape"><span>${escapar(r.ocasiao)} <span class="sem-quebra">· <time datetime="${escapar(r.data)}">${escapar(dataBR(r.data))}</time></span></span><span class="cartao__acao" aria-hidden="true">Ler a pregação →</span></p>
    </article>
  </li>`;

// ---------- Página da pregação (#/palavra/<slug>) ----------

export function detalheReflexao(r, album) {
  const versao = r.versao || 'NVI';
  const partes = [];
  partes.push(`
    <a class="voltar" href="#/palavra">← Palavra</a>
    <div class="progresso progresso--palavra" aria-hidden="true"><span>PALAVRA</span><span class="progresso__barra"><span></span></span><span>${escapar(r.livro).toUpperCase()}</span></div>
    <header class="mb-5">
      <div class="selos">
        <span class="selo selo--palavra">${escapar(r.referencia)}</span>
        <span class="selos__texto">${escapar(r.ocasiao)} · <time datetime="${escapar(r.data)}">${escapar(dataBR(r.data))}</time></span>
      </div>
      <h1 class="titulo-faixa">${tituloComFaixa(r)}</h1>
      <p class="lead">${escapar(r.resumo)}</p>
      ${r.versiculo ? citacao(r.versiculo, versao, 'citacao--destaque') : ''}
      ${r.fraseTema ? `<p class="frase-tema">${escapar(r.fraseTema)}</p>` : ''}
      ${botaoCompartilhar()}
    </header>`);

  if (tem(r.introducao)) partes.push(`<section class="bloco bloco--texto">${r.introducao.map(paragrafo).join('')}</section>`);

  r.secoes.forEach((s, i) => {
    partes.push(`
      <section class="bloco bloco--texto">
        <p class="ponto__numero">Ponto ${i + 1} · ${escapar(s.ref)}</p>
        <h2>${escapar(s.titulo)}</h2>
        ${s.citacao ? citacao(s.citacao, versao) : ''}
        ${s.paragrafos.map(paragrafo).join('')}
        ${s.nota ? notaEstudo(s.nota) : ''}
      </section>`);
  });

  if (tem(r.notas)) {
    partes.push(`<section class="bloco"><h2>Para entender melhor</h2>
      <p class="texto-suave">Explicações de passagens difíceis ou debatidas, para quem quer ir mais fundo.</p>
      ${r.notas.map(notaEstudo).join('')}</section>`);
  }

  if (r.apelo || tem(r.oracao)) {
    partes.push(`<section class="bloco bloco--apelo">
      ${r.apelo ? `<p class="apelo">${escapar(r.apelo)}</p>` : ''}
      ${r.citacaoFinal ? citacao(r.citacaoFinal, r.versao || 'NVI') : ''}
      ${tem(r.oracao) ? `<h2>${escapar(r.tituloOracao || 'Para orar')}</h2><ol class="lista-numerada">${r.oracao.map((t) => `<li>${escapar(t)}</li>`).join('')}</ol>` : ''}
    </section>`);
  }

  if (r.musica && album) {
    partes.push(`<section class="bloco"><h2>A música</h2>
      <a class="cartao cartao--link nota-criacao" href="#/musica/${encodeURIComponent(album.slug)}">
        <span class="album__base">${escapar(album.subtitulo || album.titulo)}${r.musica.numero ? ` · Faixa ${escapar(r.musica.numero)}` : ''}</span>
        <strong class="nota-criacao__titulo">${escapar(r.musica.numero ? r.musica.faixa : album.titulo)}</strong>
        <span class="nota-criacao__texto">${escapar(r.musica.texto)}</span>
        <span class="nota-criacao__mais">Ouvir o álbum e ler a letra <span aria-hidden="true">→</span></span>
      </a></section>`);
  }

  // Primeiro as do mesmo livro, depois as demais (as duas já em ordem de data).
  const demais = reflexoes.filter((x) => x.slug !== r.slug);
  const outras = [...demais.filter((x) => x.livro === r.livro), ...demais.filter((x) => x.livro !== r.livro)].slice(0, 3);
  if (tem(outras)) {
    partes.push(`<section class="bloco"><h2>Outras pregações</h2><ul class="grid lista-limpa">${outras.map(cartaoReflexao).join('')}</ul></section>`);
  }

  partes.push(`<footer class="bloco credito-biblico">
    ${r.leitura ? `<p>${linkExterno(r.leitura.url, `Ler ${r.leitura.ref} completo na ${versao}`, 'botao botao--contorno')}</p>` : ''}
    <p class="nota">Citações em trechos curtos da ${escapar(nomesVersao[versao] || versao)}. Os demais textos bíblicos aparecem com a referência, em paráfrase. ${versao === 'NVI' ? escapar(creditoNVI) : ''}</p>
  </footer>`);
  return partes.join('');
}

// Bloco "Da Palavra" na página de um álbum: pregações ligadas a ele.
export function blocoPalavraDoAlbum(slugAlbum) {
  const ligadas = reflexoes.filter((r) => r.musica?.album === slugAlbum);
  if (!tem(ligadas)) return '';
  return `<section class="bloco palavra-do-album">
    <h2>Da Palavra</h2>
    <p class="texto-suave">Pregações ligadas a estas músicas.</p>
    <ul class="grid lista-limpa">${ligadas.map((r) => `
      <li class="col-md-6" data-animar><a class="cartao cartao--link nota-criacao" href="${rotaReflexao(r)}">
        <span class="album__base">${r.musica.numero ? `Faixa ${escapar(r.musica.numero)}, “${escapar(r.musica.faixa)}” · ` : ''}${escapar(r.referencia)}</span>
        <strong class="nota-criacao__titulo">${escapar(r.titulo)}</strong>
        <span class="nota-criacao__texto">${escapar(r.resumo)}</span>
        <span class="nota-criacao__mais">Ler a pregação <span aria-hidden="true">→</span></span>
      </a></li>`).join('')}</ul>
  </section>`;
}
