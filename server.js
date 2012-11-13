
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
/*
// ############################################
// #  Backend server at :8080                 #
// ############################################

var restify = require('restify');  
var async   = require('async');
var util    = require('util');
var auth    = require('./node/fb_auth');
var b64url  = require('b64url');
var crypto  = require('crypto');
var qs      = require('querystring');
var restler = require('restler');

// Require Moongoose
var mongoose = require('mongoose');
var connectString;

if(typeof MONGOHQ_URL != 'undefined') {
	connectString = MONGOHQ_URL;
} else {
	var config = require('./config');
	connectString = config.creds.mongoose_auth;
}
db = mongoose.connect(connectString),
Schema = mongoose.Schema;  

// Create schema for our data
var AnswerSchema = new Schema({
  id: Number,
  module: String,
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

function setHeaders(req, res, next) {
	var origins = 'http://localhost:8888';
//	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', origins); 
	res.header('Access-Control-Allow-Headers', "X-Requested-With");
	console.log('setting headers');
	next();
}


function getScore(req, res, next) {
  console.log('get score');
	//console.log(req);
	Score.findOne( {
	  'user': req.user.id, 
	  'module': req.params.module
	}, function (err, data) {
		console.log(data);
		res.send(data);
  });
}

function postAnswer(req, res, next) {
  // Create a new answer model, fill it up and save it to Mongodb
  var answer = new Answer(); 
  
  answer.id = req.params.id;
  answer.module = req.params.module;
  answer.value = req.params.value;
  answer.user = req.user.id;
  
  answer.save(function (err) {
	if(err) {
	  res.send(err);
	}
	
	Answer.find({'_id': answer._id}, function(err, result) {
		if(err) {
			res.send(err);
		} else {
			res.send(result)
		}
	})
  });
}

function getAnswers(req, res, next) {
  
  Answer.find( {
	  'user': req.user.id, 
	  'module': req.params.module
	})
	.sort({
		'id': 1
	})
	.execFind(function (arr,data) {
			console.log('get answers');
			console.log(data);
			res.send(data);
  });	  
}

function postScore(req, res, next) {
  // Create a new score model, fill it up and save it to Mongodb
  var score = new Score(); 
  score.module = req.params.module;
  score.value = req.params.value;
  score.max = req.params.max;
  score.user = req.user.id;
  score.save(scorePublish(req, res, next));
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
		if(err) {
			res.send(err);
		} else if(numberAffected === 0) {
			postScore(req, res, next);
		} else {
			if(req.params.publish) {
				scorePublish(req, res, next);
			} else {
				getScore(req, res, next);
			}
			
		}
	});
}

function scorePublish(req, res, next) {
	if(req.params.publish) {
		console.log('publishing score ' + req.params.value * 100 / req.params.max);
		// Publish score to facebook game apis
		restler.post('https://graph.facebook.com/' + req.user.id + '/scores',
		  { query: { 
		    'access_token': req.facebook.access_token,
				'score': req.params.value * 100 / req.params.max
				}} 
		)
		.on('complete', function(data) {
			if(data.error) {
				res.send(data.error);
			} else {
				console.log(data);
				getScore(req, res, next);
			}
		});
	} else {
		getScore(req, res, next);
	}
}

// Set up our routes and start the server
var bServer = restify.createServer();
bServer.use(restify.bodyParser());
bServer.use(auth);
bServer.use(setHeaders);
bServer.get('/:module/answers', getAnswers);
bServer.post('/:module/answers', postAnswer);
bServer.put('/:module/answers', postAnswer);
bServer.get('/:module/score', getScore);
bServer.post('/:module/score', postScore);
bServer.put('/:module/score', updateScore);
// Start server
bServer.listen(8080, function() {
  console.log('%s listening at %s', bServer.name, bServer.url);
});

*/