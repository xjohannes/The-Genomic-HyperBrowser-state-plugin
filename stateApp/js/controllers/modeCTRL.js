(function(){
	'use strict';
	var BaseController = require('../prototypes/controllerPrototype'),
			_    = require('underscore');

	var ModeController = Object.create(BaseController);

	_.extend(ModeController, {
		initialize: function() {
			this.listenTo('change:mode', this.toggleMode, this); 
		},
		toggleMode: function(attrs) {
			if(this.model === null && attrs === undefined) {
				return;
			}
			if(this.model === null && attrs) {
				this.model = attrs.model;			
			} 
			(this.model.get('mode') === "basic" ? window.force_left_panel('hide') : window.force_left_panel('show'));
		},
		test:function(attrs) {
			console.log('CTRLmode test : ');
			console.log(attrs);
		}
	});

	module.exports = ModeController;
}());
