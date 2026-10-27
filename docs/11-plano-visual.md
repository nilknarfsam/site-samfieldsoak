# 11 – Plano visual: cara mais profissional, sem mudança brusca

Criado pelo Claude Code em 27/10/2026, a pedido do Franklin ("deixar o site com uma cara mais profissional, responsiva e bonita, sem alterações bruscas"). É pista de **Produto** (`docs/10`): cada fase vira um PR, com capturas de antes e depois, e só começa com o ok do Franklin.

## O que NÃO muda (a identidade fica)

- Fundo grafite com a grade, laranja `#FF7A1A` como destaque, dourado na Palavra, verde no "Verdade".
- As três fontes (Oswald nos títulos, Inter no texto, JetBrains Mono nos detalhes).
- A faixa colorida no título, os selos, o "link na bio" da home, a estrutura das páginas e as rotas.
- Nenhum texto do Franklin muda. Nenhuma biblioteca nova, nenhum build.

A ideia é **refinar**: o mesmo site, com mais respiro, ritmo e consistência. Quem já visitou reconhece na hora.

## O que a pesquisa mostrou (27/10/2026)

1. **Site pessoal profissional = simples e consistente.** As análises de portfólio de 2026 repetem: poucas cores, poucas animações, poucas seções, muito espaço em branco; um layout limpo passa mais profissionalismo do que efeito ([Colorlib](https://colorlib.com/wp/portfolio-design-trends/), [Seahawk](https://seahawkmedia.com/design/portfolio-trends/)). O nosso já está nesse caminho; falta acabamento.
2. **Tema escuro:** evitar preto e branco puros (já fazemos: `#121212`), criar profundidade com **camadas de superfície** e não com sombra (sombra quase não aparece no escuro), contraste mínimo de 4,5:1 e foco visível ([LogRocket](https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/), [Halo Lab](https://www.halo-lab.com/blog/dark-ui-design-11-tips-for-dark-mode-design)).
3. **Tipografia fluida:** em vez de pular de tamanho em cada breakpoint, o tamanho das letras e dos espaços cresce suave entre o celular e o computador com `clamp()`, numa escala com nome (passo -1, 0, 1, 2...). É o método Utopia, que também confere se o texto aguenta zoom de 200% (WCAG 1.4.4) ([Utopia](https://utopia.fyi/blog/clamp/), [Smashing Magazine](https://smashingmagazine.com/2021/04/designing-developing-fluid-type-space-scales/)).
4. **Títulos que quebram bonito:** `text-wrap: balance` equilibra as linhas dos títulos (Baseline desde 2024, vale até ~6 linhas no Chrome); `text-wrap: pretty` evita palavra sozinha na última linha dos parágrafos (ainda não é universal, mas onde não funciona não atrapalha) ([MDN](https://developer.mozilla.org/docs/Web/CSS/text-wrap), [LogRocket](https://blog.logrocket.com/css-text-wrap-balance-vs-text-wrap-pretty/)).
5. **Transição entre páginas nativa:** as View Transitions de mesmo documento (exatamente o caso de uma SPA por hash) funcionam nos quatro navegadores desde outubro de 2025 (Chrome/Edge 111, Safari 18, Firefox 144). Dá para trocar o fade atual por uma transição mais elegante, com o fade como reserva ([web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available), [Chrome](https://developer.chrome.com/blog/view-transitions-in-2025)).

## O que vi no site hoje (capturas de 27/10/2026, 390 e 1280 px)

| # | O que | Onde |
|---|---|---|
| A | Acentos encostam na linha de cima nos títulos de várias linhas ("BÁLSAMO", "NINGUÉM", "ANIMAÇÕES"), e a faixa colorida invade a linha de cima | detalhes da Palavra, IA e Novidades |
| B | Sobretítulo colado na faixa do título ("PREGAÇÕES E REFLEXÕES" quase toca o "PALAVRA") | todas as listas e o Sobre |
| C | Laranja demais: todo cartão tem um botão laranja cheio ("Ler a pregação", "Ver a verdade completa"). Repetido 8 vezes, parece modelo pronto e tira a força do botão principal | listas da Palavra, IA, Música |
| D | Na Palavra, o botão é laranja, mas a cor da seção é o dourado | `#/palavra` |
| E | Títulos dos cartões começam em alturas diferentes. Causa: `.cartao p { flex: 1 }` estica também a linha da referência | `#/palavra`, `#/ia-sem-labia` |
| F | Selos empilhados e de tamanhos diferentes no topo das pregações (referência numa linha, ocasião na outra) | `#/palavra/<slug>` em 390 px |
| G | Tamanhos fixos na maior parte do texto e dos espaços: no celular tudo fica grande e apertado; no computador, pequeno e solto | site todo |
| H | Página Sobre curta e "solta" no computador: um texto, uma lista e muito vazio à direita | `#/sobre` |
| I | Rodapé simples demais para um site profissional (uma linha de links e uma frase) | todas |
| J | O topo da home no celular é longo (foto, frase, 3 linhas de papéis, caixa de números) e o player "OUVIR AGORA" é maior do que precisa | `#/inicio` em 390 px |
| K | Emojis de sistema nos atalhos (aparência muda em cada celular) | home (já é a T-18 do `docs/09`) |

## As fases

Cada fase é pequena, tem um PR próprio e capturas de antes/depois em 390, 768 e 1280 px. Se o Franklin não gostar de uma fase, ela não entra e as outras continuam valendo.

### Fase 1 · Tipografia e ritmo (resolve A, B, G) · **feita em 27/10/2026 (Claude)**

Resultado: escala fluida em `css/variaveis.css` (os tamanhos de 16 px para baixo continuam fixos, para a leitura no celular não piorar), `--altura-linha-titulo` 1.12, `text-wrap: balance` nos títulos e `pretty` nos parágrafos, `h1` das páginas de detalhe com o token `--texto-h1-detalhe`, respiro entre sobretítulo e faixa, e "N min de leitura" sem partir no meio. Conferido: 34 rotas em 390 e 1280 px, mais 8 telas em 768 px, sem rolagem lateral.

- **V-01 Escala fluida de texto e espaço.** Em `css/variaveis.css`, trocar os tamanhos fixos (`--texto-*`) e os espaços (`--esp-*`) por versões com `clamp()` entre 360 e 1280 px (método Utopia: razão 1,2 no celular e 1,25 no computador). Os nomes dos tokens continuam os mesmos, então nenhum outro arquivo muda. Conferir zoom de 200%.
- **V-02 Títulos que respiram.** `--altura-linha-titulo` de 1.05 para ~1.12; `text-wrap: balance` em `h1, h2, h3`; `text-wrap: pretty` em `p, li`. Faixa do título com `padding` vertical pequeno e `line-height` próprio, para não invadir a linha de cima. Tamanho máximo do `h1` das páginas de detalhe um pouco menor que o das listas (título longo não precisa de 3,8 rem).
- **V-03 Sobretítulo com respiro.** `.sobretitulo + .titulo-faixa` com margem própria.
- Esta fase **absorve a T-17** do `docs/09`.

### Fase 2 · Cartões e botões (resolve C, D, E, F)

- **V-04 Cartão inteiro clicável.** Nas listas (Palavra, IA, discografia), o cartão todo vira o link (o padrão `.cartao--link` que a home e as novidades já usam), e o botão laranja cheio vira um texto de ação discreto no rodapé do cartão ("Ler a pregação →", na cor da seção). Regra nova: **um só botão laranja cheio por tela**, a ação principal.
- **V-05 Cor da seção.** Criar `--cor-secao` (laranja por padrão, dourado dentro de `.palavra`) e usar nos links, ações, selos e na faixa. A Palavra fica toda dourada, sem misturar.
- **V-06 Estrutura fixa do cartão.** Ordem sempre igual: meta (mono, pequena) → título → resumo → rodapé (data e ação, presos embaixo com `margin-top: auto`). Corrige o `flex: 1` (só o resumo estica). Hover: borda na cor da seção e superfície um tom acima (`--cor-superficie-alta`), sem sombra.
- **V-07 Selos de um tamanho só.** Mesma altura, mesmo peso, sempre na mesma linha (quebra só se não couber); a data vira texto mono ao lado, não um selo.

### Fase 3 · Moldura do site: cabeçalho e rodapé (resolve I)

- **V-08 Cabeçalho.** Item ativo do menu com um traço embaixo, além da cor. No celular, o menu abre como painel com transição curta (só `opacity`/`transform`, respeitando "reduzir movimento"). A marca `@samfieldsoak` continua; o logo entra quando o Franklin mandar.
- **V-09 Rodapé profissional.** Três blocos: marca e frase ("Fé, música e tecnologia"), navegação do site e redes; embaixo, uma linha com "© 2026 Franklin Carvalho · Sem patrocínio, sem coleta de dados pessoais". O ano sai do relógio do navegador (`new Date().getFullYear()`).

### Fase 4 · Home e Sobre (resolve H, J)

- **V-10 Topo da home mais enxuto no celular.** Papéis numa linha que rola para o lado (como o índice da Música), números mais compactos; o player "Ouvir agora" na versão compacta (a fachada compacta que os singles já usam).
- **V-11 Sobre com cara de página.** No computador, duas colunas: foto (a mesma `imagens/perfil/franklin`) e o texto; o compromisso em cartões pequenos com ícone, em vez de lista; links para as três frentes. **O texto continua o do Franklin**; se precisar de texto novo, ele escreve ou aprova antes.

### Fase 5 · Acabamento

- **V-12 Transição entre páginas.** Usar `document.startViewTransition()` no roteador quando o navegador tiver (com o fade atual como reserva) e transição só de opacidade com "reduzir movimento" ligado.
- **V-13 Ícones SVG.** É a T-18 do `docs/09`: um conjunto só, mesmo traço, na cor do texto. Pedir ok do estilo antes.
- **V-14 Favicon e ícone de atalho.** Monograma "FC" em SVG (com a foto continuando no `apple-touch-icon` até o logo chegar) e `theme-color` conferido.

## Fluxo das imagens e ícones (ChatGPT gera, Claude coloca)

Combinado com o Franklin em 27/10/2026: as artes saem do ChatGPT, ficam no Drive, e o Claude (ou o Codex) pega de lá e coloca no site.

1. **Pedido:** a IA que for usar a arte escreve o pedido (o que é, onde entra no site, tamanho, formato, cores do site: grafite `#121212`, laranja `#FF7A1A`, dourado `#E0B04B`).
2. **Geração:** o ChatGPT gera e salva na pasta do Drive combinada para entregas, com o nome no padrão `AAAA-MM-DD_<onde-entra>_<nome>_v1.png`.
3. **Aplicação:** o Claude baixa, converte para WebP (ou SVG, no caso de ícone), põe em `imagens/<secao>/`, escreve o `alt` e abre o PR com capturas de antes e depois.

Para cada tipo de arte, o que faz sentido:

| Arte | Quem faz melhor | Formato no site |
|---|---|---|
| Fundo (textura, degradê sutil atrás do topo) | ChatGPT (imagem) | WebP, até 1920 px de largura e cerca de 200 KB; escura, para o texto continuar legível |
| Ilustração de seção, imagem de compartilhamento (1200×630) | ChatGPT (imagem) | WebP / JPG |
| Ícones dos atalhos e das novidades | **Um conjunto pronto e livre** (ex.: Lucide, licença ISC), baixado para `imagens/icones/` | SVG em `currentColor` |
| Favicon e monograma "FC" | Claude, desenhado em SVG (ou o logo, quando o Franklin mandar) | SVG |

Ícone gerado por IA costuma sair com traços e tamanhos diferentes entre si, e precisa virar vetor de qualquer jeito. Por isso a recomendação é usar um conjunto pronto, que já vem uniforme, e deixar o ChatGPT para as imagens.

## Como cada fase é conferida

1. `node ferramentas/conferir-dados.mjs` e `node ferramentas/testar-rotas.mjs --capturas` passando.
2. Capturas de **antes e depois** em 390, 768 e 1280 px das telas afetadas, no PR.
3. Contraste medido de toda cor nova ou combinação nova (≥ 4,5:1 em texto, ≥ 3:1 em borda de componente).
4. Teclado: Tab passa por tudo com foco visível. "Reduzir movimento" ligado no sistema: nada se desloca.
5. Zoom de 200% sem cortar texto (a escala fluida não pode impedir o zoom).

## Ordem recomendada e quem faz

| Fase | Tarefas | Tamanho | Quem |
|---|---|---|---|
| 1 | V-01 a V-03 | médio | Claude Code (mexe nos tokens de tudo) |
| 2 | V-04 a V-07 | médio | Claude Code |
| 3 | V-08, V-09 | pequeno | Claude Code ou Codex (com este plano) |
| 4 | V-10, V-11 | médio | Claude Code (o Sobre depende do texto do Franklin) |
| 5 | V-12 a V-14 | pequeno/médio | Codex, com revisão do Claude |

As fases 1 e 2 dão a maior parte do ganho ("cara profissional") e são as que mais mexem no visual inteiro; por isso ficam com o Claude Code, que testa no navegador. As outras são pontuais.
