(function() {
'use strict';
	var _ = require('underscore');
	var Dispatcher = (function() {
		// Private variables
		var subscribers = {
			any: []
		}, i, l,
		// Private methods 
		_dispatch = function(eventType, args) {
			if(subscribers[eventType] !== undefined) {
				for(i = 0; i < (l = subscribers[eventType].length); i+=1) {
						subscribers[eventType][i][0].call(subscribers[eventType][i][1], args);
					}
			}
		};
		
		return {
			listenTo: function(eventType, callback, context) {
				if(typeof callback === 'function' && (typeof context === 'object')) {
					if(subscribers[eventType] === undefined) {
						subscribers[eventType] = [];
					}
					var a = [callback, context];
					subscribers[eventType].push(a);
				} else {
					console.log("You can not listen to events without " 
							+ "specifying a callback function or context");// else throw Error
				};
			},
			stopListening: function(eventType, callback) {
				var eventCallbacks = subscribers[eventType];
				if(typeof eventCallbacks.length === 'number') {
					for(i = 0; i < (l = eventCallbacks.length); i++) {
						if(eventCallbacks[i][0] === callback) {
							 eventCallbacks[i].splice(i, 1);
						}
					}
				}
			},
			triggerEvent: function(eventType, args) {
				_dispatch(eventType, args);
			}
			// methods for testing purposes
			, getSubscribers: function() {
				return subscribers;
			}
		};
	}());
	module.exports = Dispatcher;
})();