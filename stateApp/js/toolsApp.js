 (function() {
	'use strict';
	var Dispatcher = require('./prototypes/dispatcherPrototype'),
			Controller = require('./controllers/toolCTRL'),
			ToolModel  = require('./models/toolModel'),
			ToolView   = require('./views/toolView'),
			uriAnchor  = require('urianchor');
		
	var toolApp = (function() {
		var toolCTRL, dispatcher, toolModel, toolView, parentFrame,
				toolsFrame, mainFrame, mainContent, mainDocument, toolState, 
				currentMode, isBasic, analysisTab,
				
				_setUpGsuiteTabs = function(modeModel) {
					console.log("ToolApp: _setUpGsuiteTabs");
					var mode, anchorMap, tabValue, basicTab,
							advancedTab;
					isBasic = mainDocument.find('#isBasic');
					analysisTab = mainDocument.find('.tabs .tab-links li:nth-child(2)');
					// Decides if the main gsuit tabs exist in main iFrame
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
					// Decides if the tool provides both basic and advanced view
					if(isBasic.length >= 1) {
						isBasic.parent().hide();

						(isBasic.attr('checked') === 'checked'? mode = 'basic': mode = 'advanced');
  					// If the user hasn't come here from the tools panel the tool states mode is not set
  					if(toolModel.get('mode') === undefined) {
  						toolModel.setToolState({
								mode: mode,	
								silence: true,
								triggerAjax: true
							});
  					} else {
							toolModel.deleteModel('mode');
						}
					} 			
				};

		return {
			start: function(modeModel) {

				console.log("ToolApp: Start");
				toolCTRL = Object.create(Controller);
				//the dispatcher is a Singelton.
				dispatcher = Object.create(Dispatcher);
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
				
				toolsFrame.on('load', function(e) {
					var toolsContent = $($('#galaxy_tools')[0]).contents(),
							toolsDocument = toolsContent.filter(function() {
		      			return this.nodeType === 9;
		    			});

					$('a.tool-link', toolsContent ).on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						toolState = {
							tool: e.currentTarget.text,
							toolState: {
								pathName  : e.currentTarget.pathname,
								toolSearch: e.currentTarget.search,
								serializedForm: undefined, 
								currentSelection: undefined
							}
						};
						toolModel.eraseAllModels();
						toolModel.setToolState(toolState);

					});

				});	
				mainFrame.on('load', function(e) {
							mainContent = $($('#galaxy_main')[0]).contents();
							mainDocument = mainContent.filter(function() {
		      			return this.nodeType === 9;
		    			});
		    			
		    			mainDocument.ready(function() {
		    				$('.gsuitebox a', mainContent ).on('click', function(e) {
									e.preventDefault();
									e.stopPropagation();
									toolState = {
										tool: e.currentTarget.text,
										toolState: {
											pathName  : e.currentTarget.pathname,
											toolSearch: e.currentTarget.search,
											serializedForm: undefined, 
											currentSelection: undefined
										}
									};
									toolModel.eraseAllModels();
									toolModel.setToolState(toolState);

								});
		    				_setUpGsuiteTabs(modeModel);
		    				
		    				var formSelects = mainContent.find('form select');
								var form =  mainContent.find('form'),
												serializedForm = form.serialize();
								if(form.length > 0) {
									console.log("ToolApp: Form exist in main");
									toolModel.setToolState({
										toolState: {
											serializedForm: serializedForm, 
											currentSelection: e.currentTarget.name
										}
									});
								} else if( uriAnchor.makeAnchorMap().mode === undefined ) {
									// To account for situations where mode is not set in url
									modeModel.toggleMode({mode: modeModel.get('mode'), triggerState: 'history'});
								} 
		    			});
						});
			}
 		}
 		
	}());
 module.exports = toolApp;
}());
