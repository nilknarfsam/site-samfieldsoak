# 10 – Sistema de publicação e evolução contínua

Criado pelo Claude Code em 24/10/2026, a pedido do Franklin: "um console onde eu consiga publicar ou corrigir algo no site mantendo um padrão único", pensando em como o Facebook funciona. Vale para todas as IAs (Claude e ChatGPT/Codex). Se este arquivo e o `CLAUDE.md` discordarem, vale o `CLAUDE.md` e quem notar avisa o Franklin.

## A resposta curta

**Não vamos construir um painel (página de admin).** O "console" do site é um **contrato**: moldes fixos, tipos de conteúdo fixos, frases de comando fixas e conferência automática. A interface é o chat com a IA (que você já usa); a aprovação é o PR no celular; a memória é o repositório.

Por que não um painel:

- O site é estático (GitHub Pages). Um painel precisaria de login e servidor: custo, senha para proteger, manutenção e risco de segurança.
- Quebraria a regra "sem formulário e sem coleta de dados".
- Envelhece rápido. Toda mudança no site exigiria mudar o painel também.
- O que você já tem é melhor: você fala com a IA, a IA escreve no padrão, a máquina confere e você aprova com um toque.

## A lógica do Facebook, aplicada aqui

No Facebook ninguém desenha uma página para cada post. Existe **um molde** (o layout do post) e **milhões de publicações** que só preenchem o molde. Quando o Facebook muda o design, muda o molde, e todos os posts mudam juntos.

Aqui é igual:

| Camada | O que é | Onde fica | Muda quando |
|---|---|---|---|
| **Moldes** | Como cada tipo de página aparece | `html/`, `css/`, `js/modules/templates*.js`, `js/telas/` | raramente, numa melhoria planejada (docs/09) |
| **Publicações** | O conteúdo que preenche o molde | `js/dados/*.js` e `imagens/` | todo dia |

**Regra de ouro:** uma publicação nunca cria layout. Se um conteúdo precisa de um formato que não existe (ex.: uma tabela dentro da novidade), isso não se resolve na publicação: vira uma melhoria do molde, que passa a servir para todas.

## As duas pistas

Todo pedido cai numa de duas pistas. A IA diz em qual pista está antes de começar.

| | Pista de **Conteúdo** | Pista de **Produto** |
|---|---|---|
| O que é | publicar, corrigir texto, link, preço, data, imagem | mudar design, criar função, criar um tipo novo de bloco ou de página |
| Arquivos que pode mexer | `js/dados/`, `imagens/`, `docs/registro-de-publicacoes.md`, `caixa-de-entrada/feitos/` | todo o resto (`html/`, `css/`, `js/modules/`, `js/telas/`, `js/main.js`, `index.html`, `ferramentas/`) |
| Quem pode fazer | qualquer IA, direto | qualquer IA, mas só tarefa que está no `docs/09` (ou que o Franklin pediu com plano aprovado) |
| Precisa de plano antes? | não | sim: a tarefa no `docs/09` é o plano |
| Branch | `conteudo/AAAA-MM-DD-<assunto>` (ou `feat/novidades-AAAA-MM-DD`, que já é usada) | `feat/<codigo>-<assunto>` ou `fix/<assunto>` |
| Revisão | conferência automática + ok do Franklin | conferência automática + revisão do Claude + ok do Franklin |

A conferência automática (GitHub Actions) mostra no PR qual pista ele é, olhando os arquivos alterados. PR de conteúdo que mexe em arquivo de produto aparece marcado, para ninguém "consertar o layout" escondido numa publicação.

## Os tipos de conteúdo (o catálogo)

Cada tipo tem um molde na fila (o que a IA preenche no chat), um lugar nos dados e uma página. Tipo novo só entra pela pista de Produto.

| Tipo | Molde na fila | Entra em | Página | Como publicar |
|---|---|---|---|---|
| Novidade | `_MODELO-novidade.md` | `js/dados/novidades.js` (fim da lista) | `#/novidades/<slug>` | `docs/07-novidades.md` |
| Pregação (Palavra) | `_MODELO-pregacao.md` | `js/dados/reflexoes.js` | `#/palavra/<slug>` | seção "Outros tipos" abaixo |
| Lançamento (álbum ou single) | `_MODELO-lancamento.md` | `js/dados/albuns.js` | `#/musica/<slug>` | seção "Outros tipos" abaixo |
| IA sem lábia | `_MODELO-ia-sem-labia.md` | `js/dados/ferramentas.js` | `#/ia-sem-labia/<slug>` | seção "Outros tipos" abaixo |
| Correção | `_MODELO-correcao.md` | o arquivo de dados certo | a página corrigida | seção "Correções" abaixo |

Os moldes ficam em `caixa-de-entrada/` no repositório e na mesma pasta do Drive.

## O "console": frases de comando

Funcionam em qualquer chat (Claude ou ChatGPT), dentro do projeto do site. A IA reconhece a frase e segue o roteiro, sem precisar de explicação.

| Você diz | A IA faz | Resultado |
|---|---|---|
| **"Manda pro site: <assunto>"** | Escolhe o tipo, preenche o molde, salva na fila do Drive com `status: pendente` (ou `aguardando-ok` se precisar da sua decisão) | um arquivo na fila |
| **"Verifica a fila e publica"** | Lista os pendentes (uma linha cada) e publica todos num PR | um PR de conteúdo |
| **"Corrige no site: <página> – <o quê>"** | Preenche `_MODELO-correcao.md`; quem tem GitHub já abre o PR | um PR de conteúdo pequeno |
| **"Melhoria no site: <ideia>"** | **Não programa na hora.** Escreve a ideia como tarefa T-xx no `docs/09` (arquivos, lógica, pronto quando) e pergunta se pode | uma linha no plano |
| **"Faz a próxima melhoria"** | Pega a próxima tarefa `pendente` do `docs/09` e faz | um PR de produto |
| **"Faz a arte de <x>"** | Arte do Instagram: segue `docs/06-padrao-dos-posts.md`. Arte do site: o pedido fica em `imagens-do-site/1 - Pedidos` no Drive, o ChatGPT entrega em `imagens-do-site/2 - Entregas` e o Claude aplica (fluxo no `docs/11`) | imagem no Drive |
| **"Como está o site?"** | Resumo: fila (pendentes, aguardando ok), PRs abertos, próximas tarefas do `docs/09`, última auditoria | relatório curto |
| **"Auditoria do mês"** | Claude Code repete a auditoria (docs/08), cria `docs/08-auditoria-AAAA-MM.md` e acrescenta tarefas novas no `docs/09` | auditoria + tarefas |

## Status de um arquivo da fila (um só para todos)

| Status | Quem põe | Significa |
|---|---|---|
| `rascunho` | quem escreve | ainda em conversa; não publicar |
| `aguardando-ok` | quem escreve | pronto, mas depende de decisão do Franklin; não publicar |
| `pendente` | quem escreve ou o Franklin | pode publicar |
| `em-pr` | quem publica | PR aberto; acrescentar `pr: <link>` no cabeçalho |
| `publicado` | quem publica, **só depois do merge** | preencher `publicado: AAAA-MM-DD` e mover para `feitos/` |
| `descartado` | o Franklin | não fazer; mover para `feitos/` com o motivo |

(Substitui o `em-producao` do `docs/05`.)

## As garantias automáticas (o que impede sair errado)

1. **`node ferramentas/conferir-dados.mjs`**: confere os dados (slug repetido, data errada, imagem que não existe, tecnologia sem fonte, HTML dentro do texto, link sem https).
2. **`node ferramentas/testar-rotas.mjs`**: abre todas as páginas em 390 px e 1280 px e confere um `h1`, sem rolagem lateral, imagens com `alt` e sem erro de JavaScript. Tira as capturas.
3. **GitHub Actions** (`.github/workflows/conferir.yml`): roda os dois em todo PR. No app do GitHub aparece ✅ ou ❌; com ❌, ninguém aprova.
4. **Modelo de PR** (`.github/pull_request_template.md`): pista, rotas para conferir, o que foi testado.
5. **Merge só pelo Franklin.** Recomendado: proteger a `main` no GitHub (Settings → Branches → Add rule → `main` → "Require a pull request before merging" e "Require status checks to pass" → marcar `conferir`). Assim nem por engano alguém publica sem PR e sem a conferência.

## Quem faz o quê

| Quem | Melhor para | Não deve |
|---|---|---|
| **Franklin** | decidir, escrever o que é dele (pregação, letra, opinião), aprovar o PR | precisar abrir código |
| **Claude (chat/celular)** | debater, pesquisar, escrever o texto no molde, salvar na fila | publicar sem GitHub |
| **ChatGPT (chat)** | artes (imagem), legenda, carrossel, texto no molde | inventar formato de página |
| **ChatGPT (Codex)** | publicar a fila (pista Conteúdo), executar tarefas do `docs/09` já detalhadas | mudar design ou arquitetura fora de uma tarefa; fazer merge |
| **Claude Code** | pista Produto (código novo), revisar PRs do Codex, auditoria do mês, testes no navegador | fazer merge sem o ok |

## Projetos e chats: o jeito profissional

O que você já faz (um projeto com o nome do site e um chat novo para cada publicação) **é o jeito certo**. Chat novo = contexto limpo = menos erro. Para ficar profissional, falta só isto:

1. **A memória é o repositório, não o chat.** Tudo o que for regra vai para um arquivo (`CLAUDE.md`, `AGENTS.md`, `docs/`). Se você combinou algo num chat e não virou arquivo, a próxima IA não sabe.
2. **Instruções fixas no projeto** (ChatGPT: Projeto → Instruções; Claude: Projeto → Instruções do projeto). Colar o texto do bloco abaixo.
3. **Arquivos do projeto**: anexar `AGENTS.md`, `docs/07-novidades.md`, este `docs/10` e os moldes da caixa de entrada. Atualizar quando eles mudarem (ou deixar só o texto abaixo, que manda ler do repositório/Drive).
4. **Um chat = um trabalho.** Abriu para publicar a novidade X? Termina com o arquivo na fila ou o PR aberto. Assunto novo, chat novo.

### Texto para colar nas instruções do projeto (ChatGPT e Claude)

```
Este projeto é o site samfieldsoak.com.br (repositório nilknarfsam/site-samfieldsoak).
Antes de qualquer trabalho, leia no repositório (ou na pasta do Drive
"Claude/Site @samfieldsoak (projeto Claude Code)"): AGENTS.md e docs/10-sistema-de-publicacao.md.
Reconheça as frases de comando do docs/10 ("Manda pro site", "Verifica a fila e publica",
"Corrige no site", "Melhoria no site", "Faz a próxima melhoria", "Faz a arte de",
"Como está o site?") e siga o roteiro de cada uma.
Diga sempre em qual pista o pedido está (Conteúdo ou Produto).
Conteúdo: só js/dados/, imagens/ e o registro. Produto: só tarefas do docs/09.
Nunca crie layout numa publicação. Nunca faça merge. Português do Brasil, direto e simples.
```

## Evolução contínua (o ciclo)

| Quando | O quê | Quem |
|---|---|---|
| Sempre que tiver assunto | "Manda pro site" → fila | qualquer chat |
| 1 ou 2 vezes por semana | "Verifica a fila e publica" | Codex ou Claude Code |
| Sempre que sobrar tempo | "Faz a próxima melhoria" (uma tarefa do `docs/09` por vez) | Codex ou Claude Code |
| Todo mês (primeira semana) | "Auditoria do mês": nova auditoria, tarefas novas no `docs/09`, olhar o GoatCounter (quais páginas mais visitadas, quantas vêm do Instagram) para decidir o que melhorar | Claude Code |
| A cada 3 meses | Revisar este documento: o que travou, que tipo de conteúdo novo apareceu, que regra virou costume | Franklin + Claude |

Decidir com número, não com achismo: se a Palavra é a mais visitada, a próxima melhoria é na Palavra.

## Níveis de maturidade

| Nível | Como é | Situação |
|---|---|---|
| 1 | Chat → fila no Drive → PR manual, teste no olho | era assim até 24/10/2026 |
| 2 | Comandos fixos, pistas, moldes para todos os tipos, conferência automática no PR | **implantado em 24/10/2026** |
| 3 | Página de compartilhamento por conteúdo (prévia certa no WhatsApp) e `sitemap.xml` gerados por script (T-20), busca (T-19) | próximo passo |
| 4 | Opcional: fila também pelo GitHub Issues (formulários "Publicar" e "Corrigir" no app do GitHub), para quem não está no chat | só se a fila do Drive começar a apertar |

## Outros tipos: como publicar

> A versão completa, com receita passo a passo e modelo pronto para cada tipo, está em **`docs/12-metodo-de-publicacao-com-ia.md`**. O resumo abaixo continua valendo.

Mesmo esqueleto do `docs/07` (fila → branch → entrada nos dados → conferir → PR → registro). O que muda:

- **Pregação:** entrada nova no **fim** de `js/dados/reflexoes.js` (o site ordena pela data). A data e a ocasião ficam nos dados, mas **não aparecem no site** (decisão do Franklin, 27/10/2026): o site mostra "Estudo bíblico · N min de leitura". Texto do Franklin sem mudar o sentido; só formatar. Citação bíblica sempre com referência e versão; trechos curtos da NVI. Campos explicados no topo do arquivo. Se ligar a uma música, preencher `musica: { album, numero, faixa, texto }`.
- **Lançamento:** entrada em `js/dados/albuns.js` (álbum em `albuns`, single em `singles`). Só link oficial; `spotifyId` com 22 caracteres; capa em `imagens/albuns/<slug>-480.webp` e `-960.webp` (só a versão de tela). Se for o mais novo, passar `destaque: true` para ele e tirar do anterior. Texto de como foi feito em primeira pessoa e "criada com IA".
- **IA sem lábia:** entrada em `js/dados/ferramentas.js`. Status `analisado` se não foi testado. Preços com `conferidoEm` e fonte oficial. Não citar o perfil que motivou a análise.

## Correções

- Correção é pista de Conteúdo quando muda só dado (texto, link, preço, data, imagem). Um PR pequeno, `fix(conteudo): <o quê>`, dizendo o que estava errado e de onde veio o certo.
- Se o erro é de layout ou de comportamento (algo quebrado na tela), é pista de Produto: vira tarefa no `docs/09` (ou um `fix/` direto, se for pequeno e o Franklin pedir).
- Texto do Franklin (pregação, letra, `comoFaco`): corrigir só digitação, e dizer no PR exatamente o que mudou.
