(function() {
'use strict';
	var _ 			 = require('underscore'),
			dispatcher = require('./dispatcherPrototype');
	var Model = (function() {
		var modelProperties = {}, tmp;
		
		return {
			init: function(attributes) {
				modelProperties = attributes || {};	
			},
			set: function(newAttributes) {
				if(newAttributes === null) { return; }
				for(var i in newAttributes) {
					tmp =_.escape(newAttributes[i])
					if(!modelProperties[i]) {
						modelProperties[i] = tmp;
						this.triggerEvent('set', {model:this});
					}
					else if(modelProperties[i] && ( modelProperties[i] !== tmp)) {
						modelProperties[i] = tmp;
						this.triggerEvent('change', {model:this});
					} 				
				}
				
				return this;
			},
			get: function(key) {
				return modelProperties[key];
			},
			toJSON: function() {
				return _.clone(modelProperties);
			}
	};
}());
	_.extend(Model, dispatcher );
	module.exports = Model;
})();