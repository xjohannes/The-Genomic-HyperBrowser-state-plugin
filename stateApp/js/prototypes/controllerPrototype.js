(function() {
'use strict';
//var a = require('path');
var _ 			   = require('underscore'),
		Dispatcher = require('./dispatcherPrototype');

var Controller = {
		init: function(options, customInitializationOptions) {
			this.model = (options.model || null);
			this.initialize(customInitializationOptions);
			return this;
		}
	};
_.extend(Controller, Object.create(Dispatcher) );
module.exports = Controller;
}());
