define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var QuestionModel = Backbone.Model.extend({
		defaults: {
<<<<<<< HEAD
			'id': null,
=======
			'id': '',
>>>>>>> save model Answers
			'title': '',
			'text': ''
		}
	});
	return QuestionModel;
});