define([
	'jQuery',
  	'Underscore',
  	'Backbone'
], function($, _, Backbone){
	var Questions = [
		{
			"id": 1,
			"title": "Hur mycket ätbart matavfall slänger du per vecka?", 
			"text": "Räkna inte med oätbara delar till exempel äggskal.",
			"options": [
				{
					"text": 'Inget',
					"value": 100
				},
				{
					"text": 'Upp till 1/2 kg.',
					"value": 90
				},
				{
					"text": 'Upp till 1 kg',
					"value": 70
				},
				{
					"text": 'Upp till 2 kg',
					"value": 20
				},
				{
					"text": 'Mer än 2 kg',
					"value": 0
				}
			],
			"good_value": 50
		}, 
		{
			"id": 2,
			"title": "Hur många portioner nötkött äter du per vecka?", 
			"text": "En portion är 100 gram. Nötkött är kött från kor. Till exempel nötfärs, oxfilet och rostbiff.",
			"options": [
				{
					"text": 'Inga portioner',
					"value": 200
				},
				{
					"text": '1-3 portioner',
					"value": 120
				},
				{
					"text": '4-6 portioner',
					"value": 100
				},
				{
					"text": '7-9 portioner',
					"value": 80
				},
				{
					"text": '10-12 portioner',
					"value": 50
				},
				{
					"text": '13-15 portioner',
					"value": 20
				},
				{
					"text": 'Mer än 15 portioner',
					"value": 0
				}
			],
			"good_value": 100
		}, 
		, 
		{
			"id": 3,
			"title": "Hur många portioner fläskkött äter du per vecka?", 
			"text": "En portion är 100 gram. Fläskkött är kött från gris. Till exempel fläskkottlett bacon och skinka.",
			"options": [
				{
					"text": 'Inga portioner',
					"value": 200
				},
				{
					"text": '1-3 portioner',
					"value": 120
				},
				{
					"text": '4-6 portioner',
					"value": 100
				},
				{
					"text": '7-9 portioner',
					"value": 80
				},
				{
					"text": '10-12 portioner',
					"value": 50
				},
				{
					"text": '13-15 portioner',
					"value": 20
				},
				{
					"text": 'Mer än 15 portioner',
					"value": 0
				}
			],
			"good_value": 50
		}, 
		{
			"id": 4,
			"title": "Hur många portioner kyckling äter du per vecka?", 
			"text": "En portion är 100 gram. Hit räknas också annat fågelkött, till exempel kalkon.",
			"options": [
				{
					"text": 'Inga portioner',
					"value": 150
				},
				{
					"text": '1-3 portioner',
					"value": 90
				},
				{
					"text": '4-6 portioner',
					"value": 75
				},
				{
					"text": '7-9 portioner',
					"value": 60
				},
				{
					"text": '10-12 portioner',
					"value": 35
				},
				{
					"text": '13-15 portioner',
					"value": 15
				},
				{
					"text": 'Mer än 15 portioner',
					"value": 0
				}
			],
			"good_value": 75
		}, 
		{
			"id": 5,
			"title": "Hur många portioner köpt fisk äter du per vecka?", 
			"text": "En portion är 100 gram.",
			"options": [
				{
					"text": 'Inga portioner',
					"value": 150
				},
				{
					"text": '1-3 portioner',
					"value": 90
				},
				{
					"text": '4-6 portioner',
					"value": 75
				},
				{
					"text": '7-9 portioner',
					"value": 60
				},
				{
					"text": '10-12 portioner',
					"value": 35
				},
				{
					"text": '13-15 portioner',
					"value": 15
				},
				{
					"text": 'Mer än 15 portioner',
					"value": 0
				}
			],
			"good_value": 75
		},{
			"id": 6,
			"title": "Hur stor del av ditt grönsaksintag är rotfrukter?", 
			"text": "Rotfrukter inkluderar lök, palsternacka, morot m.m. I kontrast till salladsgrönsaker som tomat, gurka och paprika.",
			"options": [
				{
					"text": 'En liten del',
					"value": 0
				},
				{
					"text": 'Ungefär hälften.',
					"value": 50
				},
				{
					"text": 'En stor del',
					"value": 100
				}
			],
			"good_value": 40
		},{
			"id": 7,
			"title": "Hur mycket godis, glass & choklad äter du?", 
			"text": "",
			"options": [
				{
					"text": 'Inget.',
					"value": 100
				},
				{
					"text": 'Upp till 200 gram per vecka.',
					"value": 80
				},
				{
					"text": 'Upp till 400 gram per vecka.',
					"value": 40
				},
				{
					"text": 'Upp till 600 gram per vecka.',
					"value": 20
				},
				{
					"text": 'Över 600 gram per vecka.',
					"value": 0
				}
			],
			"good_value": 50
		},{
			"id": 8,
			"title": "Hur mycket kaffe, te & choklad dricker du?", 
			"text": "",
			"options": [
				{
					"text": 'Inget.',
					"value": 100
				},
				{
					"text": 'Upp til 0,3 liter per vecka.',
					"value": 80
				},
				{
					"text": 'Upp till 0,7 liter per vecka.',
					"value": 40
				},
				{
					"text": 'Upp till 1 liter per vecka.',
					"value": 20
				},
				{
					"text": 'Över 1 liter per vecka.',
					"value": 0
				}
			],
			"good_value": 50
		}, ,{
			"id": 9,
			"title": "Hur mycket mejeriprodukter äter du per dag?", 
			"text": "Räkna med att en deciliter mjölk väger cirka 100 gram.",
			"options": [
				{
					"text": 'Inget.',
					"value": 200
				},
				{
					"text": 'Upp till 200 gram per dag.',
					"value": 160
				},
				{
					"text": 'Upp till 400 gram per dag.',
					"value": 120
				},
				{
					"text": 'Upp till 600 gram per dag.',
					"value": 80
				},
				{
					"text": 'Upp till 800 gram per dag.',
					"value": 40
				},
				{
					"text": 'Upp till 1 kilogram per dag.',
					"value": 20
				},
				{
					"text": 'Över 1 kilogram per dag.',
					"value": 0
				}
			],
			"good_value": 100
		},{
			"id": 10,
			"title": "Hur mycket bröd äter du?", 
			"text": "",
			"options": [
				{
					"text": 'Inget.',
					"value": 100
				},
				{
					"text": '1 skiva per dag.',
					"value": 80
				},
				{
					"text": '2-4 skivor per dag.',
					"value": 60
				},
				{
					"text": '5-7 skivor per dag.',
					"value": 40
				},
				{
					"text": '8-10 skivor per dag.',
					"value": 20
				},
				{
					"text": 'Mer än 10 skivor per dag.',
					"value": 0
				}
			],
			"good_value": 50
		}
	];
	return Questions;
});