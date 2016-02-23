 (function() {
	'use strict';
	var Controller = require('./controllers/toolCTRL'),
			ToolModel  = require('./models/toolModel'),
			ToolView   = require('./views/toolView'),
			uriAnchor  = require('urianchor');
		
	var toolApp = (function() {
		var toolCTRL, toolModel, toolView, parentFrame,
				toolsFrame, mainFrame, mainContent, mainDocument, toolState, 
				currentMode, isBasic, analysisTab,
				
				_setUpMainFrame = function(modeModel) {
					mainFrame.on('load', function(e) {
						mainContent = $($('#galaxy_main')[0]).contents();
						mainDocument = mainContent.filter(function() {
	      			return this.nodeType === 9;
	    			});
	    			mainDocument.ready(function() {
	    				$('.gsuitebox a', mainContent ).on('click', function(e) {
								toolState = {
									tool: e.currentTarget.text
								};
								toolModel.eraseAllModels();
								toolModel.setToolState(toolState);
							});
	    				_setUpGsuiteTabs(modeModel);
	    				
	    				var formSelects = mainContent.find('form select');
							var form =  mainContent.find('form'),
											serializedForm = form.serialize();
							if(form.length > 0) {
								toolModel.setToolState({
									serializedForm: serializedForm,
									currentSelection: e.currentTarget.name
								});
							} else if( uriAnchor.makeAnchorMap().mode === undefined ) {
								// To account for situations where mode is not set in url
								modeModel.toggleMode({mode: modeModel.get('mode'), triggerState: 'history'});
							} 
	    			});
					});
				},
				_setUpToolFrame = function (modeModel) {
					////////////// Setting up the toolFrame ///////////////
				toolsFrame.on('load', function(e) {
					var toolsContent = $($('#galaxy_tools')[0]).contents(),
							toolsDocument = toolsContent.filter(function() {
		      			return this.nodeType === 9;
		    			});

						$('a.tool-link', toolsContent ).on('click', function(e) {
							toolState = {
								tool: e.currentTarget.text
							};
							toolModel.eraseAllModels();
							toolModel.setToolState(toolState);
						});
					});
				},
				_setUpGsuiteTabs = function(modeModel) {
					var mode, anchorMap, tabValue, basicTab,
							advancedTab;
					isBasic = mainDocument.find('#isBasic');
					analysisTab = mainDocument.find('.tabs .tab-links li:nth-child(2)');
					// Decides if the main g-suite tabs exist in main iFrame
					if(analysisTab.length >= 1) {
						basicTab = mainDocument.find('#tab-links li:nth-child(2)');
						advancedTab = mainDocument.find('#tab-links li:nth-child(3)');
						basicTab.on('click', function() {
							modeModel.toggleMode({mode: 'basic', triggerState: 'history'});
						});
						advancedTab.on('click', function() {
							modeModel.toggleMode({mode: 'advanced', triggerState: 'history'});
						});
					} 
					// Decides if the tool provides both basic and advanced view, ie is a g-suite tool
					if(isBasic.length >= 1) {
						isBasic.parent().hide();
					} 			
				};

		return {
			start: function(modeModel) {
				toolCTRL = Object.create(Controller);
				toolModel  = Object.create(ToolModel);
				toolView   = Object.create(ToolView);
				
				parentFrame  = $('iframe');
				toolsFrame = $('#galaxy_tools');
				mainFrame  = $('#galaxy_main');

				toolCTRL.init({model: toolModel});
				toolModel.initialize();
				toolView.init({
							model     : toolModel,
							tagName   : mainFrame
						});
					
				_setUpMainFrame(modeModel);
				_setUpToolFrame(modeModel);
			}
 		}
 		
	}());
 module.exports = toolApp;
}());
