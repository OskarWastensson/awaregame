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
var auth = require('./node/fb_auth');
var b64url  = require('b64url');
var crypto  = require('crypto');
var qs      = require('querystring');
var restler = require('restler');

// Require Moongoose
var mongoose = require('mongoose');
var config = require('./config');


db = mongoose.connect(config.creds.mongoose_auth),
Schema = mongoose.Schema;  

// Create schema for our data
var AnswerSchema = new Schema({
  module: String,
  question: Number,
  value: Number,
  user: Number
});

var ScoreSchema = new Schema({
  module: String,
  user: Number,
  value: Number,
  max: Number
});

// Use the schema to register a model with MongoDb
mongoose.model('Answer', AnswerSchema); 
var Answer = mongoose.model('Answer'); 

mongoose.model('Score', ScoreSchema);
var Score = mongoose.model('Score');

function getAnswers(req, res, next) {
  Answer.find( {
	  'user': req.user.id, 
	  'module': req.params.module
	})
	.sort({
		'question': 1
	})
	.execFind(function (arr,data) {
	res.send(data);
  });	  
}

function getScore(req, res, next) {
  Score.find( {
	  'user': req.user.id, 
	  'module': req.params.module
	})
	.execFind(function (arr,data) {
	res.send(data);
  });  
}

function getList(req, res, next) {
	try{
		restler.get('https://graph.facebook.com/me/',
			{ query: { 
					'access_token': req.facebook.access_token, 
					'fields': 'installed'
				}})
		.on('complete', function(data) {
			var result = JSON.parse(data);
			console.log(result);
			//if(result.id) {
			//	console.log('Fetched user info');
			//	req.user = result;
			//	next();
			//} else {
			//	deny(res, 'Failed to fetch user.');
			//}
		});
	} catch(err) {
		//deny(res, 'Restler error');
		console.log(err);
	}	
}

function postAnswer(req, res, next) {
  // Create a new answer model, fill it up and save it to Mongodb
  var answer = new Answer(); 
  answer.module = req.params.module;
  answer.question = req.params.question;
  answer.value = req.params.value;
  answer.user = req.user.id;
  answer.save(function () {
    res.send(req.body);
  });
}

function postScore(req, res, next) {
  // Create a new score model, fill it up and save it to Mongodb
  var score = new Score(); 
  score.module = req.params.module;
  score.value = req.params.value;
  score.max = req.params.max;
  score.user = req.user.id;
  score.save(function () {
    res.send(req.body);
  });
}

function updateScore(req, res, next) {
  Score.update( {
	  'user': req.user.id, 
	  'module': req.params.module
	},
	{
		'value': req.params.value,
		'max': req.params.max
	},
	[], function(err, numberAffected, raw) {
		res.send(req.body);
	});
}

// Set up our routes and start the server
var bServer = restify.createServer();
bServer.use(restify.bodyParser())
bServer.use(auth)
bServer.get('/:module/answers', getAnswers)
bServer.post('/:module/answers', postAnswer)
bServer.get('/:module/score', getScore)
bServer.post('/:module/score', postScore)
bServer.put('/:module/score', updateScore)
bServer.get('/:module/list', getList);
// Start server
bServer.listen(8080, function() {
  console.log('%s listening at %s', bServer.name, bServer.url);
});