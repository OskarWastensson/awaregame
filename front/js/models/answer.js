define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var AnswerModel = Backbone.Model.extend({
		defaults: {
			'user': null,
			'value': null,
			'module': '',
			'question': null
		},
		'url': 'http://localhost:8080/mat/answers'
	});
	return AnswerModel;
});
