/*(function(){
	'use strict';
	var BaseModel = require('../prototypes/modelPrototypeSeperateProps'),
			_         = require('underscore');

	var sModeModel = Object.create(BaseModel);

	_.extend(sModeModel, function() {
		var sharedModeState = {};
		return {
			initialize: function(modelState, options) {
				this.modelState = {};
				this.init(modelState);
				this.eventSetup();
			},
			eventSetup: function() {
				this.listenTo('history:mode', this.toggleMode, this);
				this.listenTo('addEventType:set', this.addSetMode, this);
				this.listenTo('addEventType:change', this.addChangeMode, this);
			},
			toggleMode: function(state) {
				var tmpMode;
				tmpMode = this.get('mode');
				if(!state) {
			 		// Should I implement the strategy design pattern here, just to get some more meat?
			 		// It can be linked to state, but it isn't important to make the code easier to read 
			 		// or maintain, or is it? Or should it only listen for changes from the state:mode
			 		console.log('triggered from the view');
					(tmpMode === 'basic' ? this.set({mode: 'advanced'}) : this.set({mode: 'basic'}));
				}
				else if(state === "basic" || state === "advanced" ) {
					console.log(' NOT triggered from the view');
					this.set({mode: state});
				} 
				else {
					// throw error
					console.log('Error: toggleMode');
					//console.log(state);
				}
			},
			addSetMode: function(args) {
				//console.log("addEventTypeSet");
				if(args.model === this) {
					this.triggerEvent('set:mode', {model:this});
				}
			},
			addChangeMode: function(args) {
				//console.log("addEventTypeChange");
				//console.log(this.get('mode'));
				if(args.model === this) {
					this.triggerEvent('change:mode', {model:this, part:'mode'});
				}	
			}
 		}
 	}());

	module.exports = sModeModel;
}());
*/