define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/animation.html',
	'views/form'
], function($, _, Backbone, animationTpl, FormView){
	var AnimationView = Backbone.View.extend({
		tagName: 'div',
		className: 'animation',
		template: _.template(animationTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		},
		events: {
			'click #nextTest': 'openForm'
		},
		openForm: function(){
			console.debug("test");
			console.debug(AwRouter.showView);
			// AwRouter.showView('#content', new FormView());
		}
	});
	return AnimationView;
});