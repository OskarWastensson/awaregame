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
			'click #startGame': 'startGame',
		},
		startGame: function(){
			FB.login(function(response) {
				if (response.authResponse) {
					// Logged in
					FB.api('/me', function(response) {
						console.log('Good to see you, ' + response.name + '.');
						AwRouter.navigate("form", true);
					});
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			}, {scope: 'friends_about_me'});
			
			
		}
	});
	return WelcomeView;
});