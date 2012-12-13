define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var QuestionModel = Backbone.Model.extend({
		defaults: {
			'title': '',
			'text': ''
		}
	});
	return QuestionModel;
});