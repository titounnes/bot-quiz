var App = {
  token : 'XXXXXXXXXXXX:XXXXXXXXXXXXXXXX', //token api bot
  admin : 'xxxxxxxxx', //chat_id admin
  folder : DriveApp.getFolderById('xxxxxxxxxxxxxxxxxxxxxxxxx'), //id database
  session : null,
  message : null,
  command : null,
  logActivity: {},
}

App.request = function (method, data) {
  
  var options = {
      'method' : 'post',
      'contentType': 'application/json',
      'payload' : JSON.stringify(data)
  };
  
  var  response = UrlFetchApp.fetch('https://api.telegram.org/bot' + App.token + '/' + method, options);
  
  if (response.getResponseCode() == 200) {
    return JSON.parse(response.getContentText());
  }
  
  return false;
}

App.replyToSender = function (text) {
  if(typeof App.message.text == 'undefined'){
    return Logger.log(text);
  }
  return App.request('sendMessage', {
    'chat_id': App.message.from.id,
    'parse_mode' : 'html',
    'text': text
  });
}

function doPost(e) {
  
    
  if(e.postData.type == "application/json") {
    
    var post = JSON.parse(e.postData.contents);
    
    App.message = post.message;
      
    var words = App.message.text.split(' ');
    
    if(words[0].charAt(0) == '/'){
      App.command = words[0].replace('/','');
      if(typeof App.Route[App.command] != 'function'){
        return App.replyToSender('Perintah /'+App.command+' tidak dikenal.');
      }
      delete words[0];
      words = words.join(' ').trim().split(' ');
    }else{      
      if(words[0] != 'init'){
        App.session = App.getSession();
        if(App.session != false){
          App.logActivity = JSON.parse(App.session[1]);
        }
        App.command = App.logActivity.command;
      }
    }
    
    App.logActivity.command = App.command;
    App.logActivity.argument = words;
    App.logActivity.timestamp = new Date();
     
    App.Route[App.command].apply(App.Route, words);
  }
}

function setWebhook() {
  var result = App.request('setWebhook', {
    url: ScriptApp.getService().getUrl()
  });
  Logger.log(result);
}

function getWebhook() {
  var result = App.request('getWebhookInfo');
  Logger.log(result);
}
