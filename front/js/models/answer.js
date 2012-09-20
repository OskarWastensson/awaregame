define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var AnswerModel = Backbone.Model.extend({
		defaults: {
			'value': null,
			'id': null
		},
		url: 'http://localhost:8080/food/answers'
	});
	return AnswerModel;
});
