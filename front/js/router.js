define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'test': 'test'
    },
    test: function(){
      alert("Hello world");
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});