define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/welcome.html'
], function($, _, Backbone, welcomeTpl){
	var WelcomeView = Backbone.View.extend({
		tagName: 'div',
		className: 'welcome',
		template: _.template(welcomeTpl),
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
			AwRouter.navigate("questions/1", true);

			function test1(){
				// console.debug("test1 func");
			}


			AwRouter.fbLogin(AwRouter.afterLogi, [test1]);
			// AwRouter.fbLogin(AwRouter.afterLogin);
		}
	});
	return WelcomeView;
});