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
			var progressbar = this.$el.find("#progressbar");

			console.debug(jQuery);

			// var progressVal = progressbar.data('progressval');
			
			// console.debug(progressVal);
			// if(progressVal < 50){
			// 	progressbar.addClass('progressbar-red');
			// } else {
			// 	progressbar.addClass('progressbar-green');
			// }


			// progressbar.progressbar({
			// 		value: 10
			// });
			return this;
		},
		openForm: function(){
			
		}
	});
	return ScoreView;
});