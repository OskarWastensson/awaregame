define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var Settings = {
			"name": "Mat",
			"machineName": "food",
			"facebookAppId": 416322788424429,
			"welcomeText":
				"Välkommen till Matspelet. Svara på några enkla frågor om " +
				"dina matvanor och få reda på din miljöbelastning.",
			"levels": [
				{
					"value": 0,
					"title": "Dåligt resultat",
					"text": "Det här är texten ska komma om man svarar dåligt."
				},
				{
					"value": 30,
					"title": "Mjäkigt resultat",
					"text": "Det här är texten ska komma om man svarar mallandåligt."
				},
				{
					"value": 70,
					"title": "Bra resultat",
					"text": "Det här är texten ska komma om man svarar bra."
				}
			]	
		};
	return Settings;
});