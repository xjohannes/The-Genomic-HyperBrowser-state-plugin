/*(function(){
	'use strict';
	var BaseModel = require('../prototypes/modelPrototype'),
			_         = require('underscore');

	var ToolStateModel = Object.create(BaseModel);

	_.extend(ToolStateModel, function() {
		var sharedToolStateModelState = {}, triggerState = 'history';
		return {
			initialize: function(modelState) {

			//	console.log('initialize toolModel');
				this.eventSetup();
				this.modelState = {};
				if(modelState) {
					this.init(modelState);
				}
			},
			eventSetup: function() {
				this.listenTo('history:toolState', this.setToolStateFromHistory, this);
				this.listenTo('addEventType:set', this.addSetTool, this);
				this.listenTo('addEventType:change', this.addChangeTool, this);
			},
			setToolState: function(state) {
				//console.log('tool: setToolState');
				//console.log(state);
				triggerState = 'history';
				//var trigger = this.triggerToolEvent(state);
				this.set(state);
				//trigger();
				//this.triggerEvent('change:history', {model:this, modelState: this.historify()});
			},
			setToolStateFromHistory: function(state) {
				//console.log('tool: setToolStateFromHistory');
				//console.log(state);
				this.createAjaxCall(state);
				if(state['_toolState'] !== undefined) {
					state['toolState'] = state['_toolState'];
					delete state._tool;
				}
				
				//console.log('tool: setToolStateFromHistory AFTER');
				//console.log(state);
				//var trigger = this.triggerToolEvent(state);
				triggerState = '';
				this.set(state);
				//trigger();
			},
			addSetTool: function(args) {
				//console.log("setting tool: ");
				//console.log(args);
				if(args.model === this) {
					//console.log("setting tool2: ");
					//console.log(this.get('toolState'));
					this.triggerEvent( 'set:' + triggerState, {
						model:this, 
						modelState: {
							toolState:this.get('toolState'),
							action: this.get('action')
						}
					});
					//this.triggerEvent('change:toolState', {model:this, modelState: {toolState:this.get('toolState')}});
				}
			},
			addChangeTool: function(args) {
				//console.log("changing tool: ");
				//console.log(args);
				if(args.model === this) {
					this.triggerEvent('change:' + triggerState, {
						model:this, 
						modelState: {
							toolState:this.get('toolState'),
							action: this.get('action')
						}
					});
					//this.triggerEvent('change:toolState', {model:this, modelState: {toolState:this.get('toolState')}});
				}	
			},
			historify: function() {
				var toolState = this.get('toolState'), 
						historyfiedToolstate = {toolState: toolState};
				if(toolState !== undefined) {
					
					//console.log(JSON.parse(toolForm));
					historyfiedToolstate['_toolState'] = {};
					for(var prop in toolState) {
						if(toolState.hasOwnProperty(prop)) {
							historyfiedToolstate['_toolState'][prop] = toolState[prop];
						}
					}
				}
				return historyfiedToolstate;
			},
			createAjaxCall: function(state) {
				//console.log('create ajax call state:');
				//console.log(state.toolState);
				//console.log(state.action);
				$.ajax({
            type:'post',
            //dataType: 'json',
            url: state.action,
            data: state.toolState,
            success: function (data) {
            	console.log("AJAX was sent successfully");
            	//console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("AJAX Error");
            }
        });
			}
		}
 	}());

	module.exports = ToolStateModel;
}());
*/