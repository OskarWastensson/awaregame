define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/welcome',
  'views/header',
  'views/denied',
  // 'views/form',
  'views/result',
  'collections/questions',
  'data/questions',
  'collections/answers',
  'views/question',
  'views/result'

], function(
  $,
   _,
  Backbone, 
	WelcomeView, 
  HeaderView, 
  DeniedView, 
  // FormView, 
  ResultView, 
	QuestionsCollection, 
	QuestionsData, 
  AnswersCollection,
  QuestionView,
  ResultView
  ){

  //Add a close method to all views in backbone
  Backbone.View.prototype.close = function () {
      if (this.beforeClose) {
          this.beforeClose();
      }
      this.remove();
      this.unbind();
  };

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'welcome',
	    'denied': 'denied',
      // 'questions': 'form',
      'questions/:id': 'question'
    },
    welcome: function(){
	    this.before(function(){
        AwRouter.showView('#content', new WelcomeView());
      });
    },
    denied: function(){
      this.before(function(){
        AwRouter.showView('#content', new DeniedView());
      });
    },
    // form: function(){
    //   var self = this;
    //   this.fbLogin(function(){
    //     self.before(function(){
    //       this.questions = new QuestionsCollection(QuestionsData);
    //       AwRouter.showView('#content', new FormView({collection: this.questions}));
    //       AwRouter.showView('#footer', new ResultView());
    //     });
    //   });
    // },
    fetchAnswers: function(){
      this.answers = new AnswersCollection();
      var self = this;
      this.answers.fetch({
        success: function(){
          
          if(self.requestedId) self.question(self.requestedId);
        }
      });
    },
    question: function(id){
      var self = this;
      this.before(function(){
        self.fbLogin(function(){
          if(!self.questionsList){
            self.questionsList = new QuestionsCollection(QuestionsData);
          }
          //Check if the question is answered
          if(self.answers){
            //Check if the question exist
            if(self.questionsList.get(id)){
              
              // TODO Show something if the question already is answered
              $("#content").html(new QuestionView({model: self.questionsList.get(id), answers: self.answers}).render().el);
              
              //Render the result
              if(!self.curResult){
                self.curResult = $('#footer').html(new ResultView().render().el); 
              }
            } else {
              console.debug("The question doesn't exist");
            }
          } else {
            self.requestedId = id;
            self.fetchAnswers();
          }
        });
      });
    },
    showView: function(selector, view){
      if(selector !== '#header'){
        if(AwRouter.curView){
          AwRouter.curView.close();
          AwRouter.curView = view;
        }
      }
      $(selector).html(view.render().el);
      
      return view;
    },
    before: function(callback){
      if(AwRouter.curHeader){
        if(callback) callback();
      } else {
        AwRouter.curHeader = AwRouter.showView('#header', new HeaderView());
        if(callback) callback();
      }
    },
    fbLogin: function(callback){
      FB.login(function(response) {
       if (response.authResponse) {
         // Logged in
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
            if(callback) callback();
         });
       } else {
         console.log('User cancelled login or did not fully authorize.');
       }
     }, {scope: 'friends_about_me'});
    }
  });

  var initialize = function(){
	
	FB.Event.subscribe('auth.statusChange', function(response) {
		if(response.status == 'connected') {
			console.log('FB init');
			var fbAuth = FB.getAuthResponse();		
			// Alway send along FB signed request with ajax calls to backend
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
				var data;
				console.log('prefiltering');
				options.url = options.url += '?code=' + fbAuth.signedRequest;
			});	
		}
	});
	
	// Backbone router initiatlization
	AwRouter = new AppRouter;
	Backbone.history.start();
	
  };
  return {
    initialize: initialize
  };
});