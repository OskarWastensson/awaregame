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
			"goodText":
				"Dina matvanor är ganska bra ur miljösynpunkt. Bra jobbat!",
			"goodLevel": 200,
			"okText":
				"Ja, det finns mycket för dig att jobba på, men på det hela " +
				"taget finns det de som är värre an du.",
			"okLevel": 100,
			"badText":
				"USCH USCH Vad dålig du är!"
				
		};
	return Settings;
});