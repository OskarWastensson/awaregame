define([
	'jQuery',
  	'Underscore',
  	'Backbone',
  	'text!templates/question.html',
  	'collections/answers'
], function($, _, Backbone, questionTpl, AnswersCollection){
	var QuestionView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-item',
		template: _.template(questionTpl),
		initialize: function(){
			_.bindAll(this, "render");
			this.collection.bind("reset", this.render, this);
			this.collection.bind("change", this.render, this);
			this.answers = new AnswersCollection();
			this.answers.fetch();

       		console.debug(this.answers);
       		
       		// console.debug(this.answers);
       		// var test = this.answers.where({module: "food"});
		},
		before: function(callback){
			
		},
		render: function(){
			this.$el.html(this.template(this.collection.toJSON()));
			return this;
		}
	});
	return QuestionView;
});