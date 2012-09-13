define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/form.html',
	'views/question',
	'collections/questions',
	'data/questions',
	'collections/answers'
], function($, _, Backbone, FormTpl, 
	QuestionView, QuestionsCollection, QuestionsData,
	AnswersCollection){
	var FormView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-form',
		template: _.template(FormTpl),
		initialize: function(){
			_.bindAll(this, "render");
			this.collection.bind("reset", this.render, this);
			this.collection.bind("change", this.render, this);

		},
		render: function(){
			this.$el.html(this.template);
			this.renderQuestion();
			return this;
		},
		renderQuestion: function(){
			this.curQuestion = new QuestionView({collection: this.collection.first()});

			this.$el.find("#question").html(this.curQuestion.render().el);
		},
		events: {
			'click #submitQuestion': 'submit'
		},
		submit: function(){
			if(this.collection.length > 1){
				var self = this;
				this.collection.shift();

				$("#animation").removeClass("hidden");
				_.delay(function(){
					$("#animation").addClass("hidden");
					self.render();
				}, 1000);
			} else {
				console.debug("Show the total result");
			}
			
			return false;
		}
	});
	return FormView;
});