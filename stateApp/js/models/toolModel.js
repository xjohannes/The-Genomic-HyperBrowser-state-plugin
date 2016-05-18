(function(){
	'use strict';
	var BaseModel = require('../prototypes/modelPrototype'),
		_         = require('underscore');

	var ToolModel = Object.create(BaseModel);

	_.extend(ToolModel, function() {
		var triggerState = 'history';
		return {
			initialize: function(modelState) {
				this.modelName = 'tool';
				this.eventSetup();
				this.modelState = {};
				this.init(modelState);
			},
			eventSetup: function() {
				this.listenTo('history:tool', this.setToolStateFromHistory, this);
				this.listenTo('history:backToWelcome', this.goToWelcome, this);
				this.listenTo('home', this.eraseAllModels, this);
				this.listenTo('addEventType:set', this.addSetTool, this);
				this.listenTo('addEventType:change', this.addChangeTool, this);
			},
	    setTool: function(state) {
	        triggerState = 'none';
	        this.set(state);
	    },
			setToolState: function(state) {
          triggerState = 'history';
          if(this.back === undefined) {
          	this.set(state);
          } else if(this.back === 1) {
          	delete this.back;
          	
          }
			},
			setToolStateFromHistory: function(state) {
				triggerState = 'tool';
				this.back = 1;
        if(state['tool'] === undefined) {
            //Do nothing
        } else {
            this.eraseAllModels();
            this.set(state);
        }
			},
			addSetTool: function(args) {
				if(args.model === this) {
					this.triggerEvent( 'set:' + triggerState, this);
				}
			},
			goToWelcome: function(state) {
					this.eraseAllModels();
					this.triggerEvent( 'set:' + 'tool', state);
			},
			
			addChangeTool: function(args) {
				if(args.model === this) {
					this.triggerEvent('change:' + triggerState, this);
				}	
			}
		}
 	}());

	module.exports = ToolModel;
}());
