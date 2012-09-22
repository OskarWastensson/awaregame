define([
	'jQuery',
  	'Underscore',
  	'Backbone',
	'data/settings'
], function($, _, Backbone, data){
	var SettingsModel = Backbone.Model.extend({
		defaults: data
	});
	return SettingsModel;
});

