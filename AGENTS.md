# AGENTS.md – site do @samfieldsoak

Instruções para qualquer agente de IA neste repositório (ChatGPT/Codex, Claude Code e outros).

- As regras completas do projeto estão no `CLAUDE.md`. Elas valem para todos os agentes, não só para o Claude: leia antes de mexer em qualquer coisa.
- Para publicar uma novidade (o pedido mais comum), siga `docs/07-novidades.md`. Em resumo: acrescentar uma entrada no fim de `js/dados/novidades.js`, testar em 390px e 1280px, abrir PR. Nunca fazer merge sem o ok do Franklin.
- Site estático: HTML, CSS e JavaScript puro, SPA por hash. Testar com `python -m http.server 8080`.
- Português do Brasil. Nunca escrever "músico" nem "engenheiro" para o Franklin. Música sempre "criada com IA". Nada pessoal. Fonte e data em tudo de tecnologia.
- Nunca apagar arquivos, nunca `git push --force`, `reset --hard` nem apagar branch.
- Commits do Codex terminam com a linha `Feito-por: Codex`.
