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
			if(this.model.get('id') != QuestionsData.length){
				$("#animation").removeClass("hidden");

				var score = 10; //Move this later

				if(score > 10){
					$("#good").show();
				} else {
					$("#bad").show();
				}

				_.delay(function(){
					$("#animation").addClass("hidden");
					AwRouter.navigate('questions/' + (self.model.get('id') + 1), true);
				}, 1000);
			} else {
				console.debug("Show the total result");	
			}
			return false;
		}
	});
	return QuestionView;
});