define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'models/question'
], function($, _, Backbone, QuestionModel){
	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel,
		url: "js/data/questions.json"
	});
	return QuestionsCollection;
});