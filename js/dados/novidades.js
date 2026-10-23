// Novidades: a pilha de publicações do site. A mais nova aparece primeiro, sozinha:
// o site ordena pela data. Para publicar, ACRESCENTE uma entrada no fim da lista
// (não precisa mexer na ordem). No mesmo dia, a que estiver mais abaixo aparece primeiro.
//
// Passo a passo para quem publica (Claude ou ChatGPT/Codex): docs/07-novidades.md.
//
// Campos:
//   slug       obrigatório. Minúsculas, sem acento, com hífen. Único.
//   data       obrigatório. 'AAAA-MM-DD' (dia da publicação).
//   tema       obrigatório. 'tecnologia' | 'musica' | 'palavra' | 'site'.
//   titulo     obrigatório. Curto.
//   resumo     obrigatório. Uma ou duas frases (aparece no cartão).
//   rota       opcional. Se a novidade só aponta para uma página que já existe no site
//              (ex.: '#/musica/o-despertar-do-justo'), use rota e deixe paragrafos vazio.
//   paragrafos opcional. Texto da página própria (#/novidades/<slug>). Cada item é um parágrafo.
//              "## " no começo vira subtítulo; "- " no começo vira item de lista.
//   links      opcional. [{ rotulo, url }] (links úteis para o leitor).
//   fontes     opcional. [{ rotulo, url }] (de onde veio a informação; obrigatório em tecnologia).
//   conferidoEm opcional. 'AAAA-MM-DD' (quando as fontes foram conferidas).
//   arte       opcional. 'pendente' enquanto o carrossel não chegou (a novidade entra no ar sem imagem).
//   carrossel  opcional. { capa, post, cards: [{ src, alt }] }. Imagens em imagens/novidades/<slug>/.

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
];

// Mais nova primeiro; no mesmo dia, a que foi acrescentada por último vem antes.
export const novidades = lista
  .map((n, i) => ({ ...n, _ordem: i }))
  .sort((a, b) => (a.data === b.data ? b._ordem - a._ordem : b.data.localeCompare(a.data)));

export const buscarNovidade = (slug) => novidades.find((n) => n.slug === slug);

// Para onde o cartão leva: a página que já existe (rota) ou a página própria da novidade.
export const rotaNovidade = (n) => n.rota || `#/novidades/${encodeURIComponent(n.slug)}`;
