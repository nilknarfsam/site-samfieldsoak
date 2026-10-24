// IA sem lábia: uma entrada por ferramenta ou tema (modelo em docs/02-arquitetura.md).
// Preços e números sempre com data (conferidoEm). Status: analisado | testado | em-uso.

export const ferramentas = [
  {
    slug: 'instagram-claude-parceria',
    titulo: 'O Instagram se conecta com o Claude?',
    faixa: 'Instagram',
    categoria: 'instagram',
    status: 'analisado', analisadoEm: '2026-10-20', conferidoEm: '2026-10-20',
    resumo: 'Não houve parceria oficial entre Meta e Anthropic. O que existe são conectores de terceiros que usam a API oficial da Meta.',
    aviso: 'Não houve parceria oficial. A integração é feita por conectores de terceiros que você adiciona no Claude (Configurações → Conectores → conector personalizado).',
    promete: [
      '"ÚLTIMA HORA: agora o Instagram se conecta com o Claude", com foto de aperto de mão entre executivos.',
    ],
    verdade: [
      'Não há anúncio oficial Meta + Anthropic.',
      'Existem conectores MCP de empresas terceiras que usam a API oficial da Meta.',
    ],
    quemFaz: [
      { tarefa: 'Métricas e agendamento', servicos: 'Metricool', obs: 'tem plano gratuito' },
      { tarefa: 'Comentário → DM e caixa de entrada', servicos: 'ChatPlace, Inrō', obs: 'pagos para uso real; a Inrō tem plano grátis bem limitado' },
      { tarefa: 'Publicação', servicos: 'Blotato, Markifact' },
    ],
    requisitos: [
      'Conta Instagram Profissional (Criador ou Empresa) ligada a uma Página do Facebook.',
    ],
    tituloNaoConta: 'Onde a propaganda engana',
    naoConta: [
      '"Sem mensalidade": os conectores de DM costumam ser pagos; o grátis exige criar app na Meta e servidor próprio.',
      '"Responde todas as DMs": a Meta só deixa responder até 24h após a última mensagem da pessoa.',
      '"Sem risco": pela API oficial, sim. Mas servidores do GitHub que pedem login e senha do Instagram violam os termos e podem derrubar a conta. Nunca cole token/chave fora do painel oficial.',
    ],
    custos: [
      { ferramenta: 'Metricool', plano: 'Grátis', preco: 'R$ 0', obs: 'o conector com o Claude funciona em todos os planos, inclusive no grátis (segundo a Metricool)' },
      { ferramenta: 'Inrō', plano: 'Free', preco: '€ 0', obs: 'até 100 contatos ativados por mês e 3 automações' },
      { ferramenta: 'Inrō', plano: 'Pro', preco: '€ 12,99', periodo: 'por mês' },
      { ferramenta: 'ChatPlace', plano: 'a partir de', preco: 'US$ 20', periodo: 'por mês', obs: 'valor informado no blog da própria ChatPlace' },
    ],
    caminhoGratis: [
      'Comece pelo Metricool, que tem plano gratuito, antes de pagar qualquer coisa.',
    ],
    tituloComoComecar: 'O jeito certo',
    comoComecar: [
      'Ative a conta profissional.',
      'Escolha um serviço parceiro da Meta.',
      'Adicione o conector no Claude.',
      'Comece pelo gratuito (Metricool) antes de pagar qualquer coisa.',
    ],
    links: [
      { rotulo: 'Metricool', url: 'https://metricool.com' },
      { rotulo: 'ChatPlace', url: 'https://chatplace.io' },
      { rotulo: 'Inrō', url: 'https://www.inro.social' },
      { rotulo: 'Blotato', url: 'https://www.blotato.com' },
      { rotulo: 'Markifact', url: 'https://markifact.com' },
    ],
    fontes: [
      { rotulo: 'metricool.com/connect-claude-to-instagram', url: 'https://metricool.com/connect-claude-to-instagram/' },
      { rotulo: 'markifact.com/blog/post-to-instagram-with-claude', url: 'https://markifact.com/blog/post-to-instagram-with-claude' },
      { rotulo: 'blog.chatplace.io', url: 'https://blog.chatplace.io' },
      { rotulo: 'instantdm.com', url: 'https://instantdm.com' },
      { rotulo: 'databloo.com', url: 'https://databloo.com' },
      { rotulo: 'inro.social/pricing (preços)', url: 'https://www.inro.social/pricing' },
    ],
    relacionadas: ['verdades-ia-instagram', 'ootto'],
    carrossel: {
      capa: 'imagens/ia/instagram-claude-parceria/card-01.webp',
      post: '',
      cards: [
        { src: 'imagens/ia/instagram-claude-parceria/card-01.webp', alt: 'O Instagram NÃO fez parceria com o Claude. Vi esse post rodando por aí. Vamos aos fatos.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-02.webp', alt: 'Última hora? Não existe anúncio oficial entre a Meta e a Anthropic. Aperto de mão no palco sem link de fonte é sinal de alerta.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-03.webp', alt: 'O que existe de verdade: conectores de empresas terceiras ligam o Claude ao Instagram pela API oficial da Meta. Ex.: Metricool, ChatPlace, Blotato.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-04.webp', alt: 'Sem mensalidade? Os conectores de DM costumam ser pagos. De graça só criando um app na Meta e um servidor próprio. Trabalho de programador.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-05.webp', alt: 'Responde TODAS as DMs? Só até 24h depois da última mensagem da pessoa. Regra da Meta. E só em conta Profissional ligada a uma Página do Facebook.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-06.webp', alt: 'Sem risco pra conta? Pela API oficial, não há risco. Mas tutorial que pede seu login e senha do Instagram viola os termos e pode derrubar a conta.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-07.webp', alt: 'O jeito certo: 1. Ative a conta profissional. 2. Escolha um parceiro oficial da Meta. 3. No Claude: Configurações → Conectores. 4. Comece pelo grátis antes de pagar.' },
        { src: 'imagens/ia/instagram-claude-parceria/card-08.webp', alt: 'A ferramenta é boa. A propaganda é que exagera. Saiba mais no link da bio. Comente e compartilhe.' },
      ],
    },
  },
  {
    slug: 'verdades-ia-instagram',
    titulo: 'Ligar a IA no seu Instagram: as verdades que ninguém conta',
    faixa: 'IA',
    categoria: 'instagram',
    status: 'analisado', analisadoEm: '2026-10-20', conferidoEm: '2026-10-20',
    resumo: 'Antes de assinar uma ferramenta que promete "colocar a IA para tocar o seu Instagram", veja o que ela faz de verdade e o que o post deixa de fora.',
    promete: [
      'A IA posta, responde e vende sozinha no seu Instagram.',
      '"Skills grátis" que fazem tudo por você.',
    ],
    verdade: [
      'Os conectores existem e usam o login oficial do Instagram.',
      'Ajudam a ver métricas, organizar respostas, planejar e agendar posts.',
      'As skills de legenda, carrossel e hashtags são úteis como roteiro para quem já usa o Claude.',
    ],
    naoConta: [
      'A maioria das ferramentas é paga, em dólar, por semana ou por mês, e o preço quase nunca aparece no post.',
      'Precisa de conta Profissional do Instagram. Com conta pessoal, a ferramenta não posta nem responde comentários.',
      'A IA não fecha venda sozinha: ela responde dentro das regras que você escrever. Sem regras, responde besteira em seu nome.',
      'Os números do print são da conta de quem vende a ferramenta, não da sua.',
      '"Grátis" muitas vezes é só a skill: o Claude Code pede plano pago ou chave de API, e postar sozinho ou analisar dados passa por serviços pagos.',
    ],
    custos: [
      { ferramenta: 'Ootto', plano: 'Weekly', preco: 'US$ 10', periodo: 'por semana' },
      { ferramenta: 'Ootto', plano: 'Self-serve', preco: 'US$ 48', periodo: 'por mês' },
      { ferramenta: 'instagram-skills', plano: 'skills', preco: 'grátis (MIT)', obs: 'exige Claude pago ou API; postagem automática via serviço pago' },
    ],
    paraQuem: ['Quem já posta com frequência e quer ganhar tempo com métricas, respostas e agendamento.'],
    naoServePara: ['Quem espera que a IA venda sozinha, sem acompanhar.', 'Quem ainda não tem conta Profissional.'],
    caminhoGratis: ['Meta Business Suite: agenda posts e mostra métricas sem custo.'],
    perguntas: [
      'Quanto custa em real, com impostos e câmbio?',
      'Quem aprova o que é postado ou respondido?',
      'Dá para cancelar quando quiser?',
    ],
    links: [
      { rotulo: 'Ootto', url: 'https://ootto.ai' },
      { rotulo: 'instagram-skills', url: 'https://github.com/sergebulaev/instagram-skills' },
      { rotulo: 'Meta Business Suite', url: 'https://business.facebook.com' },
    ],
    relacionadas: ['ootto', 'instagram-skills', 'instagram-claude-parceria'],
    carrossel: { capa: '', post: '', cards: [] },   // capa_v02.png ainda não chegou na caixa de entrada
  },
  {
    slug: 'ootto',
    titulo: 'Ootto: conector do Instagram para o Claude',
    faixa: 'Ootto',
    categoria: 'instagram',
    status: 'analisado', analisadoEm: '2026-10-20', conferidoEm: '2026-10-20',
    resumo: 'Conector MCP que liga o Claude ao Instagram: painel de métricas, caixa de entrada, agendamento e comentário-para-DM.',
    verdade: ['Conector MCP (endereço mcp.ootto.ai/mcp) que liga o Claude ao Instagram: painel de métricas, caixa de entrada, agendamento e comentário-para-DM.'],
    naoConta: ['É pago, em dólar.', 'Exige conta Profissional do Instagram.', 'A configuração é feita pelo computador.'],
    custos: [
      { plano: 'Weekly', preco: 'US$ 10', periodo: 'por semana', obs: 'até 16 reels por semana, 1 marca' },
      { plano: 'Self-serve', preco: 'US$ 48', periodo: 'por mês', obs: 'até 100 reels por mês' },
      { plano: 'Starter (feito por eles)', preco: 'US$ 199', periodo: 'por mês' },
      { plano: 'Done-for-you', preco: 'US$ 499', periodo: 'por mês' },
    ],
    caminhoGratis: ['A própria empresa publica skills grátis (licença MIT) no GitHub: Ootto-AI/claude-content-skills.'],
    links: [
      { rotulo: 'ootto.ai', url: 'https://ootto.ai' },
      { rotulo: 'Skills grátis no GitHub', url: 'https://github.com/Ootto-AI/claude-content-skills' },
    ],
    relacionadas: ['verdades-ia-instagram', 'instagram-skills'],
    carrossel: { capa: '', post: '', cards: [] },
  },
  {
    slug: 'instagram-skills',
    titulo: 'instagram-skills: as "9 skills grátis"',
    faixa: '9 skills grátis',
    categoria: 'instagram',
    status: 'analisado', analisadoEm: '2026-10-20', conferidoEm: '2026-10-20',
    resumo: 'Repositório real com 9 skills para o Claude planejar e escrever conteúdo de Instagram. As skills são grátis; a ferramenta, não.',
    promete: ['9 skills grátis que colocam o Claude para tocar seu Instagram.'],
    verdade: [
      'Repositório real (sergebulaev/instagram-skills, licença MIT, cerca de 536 estrelas em 20/10/2026).',
      'Skills de legenda, carrossel, gancho, hashtags, "humanizador", plano semanal, reaproveitamento de posts, revisão de perfil e análise de público.',
    ],
    naoConta: [
      'As skills são grátis, a ferramenta não: o Claude Code pede plano pago ou chave de API.',
      'Postar sozinho depende de um serviço comercial (Publora).',
      'A análise de público usa a Apify (precisa de token).',
      'As regras de escrita são em inglês.',
    ],
    paraQuem: ['Quem já usa o Claude e quer um roteiro pronto para legendas e planejamento.'],
    comoComecar: [
      'No Claude Code: `/plugin marketplace add sergebulaev/instagram-skills`',
      'Depois: `/plugin install instagram-skills@instagram-skills`',
      'No claude.ai: Skills → Add from GitHub.',
    ],
    links: [{ rotulo: 'Repositório no GitHub', url: 'https://github.com/sergebulaev/instagram-skills' }],
    relacionadas: ['verdades-ia-instagram', 'ootto'],
    carrossel: { capa: '', post: '', cards: [] },
  },
];

export const buscarFerramenta = (slug) => ferramentas.find((f) => f.slug === slug);
