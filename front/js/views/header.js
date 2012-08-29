define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/header.html'
], function($, _, Backbone, header){
	var HeaderView = Backbone.View.extend({
		tagName: 'div',
		template: _.template(header),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		},
		events: {
			'click #invite': 'invite'
		},
		invite: function(){
			console.debug("Go to facebook");
		}
	});
	return HeaderView;
});