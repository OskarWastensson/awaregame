define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'text!templates/form.html',
	'views/question',
	'collections/questions',
	'data/questions',
	'collections/answers'
], function($, _, Backbone, formTpl, 
	QuestionView, QuestionsCollection, QuestionsData,
	AnswersCollection){
	var FormView = Backbone.View.extend({
		tagName: 'div',
		className: 'question-form',
		template: _.template(formTpl),
		initialize: function(){
			_.bindAll(this, "render");
			this.collection = new QuestionsCollection(QuestionsData);
			//this.collection = new QuestionsCollection([{"title": "Första titeln", "text": "Första texten"}, {"title":"Andra titeln", "text": "Andra texten"}, {"title": "Tredje titeln", "text": "Tredje texten"}]);
			this.collection.bind("reset", this.render, this);
			this.collection.bind("change", this.render, this);
			
			this.answers = new AnswersCollection();
			this.answers.fetch();
			console.debug(this.answers);
			// this.$el.append(new QuestionsDatastionView({model: QuestionsData}).render().el);
			// this.collection.at(0);

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