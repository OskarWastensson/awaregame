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
			'click #testBtn': 'questionForm'
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
		},
		questionForm: function(){
			AwRouter.navigate("form", true);

			FB.login(function(response) {
				if (response.authResponse) {
					// Logged in
					FB.api('/me', function(response) {
						console.log('Good to see you, ' + response.name + '.');
					});
				} else {
					console.log('User cancelled login or did not fully authorize.');
				}
			}, {scope: 'friends_about_me'});
		}
	});
	return WelcomeView;
});