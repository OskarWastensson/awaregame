define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var Questions = [
		{
			"title": "Första titeln", 
			"text": "Första texten",
			"options": [
				{
					"text": 'Alternativ 1',
					"value": 100
				},
				{
					"text": 'Alternativ 2',
					"value": 80
				},
				{
					"text": 'Alernativ 3',
					"value": 60
				}
			],
			"good_value": 80
		}, 
		{
			"title": "Andra titeln", 
			"text": "Andra texten",
			"options": [
				{
					"text": 'Alternativ 1',
					"value": 100
				},
				{
					"text": 'Alternativ 2',
					"value": 80
				},
				{
					"text": 'Alernativ 3',
					"value": 60
				}
			],
			"good_value": 80
		}, 
		{
			"title": "Tredje titeln", 
			"text": "Tredje texten",
			"options": [
				{
					"text": 'Alternativ 1',
					"value": 100
				},
				{
					"text": 'Alternativ 2',
					"value": 80
				},
				{
					"text": 'Alernativ 3',
					"value": 60
				}
			],
			"good_value": 80
		}
	];
	return Questions;
});