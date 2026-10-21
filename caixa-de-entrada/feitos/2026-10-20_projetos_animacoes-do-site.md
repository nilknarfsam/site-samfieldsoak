---
secao: projetos   # melhoria técnica do site inteiro (não é página de conteúdo)
slug: animacoes-do-site
status: feito   # feito no PC em 2026-10-20 (site ainda não publicado no GitHub)
criado: 2026-10-20
origem: "carrossel do Instagram '8 skills grátis que transformam o Claude num estúdio de animação', analisado no celular em 20/10"
carrossel: ""
conferir_no_dia: true   # licenças e comandos de instalação das skills
---

# Animações do site (skills de animação para o Claude Code)

## Decisão

Usar animação como tempero: discreta, rápida e leve no celular. O público chega pelo link da bio, quase todo no celular, dentro do Instagram.

Skills a instalar SÓ na pasta deste projeto (.claude/skills), não no global:

1. **emilkowalski/skills – só a skill animate** (MIT). Principal. Regras de duração, curva e acabamento; funciona com CSS puro.
   `npx skills add https://github.com/emilkowalski/skills --skill animate`
2. **diffusionstudio/lottie – text-to-lottie** (MIT). Para gerar 1 ou 2 animações pequenas em Lottie (.json), tocadas com lottie-web.
   `npx skills add diffusionstudio/lottie`
3. **greensock/gsap-skills** (MIT, oficial). Só se alguma página precisar de animação ao rolar (ScrollTrigger). Se não precisar, não instalar.
   `npx skills add https://github.com/greensock/gsap-skills`

Fora da v1 do site: Three.js, Rive, claudedesignskills (React) e Remotion (é para vídeo).

## Onde animar

- Entrada dos cartões nas listas (IA sem lábia, Música): opacidade + subida de poucos pixels, cerca de 180 ms, cascata curta.
- Botões e links: toque e foco com transição curta (sem perder o foco visível).
- Troca de tela da SPA (rota por hash): fade rápido.
- Início: vinheta do logo @samfieldsoak em Lottie, tocando uma vez (feita com text-to-lottie a partir do logo; o Franklin fornece o arquivo).
- Opcional: página de álbum com faixas aparecendo ao rolar (GSAP + ScrollTrigger).

## Regras

- Respeitar `prefers-reduced-motion`: sem animação para quem pediu menos movimento.
- Só `transform` e `opacity`; nada que mexa no layout.
- Animação nunca atrasa a leitura do conteúdo.
- Durações e curvas como tokens em `css/variaveis.css` (ex.: `--duracao-rapida`, `--curva-saida`).
- Bibliotecas só do cdnjs; carregar GSAP e lottie-web só nas telas que usam.
- Testar em 390 px e 1280 px.

## Ligações

- Análise completa no Drive: Claude/Ferramentas e Apps/2026-10-20 – Skills de animação para o Claude (8 repositórios).

## Pedido para o Claude Code

```
Aplique as animações do site seguindo este arquivo:
- antes, abra o GitHub de cada skill listada e confirme licença e comando de instalação; me mostre e espere o ok;
- instale só a skill animate (e o text-to-lottie numa pasta de teste separada) na pasta .claude/skills deste projeto;
- crie os tokens de movimento em css/variaveis.css e um módulo js/modules/movimento.js que respeite prefers-reduced-motion;
- anime a entrada dos cartões, os botões e a troca de rota, sem mexer no layout;
- não instale GSAP agora; só se eu pedir a página de álbum com rolagem;
- rode o site e me mostre em 390 px e 1280 px, com e sem "reduzir movimento".
Depois do meu ok: commit (feat(ui): animações...), status publicado, mover para processadas/ e registrar em docs/registro-de-publicacoes.md.
```
