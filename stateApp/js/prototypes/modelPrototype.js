(function() {
'use strict';
	var _ 		   = require('underscore'),
        Dispatcher = require('./dispatcherPrototype');
	
	var Model = (function() {
		var tmp;
		
		return {
			init: function(attributes) {
				this.modelState = {};
				this.set(attributes);
			},
			set: function(newAttributes) {
				if(newAttributes === null || newAttributes === undefined) { return; }
				var hasProp;
				for(var prop in newAttributes) {
					if (newAttributes.hasOwnProperty(prop)) {
						hasProp = _.has(this.modelState, prop);
						if (typeof newAttributes[prop] !== 'object') {
							tmp = newAttributes[prop];
							this.modelState[prop] = tmp;
						} else {
							if (this.modelState[prop] === undefined) {
								this.modelState[prop] = {};
							}
							var innerObj = newAttributes[prop];

							for (var innerProp in innerObj) {
								if (innerObj.hasOwnProperty(innerProp) && this.modelState[prop][innerProp] !== innerObj[innerProp]) {
									this.modelState[prop][innerProp] = innerObj[innerProp];
								}
							}
						}
					}
				}
				if(!hasProp) {
					this.triggerEvent('addEventType:set', {model:this});
				} else {
					this.triggerEvent('addEventType:change', {model:this});
				} 
				
				return this;
			},
			get: function(key) {
				if(this.modelState[key] !== undefined) {
					return this.modelState[key];
				}
				return undefined;
			},
			toJSON: function() {
				return this.modelState;
			},
			deleteModel: function(prop) {
				delete this.modelState[prop];
			},
			eraseAllModels: function() {
				for(var prop in this.modelState) {
                    if(this.modelState.hasOwnProperty(prop)) {
                        delete this.modelState[prop];

                    }
				}
			}
	};
}());
	_.extend(Model, Dispatcher );
	module.exports = Model;
})();