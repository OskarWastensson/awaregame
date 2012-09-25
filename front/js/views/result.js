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
				message: this.model.message(),
				score: this.model.toJSON()	
			}));
			return this;
		}
	});
	return ResultView;
});