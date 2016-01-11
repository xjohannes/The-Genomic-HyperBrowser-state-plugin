(function(){
	'use strict';
	var BaseView = require('../prototypes/viewPrototype'),
	_    = require('underscore');

	var ModeView = Object.create(BaseView);

	_.extend(ModeView, (function() {
			// private variables

			return {
				template: _.template('<a target="_self" href=""><%= this.toggleViewText(mode)%></a>'),
				initialize: function(options) {
					this.$el.on('click', this, this.toggleMode);
					this.listenTo('change:mode', this.update, this);
				},
				render: function(props) {
					var attributes = this.model.toJSON();
					this.$el.html(this.template(attributes));
					return this;
				},
				toggleViewText: function(text) {
					return (text === "basic" ? "Advanced" : "Basic");
				},
				toggleMode: function(event) {
					event.preventDefault();

					//location.hash = (event.data.model.get('mode'));
					//Is it better to trigger an event here. 
					//I haven't done that because the view is instantiated with a model like backbone.
					//event.data.model.get('mode')
					// Should also mention why I have to pass the this keyword with the method.

					event.data.model.toggleMode();
				},
				update: function() {
					this.render();
				}
			}
		}())
	);

	module.exports = ModeView; 

}());