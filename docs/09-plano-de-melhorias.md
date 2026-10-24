# 09 – Plano de melhorias (para o ChatGPT/Codex executar)

Criado pelo Claude Code em 24/10/2026, a partir da auditoria `docs/08-auditoria-2026-10-24.md`. Este arquivo é o **roteiro de trabalho**: qualquer IA (ChatGPT/Codex, Claude) pega a próxima tarefa pendente, faz, testa e abre PR. Os códigos (F-01, D-02...) são os mesmos da auditoria.

## Antes de começar (obrigatório)

1. Ler `AGENTS.md` e `CLAUDE.md` (regras do projeto), `docs/02-arquitetura.md` e `docs/03-design-system.md`.
2. Ler o item da auditoria (`docs/08`) correspondente à tarefa.
3. Ler os arquivos citados na tarefa **antes** de editar. Copiar o estilo do código que já existe: nomes em português, funções curtas, comentários curtos em português explicando o porquê.

## Como trabalhamos aqui (a lógica do projeto)

- **Sem framework, sem biblioteca nova, sem build.** HTML, CSS e JavaScript puro com ES Modules. Se a tarefa parece pedir uma biblioteca, ela está errada: pare e pergunte ao Franklin.
- **Camadas:** dados em `js/dados/` (só objetos, sem HTML) → templates em `js/modules/templates*.js` (funções puras que devolvem HTML, todo texto passa por `escapar()`) → telas em `js/telas/` (pegam os dados, chamam os templates, injetam no `app`) → rotas em `js/main.js`.
- **CSS em camadas:** `variaveis` (único lugar com valores soltos: cores, tamanhos, tempos) → `base` → `layout` → `componentes` → `utilitarios`. Nome de classe no padrão BEM em português (`bloco__parte--variante`). Mobile first: estilo do celular primeiro, `@media (min-width: ...)` depois. Breakpoints: 576, 768, 992, 1200 px.
- **Animação:** só `transform` e `opacity`, curvas e tempos dos tokens (`--duracao-*`, `--curva-saida`), sempre com a versão de `prefers-reduced-motion`.
- **Acessibilidade:** um `h1` por tela; contraste ≥ 4,5:1 (texto escuro `--cor-sobre-destaque` sobre laranja, nunca branco); foco visível; alvo de toque ≥ 44 px (`--toque-minimo`); `alt` que diz o que a imagem mostra (ou `alt=""` se for decorativa); link externo com `target="_blank" rel="noopener"` e o aviso "(abre em nova aba)" oculto (usar `linkExterno()`).
- **Privacidade:** nada que colete dado. Sem cookie, sem formulário que envia, sem rastreador novo. `localStorage` só se for preferência do visitante e só no aparelho dele.
- **Conteúdo:** nunca mudar texto do Franklin (pregações, letras, `comoFaco`) sem ele pedir. Tarefa de design ou função **não mexe em conteúdo**.
- **Uma tarefa por PR** (ou tarefas pequenas do mesmo grupo juntas, quando o plano disser). PR pequeno é aprovado rápido pelo celular.

## Passo a passo de cada tarefa

1. `git checkout main && git pull`; criar a branch `feat/<codigo>-<nome-curto>` (ex.: `feat/f01-ordem-palavra`).
2. Fazer só o que a tarefa pede. Se achar outro problema no caminho, anotar no PR, não consertar junto.
3. Testar:
   - `python -m http.server 8080` e abrir as rotas citadas em **390 px e 1280 px** (DevTools, modo celular).
   - Console sem erro; um `h1`; sem rolagem horizontal; teclado (Tab) chega em tudo e o foco aparece.
   - Quando T-12 e T-13 existirem: `node ferramentas/conferir-dados.mjs` e `node ferramentas/testar-rotas.mjs` passando.
4. Commit em português, Conventional Commits (`feat(...)`, `fix(...)`, `style(...)`, `docs(...)`), terminando com a linha `Feito-por: Codex`.
5. Abrir o PR com: o que mudou, rotas para conferir, o que foi testado, prints de 390 e 1280 px. **Nunca fazer merge sem o ok do Franklin.**
6. Marcar a tarefa como feita na tabela abaixo (no mesmo PR): `pendente` → `em PR #N`. Depois do merge, quem estiver trabalhando muda para `feito AAAA-MM-DD`.
7. Atualizar o `README.md` se a tarefa mudar algo que ele descreve.

## Ordem e situação

| Ordem | Tarefa | Código | Tamanho | Situação |
|---|---|---|---|---|
| 1 | Palavra em ordem de data | F-01 | pequeno | pendente |
| 2 | Pular para o topo sem rolagem animada | F-03 | pequeno | pendente |
| 3 | Singles acessíveis na Jornada dos Salmos | F-09 | pequeno | pendente |
| 4 | PNG pesada para WebP | D-07 | pequeno | pendente |
| 5 | Véu atrás dos números da home | D-01 | pequeno | pendente |
| 6 | Atalhos da bio em grade uniforme | D-02 | médio | pendente |
| 7 | Ícone do tema nas novidades sem capa | D-03 | pequeno | pendente |
| 8 | Cartões Tecnologia e Palavra da home | D-04 | pequeno | pendente |
| 9 | Página da novidade: voltar, tempo de leitura, anterior/próxima | D-06 | médio | pendente |
| 10 | "Outras pregações" do mesmo livro primeiro | F-02 | pequeno | pendente |
| 11 | Índice no topo da página Música | D-05 | médio | pendente |
| 12 | Script que confere os dados | F-07 | médio | pendente |
| 13 | Script que testa as rotas | F-08 | médio | pendente |
| 14 | Botão Compartilhar | F-04 | médio | pendente |
| 15 | Valores soltos viram tokens | D-09 | pequeno | pendente |
| 16 | Rodapé com Sobre e compromisso | D-10 | pequeno | pendente |
| 17 | Ícones SVG no lugar dos emojis | D-08 | médio | pendente (pedir ok do Franklin no estilo dos ícones antes) |
| 18 | Busca no site | F-05 | grande | pendente (mostrar plano ao Franklin antes) |
| 19 | Páginas de compartilhamento e sitemap gerados | F-06 | grande | pendente (mostrar plano ao Franklin antes) |

Tarefas 1 a 4 podem ir num PR só ("correções pequenas da auditoria"). As outras, uma por PR.

---

## Tarefas

### T-01 · Palavra em ordem de data (F-01)

- **Arquivos:** `js/dados/reflexoes.js`, `js/telas/palavra-lista.js`, `js/modules/templates-palavra.js`.
- **Lógica:** copiar a ideia de `js/dados/novidades.js`. Renomear o array atual para uma constante interna (`const lista = [...]`) e exportar `reflexoes` já ordenado: data mais nova primeiro; no mesmo dia, a que está mais abaixo no arquivo vem antes. `buscarReflexao` continua igual. **Não mexer no conteúdo das pregações.**
- **Pronto quando:** `#/palavra` mostra 15/10/2026 antes de 14/10/2026, e 17/12/2025 antes de 10/12/2025. Páginas de detalhe continuam abrindo.

### T-02 · Pular para o topo sem rolagem animada (F-03)

- **Arquivo:** `js/modules/roteador.js`.
- **Lógica:** trocar `window.scrollTo(0, 0)` por `window.scrollTo({ top: 0, behavior: 'instant' })`. Manter o `scroll-behavior: smooth` do `css/base.css` (ele serve para as âncoras). As âncoras (`#/musica/como-eu-faco`) continuam rolando até a seção.
- **Pronto quando:** de `#/musica` rolada até o fim, clicar em "Palavra" no menu abre a Palavra já no topo, sem animação de rolagem.

### T-03 · Singles acessíveis na Jornada dos Salmos (F-09)

- **Arquivo:** `js/modules/templates-musica.js` (`jornadaSalmos`).
- **Lógica:** no `<span class="jornada__trecho jornada__trecho--single">`, acrescentar `role="img"` e `aria-label="${rotulo}"` (o rótulo já está escapado na variável). Manter o `title`.
- **Pronto quando:** no leitor de tela (ou no painel de acessibilidade do DevTools), cada trecho de single é anunciado com nome e salmo.

### T-04 · PNG pesada para WebP (D-07)

- **Arquivos:** `imagens/ia/instagram-claude-parceria/card-08.png`, `js/dados/ferramentas.js`.
- **Lógica:** gerar `card-08.webp` (qualidade ~82, mesmo tamanho 1080×1350), trocar o caminho no dado. **Não apagar a PNG** (regra do projeto: nunca apagar arquivo); avisar no PR que ela pode ser apagada se o Franklin quiser.
- **Pronto quando:** `#/ia-sem-labia/instagram-claude-parceria` mostra o card 8 normalmente, carregando o `.webp`.

### T-05 · Véu atrás dos números da home (D-01)

- **Arquivos:** `css/componentes.css` (bloco `.home-topo`), `css/variaveis.css`.
- **Lógica:** em `.home-topo__conteudo` (ou num `::before` do `.home-topo`), aplicar um degradê radial escuro centralizado atrás do texto, usando `--cor-veu` (criar um token novo, ex.: `--cor-veu-forte: rgba(18, 18, 18, 0.8)`, se precisar). O mosaico continua visível nas bordas. Sem mexer no HTML.
- **Pronto quando:** em 1280 px e 390 px, nome, frase, papéis e números se leem sem nenhum título de capa aparecendo por trás das letras. Medir o contraste do texto suave (`#B3B3B3`) sobre a parte mais clara do fundo: ≥ 4,5:1.

### T-06 · Atalhos da bio em grade uniforme (D-02)

- **Arquivos:** `css/componentes.css` (`.bio-lista`, `.bio-lista--compacta`, `.botao-bio`), `js/dados/links.js`.
- **Lógica:**
  - Grade: 1 coluna no celular, 2 colunas a partir de 576 px, 4 a partir de 992 px; todos os botões com a mesma altura mínima (`align-items: stretch`).
  - O botão com `destaque: true` vai para o começo (ordem do array em `links.js`) e ocupa a linha inteira (`grid-column: 1 / -1`).
  - Rótulo do guia mais curto: `rotulo: 'Guia: IA no Instagram'`, `dica: 'As verdades que ninguém conta'`. (É texto de botão, não conteúdo do Franklin; está liberado.)
- **Pronto quando:** em 390, 768 e 1280 px não sobra buraco no fim da grade e nenhum botão quebra em mais de 2 linhas.

### T-07 · Ícone do tema nas novidades sem capa (D-03)

- **Arquivos:** `js/modules/templates.js` (`cartaoNovidade`), `js/modules/templates-novidades.js` (`cartaoNovidadeLista`), `js/dados/novidades.js` (mapa de ícones), `css/componentes.css`.
- **Lógica:** criar em `novidades.js` um `iconesTema = { tecnologia: '⚡', musica: '♪', palavra: '✝', site: '★' }` (ou SVG, se T-17 já tiver sido feita). Quando não houver `carrossel.capa`, renderizar `<span class="novidade-item__capa novidade-item__capa--icone" aria-hidden="true">ícone</span>` no mesmo tamanho da imagem, fundo `--cor-superficie-alta`, ícone centralizado.
- **Pronto quando:** na home e em `#/novidades`, todos os cartões têm o quadrinho à esquerda alinhado.

### T-08 · Cartões Tecnologia e Palavra da home (D-04)

- **Arquivos:** `js/telas/inicio.js` (`frentes`), `css/componentes.css` (`.frente__simbolo`).
- **Lógica (escolher a opção A; a B só com ok do Franklin):**
  - A) Reduzir `.frente__simbolo` para a altura das capas do cartão Música e mostrar embaixo do título uma linha "Último: <título>" (Tecnologia: novidade mais nova com tema `tecnologia`; Palavra: primeira de `reflexoes`, já ordenada pela T-01), escapada.
  - B) Trocar o quadro por miniaturas reais.
- **Pronto quando:** os três cartões têm a mesma altura em 1280 px e nenhum tem um quadro vazio.

### T-09 · Página da novidade: voltar, tempo de leitura, anterior/próxima (D-06)

- **Arquivos:** `js/modules/templates-novidades.js` (`detalheNovidade`), `js/telas/novidades-detalhe.js`, `js/dados/novidades.js`.
- **Lógica:**
  - Começar com `<a class="voltar" href="#/novidades">← Novidades</a>`, igual a `detalheFerramenta`.
  - Tempo de leitura: somar as palavras dos itens de texto de `paragrafos` (ignorar objetos de imagem), dividir por 200, arredondar para cima, mínimo 1. Mostrar no sobretítulo: "· 6 min de leitura". Só para novidade com `paragrafos`.
  - No fim, antes de "Ver todas": links "← Anterior" e "Próxima →" usando a ordem de `novidades` (já ordenada). A "anterior" é a mais antiga. Usar `rotaNovidade()` (algumas novidades apontam para outra página com `rota`).
- **Pronto quando:** `#/novidades/prompt-motion` mostra o voltar, o tempo de leitura e o link para a novidade mais antiga; a mais nova não mostra "Próxima".

### T-10 · "Outras pregações" do mesmo livro primeiro (F-02)

- **Arquivo:** `js/modules/templates-palavra.js` (`detalheReflexao`).
- **Lógica:** `outras` = primeiro as do mesmo `livro` (sem a atual), depois as demais, ainda na ordem de data; cortar em 3.
- **Pronto quando:** em `#/palavra/quem-me-livrara` (Romanos) as outras de Romanos aparecem primeiro.

### T-11 · Índice no topo da página Música (D-05)

- **Arquivos:** `html/musica.html`, `js/main.js` (`ancoras` da rota `musica`), `css/componentes.css`.
- **Lógica:**
  - Dar `id` às seções que ainda não têm (`jornada`, `discografia`, `singles`; `como-eu-faco` e `primeiras-versoes` já existem). Ids em português, sem acento.
  - Logo depois do `header`, um `<nav class="indice" aria-label="Nesta página">` com links `#/musica/<id>` em formato de chip (reaproveitar o visual de `.chip span`), rolando na horizontal no celular.
  - Acrescentar os novos ids em `ancoras: [...]` da rota `musica` em `js/main.js` (sem isso o roteador acha que é um slug de álbum e mostra "não encontrado").
  - Cuidado: nenhum id pode ser igual a um slug de álbum.
- **Pronto quando:** cada chip leva à seção certa, o foco vai para a seção, e F5 em `#/musica/discografia` abre já na discografia.

### T-12 · Script que confere os dados (F-07)

- **Arquivo novo:** `ferramentas/conferir-dados.mjs` (Node 18+, sem dependência, roda da raiz: `node ferramentas/conferir-dados.mjs`).
- **Lógica:** importar os módulos de `js/dados/` (eles são ES Modules puros, funcionam no Node) e conferir, imprimindo uma linha por erro e saindo com código 1 se houver erro:
  - slugs únicos e no formato `^[a-z0-9-]+$` em `novidades`, `ferramentas`, `reflexoes`, `albuns`;
  - datas no formato `AAAA-MM-DD` e válidas;
  - novidade: `tema` existe em `temasNovidade`; `titulo` e `resumo` preenchidos; tem `rota` ou `paragrafos`; tema `tecnologia` tem `fontes` e `conferidoEm`; nenhuma nova com `carrossel` (só a `claude-code-outubro-2026` pode);
  - todo caminho de imagem citado nos dados existe no disco (capas de álbum: conferir `-480.webp` e `-960.webp`);
  - toda URL externa começa com `https://`;
  - nenhum texto de dado contém `<` seguido de letra (HTML dentro de dado é proibido).
- Documentar o comando no `README.md` e no `docs/07-novidades.md` (passo 5).
- **Pronto quando:** roda sem erro no `main` de hoje, e acusa erro se você duplicar um slug de teste (desfazer depois).

### T-13 · Script que testa as rotas (F-08)

- **Arquivo novo:** `ferramentas/testar-rotas.mjs`. Usa Playwright (`npx playwright` ou instalado globalmente; **não** acrescentar `package.json` só para isso sem ok do Franklin — se precisar, perguntar).
- **Lógica:** com o servidor rodando em `http://127.0.0.1:8080`, para cada largura (390 e 1280) e para cada rota (as fixas + todos os slugs lidos de `js/dados/`): abrir, esperar ~800 ms e conferir: exatamente um `h1`; `scrollWidth <= innerWidth`; nenhuma `img` sem `alt`; nenhum `pageerror`; nenhuma requisição local que falhou (ignorar `gc.zgo.at` e `open.spotify.com`). Salvar capturas em `ferramentas/capturas/` (pôr essa pasta no `.gitignore`).
- Modelo de partida (o mesmo usado na auditoria):

```js
import { chromium } from 'playwright';
const rotas = ['inicio', 'novidades', 'ia-sem-labia', 'musica', 'palavra', 'sobre', 'novidades/nao-existe'];
const navegador = await chromium.launch();
let falhas = 0;
for (const largura of [390, 1280]) {
  const pagina = await navegador.newPage({ viewport: { width: largura, height: 900 } });
  const erros = [];
  pagina.on('pageerror', (e) => erros.push(e.message));
  for (const rota of rotas) {
    await pagina.goto(`http://127.0.0.1:8080/#/${rota}`);
    await pagina.waitForTimeout(800);
    const r = await pagina.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      rolagemLateral: document.documentElement.scrollWidth > innerWidth,
      semAlt: document.querySelectorAll('img:not([alt])').length,
    }));
    if (r.h1 !== 1 || r.rolagemLateral || r.semAlt) { falhas++; console.log('FALHA', largura, rota, r); }
  }
  if (erros.length) { falhas++; console.log('ERROS', largura, erros); }
}
await navegador.close();
process.exit(falhas ? 1 : 0);
```

- **Pronto quando:** passa no `main` de hoje e falha se você colocar um segundo `h1` de teste.

### T-14 · Botão Compartilhar (F-04)

- **Arquivos novos/alterados:** `js/modules/compartilhar.js` (novo), templates de detalhe (`detalheNovidade`, `detalheReflexao`, `detalheFerramenta`, `detalheAlbum`), `js/telas/*-detalhe.js`, `css/componentes.css`.
- **Lógica:**
  - Template devolve `<button class="botao botao--contorno" type="button" data-acao="compartilhar">Compartilhar</button>` perto do título.
  - Em `compartilhar.js`, uma função `registrarCompartilhar(app)` chamada **uma vez** no `js/main.js` (delegação de evento, igual a `registrarEventosIaLista`): no clique, se existir `navigator.share`, chamar com `{ title: document.title, url: location.href }`; se não, `navigator.clipboard.writeText(location.href)` e trocar o texto do botão para "Link copiado" por 2 s (com `aria-live="polite"` num `span`).
  - Ignorar o erro `AbortError` (pessoa cancelou).
  - Não usar SDK de rede social nenhuma (regra de privacidade).
- **Pronto quando:** no celular abre a folha de compartilhar do sistema; no computador copia o link e avisa.

### T-15 · Valores soltos viram tokens (D-09)

- **Arquivos:** `css/variaveis.css`, `css/componentes.css`, `css/layout.css`.
- **Lógica:** criar tokens (ex.: `--altura-botao-bio: 64px`, `--retrato: 96px`, `--miniatura-novidade: 56px`, `--miniatura-novidade-md: 108px`, `--borda-destaque: 3px`, `--borda-destaque-forte: 4px`, `--cor-topo: rgba(18, 18, 18, 0.92)`, `--altura-topo: 64px`) e trocar os valores pelos tokens. Usar `--altura-topo` também no `inset` do `.menu__lista`. **Nada pode mudar visualmente**: comparar prints antes/depois.
- **Pronto quando:** `grep -nE '[0-9]+px|#[0-9a-fA-F]{3,6}|rgba\(' css/componentes.css css/layout.css` só mostra o que for 1px/2px de borda ou `@media`.

### T-16 · Rodapé com Sobre e compromisso (D-10)

- **Arquivos:** `index.html` (rodapé), `css/layout.css`.
- **Lógica:** acrescentar um link interno `<a href="#/sobre">Sobre e compromisso</a>` antes das redes e trocar o texto para "Franklin Carvalho · @samfieldsoak · Manaus/AM. Sem patrocínio, sem coleta de dados." Não acrescentar e-mail, telefone ou endereço.
- **Pronto quando:** o rodapé leva à página Sobre em todas as rotas.

### T-17 · Ícones SVG no lugar dos emojis (D-08)

- **Antes de fazer:** mostrar ao Franklin 2 opções de estilo (traço fino / preenchido) com uma captura. Só seguir com o ok.
- **Lógica:** ícones SVG próprios ou de um conjunto com licença livre (ex.: Lucide, ISC; **baixar** os SVG para `imagens/icones/`, não usar CDN). Usar `currentColor` para herdar a cor. Em `links.js`, trocar `icone: '⚡'` por `icone: 'raio'`, e o template `botaoBio` monta `<svg ...><use href="imagens/icones/sprite.svg#raio"/></svg>` com `aria-hidden="true"`.
- **Pronto quando:** os ícones são iguais em Android, iPhone e Windows, e na mesma cor.

### T-18 · Busca no site (F-05)

- **Antes de fazer:** mostrar o plano ao Franklin (onde fica o campo, o que entra na busca).
- **Lógica sugerida:** rota nova `#/busca` (view `html/busca.html`, tela `js/telas/busca.js`), um `<input type="search">` com `<label>`, filtrando em memória (sem servidor) títulos, resumos, referências e temas de `novidades`, `ferramentas`, `reflexoes` e `albuns`. Comparar sem acento e sem maiúscula (`normalize('NFD').replace(/\p{Diacritic}/gu, '')`). Resultado em lista com o rótulo da seção. Contagem em `role="status"`. Link "Buscar" no menu. Não guardar o que a pessoa digitou (nem em `localStorage`), e não enviar para o contador.
- **Pronto quando:** buscar "salmo 73", "claude" e "graça" traz os resultados certos.

### T-19 · Páginas de compartilhamento e sitemap gerados (F-06)

- **Antes de fazer:** mostrar o plano ao Franklin. É a maior mudança da lista.
- **Lógica sugerida:** `ferramentas/gerar-paginas.mjs` (Node, sem dependência) lê `js/dados/` e escreve `p/<secao>/<slug>/index.html` para cada item, cada uma com `<title>`, `meta description`, `og:title`, `og:description`, `og:image` (capa do item ou a imagem padrão de `imagens/compartilhar/`), `link rel="canonical"` e um redirecionamento para `/#/<secao>/<slug>` (meta refresh + link visível, como no `404.html`). O mesmo script reescreve o `sitemap.xml` com essas URLs. Rodar o script vira um passo do `docs/07-novidades.md`. Links do botão Compartilhar (T-14) passam a usar a URL `p/...`.
- **Pronto quando:** colar `https://samfieldsoak.com.br/p/novidades/prompt-motion/` no WhatsApp mostra o título e a imagem daquela novidade, e abrir o link cai na página certa do site.

---

## Quando acabar uma rodada

- Conferir a tabela "Ordem e situação" atualizada.
- Acrescentar uma linha em `docs/registro-de-publicacoes.md` por PR aprovado (seção "Site").
- Se surgir melhoria nova, acrescentar como T-20, T-21... com o mesmo formato (arquivos, lógica, pronto quando), e o código correspondente em `docs/08` (ou numa auditoria nova `docs/08-auditoria-AAAA-MM-DD.md`).
