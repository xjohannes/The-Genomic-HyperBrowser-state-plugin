(function(){
	'use strict';
	var BaseView = require('../prototypes/viewPrototype'),
	_    = require('underscore'),
	$    = require('jquery');

	var ToolView = Object.create(BaseView);

	_.extend(ToolView, (function() {
			// private variables

			return {
				
				initialize: function(options) {
					this.listenTo('change:tool', this.update, this);
					this.listenTo('change:mode', this.updateMode, this);
					
				},
				render: function(event) {
					console.log("toolView render");
					//this.$el.attr('src', 'hyper?');
					 
					this.mainContents = this.$el.contents();
					this.mainDocument = this.mainContents.filter(function() {
								return this.nodeType === 9;
							});
					var newDoc = mainDocument[0].open("text/html", "replace");
					newDoc.write(event.data);
					newDoc.close();
				
					return this;
				},
				update: function(event) {
					this.render(event);
				},
				updateMode: function(event) {
					console.log('ToolView: updateMode');
					//console.log(event);
					
					var tabValue, currentMode = this.model.get('mode'), 
							isBasic, analysisTab, mode;
					this.mainContents = this.$el.contents();
						this.mainDocument = this.mainContents.filter(function() {
								return this.nodeType === 9;
							});
					
					
						/*this.mainContents = this.$el.contents();
						this.mainDocument = this.mainContents.filter(function() {
								return this.nodeType === 9;
							});*/
						isBasic = this.mainDocument.find('#isBasic');
						console.log("ToolView: updateMode: #isBasic:");
						console.log(isBasic);
						if(isBasic.length >= 1) {
							//isBasic.onchange = null;
							//isBasic.off('change');
							console.log("updateMode: modeModel mode: " + event.model.get('mode'));
							currentMode = event.model.get('mode');
							/*this.model.setToolState({
												mode: currentMode,	
												silence: true,
												triggerAjax: true
											});*/
						console.log("updateMode: toolModel mode: " + this.model.get('mode'));

							var tmpToolState = this.model.get('toolState'), 
									serializedForm, form;
							if(currentMode === 'basic' ) {
									console.log("checking basic checkbox");
			    					isBasic.prop('checked', 'checked');
			    					console.log(isBasic);
			    					//$(isBasic).trigger("change");
			    				} 
	    				if (currentMode === 'advanced' ) {
	    					console.log("removing basic checkbox");
	    					isBasic.removeAttr('checked');
	    					console.log(isBasic);
	    					
	    				}
							//if(tmpToolState.serializedForm === undefined) {
								$(isBasic).trigger("change");
								form = this.mainDocument.find('form');
								serializedForm = form.serialize();
								console.log('serializedForm');
								console.log(serializedForm);
								this.model.setToolState({
									toolState: {
										serializedForm: serializedForm,
										silence: true
									}
								});
								//this.model.triggerModeChange();
							/*} else {
								console.log("toolView serialized form: ");
								console.log(tmpToolState.serializedForm);
						}*/
					} else {
						console.log("toolView: mode is not set in toolModel");
						//console.log(this.mainDocument)
						analysisTab = this.mainDocument.find('.tabs .tab-links li:nth-child(2)');
						if(analysisTab.length >= 1) {

						console.log("Tabs link DO exists");
						//console.log(hasTabs);
						//anchorMap = uriAnchor.makeAnchorMap();
						currentMode  		= event.model.get('mode');//anchorMap.mode;
						(currentMode === 'basic'? tabValue = '#tab2': tabValue = '#tab3');
						console.log('mode');
						console.log(currentMode/**/);
						analysisTab.find('a').attr('href', tabValue);
						if(analysisTab.attr('class') === 'active') {
							/*if(tabValue === '#tab2') {
								//ba.attr('value', '#tab3');
								tabValue = '#tab3';
								//ba.text('advanced');
							} else {
								//ba.attr('value', '#tab2');
								tabValue = '#tab2';
								//ba.text('basic');
							}*/
							var currentTab = this.mainDocument.find('.tabs ' + tabValue);
							console.log('currentTab');
							console.log(currentTab);
							currentTab.show().siblings().hide();
						} else {
							console.log("Cant find 'li:nth-child(2)");
							console.log(analysisTab.attr('class'));
						}
					} else {
						console.log("Tabs link DO NOT exists");
						//console.log(hasTabs);
					}
					}
				}
			}
		}())
	);

	module.exports = ToolView; 

}());