# Comece por aqui

Este é o projeto do site **samfieldsoak.com.br**, repositório `nilknarfsam/site-samfieldsoak`. Reúne Novidades, IA sem lábia, Música, Palavra, Busca e Sobre, com HTML, CSS e JavaScript publicados no GitHub Pages.

O repositório contém as regras atuais. Cópias no Drive podem estar antigas. Não use o roteiro inicial para reiniciar um trabalho concluído.

## Referências

| Necessidade | Documento |
|---|---|
| Regras e limites para agentes | [AGENTS.md](AGENTS.md) e [CLAUDE.md](CLAUDE.md) |
| Executar, testar e entender o estado atual | [README.md](README.md) |
| Publicar ou corrigir conteúdo | [Método de publicação](docs/12-metodo-de-publicacao-com-ia.md) |
| Publicar uma novidade | [Receita de Novidades](docs/07-novidades.md) |
| Pistas, comandos e estados da fila | [Sistema de publicação](docs/10-sistema-de-publicacao.md) |
| Arquitetura e Design System | [docs/02](docs/02-arquitetura.md) e [docs/03](docs/03-design-system.md) |
| Próxima melhoria autorizada | [Plano](docs/09-plano-de-melhorias.md) |
| Links permanentes, imagens e sitemap | [Compartilhamento](docs/14-compartilhamento-e-paginas-permanentes.md) |
| Cadastro dos players | [Player Suno](docs/13-player-suno-por-faixa.md) |
| Entregas e histórico | [Registro](docs/registro-de-publicacoes.md) |

## Fluxo de trabalho

1. Identificar Conteúdo ou Produto e conferir a `main`, o plano e PRs existentes.
2. Trabalhar em branch; preservar arquivos, slugs, fontes e texto autoral.
3. Após mudar conteúdo/capas, rodar `node ferramentas/gerar-paginas.mjs` e versionar as saídas.
4. Executar as conferências do README, revisar capturas e abrir PR com rotas e limites da validação.
5. Confirmar merge/deploy antes de registrar como publicado. Não fazer merge sem autorização explícita do Franklin.

O roteiro `docs/04` e as auditorias datadas são históricos. A sequência de melhorias vigente fica em `docs/09`.
