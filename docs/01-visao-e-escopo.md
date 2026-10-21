# 01 – Visão e escopo (v2)

## Objetivo

Um lugar organizado para tudo o que o Franklin publica e cria: ferramentas de IA explicadas sem lábia, lançamentos de música e reflexões bíblicas. É o destino do link da bio do Instagram. O post atrai; o site explica, guarda e organiza.

## Público

- Seguidores do @samfieldsoak.
- Pequenos empreendedores e criadores que querem usar IA sem gastar à toa.
- Irmãos da igreja e quem gosta de música cristã e de reflexões.
- Iniciantes em tecnologia (texto simples; termo técnico sempre explicado).

## Seções e telas

| Rota | Tela | Versão |
|---|---|---|
| `#/inicio` | Link na bio: foto/logo, frase, botões grandes (IA sem lábia, Música, Palavra, Instagram) e "Novidade" (última publicação de qualquer seção) | v1 |
| `#/ia-sem-labia` | Lista de ferramentas e temas, filtro por categoria e status | v1 |
| `#/ia-sem-labia/<slug>` | Página completa de uma ferramenta ou tema (modelo abaixo) | v1 |
| `#/musica` | Lançamento em destaque + álbuns (capa, frase, base bíblica, links) | v1 |
| `#/musica/<slug>` | Página de um álbum (faixas, história, links) | v2 |
| `#/palavra` | Lista de versículos e reflexões, filtro por tema e livro | v1 |
| `#/palavra/<slug>` | Uma reflexão: versículo, texto, pergunta para pensar, música relacionada (se houver) | v1 |
| `#/sobre` | Quem é o Franklin e o compromisso do site | v1 |
| `#/projetos` | Apps e projetos | v2 |

## Modelo de página da IA sem lábia

1. Título e resumo em uma frase. 2. Status (analisado / testado / em uso) com data. 3. O que promete. 4. O que é verdade. 5. O que o post não conta. 6. Quanto custa de verdade (tabela com data). 7. Para quem serve e para quem não serve. 8. Caminho grátis ou mais barato. 9. Como começar. 10. Links oficiais. 11. Carrossel relacionado.

## Modelo de página da Palavra

1. Título. 2. Versículo-chave com referência e versão. 3. Reflexão (texto do Franklin). 4. Pergunta para pensar ou aplicação. 5. Oração curta (opcional). 6. Música relacionada (opcional, liga com a seção Música). 7. Data.

## Ligações entre seções

- Uma reflexão pode apontar para a música baseada no mesmo texto (ex.: Salmos → álbuns dos Salmos; Romanos → Tratado de Romanos).
- Uma música pode apontar para a reflexão do texto bíblico dela.
- O Início mostra a novidade mais recente de qualquer seção.

## Versão 1

Início, IA sem lábia (lista + detalhe), Música (lista), Palavra (lista + detalhe), Sobre. Conteúdo inicial: as ferramentas de `conteudo/ferramentas-iniciais.md`, os álbuns de `conteudo/musica-e-links.md` e o que estiver na `caixa-de-entrada/`. Publicado no GitHub Pages e colocado na bio.

## Fora do escopo da v1

Login, banco de dados, comentários, formulário de e-mail, afiliados. Se algum dia entrar link de afiliado, sinalizar claramente.
