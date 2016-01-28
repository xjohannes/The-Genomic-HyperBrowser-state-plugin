(function(){
	'use strict';
	var BaseController = require('../prototypes/controllerPrototype'),
			_    = require('underscore');

	var ToolController = Object.create(BaseController);

	_.extend(ToolController, {
		initialize: function() {
			this.listenTo('set:history', this.parseEvent, this);
			this.listenTo('set:tool', this.parseEvent, this);
		},
		parseEvent: function(eventObj) {
			if(eventObj.modelState._tool.serializedForm !== undefined) {
				this.createAjaxCall(eventObj);
			} else {
				this.triggerTool(eventObj);
			}
		},
		triggerTool: function(eventObj) {
			if(this.model === null && eventObj === undefined) {
				return;
			}
			if(this.model === null && eventObj !== undefined) {
				this.model = eventObj.model;	
			} 
			var toolState = this.model.get('toolState'), loc;
			if(toolState !== undefined && eventObj.model === this.model) {
				loc = toolState.pathName + toolState.toolSearch;
				
				var tt = this.model.get('triggerAjax');
				if(!tt) {
					window.top.frames['galaxy_main'].location.href = loc;
				} 
			}	
		},
			//*
			/* Ajax call will only be executed when setting a tool for the first time.
			*/
		createAjaxCall: function(eventObj) {
			var self = this, currentSelection, pathUrl, mainDocument;
				currentSelection = eventObj.modelState._tool.currentSelection;
				$.ajax({
          type:'post',
          url: 'hyper?#' + currentSelection,
          data: eventObj.modelState._tool.serializedForm,
          beforeSend: function() {
         		self.triggerEvent('ajaxCall');
					},
          success: function (data) {
          	console.log("AJAX was sent successfully");
          	self.triggerEvent('change:tool', {model: this, data: data });
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("AJAX Error");
          }
      });	
		}
	});
	module.exports = ToolController;
}());