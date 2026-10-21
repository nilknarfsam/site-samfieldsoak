// Palavra: pregações e reflexões do Franklin (modelo em docs/02-arquitetura.md).
// O texto é do Franklin (pregações e esboços salvos no Drive); o português foi revisado
// e as marcações de púlpito saíram. As "notas" (Para entender melhor) explicam
// passagens difíceis ou debatidas.
//
// Versão bíblica: NVI, só em trechos curtos (regra da editora). Os trechos entre aspas
// foram conferidos em 21/10/2026 no bibleserver.com (NVI em português); o resto é
// paráfrase com a referência. O campo `leitura` leva ao capítulo inteiro na NVI.
//
// Campos de cada seção: titulo, ref, citacao { texto, ref }, paragrafos (texto que começa
// com "## " vira subtítulo), nota { titulo, paragrafos }.

const nvi = (passagem) => `https://www.bibleserver.com/NVIP/${encodeURIComponent(passagem)}`;

export const reflexoes = [
  {
    slug: 'quem-me-livrara',
    titulo: 'Quem me livrará?',
    faixa: 'Quem',
    data: '2026-10-14',
    ocasiao: 'Pregada em culto de oração',
    livro: 'Romanos',
    referencia: 'Romanos 7.24-25',
    versao: 'NVI',
    versiculo: {
      texto: 'Miserável homem que eu sou! Quem me libertará do corpo sujeito a esta morte? Graças a Deus por Jesus Cristo, nosso Senhor!',
      ref: 'Romanos 7.24-25',
    },
    fraseTema: 'Eu não consigo me justificar. Mas existe Alguém que me justifica.',
    resumo: 'Paulo grita a pergunta de todo mundo que já prometeu “nunca mais” e caiu de novo. E a resposta não é um método: é uma Pessoa.',
    leitura: { ref: 'Romanos 7.15-25', url: nvi('Romanos7:15-25') },
    introducao: [
      'Quem nunca prometeu “nunca mais” e, dias depois, caiu na mesma coisa?',
      'Paulo também passou por isso. E não era um crente novo: era o apóstolo que escreveu boa parte do Novo Testamento. Em Romanos 7, ele abre o coração e descreve uma luta que todo cristão conhece.',
    ],
    secoes: [
      {
        titulo: 'Eu quero, mas não consigo',
        ref: 'Romanos 7.19',
        citacao: { texto: 'Pois o que faço não é o bem que desejo, mas o mal que não quero fazer esse eu continuo fazendo.', ref: 'Romanos 7.19' },
        paragrafos: [
          'Paulo não está dando desculpa. Está sendo honesto. Ele conhece o bem, deseja o bem e, mesmo assim, não consegue praticá-lo.',
          'Meus erros contam a minha história. Mostram o que aconteceu comigo e quem eu sou sem Cristo. E, sozinho, eu não tenho poder para apagar esses erros, nem para me declarar justo.',
          'No meu trabalho eu testo placas eletrônicas. Quando uma placa reprova no teste, ela não tem como se consertar sozinha. Por mais que “queira”, precisa de alguém de fora que encontre o defeito e corrija. Nós somos assim diante de Deus.',
          'E o programa de teste? Ele é perfeito: encontra cada defeito da placa. Mas não conserta nada. Rodar o teste dez vezes reprova a placa dez vezes. O problema nunca foi o teste, foi a placa. É o que Paulo diz da lei: a lei é santa, e o mandamento é santo, justo e bom (Romanos 7.12). O culpado é o pecado.',
        ],
        nota: {
          titulo: 'Quem é o “eu” de Romanos 7?',
          paragrafos: [
            'Esta é uma das passagens mais debatidas da carta. Há três leituras principais.',
            'Paulo já convertido, descrevendo a luta do cristão com a carne. É a leitura de Agostinho (na fase madura), de Lutero e de Calvino. O apoio: os verbos estão no presente (v.14-25), e quem fala tem prazer na lei de Deus no seu interior (v.22), o que soa como alguém já transformado.',
            'O ser humano debaixo da lei, sem o Espírito: Paulo olhando para a vida antes de Cristo, ou falando em nome de Israel. É a leitura de muitos estudiosos hoje e de boa parte da tradição wesleyana. O apoio: aqui ele se diz vendido como escravo ao pecado (v.14), enquanto no capítulo 6 os cristãos já foram libertados do pecado (6.18). E o Espírito, que aparece o tempo todo no capítulo 8, não aparece nenhuma vez em 7.14-25.',
            'Uma leitura intermediária: a experiência de qualquer pessoa, convertida ou não, que tenta vencer o pecado só com a força da lei.',
            'Em um ponto todas concordam: a lei não consegue libertar, e a resposta é Cristo (7.25) e o Espírito (8.2). Por isso a aplicação vale nas três: sem Cristo, a luta é perdida; com Cristo, a luta continua, mas a condenação acabou.',
          ],
        },
      },
      {
        titulo: 'A pergunta certa: quem?',
        ref: 'Romanos 7.24-25',
        paragrafos: [
          'Repare na pergunta de Paulo. Ele não pergunta “o que vai me libertar?”. Se fosse “o quê”, a resposta seria esforço, religião, uma promessa mais firme. Ele pergunta “quem”.',
          'A resposta não é um método, é uma Pessoa: “Graças a Deus por Jesus Cristo, nosso Senhor!”.',
          'Não sou eu que me justifico. Eu me rendo e recebo a justificação que Cristo conquistou na cruz. A fé não é mérito: é a mão vazia que recebe o presente (Efésios 2.8-9).',
        ],
        nota: {
          titulo: 'Justificar é veredito, não reforma',
          paragrafos: [
            'No Novo Testamento, “justificar” (em grego, dikaióō) é palavra de tribunal: declarar alguém justo. É o contrário de condenar (Romanos 8.33-34). Deus declara justo quem crê, por causa do que Cristo fez, e não do que a pessoa fez (Romanos 3.24).',
            'A mudança de vida vem junto, pela obra do Espírito, mas a Bíblia dá a ela outro nome: santificação. A tradição católica entende a justificação de forma mais ampla, incluindo essa renovação interior. A leitura evangélica, seguida aqui, distingue o veredito (justificação) do processo (santificação), sem separar um do outro na vida de quem crê.',
          ],
        },
      },
      {
        titulo: 'Nenhuma condenação',
        ref: 'Romanos 8.1',
        citacao: { texto: 'Portanto, agora já não há condenação para os que estão em Cristo Jesus.', ref: 'Romanos 8.1' },
        paragrafos: [
          'Meus erros dizem o que aconteceu comigo. Cristo diz quem eu sou agora.',
          'A luta ainda existe: o capítulo 7 não some da vida do cristão. Mas agora eu luto porque já fui aceito, e não para ser aceito.',
          'O veredito de Deus sobre quem está em Cristo é este: nenhuma condenação.',
        ],
        nota: {
          titulo: 'E a luta contra o pecado? (Romanos 8.13)',
          paragrafos: [
            'Paulo manda fazer morrer, pelo Espírito, os atos da carne (Romanos 8.13). A ordem importa.',
            'Errado: mortificar a carne para ser justificado. Isso é voltar para a lei.',
            'Certo: já fui justificado (8.1), então, pelo Espírito, mortifico a carne (8.13). Primeiro o veredito, depois a luta.',
          ],
        },
      },
    ],
    notas: [
      {
        titulo: 'A lei é o problema? (Romanos 7.7-12)',
        paragrafos: [
          'Paulo escolhe o mandamento “não cobiçarás”: o que não dá para cumprir só por fora, porque a cobiça mora por dentro.',
          'Ele diz que vivia, mas, quando veio o mandamento, o pecado reviveu e ele morreu (v.9). A lei não matou um homem bom. Tirou dele a ilusão de que era bom.',
          'O pecado usa o mandamento como ocasião (v.8). A palavra grega (aphormé) quer dizer base de operações, ponto de apoio para um ataque. O pecado usa o próprio mandamento como trampolim, como a placa de “não mexa” que dá mais vontade de mexer.',
          'Mesmo assim, a lei é santa, justa e boa (7.12). O culpado é o pecado.',
        ],
      },
      {
        titulo: 'Duas leis em guerra (Romanos 7.21-23)',
        paragrafos: [
          'Aqui “lei” quer dizer princípio, uma força que age sempre do mesmo jeito, como a lei da gravidade.',
          'De um lado, a lei de Deus, que Paulo ama no seu interior. Do outro, a lei do pecado, que puxa no corpo. Daí o grito: quem me libertará?',
        ],
      },
      {
        titulo: 'Como a graça liberta (Romanos 7.1-4; 8.2-3)',
        paragrafos: [
          'Da condenação: morremos para a lei com Cristo. É a ilustração do casamento (7.1-4): a morte desfaz o vínculo. Por isso, nenhuma condenação.',
          'Do poder do pecado: a lei do Espírito de vida liberta da lei do pecado e da morte (8.2). Uma lei mais forte vence a outra, como o avião vence a gravidade sem anulá-la.',
          'Deus fez o que a lei não podia fazer (8.3). O programa de teste não conseguia consertar a placa; então o próprio Engenheiro entrou na linha de produção.',
        ],
      },
    ],
    apelo: 'Pare de tentar ser o seu próprio advogado. Pegue a sua lista de erros, aqueles que só você e Deus conhecem, e leve até Cristo.',
    oracao: [
      'Em silêncio, apresente a Deus o erro que você tem tentado resolver sozinho.',
      'Ore: “Senhor, eu não consigo me justificar. Eu recebo a tua justificação.”',
      'Leia de novo Romanos 8.1 e agradeça.',
    ],
    temas: ['graça', 'justificação', 'luta contra o pecado'],
    musica: {
      album: 'reinara-a-graca', faixa: 'Miserável Homem', numero: 5,
      texto: 'Esta pregação nasceu ouvindo “Miserável Homem”. A música termina de propósito sem resposta, na tensão de Romanos 7.25. A resposta vem logo depois, em “Nenhuma Condenação”, e nesta pregação.',
    },
  },

  {
    slug: 'dois-adaos',
    titulo: 'Dois Adãos, duas humanidades',
    faixa: 'Dois Adãos',
    data: '2026-10-15',
    ocasiao: 'Esboço de pregação',
    livro: 'Romanos',
    referencia: 'Romanos 5.12-21',
    versao: 'NVI',
    versiculo: { texto: 'Mas onde aumentou o pecado transbordou a graça.', ref: 'Romanos 5.20' },
    fraseTema: 'Você nasceu em Adão, mas pode morrer e viver em Cristo.',
    resumo: 'Romanos 5 compara dois homens. Um trouxe o pecado e a morte; o outro trouxe a graça e a vida. E todo ser humano está debaixo de um deles.',
    leitura: { ref: 'Romanos 5.12-21', url: nvi('Romanos5:12-21') },
    introducao: [
      'Romanos 5 é o coração do evangelho em forma de comparação: dois homens, duas cabeças, duas humanidades.',
      'Paulo abre o versículo 12 com um “da mesma forma como…” e deixa a frase no ar. Só completa a comparação no versículo 18. No meio do caminho, ele explica por que o que Adão fez chega até nós, e por que o que Cristo fez chega muito mais longe.',
    ],
    secoes: [
      {
        titulo: 'O que herdamos em Adão',
        ref: 'Romanos 5.12-14',
        citacao: { texto: 'Portanto, da mesma forma como o pecado entrou no mundo por um homem, e pelo pecado a morte…', ref: 'Romanos 5.12' },
        paragrafos: [
          'O pecado não nasceu com cada um de nós: ele entrou no mundo por uma porta, e essa porta foi Adão. E a morte não é natural, é consequência. Entrou junto com o pecado.',
          'Paulo mostra isso com a própria história. Entre Adão e Moisés não havia lei escrita, e mesmo assim as pessoas morriam: a morte reinou desde Adão (v.14). Sinal de que estavam debaixo da condenação de Adão, e não só dos próprios atos.',
          'Adão age como cabeça, como representante. O que herdamos dele não é só um mau exemplo para imitar: é pecado, morte e condenação.',
          'E, no fim do versículo 14, Paulo diz que Adão era uma figura daquele que haveria de vir. Adão aponta para outro homem.',
        ],
        nota: {
          titulo: 'Como o pecado de Adão chega até nós?',
          paragrafos: [
            'O versículo 12 termina dizendo que a morte chegou a todos porque todos pecaram. Há três leituras clássicas.',
            'Representação: Adão agiu como representante da humanidade, e a culpa dele é contada a todos, como o voto de um representante vale pelo grupo. É a leitura reformada, apoiada no paralelo com Cristo: a justiça dele é creditada a nós do mesmo modo (v.18-19).',
            'Participação: a humanidade inteira estava “em Adão” quando ele pecou. Agostinho leu assim, em parte porque a Bíblia latina dele traduzia o fim do versículo como “em quem todos pecaram”. O grego (eph’ hō) quer dizer “porque”, e hoje quase ninguém defende aquela tradução.',
            'Herança da natureza: de Adão herdamos a morte e uma natureza inclinada ao pecado, e cada um se torna culpado ao pecar pessoalmente. É a leitura de muitos arminianos e da tradição ortodoxa oriental.',
            'As três rejeitam a ideia de que o pecado seja só mau exemplo, o que Pelágio ensinava e a igreja antiga condenou. E todas concordam com o ponto central de Paulo: a solução vem do mesmo jeito que o problema veio, por meio de um só homem.',
          ],
        },
      },
      {
        titulo: 'O que a lei revela',
        ref: 'Romanos 5.20',
        paragrafos: [
          'Se a lei veio depois, para que ela serviu? Paulo responde: foi introduzida “para que a transgressão fosse ressaltada” (v.20).',
          'A lei funciona como um raio-X. Mostra a fratura com toda a clareza, mas não cura ninguém. Ela aumenta a consciência da ofensa; não salva.',
        ],
      },
      {
        titulo: 'O que recebemos em Cristo',
        ref: 'Romanos 5.15-19',
        citacao: { texto: 'Entretanto, não há comparação entre a dádiva e a transgressão.', ref: 'Romanos 5.15' },
        paragrafos: [
          'A comparação é desigual. Cristo não apenas desfaz o que Adão fez: ele vai além. O motor do capítulo é o “muito mais” (v.15 e 17). A graça não empata com o pecado. Ela vence.',
          'Uma só ofensa trouxe juízo e condenação. Um só ato de justiça, a obediência de Cristo até a cruz, trouxe a justificação que dá vida (v.16-18).',
          'Adão desobedeceu num jardim cheio de fartura. Cristo obedeceu num deserto e numa cruz. A justiça que recebemos é a obediência dele, creditada a nós (v.19).',
          'Dom em vez de dívida. Justiça em vez de juízo. Vida em vez de morte.',
        ],
        nota: {
          titulo: '“Todos” quer dizer que todos serão salvos?',
          paragrafos: [
            'No versículo 18, Paulo diz que a justificação que traz vida veio para todos os homens. Alguns leem isso como salvação universal.',
            'Mas o próprio texto delimita: o versículo 17 fala dos que recebem de Deus a graça e o dom da justiça. Todos os que estão em Adão morrem; todos os que estão em Cristo vivem (1 Coríntios 15.22). A graça é oferecida a todos e é recebida pela fé (Romanos 5.1).',
          ],
        },
      },
      {
        titulo: 'Qual reino governa você?',
        ref: 'Romanos 5.20-21',
        citacao: { texto: 'Assim como o pecado reinou na morte, também a graça reine pela justiça para conceder vida eterna…', ref: 'Romanos 5.21' },
        paragrafos: [
          'São dois reinos, e não existe zona neutra. O pecado reina na morte; a graça reina pela justiça. A graça não ignora a justiça de Deus: ela reina por meio dela, na cruz.',
          'Na música há uma linha que resume tudo: “Não vim para o lado vencedor / Eu nasci do lado de Adão”. Ninguém nasce cristão. Todos nascemos em Adão e precisamos ser transferidos.',
          'Pense num passaporte. Você não escolheu onde nasceu, mas pode receber uma nova cidadania. Em Cristo, Deus muda a sua nacionalidade espiritual.',
          'Eu nasci do lado de Adão. Mas não preciso morrer nele.',
        ],
      },
    ],
    notas: [
      {
        titulo: 'Adão foi uma pessoa real?',
        paragrafos: [
          'Há cristãos que leem Gênesis 2 e 3 como uma figura da humanidade inteira. Em Romanos 5, porém, Paulo trata Adão como um homem da história: coloca-o na mesma linha do tempo de Moisés (v.14) e o compara com Cristo, outro homem da história.',
          'O argumento depende de “um só homem” dos dois lados. Por isso a maioria dos intérpretes evangélicos entende que Paulo fala de uma pessoa real.',
        ],
      },
    ],
    apelo: 'Você nasceu em Adão. A pergunta é em quem você vai viver.',
    temas: ['graça', 'pecado original', 'justificação'],
    musica: {
      album: 'reinara-a-graca', faixa: 'Dois Adãos', numero: 2,
      texto: 'A faixa canta Romanos 5.12-21, do sussurro “Por um homem…” até o fim de Paulo: tudo termina num nome, Jesus Cristo, nosso Senhor.',
    },
  },

  {
    slug: 'a-troca-da-gloria',
    titulo: 'A troca da glória',
    faixa: 'glória',
    data: '2026-09-27',
    ocasiao: 'Pregada em culto de domingo',
    livro: 'Romanos',
    referencia: 'Romanos 1.18-25',
    versao: 'NVI',
    versiculo: { texto: 'E trocaram a glória do Deus imortal por imagens feitas segundo a semelhança do homem mortal…', ref: 'Romanos 1.23' },
    fraseTema: 'Nós trocamos a glória. Cristo faz a troca de volta.',
    resumo: 'Ninguém trocaria uma aliança de ouro por uma bijuteria. Mas Paulo mostra que a humanidade fez essa troca com o próprio Deus. E mostra a troca que Deus fez por nós.',
    leitura: { ref: 'Romanos 1.18-25', url: nvi('Romanos1:18-25') },
    introducao: [
      'Imagine que alguém chega para você e diz: “Me dá essa sua aliança de ouro, e eu te dou esta aqui.” E mostra uma bijuteria de feira. Brilhante, bonita, chamativa. Você faria essa troca?',
      'Ninguém faria. Porque todo mundo sabe o que acontece com a bijuteria. No começo ela brilha. Mas em pouco tempo escurece, descasca, deixa o dedo verde e se desfaz. O ouro não. O ouro não se desgasta.',
      'A Palavra de Deus mostra que a humanidade fez exatamente essa troca. E não com uma aliança. Com o próprio Deus.',
      'Repare nas duas palavras do versículo 23: Deus imortal e homem mortal. O grego fala em incorruptível e corruptível, e é assim que a tradução Almeida traz. Corruptível é o que se desgasta, apodrece e se desfaz. Incorruptível é o que nunca se desgasta. E “trocaram” é isto: nós trocamos o ouro pela bijuteria. Trocamos o Deus que não se desgasta por coisas que se desgastam.',
      'Paulo escreveu essa carta para uma igreja em Roma onde havia judeus e não judeus, e onde cada grupo às vezes se achava melhor que o outro. E ele começa mostrando uma coisa: todos nós, sem exceção, precisamos da mesma graça.',
    ],
    secoes: [
      {
        titulo: 'O que nós conhecemos e não reconhecemos',
        ref: 'Romanos 1.18-21',
        citacao: { texto: 'Porque, tendo conhecido a Deus, não o glorificaram como Deus, nem lhe renderam graças…', ref: 'Romanos 1.21' },
        paragrafos: [
          'O versículo 18 fala de pessoas que suprimem a verdade: seguram a verdade embaixo, não deixam sair. Sabe quando a gente brinca na piscina e tenta afundar uma bola? A bola quer subir, e a gente empurra para baixo. É isso que o coração humano faz com a verdade sobre Deus.',
          'Porque, dizem os versículos 19 e 20, o que se pode conhecer de Deus está à vista: o seu poder eterno e a sua natureza divina são percebidos nas coisas que ele criou. O problema do ser humano não é falta de informação. Olhe para o céu de Manaus numa noite limpa. Olhe para o rio, para a floresta, para um bebê recém-nascido. O Salmo 19 diz que os céus proclamam a glória de Deus. A criação está pregando o tempo todo. O problema não é que Deus se escondeu. É que nós não queremos o que vemos.',
          'E então vem o versículo 21, que eu considero a chave do texto. A idolatria não começa com uma estátua. Começa com duas coisas que deixamos de fazer.',
          'A primeira: não glorificar a Deus como Deus. No Antigo Testamento, a palavra glória tem a ideia de peso. Glorificar a Deus é dar a ele o peso que ele tem: o primeiro lugar, o centro, o maior.',
          'A segunda: não agradecer. Viver como se tudo o que temos (a vida, o fôlego, o pão, a família, o trabalho) tivesse surgido do nada, ou fosse mérito nosso. A ingratidão não é um pecado pequeno. Paulo a coloca na raiz de toda a idolatria.',
          'E o que acontece com quem para de glorificar e de agradecer? Os pensamentos ficam vazios. O profeta Jeremias já tinha dito que quem corre atrás dos ídolos, que não são nada, acaba se tornando nada (Jeremias 2.5). Quem corre atrás do que é vazio, fica vazio.',
          'Jeremias tem uma imagem que explica tudo isso: o povo deixou a fonte de água viva e cavou cisternas rachadas, que não seguram água (Jeremias 2.13). Imagine alguém que mora do lado de uma fonte limpa, que nunca seca, e larga a fonte para passar o dia cavando um buraco no chão. Só que o buraco está rachado. Enche, e a água vaza. Enche de novo, e vaza de novo.',
          'Essa é a vida de quem deixa Deus. A pessoa não fica sem sede. Ela continua com sede. Só passa a procurar água no lugar errado. Quando o coração deixa a fonte, ele não fica vazio. Ele troca.',
        ],
        nota: {
          titulo: 'E quem nunca ouviu falar de Jesus?',
          paragrafos: [
            'Romanos 1 diz que a criação mostra o poder eterno e a divindade de Deus, o bastante para deixar todos indesculpáveis (v.20). Mas não diz que essa revelação salva: ela mostra Deus e tira a desculpa. A salvação vem pelo evangelho (1.16), e por isso Paulo pergunta como alguém vai crer sem ouvir (10.14).',
            'Sobre o que Deus faz com quem nunca ouviu, os cristãos pensam diferente. Uns dizem que não há salvação sem ouvir de Cristo. Outros, que Deus julgará cada um pela luz que recebeu. Outros preferem não afirmar o que a Bíblia não diz com clareza. Todos concordam numa coisa: a resposta prática é levar o evangelho.',
          ],
        },
      },
      {
        titulo: 'O que nós trocamos',
        ref: 'Romanos 1.22-25',
        citacao: { texto: 'Trocaram a verdade de Deus pela mentira, e adoraram e serviram a coisas e seres criados…', ref: 'Romanos 1.25' },
        paragrafos: [
          '“Dizendo-se sábios, tornaram-se loucos” (v.22). Isso não foi feito por gente simples e sem estudo. O mundo de Paulo tinha a filosofia grega, a engenharia romana, a arte, as leis. E tinha os templos cheios de estátuas. Gente que se achava sábia, ajoelhada diante do que as próprias mãos fizeram.',
          'Percebam como a lista do versículo 23 vai descendo: primeiro o homem, depois as aves, depois os quadrúpedes e, por fim, os répteis, os que rastejam no chão. Quanto mais longe de Deus, mais baixo o ser humano vai.',
          'E tem uma ironia enorme aqui. Em Gênesis 1.26, Deus faz o ser humano à sua imagem para governar os peixes, as aves, os animais e os répteis. É a mesma lista! Deus fez o ser humano para ser a sua imagem no mundo e governar a criação. E o ser humano passou a fabricar imagens e a se curvar diante das aves, dos animais e dos répteis. A ordem da criação ficou de cabeça para baixo.',
          'Alguém pode pensar: “Isso é coisa de pagão. Nós somos crentes.” Então veja o Salmo 106.20, falando do povo de Israel no deserto, logo depois de ser liberto do Egito: eles trocaram a glória de Deus pela imagem de um boi que come capim. É o bezerro de ouro. Paulo está usando as palavras desse salmo. A troca da glória não aconteceu só lá fora. Aconteceu dentro do povo de Deus. E Êxodo 32 mostra como.',
          'Primeiro, veio da impaciência. Moisés demorou a descer do monte, e o povo pediu a Arão deuses que fossem à frente deles (Êxodo 32.1). Quando Deus parece demorar, a gente cria alguma coisa que responda mais rápido.',
          'Segundo, o bezerro tinha nome de culto. Arão fez o bezerro, construiu um altar e anunciou que no dia seguinte haveria festa ao Senhor (Êxodo 32.5). Eles não disseram “vamos abandonar o Senhor”. Colocaram o nome do Senhor em cima de um ídolo. A idolatria mais perigosa é a que fala a linguagem da igreja.',
          'O profeta Isaías mostra como isso é absurdo. Ele descreve um homem que pega um pedaço de madeira: com metade acende o fogo, assa o pão e se aquece; com a outra metade faz um deus, se ajoelha diante dele e pede que o salve (Isaías 44.15-17). A mesma madeira que assou o pão virou deus. E Isaías termina dizendo que esse homem não consegue nem perguntar se aquilo em que confia não é uma mentira (Isaías 44.20). É o que Paulo diz no versículo 25.',
          '## As trocas de hoje',
          'Nenhum de nós tem um bezerro de ouro em casa. Então, como essa troca acontece hoje? A própria Bíblia responde: a ganância é idolatria (Colossenses 3.5), e ninguém pode servir a dois senhores, a Deus e ao dinheiro (Mateus 6.24).',
          'O dinheiro. Trocamos a segurança em Deus pela segurança no que temos. Jesus mandou não acumular tesouros na terra, onde a traça e a ferrugem destroem (Mateus 6.19). O dinheiro é corruptível. É bijuteria.',
          'A aprovação das pessoas. João 12 fala de líderes que creram em Jesus, mas não tinham coragem de confessar, porque amavam mais a aprovação dos homens do que a de Deus (João 12.43). No grego, a palavra é doxa, a mesma de glória, e a Almeida traduz assim: eles amaram mais a glória dos homens do que a glória de Deus. Hoje isso tem nome: curtida, visualização, “o que vão pensar de mim”.',
          'O controle. Como o povo no deserto: quando Deus demora, a gente corre para aquilo que dá sensação de controle.',
          'O próprio eu. A cultura diz: “siga o seu coração”, “a sua verdade”. O versículo 25 diz que eles adoraram e serviram a criatura em lugar do Criador. E eu também sou criatura.',
          'E tem a troca mais perigosa: o ídolo com nome de Deus. O ministério que vira a minha identidade. O louvor que vira apresentação. A pregação que vira vaidade. Um Deus do nosso tamanho, que só abençoa e nunca confronta. Um bezerro com “festa ao Senhor”.',
          'Que fique claro: coisas boas não viram ídolos por serem boas. Tudo o que Deus criou é bom, se recebido com gratidão (1 Timóteo 4.4). O problema não é amar a família, o trabalho, o ministério. O problema é quando essas coisas passam a ter o peso que só Deus pode ter.',
          'E sabe o que acontece quando fazemos essa troca? O Salmo 115 diz que os ídolos têm boca e não falam, têm olhos e não veem, e que quem os faz e confia neles fica igual a eles (Salmo 115.5-8). Nós nos tornamos parecidos com aquilo que adoramos.',
          'O versículo 24 diz que, por isso, Deus os entregou aos desejos do próprio coração. Três vezes neste capítulo Paulo diz isso: Deus os entregou (v.24, 26 e 28). A ira de Deus se revela, muitas vezes, assim: Deus deixa o ser humano ficar com aquilo que ele escolheu. E aquilo que ele escolheu começa a destruí-lo.',
          'Mas, no fim do versículo 25, Paulo faz uma coisa linda. Depois de dizer que eles adoraram a criatura em lugar do Criador, ele para e escreve: “que é bendito para sempre. Amém.” Paulo não aguenta. No meio da descrição da idolatria, ele adora. Faz aquilo que a humanidade deixou de fazer.',
        ],
        nota: {
          titulo: '“Deus os entregou”: Deus empurra alguém para o pecado?',
          paragrafos: [
            'Não. Deus não tenta ninguém (Tiago 1.13). Entregar, aqui, é retirar a mão que segura: o coração já tinha escolhido (os desejos são do próprio coração, v.24), e Deus confirma a escolha como juízo.',
            'Os intérpretes debatem se é só uma permissão ou um ato de juízo. O texto aponta para mais que permissão, porque o sujeito do verbo é Deus. Mas a causa do mal continua no ser humano.',
            'E a ira de Deus não é um ataque de raiva. É a reação firme e justa de um Deus santo contra o mal que destrói o que ele ama. Romanos 1 mostra que ela já age agora (“é revelada”, no presente), muitas vezes desse jeito: deixando a pessoa ficar com o que escolheu.',
          ],
        },
      },
      {
        titulo: 'O que Deus trocou por nós',
        ref: 'Romanos 2.1; 3.23-24; 8.29-32',
        citacao: { texto: 'Pois todos pecaram e estão destituídos da glória de Deus, sendo justificados gratuitamente por sua graça, por meio da redenção que há em Cristo Jesus.', ref: 'Romanos 3.23-24' },
        paragrafos: [
          'Enquanto a igreja de Roma ouvia essa carta, eu imagino muita gente balançando a cabeça: “É isso mesmo, os pagãos são assim.” E aí Paulo vira o jogo: você que julga também é indesculpável, porque faz as mesmas coisas (Romanos 2.1). É a mesma palavra de Romanos 1.20. Indesculpável o pagão. Indesculpável quem julga o pagão. Ninguém fica de fora. Nem eu, nem você.',
          'Coloque os dois versículos lado a lado. Romanos 1.23: trocaram a glória de Deus. Romanos 3.23: todos estão destituídos da glória de Deus. Nós trocamos a glória… e ficamos sem ela. Mas o versículo 24 continua, e esta é a melhor notícia que existe: justificados gratuitamente, por graça.',
          'Lembra que Deus proibiu Israel de fazer imagens? Não foi porque Deus não quer ser visto. Foi porque ele mesmo daria a sua imagem. Jesus é a imagem do Deus invisível (Colossenses 1.15). Nós queríamos ver Deus e fabricamos bezerros. Deus se deixou ver em Jesus Cristo, e a glória de Deus brilha na face de Cristo (2 Coríntios 4.6).',
          'E mais. Lembra que três vezes o texto diz “Deus os entregou”? Romanos 8.32 usa a mesma palavra: Deus “não poupou o seu próprio Filho, mas o entregou por todos nós”. Deus nos entregou ao nosso pecado… e depois entregou o seu Filho para nos resgatar do nosso pecado.',
          'Nós trocamos a glória. Cristo faz a troca de volta.',
          'Nós trocamos o Deus que não se desgasta por coisas que se desgastam. E Deus, em Cristo, pega pessoas que se desgastam (que adoecem, envelhecem, falham) e promete transformá-las à imagem do seu Filho (Romanos 8.29). A imagem que foi estragada é restaurada. E Paulo diz que este corpo corruptível vai se revestir de incorruptibilidade (1 Coríntios 15.53). A bijuteria vai virar ouro. Não por mérito nosso. Por graça.',
          'E como fica a nossa vida enquanto esse dia não chega? Lucas 17 conta que Jesus curou dez leprosos. Os dez. Mas só um voltou, louvando a Deus em alta voz, e se jogou aos pés de Jesus agradecendo. E era samaritano. Jesus perguntou onde estavam os outros nove (Lucas 17.15-18).',
          'Esse homem fez exatamente as duas coisas que Romanos 1.21 diz que a humanidade deixou de fazer. Deu glória a Deus. E agradeceu. Os outros nove ficaram com a bênção e esqueceram o Deus da bênção. Um voltou para o Doador. Esse samaritano é o retrato de uma pessoa restaurada pelo evangelho.',
        ],
      },
    ],
    notas: [],
    apelo: 'Você é um dos nove, ou é o que voltou? Não é só largar alguma coisa. É voltar para Alguém: deixar a bijuteria e voltar para o ouro, deixar a cisterna e voltar para a fonte, deixar os ídolos e servir ao Deus vivo e verdadeiro (1 Tessalonicenses 1.9-10).',
    tituloOracao: 'Para pensar e orar',
    oracao: [
      'O que, na minha vida, tem mais peso do que Deus?',
      'Para onde eu corro quando estou com sede: para a fonte ou para as cisternas rachadas?',
      'Pelo que eu não tenho agradecido?',
      'Termine fazendo o que Paulo fez no meio do texto, agora como a sua confissão: “…o Criador, que é bendito para sempre. Amém.”',
    ],
    temas: ['idolatria', 'gratidão', 'graça'],
    musica: {
      album: 'toda-boca-se-cale', faixa: 'Entregues', numero: 2,
      texto: 'A faixa “Entregues” canta Romanos 1.18-32, o mesmo trecho desta pregação.',
    },
  },
];

// Mais recente primeiro.
reflexoes.sort((a, b) => b.data.localeCompare(a.data));

export const buscarReflexao = (slug) => reflexoes.find((r) => r.slug === slug);

export const nomesVersao = { NVI: 'Nova Versão Internacional (NVI)' };

export const creditoNVI = 'Texto bíblico da Nova Versão Internacional (NVI), © 1993, 2000, 2011 Biblica, Inc. Usado com permissão.';
