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
			this.answers = new AnswersCollection();
			this.answers.on('add', function(answerModel) {
				answerModel.save();
			}, this);
			this.currentQuestionModel = this.collection.first();
			 
		},
		render: function(){
			this.$el.html(this.template);
			
			var self = this;
			this.answers.fetch({
				success: function(){
					self.renderQuestion();
				}
			});
			return this;
		},
		renderQuestion: function(){
			if(typeof this.answers.get(this.currentQuestionModel.get("id")) === 'undefined'){
				this.curQuestion = new QuestionView({collection: this.currentQuestionModel});
				this.$el.find("#question").html(this.curQuestion.render().el);
			} else {
				console.debug("Show the result of the question");
			}
		},
		events: {
			'click #submitQuestion': 'submit'
		},
		submit: function(){
			this.answers.add({
				'question': this.currentQuestionModel.id,
				'value': $('input:radio[name=answer]:checked').val()
			});
						
			if(this.currentQuestionModel.id != this.collection.length){
				var self = this;
				this.currentQuestionModel = 
					this.collection.get(this.currentQuestionModel.id + 1);
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