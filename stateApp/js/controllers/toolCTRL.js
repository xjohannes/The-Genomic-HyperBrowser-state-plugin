(function(){
	'use strict';
	var BaseController = require('../prototypes/controllerPrototype'),
			_    					 = require('underscore'),
			config 				 = require('../stateAppConfig');

	var ToolController = Object.create(BaseController);

	_.extend(ToolController, {
		initialize: function() {
			this.listenTo('set:tool', this.parseEvent, this);
		},
		parseEvent: function(eventObj) {
			if(eventObj.modelState._tool.serializedForm !== undefined) {
				this.createAjaxCall(eventObj);
			} 
		},
			//*
			/* Ajax call will only be executed when setting a tool for the first time.
			*/
		createAjaxCall: function(eventObj) {
			var self = this, currentSelection;
				currentSelection = eventObj.modelState._tool.currentSelection;
				$.ajax({
          type:'post',
          url: config.urlHyperPostfix + "?" + currentSelection,
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