// Novidades: a pilha de publicações do site. A mais nova aparece primeiro, sozinha:
// o site ordena pela data. Para publicar, ACRESCENTE uma entrada no fim da lista
// (não precisa mexer na ordem). No mesmo dia, a que estiver mais abaixo aparece primeiro.
//
// Passo a passo para quem publica (Claude ou ChatGPT/Codex): docs/07-novidades.md.
//
// REGRA (23/10/2026): a página é o CONTEÚDO COMPLETO para leitura (o documento pesquisado
// e escrito), não o carrossel. Não colocar os cards do Instagram no site. Imagem só quando
// ajudar a explicar, no meio do texto (objeto { imagem, alt, legenda } em paragrafos).
//
// Campos:
//   slug       obrigatório. Minúsculas, sem acento, com hífen. Único.
//   data       obrigatório. 'AAAA-MM-DD' (dia da publicação).
//   tema       obrigatório. 'tecnologia' | 'musica' | 'palavra' | 'site'.
//   titulo     obrigatório. Curto.
//   resumo     obrigatório. Uma ou duas frases (aparece no cartão).
//   rota       opcional. Se a novidade só aponta para uma página que já existe no site
//              (ex.: '#/musica/o-despertar-do-justo'), use rota e deixe paragrafos vazio.
//   paragrafos o texto completo da página (#/novidades/<slug>). Cada item da lista é:
//              - um parágrafo comum;
//              - "## Título" → subtítulo (pode começar com um emoji como ícone: "## ⚙️ Ambientes");
//              - "- item" → item de lista (itens seguidos ficam na mesma lista);
//              - "> texto" → destaque (caixa com borda, para um resumo ou um aviso importante);
//              - { imagem: 'imagens/novidades/<slug>/nome.webp', alt: 'o que a imagem mostra', legenda: 'opcional' }.
//   links      opcional. [{ rotulo, url }] (links úteis, inclusive o post do Instagram, se houver).
//   fontes     opcional. [{ rotulo, url }] (de onde veio a informação; obrigatório em tecnologia).
//   conferidoEm opcional. 'AAAA-MM-DD' (quando as fontes foram conferidas).
//   carrossel  LEGADO: só a novidade do Claude Code (23/10/2026) usa. Não usar nas novas.

export const temasNovidade = {
  tecnologia: 'Tecnologia',
  musica: 'Música',
  palavra: 'Palavra',
  site: 'Site',
};

const lista = [
  {
    slug: 'quatro-pregacoes-novas',
    data: '2026-10-21',
    tema: 'palavra',
    titulo: 'Quatro pregações novas na Palavra',
    resumo: 'Salmo 73, o mistério dos machados (Salmo 74), Salmo 94 e Melquisedeque (Hebreus 7), ponto a ponto.',
    rota: '#/palavra',
  },
  {
    slug: 'letras-despertar-e-inabalavel',
    data: '2026-10-21',
    tema: 'musica',
    titulo: 'Letras de O Despertar do Justo e O Reino Inabalável',
    resumo: 'Agora dá para ler a letra de cada faixa dos dois álbuns, direto na página do álbum.',
    rota: '#/musica/o-despertar-do-justo',
  },
  {
    slug: 'nova-pagina-novidades',
    data: '2026-10-23',
    tema: 'site',
    titulo: 'Nova página: Novidades',
    resumo: 'Tudo o que entra no site, num lugar só, com o mais novo sempre em cima.',
    paragrafos: [
      'A partir de hoje, cada coisa nova que eu publicar aqui aparece nesta página, em pilha: a mais recente fica em primeiro lugar.',
      '## O que vai aparecer',
      '- Tecnologia: novidades de IA e programação, explicadas sem exagero e com fonte.',
      '- Música: lançamentos e letras novas.',
      '- Palavra: pregações e reflexões novas.',
      'Dá para filtrar pelo tema no topo da página.',
    ],
  },
  {
    "slug": "claude-code-outubro-2026",
    "data": "2026-10-23",
    "titulo": "Claude Code: mais controle para criar com IA",
    "resumo": "Painel de sessão, ambientes salvos e tarefas vinculadas estão entre os destaques de outubro. Veja como organizar o desenvolvimento com mais clareza.",
    "paragrafos": [
      "Reuni neste carrossel oito cards sobre recursos do Claude Code e um jeito prático de aproveitá-los nos projetos. O foco é organizar o trabalho, acompanhar alterações e revisar o resultado.",
      "## O que mudou no aplicativo",
      "As notas do Claude Desktop de 15 de outubro de 2026, versão 2.42304.0, registram um painel lateral de sessão, ambientes salvos, sessões aninhadas locais e SSH e controles de Pull Request no cartão de alterações. Essa é uma referência da atualização, não a versão mais recente disponível.",
      "## Escolha onde trabalhar",
      "Salve destinos como uma pasta local, um host SSH, a nuvem ou uma máquina com Remote Control. O painel reúne ambiente, contexto, alterações e tarefas. A disponibilidade varia por versão e implantação.",
      "## Separe tarefas sem perder o fio",
      "Nas sessões locais e SSH, uma tarefa pode seguir em uma sessão vinculada e devolver o resultado à original. Cada sessão faz suas próprias requisições e consome uso. Isso não configura automaticamente uma equipe autônoma.",
      "## Instruções do projeto com AGENTS.md",
      "O suporte direto a AGENTS.md começa no Claude Code 2.1.277. Pela regra padrão, ele é carregado quando não há CLAUDE.md nem CLAUDE.local.md na pasta de trabalho ou acima dela. Configurações e limitações de versão podem mudar esse comportamento. Confira quais instruções a sessão realmente carregou.",
      "## Pull Request continua exigindo revisão",
      "Auto-fix e Merge when ready aparecem nos controles do PR. O auto-merge depende do GitHub e das regras do repositório. No Desktop, Merge when ready fica desativado em sessões SSH e WSL; nesses casos, configure a opção no GitHub.",
      "## Como eu aplicaria nos projetos",
      "- Definir uma tarefa com critério de conclusão.",
      "- Trabalhar em uma branch e, quando adequado, em um worktree separado.",
      "- Implementar, executar as verificações e revisar as alterações.",
      "- Registrar o próximo passo e abrir um Pull Request.",
      "Esse fluxo é uma proposta de uso. As ilustrações são conceituais, não capturas do aplicativo. Mais recursos ajudam quando o método deixa claro o que fazer e como conferir o resultado."
    ],
    "fontes": [
      {
        "rotulo": "Notas oficiais do Claude Desktop",
        "url": "https://claude.com/docs/cowork/changelog"
      },
      {
        "rotulo": "Claude Code no Desktop",
        "url": "https://code.claude.com/docs/en/desktop"
      },
      {
        "rotulo": "Instruções do projeto e AGENTS.md",
        "url": "https://code.claude.com/docs/en/memory"
      }
    ],
    "conferidoEm": "2026-10-23",
    "tema": "tecnologia",
    "links": [
      {
        "rotulo": "Documentação do Claude Code",
        "url": "https://code.claude.com/docs/en/desktop"
      }
    ],
    "carrossel": {
      "capa": "imagens/novidades/claude-code-outubro-2026/card-01.webp",
      "cards": [
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-01.webp",
          "alt": "CLAUDE CODE. NOVA FASE. MAIS CONTROLE PARA CRIAR. Novidades para quem programa com IA. OUTUBRO 2026"
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-02.webp",
          "alt": "VEJA O QUE ESTÁ ACONTECENDO. O painel lateral reúne ambiente, contexto, alterações e tarefas da sessão. NA PRÁTICA. Mais visibilidade para acompanhar o trabalho. E para retomar o projeto certo?"
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-03.webp",
          "alt": "SEU PROJETO, SEU AMBIENTE. Salve onde trabalhar: pasta local, SSH, nuvem ou uma máquina com Remote Control. NA PRÁTICA. Retome o ambiente com suas opções de branch e worktree. Agora, dá para separar tarefas."
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-04.webp",
          "alt": "UMA CONVERSA, TAREFAS SEPARADAS. Nas sessões locais e SSH, o Claude pode abrir uma tarefa em uma sessão vinculada e trazer o resultado. SESSÕES ANINHADAS. Cada sessão faz suas próprias requisições e consome uso. E como acompanhar o Pull Request?"
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-05.webp",
          "alt": "SEU PULL REQUEST. MAIS À VISTA. Os controles do PR ficam no cartão de alterações, com Auto-fix e Merge when ready. ATENÇÃO AO PROJETO. O merge depende das regras e da configuração do repositório. As instruções também evoluíram."
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-06.webp",
          "alt": "MENOS REPETIÇÃO. COM AGENTS.md. O Claude Code pode carregar AGENTS.md quando não há CLAUDE.md ou CLAUDE.local.md na pasta ou acima dela. REQUER VERSÃO COMPATÍVEL. O suporte direto começa no Claude Code 2.1.277. O ganho aparece no seu método."
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-07.webp",
          "alt": "TRANSFORME RECURSOS. EM UM MÉTODO. Defina a tarefa. Isole a branch. Implemente. Teste. Revise o PR. EXEMPLO: UM NOVO PAINEL. Use instruções claras e registre o próximo passo. A disponibilidade varia por versão, ambiente e implantação. Mais organização para criar melhor."
        },
        {
          "src": "imagens/novidades/claude-code-outubro-2026/card-08.webp",
          "alt": "SAIBA MAIS. NO LINK DA BIO. Comente e compartilhe com quem precisa ver isso. Qual recurso você quer testar primeiro? IA e tecnologia com aplicação prática."
        }
      ]
    }
  },
  {
    "slug": "prompt-motion",
    "data": "2026-10-24",
    "tema": "tecnologia",
    "titulo": "Prompt Motion: animações com IA e os prompts por trás delas",
    "resumo": "Uma galeria para estudar vídeos animados, adaptar prompts e entender como o código vira MP4. O acesso às referências é gratuito; a produção depende das ferramentas usadas.",
    "paragrafos": [
      "> Você pode consultar referências e adaptar prompts gratuitamente. Para produzir o vídeo, ainda precisa de uma IA e de um ambiente que execute e renderize o código.",
      "O Prompt Motion reúne vídeos de motion design: animações de letras, formas, interfaces e cenas. Cada entrada apresenta o criador e o prompt ou a skill associada. A proposta é aprender com o pedido que levou ao resultado, em vez de ver só o vídeo final.",
      "## 🎬 O que tem na galeria",
      "Há categorias como interfaces de produto, celular, gráficos, diagramas, tipografia, formas, partículas, personagens, fotos, música e código. A apresentação do site associa a coleção ao Claude Opus 5.5. Essa é a descrição do catálogo, não uma garantia de que qualquer prompt terá o mesmo resultado em outro modelo ou ambiente.",
      "Os vídeos e os prompts pertencem aos respectivos criadores, identificados nas entradas. Consultar a galeria não transfere os direitos sobre esses materiais. Para divulgar uma referência, prefira o link e o crédito ao autor.",
      "## ✏️ Adaptar um prompt ao seu projeto",
      "O personalizador permite partir de uma referência e informar objetivo, formato, cores e outros detalhes. Segundo a página oficial, ele é gratuito e os dados preenchidos ficam no navegador.",
      "Na conferência de 24/10/2026, havia modelos de showreel e de animação 3D; outros formatos eram anunciados como futuros. Showreel é uma demonstração curta de técnicas e estilo. O blog também analisa pedidos e formas de construir as animações.",
      "## ⚙️ Como o código vira vídeo",
      "Nesse fluxo, a IA escreve código que desenha cada quadro. Um renderizador transforma a sequência em um arquivo de vídeo. A galeria reúne exemplos com HTML, Remotion, HyperFrames e Three.js; o método precisa estar definido no pedido.",
      "No caminho com HTML, uma função como window.seek(t) calcula a cena para um instante exato. O Playwright abre a página e captura os quadros; o FFmpeg os transforma em MP4. Isso permite revisar momentos específicos e repetir a renderização.",
      "O modelo de showreel pede um roteiro antes da construção, animação calculada pelo tempo e revisão de quadros antes da exportação. Também inclui trilha criada em código. Portanto, esse processo pode ter áudio; a trilha escolhida para cada projeto é uma decisão separada.",
      "O site recomenda Opus 5.5 com esforço máximo para esse modelo. É uma recomendação do autor do template, não uma exigência técnica universal para animar HTML.",
      "## 🧪 Nosso teste com o Tratado de Romanos",
      "No teste registrado com o Claude, foi criada uma vinheta vertical de 15 segundos do Tratado de Romanos, usando HTML e renderização para MP4. A entrega foi sem som, para receber depois a trilha da minha música criada com IA.",
      "Esse registro descreve o teste anterior com o Claude. A revisão deste artigo não inclui um novo teste de geração no ChatGPT nem uma comparação de qualidade entre os dois.",
      "## 💰 O que é gratuito e o que pode custar",
      "A consulta às páginas e o personalizador estavam disponíveis sem assinatura na conferência. O site também oferece espaços pagos de patrocínio para empresas; isso é separado do uso das referências.",
      "Executar os prompts pode consumir o plano ou a API da IA escolhida. Renderizar exige um ambiente com as dependências necessárias e tempo de processamento. Acesso gratuito ao prompt não significa produção inteira sem custo.",
      "## ⚠️ Limites e como começar",
      "- Escolha uma referência e defina objetivo, duração, proporção, textos e identidade visual antes de pedir a animação.",
      "- Informe no pedido como o resultado será construído e renderizado. Para o caminho com HTML, especifique a função de tempo, Playwright e FFmpeg.",
      "- Confira alguns quadros antes de exportar: textos, acentos, sobreposições, ritmo e legibilidade no celular.",
      "- Um chat capaz de escrever HTML pode não ter o ambiente necessário para entregar um MP4. Nesse caso, a renderização precisa acontecer em outro ambiente.",
      "- O exemplo serve para orientar o processo. O resultado depende da direção visual, do código, das ferramentas e da revisão.",
      "Para meus projetos, a aplicação que quero explorar é uma vinheta de álbum ou um Reels vertical que possa ser atualizado trocando textos e imagens. A galeria ajuda a formular o pedido; a entrega final ainda precisa ser conferida."
    ],
    "links": [
      {
        "rotulo": "Explorar a galeria",
        "url": "https://prompt-motion.com/"
      },
      {
        "rotulo": "Personalizar um prompt",
        "url": "https://prompt-motion.com/customize"
      },
      {
        "rotulo": "Ver os modelos",
        "url": "https://prompt-motion.com/templates"
      }
    ],
    "fontes": [
      {
        "rotulo": "Prompt Motion: apresentação e categorias",
        "url": "https://prompt-motion.com/"
      },
      {
        "rotulo": "Personalizador: gratuidade, dados e modelos",
        "url": "https://prompt-motion.com/customize"
      },
      {
        "rotulo": "Modelo de showreel e renderização",
        "url": "https://prompt-motion.com/templates/showreel"
      },
      {
        "rotulo": "Comparação dos métodos de renderização",
        "url": "https://prompt-motion.com/blog/remotion-vs-hyperframes"
      },
      {
        "rotulo": "Patrocínio: oferta comercial separada",
        "url": "https://prompt-motion.com/sponsor"
      }
    ],
    "conferidoEm": "2026-10-24"
  },
];

// Mais nova primeiro; no mesmo dia, a que foi acrescentada por último vem antes.
export const novidades = lista
  .map((n, i) => ({ ...n, _ordem: i }))
  .sort((a, b) => (a.data === b.data ? b._ordem - a._ordem : b.data.localeCompare(a.data)));

export const buscarNovidade = (slug) => novidades.find((n) => n.slug === slug);

// Para onde o cartão leva: a página que já existe (rota) ou a página própria da novidade.
export const rotaNovidade = (n) => n.rota || `#/novidades/${encodeURIComponent(n.slug)}`;
