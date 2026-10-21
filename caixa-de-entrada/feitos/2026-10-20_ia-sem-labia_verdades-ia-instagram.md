---
secao: ia-sem-labia
slug: verdades-ia-instagram
status: feito   # feito no PC em 2026-10-20 (site ainda não publicado no GitHub)
criado: 2026-10-20
origem: "Carrosséis do Instagram sobre ligar o Claude ao Instagram (conector Ootto e '9 skills grátis'), analisados em 20/10/2026"
carrossel: "2026-10-20_carrossel-verdades-ia_capa_v02.png (o Franklin sobe na pasta Claude/Design/04 - Perfil @samfieldsoak)"
conferir_no_dia: true
---

# Ligar a IA no seu Instagram: as verdades que ninguém conta

## Texto para o site

**Resumo:** antes de assinar uma ferramenta que promete "colocar a IA para tocar o seu Instagram", veja o que ela faz de verdade e o que o post deixa de fora.

**Status:** analisado em 20/10/2026 (ainda não testado pelo Franklin).

### O que os posts prometem
- A IA posta, responde e vende sozinha no seu Instagram.
- "Skills grátis" que fazem tudo por você.

### O que é verdade
- Os conectores existem e usam o login oficial do Instagram.
- Ajudam a ver métricas, organizar respostas, planejar e agendar posts.
- As skills de legenda, carrossel e hashtags são úteis como roteiro para quem já usa o Claude.

### O que o post não conta
- A maioria das ferramentas é paga, em dólar, por semana ou por mês, e o preço quase nunca aparece no post.
- Precisa de conta Profissional do Instagram. Com conta pessoal, a ferramenta não posta nem responde comentários.
- A IA não fecha venda sozinha: ela responde dentro das regras que você escrever. Sem regras, responde besteira em seu nome.
- Os números do print são da conta de quem vende a ferramenta, não da sua.
- "Grátis" muitas vezes é só a skill: o Claude Code pede plano pago ou chave de API, e postar sozinho ou analisar dados passa por serviços pagos.

### Quanto custa de verdade (conferir no dia)
| Ferramenta | Plano | Preço em 20/10/2026 |
|---|---|---|
| Ootto | Weekly | US$ 10 por semana |
| Ootto | Self-serve | US$ 48 por mês |
| instagram-skills | skills | grátis (MIT); exige Claude pago ou API; postagem automática via serviço pago |

### Para quem serve
- Quem já posta com frequência e quer ganhar tempo com métricas, respostas e agendamento.

### Para quem não serve
- Quem espera que a IA venda sozinha, sem acompanhar.
- Quem ainda não tem conta Profissional.

### Caminho grátis
- Meta Business Suite: agenda posts e mostra métricas sem custo.

### Antes de assinar, pergunte
1. Quanto custa em real, com impostos e câmbio?
2. Quem aprova o que é postado ou respondido?
3. Dá para cancelar quando quiser?

### Páginas relacionadas
- `#/ia-sem-labia/ootto` e `#/ia-sem-labia/instagram-skills` (detalhes em conteudo/ferramentas-iniciais.md).

### Links oficiais
- Ootto: https://ootto.ai
- instagram-skills: https://github.com/sergebulaev/instagram-skills
- Meta Business Suite: https://business.facebook.com

## Imagens

- Capa do carrossel → `imagens/ia/verdades-ia-instagram/capa.webp` (converter de PNG para WebP, manter 1080×1350).

## Carrossel no Instagram (roteiro aprovado, para referência)

1. Capa: "Ligar a IA no seu Instagram: as verdades que ninguém conta".
2. Funciona? Sim. Os conectores existem e usam o login oficial.
3. Mas é pago, em dólar, e o post quase nunca mostra o preço.
4. Precisa de conta Profissional.
5. A IA não fecha venda sozinha.
6. Os números do print não são seus.
7. Tem caminho grátis: Meta Business Suite.
8. Antes de assinar, pergunte: quanto custa em real? quem aprova? dá para cancelar?
9. Último card: "SAIBA MAIS NO LINK DA BIO" + "Comente e compartilhe com quem precisa ver isso".

## Pedido para o Claude Code

```
Crie a página desta ideia no site:
- seção: IA sem lábia, slug verdades-ia-instagram;
- adicione a entrada em js/dados/ferramentas.js (categoria instagram, status analisado) seguindo o docs/02-arquitetura.md;
- use o texto deste arquivo sem mudar o sentido;
- confira hoje os preços da Ootto e os links oficiais e atualize conferidoEm;
- converta a capa para WebP e copie para imagens/ia/verdades-ia-instagram/;
- marque esta página como "Novidade" no Início;
- rode o site e me mostre #/ia-sem-labia/verdades-ia-instagram.
Depois do meu ok: commit, status publicado, mover para processadas/ e registrar em docs/registro-de-publicacoes.md.
```
