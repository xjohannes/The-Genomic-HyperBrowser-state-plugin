(function() {
'use strict';
	var _ = require('underscore');

	var View = function(options) {
		var viewOptionsWhiteList = ['model'];
			_.extend(this, _.pick(options, viewOptionsWhiteList));
		};

	_.extend(View.prototype, {
		
		template: null,
		tagName : 'div',

		$: function(selector) {
			return this.$el.find(selector);
		},

		initialize: function() {
			return this;
		},
		render: function() {
			return this;
		},
		setElement : function(element) {
			this._setElement(document.createElement(element));
			return this;
		}, 
		// private methods:
		_setElement: function(el) {
			this.$el = (el instanceof $) ? el : $(el);
			this.el = this.$el[0];
		}
	});

	module.exports = View;

}());