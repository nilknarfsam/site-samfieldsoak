# Ferramentas iniciais (rascunho de conteúdo público)

Origem: análises feitas entre 14 e 20/10/2026 (Drive: Claude/Pendências/Pendências para testar em casa e Claude/Ferramentas e Apps). Todas com status **analisado** (nenhuma testada ainda). **Antes de publicar, conferir preço, licença e links no dia** e atualizar `conferidoEm`. Quando o Franklin testar uma, mudar o status para `testado` e acrescentar o que ele viu.

---

## 1. verdades-ia-instagram – "Ligar a IA no seu Instagram" (página do carrossel 1)
- **Categoria:** instagram · **Status:** analisado (20/10/2026)
- **Resumo:** O que os posts sobre "colocar o Claude para tocar seu Instagram" não contam.
- **Promete:** a IA posta, responde e vende sozinha no seu Instagram.
- **Verdade:** os conectores existem e usam o login oficial do Instagram; ajudam a ver métricas, organizar respostas e agendar.
- **Não conta:** a maioria é paga, em dólar, por semana ou mês; exige conta Profissional; a IA responde só dentro das regras que você escrever; os números do print são da conta de quem vende.
- **Caminho grátis:** Meta Business Suite (agenda posts e mostra métricas).
- **Antes de assinar, pergunte:** quanto custa em real? quem aprova o que é postado? dá para cancelar quando quiser?
- **Relacionadas:** ootto, instagram-skills.
- **Carrossel:** capa `2026-10-20_carrossel-verdades-ia_capa_v01.png`.

## 2. ootto – conector do Instagram para o Claude
- **Categoria:** instagram · **Status:** analisado (20/10/2026)
- **Verdade:** conector MCP (endereço mcp.ootto.ai/mcp) que liga o Claude ao Instagram: painel de métricas, caixa de entrada, agendamento e comentário-para-DM.
- **Não conta:** pago (em 20/10/2026: plano Weekly US$ 10/semana; Self-serve US$ 48/mês); exige conta Profissional; configuração feita pelo computador.
- **Caminho grátis:** a própria empresa publica skills MIT (github.com/Ootto-AI/claude-content-skills).
- **Links:** ootto.ai

## 3. instagram-skills – "9 skills grátis"
- **Categoria:** instagram · **Status:** analisado (20/10/2026)
- **Promete:** 9 skills grátis que colocam o Claude para tocar seu Instagram.
- **Verdade:** repositório real (github.com/sergebulaev/instagram-skills, licença MIT, cerca de 309 estrelas em 20/10/2026) com skills de legenda, carrossel, gancho, hashtags, "humanizador", plano semanal, reaproveitamento de posts, revisão de perfil e análise do que bomba.
- **Não conta:** as skills são grátis, a ferramenta não: o Claude Code pede plano pago ou chave de API; postar sozinho depende de um serviço comercial (Publora); a análise do que bomba usa Apify (token); as regras de escrita são em inglês.
- **Para quem serve:** quem já usa o Claude e quer um roteiro pronto para legendas e planejamento.
- **Como começar:** `claude plugin marketplace add sergebulaev/instagram-skills` e depois `claude plugin install instagram-skills@instagram-skills`; no claude.ai, Skills → Add from GitHub.

## 4. opencut – editor de vídeo grátis
- **Categoria:** video · **Status:** analisado (14 e 20/10/2026)
- **Promete:** alternativa grátis ao CapCut, sem limite de exportação nem assinatura.
- **Verdade:** projeto open source (MIT, cerca de 90 mil estrelas) que roda no navegador ou na própria máquina.
- **Não conta:** está sendo reescrito; para uso hoje o projeto indica o opencut-classic; instalar localmente exige Bun (e opcionalmente Docker); recursos podem ser menores que os do CapCut.
- **Links:** github.com/OpenCut-app/OpenCut, opencut.app

## 5. voicestudio – voz com IA no próprio PC
- **Categoria:** voz · **Status:** analisado (16/10/2026)
- **Promete:** "já pode cancelar o ElevenLabs".
- **Verdade:** app open source (AGPL-3.0, cerca de 68 mil estrelas) para clonar voz, narrar, dublar e transcrever no próprio computador.
- **Não conta:** sem placa NVIDIA roda pela CPU e fica lento; qualidade em português ainda precisa ser testada; a licença dos modelos de voz é separada da licença do app (conferir antes de uso comercial); não substitui vídeo, música e imagem do ElevenLabs.
- **Links:** github.com/debpalash/VoiceStudio

## 6. agente-whatsapp – agente de IA no WhatsApp com Claude
- **Categoria:** whatsapp · **Status:** analisado (20/10/2026)
- **Promete:** "monte um agente de IA no WhatsApp em 30 minutos".
- **Verdade:** dá para fazer com a API oficial do WhatsApp (Meta) e o Claude, ou com atalhos como a Kapso (plano grátis com 2.000 mensagens/mês em 20/10/2026).
- **Não conta:** precisa de chave da API da Anthropic (paga por uso); o número instantâneo grátis da Kapso é americano (+1); para número brasileiro é preciso conectar um WhatsApp Business; o agente responde só o que estiver nas regras do negócio.
- **Links:** developers.facebook.com (WhatsApp Cloud API), kapso.ai

## 7. vapi – dar um número de telefone ao Claude
- **Categoria:** voz · **Status:** analisado (20/10/2026)
- **Verdade:** a Vapi monta agentes de voz por telefone e aceita o Claude como modelo; dá para testar pelo navegador com crédito inicial.
- **Não conta:** o número grátis só liga para EUA/Canadá; no Brasil precisa de número de outro provedor (ex.: Twilio) e atenção às regras da Anatel (prefixo 0303 para chamadas de oferta) e à LGPD; custo real de cerca de US$ 0,10 a 0,30 por minuto.
- **Links:** vapi.ai, docs.vapi.ai

## 8. canal-faceless – canal no YouTube sem aparecer (Claude + Higgsfield)
- **Categoria:** video · **Status:** analisado (17/10/2026)
- **Promete:** canal faceless que pode render R$ 20 mil por mês.
- **Verdade:** o fluxo existe (Claude escreve, Higgsfield gera cenas com narração e legenda).
- **Não conta:** a meta de R$ 20 mil exige algo perto de 1 milhão de visualizações por mês; os créditos do Higgsfield são pagos; o YouTube restringe conteúdo de IA repetitivo e pede marcação de conteúdo sintético realista.
- **Links:** higgsfield.ai

---

Outras candidatas para depois (já analisadas, menos ligadas ao público do Instagram): Replica skill, text-to-cad, diagram-design, hyperframes, Handy, Cap, AnythingLLM, LocalSend.
