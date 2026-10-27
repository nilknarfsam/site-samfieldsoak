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
  {
    slug: 'quando-a-visao-engana',
    titulo: 'Quando a visão engana',
    faixa: 'visão',
    data: '2026-05-31',
    ocasiao: 'Esboço de pregação',
    livro: 'Salmos',
    referencia: 'Salmo 73',
    versao: 'NVI',
    versiculo: { texto: 'A quem tenho nos céus senão a ti? E, na terra, nada mais desejo além de estar junto a ti.', ref: 'Salmo 73.25' },
    fraseTema: 'A verdadeira vitória não é o que você tem. É quem te sustenta.',
    resumo: 'Asafe quase escorregou olhando para a prosperidade dos ímpios. A visão dele só mudou quando entrou na presença de Deus.',
    leitura: { ref: 'Salmo 73', url: nvi('Salmo73') },
    introducao: [
      'O Salmo 73 começa com uma verdade absoluta. Mas o resto do salmo mostra que Asafe precisou lutar por dentro para continuar crendo nela.',
      'É o salmo de quem olhou para o lado, comparou a própria vida com a dos outros e quase perdeu o chão.',
    ],
    secoes: [
      {
        titulo: 'Deus é bom, mesmo quando não parece',
        ref: 'Salmo 73.1',
        citacao: { texto: 'Certamente Deus é bom para Israel, para os puros de coração.', ref: 'Salmo 73.1' },
        paragrafos: [
          'A fé não nega a realidade. Ela interpreta a realidade pela verdade de Deus.',
          'Nem sempre o que vemos confirma o que cremos. E é aí que começa o conflito.',
        ],
      },
      {
        titulo: 'O conflito: olhando para os ímpios',
        ref: 'Salmo 73.2-5',
        citacao: { texto: 'Quanto a mim, os meus pés quase tropeçaram; por pouco não escorreguei.', ref: 'Salmo 73.2' },
        paragrafos: [
          'Asafe confessa que teve inveja dos arrogantes quando viu a prosperidade deles. Pareciam não sofrer, tinham saúde, estavam livres dos fardos que pesam sobre os outros (v.3-5).',
          'O problema começa aqui: a comparação baseada no que se vê. Avaliar a vida só pelo material, julgar o sucesso pela aparência, esquecer a dimensão espiritual.',
          'O mundo vende a ideia de que quem tem mais vive melhor. Mas a Bíblia mostra que nem tudo que prospera é aprovado por Deus.',
        ],
      },
      {
        titulo: 'A crise: vale a pena ser fiel?',
        ref: 'Salmo 73.13-14',
        paragrafos: [
          'Asafe chega a dizer que foi inútil manter o coração puro e as mãos limpas, porque o dia inteiro ele sofria (v.13-14). Esse é o ponto mais perigoso: quando a comparação vira desânimo espiritual.',
          'Daí nascem os pensamentos: “vale a pena ser fiel?”, “por que eu luto tanto e outros vivem melhor?”.',
          'Todo cristão verdadeiro passa por esse tipo de pergunta. O problema não é sentir isso. É permanecer nisso.',
        ],
      },
      {
        titulo: 'A virada: a visão muda na presença de Deus',
        ref: 'Salmo 73.16-17',
        citacao: { texto: '…até que entrei no santuário de Deus, e então compreendi o destino dos ímpios.', ref: 'Salmo 73.17' },
        paragrafos: [
          'Asafe tentou entender tudo isso e achou difícil demais (v.16). A mudança não veio por mais lógica, mais análise ou mais comparação. Veio quando ele entrou na presença de Deus.',
          'Tem coisas que você não vai entender só com a cabeça. Só vai enxergar diante de Deus.',
        ],
        nota: {
          titulo: 'O que é “entrar no santuário” hoje?',
          paragrafos: [
            'Para Asafe, o santuário era o lugar do culto em Jerusalém. Para quem está em Cristo, o acesso à presença de Deus não depende mais de um prédio: Jesus abriu um caminho novo e vivo até o Pai (Hebreus 10.19-22).',
            'Na prática, “entrar no santuário” é buscar a Deus em oração, na Palavra e na comunhão com a igreja, e olhar a vida de novo a partir dali.',
          ],
        },
      },
      {
        titulo: 'O fim que não aparecia',
        ref: 'Salmo 73.18-19',
        paragrafos: [
          'Asafe entende que os ímpios estão em terreno escorregadio e que a ruína deles pode vir de repente (v.18-19).',
          'O que parecia estabilidade era instável. O que parecia sucesso era passageiro. A prosperidade do ímpio é temporária, e a queda pode ser repentina.',
        ],
      },
      {
        titulo: 'Eu estava olhando errado',
        ref: 'Salmo 73.21-22',
        paragrafos: [
          'Asafe reconhece que, com o coração amargurado e cheio de inveja, agiu como um tolo, como um animal diante de Deus (v.21-22). O problema não era Deus. Era a perspectiva dele.',
          'Muitas vezes o nosso sofrimento não vem da realidade, mas da forma como estamos enxergando a realidade.',
        ],
      },
      {
        titulo: 'O maior tesouro: Deus é suficiente',
        ref: 'Salmo 73.23-28',
        citacao: { texto: 'Contudo, sempre estou contigo; tomas a minha mão direita e me susténs.', ref: 'Salmo 73.23' },
        paragrafos: [
          'Enquanto o ímpio está em terreno escorregadio, o justo está seguro pela mão de Deus, guiado pelo seu conselho (v.23-24).',
          'Aqui Asafe chega à maturidade. Não quer mais comparar, não quer mais competir, não quer mais medir a vida pela dos outros. O corpo e o coração podem fraquejar, “mas Deus é a força do meu coração e a minha herança para sempre” (v.26).',
          'O salmo termina com dois destinos. O ímpio pode até parecer bem, mas está longe de Deus. O cristão pode até passar por lutas, mas está seguro em Deus: “Mas, para mim, bom é estar perto de Deus” (v.28).',
        ],
        nota: {
          titulo: 'O Salmo 73 fala de vida depois da morte?',
          paragrafos: [
            'No versículo 24, Asafe diz que Deus o guia com o seu conselho e depois o receberá com honra. Os intérpretes discutem esse depois.',
            'Uns entendem que fala só desta vida: depois da crise, Deus restaura a honra do justo. Muitos outros veem aqui um dos pontos mais claros do Antigo Testamento sobre a comunhão com Deus que continua além da morte, porque logo em seguida Asafe chama Deus de sua herança para sempre (v.26).',
            'O Novo Testamento deixa claro o que no salmo aparece em semente: a comunhão com Deus não termina na morte (Filipenses 1.21-23).',
          ],
        },
      },
    ],
    notas: [],
    apelo: 'Nem tudo que brilha é bênção. Nem toda dificuldade é derrota. Nem toda prosperidade é aprovação. Enquanto o mundo escorrega, Deus segura o justo pela mão direita.',
    temas: ['inveja', 'presença de Deus', 'contentamento'],
    musica: {
      album: 'santuario-do-altissimo', faixa: 'Salmo 73',
      texto: 'O álbum Santuário do Altíssimo canta os Salmos 73 a 84, a começar por este. O nome do disco vem da virada deste salmo: tudo mudou quando Asafe entrou no santuário.',
    },
  },

  {
    slug: 'o-misterio-dos-machados',
    titulo: 'O mistério dos machados',
    faixa: 'machados',
    data: '2026-01-25',
    ocasiao: 'Pregação',
    livro: 'Salmos',
    referencia: 'Salmo 74.1-9',
    versao: 'NVI',
    versiculo: { texto: 'Pareciam homens armados com machados invadindo um bosque cerrado.', ref: 'Salmo 74.5' },
    fraseTema: 'Os martelos de Roma achavam que estavam demolindo um profeta. Estavam esculpindo a nossa salvação.',
    resumo: 'Os babilônios entraram no templo como lenhadores. Séculos depois, outros “lenhadores” pregaram Jesus na cruz. Mas ali a destruição virou redenção.',
    leitura: { ref: 'Salmo 74', url: nvi('Salmo74') },
    introducao: [
      'O salmo é de Asafe, e Asafe não era rei: era músico, levita, líder da adoração. Imagine a dor de um músico vendo os instrumentos queimarem e o lugar do seu cântico ser destruído. A dor aqui não é política, é de adoração.',
      'O ano é 586 antes de Cristo. Nabucodonosor, rei da Babilônia, cerca Jerusalém. A comida acaba. Os muros caem. E o pior acontece: eles entram no templo de Salomão.',
      'O templo era revestido de cedro do Líbano e de ouro, com entalhes de querubins, palmeiras e flores abertas (1 Reis 6). Uma obra de arte inestimável.',
    ],
    secoes: [
      {
        titulo: 'O cenário do caos',
        ref: 'Salmo 74.4-7',
        citacao: { texto: 'Com seus machados e machadinhas esmigalharam todos os revestimentos de madeira esculpida.', ref: 'Salmo 74.6' },
        paragrafos: [
          'O salmista está dizendo: eles trataram a arte de Deus como se fosse mato! Um lenhador na floresta bate com força para derrubar árvores brutas. Um artesão usa formão e delicadeza. Os babilônios entraram com a mentalidade de lenhadores no lugar da delicadeza de Deus.',
          'E fizeram mais: hastearam as suas bandeiras em sinal de vitória (v.4), no lugar onde estava a arca da aliança. É o retrato de quando o inimigo coloca a bandeira do vício, da depressão ou do pecado no centro da nossa vida, onde deveria estar a bandeira de Cristo.',
          'O Salmo 74 e o Salmo 79 são chamados de salmos gêmeos: os dois choram a mesma tragédia, como duas câmeras filmando a mesma cena. O 74 olha para o templo: “Deus, atacaram a tua casa”. O 79 olha para a cidade e para o povo: “Deus, atacaram o teu povo”.',
          'O sentimento de Asafe é muito atual. Sabe quando você passou anos construindo algo com cuidado (um casamento, a educação de um filho, um ministério) e, de repente, vem uma crise, uma doença, uma traição, e parece que entrou um lenhador na sua vida quebrando tudo sem piedade? É sobre essa dor que este salmo fala.',
        ],
        nota: {
          titulo: 'Asafe viu o templo queimar?',
          paragrafos: [
            'Asafe foi um dos líderes do louvor no tempo de Davi (1 Crônicas 16.4-7; 25.1), uns quatrocentos anos antes da invasão da Babilônia. Por isso a maioria dos estudiosos entende que “de Asafe”, nos títulos de salmos como o 74 e o 79, aponta para a família de cantores que levou o nome dele e continuou servindo no templo por gerações (Esdras 2.41).',
            'Assim, quem chora aqui é um descendente de Asafe, da mesma linhagem de adoradores. A maioria liga o salmo à destruição de 586 a.C.; alguns pensam em outra profanação do templo, mais tarde. A aplicação não muda.',
          ],
        },
      },
      {
        titulo: 'O silêncio de Deus',
        ref: 'Salmo 74.9',
        citacao: { texto: 'Já não vemos sinais milagrosos; não há mais profetas…', ref: 'Salmo 74.9' },
        paragrafos: [
          'Esse é o ponto mais profundo do sofrimento. O templo queimou, mas o pior foi que Deus pareceu calado. Parecia que o céu estava vazio.',
          'Alguém aqui já sentiu isso? Quando a tragédia acontece e você ora, mas parece que o telefone do céu está fora do gancho?',
          'Mas eu aprendi uma coisa caminhando com Deus: o silêncio dele não é ausência, é preparação. Ele não mandou outro profeta para consertar o templo de pedra. Esperou o tempo certo para mandar o próprio Construtor.',
          'E por que Deus permitiu os lenhadores? Anos antes, o rei Ezequias, por vaidade, mostrou aos mensageiros da Babilônia todos os tesouros do palácio e do templo, e Isaías profetizou que tudo seria levado para lá (Isaías 39). Quando expomos o coração ao mundo e não a Deus, o inimigo volta para buscar o que viu.',
        ],
        nota: {
          titulo: 'Por que Deus permitiu a destruição?',
          paragrafos: [
            'O episódio de Ezequias (Isaías 39) mostra o anúncio do exílio. Mas a Bíblia apresenta a causa principal como gerações de idolatria e de desprezo pelos profetas que Deus mandou (2 Reis 24.3-4; 2 Crônicas 36.14-16).',
            'As duas coisas andam juntas: a vaidade de um rei foi um sinal de um coração que confiava mais no ouro que em Deus, e o povo inteiro seguiu esse caminho. O exílio foi juízo, mas também caminho de volta: Deus prometeu restaurar o povo (Jeremias 29.10-14).',
          ],
        },
      },
      {
        titulo: 'A resposta, seiscentos anos depois',
        ref: 'João 2.18-22',
        paragrafos: [
          'Asafe perguntou até quando aquilo ia durar (v.10). Deus não respondeu na hora. Esperou o cenário estar montado para a resposta definitiva.',
          'Em João 2, pediram a Jesus um sinal, e ele respondeu que, se destruíssem aquele templo, ele o levantaria em três dias. Acharam que ele falava do prédio, que tinha levado quarenta e seis anos para ser construído. Mas o templo de que ele falava era o seu corpo (João 2.18-21).',
          'No Antigo Testamento, se você colocasse no GPS “onde encontrar Deus”, o mapa levaria a um endereço: o templo em Jerusalém. Jesus estava avisando que Deus ia mudar de endereço. A presença de Deus ia sair de um prédio de pedra e madeira, que podia ser queimado por babilônios ou romanos, e habitar num corpo vivo. Hoje nós não adoramos tijolos. Adoramos o Salvador.',
        ],
      },
      {
        titulo: 'A cruz, o último ato dos lenhadores',
        ref: 'Colossenses 1.15',
        paragrafos: [
          'Para que pudéssemos entrar na presença de Deus, o novo templo, o corpo de Jesus, passou pelos mesmos lenhadores do Salmo 74.',
          'Vamos ao Calvário. Quem está lá? Soldados romanos, com martelos e lanças. O que é a cruz? Madeira grosseira, como o bosque cerrado do salmo. Jesus, a imagem do Deus invisível (Colossenses 1.15), o entalhe mais perfeito da glória do Pai, foi entregue aos lenhadores. O som do machado no templo de Salomão ecoou no som do martelo no Gólgota.',
          'No Salmo 74, a destruição foi tragédia. Na cruz, a destruição foi estratégia. Deus permitiu que o templo do corpo de Cristo fosse demolido por fora, para que o véu do templo se rasgasse por dentro (Mateus 27.51).',
          'Os martelos de Roma achavam que estavam apenas demolindo um profeta, mas, na verdade, estavam esculpindo a nossa salvação. Onde Asafe viu o fim da adoração, Jesus inaugurou a verdadeira adoração. Onde os machados fecharam o templo em 586 a.C., os cravos abriram o céu.',
        ],
      },
      {
        titulo: 'Justiça e misericórdia na cruz',
        ref: 'Salmo 79.9; João 3.16',
        paragrafos: [
          'Deus permitiu que o seu próprio Filho fosse tratado como lenha para que você fosse tratado como filho. Deus amou o mundo de tal maneira que deu o seu Filho, para que todo o que nele crer tenha a vida eterna (João 3.16).',
          'No Salmo 74, Asafe está indignado: “Deus, levanta-te! Defende a tua honra!”. É o grito de quem quer justiça. No Salmo 79, o tom muda: ele pede ajuda e perdão pela glória do nome de Deus, e não porque o povo merecesse (Salmo 79.9).',
          'Enquanto a gente fica só olhando para os lenhadores e pedindo vingança contra quem nos feriu, a alma continua amarga. A cura vem quando paramos de pedir só justiça (porque, se Deus nos desse justiça, todos seríamos consumidos) e começamos a pedir misericórdia.',
          'E onde a justiça e a misericórdia se encontraram? Na cruz. Ali Deus atendeu ao Salmo 74, punindo o pecado, e ao Salmo 79, perdoando o pecador.',
        ],
      },
    ],
    notas: [],
    apelo: 'O sacrifício de Jesus é universal na oferta: o sangue dele é suficiente para perdoar o pior criminoso. Mas é individual na aceitação: só transforma quem dobra o joelho e diz “entra no meu templo”.',
    tituloOracao: 'Para orar',
    oracao: [
      'Se você tem se sentido destruído, olhe para a cruz. Foi lá que a destruição perdeu o poder e a vida venceu.',
      'Peça a Deus que restaure as ruínas da sua vida, não porque você merece, mas pela glória do nome dele.',
    ],
    temas: ['sofrimento', 'cruz', 'misericórdia'],
    musica: {
      album: 'santuario-do-altissimo', faixa: 'Salmo 74',
      texto: 'O álbum Santuário do Altíssimo canta os Salmos 73 a 84, incluindo este lamento pelo santuário destruído.',
    },
  },

  {
    slug: 'o-deus-que-segura-ouve-e-consola',
    titulo: 'O Deus que segura, ouve e consola',
    faixa: 'segura',
    data: '2025-12-10',
    ocasiao: 'Pregada em culto de oração',
    livro: 'Salmos',
    referencia: 'Salmo 94',
    versao: 'NVI',
    versiculo: { texto: 'Quando a ansiedade já me dominava no íntimo, o teu consolo trouxe alívio à minha alma.', ref: 'Salmo 94.19' },
    fraseTema: 'Ele vê. Ele segura. Ele consola.',
    resumo: 'Para quem acha que Deus não está vendo, para quem sente os pés escorregando e para quem tem a mente cheia de barulho.',
    leitura: { ref: 'Salmo 94', url: nvi('Salmo94') },
    introducao: [
      'Quando vamos orar, geralmente trazemos algumas cargas. Às vezes é uma injustiça que sofremos, uma preocupação com a família, ou aquela ansiedade que aperta o peito.',
      'O Salmo 94 foi escrito num momento em que parecia que o mal estava vencendo. Havia gente dizendo que Deus não via (v.7). Se você sente que seus pés estão escorregando ou que sua mente está cheia de barulho, o Senhor tem uma resposta nesses versículos.',
    ],
    secoes: [
      {
        titulo: 'Deus não é surdo nem cego',
        ref: 'Salmo 94.9',
        citacao: { texto: 'Será que quem fez o ouvido não ouve? Será que quem formou o olho não vê?', ref: 'Salmo 94.9' },
        paragrafos: [
          'A primeira coisa que precisamos para orar com fé é ter certeza de que estamos sendo ouvidos. E o salmista usa uma lógica perfeita.',
          'Se Deus criou o ouvido humano, com toda a sua complexidade, é claro que ele ouve o seu clamor. Se Deus desenhou o olho humano, é claro que ele vê a sua lágrima e a sua situação.',
          'Há uma voz que tenta dizer que Deus esqueceu de você. Mas a Bíblia diz que os olhos do Senhor estão em toda parte (Provérbios 15.3). Não ore como quem fala com as paredes. Ore sabendo que o Criador do seu ouvido está inclinado para ouvir a sua voz.',
        ],
      },
      {
        titulo: 'O Deus que segura o pé que escorrega',
        ref: 'Salmo 94.18',
        citacao: { texto: 'Quando eu disse: Os meus pés escorregaram, o teu amor leal, SENHOR, me amparou!', ref: 'Salmo 94.18' },
        paragrafos: [
          'Quem nunca teve a sensação de que ia cair? Sabe quando você pisa num chão molhado ou cheio de limo e sente o equilíbrio indo embora? Na vida espiritual e emocional isso também acontece.',
          'O salmista foi honesto. Não fingiu ser um supercrente. Admitiu que os pés estavam escorregando. Mas, antes que ele caísse, o amor leal do Senhor o segurou.',
          'Isso lembra Pedro afundando no mar. Ele gritou, e Jesus imediatamente estendeu a mão (Mateus 14.30-31). Deus não espera você se destruir para agir.',
        ],
      },
      {
        titulo: 'Consolo para a mente ansiosa',
        ref: 'Salmo 94.19',
        paragrafos: [
          'Talvez este seja o versículo mais precioso para os dias de hoje. Sabe quando a gente deita a cabeça no travesseiro e os pensamentos não param? É a ansiedade, o excesso de preocupação com o amanhã.',
          'O salmista não disse: “pensei positivo e melhorei”. Ele disse que foi o consolo de Deus que trouxe alívio à sua alma.',
          'O remédio não é fingir que o problema não existe. É receber o consolo do Espírito Santo, trocar o nosso fardo pela paz de Deus, que excede todo o entendimento e guarda o coração e os pensamentos em Cristo Jesus (Filipenses 4.7).',
        ],
        nota: {
          titulo: 'Fé, oração e tratamento',
          paragrafos: [
            'A Bíblia trata a ansiedade com seriedade e com ternura: leva à oração (Filipenses 4.6-7; 1 Pedro 5.7), e o próprio salmista confessa a sua.',
            'Buscar ajuda de um médico ou de um psicólogo não é falta de fé, assim como tomar remédio para pressão não é. Deus consola na oração, na Palavra, na comunhão da igreja e também por meio de pessoas que cuidam da saúde. Se a ansiedade está tirando o sono e a paz por muito tempo, procure ajuda.',
          ],
        },
      },
    ],
    notas: [
      {
        titulo: 'Deus da vingança: um salmo que pede vingança?',
        paragrafos: [
          'O salmo começa chamando Deus de Deus da vingança (v.1). A ideia aqui é justiça: o juiz da terra que endireita o que está torto e defende quem foi esmagado (v.2-6).',
          'Por isso o salmista não faz justiça com as próprias mãos. Ele entrega a causa a Deus. É o mesmo caminho que o Novo Testamento ensina: não se vingar, mas deixar o juízo com Deus e vencer o mal com o bem (Romanos 12.19-21).',
        ],
      },
    ],
    apelo: 'O mundo pode ser injusto. Os problemas podem tentar nos derrubar. A ansiedade pode fazer barulho na mente. Mas nós temos uma rocha.',
    citacaoFinal: { texto: 'Mas o SENHOR é a minha torre segura; o meu Deus é a rocha em que encontro refúgio.', ref: 'Salmo 94.22' },
    oracao: [
      'Se você achava que Deus não estava vendo: ele vê.',
      'Se o seu pé estava escorregando: ele segura.',
      'Se a sua mente está barulhenta: ele consola.',
    ],
    temas: ['oração', 'ansiedade', 'justiça de Deus'],
    musica: {
      album: 'ecos-de-adoracao', faixa: 'Salmo 94',
      texto: 'O álbum Ecos de Adoração canta os Salmos 85 a 96, incluindo este.',
    },
  },

  {
    slug: 'o-rei-que-veio-servir',
    titulo: 'O Rei que veio servir',
    faixa: 'Rei',
    data: '2025-12-17',
    ocasiao: 'Pregação',
    livro: 'Hebreus',
    referencia: 'Gênesis 14.18-20; Salmo 110.4; Hebreus 7.24-25',
    versao: 'NVI',
    versiculo: { texto: 'Portanto, ele é capaz de salvar definitivamente aqueles que, por meio dele, se aproximam de Deus, pois vive sempre para interceder por eles.', ref: 'Hebreus 7.25' },
    fraseTema: 'Só Jesus é Rei e Sacerdote ao mesmo tempo. E ele vive para sempre.',
    resumo: 'Um rei misterioso aparece na vida de Abrão com pão e vinho, some por mil anos e volta numa promessa. Hebreus mostra quem ele anunciava.',
    leitura: { ref: 'Hebreus 7', url: nvi('Hebreus7') },
    introducao: [
      'Muitas vezes achamos que a vida dos patriarcas era só tranquilidade, ovelhas e tendas. Mas Gênesis 14 nos joga no meio de uma guerra internacional. De um lado, quatro reis poderosos do Oriente, liderados por Quedorlaomer. Do outro, cinco reis da região do Mar Morto, incluindo os de Sodoma e Gomorra. Um tempo de violência, rebelião e medo. Parece com os dias de hoje, não é?',
    ],
    secoes: [
      {
        titulo: 'A guerra e a escolha de Ló',
        ref: 'Gênesis 14.1-16',
        paragrafos: [
          'No meio desse fogo cruzado estava Ló, sobrinho de Abrão. Ló tinha feito uma escolha perigosa: foi morar perto de Sodoma, atraído pela prosperidade das campinas, ignorando a maldade da cidade (Gênesis 13.10-13). Foi morar perto do perigo e acabou vítima dele. Quando os reis do Oriente venceram, saquearam Sodoma e levaram Ló e a família como prisioneiros.',
          'A notícia chega a Abrão (Deus ainda não tinha mudado o nome dele). Ele poderia ter dito: “Eu avisei; ele que se vire”. Mas o justo tem compaixão. Abrão reuniu os 318 servos nascidos em sua casa, que não eram exército profissional, perseguiu os reis, atacou à noite e resgatou Ló, as mulheres e os bens.',
          'Na volta, cansado, Abrão chega ao vale de Savé. Dois reis saem ao seu encontro. O rei de Sodoma, que representa o mundo e o “toma lá, dá cá”, oferece riquezas. E Melquisedeque, rei de Salém, uma figura misteriosa que não traz ouro, mas pão, vinho e uma bênção. Abrão está num vale de decisão: a recompensa do mundo ou a bênção de Deus. É aqui que a figura de Cristo começa a brilhar.',
        ],
        nota: {
          titulo: 'Quem foi Melquisedeque?',
          paragrafos: [
            'Gênesis diz pouco: ele era rei de Salém (provavelmente a futura Jerusalém) e sacerdote do Deus Altíssimo (Gênesis 14.18). Há três leituras principais.',
            'A maioria dos intérpretes entende que foi um rei e sacerdote real daquela época, que adorava o verdadeiro Deus fora da família de Abrão. Alguns, na história da igreja, pensaram que fosse uma aparição do próprio Cristo antes da encarnação. E uma antiga tradição judaica o identificou com Sem, filho de Noé.',
            'Quando Hebreus diz que ele era “sem pai, sem mãe, sem genealogia” (Hebreus 7.3), o argumento é sobre o silêncio do texto: a Bíblia não registra a origem nem o fim dele. Por isso ele serve de retrato do Filho de Deus, que não tem começo nem fim. O ponto de Hebreus não é quem ele era, mas para quem ele apontava.',
          ],
        },
      },
      {
        titulo: 'O juramento eterno',
        ref: 'Salmo 110.4',
        citacao: { texto: 'O SENHOR jurou e não se arrependerá: “Tu és sacerdote para sempre, segundo a ordem de Melquisedeque”.', ref: 'Salmo 110.4' },
        paragrafos: [
          'Depois desse encontro, Melquisedeque some da Bíblia por quase mil anos. Até que o rei Davi escreve o Salmo 110.',
          'Para entender a profecia, é preciso entender a Lei de Moisés. Deus organizou Israel com um muro entre duas funções. De um lado, a tribo de Judá, a tribo dos reis, que segurava a espada e governava; Davi era daqui. Do outro, a tribo de Levi, a dos sacerdotes, que cuidava do altar e do perdão; Arão era daqui. Quem tem a espada não toca no altar. Quem cuida do altar não senta no trono.',
          'A Bíblia conta a história do rei Uzias. Poderoso, deixou o orgulho subir ao coração, entrou no templo para queimar incenso e não ouviu os sacerdotes que o advertiram. Na mesma hora, foi ferido com lepra (2 Crônicas 26.16-21). Entrou rei e saiu leproso. Nenhum homem comum podia unir o trono e o altar.',
          'Davi era rei, mas era pecador. Precisava de alguém com autoridade para governar e sangue para perdoar. E o Espírito Santo o fez escrever o impossível: viria alguém da ordem de Melquisedeque, rei de justiça e rei de paz ao mesmo tempo (Hebreus 7.2), sacerdote para sempre.',
        ],
      },
      {
        titulo: 'Jesus, o sacerdote perfeito',
        ref: 'Hebreus 7.14-25',
        paragrafos: [
          'Davi escreveu, mas não viu. A vaga de Rei-Sacerdote ficou aberta por séculos. Até que Hebreus 7 olha para Jesus e diz: é ele!',
          'Jesus não nasceu na tribo de Levi, mas na de Judá, a tribo dos reis (Hebreus 7.14). Pela lei, ele não podia ser sacerdote. Mas a autoridade dele não vem de uma regra humana: vem do poder de uma vida indestrutível (Hebreus 7.16). Os sacerdotes antigos morriam e precisavam ser substituídos. A morte tentou segurar Jesus e não conseguiu. Ele ressuscitou, e por isso o seu sacerdócio é permanente (Hebreus 7.23-24).',
          'Repare na palavra do versículo 25: definitivamente. Jesus não faz o serviço pela metade. Não cobre o seu pecado hoje para condenar você amanhã. Ele está à direita do Pai, e vive para interceder por quem se aproxima de Deus por meio dele.',
        ],
        nota: {
          titulo: 'O dízimo de Abrão vale como regra para hoje?',
          paragrafos: [
            'Abrão deu a Melquisedeque o dízimo de tudo (Gênesis 14.20), e Hebreus usa esse gesto para mostrar que Melquisedeque, e por extensão Cristo, é maior que Levi (Hebreus 7.4-10).',
            'Os cristãos discutem se esse episódio, anterior à Lei, faz do dízimo uma regra para a igreja. Uns entendem que sim, porque o dízimo existia antes de Moisés. Outros entendem que o Novo Testamento ensina a generosidade proporcional e alegre (2 Coríntios 9.6-7), sem fixar uma porcentagem. O argumento de Hebreus 7 não é sobre isso: é sobre a grandeza de Cristo.',
          ],
        },
      },
    ],
    notas: [],
    apelo: 'Se Jesus é esse sacerdote perfeito, por que ainda insistimos em carregar os fardos sozinhos? Por que ainda tentamos pagar a Deus com obras ou com culpa? Pare de tentar ser o seu próprio salvador. Melquisedeque trouxe pão e vinho para Abrão. Jesus deu o seu próprio corpo e sangue por você.',
    tituloOracao: 'Para orar',
    oracao: [
      'Assim como Abrão se curvou diante de Melquisedeque, entregue tudo a Jesus: os medos, os pecados escondidos, a família.',
      'Agradeça: o Rei de justiça já pagou a sua dívida, e o Rei de paz quer acalmar a sua alma.',
    ],
    temas: ['sacerdócio de Cristo', 'graça', 'Hebreus'],
    musica: {
      album: 'o-reino-inabalavel', faixa: 'O Reino Inabalável',
      texto: 'O álbum O Reino Inabalável canta a carta aos Hebreus, com Cristo acima de tudo, inclusive o seu sacerdócio eterno.',
    },
  },
  {
    "slug": "balsamo-de-gileade",
    "titulo": "Bálsamo de Gileade: por que a ferida continuava aberta?",
    "faixa": "Gileade",
    "data": "2026-10-26",
    "ocasiao": "Estudo bíblico",
    "livro": "Jeremias",
    "referencia": "Jeremias 8.4-22",
    "versao": "NVI",
    "versiculo": {
      "texto": "Não há bálsamo em Gileade? Não há médico?",
      "ref": "Jeremias 8.22 (trecho)"
    },
    "resumo": "O contexto de Gileade, a denúncia de Jeremias e o cuidado que reúne verdade e compaixão. Um estudo sobre arrependimento e restauração, com aplicações cristãs e notas de pesquisa.",
    "leitura": {
      "ref": "Jeremias 8.4-22",
      "url": "https://www.biblegateway.com/passage/?search=Jeremias+8%3A4-22&version=NVI-PT"
    },
    "introducao": [
      "Uma região conhecida por seus medicamentos. Um povo profundamente ferido. Um profeta que lamenta a ausência de restauração. A pergunta de Jeremias sobre o bálsamo de Gileade nasce dessa tensão e nos convida a ler a condição de Judá com seriedade e compaixão.",
      "Compreender essa imagem exige acompanhar três aspectos: o produto medicinal conhecido no mundo antigo, o contexto da denúncia profética e as aplicações que podemos fazer como cristãos. Essas aplicações precisam preservar o sentido da passagem e reconhecer os limites da comparação."
    ],
    "secoes": [
      {
        "titulo": "O que era Gileade?",
        "ref": "Gênesis 31.21-49; Números 26.29; Juízes 11.1",
        "paragrafos": [
          "Gileade era uma região montanhosa a leste do rio Jordão, em território correspondente à atual Jordânia. A extensão designada pelo nome varia entre as passagens. Em sentido amplo, o termo pode abranger territórios israelitas a leste do Jordão; por isso, não devemos imaginar uma cidade única ou fronteiras idênticas em todas as referências.",
          "Gileade também aparece como nome de pessoas. Entre elas estão o descendente de Maquir e Manassés, mencionado em Números 26:29, e o pai de Jefté, em Juízes 11:1.",
          "Gênesis 31 narra o encontro entre Jacó e Labão na região. Em 31:47–48, Galeede recebe a explicação de monte de pedras do testemunho, relacionado ao acordo entre ambos. Os léxicos registram propostas etimológicas diferentes para Gileade. Não é seguro apresentar aquele que se envolve como tradução estabelecida do nome, nem construir a mensagem sobre essa afirmação.",
          "Jacó e Davi passaram por essa região em episódios de deslocamento e fuga, mas esses acontecimentos não demonstram, por si só, que todo o território tivesse a designação institucional de terra dos refugiados. Devemos distinguir associações narrativas de definições históricas."
        ]
      },
      {
        "titulo": "O que era o bálsamo?",
        "ref": "Gênesis 37.25; 43.11; Ezequiel 27.17",
        "paragrafos": [
          "O termo hebraico geralmente transliterado como tsori designa, nas passagens relevantes, um produto comercial e medicinal, entendido como uma substância resinosa de origem vegetal. A planta é a fonte do produto; o bálsamo mencionado não deve ser confundido simplesmente com o nome da árvore.",
          "Em Gênesis 37:25, uma caravana vinda de Gileade transporta bálsamo para o Egito. Em Gênesis 43:11, ele aparece entre os produtos enviados por Jacó como presente. Ezequiel 27:17 também o menciona no comércio. Essas referências mostram seu valor e sua circulação, sem provar que sua planta produtora só existisse em Gileade.",
          "A identificação botânica exata permanece debatida. Um estudo publicado em Communications Biology em 2024 investigou uma Commiphora germinada de uma semente antiga e propôs uma possível relação com o tsori bíblico. Os pesquisadores apresentam uma hipótese, não uma identificação definitiva. Também não podemos reconstruir com certeza sua preparação medicinal a partir dessas referências.",
          "Para interpretar Jeremias, basta reconhecer que se tratava de uma imagem de tratamento conhecida por seus ouvintes. A mensagem não depende de identificar uma espécie vegetal ou uma receita."
        ]
      },
      {
        "titulo": "A ferida de Judá em Jeremias 8",
        "ref": "Jeremias 8.4-22",
        "paragrafos": [
          "O começo da pergunta do versículo 22, na NVI, é: “Não há bálsamo em Gileade? Não há médico?” A sequência lamenta a ausência de recuperação do povo.",
          "Essa pergunta pertence a um capítulo de denúncia e lamento. Em 8:4–6, o povo persiste em seu desvio e se recusa a voltar. Em 8:8–9, a posse da Lei contrasta com a rejeição à palavra do Senhor. Em 8:10–12, a ganância e a falsidade atingem a liderança religiosa. Em 8:18–22, o sofrimento diante da devastação ocupa o centro da passagem.",
          "A ferida é uma imagem da condição coletiva de Judá e da calamidade que o alcança. A crise inclui pecado, recusa ao arrependimento, engano e juízo. Reduzir o texto a uma mensagem genérica sobre emoções feridas perde parte importante de sua força.",
          "A pergunta sobre o bálsamo expressa perplexidade e dor. Ela não apresenta uma fórmula automática para obter cura, nem uma afirmação isolada de que qualquer sofrimento será imediatamente removido.",
          "Como aplicação, podemos examinar se o acesso à Bíblia e à vida religiosa tem produzido uma resposta obediente a Deus. Conhecer os recursos da fé e responder ao Senhor são realidades que precisam caminhar juntas."
        ]
      },
      {
        "titulo": "Quando o cuidado se torna superficial",
        "ref": "Jeremias 8.11",
        "paragrafos": [
          "Jeremias 8:11 denuncia líderes que minimizam a ferida e anunciam paz quando a situação permanece grave. O problema não é a existência de consolo, mas a oferta de segurança enganosa diante de uma crise real.",
          "Uma aplicação pastoral é reconhecer que o cuidado precisa reunir ternura e verdade. Acolher alguém envolve escutar sua dor; quando há pecado, envolve também ajudar essa pessoa a reconhecê-lo e a buscar arrependimento. Uma mensagem agradável pode falhar em tratar aquilo que exige mudança.",
          "Essa aplicação pede humildade de quem ensina. O profeta lamenta a devastação de seu povo. Seu sofrimento nos impede de transformar o texto em oportunidade para acusar os outros de maneira distante ou arrogante."
        ]
      },
      {
        "titulo": "Judá e Egito: destinatários diferentes",
        "ref": "Jeremias 8.22; 46.11",
        "paragrafos": [
          "Jeremias 8:22 lamenta a condição do povo de Judá. Jeremias 46:11, por sua vez, dirige-se ao Egito e descreve a insuficiência de seus remédios diante da calamidade anunciada.",
          "Os dois textos utilizam a linguagem do bálsamo, mas pertencem a contextos diferentes. Não devemos apresentar a fala ao Egito como simples continuação da pergunta sobre Judá. Ler cada unidade preserva tanto a denúncia quanto o destinatário de cada mensagem."
        ]
      },
      {
        "titulo": "Jesus e a imagem do médico",
        "ref": "Marcos 2.15-17; 1 Pedro 2.24-25",
        "paragrafos": [
          "Na leitura cristã, a imagem do cuidado e da restauração pode nos conduzir a Cristo. Marcos 2:15–17 apresenta Jesus usando a comparação com o médico ao explicar sua missão entre pecadores. Em 1Pedro 2:24–25, sua obra está ligada ao abandono do pecado, à vida justa e ao retorno ao Pastor.",
          "Chamar Jesus de Bálsamo de Gileade pode funcionar como metáfora cristã de sua graça restauradora. Entretanto, esse não é um título explicitamente atribuído a Jesus em Jeremias 8. A conexão é uma aplicação cristã feita à luz do Novo Testamento; o sentido imediato da passagem continua sendo o lamento pela condição de Judá.",
          "Essa distinção fortalece o ensino: primeiro ouvimos o que o texto diz em seu contexto; depois explicamos como a fé cristã relaciona o tema à pessoa e à obra de Jesus.",
          "Também não devemos usar essa imagem para afirmar que toda doença ou sofrimento persistente demonstra falta de fé ou pecado pessoal. Jeremias trata de uma situação específica. Transformá-la em diagnóstico individual de toda pessoa enferma ultrapassa o texto."
        ]
      },
      {
        "titulo": "Para examinar o coração",
        "ref": "Jeremias 8.4-22",
        "paragrafos": [
          "Ao ler Jeremias 8:4–22, podemos levar estas perguntas à oração:",
          "Tenho reconhecido diante de Deus aquilo que precisa mudar?",
          "Há alguma verdade da Palavra que conheço, mas resisto em obedecer?",
          "Ao cuidar de alguém, ofereço escuta, verdade e compaixão?",
          "Tenho anunciado esperança com fidelidade ao que a Bíblia realmente ensina?",
          "O convite é responder ao Senhor com honestidade, arrependimento e confiança. O texto permite reconhecer a gravidade da ferida sem abandonar a compaixão por quem sofre."
        ]
      }
    ],
    "notas": [
      {
        "titulo": "Fontes e leituras para aprofundar",
        "paragrafos": [
          "Bíblia, Nova Versão Internacional: Jeremias 8.4-22 e 46.11; Gênesis 31.47-49, 37.25 e 43.11; Números 26.29; Juízes 11.1; Ezequiel 27.17; Marcos 2.15-17; 1 Pedro 2.24-25.",
          "Strong e Brown–Driver–Briggs, disponíveis no Bible Hub: verbete hebraico 1568 (Gileade) e verbete 6875 (tsori, bálsamo). As propostas etimológicas e botânicas não devem ser tratadas como consenso absoluto.",
          "Sallon e colaboradores. Characterization and analysis of a Commiphora species germinated from an ancient seed suggests a possible connection to a species mentioned in the Bible. Communications Biology, 7, artigo 1109, 2024. DOI: 10.1038/s42003-024-06721-5.",
          "Vídeo que motivou o estudo: apresentação sobre Gileade e seu bálsamo, no YouTube, identificador cWM8xvXFFWY. A análise utilizou a transcrição fornecida; as afirmações foram comparadas às passagens bíblicas e às fontes acima. O vídeo não é republicado neste estudo."
        ]
      }
    ],
    "temas": [
      "arrependimento",
      "restauração",
      "cuidado pastoral",
      "Jeremias"
    ]
  },
];

// Mais recente primeiro.
reflexoes.sort((a, b) => b.data.localeCompare(a.data));

export const buscarReflexao = (slug) => reflexoes.find((r) => r.slug === slug);

export const nomesVersao = { NVI: 'Nova Versão Internacional (NVI)' };

export const creditoNVI = 'Texto bíblico da Nova Versão Internacional (NVI), © 1993, 2000, 2011 Biblica, Inc. Usado com permissão.';
