(function() {
'use strict';
	var modeApp   = require('./stateApp/js/modeApp.js'),
			toolApp   = require('./stateApp/js/toolsApp.js'),
			polyfills = require('./stateApp/js/polyfills/mdnPolyfill'),
			History   = require('./stateApp/js/prototypes/historyPrototype');
			
			console.log("Main: Reading main");
			$(document).ready(function() {
				console.log("Main: document ready");
				/*location.pathname += 'hyper';
				console.log('location object');
				console.log(location.pathname);*/
				var	history = Object.create(History), 
						historyOptions = {initState:{ mode: 'basic'}},
						modeModel = modeApp.start();
				
				toolApp.start(modeModel, toolApp);
				history.start(historyOptions);
			});
}());