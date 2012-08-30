define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/welcome.html'
], function($, _, Backbone, welcome){
	var WelcomeView = Backbone.View.extend({
		tagName: 'div',
		className: 'welcome',
		template: _.template(welcome),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		},
		events: {
			'click #startGame': 'startGame'
		},
		startGame: function(){
			AwRouter.navigate("form", true);
		}
	});
	return WelcomeView;
});