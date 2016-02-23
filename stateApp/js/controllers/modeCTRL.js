(function(){
	'use strict';
	var BaseController = require('../prototypes/controllerPrototype'),
			_    = require('underscore');

	var ModeController = Object.create(BaseController);
	_.extend(ModeController, {
		initialize: function() {
			this.listenTo('change:mode', this.parseEvent, this); 
			this.listenTo('change:history', this.parseEvent, this); 
		},
		parseEvent: function(event) {
			this.toggleLeftPanel();
			if(event.model === this.model) {
				this.updateMode(event);
			}
		},
		toggleLeftPanel: function(event) {
			(this.model.get('mode') === "basic" ? window.force_left_panel('hide') : window.force_left_panel('show'));
		},
		updateMode: function(event) { 
			this.mainFrame = $('#galaxy_main');
			
			var tabValue, currentMode, 
					isBasic, analysisTab, basicTab, advancedTab, mode;
				this.mainContents = this.mainFrame.contents();
				this.mainDocument = this.mainContents.filter(function() {
						return this.nodeType === 9;
					});
			isBasic = this.mainDocument.find('#isBasic');

			// Mode change triggered from within a gsuite tool (mainDocument/mainIFrame) 
			if(isBasic.length >= 1) {
				currentMode = event.model.get('mode');
				var serializedForm, form;
				if(currentMode === 'basic' ) {
    				isBasic.prop('checked', 'checked');
    		} 
				if(currentMode === 'advanced' ) {
					isBasic.removeAttr('checked');
				}
				$(isBasic).trigger("change");
			} else {
				// mode change triggered from Gsuite tabs
				analysisTab = this.mainDocument.find('#tab-links');
				basicTab = this.mainDocument.find('#tab-links li:nth-child(2)');
				advancedTab = this.mainDocument.find('#tab-links li:nth-child(3)');
				if(analysisTab.length >= 1) {
					currentMode  = event.model.get('mode');
					(currentMode === 'basic'? tabValue = '#tab2': tabValue = '#tab3');
					
					var currentTab = this.mainDocument.find('.tabs ' + tabValue);
						currentTab.show().siblings().hide();
						
					if(currentMode === 'basic') {
						basicTab.addClass('active').siblings().removeClass('active');
					} else if(currentMode === 'advanced') {
						advancedTab.addClass('active').siblings().removeClass('active');
					}
				} 
			}
		}
	});

	module.exports = ModeController;
}());
