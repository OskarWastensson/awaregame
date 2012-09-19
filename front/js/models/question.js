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
		},
		max: function() {
			var $max = 0;
			$.each(this.attributes.options, function(index, option) {
				if (option.value > $max) {
					$max = option.value;
				}
			});
			return $max;
		}
	});
	return QuestionModel;
});