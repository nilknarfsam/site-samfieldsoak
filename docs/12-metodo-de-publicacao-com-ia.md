# 12 – Método de publicação com IA (qualquer IA)

Criado pelo Claude Code em 27/10/2026, a pedido do Franklin: um jeito **simples, rápido e à prova de erro** de publicar no samfieldsoak.com.br com qualquer IA (ChatGPT/Codex, Claude, Gemini, Copilot...). Vale junto com o `docs/10-sistema-de-publicacao.md` (o "console": pistas e comandos). Se este arquivo e o `CLAUDE.md` discordarem, vale o `CLAUDE.md`.

---

## 1. Pedido universal (colar em qualquer IA)

```
Você vai publicar no site samfieldsoak.com.br (repositório GitHub nilknarfsam/site-samfieldsoak).
Antes de tudo, leia no repositório: AGENTS.md, CLAUDE.md e docs/12-metodo-de-publicacao-com-ia.md.
Siga a receita do docs/12 para o tipo do pedido abaixo, sem pular nenhum passo e sem
mexer em nenhum arquivo fora dos que a receita manda.
Rode os dois comandos de conferência e só abra o PR se os dois mostrarem ✅.
Nunca faça merge. No fim, me mande: o link do PR, as rotas para eu conferir e o que ficou pendente.

Pedido: <descreva aqui: "nova novidade sobre X", "novo álbum Y", "corrigir o link Z"...>
Material: <cole o texto, os links, ou diga em que arquivo do Drive está>
```

Se a IA **não tem acesso ao GitHub** (só chat), use este no lugar:

```
Leia docs/12-metodo-de-publicacao-com-ia.md do repositório nilknarfsam/site-samfieldsoak
(ou a cópia na pasta "Claude/Site @samfieldsoak (projeto Claude Code)/docs" do meu Drive).
Prepare o pedido abaixo no molde certo da caixa de entrada (seção 4 do docs/12) e salve na
pasta caixa-de-entrada do Drive com status pendente. Não invente dado: o que faltar, pergunte.

Pedido: <...>
```

---

## 2. As 12 regras que não se quebram

1. **Publicar = mexer só em dados.** Uma publicação só pode alterar `js/dados/`, `imagens/`, `docs/registro-de-publicacoes.md` e `caixa-de-entrada/`. HTML, CSS, `js/modules/`, `js/telas/` e `js/main.js` são o molde do site: **não se mexe para publicar**. O GitHub barra um PR de conteúdo que toque no molde.
2. **Nunca criar layout.** Se o conteúdo pede um formato que não existe, pare e avise: isso é uma melhoria (pista Produto, `docs/09`), não uma publicação.
3. **Nada de HTML dentro dos dados.** Texto puro. O site formata sozinho. (`<b>`, `<br>`, `<a>` dentro de um texto = erro na conferência.)
4. **Aspas: use aspas simples por fora e aspas tipográficas por dentro.** `'Ele disse “sim”.'` está certo. Um apóstrofo reto dentro do texto (`'d'água'`) **quebra o arquivo inteiro**; use `’` (`'d’água'`) ou aspas duplas por fora (`"d'água"`).
5. **Toda entrada termina com vírgula.** `{ ... },` Falta de vírgula entre entradas é o erro mais comum.

   ⚠️ **Um erro de escrita em qualquer arquivo de `js/dados/` deixa o site INTEIRO em branco**, não só uma seção, porque todos os dados carregam juntos. Testado em 27/10/2026: um apóstrofo reto em `novidades.js` apagou até a Palavra. Por isso a regra 11 (conferir antes do PR) não tem exceção.
6. **Slug:** minúsculas, sem acento, palavras com hífen, único no arquivo (`o-trono-intocavel`). Nunca mude o slug de algo já publicado: o link compartilhado quebraria.
7. **Datas sempre `AAAA-MM-DD`** (`'2026-10-27'`).
8. **Links sempre `https://`**, oficiais, sem rastreio (`?si=`, `utm_`).
9. **Imagens em WebP**, no tamanho certo (seção 4.8), com `alt` que diz o que a imagem mostra. Capa só a versão de tela (480 e 960 px), nunca o arquivo de 3000 px.
10. **Texto do Franklin não muda** (pregação, letra, `comoFaco`, opinião). A IA só formata. Mudou uma vírgula? Diga no PR.
11. **Conferência antes do PR**: `node ferramentas/conferir-dados.mjs` e `node ferramentas/testar-rotas.mjs` com ✅. Sem ✅, sem PR. (Sem navegador no ambiente? Diga no PR: o GitHub roda os dois.)
12. **Nunca:** merge, `push --force`, `reset --hard`, apagar arquivo, apagar branch, mudar `CNAME`/DNS/GoatCounter, pôr cookie, formulário ou rastreador.

Regras de conteúdo (do `CLAUDE.md`, valem sempre): português do Brasil com acentos; nunca "músico" nem "engenheiro" para o Franklin; música sempre "criada com IA", em primeira pessoa; tecnologia com fonte e data; Palavra com referência e versão, trechos curtos da NVI; nada pessoal (telefone, e-mail, endereço, família, igreja, confeitaria); não escrever o que a tela já mostra.

---

## 3. Antes de qualquer receita

```bash
git checkout main && git pull
git checkout -b conteudo/AAAA-MM-DD-<assunto-curto>     # ex.: conteudo/2026-11-02-album-salmos-10
```

- Abra o arquivo de dados da receita e **leia o comentário do topo**: ele lista os campos.
- Copie uma entrada que já existe do mesmo tipo como base. É o jeito mais seguro de acertar a forma.

---

## 4. Receitas

### 4.1 Nova novidade

Passo a passo completo e exemplos em `docs/07-novidades.md`. Resumo:

- **Arquivo:** `js/dados/novidades.js`. **Onde:** no **fim** da lista `lista` (o site põe a mais nova em cima sozinho).
- **Obrigatórios:** `slug`, `data`, `tema` (`tecnologia` | `musica` | `palavra` | `site`), `titulo`, `resumo`, e **ou** `rota` (aponta para uma página que já existe) **ou** `paragrafos` (texto completo).
- **Tecnologia:** `fontes` e `conferidoEm` obrigatórios.
- **Não usar** `carrossel` (legado).

```js
  {
    slug: 'titulo-curto',
    data: '2026-11-02',
    tema: 'musica',
    titulo: 'Título curto e claro',
    resumo: 'Uma ou duas frases.',
    rota: '#/musica/slug-do-album',
  },
```

Conferir: `#/novidades`, `#/novidades/<slug>` (se tiver `paragrafos`) e o topo da home (as 3 mais novas).

### 4.2 Novo álbum

- **Arquivo:** `js/dados/albuns.js`, lista `albuns`.
- **Onde:** no **começo** da lista (a ordem da lista é a ordem da Discografia; o mais novo vem primeiro).
- **Destaque:** só **um** álbum tem `destaque: true` (é o "Último lançamento" da home e da Música). Coloque no novo e **tire do anterior**. A conferência acusa se houver zero ou dois.
- **Capa:** `python ferramentas/preparar-imagem.py capa <arquivo-da-capa> <slug>` → cria `imagens/albuns/<slug>-480.webp` e `-960.webp`. No dado: `capa: 'imagens/albuns/<slug>'` (sem `-480` e sem `.webp`).
- **Spotify:** o `spotifyId` são os 22 caracteres depois de `open.spotify.com/album/` (sem `?si=...`).
- **Faixas:** `faixas` (número) igual ao tamanho de `faixasLista`. Cada faixa: `{ titulo: '...', texto: 'Salmo 13' }` (`texto` = referência bíblica, opcional).
- **Série dos Salmos:** `serie: 'salmos'`, `volume: '10'`, `subtitulo: 'Série dos Salmos, Álbum 10'` e `base` **exatamente** no formato `'Salmos 109–120'` (com "Salmos", espaço, números e traço). É esse formato que alimenta a barra "A jornada pelos Salmos" e o número "de 150 salmos" da home.
  - Depois, atualize à mão o texto `planejado` da série em `series.salmos` (topo do arquivo), por exemplo: "Já lançados: álbuns 1 a 4 (Salmos 1–48) e 7 a 10 (Salmos 73–120)."
- **Outra série** (ex.: Tratado de Romanos): `serie: 'tratado-de-romanos'`, `volume: 'III'`. Série nova precisa ser cadastrada em `series` (a conferência acusa).
- **Texto:** `frase` (uma linha embaixo do título), `resumo` (uma frase para cartões), `notas` (opcional, "Por trás do álbum": `{ titulo, texto }`), sempre em primeira pessoa e deixando claro que é **criado com IA**.

```js
  {
    slug: 'nome-do-album', serie: 'salmos', volume: '10', subtitulo: 'Série dos Salmos, Álbum 10',
    titulo: 'Nome do Álbum', base: 'Salmos 109–120', estilo: 'Rock worship', faixas: 12,
    lancamento: '2026-11-02', spotifyId: 'XXXXXXXXXXXXXXXXXXXXXX', capa: 'imagens/albuns/nome-do-album',
    destaque: true,
    frase: 'Uma linha sobre o álbum.',
    resumo: 'Uma frase para os cartões.',
    faixasLista: [
      { titulo: 'Primeira Faixa', texto: 'Salmo 109' },
      // ... uma por faixa, na ordem do álbum
    ],
  },
```

Conferir: `#/inicio` (último lançamento e números), `#/musica` (destaque, jornada, discografia) e `#/musica/<slug>`.
Depois: uma novidade apontando para o álbum (receita 4.1, `rota: '#/musica/<slug>'`).

### 4.3 Novo single

- **Arquivo:** `js/dados/albuns.js`, lista `singles`, no **começo**.
- **Campos:** `slug`, `titulo`, `base` (`'Salmo 54'` se for um salmo: entra na jornada sozinho), `lancamento`, `spotifyId`, `capa`.
- **Capa:** a mesma receita da capa de álbum (`preparar-imagem.py capa`).

```js
  { slug: 'nome-do-single', capa: 'imagens/albuns/nome-do-single', titulo: 'Nome do Single', base: 'Salmo 121', lancamento: '2026-11-02', spotifyId: 'XXXXXXXXXXXXXXXXXXXXXX' },
```

### 4.4 Letras de um álbum

- **Arquivo novo:** `js/dados/letras/<nome>.js`, copiando o formato de `js/dados/letras/o-reino-inabalavel.js`: `export const letras = { 'slug-do-album': [ [linha, linha...], [linha...] ] };` (uma lista por faixa, **na ordem das faixas**; cada linha é um texto).
- **No álbum:** `letras: '<nome>'` (o nome do arquivo, sem `.js`) e, se quiser, `notaLetras: 'De onde vêm as letras.'`.
- Letra é texto do Franklin: copiar exatamente como ele mandou. A conferência acusa letra a mais e linha que não é texto.
- Conferir: `#/musica/<slug>`, abrir "Ver letra" de duas faixas (a primeira e a última).

### 4.5 Nova pregação (Palavra)

- **Arquivo:** `js/dados/reflexoes.js`, no **fim** da lista (o site ordena pela data).
- **Molde:** `caixa-de-entrada/_MODELO-pregacao.md`. Campos explicados no topo do arquivo; copie uma pregação existente como base.
- A `data` e a `ocasiao` ficam nos dados, mas **não aparecem** no site (o site mostra "Estudo bíblico · N min de leitura").
- Citação bíblica: `{ texto: '...', ref: 'Romanos 8.1' }`, trecho curto, versão em `versao: 'NVI'`.
- Ligada a uma música: `musica: { album: 'slug-do-album', numero: 5, faixa: 'Nome da Faixa', texto: 'Uma frase sobre a ligação.' }` (o álbum precisa existir).
- Conferir: `#/palavra` e `#/palavra/<slug>`.

### 4.6 Nova página da IA sem lábia

- **Arquivo:** `js/dados/ferramentas.js`. **Molde:** `caixa-de-entrada/_MODELO-ia-sem-labia.md`.
- `status`: `analisado` (padrão), `testado` ou `em-uso`: só "testado" se o Franklin testou.
- `custos` exigem `conferidoEm` e fonte oficial em `fontes` ou `links`. `relacionadas` só com slugs que existem.
- Não citar o perfil do Instagram que motivou a análise.
- Conferir: `#/ia-sem-labia` e `#/ia-sem-labia/<slug>`.

### 4.7 Correção

- Erro de texto, link, preço ou data: corrigir **só** o campo errado, no arquivo de dados. Branch `conteudo/AAAA-MM-DD-corrige-<assunto>`, commit `fix(conteudo): <o quê>`, e no PR: o que estava errado e de onde veio o certo.
- Erro de layout (algo torto ou quebrado na tela): **não é correção de conteúdo**. Avisar o Franklin e registrar como tarefa no `docs/09`.

### 4.8 Imagens: tamanhos e onde ficam

| Imagem | Comando | Fica em | No dado |
|---|---|---|---|
| Capa de álbum ou single | `python ferramentas/preparar-imagem.py capa <original> <slug>` | `imagens/albuns/<slug>-480.webp` e `-960.webp` | `capa: 'imagens/albuns/<slug>'` |
| Imagem no meio de uma novidade | `python ferramentas/preparar-imagem.py texto <original> novidades/<slug> <nome>` | `imagens/novidades/<slug>/<nome>.webp` | `{ imagem: 'imagens/novidades/<slug>/<nome>.webp', alt: '...', legenda: '...' }` em `paragrafos` |
| Arte nova pedida ao ChatGPT | pedido em `imagens-do-site/1 - Pedidos` no Drive; entrega em `2 - Entregas` | ver `docs/11` | — |

Sem Python? Converter em https://squoosh.app (WebP, qualidade 80, largura certa) e salvar com o nome exato da tabela.

---

## 5. Conferência (obrigatória)

```bash
node ferramentas/conferir-dados.mjs           # os dados: slugs, datas, campos, imagens, ícones, letras, links
node ferramentas/testar-rotas.mjs --capturas  # todas as páginas em 390 e 1280 px (precisa do Playwright)
```

- **✅ nos dois** = pode abrir o PR.
- **❌** = a mensagem diz o arquivo, a entrada e o problema. Corrija e rode de novo.
- **O script nem roda e aparece `SyntaxError`** = erro de escrita no arquivo de dados: quase sempre falta de vírgula, aspas abertas ou um apóstrofo reto dentro do texto (regras 4 e 5). A mensagem mostra a linha.
- Depois, olhar com os próprios olhos as rotas da receita em 390 px e 1280 px (`python -m http.server 8080` e o modo celular do navegador). As capturas ficam em `ferramentas/capturas/`.

---

## 6. Commit, PR e registro

1. Commit em português: `feat(conteudo): <o que entrou>` ou `fix(conteudo): <o que corrigiu>`. Codex termina com `Feito-por: Codex`.
2. PR para `main`, preenchendo o modelo (`.github/pull_request_template.md`): pista **Conteúdo**, rotas, como testou.
3. Uma linha em `docs/registro-de-publicacoes.md` (no topo da tabela).
4. Arquivo da fila no Drive: `status: em-pr` e `pr: <link>`; depois do merge, `publicado` e mover para `feitos/`.
5. **Merge só o Franklin.** O site atualiza sozinho alguns minutos depois do merge.

---

## 7. Se algo der errado

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| **O site inteiro fica em branco** (só o cabeçalho e o rodapé) | erro de escrita num arquivo de `js/dados/` (vírgula, aspas, apóstrofo) | `node ferramentas/conferir-dados.mjs` mostra o arquivo e a linha (`SyntaxError ... novidades.js:61`); corrigir e conferir de novo |
| "Conteúdo não encontrado" na página nova | slug diferente entre o dado e o link | conferir o `slug` e a `rota` |
| Capa não aparece (quadrado vazio) | falta o `-480.webp`/`-960.webp`, ou `capa` com extensão | rodar `preparar-imagem.py capa`; `capa` sem `-480` e sem `.webp` |
| Álbum novo não está em "Último lançamento" | `destaque: true` ficou no álbum antigo | passar o `destaque` para o novo |
| A barra dos Salmos não mudou | `base` fora do formato `'Salmos 109–120'` | corrigir o `base` |
| Ícone sumiu num atalho | nome que não existe em `imagens/icones/sprite.svg` | usar um nome do sprite (a conferência lista) |
| Já foi para o ar e está errado | — | no GitHub, abrir o PR que entrou e clicar **Revert** (cria um PR que desfaz); o Franklin aprova. Nunca `push --force` |

---

## 8. Onde cada coisa aparece (para conferir)

| Mudou | Aparece em |
|---|---|
| `novidades.js` | `#/novidades`, `#/novidades/<slug>`, as 3 mais novas da home, "Último" do cartão Tecnologia da home |
| `albuns.js` (álbum com destaque) | home (último lançamento, números, mosaico, cartão Música), `#/musica`, `#/musica/<slug>` |
| `albuns.js` (série dos Salmos) | jornada dos Salmos, "de 150 salmos" na home, irmãos na página de cada álbum da série |
| `reflexoes.js` | `#/palavra`, `#/palavra/<slug>`, "Último" do cartão Palavra da home, "Da Palavra" na página do álbum ligado |
| `ferramentas.js` | `#/ia-sem-labia`, `#/ia-sem-labia/<slug>`, páginas relacionadas |
| `links.js` | atalhos "Veio do Instagram?" da home (o com `destaque: true` em primeiro; os outros em múltiplo de 4) |
| `perfil.js` | topo da home (nome, frase, papéis) |
