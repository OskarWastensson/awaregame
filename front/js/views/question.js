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
			this.model.on("reset", this.render, this);
			this.model.on("change", this.render, this);
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
			var questionValue = parseInt($('input:radio[name=answer]:checked').val());

			if(questionValue !== 0){
				this.options.answers.add({
					'id': this.model.get('id'),
					'value': questionValue
				});
				$("#animation").removeClass("hidden");

				if(questionValue > 70){
					imageSrc ="images/good.gif";
					// $("#animation").html('<img src="images/good.gif" />');// $("#good").show();
				} else {
					imageSrc ="images/bad.gif";
					// $("#animation").html('<img src="images/bad.gif" />');
					// $("#bad").show();	
				}

				var image = new Image();
				image.src = imageSrc;

				$("#animation").html(image);

				image = "";

				_.delay(function(){
					$("#animation").addClass("hidden");
					if(self.model.get('id') != QuestionsData.length){
						AwRouter.navigate('questions/' + (self.model.get('id') + 1), true);
					} else {
						AwRouter.navigate('result', { trigger: true });
					}
				}, 2000);
			} else {
				alert("You haven't answered the question!");
			}
			return false;
		}
	});
	return QuestionView;
});