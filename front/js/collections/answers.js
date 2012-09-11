define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'models/answer'
], function($, _, Backbone, AnswerModel){
	
		var backendURI = 'localhost:8080',
			// @TODO Implement moduleing
			module = 'food';
		
	
	var AnswersCollection = Backbone.Collection.extend({
		model: AnswerModel,
		url: 'http://localhost:8080/food/answers'
	});

	return AnswersCollection;
});
