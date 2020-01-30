App.createQuiz = function(name) {
  App.replyToSender('Sedang menyiapkan quiz '+name+'.');
  
  var myDir = App.folder.getFoldersByName(App.message.from.id);
  if(myDir.hasNext()==false){
    App.folder.createFolder(App.message.from.id);
    var myDir = App.folder.getFoldersByName(App.message.from.id)
  }
  var help = [
    'Untuk Menambah Item ketikkan perintah <b>addItem</b>.\n',
    'Untuk Mengedit Item ketikkan <b>editItem</b>.\n',
   ]
  var currDir = myDir.next();
  if(currDir.getFilesByName(name).hasNext()){
    var quizDoc = currDir.getFilesByName(name).next(); 
    return App.replyToSender('Quiz dengan nama '+name+' sudah dibuat .\n'+help.join(''));
  }
  
  var doc = SpreadsheetApp.create(name);
  var temp = DriveApp.getFileById(doc.getId());
  currDir.addFile(temp)
  DriveApp.getRootFolder().removeFile(temp);
  
  doc = currDir.getFilesByName(name).next();
  var tbl = App.folder.getFilesByName('app-table').next().getId();
  var ss = SpreadsheetApp.openById(tbl);
  var quiz = ss.getSheetByName('quiz');
  var data = [App.message.from.id, doc.getId(), name, '', '', ''];
  quiz.appendRow(data);
  
  var user = ss.getSheetByName('user');
  var chatId = user.getRange(2, 1, ss.getLastRow()).getValues();
  var email = '';
  
  for(var i = 0; i < chatId.length; i++){
    if(chatId[i][0] == App.message.from.id){
      email = user.getRange(i+2,3).getValue();
    }
  }
  //quizDoc = SpreadsheetApp.openById(doc.getId());
  currDir.addEditor(email);
  
  App.replyToSender('Quiz '+name+' telah siap... \n'+help.join(''));
  
}

