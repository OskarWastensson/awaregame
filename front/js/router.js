define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/welcome',
  'views/header',
  'views/denied',
  'views/form',
  'views/result',
  'collections/questions',
  'data/questions',
  'collections/answers'
], function(
  $,
   _,
  Backbone, 
	WelcomeView, 
  HeaderView, 
  DeniedView, 
  FormView, 
  ResultView, 
	QuestionsCollection, 
	QuestionsData, 
  AnswersCollection
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
      'form': 'form'
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
    form: function(){
      var self = this;
      this.fbLogin(function(){
        self.before(function(){
          var questions = new QuestionsCollection(QuestionsData);

          AwRouter.showView('#content', new FormView({collection: questions}));
          AwRouter.showView('#footer', new ResultView());
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