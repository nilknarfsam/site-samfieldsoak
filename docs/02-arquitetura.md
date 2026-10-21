# 02 – Arquitetura (v2)

Padrão: skill **base-site-spa-franklin**. Referência viva: github.com/nilknarfsam/ong-maos-que-semeiam (tag `ep3`).

## Estrutura de pastas

```
site-samfieldsoak/
├── index.html
├── 404.html                     redireciona para #/inicio
├── html/
│   ├── inicio.html
│   ├── ia-lista.html   ia-detalhe.html
│   ├── musica.html
│   ├── palavra-lista.html   palavra-detalhe.html
│   └── sobre.html
├── css/  variaveis.css base.css layout.css componentes.css utilitarios.css
├── fontes/
├── imagens/
│   ├── ia/<slug>/capa.webp
│   ├── albuns/<slug>.webp
│   └── palavra/<slug>.webp      (opcional)
├── js/
│   ├── main.js
│   ├── dados/  ferramentas.js  albuns.js  reflexoes.js  links.js
│   ├── modules/ roteador.js templates.js filtro.js menu.js feedback.js
│   └── telas/  inicio.js ia-lista.js ia-detalhe.js musica.js palavra-lista.js palavra-detalhe.js
├── caixa-de-entrada/            ideias vindas do celular (não publicadas como página)
│   └── processadas/
├── conteudo/  docs/  CLAUDE.md  README.md
```

Roteador: quando a rota tiver segundo segmento (`#/ia-sem-labia/ootto`) e ele for um slug conhecido da seção, abrir a view de detalhe; se não for, mostrar "Conteúdo não encontrado" com link para a lista.

## Modelos de dados

### `js/dados/ferramentas.js` (IA sem lábia)

```js
export const ferramentas = [{
  slug: 'ootto', nome: '...', categoria: 'instagram',   // instagram | video | voz | whatsapp | dev | design | outros
  status: 'analisado', analisadoEm: '2026-10-20', conferidoEm: '2026-10-20',
  resumo: '...', promete: [], verdade: [], naoConta: [],
  custos: [{ plano: '', preco: '', periodo: '' }],
  paraQuem: [], naoServePara: [], caminhoGratis: [], comoComecar: [],
  links: [{ rotulo: '', url: '' }],
  carrossel: { capa: 'imagens/ia/<slug>/capa.webp', post: 'https://instagram.com/p/...' }
}];
```

### `js/dados/reflexoes.js` (Palavra)

```js
export const reflexoes = [{
  slug: 'quem-me-livrara-romanos-7', titulo: 'Quem me livrará?',
  data: '2026-10-14', livro: 'Romanos', referencia: 'Romanos 7.24-25', versao: 'NVI',
  versiculo: '...',                 // trecho curto
  texto: ['parágrafo 1', 'parágrafo 2'],
  pergunta: '...', oracao: '...',   // opcionais
  temas: ['graça', 'justificação'],
  musicaRelacionada: 'tratado-de-romanos'   // slug do álbum, opcional
}];
```

### `js/dados/albuns.js` (Música)

```js
export const albuns = [{
  slug: 'o-reino-inabalavel', titulo: 'O Reino Inabalável', lancamento: '2026-02', base: '', estilo: '',
  faixas: 15, descricao: '...', capa: 'imagens/albuns/o-reino-inabalavel.webp', destaque: false,
  links: [{ rotulo: 'Spotify', url: '' }], reflexoesRelacionadas: []
}];
```

### `js/dados/links.js` (Início)

Botões da bio em ordem, cada um com rótulo, ícone e destino (rota interna ou URL externa).

## Publicação

1. Repositório recomendado `nilknarfsam.github.io`.
2. Primeira versão: Pages a partir da branch `main` (root). Depois: GitHub Actions.
3. Link da bio: `https://nilknarfsam.github.io`. Para citar uma página específica: `https://nilknarfsam.github.io/#/ia-sem-labia/<slug>`.

## Testes mínimos

Todas as rotas, voltar, F5, rota e slug inválidos, 390px e 1280px, teclado, W3C sem erros, contraste medido, links externos com `target="_blank" rel="noopener"`.
