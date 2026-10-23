# 07 – Como publicar uma novidade (Claude e ChatGPT)

Vale para qualquer IA que trabalhe no site: Claude (chat ou Claude Code) e ChatGPT (Codex). Criado em 23/10/2026.

## A ideia em uma frase

Em qualquer chat, o Franklin manda um assunto e diz "manda pro site". A IA salva o assunto na **fila** do Drive. Quando ele pedir "verifica a fila e publica tudo", quem tiver acesso ao GitHub publica todas as pendentes num PR só. A arte pode vir depois.

## 1. Guardar na fila (qualquer chat, com acesso ao Drive)

- Pasta da fila: `Claude/Site @samfieldsoak (projeto Claude Code)/caixa-de-entrada/` no Google Drive do Franklin.
- Um arquivo por novidade, com o nome `AAAA-MM-DD_novidade_<slug>.md`.
- Copiar o modelo `caixa-de-entrada/_MODELO-novidade.md` (também está no Drive, na mesma pasta) e preencher.
- `status: pendente` quando o texto estiver pronto. `rascunho` se ainda estiver em conversa.
- Se a IA não conseguir gravar no Drive: entregar o arquivo no chat; o Franklin sobe na pasta.

## 2. Publicar (quem tiver acesso ao GitHub `nilknarfsam/site-samfieldsoak`)

1. Listar na fila os arquivos `*_novidade_*.md` com `status: pendente`. Mostrar ao Franklin uma linha por novidade.
2. Se ele disser "publica tudo", seguir sem perguntar de novo, uma a uma.
3. Criar a branch `feat/novidades-AAAA-MM-DD` a partir de `main`.
4. Para cada novidade, **acrescentar uma entrada no fim** da lista em `js/dados/novidades.js` (os campos estão explicados no topo do arquivo). Não mexer na ordem: o site põe a mais nova em cima sozinho.
   - Se a novidade só aponta para uma página que já existe no site, usar `rota` e não escrever `paragrafos`.
   - Se tem texto próprio, usar `paragrafos` ("## " vira subtítulo, "- " vira item de lista).
   - Tecnologia: `fontes` e `conferidoEm` são obrigatórios. Nada de número, preço ou versão sem fonte.
   - Sem arte ainda: `arte: 'pendente'`. A novidade entra no ar sem imagem.
   - Com arte: imagens em `imagens/novidades/<slug>/card-01.webp`, `card-02.webp`... (1080 × 1350, WebP) e o campo `carrossel` com `alt` de cada card (o texto do card).
5. Conferir: `python -m http.server 8080`, abrir `#/novidades` e a página da novidade em 390px e 1280px. Sem erro no console.
6. Commit em português: `feat(novidades): <título curto>`. Abrir o PR para o Franklin aprovar pelo celular.
7. Na fila do Drive: mudar o cabeçalho para `status: publicado` e `publicado: AAAA-MM-DD`, e mover o arquivo para a subpasta `feitos/`.
8. Acrescentar uma linha em `docs/registro-de-publicacoes.md`.

Quem não tem acesso ao GitHub para no passo 1 e avisa o Franklin: "está na fila, falta publicar".

## 3. Quando a arte chegar

Acrescentar as imagens e o campo `carrossel` na mesma entrada (e tirar `arte: 'pendente'`). Não criar uma novidade nova para isso.

## Regras do site (resumo do CLAUDE.md, valem para as duas IAs)

- Português do Brasil, com acentos. Direto e simples. Sem travessão longo.
- Nunca escrever "músico" nem "engenheiro" para o Franklin.
- Música sempre "criada com IA", em primeira pessoa (vozes e instrumentos no Suno, letras com ajuda de IA revisadas por ele, masterização no LANDR).
- Nada pessoal: sem telefone, e-mail, endereço, família, igreja ou confeitaria que não foram pensados para publicar.
- Tecnologia: honestidade acima de tudo, fonte e data em tudo, não inventar recurso. Não afirmar que a IA faz algo sozinha sem configuração.
- Palavra: referência bíblica e versão sempre; trechos curtos da NVI; não mudar o texto do Franklin.
- Todo texto vindo de dados passa por `escapar()` (os templates já fazem isso; não escrever HTML dentro dos dados).
- Nunca apagar arquivos, nunca `push --force`, nunca fazer merge sem o ok do Franklin.

## Quem marca a autoria

No commit do Codex, acrescentar a linha `Feito-por: Codex` (padrão do protocolo Claude + Codex), para o Claude saber o que revisar.
