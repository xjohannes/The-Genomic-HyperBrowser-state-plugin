/*(function() {
'use strict';
	var _ = require('underscore');
	var Router = (function() {
		// Private variables
		var
		// Private methods 
		_hashChangeHandler = function(eventType, args) {
			dispatcher.triggerEvent('state:mode', hashObj);
		}
		return {
			routes: {
					mode : 'modeState',
					testState: 'testState'
			},
			init: function(options) {
				this.dispatcher = options.dispatcher;
				this.dispatcher.listenTo('change:url', this.parseState, this);
			},
			parseState: function(stateObj) {
				for(var prop in stateObj) {
					if(this.routes[prop]) {
						this[this.routes[prop]](stateObj[prop]);
					}
				}
			},
			modeState: function(modeState) {
				//console.log('modeState:');
				//console.log(modeState);
				this.dispatcher.triggerEvent('state:mode', modeState);
			},
			testState: function() {
				//console.log('testState');
			}
		};
	}());
	module.exports = Router;
})();
*/