(function() {
'use strict';
	var modeApp   = require('./stateApp/js/modeApp.js'),
			toolApp   = require('./stateApp/js/toolsApp.js'),
			polyfills = require('./stateApp/js/polyfills/mdnPolyfill'),
			History   = require('./stateApp/js/prototypes/historyPrototype');
			
			$(document).ready(function() {
				var	history = Object.create(History), 
						historyOptions = {initState:{ mode: 'basic'}},
						modeModel = modeApp.start();
				
				toolApp.start(modeModel, toolApp);
				history.start(historyOptions);
			});
}());