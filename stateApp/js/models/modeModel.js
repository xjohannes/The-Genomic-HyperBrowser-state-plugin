(function(){
	'use strict';
	var BaseModel = require('../prototypes/modelPrototype'),
			_         = require('underscore');

	var ModeModel = Object.create(BaseModel);

	_.extend(ModeModel, function() {
		var triggerState = 'history';
		return {
			initialize: function(modelState) {
        this.modelName = 'mode';
				this.eventSetup();
        this.init(modelState);

			},
			eventSetup: function() {
				this.listenTo('history:mode', this.toggleMode, this);
				this.listenTo('addEventType:set', this.addSetMode, this);
				this.listenTo('addEventType:change', this.addChangeMode, this);
			},
			toggleMode: function(state) {
				var tmpMode;
				if(state === undefined) {
					tmpMode = this.get('mode');
					this.triggerState = 'history';
					(tmpMode === 'basic' ? this.set({mode: 'advanced'}) : this.set({mode: 'basic'}));
				}
				else if(state && state.mode === "basic" || state.mode === "advanced" ) {
					if(state.triggerState !== undefined && state.triggerState === 'history') {
						this.triggerState = 'modeCTRL';
					} else if(state.triggerState === 'gsuite'){
						this.triggerState = state.triggerState;
					} else {
						this.triggerState = 'mode';
					}
					this.set({mode: state.mode});
				} else {
					// throw error
					console.log('Error: toggleMode');
				}
			},
			addSetMode: function(args) {
				if(args.model === this) {
					this.triggerEvent('set:' + this.triggerState, this);
				}
			},
			addChangeMode: function(args) {
				if(args.model === this) {
					this.triggerEvent('change:' + this.triggerState, this);
				}	
			}
		}
 	}());

	module.exports = ModeModel;
}());
