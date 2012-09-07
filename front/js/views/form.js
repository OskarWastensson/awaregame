define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/form.html',
	'views/question',
	'collections/questions'
], function($, _, Backbone, formTpl, QuestionView, QuestionsCollection){
	var FormView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-form',
		template: _.template(formTpl),
		initialize: function(){
			_.bindAll(this, "render");
			this.collection = new QuestionsCollection([{"title": "Första titeln", "text": "Första texten"}, {"title":"Andra titeln", "text": "Andra texten"}, {"title": "Tredje titeln", "text": "Tredje texten"}]);
			this.collection.bind("reset", this.render, this);
			this.collection.bind("change", this.render, this);
		},
		render: function(){
			// console.debug(this.collection.toJSON());
			_.each(this.collection.models, function(question){
				this.$el.append(new QuestionView({model: question}).render().el);
			}, this);

			return this;
		},
		events: {
			'click #submitQ': 'submit'
		},
		submit: function(){
			
			// AwRouter.showView('#content', new AnimationView());
			return false;
		}
	});
	return FormView;
});