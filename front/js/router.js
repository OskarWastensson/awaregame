define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/welcome',
  'views/header',
  'views/denied',
  'views/form',
  'views/result'
], function($, _, Backbone, WelcomeView, HeaderView, DeniedView, FormView, ResultView){
  
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
      this.before(function(){
        // var questionsData = [{"title": "Första titeln", "text": "Första texten"}, {"title":"Andra titeln", "text": "Andra texten"}, {"title": "Tredje titeln", "text": "Tredje texten"}];
        // console.debug(questions);
        AwRouter.showView('#content', new FormView());
        AwRouter.showView('#footer', new ResultView());
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
    }
  });

  var initialize = function(){
	var params;
	// Facebook auth will redirect back to root - so before showing
	// welcomepage, we have to look for facebooks access token.
	params = window.location.search.slice(1).split('&');
	$.each(params, function(i, rawParam) {
	  paramParts = rawParam.split('=');
	  if(paramParts[0] === 'code') {
		  fb.storeCode(paramParts[1]);
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