define([
	'jQuery',
  	'Underscore',
  	'Backbone',
  	'jqueryui',
	'text!templates/score.html',
], function($, _, Backbone, jqueryui, ScoreTpl){
	
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
		openForm: function(){
			
		}
	});
	return ScoreView;
});