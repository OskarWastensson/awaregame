define([
	'order!libs/backbone/backbone-0.9.2'
	], function(){
  // Now that all the orignal source codes have ran and accessed each other
  // We can call noConflict() to remove them from the global name space
  // Require.js will keep a reference to them so we can use them in our modules
  
	// Order! doens't work in Chrome, this is the ugly version.
	var tester = setInterval(function() {
		if(typeof _ != 'undefined' || typeof $ != 'undefined' || typeof jqueryui != 'undefined') {
			_.noConflict();
			$.noConflict();
			Backbone.noConflict();
			clearInterval(tester);
		}
	}, 30);
	
  return Backbone;
});