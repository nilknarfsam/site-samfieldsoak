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
{
  "slug": "otimizadores-de-pc",
  "titulo": "Otimizadores de PC: o que é marketing e o que funciona",
  "faixa": "Otimizadores de PC",
  "categoria": "outros",
  "status": "analisado",
  "analisadoEm": "2026-11-11",
  "conferidoEm": "2026-11-11",
  "resumo": "Seu computador está lento. Antes de comprar um botão turbo, descubra o que está pesando: armazenamento, memória, programas na inicialização ou algum defeito. Limpeza e diagnóstico têm funções diferentes.",
  "aviso": "Guia para Windows 11, baseado em documentação pública. Não houve teste comparativo de marcas nem medição de ganho de desempenho.",
  "promete": [
    "Um clique para acelerar o computador, liberar RAM, corrigir o Registro e atualizar todos os drivers. O anúncio reúne tarefas diferentes como se fossem uma solução única para qualquer lentidão.",
    "Alguns programas cobram pela conveniência de reunir ferramentas e automatizar tarefas. Isso pode ter valor, mas uma tela cheia de alertas não demonstra que o computador ficou mais rápido."
  ],
  "verdade": [
    "Armazenamento é onde ficam os arquivos; RAM é a memória usada pelos programas em execução; processador executa as tarefas. Apagar um arquivo libera espaço no disco, mas não acrescenta RAM nem aumenta a capacidade do processador.",
    "Pouco espaço disponível, aplicativos iniciando junto com o Windows e tarefas em segundo plano podem afetar o desempenho. Corrigir a causa pode ajudar; a melhora depende do problema e do equipamento.",
    "O Windows já oferece Gerenciador de Tarefas, configurações de armazenamento e ferramentas de otimização de unidades. Conhecer essas opções ajuda a avaliar o que uma assinatura realmente acrescenta."
  ],
  "quemFaz": [
    {
      "tarefa": "Descobrir o que está consumindo recursos",
      "servicos": "Gerenciador de Tarefas",
      "obs": "Observe CPU, memória e disco durante a atividade que fica lenta. Uma leitura isolada não fecha diagnóstico."
    },
    {
      "tarefa": "Revisar espaço ocupado",
      "servicos": "Armazenamento e arquivos temporários",
      "obs": "Confira as categorias e os arquivos antes de excluir. Limpar não deve significar perder documentos."
    },
    {
      "tarefa": "Cuidar das unidades",
      "servicos": "Desfragmentar e Otimizar Unidades",
      "obs": "O Windows aplica operações conforme o tipo de unidade: HDD e SSD não recebem exatamente o mesmo tratamento."
    }
  ],
  "tituloNaoConta": "O que um botão turbo não resolve",
  "naoConta": [
    "RAM livre não é um troféu. O sistema usa memória para programas e cache. Reduzir artificialmente a memória de um processo pode obrigá-lo a recuperar páginas depois, inclusive do disco. Um número menor no painel não comprova uma experiência melhor.",
    "O Registro armazena configurações importantes. Não trate alterações automáticas como faxina obrigatória: uma mudança incorreta pode causar falhas. Ter muitas entradas não basta para concluir que elas explicam a lentidão.",
    "Driver mais recente não significa driver correto para qualquer equipamento. Prefira Windows Update e, quando necessário, o fabricante do dispositivo ou do computador, verificando o modelo e a compatibilidade.",
    "Um SSD usa operações como TRIM; um HD pode ser desfragmentado. A ferramenta do Windows reconhece o tipo de unidade. Não é necessário desligar a otimização do sistema só porque o computador tem SSD.",
    "Apenas apagar temporários não corrige superaquecimento, falha de armazenamento nem falta de capacidade para o trabalho. Travamentos recorrentes, ruídos ou erros exigem diagnóstico antes de insistir em limpezas."
  ],
  "paraQuem": [
    "Quem quer investigar a lentidão antes de instalar mais um programa ou contratar uma assinatura.",
    "Quem precisa distinguir falta de espaço, excesso de tarefas e limites do equipamento."
  ],
  "naoServePara": [
    "Escolher uma marca por ranking: este artigo não fez comparação de produtos.",
    "Aplicar mudanças em computador de empresa sem seguir a orientação da equipe de TI."
  ],
  "caminhoGratis": [
    "Comece pelas ferramentas do Windows e registre o sintoma. Troque apenas uma coisa de cada vez para perceber o efeito.",
    "Se o objetivo for aprender, avalie se o curso ensina diagnóstico e explica riscos. Comprar aulas ou um aplicativo não garante que todo computador ficará mais rápido."
  ],
  "tituloComoComecar": "Checklist: descubra o problema antes de limpar",
  "comoComecar": [
    "Defina o sintoma: demora para ligar, abrir um aplicativo, navegar ou copiar arquivos? Anote quando começou e o que mudou. Lentidão da internet também pode envolver a conexão, não apenas o computador.",
    "Pressione `Ctrl + Shift + Esc` e observe o Gerenciador de Tarefas durante a atividade problemática. Veja quais aplicativos estão usando CPU, memória e disco; não encerre processos desconhecidos só pelo consumo.",
    "Em Configurações > Sistema > Armazenamento, revise os arquivos temporários e as recomendações de limpeza. Leia cada categoria, confira Downloads e mantenha cópia dos arquivos importantes antes de excluir.",
    "Revise os Aplicativos de Inicialização e desative somente os que você conhece e não precisa abrir ao ligar. Preserve proteção, drivers e ferramentas exigidas pela sua organização.",
    "Instale as atualizações adequadas pelo Windows Update e reinicie quando solicitado. Se precisar de um driver específico, use o canal oficial do fabricante correspondente ao modelo.",
    "Repita a mesma atividade e compare o resultado. Se persistir, investigue saúde do disco, temperatura e requisitos dos aplicativos com assistência técnica. A necessidade de SSD ou mais RAM deve sair do diagnóstico, não do anúncio."
  ],
  "perguntas": [
    "Qual problema concreto esse programa encontrou e como ele demonstrará a melhora?",
    "Posso revisar e desfazer as mudanças? Existe cópia de segurança antes de alterações importantes?",
    "O pagamento oferece algo de que preciso além das ferramentas disponíveis no Windows? Qual é o valor de renovação e como cancelo?"
  ],
  "fontes": [
    {
      "rotulo": "Microsoft — dicas para melhorar o desempenho do PC",
      "url": "https://support.microsoft.com/en-us/windows/experience/performance-optimization/tips-to-improve-pc-performance-in-windows"
    },
    {
      "rotulo": "Microsoft — ferramentas de configuração e cuidados com o Registro",
      "url": "https://support.microsoft.com/en-au/windows/experience/system-configuration-tools-in-windows"
    },
    {
      "rotulo": "Microsoft — atualizar drivers pelo Gerenciador de Dispositivos",
      "url": "https://support.microsoft.com/en-us/windows/hardware/drivers/update-drivers-through-device-manager-in-windows"
    },
    {
      "rotulo": "Microsoft — otimização de HDDs e SSDs",
      "url": "https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/defragment-optimize-your-data-drives-in-windows"
    },
    {
      "rotulo": "Microsoft Learn — memória e conjunto de trabalho dos processos",
      "url": "https://learn.microsoft.com/en-us/windows/win32/memory/working-set"
    }
  ],
  "relacionadas": [
    "precisa-pagar-antivirus"
  ]
},
{
  "slug": "precisa-pagar-antivirus",
  "titulo": "Você precisa pagar antivírus?",
  "faixa": "pagar antivírus",
  "categoria": "outros",
  "status": "analisado",
  "analisadoEm": "2026-11-11",
  "conferidoEm": "2026-11-11",
  "resumo": "O Windows já inclui antivírus. Uma assinatura pode acrescentar recursos úteis, mas a decisão deve considerar sua necessidade, a proteção ativa e o custo de renovação — não apenas o medo de ficar desprotegido.",
  "aviso": "Análise documental para usuários do Windows. Não é ranking de antivírus, teste de detecção ou garantia de proteção total.",
  "promete": [
    "Proteção completa para o computador e a família, navegação segura, privacidade e outros recursos no mesmo pacote. A oferta varia conforme a marca e o plano; não presuma que tudo está incluído.",
    "Campanhas podem sugerir que sem uma assinatura o Windows fica sem antivírus. Antes de aceitar essa conclusão, confira qual proteção está ativa no seu computador."
  ],
  "verdade": [
    "O Microsoft Defender Antivirus vem integrado ao Windows 11 e ao Windows 10. Para usar essa proteção integrada, não é preciso contratar Microsoft 365. Ela precisa estar funcionando e atualizada, dentro de um sistema que ainda receba as atualizações aplicáveis.",
    "Segurança do Windows é o aplicativo que reúne áreas como proteção contra vírus, firewall e segurança do dispositivo. Microsoft Defender Antivirus é o mecanismo antivírus integrado. Já o aplicativo Microsoft Defender para assinantes do Microsoft 365 é outra oferta: os nomes parecidos não tornam a assinatura obrigatória para o antivírus do Windows.",
    "Um produto pago pode fazer sentido por suporte, administração familiar ou funções adicionais que você realmente usará. Compare o plano específico: VPN, monitoramento de identidade e cobertura de vários dispositivos não estão presentes em toda oferta.",
    "Nenhum antivírus garante proteção contra tudo. Atualizações, cuidado com arquivos e links, senhas exclusivas, verificação em duas etapas e cópias de segurança continuam necessários."
  ],
  "quemFaz": [
    {
      "tarefa": "Proteção antivírus integrada",
      "servicos": "Microsoft Defender Antivirus",
      "obs": "Parte do Windows; verifique o estado e as atualizações em Segurança do Windows."
    },
    {
      "tarefa": "Painel de segurança do computador",
      "servicos": "Segurança do Windows",
      "obs": "Reúne antivírus, firewall e outras áreas. Nem todas as funções são o próprio antivírus."
    },
    {
      "tarefa": "Recursos extras de uma assinatura",
      "servicos": "Dependem do produto e do plano",
      "obs": "Leia a cobertura real, os limites, a renovação e as condições de cancelamento."
    }
  ],
  "tituloNaoConta": "O que conferir antes de contratar ou renovar",
  "naoConta": [
    "Dois antivírus com proteção em tempo real não significam proteção dobrada. Eles podem disputar recursos e causar problemas. Ao instalar um antivírus compatível, o Windows normalmente ajusta o estado do Defender; esse comportamento varia em ambientes gerenciados. Não tente forçar os dois a trabalhar juntos.",
    "Uma verificação pontual com uma ferramenta apropriada é diferente de manter dois motores atuando o tempo todo. Siga as instruções oficiais e a orientação de TI em equipamentos corporativos.",
    "O suporte geral do Windows 10 terminou em 14 de outubro de 2025. Existem condições específicas para atualizações estendidas e edições com ciclos próprios. Confira a sua edição e sua participação no programa aplicável: instalar antivírus não substitui atualizações do sistema.",
    "O valor promocional pode valer apenas para o primeiro período. Confira a renovação, quantos aparelhos estão cobertos, cobrança recorrente e se você já recebe funções semelhantes por outro serviço.",
    "Alertas insistentes de upgrade não são, sozinhos, prova de infecção. Abra o painel oficial do produto e confira o aviso. Não ligue para números nem instale programas indicados por uma página assustadora que apareceu de repente."
  ],
  "paraQuem": [
    "Quem quer saber o que o Windows já oferece antes de comprar proteção adicional.",
    "Quem usa recursos extras e consegue justificar a assinatura pela utilidade real."
  ],
  "naoServePara": [
    "Declarar que todo antivírus pago é golpe ou que uma opção sempre vence todas as outras.",
    "Desativar a proteção de uma empresa ou trocar ferramentas sem seguir a política de TI."
  ],
  "caminhoGratis": [
    "Confira se o Microsoft Defender Antivirus está ativo e atualizado quando ele for o provedor escolhido. Se outro antivírus estiver ativo, revise a situação antes de mudar: não desative proteção sem garantir uma substituição funcionando.",
    "Use os recursos de segurança disponíveis no sistema e nas suas contas. Mantenha cópia separada dos arquivos importantes; uma cópia externa desconectada após o backup reduz a exposição dessa cópia a um ataque no computador."
  ],
  "tituloComoComecar": "Checklist: confira sua proteção hoje",
  "comoComecar": [
    "Abra Segurança do Windows pelo menu Iniciar e entre em Proteção contra vírus e ameaças. Confira o provedor ativo, os avisos e as atualizações de proteção. Se o dispositivo for gerenciado, procure a equipe de TI para resolver restrições.",
    "No Windows Update, verifique as atualizações aplicáveis. Atualize também navegador e aplicativos pelos canais oficiais. Se o sistema deixou de receber suporte, planeje uma alternativa que receba atualizações.",
    "Execute uma verificação pelas opções do antivírus ativo quando houver suspeita ou recomendação do próprio produto. Não ignore uma detecção e não baixe um suposto removedor de uma propaganda.",
    "Use senhas diferentes para contas importantes e ative a verificação em duas etapas onde estiver disponível. Confira o endereço de páginas e remetentes antes de informar credenciais ou abrir anexos.",
    "Faça backup e teste se consegue recuperar um arquivo. Evite manter a única cópia de segurança permanentemente acessível pelo mesmo computador; sincronização, sozinha, pode também propagar exclusões ou alterações.",
    "Antes de renovar, liste os recursos extras que usou, confira o preço do próximo período e compare as condições. Se decidir trocar o produto, siga as instruções de remoção e confirme que a nova proteção ficou ativa e atualizada."
  ],
  "perguntas": [
    "Qual recurso preciso e qual plano realmente o inclui?",
    "Minha proteção atual está funcionando e meu sistema ainda recebe atualizações?",
    "Quanto pagarei na renovação e como funciona o cancelamento?",
    "Existe uma necessidade de suporte ou gestão de dispositivos que justifique o pacote?"
  ],
  "fontes": [
    {
      "rotulo": "Microsoft — perguntas frequentes sobre antivírus e antimalware",
      "url": "https://support.microsoft.com/pt-br/defender/antivirus-and-antimalware-software-faq"
    },
    {
      "rotulo": "Microsoft — aplicativo Segurança do Windows",
      "url": "https://support.microsoft.com/pt-br/windows/security/windows-security/stay-protected-with-the-windows-security-app"
    },
    {
      "rotulo": "Microsoft — Defender para assinantes Microsoft 365",
      "url": "https://www.microsoft.com/pt-br/microsoft-365/microsoft-defender-subscribers"
    },
    {
      "rotulo": "Microsoft Learn — compatibilidade e modos do Defender Antivirus",
      "url": "https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-antivirus-compatibility"
    },
    {
      "rotulo": "Microsoft — fim do suporte geral do Windows 10",
      "url": "https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025"
    },
    {
      "rotulo": "Microsoft — proteção contra ransomware e cópias de segurança",
      "url": "https://support.microsoft.com/pt-br/windows/security/protect-your-pc-from-ransomware"
    },
    {
      "rotulo": "Microsoft — verificação em duas etapas",
      "url": "https://support.microsoft.com/pt-br/accounts-billing/security/how-to-use-two-step-verification-with-your-microsoft-account"
    }
  ],
  "relacionadas": [
    "otimizadores-de-pc"
  ]
}
];

export const buscarFerramenta = (slug) => ferramentas.find((f) => f.slug === slug);
