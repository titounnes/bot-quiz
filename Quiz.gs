App.createQuiz = function(name) {
  if(name == null){
    return App.replyToSender('Silahkan ketikkan nama quiz tanpa spasi.');
  }
  App.replyToSender('Sedang menyiapkan quiz '+name+'.');
  
  var myDir = App.folder.getFoldersByName(App.message.from.id);
  if(myDir.hasNext()==false){
    App.folder.createFolder(App.message.from.id);
    var myDir = App.folder.getFoldersByName(App.message.from.id)
  }
    
  var currDir = myDir.next();
  if(currDir.getFilesByName(name).hasNext()){
    var quizDoc = currDir.getFilesByName(name).next(); 
    var link = quizDoc.getUrl(); 
    var pages = App.countPages(quizDoc)
    return App.replyToSender('Quiz dengan nama '+name+' sudah pernah dibuat sebanyak '+pages+' halaman.\nUntuk mengedit silahkan klik <a href="'+link+'">Edit</a>');
  }
  
  var doc = DocumentApp.create(name);
  var temp = DriveApp.getFileById(doc.getId());
  currDir.addFile(temp)
  DriveApp.getRootFolder().removeFile(temp);
  
  doc = currDir.getFilesByName(name).next();
  var link = doc.getUrl();
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
  quizDoc = DocumentApp.openById(doc.getId());
  quizDoc.addEditor(email);
  
  App.replyToSender('Quiz '+name+' telah siap..\nUntuk mengedit silahkan klik <a href="'+link+'">Edit</a>');
  
}

App.countPages = function(doc) {
   var blob = doc.getAs("application/pdf");
   var data = blob.getDataAsString();

   var re = /Pages\/Count (\d+)/g;
   var match;

   var pages = 0;

   while(match = re.exec(data)) {

      var value = parseInt(match[1]);

      if (value > pages) {
         pages = value;
      }
   }

   return pages; 
}

function countPage(){
  var doc = DocumentApp.openById('1NAjQmwwsYBQSwrA7MQUlz4Rncu99trXqDSfaOxmBJ0c');
  var child = doc.getBody().getNumChildren();
  for(var i = 0; i < child; i++){
    var elem = doc.getBody().getChild(i);
    Logger.log(elem.getAttributes())
  }
}
