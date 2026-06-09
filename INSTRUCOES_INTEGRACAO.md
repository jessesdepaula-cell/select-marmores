# Guia de Integração: Planilha de Leads -> Dashboard Select Mármores

Este guia explica como integrar sua planilha de leads do Google Sheets com o dashboard do projeto **Select Mármores** em tempo real e de forma retroativa (enviando os leads antigos).

---

## 🚀 Passo 1: Publicar o Dashboard
Para que a planilha consiga enviar os dados, o seu dashboard Next.js precisa estar publicado na internet (ex: na **Vercel**). 

1. Faça o deploy do projeto no GitHub e configure a Vercel seguindo o `README.md` do projeto.
2. Copie a URL do seu site publicado (ex: `https://select-marmores.vercel.app`).

---

## 📝 Passo 2: Adicionar o Script no Google Sheets

1. Abra a sua planilha do Google Sheets: [Planilha de Leads](https://docs.google.com/spreadsheets/d/1V1DmIIuewFCJZsymSJcFT3A05PfEQTtJav91-JGttc8/edit?usp=sharing).
2. No menu superior, clique em **Extensões** > **Apps Script**.
3. Apague qualquer código existente no editor e cole o código completo do arquivo [`google-apps-script.js`](./google-apps-script.js) (que foi gerado no seu workspace).
4. Na linha **4** do código, substitua `"SUA_URL_DO_DASHBOARD_AQUI"` pela URL real do seu dashboard publicado:
   ```javascript
   var DASHBOARD_URL = "https://seu-projeto-vercel.app"; // Lembre-se de colocar a sua URL aqui!
   ```
5. Clique no ícone de disquete (Salvar projeto) ou pressione `Ctrl + S`.
6. Você pode renomear o projeto no topo de "Projeto sem título" para "Integração Select Mármores".

---

## ⚙️ Passo 3: Configurar o Envio em Tempo Real (Gatilho)
Para fazer os novos leads irem automaticamente em tempo real sempre que a planilha receber novos registros (seja via Facebook Lead Ads, Zapier, Make ou digitação manual):

1. No painel do **Apps Script** (onde você acabou de colar o código), clique no ícone de **Relógio** (Gatilhos / Triggers) no menu lateral esquerdo.
2. No canto inferior direito, clique em **+ Adicionar gatilho**.
3. Configure o gatilho da seguinte forma:
   - **Escolha a função a ser executada:** `enviarNovosLeads`
   - **Escolha a implementação a ser executada:** `Head`
   - **Selecione a fonte do evento:** `Da planilha`
   - **Selecione o tipo de evento:** `Ao alterar` *(On change)*  
     *(Nota: Usamos "Ao alterar" porque as ferramentas de automação como Zapier/Facebook inserem linhas por API, o que não dispara o evento "Ao editar" padrão).*
4. Clique em **Salvar**.
5. Uma janela do Google será aberta pedindo permissões. Clique na sua conta, depois em **Avançado** > **Acessar Integração Select Mármores (não seguro)** e confirme as permissões clicando em **Permitir**.

> [!TIP]
> **Alternativa (Super Segura):** Se por acaso o gatilho "Ao alterar" não disparar devido a alguma restrição de API da sua ferramenta de lead, você pode configurar outro gatilho como:
> - **Selecione a fonte do evento:** `Baseado no tempo`
> - **Selecione o tipo de gatilho baseado no tempo:** `Temporizador de minutos`
> - **Selecione o intervalo de minutos:** `A cada minuto`
> 
> Isso fará com que o script verifique a planilha a cada minuto e envie os novos leads automaticamente.

---

## 💎 Passo 4: Sincronizar os Leads Antigos e Testar
Agora você pode enviar todos os leads antigos que já estavam na planilha:

1. Atualize a página da sua planilha de leads no navegador.
2. Você verá um novo menu no topo chamado **Select Mármores 💎**.
3. Clique em **Select Mármores 💎** > **Enviar Novos Leads** ou **Enviar Todos os Leads (Reenviar)**.
4. O script iniciará o envio de todas as linhas. Ele criará automaticamente uma nova coluna chamada `status_integracao` na planilha (no final das colunas existentes) e a preencherá com **"Enviado"** para cada lead sincronizado com sucesso.
5. Acesse o seu dashboard e atualize os dados para ver os leads inseridos!

---

## 🔍 Como o script mapeia os dados da Planilha:
O script é inteligente e mapeia as colunas dinamicamente com base nos nomes da linha 1 (cabeçalho). Ele busca as seguintes colunas (independente de estarem fora de ordem):
- `nome_completo` -> Nome do lead (obrigatório).
- `telefone` -> Telefone do lead (obrigatório, limpa o prefixo `p:` caso exista).
- `platform` -> Identifica a plataforma (se `fb` vira "Facebook", se `ig` vira "Instagram").
- `campaign_name`, `ad_name` e `form_name` -> São consolidados na mensagem do lead para que você saiba exatamente de qual campanha ele veio.
- `status_integracao` -> Coluna de controle criada pelo script para evitar envios duplicados.
