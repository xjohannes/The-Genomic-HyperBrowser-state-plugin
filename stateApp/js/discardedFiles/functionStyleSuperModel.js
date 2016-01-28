/*(function() {
'use strict';
	var _ = require('underscore');

	

	var Model = function(attributes) {
		this.modelProperties = attributes || {};

		this.set(this.modelProperties);
	};
	

	_.extend(Model.prototype, {
		set: function(newAttributes) {
			if(newAttributes == null) { return; }
			
			for(var i in newAttributes) {
				this.modelProperties[i] = newAttributes[i]; 
			}
			return this;
		},
		get: function(key) {
			return this.modelProperties[key];
		},
		escape : function(key) {
			return _.escape(this.get(key));
		}
	});

	module.exports = Model;

}());*/