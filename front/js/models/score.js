define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'data/settings'
], function($, _, Backbone, settings){
	var ScoreModel = Backbone.Model.extend({
		defaults: {
			'value': 0,
			'max': 0,
			// ScoreModel is a singleton - this id value is just to fool Backbone.
			'id': 'single'
		},
		'url': 'http://' + settings.restAPI + settings.machineName + '/score',
		
		'update': function(value, max) {
			this.attributes.value += value;
			this.attributes.max += max;
			this.save();
		},
		message: function() {
			var message, self = this;
			message = settings.levels[0];
			$.each(settings.levels, function(i, level) {
				if(level.value < self.attributes.value * 100 / self.attributes.max) {
					console.log(level);
					message = level;
				}
			});
			
			return message;
		}
	});
	return ScoreModel;
});