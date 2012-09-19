define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var ScoreModel = Backbone.Model.extend({
		defaults: {
			'value': 0,
			'max': 0,
			'id': 'single'
		},
		'url': 'http://localhost:8080/food/score',
		'update': function(value, max) {
			this.attributes.value += value;
			this.attributes.max += max;
			this.save();
		}
	});
	return ScoreModel;
});