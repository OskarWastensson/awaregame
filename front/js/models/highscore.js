define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     
  'Underscore', 
  'Backbone',
  'data/settings'
  
], function($, _, Backbone, settings){
	var HighScoreModel = Backbone.Model.extend({
		// Overrides default fetch function.
		// Uses two facebook graph api calls to genertate a highscore
		// table including url's of profile pictures
		fetch: function(options) {
			var self = this;
			FB.api(settings.facebookAppId + '/scores/', function(scores) {
				var idsArray = [], ids;
				if(scores.error) {
					if(options.error) options.error(self, scores);
				} else {
					$.each(scores.data, function(index, row) {
						idsArray.push(row.user.id);
					});
					ids = idsArray.join(',');
					FB.api('?ids='+ ids + '&fields=picture', function(pictures) {
						if(pictures.error) {
							if(options.error) options.error(self, scores);
						} else {
							$.each(scores.data, function(index, row) {
								row.picture = pictures[row.user.id].picture.data.url;
							});
							self.set(scores.data);
							if(options.success) options.success(self, scores);
						}	
					});
				}
			});
		}
	});

  return HighScoreModel;
  // What we return here will be used by other modules
});