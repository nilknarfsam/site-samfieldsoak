# Site do @samfieldsoak

Site pessoal de Franklin Carvalho: fé, música criada com IA e tecnologia explicada com clareza. Publicação estática no GitHub Pages, em [samfieldsoak.com.br](https://samfieldsoak.com.br).

HTML, CSS e JavaScript com ES Modules, sem framework ou etapa de build para executar o site. As telas usam rotas por hash; páginas estáticas próprias fornecem metadados de compartilhamento.

## Começar

Leia [AGENTS.md](AGENTS.md) e [CLAUDE.md](CLAUDE.md) antes de alterar o projeto. Para publicar conteúdo, siga [docs/12](docs/12-metodo-de-publicacao-com-ia.md). Para mudar funções ou apresentação, consulte o [plano de melhorias](docs/09-plano-de-melhorias.md).

```bash
python -m http.server 8080
```

Abra `http://127.0.0.1:8080/`. Módulos e views precisam de HTTP; abrir `index.html` por `file://` não funciona.

## Seções e endereços

| Endereço | Conteúdo |
|---|---|
| `#/inicio` | Destaques, lançamento, links da bio e publicações recentes |
| `#/novidades` | Novidades em ordem de data e filtro por tema |
| `#/ia-sem-labia` | Análises e guias de tecnologia; categorias, datas e filtros preservados na aba |
| `#/musica` | Discografia, singles, primeiras versões e jornada dos Salmos |
| `#/palavra` | Estudos bíblicos e pregações |
| `#/busca` | Pesquisa local por títulos, resumos, temas e referências |
| `#/sobre` | Apresentação, processo criativo e compromissos |
| `#/<secao>/<slug>` | Página de um artigo, estudo ou álbum |
| `/p/<secao>/<slug>/` | Link permanente para compartilhar esse conteúdo |

Seções com páginas permanentes: `novidades`, `ia-sem-labia`, `palavra` e `musica`. Chamadas de Novidades que apontam para outro conteúdo usam o destino existente. Singles e primeiras versões sem detalhe próprio não ganham passagem.

## Organização

| Caminho | Responsabilidade |
|---|---|
| `index.html`, `html/` | Estrutura principal e fragmentos das telas |
| `css/`, `fontes/` | Design System, estilos e fontes locais |
| `js/dados/` | Conteúdo em texto e objetos, sem HTML |
| `js/modules/` | Roteador, templates, busca, players e compartilhamento |
| `js/telas/` | Inicialização e eventos de cada tela |
| `imagens/` | Imagens publicadas em resolução de tela |
| `p/` | HTML de compartilhamento gerado e versionado |
| `ferramentas/` | Geradores, preparação de imagens e testes |
| `docs/` | Regras, receitas, arquitetura, decisões e registros |
| `caixa-de-entrada/` | Pedidos de conteúdo e histórico de processamento |

## Publicar conteúdo

1. Partir da `main` atualizada e criar uma branch de conteúdo.
2. Seguir a receita em `docs/12`. Preservar layout, texto do Franklin e slugs publicados.
3. Preparar imagens e rodar o gerador abaixo.
4. Conferir dados, arquivos gerados e testes; revisar as páginas em 390px e 1280px.
5. Registrar a entrega e abrir PR. Marcar como publicado somente após confirmar merge e publicação.

```bash
node ferramentas/gerar-paginas.mjs
node ferramentas/gerar-paginas.mjs --check
```

O gerador grava os HTMLs, o sitemap e o manifesto de capas. Para capas novas ou alteradas, chama `ferramentas/preparar-compartilhamento.py`, com Python 3 e Pillow (`python -m pip install Pillow`). Se necessário, selecione o executável pela variável `PYTHON`. Nenhuma dependência npm foi acrescentada.

Inclua no commit as saídas em `p/`, `sitemap.xml` e `imagens/compartilhar/geradas/`. Nunca edite os HTMLs gerados à mão. Uma publicação de conteúdo pode incluir essas saídas; alterar o gerador continua sendo pista Produto.

## Compartilhamento e imagens

- Compartilhar usa a URL permanente: abre o compartilhamento do sistema ou copia o endereço.
- A passagem contém título, resumo, canonical, Open Graph e Twitter Card, além do link **Abrir página**. `location.replace()` abre a rota existente sem acrescentar a passagem ao caminho de retorno.
- A passagem não carrega GoatCounter. Somente o destino registra a visita normal.
- Capas centralizadas em fundo escuro, sem corte ou distorção: JPEG 1200 × 630, menos de 300.000 bytes. Sem capa, usa-se a imagem padrão em `imagens/compartilhar/`.
- O CI não adapta imagens e não precisa de Pillow: confere dimensões/peso e a atualização dos arquivos e do manifesto de fontes.
- O sitemap contém a raiz e as URLs permanentes, sem fragmentos `#` ou datas presumidas.

Especificação: [docs/14 – Compartilhamento](docs/14-compartilhamento-e-paginas-permanentes.md). A prévia real no WhatsApp depende de conferência após a publicação; os testes verificam metadados e navegação.

## Verificações

Node 22 ou superior. Para testes de navegador, use o Playwright da versão configurada em `.github/workflows/conferir.yml` e seu Chromium. O GitHub Actions instala essas ferramentas; não são dependências do site publicado.

```bash
node ferramentas/conferir-dados.mjs
node ferramentas/gerar-paginas.mjs --check
node --test ferramentas/testar-validacao-dados.mjs ferramentas/testar-busca.mjs ferramentas/testar-paginas-publicas.mjs
node ferramentas/testar-rotas.mjs --capturas
git diff --check
```

`--check` falha se houver página ausente, HTML/sitemap desatualizado, fonte de capa alterada sem regenerar ou imagem fora dos limites. Não corrige nem grava arquivos no CI.

As capturas ficam em `ferramentas/capturas/` (fora do Git) e no artefato `capturas` do Actions por sete dias. A suíte verifica rotas em 390px/1280px, o menu da busca em 768px/992px e passagens representativas com e sem JavaScript. Não substitui leitor de tela real, escuta dos players ou conferência da prévia em outro aplicativo.

## Comportamentos e privacidade

- **Busca:** local, sem guardar ou enviar termos. Consulta metadados, sem letras nem corpo dos artigos. Reabrir a tela reinicia o campo.
- **IA sem lábia:** análise mais recente primeiro, datas identificadas, filtros preservados na aba e status como filtro somente quando há variedade. Índice e tempo estimado ajudam na leitura.
- **Menu:** painel recolhido até 991px; navegação aberta a partir de 992px.
- **Players:** embeds só carregam após clique. Um Suno/Spotify gerenciado por vez; mudar de página encerra a reprodução. Abas externas não são controladas. [Cadastro e limites do piloto](docs/13-player-suno-por-faixa.md).
- **Letras:** carregadas sob demanda de `js/dados/letras/`. A proteção contra cópia é leve; não impede captura de tela.
- **Métricas:** GoatCounter conta rotas sem cookies. Não recebe termos da busca nem conta a passagem de compartilhamento.

## Manutenção e revisão

O repositório é a referência atual. Cópias no Drive podem estar antigas. O [plano](docs/09-plano-de-melhorias.md) guarda situação e próximas tarefas; o [registro](docs/registro-de-publicacoes.md) preserva as entregas. Auditorias e roteiros datados documentam o estado daquela época.

Pendências: aceite real dos players, conferência de prévias após publicar a T-20 e observações de manutenção registradas nas revisões. Não marcar teste manual ou publicação como concluídos sem evidência. Revisão do Claude e merge pelo Franklin, salvo autorização explícita em contrário.
