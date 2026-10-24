# CLAUDE.md – site do @samfieldsoak (v2)

## Quem é o dono e como falar com ele

- Franklin, de Manaus/AM. Técnico em engenharia de testes de hardware (não escrever "engenheiro"), desenvolvedor (Python, Flutter, C#, web), designer, estudante de ADS, cria música com IA (não escrever "músico": ele não toca instrumento) e criador de conteúdo. Líder na Igreja Batista da Paz. Instagram @samfieldsoak, GitHub nilknarfsam.
- Falar em português do Brasil, direto e simples. Explicar o que vai fazer antes de fazer.
- Nunca apagar arquivos, nunca `git push --force`, `reset --hard` ou apagar branch/tag sem ele pedir.

## Escopo de leitura (importante)

- Leia **apenas** esta pasta do projeto. Não procure outras pastas do Drive nem do computador.
- As ideias novas chegam em `caixa-de-entrada/` (ou no caminho definido em `docs/05-fluxo-de-ideias.md`, se o Franklin ligar o Google Drive para computador).

## O que estamos construindo

Um site pessoal estático no GitHub Pages, usado como link da bio. Seções: Início, **Novidades** (pilha, a mais nova em cima), **IA sem lábia**, **Música**, **Palavra** (versículos e reflexões), **Sobre**. Leia, nesta ordem: `LEIA-ME-PRIMEIRO.md`, `docs/01` a `docs/10`, depois `caixa-de-entrada/` e `conteudo/`. O `docs/10-sistema-de-publicacao.md` é o jeito de trabalhar: frases de comando, pistas Conteúdo/Produto e as conferências automáticas (`ferramentas/`).

## Arquitetura obrigatória (padrão do Franklin)

Seguir a skill **base-site-spa-franklin** se estiver instalada. Resumo:

- HTML, CSS e JavaScript puro, sem framework. ES Modules.
- SPA com roteador por **hash** (`#/secao/slug`), porque o GitHub Pages dá 404 no F5 com History API.
- Pastas: `index.html` (casca), `html/` (views), `css/` (variaveis → base → layout → componentes → utilitarios), `js/main.js`, `js/dados/`, `js/modules/`, `js/telas/`, `imagens/`.
- Tokens só em `css/variaveis.css`. Mobile first. Grid de 12 colunas no macro, Flexbox nos componentes.
- Todo texto vindo de dados passa por `escapar()`.
- Acessibilidade: um `h1` por tela, contraste medido (≥ 4,5:1), foco visível, "Pular para o conteúdo", `alt` correto.
- Testar com `python -m http.server 8080`.

## Rotina principal: processar a caixa de entrada

Quando o Franklin pedir "processe a caixa de entrada":

1. Listar os arquivos de `caixa-de-entrada/` com `status: pendente` no cabeçalho (ignorar `_MODELO-de-ideia.md` e a subpasta `processadas/`).
2. Para cada um, mostrar um resumo de uma linha e perguntar se pode fazer todos ou só alguns.
3. Seguir o "Pedido para o Claude Code" escrito no próprio arquivo: criar a entrada em `js/dados/<secao>.js`, imagens em `imagens/`, conferir links e preços no dia quando o arquivo pedir.
4. Rodar o site local e mostrar a página nova (rota exata).
5. Com o ok do Franklin: commit (`feat(conteudo): ...`), mudar o cabeçalho para `status: publicado` com a data, mover o arquivo para `caixa-de-entrada/processadas/` e registrar uma linha em `docs/registro-de-publicacoes.md` (criar se não existir).
6. Lembrar o Franklin de avisar o Claude do celular o que foi publicado, para ele marcar no Drive.

## Rotina rápida: publicar novidades

Quando o Franklin pedir "verifica a fila e publica" (ou "publica as novidades"): seguir `docs/07-novidades.md`. A fila são os arquivos `*_novidade_*.md` com `status: pendente` na caixa de entrada do Drive. Cada novidade é uma entrada no fim de `js/dados/novidades.js`; a página `#/novidades` e as 3 mais novas da home se atualizam sozinhas. A página da novidade é o conteúdo completo para leitura, sem os cards do carrossel. O ChatGPT (Codex) segue o mesmo passo a passo pelo `AGENTS.md`.

## Regras de conteúdo

1. **IA sem lábia:** honestidade acima de tudo; justo com quem criou a ferramenta; nunca inventar dado; preço e números com fonte e data; status `analisado`, `testado` ou `em-uso`, sem marcar como testado o que não foi; não citar o perfil que motivou a análise.
2. **Palavra:** citar sempre a referência bíblica e a versão. Citações longas de versões com direitos autorais (como a NVI) precisam respeitar as regras de citação da editora; preferir trechos curtos e o texto próprio do Franklin. Não alterar a reflexão dele sem pedir.
3. **Música:** só links oficiais das plataformas; capas só dos lançamentos dele. Sempre deixar claro que a música é criada com IA (vozes e instrumentos no Suno, letras com ajuda de IA revisadas pelo Franklin, masterização automática no LANDR), em primeira pessoa; o texto fica em `comoFaco` (`js/dados/albuns.js`).
4. **Nada pessoal:** sem telefone, e-mail pessoal, endereço, ou anotações da família, da confeitaria e da igreja que não foram pensadas para publicar.
5. **Sem coleta de dados pessoais.** Só o contador anônimo do GoatCounter (sem cookies), ligado em 21/10/2026; nada de formulário, cadastro ou outro rastreador.
6. Português correto, com acentos.

## Fluxo de trabalho

- Antes de codar: mostrar o plano e esperar o ok.
- Branch `feat/...`, commits em português (Conventional Commits).
- Ao fim de cada fase: testar em 390px e 1280px e dizer o que está pronto, o que foi testado e o que falta.
- Manter o `README.md` atualizado.

## Configuração deste PC

- Caixa de entrada: `G:\Meu Drive\Claude\Site @samfieldsoak (projeto Claude Code)\caixa-de-entrada` (Google Drive para computador, opção B do docs/05).
- Pedidos já feitos vão para a subpasta `feitos/` da caixa de entrada do Drive (pedido do Franklin em 20/10/2026), com uma cópia em `caixa-de-entrada/feitos/` deste repositório.
