define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var Questions = [
		{
			"id": 1,
			"title": "Första titeln", 
			"text": "Första texten",
			"options": [
				{
					"text": 'Fråga 1, Alternativ 1',
					"value": 100
				},
				{
					"text": 'Fråga 1, Alternativ 2',
					"value": 40
				},
				{
					"text": 'Fråga 1, Alernativ 3 - Dåligt',
					"value": 60
				}
			],
			"good_value": 80
		}, 
		{
			"id": 2,
			"title": "Andra titeln", 
			"text": "Andra texten",
			"options": [
				{
					"text": 'Fråga 2, Alternativ 1',
					"value": 100
				},
				{
					"text": 'Fråga 2, Alternativ 2 -Dåligt',
					"value": 80
				},
				{
					"text": 'Fråga 2, Alernativ 3 -Dåligt',
					"value": 60
				}
			],
			"good_value": 90
		}, 
		{
			"id": 3,
			"title": "Tredje titeln", 
			"text": "Tredje texten",
			"options": [
				{
					"text": 'Fråga 3 - Alternativ 1',
					"value": 100
				},
				{
					"text": 'Fråga 3 - Alternativ 2',
					"value": 80
				},
				{
					"text": 'Fråga 3 - Alernativ 3 - Dåligt',
					"value": 60
				}
			],
			"good_value": 80
		}
	];
	return Questions;
});