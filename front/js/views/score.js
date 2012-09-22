define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/score.html'
], function($, _, Backbone, ScoreTpl){
	
	var ScoreView = Backbone.View.extend({
		tagName: 'div',
		className: 'score',
		template: _.template(ScoreTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		events: {
			
		},
		openForm: function(){
			
		}
	});
	return ScoreView;
});