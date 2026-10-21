# 06 – Padrão dos posts (Instagram ↔ site)

Definido pelo Franklin em 20/10/2026.

## Carrossel

| Card | Padrão |
|---|---|
| **Capa (1)** | Modelo da capa aprovada `2026-10-20_carrossel-verdades-ia_capa_v02.png`: fundo grafite com grade, topo com @samfieldsoak e contador, título em 3 linhas (linha branca, faixa colorida, linha branca), ilustração central, carimbo inclinado, rodapé "ARRASTA PARA O LADO →" e barra de progresso. Para um tema novo, trocar só o texto, a ilustração e o carimbo. |
| **Cards do meio** | Um assunto por card, sem chamada para a bio. Frase-ponte em itálico no rodapé puxando para o próximo. |
| **Último card** | Única chamada do carrossel: **"SAIBA MAIS NO LINK DA BIO"** em destaque + **"Comente e compartilhe com quem precisa ver isso"** + @samfieldsoak. |

Prompts e regras do Ideogram: documento "2026-10-20 – Referências de design e prompts – Carrossel As verdades sobre IA no Instagram" (Claude/Design/04 - Perfil @samfieldsoak). Gerar a capa primeiro, aprovar e usar como referência dos outros cards.

## Cor de destaque por seção (sugestão, a confirmar)

| Seção | Destaque | Observação |
|---|---|---|
| IA sem lábia | laranja `#FF7A1A` | já aprovado |
| Palavra | dourado `#E0B04B` | sereno, combina com reflexão |
| Música | a cor da capa do álbum | cada lançamento com a sua |

Mesmo fundo grafite, mesma tipografia e mesmo layout em todas, para o perfil parecer uma coisa só.

## Legenda

1. Gancho na primeira linha (aparece antes do "mais").
2. 2 a 4 linhas resumindo o carrossel.
3. "A página completa está no link da bio."
4. "Comente e compartilhe com quem precisa ver isso."
5. 3 a 5 hashtags (nicho, médio e grande).

O Claude entrega a legenda sempre dentro de um bloco de código, pronta para copiar.

## Ligação com o site

- Cada carrossel tem um `slug` e um arquivo na `caixa-de-entrada/` com a página completa.
- O link da bio aponta para o Início do site, e o destaque "Novidade" do Início mostra a página do carrossel mais recente. Assim quem vem do post encontra o assunto com um toque.
