define([
  'jQuery',
  'Underscore',
  'Backbone',
  'views/welcome',
  'views/header',
  'views/denied',
  'views/result',
  'views/score',
  'views/question',
  'views/progress',
  'collections/questions',
  'models/score',
  'models/highscore',
  'collections/answers'
], function(
  $,
  _,
  Backbone, 
  WelcomeView, 
  HeaderView, 
  DeniedView, 
  ResultView, 
  ScoreView, 
  QuestionView,
  ProgressView,
  QuestionsCollection, 
  ScoreModel,
  HighScoreModel,
  AnswersCollection
  ){
  var self = this;
  //Add a close method to all views in backbone
  Backbone.View.prototype.close = function () {
      // console.debug("Closing view");
      if (this.beforeClose) {
          this.beforeClose();
      }
      this.off();
      this.remove();
  };

  var AppRouter = Backbone.Router.extend({
    initialize: function(){
    this.loadcounter = 0;
	  this.questionsList = new QuestionsCollection();
	  
	  this.score = new ScoreModel();
	  this.highScores = new HighScoreModel();
	  
	  this.scoreView = new ScoreView({
		  model: this.score
		});
	  
      this.answers = new AnswersCollection();
      this.answers.on('add', function(answerModel) {
        answerModel.save();
	    this.score.update(answerModel.attributes.value, this.questionsList.get(answerModel.id).max());
      }, this);
	  
	  this.progressView = new ProgressView({
		  collection: this.questionsList,
		  answers: this.answers
	  });
	  
	  this.resultView = new ResultView({
		  model: this.score,
			highScores: this.highScores
	  });
	  
    },
    routes: {
      '': 'welcome',
	    'denied': 'denied',
      'questions/:id': 'question',
			'result': 'result'
    },
    welcome: function(){
	    this.before(function(){
        AwRouter.showView('#content', new WelcomeView());
      });
    },
    denied: function(){
      this.before(function(){
        AwRouter.showView('#content', new DeniedView());
      });
    },
  	afterLogin: function() {
  		// Can't get self or this right!'
  		var self = AwRouter;
  		self.score.fetch({
  		  success: function() {
  				// console.log('Fetched score');
  				// console.log(self.score)
  				if(self.bothLoaded()) {
  		      self.afterLoad();
  				}		
  		  }
  		});
  		self.answers.fetch({
  			success: function() {
  				if(self.bothLoaded()) {
  					self.afterLoad();
  				}
  		  }
  		});
  	},
  	bothLoaded: function () {
  	  var self = this; 
  	  self.loadcounter += 1;
  	  return self.loadcounter === 2;
  	},
  	afterLoad: function () {
  	  // console.log(this.score)
  		var self = this; 
  	  self.fetchedAnswers = self.answers;
  	  self.question(self.answers.length + 1);
  	},
    denied: function(){
      this.before(function(){
        AwRouter.showView('#content', new DeniedView());
      });
    },
    question: function(id){
      var self = this;
      this.before(function(){
        self.fbLogin(function(){
          if(!self.questionsList){
            self.questionsList = new QuestionsCollection(QuestionsData);
          }
		  if(id > self.questionsList.length) {
			  self.navigate('result', {trigger: true});
			  return;
		  }
          // if(typeof self.fetchedAnswers !== 'undefined'){
            if(self.questionsList.get(id)){
                  if(self.curQuestionView){
                    self.curQuestionView.close();
                  }

                  //Go to next question if the question is answered
                  if(self.answers.get(id)){
                      self.navigate('questions/' + (parseInt(id)+1), {trigger: true});
                      return;
                  }
      				  // console.log('progress render:');
         
      			  $("#progress").html(self.progressView.render().el);

              self.curQuestionView = new QuestionView({model: self.questionsList.get(id), answers: self.answers}); 
              $("#content").html('');
              $("#content").html(self.curQuestionView.render().el);
              
              $("#footer").html(self.scoreView.render().el); 
              
            } else {
              // console.debug("The question doesn't exist");
            }

          // } else {
          //   self.requestedId = id;
          //   self.fetchAnswers();
          // }
        });
      });
    },
	result: function() {
		var self = this;
		this.score.publish({success: function () {
			self.highScores.fetch({
				success: function(model, data) {
				$('#content').html(self.resultView.render().el);
			}
			})
		}});
	},
    showView: function(selector, view){
      if(selector !== '#header'){
        if(AwRouter.curView){
          AwRouter.curView.close();
          AwRouter.curView = view;
        }
      }
      $(selector).html('');
      $(selector).html(view.render().el);
      
      return view;
    },
    before: function(callback){
      if(AwRouter.curHeader){
        if(callback) callback();
      } else {
        AwRouter.curHeader = AwRouter.showView('#header', new HeaderView());
        if(callback) callback();
      }
    },
    fbLogin: function(callback, test){
      // console.log('fbLogin');
			FB.getLoginStatus(function(response) {
			// console.log('getloginstatus');
			if (response.status === 'connected') {
				if(callback) callback();
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, 
				// but has not authenticated your app
				// console.log('User cancelled login or did not fully authorize.');
			} else {
				// the user isn't logged in to Facebook.
				FB.login(function(response) {
					if (response.authResponse) {
						// Logged in
						FB.api('/me', function(response) {
						// console.log('Good to see you, ' + response.name + '.');
						if(callback) callback();
						});
					} else {
				// console.log('User cancelled login or did not fully authorize.');
				}
			}, {scope: 'publish_actions'});
		}
	 });
    }
  });

  var initialize = function(){
	FB.Event.subscribe('auth.statusChange', function(response) {
		if(response.status == 'connected') {
			// console.log('FB init');
			var fbAuth = FB.getAuthResponse();		
			// Alway send along FB signed request with ajax calls to backend
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
				var data;
				options.url = options.url += '?code=' + fbAuth.signedRequest;
			});
		}
	});
	
	// Backbone router initiatlization
	AwRouter = new AppRouter;
	Backbone.history.start();
	
  };
  return {
    initialize: initialize
  };
});