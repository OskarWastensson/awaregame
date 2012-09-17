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
		// validate: function(attrs){
		// 	if(attrs.value === 0){
		// 		return "You haven't answered the question!";
		// 	}
		// }
	});
	return AnswerModel;
});
