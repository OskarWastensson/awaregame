//
//	fb_auth.js
//
//	Authorization via facebook tailored to fit restify and the 
//	awaregame.
//
//	Takes a lot of inspiration from faceplate module for the express server.
//

var b64url  = require('b64url');
var crypto  = require('crypto');
var qs      = require('querystring');
var restler = require('restler');
var util    = require('util');


function auth (req, res, next) {
	var appId, secret, scope, encData, signature, json, data, expectedSig;

	appId  = 416322788424429;
	secret  = '65289f36c2ca6411ef9dc5af9bf01581';
	scope = 'friends_about_me';

	// Get a Cookie
	
	var cookies = {};
	req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
		var parts = cookie.split('=');
		cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});
	if (!cookies['fbsr_' + appId]) {
		
		// !! Cookies cannot be sent via current installation. Instead an extra 
		// !! parameter is used
		// 
		// BEGIN ugly solution
		console.log(req.query);
		
		if(req.query) {
			encData = req.query
				.substring(req.query.indexOf('code=') + 5)
				.split('.', 2);
		} else {
			deny(res, 'No cookie');
			return;
		}
		// END ugly solution
	
	} else {
		encData = cookies["fbsr_" + appId].split('.', 2);    
	}
	
	
	signature  = encData[0];
	json = b64url.decode(encData[1]);
	data = JSON.parse(json);

	// check algorithm
	if (!data.algorithm || (data.algorithm.toUpperCase() != 'HMAC-SHA256')) {
		deny(res, 'Unknown algorithm. expected HMAC-SHA256');
		return;
	}

	// check signature
	expectedSig = crypto
		.createHmac('sha256', secret)
		.update(encData[1])
		.digest('base64')
		.replace(/\+/g,'-')
		.replace(/\//g,'_')
		.replace('=','');

		
	if (signature !== expectedSig) {
		console.log(signature);
		console.log(expectedSig);
		deny(res, 'Bad signature');
		return;
	}
	
	if (!data.user_id) {
		deny(res, 'Not logged in');
		return;
	}

	if(data.acess_token) {
		req.facebook = data;
		fetchUser(req, res, next);
	}
	else if(data.code) {
		// Use code to get OAuth token
		var params = {
				client_id:     appId,
				client_secret: secret,
				redirect_uri:  '',
				code:          data.code
		};

		var request = restler.get('https://graph.facebook.com/oauth/access_token', 
			{ query: params });

		request.on('fail', function(result) {
			var err = JSON.parse(result);
			deny(res, 'invalid code: ' + err.error.message);
		});

		request.on('success', function(result) {
			data.access_token = result.substring(
				result.indexOf('access_token=') + 13,
				result.indexOf('&')
			);
			console.log('Successfully fetched OAuth access token');
			req.facebook = data;
			fetchUser(req, res, next);
		});
	}
};

function fetchUser (req, res, next) {
	// Fetch user data
	try{
		restler.get('https://graph.facebook.com/me', 
			{ query: { access_token: req.facebook.access_token }})
		.on('complete', function(data) {
			
			var result = JSON.parse(data);
			if(result.id) {
				console.log('Fetched user info');
				req.user = result;
				next();
			} else {
				deny(res, 'Failed to fetch user.');
			}
		})
		.on('fail', function() {
			console.log('Facebook denied access');
			return;
		});
	} catch(err) {
		deny(res, 'Restler error');
	}
};

function deny (res, message) {
	res.send(new Error(message));
};

module.exports = auth;