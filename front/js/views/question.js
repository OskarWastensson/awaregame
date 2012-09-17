define([
	'jQuery',
  	'Underscore',
  	'Backbone',
  	'text!templates/question.html',
  	'data/questions'
], function($, _, Backbone, questionTpl, QuestionsData){
	var QuestionView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-item',
		template: _.template(questionTpl),
		initialize: function(){
			_.bindAll(this, "render");
			this.model.bind("reset", this.render, this);
			this.model.bind("change", this.render, this);
		},
		events: {
			'click #submitQuestion': 'submit'
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		submit: function(){
			var self = this;
			var questionValue = $('input:radio[name=answer]:checked').val();
			$("#animation").removeClass("hidden");

			if(questionValue > 70){
				$("#good").show();
			} else {
				$("#bad").show();
			}

			_.delay(function(){
				$("#animation").addClass("hidden");

				if(self.model.get('id') != QuestionsData.length){
					AwRouter.navigate('questions/' + (self.model.get('id') + 1), true);
				} else {
					console.debug("Show the total result");	
				}
			}, 1000);
			return false;
		}
	});
	return QuestionView;
});