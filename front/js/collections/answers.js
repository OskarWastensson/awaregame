define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'models/answer',
	'data/settings'
], function($, _, Backbone, AnswerModel, settings){	
	var AnswersCollection = Backbone.Collection.extend({
		model: AnswerModel,
		url: 'http://' + settings.restAPI + settings.machineName + '/answers'
	});

	return AnswersCollection;
});
