define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/animation.html'
], function($, _, Backbone, AnimationTpl){
	var AnimationView = Backbone.View.extend({
		tagName: 'div',
		className: 'animation',
		template: _.template(AnimationTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			// _.delay(function(){
			// 	AwRouter.showView('#content', new FormView());
			// }, 5000);
			return this;
		},
		events: {
			'click #nextTest': 'openForm'
		},
		openForm: function(){
			
		}
	});
	return AnimationView;
});