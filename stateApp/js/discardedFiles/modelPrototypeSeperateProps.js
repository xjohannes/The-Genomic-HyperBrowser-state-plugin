/*(function() {
'use strict';
	var _ 			   = require('underscore'),
			Dispatcher = require('./dispatcherPrototype');
		
	var Model = (function() {
		var sharedModelState = {}, tmp;
		
		return {
			init: function(attributes, self) {
				//this.modelState
				
				if(this.modelState) {
					for(var prop in attributes) {
						if(attributes.hasOwnProperty(prop)) {
							this.modelState[prop] = attributes[prop];
						}
					}
				} else {
					this.modelState = attributes || {};
				}
			
				
				// to automatically initialize the model. Either pass the that or initialize other place
				// I think this should be deprecated because it is better to.... I don't know. Discuss.
				// One reason not to do it this way, is that the history object need to take into account 
				// the that property. Maybe it should be but in a separate object like over.
				if(self) {
					self.initialize(self);
				}
			},
			set: function(newAttributes) {
				if(newAttributes === null) { return; }
				for(var prop in newAttributes) {
					tmp =_.escape(newAttributes[prop])
					if(!this.modelState[prop]) {
						this.modelState[prop] = tmp;
						this.triggerEvent('addEventType:set', {model:this});
					}
					else if(this.modelState[prop]) {
						this.modelState[prop] = tmp;
						this.triggerEvent('addEventType:change', {model:this});
					} 				
				}
				return this;
			},
			get: function(key) {
				if(this.modelState[key] !== undefined) {
					return this.modelState[key];
				} else {
					return null;
				}
				
			},
			toJSON: function() {
				return _.clone(this.modelState);
			},
			iterateModelProps: function() {
				for(var prop in this.modelState) {
					if(this.modelState.hasOwnProperty(prop)) {
						console.log('iterateModelProps: ' + prop + " - val: " + this.modelState[prop]);
					//console.log(prop +)
					}
				}
			},
			eraseAllModels: function() {
				this.modelState = {};
			}
	};
}());
	_.extend(Model, Object.create(Dispatcher) );
	module.exports = Model;
})();
*/