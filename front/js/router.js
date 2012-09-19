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
  'models/score',
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
  ScoreModel,	
  AnswersCollection,
  QuestionView,
  ResultView
  ){

  //Add a close method to all views in backbone
  Backbone.View.prototype.close = function () {
      console.debug("Closing view");
      if (this.beforeClose) {
          this.beforeClose();
      }
      this.off();
      this.remove();
  };

  var AppRouter = Backbone.Router.extend({
    initialize: function(){
	  this.score = new ScoreModel();
	  
      this.answers = new AnswersCollection();
      this.answers.on('add', function(answerModel) {
          answerModel.save();
		  this.score.update(answerModel.attributes.value, this.questionsList.get(answerModel.id).max());
        }, this);
    },
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
              if(self.curQuestionView){
                self.curQuestionView.close();
              }
              self.curQuestionView = new QuestionView({model: self.questionsList.get(id), answers: self.answers}); 

              $("#content").html(self.curQuestionView.render().el);
              
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
      console.log('fbLogin');
	  FB.getLoginStatus(function(response) {
		console.log('getloginstatus');
		if (response.status === 'connected') {
			console.log('connected');
			if(callback) callback();
		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app
			console.log('User cancelled login or did not fully authorize.');
		} else {
			// the user isn't logged in to Facebook.
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