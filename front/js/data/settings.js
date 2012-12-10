define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var Settings = {
			"name": "Mat", 
			"machineName": "food", 
			"facebookAppId": 416322788424429, 
			"restAPI": "localhost:8080/", 
			"welcomeText":
				"Välkommen till Matspelet. Svara på några enkla frågor om " +
				"dina matvanor och få reda på din miljöbelastning.",
			"levels": [
				{
					"value": 0, 
					"title": "Du är en miljöbov!", 
					"text": "Dina matvanor är rent förskräckliga. Medan du sitter till" +
						" bords smälter glaciärerna. Men det är aldrig försent att bättra " +
						"sig. Du kanske ska prova köttfri måndag?"
				},
				{
					"value": 40,
					"title": "Du försöker iallafall!",
					"text": "Du har kommit en bit på vägen, men det finns mcyket kvar att " +
						" om våra barn ska kunna njuta av samma fina planet som vi när de blir stora. " + 
						" Försök tänka lite mer på klimatet när du står i köket."
				},
				{
					"value": 70,
					"title": "Vilken hjälte!",
					"text": "Du kan äta din mat med gott samvete. Om alla gjorde som du skulle " + 
						"maten faktiskt inte vara ett klimatproblem längre."
				}
			]	
		};
	return Settings;
});