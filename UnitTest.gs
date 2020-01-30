function setConfig(words) {
  App.message = {
    from:{
      id: App.admin
    }
  }
  App.session = App.getSession();
  if(App.session != false){
     App.logActivity = JSON.parse(App.session[1]);
  }
  App.logActivity.command = App.command;
  App.oldArgument = App.logActivity.argument;
  App.logActivity.argument = words;
  App.logActivity.timestamp = new Date(); 
  
}

function createQuizNoParam(){
  var words = [];
  App.command = 'createQuiz';
  setConfig(words);
  App.Route[App.command].apply(App.Route, words);
}

function createQuizWithParam_Foo(){
  var words = ['foo'];
  App.command = 'createQuiz';
  setConfig(words);
  App.Route[App.command].apply(App.Route, words);
}

function createQuizWithParam_addItem(){
  var words = ['addItem'];
  App.command = 'createQuiz';
  setConfig(words);
  App.Route[App.command].apply(App.Route, words);
}
