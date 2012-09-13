define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			'id': null,
			'title': '',
			'text': ''
		}
	});
	return QuestionModel;
});