(function() {
'use strict';
	var _ = require('underscore'),
			storage    = require('simplestorage.js'),
			Dispatcher = require('./dispatcherPrototype'),
			uriAnchor  = require('urianchor');
	
		var History = (function() {
		// Private variables
		var triggerHashchange = true,
		// Private methods 
		_hashChangeHandler = function(event) {
			var tmpUrlObject = uriAnchor.makeAnchorMap(); 
			if(triggerHashchange) {
				event.data.self.triggerEvent('history:change', tmpUrlObject);
			} else {
				setTimeout(function() {
					triggerHashchange = true;
				}, 500);
			}
		},
		_pushStateHandler = function(event) {
			console.log("History pushState eventType");
		};
		
		return {
			start: function(options) {
				uriAnchor.configModule({sub_delimit_char : "->"})
				options = options || {};
				
				if(options.pushState !== undefined) {
					// Passing this to the _hasChangeHandler. Write up about why!
					$(window).on('pushState', {self: this}, this.pushStateHandler);
				} else {
					$(window).on('hashchange', {self: this}, this.hashChangeHandler);
				}
				this.listenTo('history:change', this.setModelState, this);
				this.listenTo('change:history', this.changeHistory, this);
				this.listenTo('set:history', this.setHistory, this);
				
				if(location.hash !== '') {
					this.triggerEvent('history:change', uriAnchor.makeAnchorMap() );
				} else if(storage.index().length > 0) {
					this.triggerEvent('history:change', this.getStoredStateObject() );
				} else {
					this.triggerEvent('history:mode', options.initState );
					triggerHashchange = false;
					uriAnchor.setAnchor(options.initState, {}, true);
				}
			},
			stop: function(options) {
				options = options || {};
				this.stopListening();
				if(options) {
					$(window).off('pushState');
				} else {
					$(window).off('hashchange');
				}
			},
			//public methods only needed for testing
			hashChangeHandler : function(event) {
				event.stopPropagation();
				event.preventDefault();
				_hashChangeHandler(event);
			},
			pushStateHandler : function(event) {
				event.stopPropagation();
				_pushStateHandler(event);
			},
			setModelState: function(locationObj) {
				// Invariant: All states found in the location hash object is already in the storedStateObject
				var tmpModel = {}, dependentObj;
				for(var prop in locationObj) {
					tmpModel = {}; 
					if(locationObj.hasOwnProperty(prop)) {
						if((prop.charAt(0) !== '_')) {
							dependentObj = ('_' + prop);
							tmpModel[prop] = locationObj[prop];
							if(locationObj[dependentObj]) {
								tmpModel[dependentObj] = locationObj[dependentObj];
							}
							this.triggerEvent('history:' + prop, tmpModel);
						} 
					}
				}
			},
			setHistory: function(modelObj) {
				var locationObj   = uriAnchor.makeAnchorMap(),
						tmpModelState = modelObj.modelState ;
						if(typeof tmpModelState !== 'string') {
							for(var prop in tmpModelState) {
								if( _.has(tmpModelState, prop)) {
									locationObj[prop] = tmpModelState[prop];
									storage.set(prop, tmpModelState[prop]);
								}
							}
						} else {
							locationObj[prop] = tmpModelState[prop];
							storage.set(prop, tmpModelState[prop]);
						}
						triggerHashchange = false;
						uriAnchor.setAnchor(locationObj, {}, true);
			},
			changeHistory: function(modelObj) {
				var state, locationObj   = uriAnchor.makeAnchorMap() ;
						if ( (modelObj['modelState'] !== undefined)) {
							state = modelObj.modelState;
							for(var prop in state) {
								locationObj[prop] = state[prop];
								storage.set(prop, state[prop]);
							}
							triggerHashchange = false;
							uriAnchor.setAnchor(locationObj, {}, true);
						} 
			},
			getStoredStateObject: function() {
				var i, j, store = storage.index(), tmpStorageObj = {};
				for(i = 0; i < (j = store.length); i +=1 ) {
					tmpStorageObj[store[i]] = storage.get(store[i]);
				}
				return tmpStorageObj;
			}
		};
	}());
	_.extend(History, Object.create(Dispatcher) );
	module.exports = History;
})();