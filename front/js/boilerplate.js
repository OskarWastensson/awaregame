define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone',
  'jqueryui'
], function($, _, Backbone, jqueryui){
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accesible in the global scope
  return {};
  // What we return here will be used by other modules
});