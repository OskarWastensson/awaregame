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


// This function is responsible for returning all entries for the Message model
function getAnswers(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // @TODO: check query
  Answer.find({user: req.user.id, module: req.params.module}).execFind(function (arr,data) {
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
backendServer.use(auth);
backendServer.use(restify.bodyParser());
backendServer.get('/:module/answers', getAnswers);
backendServer.post('/:module/answers', postAnswer);

backendServer.listen(8080, function() {
  console.log('%s listening at %s', backendServer.name, backendServer.url);
});