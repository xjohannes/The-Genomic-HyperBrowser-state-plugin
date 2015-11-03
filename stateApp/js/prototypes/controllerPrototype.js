(function() {
'use strict';
//var a = require('path');
var _ 			   = require('underscore');

var Controller = {
		init: function(options, customInitializationOptions) {
			this.dispatcher = (options.dispatcher || null);
			this.model = (options.model || null);
			this.initialize(customInitializationOptions);
			return this;
		},
		initialize: function(options) {
			return this;
		}
	};

module.exports = Controller;
}());
