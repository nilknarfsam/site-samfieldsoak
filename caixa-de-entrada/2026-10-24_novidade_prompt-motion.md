---
tipo: novidade
status: em-producao
data: 2026-10-24
tema: tecnologia
slug: prompt-motion
origem: Claude
revisado-por: Codex
publicado:
---

# Prompt Motion: animações com IA e os prompts por trás delas

## Resumo

Uma galeria para estudar vídeos animados, adaptar prompts e entender como o código vira MP4. O acesso às referências é gratuito; a produção depende das ferramentas usadas.

## Página do site

Rota: #/novidades/prompt-motion

> Você pode consultar referências e adaptar prompts gratuitamente. Para produzir o vídeo, ainda precisa de uma IA e de um ambiente que execute e renderize o código.

O Prompt Motion reúne vídeos de motion design: animações de letras, formas, interfaces e cenas. Cada entrada apresenta o criador e o prompt ou a skill associada. A proposta é aprender com o pedido que levou ao resultado, em vez de ver só o vídeo final.

## 🎬 O que tem na galeria

Há categorias como interfaces de produto, celular, gráficos, diagramas, tipografia, formas, partículas, personagens, fotos, música e código. A apresentação do site associa a coleção ao Claude Opus 5.5. Essa é a descrição do catálogo, não uma garantia de que qualquer prompt terá o mesmo resultado em outro modelo ou ambiente.

Os vídeos e os prompts pertencem aos respectivos criadores, identificados nas entradas. Consultar a galeria não transfere os direitos sobre esses materiais. Para divulgar uma referência, prefira o link e o crédito ao autor.

## ✏️ Adaptar um prompt ao seu projeto

O personalizador permite partir de uma referência e informar objetivo, formato, cores e outros detalhes. Segundo a página oficial, ele é gratuito e os dados preenchidos ficam no navegador.

Na conferência de 24/10/2026, havia modelos de showreel e de animação 3D; outros formatos eram anunciados como futuros. Showreel é uma demonstração curta de técnicas e estilo. O blog também analisa pedidos e formas de construir as animações.

## ⚙️ Como o código vira vídeo

Nesse fluxo, a IA escreve código que desenha cada quadro. Um renderizador transforma a sequência em um arquivo de vídeo. A galeria reúne exemplos com HTML, Remotion, HyperFrames e Three.js; o método precisa estar definido no pedido.

No caminho com HTML, uma função como window.seek(t) calcula a cena para um instante exato. O Playwright abre a página e captura os quadros; o FFmpeg os transforma em MP4. Isso permite revisar momentos específicos e repetir a renderização.

O modelo de showreel pede um roteiro antes da construção, animação calculada pelo tempo e revisão de quadros antes da exportação. Também inclui trilha criada em código. Portanto, esse processo pode ter áudio; a trilha escolhida para cada projeto é uma decisão separada.

O site recomenda Opus 5.5 com esforço máximo para esse modelo. É uma recomendação do autor do template, não uma exigência técnica universal para animar HTML.

## 🧪 Nosso teste com o Tratado de Romanos

No teste registrado com o Claude, foi criada uma vinheta vertical de 15 segundos do Tratado de Romanos, usando HTML e renderização para MP4. A entrega foi sem som, para receber depois a trilha da minha música criada com IA.

Esse registro descreve o teste anterior com o Claude. A revisão deste artigo não inclui um novo teste de geração no ChatGPT nem uma comparação de qualidade entre os dois.

## 💰 O que é gratuito e o que pode custar

A consulta às páginas e o personalizador estavam disponíveis sem assinatura na conferência. O site também oferece espaços pagos de patrocínio para empresas; isso é separado do uso das referências.

Executar os prompts pode consumir o plano ou a API da IA escolhida. Renderizar exige um ambiente com as dependências necessárias e tempo de processamento. Acesso gratuito ao prompt não significa produção inteira sem custo.

## ⚠️ Limites e como começar

- Escolha uma referência e defina objetivo, duração, proporção, textos e identidade visual antes de pedir a animação.

- Informe no pedido como o resultado será construído e renderizado. Para o caminho com HTML, especifique a função de tempo, Playwright e FFmpeg.

- Confira alguns quadros antes de exportar: textos, acentos, sobreposições, ritmo e legibilidade no celular.

- Um chat capaz de escrever HTML pode não ter o ambiente necessário para entregar um MP4. Nesse caso, a renderização precisa acontecer em outro ambiente.

- O exemplo serve para orientar o processo. O resultado depende da direção visual, do código, das ferramentas e da revisão.

Para meus projetos, a aplicação que quero explorar é uma vinheta de álbum ou um Reels vertical que possa ser atualizado trocando textos e imagens. A galeria ajuda a formular o pedido; a entrega final ainda precisa ser conferida.

## Links úteis

- [Explorar a galeria](https://prompt-motion.com/)
- [Personalizar um prompt](https://prompt-motion.com/customize)
- [Ver os modelos](https://prompt-motion.com/templates)

## Fontes

- [Prompt Motion: apresentação e categorias](https://prompt-motion.com/)
- [Personalizador: gratuidade, dados e modelos](https://prompt-motion.com/customize)
- [Modelo de showreel e renderização](https://prompt-motion.com/templates/showreel)
- [Comparação dos métodos de renderização](https://prompt-motion.com/blog/remotion-vs-hyperframes)
- [Patrocínio: oferta comercial separada](https://prompt-motion.com/sponsor)

Conferido em: 2026-10-24

## Situação editorial

Conteúdo preparado em branch para PR. Aguardando aprovação e merge; ainda não publicado.

Validação: importação do módulo, slug único, ordenação, template, links, fontes, data e escape de HTML conferidos. Validação visual em 390px/1280px e console no navegador pendentes: Chromium ausente e download falhou neste ambiente. Abrir PR em rascunho até essa conferência.
