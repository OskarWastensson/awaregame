define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/result.html'
], function($, _, Backbone, resultTpl){
	var ResultView = Backbone.View.extend({
		tagName: 'div',
		className: 'result',
		template: _.template(resultTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template({
				message: this.message(),
				score: this.model.toJSON()	
			}));
			return this;
		},
		message: function() {
			var message, 
				levels = this.options.settings.attributes.levels,
				score = this.model.attributes;
			
			$.each(levels, function(i, level) {
				if(level.value / level.max > score.value) {
					message = level;
				}
			});
			return message;
		}
	});
	return ResultView;
});