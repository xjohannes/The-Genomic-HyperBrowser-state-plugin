(function() {
'use strict';
	var modeApp   = require('./stateApp/js/modeApp.js'),
			toolApp   = require('./stateApp/js/toolsApp.js'),
			polyfills = require('./stateApp/js/polyfills/mdnPolyfill'),
			History   = require('./stateApp/js/prototypes/historyPrototype');
			
			$(document).ready(function() {
				var	history = Object.create(History), 
						historyOptions = {initState:{ mode: 'basic'}},
						modeModel;
				
				if(location.hash !== "" || location.href === (location.protocol + "//" +  location.host + extractInstance())
					|| location.href === (location.protocol + "//" +  location.host + extractInstance() + "root")) {
					
					modeModel = modeApp.start();
					toolApp.start(modeModel, toolApp);
					history.start(historyOptions);
				} else {
					// When the user navigates outside app ie when going to the Shared Data part of the HyperBrowser
					//console.log("ModeApp: navigating outside app");
				}
			});
			var extractInstance = function() {
				var instance = location.pathname.split("/")[1];
				return "/" + instance + "/";
			};
}());