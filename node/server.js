var http = require('http');
var restify = require('restify');  
var server = restify.createServer();
server.use(restify.bodyParser());

var async   = require('async');
var util    = require('util');


require('faceplate').middleware({
	app_id: process.env.FACEBOOK_APP_ID,
	secret: process.env.FACEBOOK_SECRET,
	scope:  'user_likes,user_photos,user_photo_video_tags'
});

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
// @TODO
function auth() {
	
}


// This function is responsible for returning all entries for the Message model
function getAnswers(req, res, next) {
	
  //// Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // @TODO: query
  if(auth()) {
	Answer.find().execFind(function (arr,data) {
		res.send(data);
	});	  
  } else {
	res.send({})  
  }
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
server.get('/answers', getAnswers);
server.post('/answers', postAnswer);

server.listen(80, function() {
  console.log('%s listening at %s, love & peace', server.name, server.url);
});