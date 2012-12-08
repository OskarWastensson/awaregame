define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     
  'Underscore', 
  'Backbone',
  'data/settings'
  
], function($, _, Backbone, settings){
	var HighScoreModel = Backbone.Model.extend({
		fetch: function(options) {
			var self = this;
			FB.api(settings.facebookAppId + '/scores', function(response) {
				if(response.error) {
					if(options.error) options.error(self, response);
				} else {
					self.set(response);
					if(options.success) options.success(self, response);
				}
			});
		}
	});

  return HighScoreModel;
  // What we return here will be used by other modules
});