define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var ScoreModel = Backbone.Model.extend({
		defaults: {
			'value': 0,
			'max': 0
			
		},
		'url': 'http://localhost:8080/food/score'
	});
	return QuestionModel;
});