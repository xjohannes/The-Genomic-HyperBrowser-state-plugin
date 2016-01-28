(function(){
	'use strict';
	var BaseView = require('../prototypes/viewPrototype'),
	_    = require('underscore'),
	storage    = require('simplestorage.js');

	var ModeView = Object.create(BaseView);

	_.extend(ModeView, (function() {
			// private variables
			var basicButton, advancedButton, modeButton, self;
			return {
				template: _.template(
					'<a target="_self" id="mode" class="noLink"href="" ><%= this.toggleViewText(mode)%></a>' 
					 + '<div class="submenu">'
           	 + '<ul>'
               + '<li class="<%= (mode === "basic"? "disabledMode": "") %>"><a href="" id="basic">Basic mode</a></li>'
               + '<li class="<%= (mode === "advanced"? "disabledMode": "") %>"><a href="" id="advanced">Advanced mode</a></li>'
             + '</ul>'
           + '</div>'
					),
				initialize: function(options) {
					this.eventSetup();
					self = this;
				},

				eventSetup: function() {
					this.$el.click(this.parseEvent);
					this.listenTo('change:mode', this.update, this);
					this.listenTo('change:history', this.update, this);
				},
				parseEvent: function(event) {
					event.preventDefault();
					var attr = event.target.id;
					if(attr === 'mode') {
						if(storage.index().length > 0) {
							self.triggerEvent('history:change', self.getStoredStateObject() );
						}
					} else {
						
						self.model.toggleMode({mode: attr, triggerState: 'history'});
					} 
				},
				render: function(props) {
					var attributes = this.model.toJSON();
					this.$el.html(this.template(attributes));
					return this;
				},
				toggleViewText: function(text) {
					return (text === "basic" ? "Mode: Basic" : "Mode: Advanced");
					//return (text === "basic" ? "Advanced mode" : "Basic mode");
				},
				toggleMode: function(event) {
					event.preventDefault();

					
					//Is it better to trigger an event here. 
					//I haven't done that because the view is instantiated with a model like backbone.
					//event.data.model.get('mode')
					// Should also mention why I have to pass the this keyword with the method.

					event.data.model.toggleMode();
				},
				update: function() {
					this.render();
				},
				getStoredStateObject: function() {
				var i, j, store = storage.index(), tmpStorageObj = {};
				for(i = 0; i < (j = store.length); i +=1 ) {
					tmpStorageObj[store[i]] = storage.get(store[i]);
				}
				console.log("ModeView: getStoredStateObject");
				return tmpStorageObj;
			}
			}
		}())
	);

	module.exports = ModeView; 

}());