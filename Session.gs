App.loadSheet = function(name){
  var tbl = App.folder.getFilesByName('app-table').next().getId();
  var worksheet = SpreadsheetApp.openById(tbl);
  var sheet = worksheet.getSheetByName(name);
  return sheet;
}

App.setSession = function() {
  var session = App.loadSheet('session')
  var data = session.getRange(2,1,session.getLastRow()-1,2).getValues();
  
  for(var i = 0; i < data.length; i++){
    if(data[i][0]==App.message.from.id){
      return session.getRange(i+2,2).setValue(JSON.stringify(App.logActivity));
    }
  } 
}

App.getSession = function() {
  var session = App.loadSheet('session');
  var data = session.getRange(2,1,session.getLastRow()-1,2).getValues();
  for(var i = 0; i < data.length; i++){
    if(data[i][0]==App.message.from.id){
      return data[i];
    }
  }
  return false;
}
