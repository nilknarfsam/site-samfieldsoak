# 02 – Arquitetura

## Execução e camadas

Site estático em HTML, CSS e JavaScript com ES Modules. Sem framework, servidor de aplicação ou build de execução. O roteador usa `#/secao/slug` para manter a navegação no GitHub Pages.

| Camada | Caminho | Contrato |
|---|---|---|
| Dados | `js/dados/` | Objetos e textos, sem HTML; comentários dos arquivos descrevem os campos |
| Templates | `js/modules/templates*.js` | HTML construído a partir de dados escapados |
| Telas | `js/telas/` | Inicialização da view, filtros e eventos |
| Rotas | `js/main.js`, `js/modules/roteador.js` | Views, detalhes, âncoras, título, foco e ciclo dos players |
| Views | `html/` | Fragmentos injetados no elemento `#app` |
| Estilos | `css/` | Variáveis → base → layout → componentes → utilitários |
| Compartilhamento | `js/modules/paginas-publicas.js` | Catálogo único de detalhes e endereços permanentes |
| Saídas estáticas | `p/`, `sitemap.xml` | Conteúdo gerado e versionado; nunca editado à mão |
| Ferramentas | `ferramentas/` | Validação, geração, preparo de imagens e testes |

## Modelos e destinos

- `ferramentas.js`: análises e guias; categoria, status, análise/fontes, listas, custos e relacionados. `windows` aparece como Windows e segurança. Status único vira nota, sem filtro redundante.
- `reflexoes.js`: estudos/pregações; título, referência, versão, resumo e seções. Data e ocasião não aparecem no detalhe como data da pregação.
- `albuns.js`: álbuns, singles, séries e primeiras versões. `faixasLista[].texto` é referência bíblica. Letras ficam em módulos separados, carregados no detalhe do álbum.
- `novidades.js`: artigos completos ou chamadas com `rota`. `rotaNovidade()` fornece o destino das chamadas.
- `links.js` e `perfil.js`: atalhos da home, apresentação e configuração da contagem existente.

Os detalhes aceitos pelo roteador pertencem a Novidades, IA sem lábia, Palavra e álbuns. Singles e primeiras versões não ganham detalhes fictícios. Slug desconhecido mostra Conteúdo não encontrado; seção desconhecida volta ao Início.

## Busca e privacidade

O índice em memória reúne títulos, resumos, temas/categorias e referências, incluindo as faixas dos álbuns. Não lê letras nem corpo dos artigos. Os destinos são deduplicados; palavras da consulta são combinadas sem acentos/maiúsculas. Nenhum termo entra no endereço, storage ou contador. Reabrir a tela começa vazio.

## Compartilhamento

O catálogo é consumido pelo gerador e pelo botão Compartilhar. `p/<secao>/<slug>/index.html` fornece HTML legível sem JavaScript, Open Graph, Twitter Card e canonical. `location.replace()` abre a rota existente; Abrir página permanece como fallback. A passagem não importa o aplicativo ou o contador.

`gerar-paginas.mjs` prepara HTML/sitemap/manifesto e chama Pillow somente quando é necessário adaptar capa local. O CI usa `--check`, sem Python e sem processamento de imagens. Contratos completos em [docs/14](14-compartilhamento-e-paginas-permanentes.md).

## Interface e acessibilidade

Tokens em `css/variaveis.css`, layout mobile first, foco visível, um h1 por tela, referências semânticas e textos escapados. Menu em painel até 991px e aberto a partir de 992px. Movimento respeita a preferência de redução. Os detalhes mantêm botão Compartilhar; o índice de IA usa foco local sem alterar hash ou histórico.

## Publicação e testes

Cloudflare Pages (projeto `site-samfieldsoak`) a partir da raiz da `main`, sem etapa de build, no domínio samfieldsoak.com.br e em `www` (desde 21/11/2026; antes, GitHub Pages). Cada merge na `main` publica sozinho e cada PR ganha uma prévia em `https://<branch>.site-samfieldsoak.pages.dev`. O DNS do domínio fica no Cloudflare (servidores trocados no Registro.br em 21/11/2026). O arquivo `CNAME` é do GitHub Pages e não é usado pelo Cloudflare. `p/` e os assets absolutos são destinados à raiz desse domínio. O áudio das primeiras versões fica no Cloudflare R2, em `audio.samfieldsoak.com.br` (docs/15).

A sequência de geração e testes é mantida no README e no docs/12. O Actions bloqueia dados inválidos e saídas desatualizadas, executa suítes Node e testes em navegador, e guarda capturas por sete dias. Conferência manual de prévia/áudio acontece após a publicação quando depender do serviço externo.
