/*(function(){
	'use strict';
	var BaseView = require('../prototypes/viewPrototype'),
	_    = require('underscore'),
	$    = require('jquery');

	var GsuitView = Object.create(BaseView);

	_.extend(GsuitView, (function() {
			// private variables

			return {
				initialize: function(options) {
			
				},
				render: function(data) {
					console.log("gsuite render");
					var mainContents = this.$el.contents(),
							mainDocument = mainContents.filter(function() {
								return this.nodeType === 9;
							});
				
					return this;
				},
				update: function(data) {
					var isBasic = this.$el.find('#isBasic');
					
					if(isBasic[0]) {
						this.render(data);
					}
				}
			}
		}())
	);

	module.exports = GsuitView; 

}());*/