# 04 – Roteiro de tarefas (v2)

## Primeiro pedido para colar no Claude Code

```
Leia o CLAUDE.md e todos os arquivos das pastas docs/, caixa-de-entrada/ e conteudo/.
Leia somente esta pasta do projeto.
Depois me mostre:
1) um resumo de 5 linhas do projeto, para eu confirmar que você entendeu;
2) o plano da Fase 1 (pastas, arquivos e o que cada um faz);
3) as dúvidas que precisam de decisão minha antes de começar.
Não escreva código ainda. Espere meu ok.
```

## Fases

### Fase 0 – Preparação (Franklin)
- [ ] Decidir o nome do site e o repositório (recomendado `nilknarfsam.github.io`).
- [ ] Criar o repositório no GitHub e ligar à pasta do projeto (o Claude Code pode guiar).
- [ ] Escolher como as ideias chegam ao PC (opção A ou B em `docs/05-fluxo-de-ideias.md`).

### Fase 1 – Casca, roteador e Design System
- [ ] `index.html`, roteador por hash, menu com as seções, rodapé.
- [ ] `css/variaveis.css` com os tokens de `docs/03-design-system.md` e fontes baixadas.
- [ ] `#/inicio` no estilo link na bio.

### Fase 2 – IA sem lábia
- [ ] `js/dados/ferramentas.js` com `conteudo/ferramentas-iniciais.md` e os itens da caixa de entrada desta seção.
- [ ] Lista com filtro e página de detalhe com tratamento de slug inválido.

### Fase 3 – Música e Palavra
- [ ] `js/dados/albuns.js` com `conteudo/musica-e-links.md` (Franklin preenche os links).
- [ ] `js/dados/reflexoes.js` e as telas da Palavra (lista + detalhe).
- [ ] Ligações entre reflexão e música.

### Fase 4 – Sobre, testes e publicação
- [ ] Página Sobre.
- [ ] Testes mínimos de `docs/02-arquitetura.md`.
- [ ] Publicar no GitHub Pages e colocar o link na bio.
- [ ] README com o que está pronto, testado e o que falta.

## Rotina depois do lançamento

Pedido padrão:

```
Processe a caixa de entrada.
```

O Claude Code segue a rotina do CLAUDE.md: lista os pendentes, faz, mostra rodando, e com o ok publica e move para processadas/.
