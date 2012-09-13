/** @license
* RequireJS plugin for async dependency load like JSONP and Google Maps
* Author: Miller Medeiros
* Version: 0.1.1 (2011/11/17)
* Released under the MIT license
* 
* modified by Oskar Wastensson to suit facebook SDK
*/
define(function(){

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
						appId      : '416322788424429', // App ID
						channelUrl : '//localhost:8888/channel.html', // Channel File
						status     : true, // check login status
						cookie     : true, // enable cookies to allow the server to access the session
						xfbml      : true  // parse XFBML
					});
				}
				injectScript(name);
			}
		}
	};
});


