# 14 – Compartilhamento e páginas permanentes

Especificação da T-20, aprovada por Franklin em 16/11/2026. Disponível no domínio após merge e deploy do PR correspondente.

## Contrato de endereços

Cada detalhe de Novidades, IA sem lábia, Palavra ou Música recebe `/p/<secao>/<slug>/`, com barra final. Origem canônica: `https://samfieldsoak.com.br`. Alterar um título não altera o slug nem o link. As rotas existentes `/#/<secao>/<slug>` continuam funcionando.

O catálogo `js/modules/paginas-publicas.js` é usado pelo gerador e pelo botão Compartilhar. Chamadas de Novidades com `rota` não recebem segunda passagem. Singles e primeiras versões sem página própria ficam fora do catálogo. A primeira geração tem 29 páginas; o número cresce com o cadastro.

## HTML e navegação

Título e resumo são escapados tanto no texto quanto nos metadados. Canonical e `og:url` apontam para o link permanente. Open Graph e `twitter:card=summary_large_image` usam imagem absoluta em HTTPS, com dimensões e tipo declarados.

`location.replace('/#/secao/slug')` substitui a passagem no histórico. Não há `meta refresh`. Título, resumo e **Abrir página** ficam disponíveis se o JavaScript estiver desativado ou o redirecionamento falhar. O servidor entrega HTTP 200 para leitura dos metadados sem scripts.

A passagem não importa `main.js`, SDKs ou GoatCounter. A contagem normal ocorre no destino. Os testes verificam Voltar e uma única chamada de contagem no destino, com o contador remoto simulado.

Os caminhos absolutos destinam-se ao domínio na raiz e ao servidor local iniciado na raiz do repositório. Esta entrega não cria suporte a hospedagem em subdiretório com outra origem.

## Imagens prontas no repositório

`ferramentas/preparar-compartilhamento.py` usa Pillow. O gerador Node chama esse auxiliar somente para fontes novas/alteradas ou saídas inválidas/ausentes. Não há dependência npm nova nem processamento no site do visitante.

- JPEG, 1200 × 630, menos de 300.000 bytes.
- Imagem original inteira, ajustada proporcionalmente e centralizada sobre fundo escuro (`--cor-fundo`). Capa quadrada fica com faixas laterais, sem corte nem distorção.
- Saídas: `imagens/compartilhar/geradas/<secao>-<slug>-1200x630.jpg`.
- Sem capa cadastrada, usa `imagens/compartilhar/samfieldsoak-1200x630.jpg`.
- Capa cadastrada com caminho inexistente é erro; o fallback não oculta arquivo quebrado.
- `fontes.json` registra fontes, assinaturas e parâmetros do ajuste, sem dados privados.

O CI lê cabeçalhos JPEG para conferir dimensões/peso. Não redimensiona, não recomprime e não instala Pillow. A comparação do manifesto detecta fonte trocada sem regenerar.

## Gerar e conferir

Geração: Node 22+, Python 3 e Pillow. A variável `PYTHON` seleciona o executável; por padrão, usa `python3`.

```bash
python -m pip install Pillow
node ferramentas/gerar-paginas.mjs
node ferramentas/gerar-paginas.mjs --check
```

O primeiro comando Node atualiza `p/`, capas necessárias, manifesto e sitemap. Grava somente saídas diferentes e não apaga arquivos: uma passagem sem cadastro exige revisão explícita para preservar a permanência dos links.

`--check` é somente leitura e dispensa Python. Compara HTML/sitemap/manifesto e confere as imagens prontas. Ausência ou desatualização encerra com código 1, bloqueando o CI. Edite dados ou a fonte da capa e regenere; não corrija o HTML gerado à mão.

O sitemap contém a raiz e os links `/p/.../`, sem hashes, duplicações ou datas presumidas.

## Receita de publicação

1. Depois de alterar conteúdo/capas, rodar o gerador, conferir saídas e incluí-las no commit.
2. Executar as verificações do README, incluindo `--check` e testes das páginas públicas.
3. Informar no PR as rotas por hash e os links permanentes afetados.
4. Depois do merge/deploy, conferir HTTP 200, redirecionamento e uma prévia real no WhatsApp.

`p/` e `sitemap.xml` são exceções geradas permitidas em Conteúdo, verificadas pelo CI. Alterar gerador, modelo HTML, catálogo ou auxiliar de imagens é Produto. Receitas e regras: `docs/12` e `AGENTS.md`.

## Conferência e limites

| Verificação | Evidência |
|---|---|
| HTML, metadados e escapes | Testes Node e `--check` |
| Arquivo alterado, ausente ou fonte trocada | CI falha sem gravar correções |
| Imagens | JPEG 1200 × 630 e menos de 300.000 bytes |
| Fallback sem JavaScript | Título, resumo e Abrir página visíveis |
| Redirecionamento e Voltar | Destino correto e retorno sem passagem intermediária |
| Contador | Sem SDK na passagem; contagem normal no destino |
| Compartilhar/copiar | URL permanente correspondente ao detalhe |
| WhatsApp | Conferência manual após publicação; pode haver cache do aplicativo |

Rotas de referência: `/p/novidades/prompt-motion/`, `/p/ia-sem-labia/precisa-pagar-antivirus/`, `/p/palavra/quando-a-visao-engana/` e `/p/musica/santuario-do-altissimo/`.

Capturas no artefato `capturas` do Actions por sete dias. Testes de metadados não comprovam a aparência da prévia em aplicativos externos, nem garantem indexação ou posição em mecanismos de busca.
