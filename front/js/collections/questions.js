define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'models/question',
	'data/questions'
], function($, _, Backbone, QuestionModel, data){
	var QuestionsCollection = Backbone.Collection.extend({
		model: QuestionModel,
		initialize: function() {
			this.add(data);
		}
	});
	
	return QuestionsCollection;
});