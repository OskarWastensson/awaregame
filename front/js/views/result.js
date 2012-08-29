define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/result.html'
], function($, _, Backbone, result){
	var ResultView = Backbone.View.extend({
		tagName: 'div',
		className: 'result',
		template: _.template(tesult),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		}
	});
	return ResultView;
});