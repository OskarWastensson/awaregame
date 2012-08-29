define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/form.html'
], function($, _, Backbone, form){
	var FormView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-form',
		template: _.template(form),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		}
	});
	return FormView;
});