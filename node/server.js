var http = require('http');

// Require restify
var restify = require('restify');  
var server = restify.createServer();
server.use(restify.bodyParser());

console.log('Restify required...');

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
  console.log('getAnswers()...');
  console.log(Answer);
  //// Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
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
server.get('/answers', getAnswers);
server.post('/answers', postAnswer);

server.listen(80, function() {
  console.log('%s listening at %s, love & peace', server.name, server.url);
});