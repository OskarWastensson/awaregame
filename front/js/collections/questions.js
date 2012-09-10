define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'models/question'
], function($, _, Backbone, QuestionModel){
	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel
	});
	return QuestionsCollection;
});