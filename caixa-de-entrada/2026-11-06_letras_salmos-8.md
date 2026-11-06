---
status: pendente
tipo: letras
criado: 2026-11-06
por: Codex
branch: conteudo/2026-11-06-letras-salmos-8
---

# Letras do Álbum 8 — Ecos de Adoração

Receita: docs/12, item 4.4. Branch independente de main; não depende da Parte 1.
Fonte: https://docs.google.com/document/d/12f6KEdTGkzOrBt68AX12k4z3SImfuuCFQJxPeJ4gtOY/edit
Spotify conferido em 06/11/2026: https://open.spotify.com/embed/album/6E8L5CSoLCFMqGCn2tk8hw

12 letras incluídas na ordem das faixas. Texto cantado preservado; removidos apenas cabeçalhos, metadados e marcações do Suno; separações de estrofe viraram linhas vazias.
Os títulos em faixasLista seguem a Parte 1: o sufixo “ - Salmo N” do Spotify fica no campo texto.

| Faixa | Título no Spotify | Duração exata (ms) | Minutos e segundos inteiros |
|---|---|---|---|
| 01 | Restaura-nos, Senhor! - Salmo 85 | 254759 | 4:14 |
| 02 | Ouve a Minha Súplica - Salmo 86 | 282159 | 4:42 |
| 03 | A Glória de Sião - Salmo 87 | 222759 | 3:42 |
| 04 | A Escuridão é Minha Companhia - Salmo 88 | 247559 | 4:07 |
| 05 | A Aliança e o Lamento - Salmo 89 | 271599 | 4:31 |
| 06 | De Eternidade a Eternidade - Salmo 90 | 274839 | 4:34 |
| 07 | Mil Cairão - Salmo 91 | 222639 | 3:42 |
| 08 | Florescerão Como a Palmeira - Salmo 92 | 254319 | 4:14 |
| 09 | O Senhor Reina - Salmo 93 | 287319 | 4:47 |
| 10 | O Deus da Vingança - Salmo 94 | 253919 | 4:13 |
| 11 | Não Endureçam o Coração - Salmo 95 | 199879 | 3:19 |
| 12 | O Senhor Reina Entre as Nações - Salmo 96 | 244519 | 4:04 |

A tabela do Drive arredonda algumas durações para cima em um segundo. Os valores exatos acima são os do Spotify; as letras e a ordem correspondem às 12 faixas. Duração não é um campo do molde de publicação e não foi acrescentada aos dados do álbum.

## Conferências e retomada

- `node ferramentas/conferir-dados.mjs`: ✅.
- `node ferramentas/testar-rotas.mjs --capturas`: não concluiu; navegador do Playwright ausente. Instalação tentou baixar Chromium, mas o arquivo retornou inválido. Chromium do sistema também não iniciou neste ambiente.
- Não foi feita a revisão visual nem aberto PR. Não houve merge ou publicação.
- Próximo passo: executar os dois comandos em ambiente com navegador, revisar 390px e 1280px e abrir “Ver letra” da primeira e da última faixa. Somente com os dois ✅, abrir PR para main seguindo o modelo; atualizar fila para em-pr e preencher pr.
- Rotas: `#/musica/ecos-de-adoracao`.
- Álbum 3 continua excluído até Franklin decidir sobre os três erros de digitação. Álbum 9 e singles fora deste pedido.

