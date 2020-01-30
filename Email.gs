App.addEmail = function (email) {
  if(email == null || email ==''){
    return App.replyToSender('Silahkan ketikkan email anda.');
  }

  App.replyToSender('Sedang memverifikasi email. Mohon tunggu beberapa saat...');
  
  var tbl = App.folder.getFilesByName('test-mail').next();
  var ss = SpreadsheetApp.openById(tbl.getId());
  
  try {
    ss.addViewer(email);
  }catch(e){
    return App.replyToSender('Email '+email+' tidak valid. Silahkan isikn email valid anda.');
  }
  ss.removeViewer(email);
  
  var tbl = App.folder.getFilesByName('app-table').next();
  var ss = SpreadsheetApp.openById(tbl.getId());
  var user = ss.getSheetByName('user');
  var chatId = user.getRange(2, 1, ss.getLastRow()).getValues();
  var oldEmail = null;
  
    
  for(var i = 0; i < chatId.length; i++){
    if(chatId[i][0] == App.message.from.id){
      oldEmail = user.getRange(i+2,3).getValue();
      user.getRange(i+2,3).setValue(email);
    }
  }
  
  if(oldEmail != null && oldEmail != ''){
    var myDir = App.folder.getFoldersByName(App.message.from.id);
    if(myDir.hasNext()){
      var curDir = myDir.next();
      curDir.addEditor(email); 
    }
  }
  
  App.replyToSender('Email '+email+' sudah didaftarkan.');
  
}
