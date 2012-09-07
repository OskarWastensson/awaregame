define([
	'jQuery',
  	'Underscore',
  	'Backbone',
  	'text!templates/question.html'
], function($, _, Backbone, questionTpl){
	var QuestionView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-item',
		template: _.template(questionTpl),
		initialize: function(){
			_.bindAll(this, "render");
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	return QuestionView;
});