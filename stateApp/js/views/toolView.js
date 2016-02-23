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
					this.mainDocument = this.el.contentWindow.document;
					var dataCorrected = this.setCorrectIframeUrl(event.data);
					var newDoc = this.mainDocument.open("text/html", "replace");
					newDoc.write(dataCorrected);
					newDoc.close();
					this.enablePage();
					
					return this;
				},
				update: function(event) {
					this.render(event);
				}
			}
		}())
	);

	module.exports = ToolView; 

}());