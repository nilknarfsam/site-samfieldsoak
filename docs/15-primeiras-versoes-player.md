# 15 — Primeiras versões com player próprio (T-28)

Plano de origem: Drive, `2026-11-07_plano_primeiras-versoes-player-proprio-e-painel.md` (Fases 2 e 3). Franklin aprovou em 21/11/2026: nome da página "Primeiras versões", áudio em MP3 320 kbps (a masterização do LANDR, sem recompressão), piloto com Trono de Fogo.

## Por que player próprio

O embed do Suno não informa ao site em que segundo a música está. Sem isso não dá para tocar em sequência, sincronizar a letra nem contar quanto foi ouvido. O site passa a tocar o MP3 com o `<audio>` do navegador. Os álbuns oficiais continuam só no Spotify (Fase 1, PR #43).

## Onde fica o áudio

- Cloudflare R2, bucket `samfieldsoak-musicas`, fora do GitHub (≈150 MB por álbum em 320 kbps; 10 GB grátis no R2, sem cobrança por download).
- Caminho: `primeiras-versoes/<slug-do-album>/<NN>-<slug-da-faixa>.mp3`, com `Content-Type: audio/mpeg` e `Cache-Control: public, max-age=31536000, immutable`.
- CORS do bucket: GET/HEAD para `samfieldsoak.com.br`, `www`, `site-samfieldsoak.pages.dev` (e prévias) e `127.0.0.1:8080`/`localhost:8080`.
- Endereço em `AUDIO_BASE` (`js/dados/primeiras-versoes.js`): `https://audio.samfieldsoak.com.br/primeiras-versoes`, domínio próprio ligado ao bucket (com cache do Cloudflare). O endereço público de teste do R2 (`pub-….r2.dev`) continua ligado só para testes.
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
| `#/primeiras-versoes` | Os 7 álbuns. Os que têm áudio no site mostram "Ouvir aqui"; os outros, "Ouvir no Suno". |
| `#/primeiras-versoes/<slug>` | Capa, aviso de primeira versão, "Tocar o álbum", faixas com tocar/pausar, duração e letra. |

A seção "As primeiras versões" de `#/musica` usa o mesmo cartão e leva para a página nova. A rota acende "Música" no menu (`menu: 'musica'` no mapa do roteador).

## O player (`js/modules/tocador.js`)

- Um `<audio preload="none">` e uma barra fixa no rodapé, criados no primeiro toque e colocados fora do `#app`: a música continua quando a pessoa troca de página. Nada é baixado antes de apertar tocar.
- Controles: tocar/pausar, anterior (volta ao início se passou de 3 s), próxima, barra de posição, volume (a partir de 768px) e fechar. Toca o álbum em sequência.
- Tela bloqueada e fone Bluetooth: Media Session (capa, título, álbum, tocar/pausar, anterior, próxima, posição).
- Um som por vez: tocar aqui fecha o embed do Spotify/Suno aberto; abrir um embed dispara `player-externo` e este player pausa.
- Acessível: todos os botões com nome, `aria-current` na faixa que toca, aviso em `aria-live` se o áudio falhar, espaço tocar/pausar quando o foco não está num controle, alvos de 44px e tokens do Design System.

## Letras

`js/dados/letras/trono-de-fogo.js` saiu do documento do Drive "Letras Album - Trono de Fogo → Salmos 36–50" (lido em 21/11/2026), sem os rótulos de seção. A linha em branco separa as seções. **Conferir com a gravação**: o documento é de agosto de 2025 e o álbum saiu no Suno em outubro de 2026.

A letra sincronizada (linha destacada acompanhando a música) é o próximo passo: precisa dos tempos de cada linha, feitos com a mesma ferramenta dos lyric videos de Romanos (`tempos_letra.json`). Até lá, a letra aparece inteira e parada.

## Conferências

- `conferir-dados.mjs`: `AUDIO_BASE` em https; álbum existe em `primeirasVersoes`; arquivo `NN-slug.mp3` na ordem, sem repetir; duração inteira; uma letra por faixa.
- `testar-rotas.mjs`: as duas rotas em 390/1280px; nenhum pedido de áudio antes do clique; tocar o álbum, trocar de faixa, faixa atual marcada, player continua ao ir para Sobre, fechar. O áudio é substituído por uma resposta vazia: o teste não prova o som, que precisa do aceite do Franklin no celular e no PC.

## Próximos passos

1. Franklin ouve o piloto (celular e PC, tela bloqueada) e confere as letras.
2. Tempos da letra do Trono de Fogo → letra sincronizada.
4. Os outros 6 álbuns (só dados), métricas (Fase 5), playlists (Fase 4), painel (Fase 6) e visual da Música (Fase 7).
