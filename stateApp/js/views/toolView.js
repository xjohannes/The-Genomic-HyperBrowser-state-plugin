(function(){
	'use strict';
	var BaseView = require('../prototypes/viewPrototype'),
			 _    	 = require('underscore'),
			 $    	 = require('jquery'),
			 Spinner = require('spin.js');

	var ToolView = Object.create(BaseView);

	_.extend(ToolView, (function() {
			// private variables
			var spinner, background;
			return {
				
				initialize: function(options) {
					this.listenTo('change:tool', this.update, this);
					this.listenTo('change:mode', this.updateMode, this);
					this.listenTo('change:history', this.updateMode, this);
					this.listenTo('ajaxCall', this.disablePage, this);

				},
				disablePage: function() {
					background = $('#background');
					background.css('z-index', 2);
					spinner = new Spinner({color:'#999', lines: 10, corners:0.9}).spin();
					background.append(spinner.el);
				},
				enablePage: function() {
					background.css('z-index', -1);
					background.remove();
				},
				setCorrectIframeUrl: function(data) {
					var tmp = data.split('?mako').join('hyper?mako');
					return tmp.split("form.action = '?'").join("form.action = 'hyper?'");
					 
				},
				render: function(event) {
					console.log("ToolView: render");
					this.mainWindow = this.el.contentWindow;
					this.mainDocument = this.el.contentWindow.document;
					var dataCorrected = this.setCorrectIframeUrl(event.data);
					//console.log(dataCorrected);
					var newDoc = this.mainDocument.open("text/html", "replace");
					newDoc.write(dataCorrected);
					newDoc.close();
					this.enablePage();
					
					return this;
				},
				update: function(event) {
					this.render(event);
				},
				/**
				* Method for managing the gsuite tabs in the mainDocument
				* on modeChange.
				*/
				updateMode: function(event) {
					if(event.model === this.model) {
						console.log("ToolView: updateMode: exit method. Cause same model");
						return;
					} else {
					
					var tabValue, currentMode, 
							isBasic, analysisTab, basicTab, advancedTab, mode;
						this.mainContents = this.$el.contents();
						this.mainDocument = this.mainContents.filter(function() {
								return this.nodeType === 9;
							});
						isBasic = this.mainDocument.find('#isBasic');

						// isBasic indicates a change triggered from the toolView (mainDocument/mainIFrame) 
						if(isBasic.length >= 1) {
							currentMode = event.model.get('mode');
							console.log("currentMode");
							console.log(currentMode);
							var tmpToolState = this.model.get('toolState'), 
									serializedForm, form;
							if(currentMode === 'basic' ) {
									console.log("ToolView: checking basic checkbox");
			    					isBasic.prop('checked', 'checked');
			    		} 
	    				if(currentMode === 'advanced' ) {
	    					console.log("ToolView: removing basic checkbox");
	    					isBasic.removeAttr('checked');
	    					//console.log(isBasic);
	    				}
							//if(tmpToolState.serializedForm === undefined) {
							$(isBasic).trigger("change");
							form = this.mainDocument.find('form');
							serializedForm = form.serialize();
							//console.log('ToolView: serializedForm');
							//console.log(serializedForm);
							this.model.setToolState({
								toolState: {
									serializedForm: serializedForm
								},
								silence: true
							});
						} else {
							//console.log("ToolView: mode is set from the guide view (mainDocument/mainIFrame)");
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
				}
			}
		}())
	);

	module.exports = ToolView; 

}());