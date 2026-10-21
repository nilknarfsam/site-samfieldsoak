# 05 – Fluxo de ideias: do celular para o site

## Visão geral

```
Instagram / conversa  →  Claude (celular)  →  Drive: caixa-de-entrada/  →  Claude Code (PC)  →  site no ar
                                                                                  ↓
                                              Claude (celular) marca como publicado no Drive  ←  Franklin avisa
```

## Lado do celular (Claude)

Quando uma ideia debatida no chat servir para o site (o Franklin diz "isso vai pro site", ou o Claude sugere e ele confirma):

1. O Claude cria **um arquivo por ideia** em `Claude/Site @samfieldsoak (projeto Claude Code)/caixa-de-entrada/`, com o nome `AAAA-MM-DD_secao_slug.md` (ex.: `2026-10-20_ia-sem-labia_verdades-ia-instagram.md`).
2. O arquivo segue o `_MODELO-de-ideia.md`: cabeçalho (seção, status, origem), texto pronto para o site e o **Pedido para o Claude Code** (o que criar, onde, o que conferir).
3. O Claude registra a ideia no Relatório de Atividades e no Índice de Memórias, como sempre.
4. Quando o Franklin avisar que publicou, o Claude move o arquivo do Drive para `caixa-de-entrada/processadas/` e muda o status para `publicado`.

## Lado do PC (Claude Code)

### Opção A – baixar a caixa de entrada (simples)

1. No Drive, baixar só a pasta `caixa-de-entrada` (sai um .zip).
2. Copiar os arquivos **novos** para `caixa-de-entrada/` do projeto local (não substituir `processadas/`).
3. No Claude Code: `Processe a caixa de entrada.`

### Opção B – Google Drive para computador (automática, recomendada depois)

1. Instalar o Google Drive para computador e entrar com a conta nilknarfsam@gmail.com.
2. A pasta do Drive aparece como uma unidade (ex.: `G:\Meu Drive\Claude\Site @samfieldsoak (projeto Claude Code)\caixa-de-entrada`).
3. **O repositório do site fica fora do Drive** (ex.: `C:\Projetos\site-samfieldsoak`). Git dentro de pasta sincronizada dá conflito.
4. No `CLAUDE.md` local, acrescentar a linha: `Caixa de entrada: G:\Meu Drive\Claude\Site @samfieldsoak (projeto Claude Code)\caixa-de-entrada` (ajustar a letra da unidade).
5. O Claude Code lê direto de lá, copia cada ideia processada para `caixa-de-entrada/processadas/` do repositório e avisa o Franklin.

Assim o celular escreve e o PC lê a mesma pasta, sem baixar nada.

## Status de uma ideia

| Status | Quem muda | Significa |
|---|---|---|
| `rascunho` | Claude (celular) | Ainda em debate; o Claude Code ignora. |
| `pendente` | Claude (celular) | Pronta para o site. |
| `em-producao` | Claude Code | Sendo feita no PC. |
| `publicado` | Claude Code e Claude (celular) | Está no site; vai para `processadas/`. |
| `descartado` | qualquer um, com o ok do Franklin | Não vai para o site; vai para `processadas/` com o motivo. |

## Regras

- Uma ideia por arquivo. Nada de dados pessoais.
- Texto do site já escrito no arquivo; o Claude Code só adapta ao formato, sem reescrever o sentido.
- Reflexões da Palavra: o texto é do Franklin; o Claude Code não muda sem pedir.
