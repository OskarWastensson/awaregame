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
		}
	});
	return AnswerModel;
});
