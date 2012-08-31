define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/denied.html'
], function($, _, Backbone, deniedTpl){
	var DeniedView = Backbone.View.extend({
		tagName: 'div',
		className: 'denied',
		template: _.template(deniedTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template);
			return this;
		}
	});
	return DeniedView;
});