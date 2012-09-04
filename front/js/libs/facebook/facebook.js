define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
], function($, _, Backbone){
  // Above we have passed in jQuery, Underscore and Backbone
  // They will not be accesible in the global scope
  return {
	  storeCode: function (code) {
		date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		document.cookie =
		  'fb_code=' + code + ';' +
		  'expires= ' + date.toUTCString() +  ';' + 
		  'path=/';
	  }
  };
});
