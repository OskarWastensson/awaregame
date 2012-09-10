define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'models/answer'
], function($, _, Backbone, AnswerModel){
	var AnswersCollection = Backbone.Collection.extend({
		model: AnswerModel,
		url: 'localhost:8080/answers'
	});
	return QuestionsCollection;
});
