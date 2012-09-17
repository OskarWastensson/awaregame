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

		// validate: function(attrs){
		// 	if(attrs.value === 0){
		// 		return "You haven't answered the question!";
		// 	}
		// }

		'url': 'http://localhost:8080/food/answers'

	});
	return AnswerModel;
});
