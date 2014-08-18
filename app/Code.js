var headers = {'Authorization': 'ApiKey [YOUR API KEY HERE]'};
var params = {'headers': headers};

function onOpen() {
  DocumentApp.getUi().createAddonMenu()
                     .addItem('Export current document...', 'export')
                     .addSeparator()
                     .addItem('Manage accounts...', 'showManageDialog')
                     .addToUi();
}

function onInstall() {
  onOpen();
}

function showStartAuthDialog() {
  var dialog = HtmlService.createHtmlOutputFromFile('StartAuthDialog');
  dialog.setHeight(85);
  dialog.setWidth(400);
  DocumentApp.getUi().showModalDialog(dialog, 'Welcome to Cloud Export!');
}

function showAuthDialog() {
  var dialog = HtmlService.createHtmlOutputFromFile('AuthDialog');
  dialog.setHeight(150);
  dialog.setWidth(360);
  DocumentApp.getUi().showModalDialog(dialog, 'Cloud Export authentication');
}

function showAccountDialog(accountObjects) {
  var template = HtmlService.createTemplateFromFile('AccountDialog'); 
  template.accountObjects = accountObjects;
  var dialog = template.evaluate();
  dialog.setHeight(120);
  dialog.setWidth(360);
  DocumentApp.getUi().showModalDialog(dialog, 'Export current document');  
}

function showManageDialog() {
  var dialog = HtmlService.createHtmlOutputFromFile('ManageDialog');
  dialog.setHeight(70);
  dialog.setWidth(420);
  DocumentApp.getUi().showModalDialog(dialog, 'Manage accounts');
}

function export() {
  // Ensure at least one account is connected
  var accountData = getAccountData();
  if (!accountData || !accountData.accounts) {
    // If not, show first-time authentication dialog instead
    showStartAuthDialog();
    return;
  }
  // Ask user what account to export to
  var accounts = accountData.accounts;
  showAccountDialog(accounts);
}

function exportTo(accountId) {
  var folderId = createFolder(accountId);
  if (folderId) {
    var name = DocumentApp.getActiveDocument().getName() + '.pdf';
    var metadata = JSON.stringify({'parent_id': folderId, 'name': name});
    var content = DocumentApp.getActiveDocument().getAs('application/pdf');
    var postParams = {'headers': headers, 'method': 'post', 'payload': {'metadata': metadata, 'file': content}};  
    try {
      var response = UrlFetchApp.fetch('https://api.kloudless.com/v0/accounts/' + accountId + '/files', postParams);
      if (response.getResponseCode() == 201) {
        showMessage('Success!', 'Your file was successfully exported.');
      } else {
        showError('Could not export file to cloud service.');  
      }
    } catch (e) {
      showError('Could not export file to cloud service.' + e);
    }
  }
}

function createFolder(accountId) {
  var postParams = {'headers': headers, 'method': 'post', 'payload': {'parent_id': 'root', 'name': 'Cloud Export'}};
  try {
    var response = UrlFetchApp.fetch('https://api.kloudless.com/v0/accounts/' + accountId + '/folders', postParams);
    return JSON.parse(response).id;
  } catch (e) {
    showError('Could not access Cloud Export folder.');
  }
}

// Returns account data object in Properties (or null if non-existent).
function getAccountData() {
  var userProperties = PropertiesService.getUserProperties();
  return JSON.parse(userProperties.getProperty('account_data'));
}

// Adds new account ID to database, if valid.
function processNewAccountId(accountId) {
  if (isValidAccountId(accountId)) {
    var userProperties = PropertiesService.getUserProperties();
    var accountData = JSON.parse(userProperties.getProperty('account_data'));
    if (!accountData) {
      accountData = {};  
    }
    if (!accountData.accounts) {
      accountData.accounts = [];
    }
    try {
      var response = UrlFetchApp.fetch('https://api.kloudless.com/v0/accounts/' + accountId, params);
      accountData.accounts.push(JSON.parse(response));
      userProperties.setProperty('account_data', JSON.stringify(accountData));
      export();
    } catch (e) {
      showError('Could not identify account.');
    }

  } else {
    showError('Invalid authentication code.');
  }
}  

// Returns if the given account ID is valid.
function isValidAccountId(accountId) {
  if (accountId == '') {
    return false;
  }
  try {
    var response = UrlFetchApp.fetch('https://api.kloudless.com/v0/accounts/' + accountId, params);
  } catch (e) {
    return false;
  }
  return true;
}

function clearAccounts() {
  var response = showWarning('Are you sure? All authorized accounts will be disconnected from Cloud Export.');
  if (!response) {
    return;
  }
  var properties = PropertiesService.getUserProperties();
  try {
    var accountData = getAccountData();
    if (accountData && accountData.accounts) {
      for (var i = 0; i < accountData.accounts.length; i++) {
        var account = accountData.accounts[i];
        var deleteParams = {'headers': headers, 'method': 'delete'};  
        UrlFetchApp.fetch('https://api.kloudless.com/v0/accounts/' + account.id, deleteParams);       
      }
      properties.deleteProperty('account_data');
    }
    showMessage('Success!', 'All stored accounts were cleared.');
  } catch (e) {
    showError('Stored account data could not be cleared. Please try again.');
  }
}

function showMessage(title, message) {
  var ui = DocumentApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}  

function showWarning(message) {
  var ui = DocumentApp.getUi();
  var response = ui.alert('Warning', message, ui.ButtonSet.YES_NO);
  return response == ui.Button.YES;
}
    
function showError(message) {
  var ui = DocumentApp.getUi();
  ui.alert('Error', message, ui.ButtonSet.OK); 
}    