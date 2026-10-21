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
- [x] Decidir o nome do site e o repositório (`site-samfieldsoak`, domínio `samfieldsoak.com.br`).
- [x] Criar o repositório no GitHub e ligar à pasta do projeto (o Claude Code pode guiar).
- [x] Escolher como as ideias chegam ao PC (opção B). (opção A ou B em `docs/05-fluxo-de-ideias.md`).

### Fase 1 – Casca, roteador e Design System
- [x] `index.html`, roteador por hash, menu com as seções, rodapé.
- [x] `css/variaveis.css` com os tokens de `docs/03-design-system.md` e fontes baixadas.
- [x] `#/inicio` no estilo link na bio.

### Fase 2 – IA sem lábia
- [x] `js/dados/ferramentas.js` com `conteudo/ferramentas-iniciais.md` e os itens da caixa de entrada desta seção.
- [x] Lista com filtro e página de detalhe com tratamento de slug inválido.

### Fase 3 – Música e Palavra
- [x] `js/dados/albuns.js` com `conteudo/musica-e-links.md`.
- [ ] Links oficiais dos álbuns e do perfil de artista no Spotify (Franklin passa os links).
- [ ] `js/dados/reflexoes.js` e as telas da Palavra (lista + detalhe).
- [ ] Ligações entre reflexão e música.

### Fase 4 – Sobre, testes e publicação
- [x] Página Sobre.
- [ ] Testes mínimos de `docs/02-arquitetura.md`.
- [x] Publicar no GitHub Pages com domínio próprio (no ar em 21/10/2026).
- [ ] Colocar `samfieldsoak.com.br` na bio do Instagram.
- [x] README com o que está pronto, testado e o que falta.

### Pendências visuais
- [ ] Logo do Franklin no lugar do "S" provisório do Início e vinheta Lottie do logo.
- [ ] Capa do guia `verdades-ia-instagram` (`capa_v02.png`).

## Rotina depois do lançamento

Pedido padrão:

```
Processe a caixa de entrada.
```

O Claude Code segue a rotina do CLAUDE.md: lista os pendentes, faz, mostra rodando, e com o ok publica e move para processadas/.
