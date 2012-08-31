define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/form.html',
	'views/animation',
	'text!templates/animation.html'
], function($, _, Backbone, formTpl, AnimationView, animation){
	var FormView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-form',
		template: _.template(formTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		},
		events: {
			'click #submitQ': 'submit'
		},
		submit: function(){
			AwRouter.showView('#content', new AnimationView());
			return false;
		}
	});
	return FormView;
});