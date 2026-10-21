# Site do @samfieldsoak – projeto para o Claude Code (v2)

Criado em 20/10/2026 (v1 às 11h17, v2 às 11h30) em conversa com o Claude no celular. Esta pasta é a **única** que o Claude Code do PC de casa precisa ler para construir e alimentar o site.

## A ideia

Um site pessoal, organizado, com tudo o que o Franklin gosta de publicar e de fazer com o Claude, ligado no link da bio do Instagram. Seções:

| Seção | O que tem |
|---|---|
| **Início** | Página estilo "link na bio": foto, frase, botões grandes para cada seção e o destaque mais recente. |
| **IA sem lábia** | Uma página por ferramenta ou tema de IA visto no Instagram: o que funciona, o que o post não conta, custo real, caminho grátis. Cada carrossel do Instagram tem a sua página. |
| **Música** | Lançamentos e álbuns, com capa e links das plataformas. |
| **Palavra** | Versículos, pensamentos sobre versículos e reflexões. |
| **Sobre** | Quem é o Franklin e o compromisso do site. |
| Depois | Projetos (apps), e outras seções que surgirem. |

## Como o celular e o PC conversam

1. **No celular (Claude):** o Franklin debate uma ideia. Quando ela serve para o site, o Claude cria um arquivo em `caixa-de-entrada/` com o texto pronto, a seção e o pedido para o Claude Code.
2. **No PC (Claude Code):** lê só a `caixa-de-entrada/`, transforma cada ideia pendente em conteúdo do site, mostra rodando e, com o ok do Franklin, publica.
3. **No Instagram:** o carrossel termina com "Saiba mais no link da bio" e "Comente e compartilhe". O link da bio leva ao site.

Detalhes do fluxo: `docs/05-fluxo-de-ideias.md`. Padrão dos posts: `docs/06-padrao-dos-posts.md`.

## O que tem nesta pasta

| Caminho | Para quê |
|---|---|
| `LEIA-ME-PRIMEIRO.md` | Este arquivo. |
| `CLAUDE.md` | Instruções que o Claude Code lê ao abrir a pasta. |
| `docs/01-visao-e-escopo.md` | Seções, telas e o que entra na versão 1. |
| `docs/02-arquitetura.md` | Pastas, rotas, modelos de dados e publicação. |
| `docs/03-design-system.md` | Cores, fontes e componentes (escuro tech, igual ao carrossel). |
| `docs/04-roteiro-de-tarefas.md` | Fases e o primeiro pedido para o Claude Code. |
| `docs/05-fluxo-de-ideias.md` | Como as ideias saem do celular e chegam ao site. |
| `docs/06-padrao-dos-posts.md` | Padrão do carrossel e da legenda. |
| `caixa-de-entrada/` | Ideias prontas para virar conteúdo (uma por arquivo). |
| `conteudo/` | Material de partida: ferramentas já analisadas e lista de álbuns. |

## Como começar em casa

1. Baixar esta pasta do Drive (botão direito → Fazer download; sai um .zip) e descompactar em `C:\Projetos\site-samfieldsoak`.
2. Abrir o terminal na pasta, rodar `claude` e colar o primeiro pedido de `docs/04-roteiro-de-tarefas.md`.
3. Para as próximas ideias, ver as duas opções em `docs/05-fluxo-de-ideias.md` (baixar só a caixa de entrada, ou ligar o Google Drive para computador).

## Decisões tomadas

- Nome do site: **Samfield** (título das abas: "Samfield | ...").
- Repositório: `nilknarfsam/site-samfieldsoak`, publicado em **https://samfieldsoak.com.br** (no ar desde 21/10/2026).

## Decisões em aberto

- Cor de destaque de cada seção (sugestão em `docs/03-design-system.md`).
