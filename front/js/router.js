define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/welcome',
  'views/header',
  'views/denied',
  'views/form'
], function($, _, Backbone, WelcomeView, HeaderView, DeniedView, FormView){
  
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
      '!denied': 'denied',
      '!form': 'form' 
    },
    welcome: function(){
      // this.before(function(){
        AwRouter.showView('#header', new HeaderView());
        AwRouter.showView('#content', new WelcomeView());
      // });
    },
    denied: function(){
      // this.before(function(){
        AwRouter.showView('#header', new HeaderView());
        AwRouter.showView('#content', new DeniedView());
      // });
    },
    form: function(){
        AwRouter.showView('#header', new HeaderView());
        AwRouter.showView('#content', new FormView());
    },


    curViews: {},
    showView: function(selector, view){
      // if(AwRouter.curView){
      //   AwRouter.curView.close();
      // }
      $(selector).html(view.render().el);
      // AwRouter.curView = view;
      return view;
    }
    // before: function(callback){
    //   if(AwRouter.curHeader){
    //     if(callback) callback();
    //   } else {
    //     AwRouter.showView('#header', new HeaderView());
    //     if(callback) callback();
    //   }
    // }


  });

  var initialize = function(){
    AwRouter = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});