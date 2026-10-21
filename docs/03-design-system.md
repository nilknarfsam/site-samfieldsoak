# 03 – Design System (igual ao carrossel "escuro tech")

O site precisa parecer a continuação do carrossel. Referência visual: a capa `2026-10-20_carrossel-verdades-ia_capa_v01.png` (o Franklin vai subir na pasta do carrossel; copiar para `imagens/carrosseis/verdades-ia-instagram/`).

Documento de referências e prompts do carrossel: Claude/Design/04 - Perfil @samfieldsoak (IA e tecnologia)/2026-10-20 – Referências de design e prompts – Carrossel As verdades sobre IA no Instagram.

## Cores (tokens)

| Token | Valor | Uso |
|---|---|---|
| `--cor-fundo` | `#121212` | fundo geral |
| `--cor-superficie` | `#1C1C1C` | cartões |
| `--cor-borda` | `#2A2A2A` | bordas e divisórias |
| `--cor-texto` | `#FFFFFF` | texto principal |
| `--cor-texto-suave` | `#B3B3B3` | texto secundário (conferir contraste) |
| `--cor-destaque` | `#FF7A1A` | faixa de título, botão principal, selo "O post não conta" |
| `--cor-verdade` | `#2ECC71` | selo "Verdade", status "testado" |
| `--cor-alerta` | `#FF4D4D` | avisos de risco |

Atenção ao contraste: texto branco sobre `#FF7A1A` fica perto do limite. Medir; se não passar 4,5:1 em texto pequeno, usar texto `#121212` sobre laranja nos botões, ou deixar o laranja só em títulos grandes.

## Tipografia

- Títulos: sans-serif **condensada e pesada**, em caixa alta (como "LIGAR A IA NO SEU INSTAGRAM"). Sugestões com licença livre: Oswald, Bebas Neue ou Anton (Google Fonts, licença OFL). Baixar e servir de `fontes/`.
- Texto: sans-serif legível (Inter ou Manrope).
- Detalhes (contador, data, status): monoespaçada (JetBrains Mono ou IBM Plex Mono).
- Escala modular 1,25 a partir de 16px; `h1` e `h2` com `clamp()`.

## Componentes

- **Título com faixa:** linha branca + palavra-chave dentro de uma faixa laranja (igual à capa).
- **Selo / carimbo:** "VERDADE" (verde), "O POST NÃO CONTA" (laranja, levemente inclinado), "ANALISADO / TESTADO / EM USO" (status).
- **Cartão de dado:** ícone, rótulo curto, uma linha de explicação e número grande à direita (ex.: "US$ 10/sem").
- **Cartão de ferramenta** (lista): nome, categoria, status, resumo, botão "Ver a verdade completa".
- **Botão de bio:** botão grande de largura total, ícone à esquerda, seta à direita (página de início estilo "link na bio").
- **Contador e barra de progresso:** para lembrar o carrossel (ex.: no topo da página de detalhe).
- **Frase-ponte em itálico** no fim das seções.
- **Rodapé:** @samfieldsoak, link do Instagram, aviso "Sem patrocínio. Preços conferidos na data indicada."

## Movimento

Transições curtas (150–250 ms) e nada de animação pesada. Respeitar `prefers-reduced-motion`.
