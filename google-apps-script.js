// ==========================================
// CONFIGURAÇÃO - COLOQUE SEU LINK AQUI
// ==========================================
// Caso o seu site publicado tenha um link diferente de "https://select-marmores.vercel.app",
// altere o endereço entre aspas na linha abaixo:
var DASHBOARD_URL = "https://select-marmores.vercel.app";

// ==========================================
// FUNÇÕES DE EXECUÇÃO
// ==========================================

/**
 * Envia apenas os leads novos (que ainda não foram enviados).
 */
function enviarNovosLeads() {
  Logger.log("Iniciando envio de novos leads...");
  var count = enviarLeads(false);
  Logger.log("Sincronização concluída! " + count + " novos leads enviados.");
}

/**
 * Envia todos os leads da planilha (novos e antigos).
 */
function enviarTodosLeads() {
  Logger.log("Iniciando envio de TODOS os leads...");
  var count = enviarLeads(true);
  Logger.log("Sincronização concluída! " + count + " leads enviados no total.");
}

/**
 * Função principal que lê a planilha e faz a requisição para a API do dashboard.
 */
function enviarLeads(enviarTodos) {
  // Validação imediata: se a URL não foi configurada, interrompe a execução com um erro claro
  if (!DASHBOARD_URL || DASHBOARD_URL === "SUA_URL_DO_DASHBOARD_AQUI") {
    throw new Error("\n\n[ERRO DE CONFIGURAÇÃO] Por favor, configure a URL do seu dashboard na LINHA 4 do script (substituindo 'SUA_URL_DO_DASHBOARD_AQUI' pelo link do seu site) e clique em Salvar (ícone de Disquete) antes de rodar.\n");
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    Logger.log("Nenhum lead encontrado na planilha.");
    return 0;
  }
  
  // Mapeia os cabeçalhos para encontrar as colunas dinamicamente
  var mapping = getHeaderMapping(sheet);
  
  // Cria a coluna de status se ela não existir
  var statusCol = mapping['status_integracao'];
  if (!statusCol) {
    statusCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, statusCol).setValue('status_integracao');
    mapping['status_integracao'] = statusCol;
  }
  
  var dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
  var data = dataRange.getValues();
  
  // Garante que a URL não termina com barra '/'
  var apiEndpoint = DASHBOARD_URL.replace(/\/$/, "") + "/api/leads";
  
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var rowIndex = i + 2;
    
    var integracaoStatus = row[statusCol - 1];
    
    // Pula linhas que já foram enviadas, caso não tenha sido solicitado reenvio total
    if (!enviarTodos && (integracaoStatus === "Enviado" || integracaoStatus === "Sucesso")) {
      continue;
    }
    
    var nomeCompleto = mapping['nome_completo'] ? row[mapping['nome_completo'] - 1] : "";
    var telefone = mapping['telefone'] ? row[mapping['telefone'] - 1] : "";
    var createdTime = mapping['created_time'] ? row[mapping['created_time'] - 1] : "";
    
    nomeCompleto = String(nomeCompleto).trim();
    telefone = String(telefone).trim();
    
    // Ignora linhas totalmente em branco
    if (!nomeCompleto && !telefone) {
      continue;
    }
    
    // Validação de segurança dos campos mínimos obrigatórios
    if (nomeCompleto.length < 2 || telefone.length < 8) {
      sheet.getRange(rowIndex, statusCol).setValue("Erro: Nome/Telefone inválido");
      continue;
    }
    
    // Remove o prefixo "p:" que o Facebook costuma inserir nos números de telefone
    if (telefone.toLowerCase().startsWith("p:")) {
      telefone = telefone.substring(2).trim();
    }
    
    // Identifica e formata a plataforma de origem
    var platform = mapping['platform'] ? row[mapping['platform'] - 1] : "";
    var origem = "Facebook/Instagram";
    if (platform === "fb") {
      origem = "Facebook";
    } else if (platform === "ig") {
      origem = "Instagram";
    }
    
    // Detalhes da campanha e anúncio para colocar na mensagem
    var campaign = mapping['campaign_name'] ? row[mapping['campaign_name'] - 1] : "";
    var adName = mapping['ad_name'] ? row[mapping['ad_name'] - 1] : "";
    var formName = mapping['form_name'] ? row[mapping['form_name'] - 1] : "";
    
    var mensagem = "Lead integrado via Planilha:\n" +
                   "• Campanha: " + (campaign || "Não informada") + "\n" +
                   "• Anúncio: " + (adName || "Não informado") + "\n" +
                   "• Formulário: " + (formName || "Não informado");
    
    var payload = {
      nome: nomeCompleto,
      telefone: telefone,
      origem: origem,
      mensagem: mensagem
    };

    // Adiciona a data original de criação se ela existir na planilha
    if (createdTime) {
      if (createdTime instanceof Date) {
        payload.created_at = createdTime.toISOString();
      } else {
        payload.created_at = String(createdTime).trim();
      }
    }
    
    try {
      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };
      
      var response = UrlFetchApp.fetch(apiEndpoint, options);
      var responseCode = response.getResponseCode();
      var responseText = response.getContentText();
      
      if (responseCode === 201 || responseCode === 200) {
        sheet.getRange(rowIndex, statusCol).setValue("Enviado");
        count++;
        Logger.log("Lead " + rowIndex + " (" + nomeCompleto + ") enviado com sucesso.");
      } else {
        Logger.log("Erro ao enviar linha " + rowIndex + ": " + responseText);
        sheet.getRange(rowIndex, statusCol).setValue("Erro API: " + responseCode);
      }
    } catch (e) {
      Logger.log("Erro de rede na linha " + rowIndex + ": " + e.toString());
      sheet.getRange(rowIndex, statusCol).setValue("Erro Conexão");
    }
  }
  
  return count;
}

/**
 * Mapeia os cabeçalhos da primeira linha para índices de coluna de forma dinâmica.
 */
function getHeaderMapping(sheet) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var mapping = {};
  for (var i = 0; i < headers.length; i++) {
    var headerName = headers[i].toString().trim().toLowerCase();
    if (headerName) {
      mapping[headerName] = i + 1;
    }
  }
  return mapping;
}

/**
 * Cria o menu superior na planilha.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Select Mármores 💎')
      .addItem('Enviar Novos Leads', 'enviarNovosLeads')
      .addItem('Enviar Todos os Leads (Reenviar)', 'enviarTodosLeads')
      .addToUi();
}
