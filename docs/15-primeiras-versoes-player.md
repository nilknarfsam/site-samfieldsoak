# 15 — Primeiras versões com player próprio (T-28)

Plano de origem: Drive, `2026-11-07_plano_primeiras-versoes-player-proprio-e-painel.md` (Fases 2 e 3). Franklin aprovou em 21/11/2026: nome da página "Primeiras versões", áudio em MP3 320 kbps (a masterização do LANDR, sem recompressão), piloto com Trono de Fogo.

## Por que player próprio

O embed do Suno não informa ao site em que segundo a música está. Sem isso não dá para tocar em sequência, sincronizar a letra nem contar quanto foi ouvido. O site passa a tocar o MP3 com o `<audio>` do navegador. Os álbuns oficiais continuam só no Spotify (Fase 1, PR #43).

## Onde fica o áudio

- Cloudflare R2, bucket `samfieldsoak-musicas`, fora do GitHub (≈150 MB por álbum em 320 kbps; 10 GB grátis no R2, sem cobrança por download).
- Caminho: `primeiras-versoes/<slug-do-album>/<NN>-<slug-da-faixa>.mp3`, com `Content-Type: audio/mpeg` e `Cache-Control: public, max-age=31536000, immutable`.
- CORS do bucket: GET/HEAD para `samfieldsoak.com.br`, `www`, `site-samfieldsoak.pages.dev` (e prévias) e `127.0.0.1:8080`/`localhost:8080`.
- Endereço em `AUDIO_BASE` (`js/dados/primeiras-versoes.js`): `https://audio.samfieldsoak.com.br/primeiras-versoes`, domínio próprio ligado ao bucket (com cache do Cloudflare). O endereço público de teste do R2 (`r2.dev`) foi desligado em 21/11/2026, depois do merge do PR #44.
- Arquivos de origem: `Música\01 - Lançamentos e Autorais\Salmos - Primeiros Lançamentos\<álbum>\MP3` no PC do Franklin. A cópia com nomes padronizados fica em `C:\PROJETOS\audio-primeiras-versoes\`.

### Subir um álbum novo

```bash
# na pasta C:\PROJETOS\audio-primeiras-versoes (wrangler com login feito: npx wrangler@4 login)
for f in primeiras-versoes/<slug>/*.mp3; do
  npx wrangler@4 r2 object put "samfieldsoak-musicas/$f" --file "$f" --content-type audio/mpeg \
    --cache-control "public, max-age=31536000, immutable" --remote
done
```

Depois: acrescentar o álbum em `faixasPrimeiras` (título, referência, arquivo, duração em segundos lida do próprio MP3 com `ffprobe`) e a letra em `js/dados/letras/<slug>.js`, na mesma ordem. Nada de molde muda: é pista Conteúdo.

## Rotas

| Rota | Conteúdo |
|---|---|
| `#/ouvir` | Página **Ouvir** (item próprio no menu, T-30): só os álbuns que tocam aqui no site. Abas Álbuns · Minha playlist. |
| `#/ouvir/<slug>` | Capa, aviso de primeira versão, "Tocar o álbum", faixas numeradas (a que toca mostra barrinhas), duração, "+" e letra. |
| `#/primeiras-versoes[/<slug>]` | Endereço antigo: o roteador troca para `#/ouvir[/<slug>]` (`redirecionar` no mapa, com `replaceState`). |

A página Música não lista mais as primeiras versões nem tem abas: a seção `#/musica/primeiras-versoes` virou um convite "Ouvir aqui no site" com botão para `#/ouvir`. A Início tem o link "Ouvir todos os álbuns aqui no site" no bloco da faixa da semana.

## Tela "Tocando agora" (T-30, `js/modules/tela-tocando.js`)

No jeito do YouTube Music, a pedido do Franklin (21/11/2026, com prints do app):

- Tocar na barra do rodapé (capa e título) abre um `<dialog>` em tela cheia: capa grande com o fundo desfocado da própria capa, título, pílulas **Letra**, **Salvar** (põe/tira da Minha playlist) e **Compartilhar** (link do álbum), barra de tempo, anterior/tocar/próxima.
- **Gaveta** com duas abas: **A seguir** (a fila; tocar num item pula para ele) e **Letra** (a letra da faixa atual, em letras grandes, carregada só quando a aba abre).
- Celular: a gaveta fica presa embaixo (alça + abas). Puxar para cima, tocar na alça, numa aba ou na pílula Letra abre a gaveta na tela toda, com um mini player no topo (capa, título, tocar/pausar). Puxar para baixo, tocar na alça ou o Voltar recolhe. A partir de 1024px: capa à esquerda e a gaveta sempre aberta à direita.
- Fecha pela setinha, por Esc e pelo **Voltar** do celular. A tela e a gaveta põem degraus no histórico com `pushState` (no mesmo endereço; o roteador não percebe): o primeiro Voltar recolhe a gaveta, o segundo fecha a tela. "Ver o álbum" fecha e vai para a página do álbum.
- No celular a barra do rodapé fica enxuta (tocar e próxima); anterior fica na tela cheia.
- Métricas: `tocando/abrir`, `tocando/compartilhar` e `letra/<álbum>/<NN-faixa>` (a mesma da página do álbum).

## O player (`js/modules/tocador.js`)

- Um `<audio preload="none">` e uma barra fixa no rodapé, criados no primeiro toque e colocados fora do `#app`: a música continua quando a pessoa troca de página. Nada é baixado antes de apertar tocar.
- Controles: tocar/pausar, anterior (volta ao início se passou de 3 s), próxima, barra de posição, volume (a partir de 768px) e fechar. Toca o álbum em sequência.
- Tela bloqueada e fone Bluetooth: Media Session (capa, título, álbum, tocar/pausar, anterior, próxima, posição).
- Um som por vez: tocar aqui fecha o embed do Spotify/Suno aberto; abrir um embed dispara `player-externo` e este player pausa.
- Acessível: todos os botões com nome, `aria-current` na faixa que toca, aviso em `aria-live` se o áudio falhar, espaço tocar/pausar quando o foco não está num controle, alvos de 44px e tokens do Design System.

## Minha playlist, abas e faixa da semana (T-29)

- **Minha playlist** (`#/playlist`, `js/modules/playlist.js`, `js/telas/playlist.js`): o "+" de cada faixa guarda a faixa no navegador da pessoa (`localStorage`, chave `samfieldsoak-playlist`, até 200 faixas). Sem cadastro e sem servidor. A página explica que a lista não vai junto para outro celular.
- **Compartilhar:** `#/playlist?f=trono-de-fogo.01,altar-da-contricao.05` (álbum + número da faixa). Quem abre ouve a lista e pode juntá-la à sua. Ids inválidos ou de faixas que não existem mais são ignorados. O roteador ignora a consulta (`?f=`) na hora de escolher a rota.
- **Abas:** desde a T-30 ficam na página Ouvir (Álbuns · Minha playlist); as duas rotas acendem "Ouvir" no menu.
- **Faixa da semana** (Início): uma faixa das primeiras versões, trocada toda segunda-feira, percorrendo todas em ordem; toca no player do site.
- Playlists prontas, montadas pelo Franklin, ficam para quando ele escolher as faixas (não inventar curadoria).

## Métricas sem rastrear ninguém (T-29)

O GoatCounter (o mesmo contador das páginas, sem cookies e sem dados pessoais) recebe eventos anônimos (`contarEvento` em `js/modules/contador.js`):

| Evento | Quando |
|---|---|
| `play/<álbum>/<NN-faixa>` | a faixa começou a tocar (uma vez por faixa) |
| `ouviu30/<álbum>/<NN-faixa>` | passou de 30 segundos |
| `fim/<álbum>/<NN-faixa>` | ouviu até o fim |
| `letra/<álbum>/<NN-faixa>` | abriu a letra |
| `playlist/adicionar`, `playlist/compartilhar`, `playlist/abrir-compartilhada` | uso da playlist |
| `spotify/<tipo>/<id>` | abriu o player do Spotify no site |

O painel do próprio GoatCounter mostra quantas vezes, de onde (Instagram, Google…), país e navegador; nunca quem.

## Letras

`js/dados/letras/trono-de-fogo.js` saiu do documento do Drive "Letras Album - Trono de Fogo → Salmos 36–50" (lido em 21/11/2026), sem os rótulos de seção. A linha em branco separa as seções. **Conferir com a gravação**: o documento é de agosto de 2025 e o álbum saiu no Suno em outubro de 2026.

A letra sincronizada (linha destacada acompanhando a música, na aba Letra da tela Tocando agora) é o próximo passo: precisa dos tempos de cada linha, feitos com a mesma ferramenta dos lyric videos de Romanos (`tempos_letra.json`). Até lá, a letra aparece inteira e parada.

## Conferências

- `conferir-dados.mjs`: `AUDIO_BASE` em https; álbum existe em `primeirasVersoes`; arquivo `NN-slug.mp3` na ordem, sem repetir; duração inteira; uma letra por faixa.
- `testar-rotas.mjs`: `#/ouvir`, cada álbum e o endereço antigo em 390/1280px; tela Tocando agora (abre pela barra, fila, letra, Voltar fecha sem sair da página); nenhum pedido de áudio antes do clique; tocar o álbum, trocar de faixa, faixa atual marcada, player continua ao ir para Sobre, fechar. O áudio é substituído por uma resposta vazia: o teste não prova o som, que precisa do aceite do Franklin no celular e no PC.

## Próximos passos

1. Franklin ouve o piloto (celular e PC, tela bloqueada) e confere as letras.
2. Tempos da letra do Trono de Fogo → letra sincronizada.
4. Os outros 6 álbuns (só dados), métricas (Fase 5), playlists (Fase 4), painel (Fase 6) e visual da Música (Fase 7).
