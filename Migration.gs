App.migration = function(){
  if(App.message.from.id != App.admin){
    return App.replyToSender('Maaf.. Perintah ini hanya untuk admin..');
  }
  App.migrate();
}

App.migrate = function(){
  App.replyToSender('Database sedang disiapkan ... Mohon tunggu beberapa saat..');
  var table = App.folder.getFilesByName('app-table');
  if(table.hasNext()===false){
    var ss = SpreadsheetApp.create("app-table")
    var temp = DriveApp.getFileById(ss.getId());
    App.folder.addFile(temp)
    DriveApp.getRootFolder().removeFile(temp);
  }
  
  if(App.folder.getFilesByName('test-mail').hasNext()==false){
    var ss = SpreadsheetApp.create("test-mail")
    var temp = DriveApp.getFileById(ss.getId());
    App.folder.addFile(temp)
    DriveApp.getRootFolder().removeFile(temp);
  }
  
  var tbl = App.folder.getFilesByName('app-table').next().getId();
  
  var ss = SpreadsheetApp.openById(tbl);
  
  App.createSheet(tbl, ss, 'session', ['chat_id', 'data']);
  
  App.createSheet(tbl, ss, 'user', ['chat_id', 'username', 'email', 'roles', 'token', 'full_name']);
  
  App.createSheet(tbl, ss, 'quiz', ['teacher_id', 'document_id', 'quiz_name', 'start', 'duration', 'random_item','random_option']);
  
  var unused = ss.getSheetByName('Sheet1')
  if(unused){
    ss.deleteSheet(unused);
  }   
  App.replyToSender('Sistem telah siap...');
}

App.createSheet = function(fileId, worksheet, name, columns){
  var session = worksheet.getSheetByName(name);
  if(session == null){
    var ss = SpreadsheetApp.openById(fileId);
    ss.insertSheet(name);
    session = ss.getSheetByName(name);
  }
  
  for(var i = 1; i < columns.length + 1; i++){
    session.getRange(1, i).setValue(columns[i-1])
  }
  
}
