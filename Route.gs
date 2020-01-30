App.Route = {}

App.Route.addEmail = function(email){
  App.addEmail(email);
}

App.Route.init = function(){
  App.migration();
}

App.Route.createQuiz = function(nama){
  App.createQuiz(nama);
}

App.Route.help = function(){
  var list = '<b>Daftar Perintah</b>\n'+
    '/createQuiz parameter : membuat quiz\n'+
     '/addEmail email : menbambah/mengganti email\n'+
       '/help : bantuan\n';
  App.replyToSender(list);
}
