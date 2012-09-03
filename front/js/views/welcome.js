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
			//AwRouter.navigate("form", true);
			
			console.log(window.location);
			
			window.location = 'https://www.facebook.com/dialog/oauth' +
				'?client_id=416322788424429&redirect_uri=' + 
				window.location.origin 
				'&scope=' + 
				'user_about_me' + 
				'&response_type=token';
		}
	});
	return WelcomeView;
});