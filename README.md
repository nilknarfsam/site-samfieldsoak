# Site do @samfieldsoak

Site pessoal estático (link da bio do Instagram): **IA sem lábia**, **Música**, **Palavra** e **Sobre**. HTML, CSS e JavaScript puro, SPA com roteador por hash, no padrão da skill `base-site-spa-franklin`.

## Como rodar

```bash
python -m http.server 8080
```

Abra http://127.0.0.1:8080/#/inicio (`file://` não funciona com módulos e `fetch`).

## Rotas

| Rota | Tela | Situação |
|---|---|---|
| `#/inicio` | Home "Fé, música e tecnologia": topo com mosaico de capas, papéis e números (calculados dos dados), último lançamento com player, atalhos da bio, Novidade e as três frentes | pronto, com foto |
| `#/ia-sem-labia` | Lista com filtro por categoria e status | pronto |
| `#/ia-sem-labia/<slug>` | Página completa (slug inválido mostra "Conteúdo não encontrado") | pronto |
| `#/musica` | Landing: lançamento em destaque com player do álbum, "Por trás das músicas", jornada pelos Salmos (1–150), player do perfil e discografia com capas | pronto |
| `#/musica/<slug>` | Página do álbum: capa, player, "Por trás do álbum", faixas com referências, outros volumes da série (slug inválido mostra "Conteúdo não encontrado") | pronto; completo no Tratado de Romanos; O Reino Inabalável com faixas; série dos Salmos com capas parciais |
| `#/palavra` | Lista das pregações e reflexões (mais recente primeiro) | pronto: 3 pregações de Romanos |
| `#/palavra/<slug>` | Pregação ponto a ponto: referência e versão, citações curtas da NVI, notas "Para entender melhor" (passagens difíceis ou debatidas), oração, link para a faixa (slug inválido mostra "Conteúdo não encontrado") | pronto |
| `#/sobre` | Quem é e o compromisso | pronto |

Rota inválida volta para `#/inicio`; `404.html` redireciona para o início.

## Estrutura

```
index.html  404.html
html/            views (um fragmento por tela)
css/             variaveis → base → layout → componentes → utilitarios
fontes/          Oswald, Inter, JetBrains Mono (OFL, servidas localmente)
imagens/ia/<slug>/
js/main.js       rotas
js/dados/        ferramentas.js, albuns.js, reflexoes.js (Palavra), links.js
js/modules/      roteador, templates (escapar), menu, movimento
js/telas/        uma por tela
docs/  conteudo/  caixa-de-entrada/feitos/
.claude/skills/animate   skill de animação (Emil Kowalski, MIT)
```

## Design System

Tokens em `css/variaveis.css` (docs/03). Contraste medido com a fórmula WCAG:

| Par | Contraste |
|---|---|
| texto `#FFF` / fundo `#121212` | 18,73:1 |
| texto suave `#B3B3B3` / fundo | 8,93:1 (8,13:1 sobre cartão) |
| laranja `#FF7A1A` / fundo | 7,18:1 |
| texto `#121212` / laranja (botões) | 7,18:1 |
| verde `#2ECC71` / fundo | 8,91:1 |
| branco / laranja | 2,61:1 (**não usado**) |

## Animações

Seguem a skill `animate`: só `transform` e `opacity`, curva `cubic-bezier(0.23, 1, 0.32, 1)`, tudo abaixo de 300 ms.

- Troca de rota: fade de 180 ms.
- Cartões das listas: sobem 8 px com cascata de 50 ms (no máximo 8 posições).
- Botões: `scale(0.97)` no toque; hover só em mouse (`hover: hover`).
- Barra de progresso do detalhe enche uma vez.
- `prefers-reduced-motion`: só opacidade, sem deslocamento, sem cascata.

GSAP não foi instalado (só se a página de álbum com rolagem for pedida). A vinheta Lottie do logo espera o arquivo do logo.

## Compartilhamento, Google e contador

- Prévia ao compartilhar (WhatsApp, Instagram, Facebook): `imagens/compartilhar/samfieldsoak-1200x630.jpg` e as tags `og:` no `index.html`. Como o site usa rotas por hash, a prévia é a mesma para todas as páginas.
- Google: título e descrição no `index.html`, dados de pessoa (JSON-LD), `robots.txt` e `sitemap.xml`. Falta cadastrar o site no Google Search Console (o Franklin faz, com a conta Google dele).
- Contador de visitas: `js/modules/contador.js` (GoatCounter, sem cookies), ligado em 21/10/2026 com o código `samfieldsoak`. Painel: https://samfieldsoak.goatcounter.com (cada rota do hash aparece como uma página). A página Sobre explica a contagem anônima.

## Letras

- Ficam em `js/dados/letras/<arquivo>.js` (slug do álbum → lista de letras na ordem das faixas) e o álbum aponta para o arquivo no campo `letras`. Carregam só na página do álbum.
- Prontas: Tratado de Romanos (Vol. I e II).
- Proteção leve: as letras não deixam selecionar nem copiar (`data-protegida` + `js/modules/protecao.js`). Print continua possível. As fontes de cada álbum estão no "Mapa das letras" (Drive, pasta docs do projeto do site).

## Capas dos álbuns

O site publica só a versão de tela (480 e 960 px, WebP); o arquivo de 3000 px fica no Drive. Proteção leve em `js/modules/protecao.js` e na classe `.capa[data-protegida]`: sem menu "salvar imagem" (clique direito e toque longo), sem arrastar. Não existe proteção total na web: print sempre funciona.

## Testes feitos (20/10/2026, navegador do Claude)

- Todas as rotas, slug inválido, rota inválida: ok.
- 375 px e 1280 px sem rolagem horizontal; um `h1` por tela.
- Menu do celular abre e fecha; Esc fecha.
- Cartões terminam todos visíveis (opacidade 1) depois da cascata.
- Console sem erros.
- **Não testado ainda:** "reduzir movimento" ligado no sistema (só conferido no código), validador W3C, leitor de tela, F5 no GitHub Pages.

## Publicação

- No ar desde 21/10/2026 pelo GitHub Pages (branch `main`, raiz): **https://samfieldsoak.com.br** (domínio no Registro.br, arquivo `CNAME` na raiz).
- DNS no Registro.br (zona DNS, modo avançado): registros A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` e CNAME `www` → `nilknarfsam.github.io`. **Não** mexer em "Alterar servidores DNS".
- Endereço reserva: https://nilknarfsam.github.io/site-samfieldsoak/
- Para citar uma página: `https://samfieldsoak.com.br/#/ia-sem-labia/<slug>`.

## O que falta

- Música: notas "Por trás do álbum" dos álbuns além de Romanos; referências bíblicas das faixas de O Reino Inabalável. Capas em `imagens/albuns/<slug>-480.webp` e `-960.webp`.
- A discografia mostra só os lançamentos oficiais no Spotify (21/10/2026); os álbuns que estão só no Suno saíram do site.
- Primeira reflexão da Palavra, tela de detalhe e ligação reflexão ↔ música.
- Logo no Início (hoje um "S" provisório) e vinheta Lottie.
- Capa do guia `verdades-ia-instagram`.
- Testes mínimos de `docs/02-arquitetura.md`; conferir "reduzir movimento", validador W3C, leitor de tela e F5 no site publicado.

## Uso de IA

Construído com o Claude Code a partir dos pedidos do Franklin na caixa de entrada.
