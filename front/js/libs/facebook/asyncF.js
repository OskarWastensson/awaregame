/** @license
* RequireJS plugin for async dependency load like JSONP and Google Maps
* Author: Miller Medeiros
* Version: 0.1.1 (2011/11/17)
* Released under the MIT license
* 
* modified by Oskar Wastensson to suit facebook SDK
*/
define(['../js/data/settings'], function(settings){

    function injectScript(src){
		var s, t;
	
        s = document.createElement('script'); 
		
		s.id = 'facebook-jssdk';
		s.type = 'text/javascript'; 
		s.async = true; 
		s.src = src;
		
		t = document.getElementsByTagName('head')[0]; 
		t.appendChild(s);
    }

    return {
        load : function(name, req, onLoad, config){
            if(config.isBuild){
                onLoad(null); //avoid errors on the optimizer
            } else {
                window.fbAsyncInit = function() {
					onLoad(name);
					FB.init({
						appId      : settings.facebookAppId,
						channelUrl : document.domain + '/channel.html', // Channel File
						status     : true, // check login status
						cookie     : true, // enable cookies to allow the server to access the session
						xfbml      : true,  // parse XFBML
						frictionlessRequests: true
					});
				}
				injectScript(name);
			
			}
		}
	};
});

function sendRequestToRecipients() {
	var user_ids = document.getElementsByName("user_ids")[0].value;
	FB.ui({method: 'apprequests',
		message: 'My Great Request',
		to: user_ids
	}, requestCallback);
}

function sendRequestViaMultiFriendSelector() {
	FB.ui({method: 'apprequests',
		message: 'My Great Request'
	}, requestCallback);
}

function requestCallback(response) {
  
}

