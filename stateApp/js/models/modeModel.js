(function(){
	'use strict';
	var BaseModel = require('../prototypes/modelPrototype'),
			_    = require('underscore');

	var ModeModel = Object.create(BaseModel);

	_.extend(ModeModel, {
		toggleMode: function() {
			var tmpMode = (this.get('mode') === "basic" ? "advanced" : "basic");
			this.set({mode: tmpMode});
			this.triggerEvent('change', {model: this});
		}
	});

	module.exports = ModeModel;
}());
