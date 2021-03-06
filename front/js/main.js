// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jQuery: 'libs/jquery/jquery',
    Underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone',
    jqueryui: 'libs/jqueryui/jqueryui',
	  asyncF: 'libs/facebook/asyncF',
	  FB: 'http://connect.facebook.net/en_US/all.js'
  }
});

require([
  // Load our app module and pass it to our definition function
  'app',
  
  // Some plugins have to be loaded in order due to there non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
  'order!libs/jquery/jquery-1.8.0',
  'order!libs/underscore/underscore-1.3.3',
  'order!libs/backbone/backbone-0.9.2',
  'order!libs/jqueryui/jquery-ui-1.9.2.custom',
  'asyncF!http://connect.facebook.net/en_US/all.js'
    
  //'order!libs/queryparams/backbone.queryparams'
  
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});