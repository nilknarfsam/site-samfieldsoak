# 07 – Como publicar uma novidade (Claude e ChatGPT)

Vale para qualquer IA que trabalhe no site: Claude (chat ou Claude Code) e ChatGPT (Codex). Criado em 23/10/2026; regra do conteúdo completo em 23/10/2026, 08h30.

## Regra principal: a página é o conteúdo completo, não o carrossel

Decisão do Franklin (23/10/2026). O carrossel é do Instagram; o site é o lugar da **leitura completa**.

- A página da novidade traz o **documento inteiro** do que foi pesquisado e escrito: contexto, explicação, exemplos, limites, fontes. Mais completo que o carrossel, não um resumo dele.
- **Não** colocar os cards do carrossel no site (nada de galeria de cards, nada de campo `carrossel`). A página ficaria cheia de imagem repetindo o texto.
- Estruturar bem para ler no celular: subtítulos curtos, parágrafos curtos, listas, um destaque (`> `) para o resumo ou o aviso principal.
- Ícones: um emoji no começo do subtítulo, quando ajudar a achar a parte (ex.: `## ⚙️ Ambientes`). Sem exagero.
- Imagem só quando explicar algo que o texto sozinho não explica (um diagrama, um antes/depois, uma captura real). Gerar ou recortar especialmente para a página, em `imagens/novidades/<slug>/`, WebP, largura até 1200 px, com `alt` descrevendo o que mostra. Ilustração conceitual tem que dizer na legenda que é conceitual.
- O link do post do Instagram pode entrar em `links` ("Ver o carrossel no Instagram"), depois que ele for postado.
- A novidade do Claude Code de 23/10/2026 é a única com carrossel na página (legado). Fica assim por enquanto; não copiar o modelo dela.

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
   - Se tem texto próprio, usar `paragrafos` com o conteúdo completo: `"## "` subtítulo, `"- "` item de lista, `"> "` destaque e `{ imagem, alt, legenda }` para uma imagem no meio do texto.
   - Tecnologia: `fontes` e `conferidoEm` são obrigatórios. Nada de número, preço ou versão sem fonte.
   - Não usar o campo `carrossel` (legado).
5. Conferir: `python -m http.server 8080`, abrir `#/novidades` e a página da novidade em 390px e 1280px. Sem erro no console.
6. Commit em português: `feat(novidades): <título curto>`. Abrir o PR para o Franklin aprovar pelo celular.
7. Na fila do Drive: mudar o cabeçalho para `status: publicado` e `publicado: AAAA-MM-DD`, e mover o arquivo para a subpasta `feitos/`.
8. Acrescentar uma linha em `docs/registro-de-publicacoes.md`.

Quem não tem acesso ao GitHub para no passo 1 e avisa o Franklin: "está na fila, falta publicar".

## 3. Depois que o carrossel for postado

O carrossel não entra no site. Se quiser, acrescentar na mesma entrada um item em `links`: `{ rotulo: 'Ver o carrossel no Instagram', url: '<link do post>' }`. Não criar uma novidade nova para isso.

## Exemplo de entrada

```js
{
  slug: 'exemplo-de-novidade',
  data: '2026-10-24',
  tema: 'tecnologia',
  titulo: 'Título curto e claro',
  resumo: 'Uma ou duas frases que fazem a pessoa querer ler.',
  paragrafos: [
    '> O resumo em uma frase: o que mudou e para quem serve.',
    'Parágrafo de contexto: o que é, por que importa.',
    '## ⚙️ Primeira parte',
    'Explicação completa, com exemplo.',
    '- Ponto um.',
    '- Ponto dois.',
    { imagem: 'imagens/novidades/exemplo-de-novidade/fluxo.webp', alt: 'Fluxo em quatro etapas: tarefa, branch, teste e PR', legenda: 'Ilustração conceitual.' },
    '## ⚠️ Limites',
    'O que não faz, para quem não vale, o que depende de versão ou plano.',
  ],
  fontes: [{ rotulo: 'Nome da fonte oficial', url: 'https://...' }],
  conferidoEm: '2026-10-24',
},
```

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
