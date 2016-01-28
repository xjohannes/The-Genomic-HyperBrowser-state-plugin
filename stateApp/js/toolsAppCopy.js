 (function() {
	'use strict';
	var Dispatcher = require('./prototypes/dispatcherPrototype'),
			Controller = require('./controllers/toolCTRL'),
			ToolModel  = require('./models/toolModel'),
			ToolView   = require('./views/toolView'),
			//GsuiteView   = require('./views/gsuiteView'),
			uriAnchor  = require('urianchor');
		
	var toolApp = (function() {
		return {
			start: function(modeModel) {
				console.log("Starting toolApp");
				var toolCTRL = Object.create(Controller),
				//the dispatcher is a Singelton.
				dispatcher = Object.create(Dispatcher),
				toolModel  = Object.create(ToolModel),
				toolView   = Object.create(ToolView),
				//gsuitView  = Object.create(GsuiteView),
				
				parentFrame  = $('iframe'),
				toolsFrame = $('#galaxy_tools'),
				mainFrame  = $('#galaxy_main'),
				mainContent, mainDocument, toolState, currentMode;

				toolCTRL.init({model: toolModel});
				toolModel.initialize();
				toolView.init({
							model     : toolModel,
							tagName   : mainFrame

						});
				
				/*gsuitView.init({
							model     : toolModel,
							tagName   : mainFrame
						});*/
				
				toolsFrame.on('load', function() {
					console.log("ToolApp: toolsFrame on load");
					var toolsContent = $($('#galaxy_tools')[0]).contents(),
							toolsDocument = toolsContent.filter(function() {
		      			return this.nodeType === 9;
		    			});

					$('a.tool-link', toolsContent ).on('click', function(e) {
						console.log("ToolApp: toolsFrame on click");
						e.preventDefault();
						e.stopPropagation();
						//console.log(e);
						//console.log(e.currentTarget.pathname);
						//console.log(e.currentTarget.search);
						//console.log(e.currentTarget.name);
						
						toolState = {
							tool: e.currentTarget.text,
							toolState: {
								pathName  : e.currentTarget.pathname,
								toolSearch: e.currentTarget.search
							},
							triggerAjax  : false 

						};
						toolModel.setToolState(toolState);
					});
					mainFrame.on('load', function() {
							console.log("ToolApp: MainFrame on load");
							mainContent = $($('#galaxy_main')[0]).contents();
							mainDocument = mainContent.filter(function() {
		      			return this.nodeType === 9;
		    			});
		    			
		    			mainContent.find('form select').css('background-color', '#BADA55');
		    			mainDocument.ready(function() {
		    				console.log("ToolApp: MainFrame ready");
		    				var isBasic = mainDocument.find('#isBasic'), mode, anchorMap, tabValue,
    						analysisTab = mainDocument.find('.tabs .tab-links li:nth-child(2)');
    						if(analysisTab.length >= 1) {
									console.log("ToolApp: Tabs link DO exists");
									//console.log(hasTabs);
									//anchorMap = uriAnchor.makeAnchorMap();
									mode  		= modeModel.get('mode');//anchorMap.mode;
									(mode === 'basic'? tabValue = '#tab2': tabValue = '#tab3');
									console.log('mode');
									console.log(mode);
									analysisTab.find('a').attr('href', tabValue);
									if(analysisTab.attr('class') === 'active') {
										if(tabValue === '#tab2') {
											//ba.attr('value', '#tab3');
											tabValue = '#tab3';
											//ba.text('advanced');
										} else {
											//ba.attr('value', '#tab2');
											tabValue = '#tab2';
											//ba.text('basic');
										}
										var currentTab = mainDocument.find('.tabs ' + tabValue);
										console.log('currentTab');
										console.log(currentTab);
										currentTab.show().siblings().hide();
									} else {
										console.log("Cant find 'li:nth-child(2)");
										console.log(analysisTab.attr('class'));
									}
								} else {
									console.log("ToolApp: Not in tabs mode");
									//console.log(hasTabs);
								}
		    				
								if(isBasic.length >= 1) {
									//isBasic.onchange = null;
									//isBasic.off('change');
									isBasic.hide();
									//console.log('isBasic checked?: ' + isBasic.attr('checked'));
									//console.log(isBasic);
									(isBasic.attr('checked') === 'checked'? mode = 'basic': mode = 'advanced');
		    					if(toolModel.get('mode') === undefined) {
		    						toolModel.setToolState({
											mode: mode,	
											silence: true,
											triggerAjax: true
										});
										console.log("Setting toolModel mode: " + toolModel.get('mode'));
		    					} else {
										toolModel.deleteModel('mode');
										console.log("TOOLAPP: toolModel.get('mode')");
										console.log(toolModel.get('mode'));
									}
								} 
								
		    				/*currentMode = modeModel.get('mode');
		    				
		    				console.log(currentMode);
		    				var form =  mainContent.find('form'),
												serializedForm2 = form.serialize();
		    				console.log('serializedForm2');
		    				console.log(serializedForm2);
		    				var isBasic = mainDocument.find('#isBasic');

		    				//console.log(isBasic);
		    				isBasic.hide();
		    				if(currentMode === 'basic' && !isBasic.prop('checked')) {
		    					isBasic.prop('checked', 'checked');
		    					$(isBasic).trigger("change");
		    				} 
		    				if (currentMode === 'advanced' && isBasic.prop('checked') ) {
		    					isBasic.removeAttr('checked');
		    					$(isBasic).trigger("change");
		    				}*/
		   
		    				var formSelects = mainContent.find('form select');
								formSelects.onchange = null;

								formSelects.change( function(e) {
									console.log("ToolApp: MainFrame selects on change");
									e.preventDefault();
									e.stopPropagation();
									
									mainDocument.ready(function() {
										console.log('toolsApp ready after select change');
										var form =  mainContent.find('form'),
												serializedForm = form.serialize();
										console.log("E currentTarget.name");
										console.log(e.currentTarget.name);
										toolModel.setToolState({
											toolState: {
												serializedForm: serializedForm, 
												currentSelection: e.currentTarget.name
											},
											triggerAjax: true	
										});
		    					});
							});
		    			});
						});
				});	
			}
 		}
 		
	}());
 module.exports = toolApp;
}());

