define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/progress.html'
], function($, _, Backbone, ProgressTpl){
	var ProgressView = Backbone.View.extend({
		tagName: 'div',
		className: 'score',
		template: _.template(ProgressTpl),
		initialize: function() {
			_.bindAll(this, "render");
		},
		render: function() {
			console.log(this.data);
			this.$el.html(this.template({
				completed: this.options.answers.length,
				total: this.collection.length
			}));
			return this;
		},
		events: {
			
		},
		openForm: function(){
			
		}
	});
	return ProgressView;
});