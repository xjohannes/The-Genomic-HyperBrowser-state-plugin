(function(){
	'use strict';
	var BaseModel = require('../prototypes/modelPrototype'),
			_         = require('underscore');

	var ToolModel = Object.create(BaseModel);

	_.extend(ToolModel, function() {
		var sharedToolModelState = {}, triggerState = 'history';
		return {
			initialize: function(modelState) {
				this.eventSetup();
				this.modelState = {};
				if(modelState) {
					this.init(modelState);
				}
			},
			eventSetup: function() {
				this.listenTo('history:tool', this.setToolStateFromHistory, this);
				this.listenTo('home', this.eraseAllModels, this);
				this.listenTo('addEventType:set', this.addSetTool, this);
				this.listenTo('addEventType:change', this.addChangeTool, this);
			},
			setToolState: function(state) {
				triggerState = 'history';
				this.set(state);
			},
			setToolStateFromHistory: function(state) {
				// all model changes from history will use a fresh model, thus setting not changing state
				this.eraseAllModels();
				triggerState = 'tool';
				if(state['_tool'] !== undefined) {
					state['toolState'] = state['_tool'];
					delete state._tool;
				}
				this.set(state);
			},
			addSetTool: function(args) {
				if(args.model === this) {
					this.triggerEvent( 'set:' + triggerState, { model: this, modelState: this.historify()});
				}
			},
			addChangeTool: function(args) {
				if(args.model === this) {
					this.triggerEvent('change:' + triggerState, { model: this, modelState: this.historify()});
				}	
			},
			historify: function() {
				var toolState = this.get('toolState'), 
						historyfiedToolstate = {tool: this.get('tool')};
				if(toolState !== undefined) {
					historyfiedToolstate['_tool'] = {};
					for(var prop in toolState) {
						if(toolState.hasOwnProperty(prop)) {
							historyfiedToolstate['_tool'][prop] = toolState[prop];
						}
					}
				}
				return historyfiedToolstate;
			}
		}
 	}());

	module.exports = ToolModel;
}());
