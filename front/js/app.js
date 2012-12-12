define([
  'jQuery',
  'Underscore',
  'Backbone',
  'jqueryui',
  'router' // Request router.js
], function($, _, Backbone, jqueryui, Router){
  var initialize = function(){
		// Pass in our Router module and call it's initialize function
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});