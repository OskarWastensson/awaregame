define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var AnswerModel = Backbone.Model.extend({
		defaults: {
			'title': '',
			'text': ''
		}
	});
	return AnswerModel;
});
