App.Route = {}

function checkParam(param){
  if(param == null || param == ''){
    return false;
  }
}

App.Route.init = function(){
  App.migration();
}

App.Route.addEmail = function(email){
  if(checkParam(email) == false){
    App.setSession();
    return App.replyToSender('Silahkan ketikkan email anda.');
  }
  App.addEmail(email);
  App.unsetSession();
}


App.Route.createQuiz = function(nama){
  if(checkParam(nama) == false){  
    App.setSession();
    return App.replyToSender('Silahkan ketikkan nama quiz.');
  }
  var reservedWords = ['addItem','editItem']; 
  
  if( reservedWords.indexOf(nama) >=0){
    return App.replyToSender('Nama quiz tidak boleh menggunakan kata-kata: \n<b>'+reservedWords.join(', ')+'</b>');
  }
  App.setSession();
  App.createQuiz(nama);
}

App.Route.help = function(){
  var list = '<b>Daftar Perintah</b>\n'+
    '/createQuiz parameter : membuat quiz\n'+
     '/addEmail email : menbambah/mengganti email\n'+
       '/help : bantuan\n';
  App.replyToSender(list);
}
