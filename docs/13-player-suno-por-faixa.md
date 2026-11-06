# 13 — Player do Suno por faixa (T-21)

PR: https://github.com/nilknarfsam/site-samfieldsoak/pull/30
Branch: `feat/t21-player-suno-por-faixa`. Situação: em revisão; nenhum merge pelo Codex.

## Decisão e escopo autorizado

Em 06/11/2026 Franklin confirmou que o embed individual toca na página de teste HTTPS, mas o embed de álbum redireciona para o Suno. Aprovou o plano para usar botões por música e encerrar o player anterior ao abrir outro.

Este PR é o piloto: as 12 faixas de Santuário do Altíssimo (Álbum 7, Salmos 73–84) e um destaque individual do Salmo 73 na home. Não há iframe inicial nem embed de álbum do Suno. Cada faixa abre seu iframe apenas ao clicar em “Ouvir no Suno”; o visitante depois usa o play do provedor.

A home identifica título, referência e álbum do destaque, sem apresentá-lo como faixa do último lançamento do Spotify. O cadastro é único: `destaqueSuno` aponta para o slug do álbum e para o número da faixa (começa em 1).

## Reprodução exclusiva

- Um único iframe de player gerenciado por `js/modules/player.js` fica aberto por vez no site, tanto Suno quanto Spotify. Ao abrir outro, o anterior é removido e sua fachada retorna.
- Isso encerra a reprodução anterior, sem depender de APIs de pausa dos provedores. Não é pausa com retomada: abrir novamente pode começar do início.
- O Suno tem “Encerrar reprodução”, que devolve o foco ao botão “Ouvir no Suno”.
- Trocar de página encerra o iframe antes de substituir a view; `pagehide` também limpa o player ativo.
- A exclusividade abrange os embeds gerenciados no site. Abas externas, outros aplicativos e a página independente `teste-player.html` não são controlados.
- Não há autoplay solicitado por parâmetro, próxima faixa automática, reprodução em segundo plano entre rotas ou persistência de posição.
- Não tratamos `load` do iframe como confirmação de áudio. O interior é controlado pelo provedor. Se houver erro, “Abrir música no Suno” continua disponível.

## Dados e fonte

Cada entrada opcional de `faixasLista` recebe `sunoId`: o UUID de uma gravação individual. Não use links curtos, playlists ou IDs de álbum. O botão só é preparado para UUID válido. A conferência rejeita UUID inválido, ID repetido no mesmo álbum e destaque que não aponta para uma faixa cadastrada.

Fonte lida em 06/11/2026:
https://docs.google.com/document/d/1AuaGZQTXOI2pOfWAwgxeMTI4wLpJsfD3EyIqtkV7G8Y/edit

Os 12 hyperlinks individuais da tabela do documento correspondem aos Salmos 73–84. Os títulos e letras já publicados não foram reescritos. A mesma referência bíblica não autoriza reutilizar o ID de outra gravação ou de uma primeira versão.

| Faixa | Referência / título na fonte | ID da gravação no Suno |
|---|---|---|
| 01 | Salmo 73 – Até que Entre no Santuário | `b570fd08-038b-4149-95dd-4f1c1591c05d` |
| 02 | Salmo 74 – Lembra-Te, Senhor! | `30e4239c-b731-4d76-9588-2ec560bea9cc` |
| 03 | Salmo 75 – O Deus Justo que Exalta e Abate | `89ed1e71-6fde-46a6-8257-21e0a92de6c9` |
| 04 | Salmo 76 – O Guerreiro Invencível | `6bf70476-37a7-48de-86f3-2d117d3ef0d1` |
| 05 | Salmo 77 – Eu Me Lembro das Tuas Obras | `444e9d1b-5dc9-4c8f-8986-9a78afb0e90b` |
| 06 | Salmo 78 – Lembrem-se das Obras do Senhor | `90cf57a6-d4d7-422b-8c42-e807b3c06748` |
| 07 | Salmo 79 – Tem Misericórdia, Senhor | `918d4924-7a5c-4427-afce-145c1292ce28` |
| 08 | Salmo 80 – Restaura-nos, Senhor! | `4c8cba46-8a82-45db-b884-d5e1bf34e883` |
| 09 | Salmo 81 – Ouve, ó Meu Povo! | `0a86991f-bbf5-4b88-828d-554da751572b` |
| 10 | Salmo 82 – Levanta-Te, ó Deus, e Julga a Terra | `e6a0fe5a-d2b2-4a8b-8e69-294777c4b4eb` |
| 11 | Salmo 83 – Levanta-Te, Senhor dos Exércitos! | `6f6a3557-1a22-4f8f-834c-bf989eff6658` |
| 12 | Salmo 84 – Um Dia nos Teus Átrios | `f239f506-cb98-4f7a-a419-00fea876416c` |

## Como cadastrar os próximos álbuns

1. Identificar a gravação correta na fonte do álbum, distinguindo primeiras versões e série atual.
2. Abrir/conferir o link individual e associá-lo ao título e à referência, sem inferir só pelo número do Salmo.
3. Acrescentar `sunoId` à faixa correspondente, preservando título, ordem e letra.
4. Rodar as duas conferências e testar a reprodução real em HTTPS.
5. Manter tudo em PR e não fazer merge pelo agente.

A home usa `destaqueSuno = { album, faixa }` em `js/dados/albuns.js`. Para mudar o destaque, apontar para uma faixa com ID válido; não duplicar título ou ID em outro arquivo. Para retirar só o destaque, `destaqueSuno` pode ser `null`.

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `js/dados/albuns.js` | 12 IDs do piloto e referência do destaque. |
| `js/modules/player.js` | Fachada, validação básica, criação e exclusividade dos iframes. |
| `js/modules/roteador.js` | Encerrar ao trocar a view ou sair da página. |
| `js/modules/templates-musica.js` | Espaços e links das faixas; destaque identificado na home. |
| `js/telas/inicio.js` / `musica-detalhe.js` | Preparar os botões conforme os dados. |
| `css/variaveis.css` / `componentes.css` | Altura de 240px, largura responsiva e controles. |
| `ferramentas/conferir-dados.mjs` | Validação dos IDs e do destaque. |
| `ferramentas/testar-rotas.mjs` | Fluxos de troca, exclusividade, letras, foco e navegação nas duas larguras. |

## Privacidade e acessibilidade

Nenhum pedido ao Suno ou Spotify é necessário para apresentar os botões. Não há SDK, preconnect, fonte remota, cookie ou rastreador novo. Após o clique, o iframe externo fica sujeito ao funcionamento e às políticas do respectivo serviço; a fachada não impede cookies dentro do provedor depois do consentimento pelo clique.

Botões têm título da faixa no nome acessível; links alternativos avisam abertura em nova aba. Cores, foco, espaçamentos e alvo mínimo de 44px usam o Design System. Títulos e referências passam por `escapar()`. A letra fica em seu próprio `details` e pode ser aberta enquanto o player está ativo.

## Validação

```bash
node ferramentas/conferir-dados.mjs
node ferramentas/testar-rotas.mjs --capturas
```

O teste de rotas cobre home e página do Álbum 7 em 390px e 1280px: nenhum pedido de embed antes do clique; primeiro e último Suno; encerramento da faixa anterior; Suno → Spotify → Suno; botão de encerrar e foco; “Ver letra” com player aberto; navegação para Sobre sem iframe restante. Para isolar o site, as respostas dos embeds são substituídas por HTML claramente identificado como simulação. Esses testes não provam reprodução real nem aparência interna dos players dos provedores. As capturas padrão são feitas antes de abrir os players.

Verificações locais realizadas em 06/11: dados válidos; rejeição de UUID inválido, ID repetido e destaque inexistente; testes de DOM com os módulos e templates reais (jsdom temporário fora do repositório), inclusive 12 letras e associação dos IDs à fonte. Nenhuma dependência foi acrescentada ao site.

O Playwright local não iniciou porque o Chromium não está disponível neste ambiente. O resultado do GitHub Actions e as capturas devem ser conferidos no PR; não registrar como reprodução testada pela IA.

## Rotas e aceite manual

- `#/inicio`: destaque “Até que Entre no Santuário”, do Álbum 7, começa como botão.
- `#/musica/santuario-do-altissimo`: 12 botões individuais e 12 letras.
- Regressão: `#/musica`, singles, outros álbuns, Spotify compacto e completo.

Depois do merge pelo Franklin: no celular e no PC, confirmar áudio da primeira e da última faixa, troca sem sobreposição, troca com Spotify, encerrar, voltar a abrir e navegar para outra seção. O teste relatado por Franklin confirma o embed individual original; a integração nova ainda precisa desse aceite em HTTPS.

## Próximas etapas

- Trono de Fogo / primeiras versões: mapear e conferir as 15 gravações individuais antes de criar a lista expansível. O documento de letras consultado não forneceu hyperlinks individuais; não completar com IDs presumidos.
- Demais álbuns: expandir depois do aceite deste piloto.
- Não alterar letras do Álbum 3, singles ou outros conteúdos neste trabalho.
- Preservar `teste-player.html`; remover só quando Franklin pedir.

