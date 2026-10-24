# AGENTS.md – site do @samfieldsoak

Instruções para qualquer agente de IA neste repositório (ChatGPT/Codex, Claude Code e outros).

- As regras completas do projeto estão no `CLAUDE.md`. Elas valem para todos os agentes, não só para o Claude: leia antes de mexer em qualquer coisa.
- Para publicar uma novidade (o pedido mais comum), siga `docs/07-novidades.md`. Em resumo: acrescentar uma entrada no fim de `js/dados/novidades.js`, testar em 390px e 1280px, abrir PR. A página da novidade é o **conteúdo completo** para leitura, nunca os cards do carrossel (imagem só quando explicar algo, no meio do texto). Nunca fazer merge sem o ok do Franklin.
- Para melhorias de design e de funções, siga `docs/09-plano-de-melhorias.md`: pegue a próxima tarefa `pendente` da tabela, faça só ela, teste e abra PR (uma tarefa por PR). O diagnóstico de cada tarefa está em `docs/08-auditoria-2026-10-24.md`; a seção "Como trabalhamos aqui" do `docs/09` explica a lógica do projeto.
- Site estático: HTML, CSS e JavaScript puro, SPA por hash. Testar com `python -m http.server 8080`.
- Português do Brasil. Nunca escrever "músico" nem "engenheiro" para o Franklin. Música sempre "criada com IA". Nada pessoal. Fonte e data em tudo de tecnologia.
- Nunca apagar arquivos, nunca `git push --force`, `reset --hard` nem apagar branch.
- Commits do Codex terminam com a linha `Feito-por: Codex`.
