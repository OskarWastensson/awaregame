var http = require('http');

// ############################################
// # Frontend server at :80                   #
// ############################################

var static = require('node-static');
var frontend = new(static.Server)('./front');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        // Serve files!
        frontend.serve(request, response);
    });
}).listen(8888);


console.log('Static server listening on port 8888');


// ############################################
// #  Backend server at :8080                 #
// ############################################


var restify = require('restify');  
var async   = require('async');
var util    = require('util');

// Require Moongoose
var mongoose = require('mongoose');
var config = require('./config');
db = mongoose.connect(config.creds.mongoose_auth),
Schema = mongoose.Schema;  

// Create a schema for our data
var AnswerSchema = new Schema({
  module: String,
  question: Number,
  value: Number,
  user: Number
});
// Use the schema to register a model with MongoDb
mongoose.model('Answer', AnswerSchema); 
var Answer = mongoose.model('Answer'); 

// Authorization with FB
var b64url  = require('b64url');
var crypto  = require('crypto');
var qs      = require('querystring');
var restler = require('restler');
var util    = require('util');

function auth(req, res, next) {
	var appId, secret, scope, encData, signature, json, data, expectedSig;
	
	appId  = 416322788424429;
	secret  = '65289f36c2ca6411ef9dc5af9bf01581';
	scope = '';
	
	 // Get a Cookie
	var cookies = {};
	req.headers.cookie && req.headers.cookie.split(';').forEach(function( cookie ) {
		var parts = cookie.split('=');
		cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});
	if (!cookies['fbsr_' + appId]) throw("No cookie");
	encData = cookies["fbsr_" + appId].split('.', 2);    
	signature  = encData[0];
	json = b64url.decode(encData[1]);
	data = JSON.parse(json);

	// check algorithm
	if (!data.algorithm || (data.algorithm.toUpperCase() != 'HMAC-SHA256')) {
		throw("unknown algorithm. expected HMAC-SHA256");
	}

	// check signature
	expectedSig = crypto
		.createHmac('sha256', secret)
		.update(encData[1])
		.digest('base64')
		.replace(/\+/g,'-')
		.replace(/\//g,'_')
		.replace('=','');
	
	
	if (signature !== expectedSig) throw("bad signature");		
	if (!data.user_id) throw('not logged in');
	
	if(!data.access_token && data.code) {
		// Code to get OAuth token
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
			throw('invalid code: ' + err.error.message);
		});

		request.on('success', function(result) {
			var parts = result.split('=');
			data.access_token = parts[1];
			console.log('Successfully fethed OAuth access token');
		});
	}
	console.log(data);
	if (!data.access_token) throw('no token');

	// Fetch user daata
	try{
		restler.get('https://graph.facebook.com/me', 
			{ query: { access_token: data.accessToken }})
		.on('complete', function(data) {
			var result = JSON.parse(data);
			//console.log(result);
			req.user = result;
			next();
		});
	} catch(err) {
		throw(err);
	}
}

// This function is responsible for returning all entries for the Message model
function getAnswers(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // @TODO: query
  Answer.find().execFind(function (arr,data) {
	res.send(data);
  });	  
}
function postAnswer(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var answer = new Answer(); 
  answer.module = req.params.module;
  answer.question = req.params.question;
  answer.value = req.params.value;
  answer.user = 0; // @TODO facebok user id
  answer.save(function () {
    res.send(req.body);
  });
}

// Set up our routes and start the server
var backendServer = restify.createServer();
backendServer.use(restify.bodyParser());
backendServer.use(auth);
backendServer.get('/answers', getAnswers);
backendServer.post('/answers', postAnswer);

backendServer.listen(8080, function() {
  console.log('%s listening at %s', backendServer.name, backendServer.url);
});