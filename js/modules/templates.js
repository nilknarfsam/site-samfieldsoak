// Funções puras que devolvem HTML. Todo texto vindo de dados passa por escapar().

export const escapar = (t) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function renderizarLista(container, itens, template) {
  container.innerHTML = itens.map(template).join('');   // uma única injeção
}

// "2026-10-20" → "20/10/2026"
export const dataBR = (iso) => (iso ? iso.split('-').reverse().join('/') : '');

const rotulosStatus = { analisado: 'Analisado', testado: 'Testado', 'em-uso': 'Em uso' };
const rotulosCategoria = { instagram: 'Instagram', video: 'Vídeo', voz: 'Voz', whatsapp: 'WhatsApp', dev: 'Dev', design: 'Design', outros: 'Outros' };
export const rotuloStatus = (s) => rotulosStatus[s] || s;
export const rotuloCategoria = (c) => rotulosCategoria[c] || c;

export const linkExterno = (url, rotulo, classe = '') =>
  `<a${classe ? ` class="${classe}"` : ''} href="${escapar(url)}" target="_blank" rel="noopener">${escapar(rotulo)}<span class="visualmente-oculto"> (abre em nova aba)</span></a>`;

// Botão das páginas de detalhe; o clique é tratado em js/modules/compartilhar.js.
export const botaoCompartilhar = () => `<p class="compartilhar"><button class="botao botao--contorno" type="button" data-acao="compartilhar">
  <span aria-hidden="true">↗</span> <span data-rotulo aria-live="polite">Compartilhar</span></button></p>`;

export function telaErro(titulo, mensagem) {
  return `<section class="container--texto">
    <h1>${escapar(titulo)}</h1>
    <p class="lead">${escapar(mensagem)}</p>
    <p><button class="botao" type="button" data-acao="recarregar-view">Tentar de novo</button>
    <a class="botao botao--contorno" href="#/inicio">Ir para o início</a></p>
  </section>`;
}

export function naoEncontrado(rotuloLista, rotaLista) {
  return `<section class="container--texto">
    <p class="sobretitulo">Erro 404</p>
    <h1>Conteúdo não encontrado</h1>
    <p class="lead">Este endereço não existe ou mudou de lugar.</p>
    <a class="botao" href="${escapar(rotaLista)}">Ver ${escapar(rotuloLista)}</a>
  </section>`;
}

export const botaoBio = (link) => {
  const externo = /^https?:/.test(link.destino);
  return `<li data-animar><a class="botao-bio${link.destaque ? ' botao-bio--destaque' : ''}" href="${escapar(link.destino)}"${externo ? ' target="_blank" rel="noopener"' : ''}>
    <span class="botao-bio__icone" aria-hidden="true">${escapar(link.icone)}</span>
    <span class="botao-bio__texto">${escapar(link.rotulo)}${link.dica ? `<small>${escapar(link.dica)}</small>` : ''}${externo ? '<span class="visualmente-oculto"> (abre em nova aba)</span>' : ''}</span>
    <span class="botao-bio__seta" aria-hidden="true">→</span>
  </a></li>`;
};

// capa: HTML pronto da miniatura (imagem ou ícone), feito por quem chama.
export const cartaoNovidade = (item, rota, rotuloSecao, capa = '') => `
  <a class="cartao cartao--novidade cartao--link" href="${escapar(rota)}">
    ${capa}
    <span class="novidade__texto">
      <strong>${escapar(item.titulo || item.nome)}</strong>
      <span>${escapar(rotuloSecao)} · ${escapar(dataBR(item.analisadoEm || item.data))}</span>
    </span>
    <span class="botao-bio__seta" aria-hidden="true">→</span>
  </a>`;

export const cartaoFerramenta = (f) => `
  <li class="col-md-6 col-lg-4" data-animar>
    <article class="cartao">
      <div class="selos mb-0">
        <span class="selo selo--${escapar(f.status)}">${escapar(rotuloStatus(f.status))}</span>
        <span class="selo selo--categoria">${escapar(rotuloCategoria(f.categoria))}</span>
      </div>
      <h2>${escapar(f.titulo || f.nome)}</h2>
      <p>${escapar(f.resumo)}</p>
      <a class="botao" href="#/ia-sem-labia/${escapar(f.slug)}">Ver a verdade completa<span class="visualmente-oculto">: ${escapar(f.titulo || f.nome)}</span></a>
    </article>
  </li>`;

// ---------- Detalhe da IA sem lábia ----------

const itens = (lista) => lista.map((t) => `<li>${escapar(t)}</li>`).join('');

function bloco(titulo, conteudo, extra = '', classe = '') {
  return `<section class="bloco${classe ? ' ' + classe : ''}"><h2>${titulo}${extra}</h2>${conteudo}</section>`;
}

const tem = (lista) => Array.isArray(lista) && lista.length > 0;

export function detalheFerramenta(f, relacionadas) {
  const partes = [];
  partes.push(`
    <a class="voltar" href="#/ia-sem-labia">← IA sem lábia</a>
    <div class="progresso" aria-hidden="true"><span>IA SEM LÁBIA</span><span class="progresso__barra"><span></span></span><span>${escapar(rotuloCategoria(f.categoria)).toUpperCase()}</span></div>
    <header class="mb-5">
      <div class="selos">
        <span class="selo selo--${escapar(f.status)}">${escapar(rotuloStatus(f.status))} em ${escapar(dataBR(f.analisadoEm))}</span>
        <span class="selo selo--categoria">${escapar(rotuloCategoria(f.categoria))}</span>
      </div>
      <h1 class="titulo-faixa">${tituloComFaixa(f)}</h1>
      <p class="lead">${escapar(f.resumo)}</p>
      ${f.status === 'analisado' ? '<p class="nota">Analisado a partir de fontes públicas. Ainda não testado por mim.</p>' : ''}
      ${botaoCompartilhar()}
    </header>`);

  if (f.aviso) partes.push(`<div class="aviso" role="note"><p><strong>${escapar(f.aviso)}</strong></p></div>`);
  if (tem(f.promete)) partes.push(bloco('O que promete', `<ul class="lista-marcada">${itens(f.promete)}</ul>`));
  if (tem(f.verdade)) partes.push(bloco('O que é verdade', `<ul class="lista-marcada">${itens(f.verdade)}</ul>`, ' <span class="selo selo--verdade">Verdade</span>', 'bloco--verdade'));
  if (tem(f.quemFaz)) partes.push(bloco('Quem faz o quê', `<div class="quem-faz">${f.quemFaz.map((q) => `
      <div class="dado"><div class="dado__texto"><strong>${escapar(q.tarefa)}</strong>${q.obs ? `<span>${escapar(q.obs)}</span>` : ''}</div><div class="dado__valor">${escapar(q.servicos)}</div></div>`).join('')}</div>`));
  if (tem(f.requisitos)) partes.push(bloco('Requisitos', `<ul class="lista-marcada">${itens(f.requisitos)}</ul>`));
  if (tem(f.naoConta)) partes.push(bloco(f.tituloNaoConta || 'O que o post não conta', `<ul class="lista-marcada">${itens(f.naoConta)}</ul>`, ' <span class="selo selo--nao-conta">O post não conta</span>', 'bloco--nao-conta'));
  if (tem(f.custos)) partes.push(bloco('Quanto custa de verdade', `<div class="dados">${f.custos.map((c) => `
      <div class="dado"><div class="dado__texto"><strong>${escapar(c.ferramenta ? c.ferramenta + ' · ' + c.plano : c.plano)}</strong>${c.obs ? `<span>${escapar(c.obs)}</span>` : ''}</div><div class="dado__valor">${escapar(c.preco)}${c.periodo ? `<br><small>${escapar(c.periodo)}</small>` : ''}</div></div>`).join('')}</div>
      <p class="nota">Preços conferidos em ${escapar(dataBR(f.conferidoEm))} nos sites oficiais. Podem mudar; confira antes de assinar.</p>`));
  if (tem(f.paraQuem) || tem(f.naoServePara)) {
    partes.push(bloco('Para quem serve', `<div class="duas-colunas">
      ${tem(f.paraQuem) ? `<div><h3>Serve para</h3><ul class="lista-marcada">${itens(f.paraQuem)}</ul></div>` : ''}
      ${tem(f.naoServePara) ? `<div><h3>Não serve para</h3><ul class="lista-marcada">${itens(f.naoServePara)}</ul></div>` : ''}
    </div>`));
  }
  if (tem(f.caminhoGratis)) partes.push(bloco('Caminho grátis', `<ul class="lista-marcada">${itens(f.caminhoGratis)}</ul>`));
  if (tem(f.comoComecar)) partes.push(bloco(f.tituloComoComecar || 'Como começar', `<ol class="lista-numerada">${f.comoComecar.map((t) => `<li>${formatarCodigo(t)}</li>`).join('')}</ol>`));
  if (tem(f.perguntas)) partes.push(bloco('Antes de assinar, pergunte', `<ol class="lista-numerada">${itens(f.perguntas)}</ol>`));
  if (tem(f.links)) partes.push(bloco('Links oficiais', `<ul class="links-oficiais">${f.links.map((l) => `<li>${linkExterno(l.url, l.rotulo, 'botao botao--contorno')}</li>`).join('')}</ul>`));
  if (tem(f.fontes)) partes.push(bloco('Fontes', `<ul class="lista-marcada">${f.fontes.map((l) => `<li>${linkExterno(l.url, l.rotulo)}</li>`).join('')}</ul>`));
  if (f.carrossel?.cards?.length) {
    const total = f.carrossel.cards.length;
    partes.push(bloco('O carrossel', `
      <ul class="galeria" tabindex="0" aria-label="Cards do carrossel (role para o lado)">
        ${f.carrossel.cards.map((c, i) => `<li><img src="${escapar(c.src)}" alt="Card ${i + 1} de ${total}: ${escapar(c.alt)}" width="1080" height="1350" loading="lazy"></li>`).join('')}
      </ul>
      ${f.carrossel.post ? `<p>${linkExterno(f.carrossel.post, 'Ver o post no Instagram')}</p>` : ''}`));
  }
  if (tem(relacionadas)) {
    partes.push(bloco('Páginas relacionadas', `<ul class="grid lista-limpa">${relacionadas.map(cartaoFerramenta).join('')}</ul>`));
  }
  partes.push('<p class="frase-ponte">Gostou? Comente e compartilhe o post com quem precisa ver isso.</p>');
  return partes.join('');
}

// Destaca a palavra-chave do título dentro da faixa laranja (campo faixa).
function tituloComFaixa(f) {
  const titulo = f.titulo || f.nome;
  if (!f.faixa || !titulo.includes(f.faixa)) return escapar(titulo);
  const [antes, depois] = titulo.split(f.faixa);
  return `${escapar(antes)}<span class="titulo-faixa__marca">${escapar(f.faixa)}</span>${escapar(depois)}`;
}

// Trechos entre crases viram <code> (comandos de instalação).
function formatarCodigo(texto) {
  return escapar(texto).replace(/`([^`]+)`/g, '<code>$1</code>');
}

export const cartaoAlbum = (a) => `
  <li class="col-md-6 col-lg-4" data-animar>
    <article class="cartao">
      <p class="album__base mb-0">${escapar(a.base || 'Álbum')}</p>
      <h2>${escapar(a.titulo)}</h2>
      <p>${escapar([a.estilo, a.faixas ? a.faixas + ' faixas' : ''].filter(Boolean).join(' · '))}</p>
      ${a.links.length ? `<ul class="links-oficiais">${a.links.map((l) => `<li>${linkExterno(l.url, l.rotulo, 'botao botao--contorno')}</li>`).join('')}</ul>` : `<p class="nota">${escapar(a.situacao || 'Links em breve.')}</p>`}
    </article>
  </li>`;
