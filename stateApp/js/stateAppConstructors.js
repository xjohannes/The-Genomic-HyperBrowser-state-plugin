(function() {
'use strict';
	var _ = require('underscore');
	module.exports = Model = function(attributes) {
		this.modelProperties = attributes || {};

		this.set(this.modelProperties);
	};
	

	_.extend(Model.prototype, {
		set: function(newAttributes) {
			if(newAttributes == null) { return; }
			
			for(var i in newAttributes) {
				this.modelProperties[i] = newAttributes[i]; 
			}
			return this;
		},
		get: function(key) {
			return this.modelProperties[key];
		},
		escape : function(key) {
			return _.escape(this.get(key));
		}
	});

	module.exports = View = function(options) {
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

}());