define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'data/settings'
], function($, _, Backbone, settings){
	var AnswerModel = Backbone.Model.extend({
		defaults: {
			'value': null,
			'id': null
		},
		url: 'http://' + settings.restAPI + settings.machineName + '/answers'
	});
	return AnswerModel;
});
