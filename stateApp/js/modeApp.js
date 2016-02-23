(function() {
	'use strict';
	var Controller = require('./controllers/modeCTRL'),
			ModeModel  = require('./models/modeModel'),
			ModeView   = require('./views/modeView'),
			storage    = require('simplestorage.js');

	var modeApp = (function() {
		return {
			attachModeListeners: function(modeModel) {
				var mainFrame = $('#galaxy_main'), mainContent, mainDocument;
				// Attach basic/advanced button on main navigation
				$('#masthead .title').on('click', function(event) {
					var tmpMode = storage.get('mode');
					storage.flush();
					storage.set('mode', tmpMode);
				});
				// Attach toggle mode functionality on frame border arrow
				$('#left-border-inner').on('click', function(event) {
					modeModel.toggleMode();
				}); 
				// Attach mode functionality to basic and advanced sections on gsuite main welcome page
				mainFrame.on('load', function(e) {
					mainContent  = $($('#galaxy_main')[0]).contents();
					mainDocument = mainContent.filter(function() {
								return this.nodeType === 9;
							});
					var tab1 = mainContent.find('#tab1');
						if(tab1.length > 0) {
							tab1.find('#basic').on('click', function() {
								modeModel.toggleMode({'mode': 'basic', 'triggerState': 'history'});
							});
							tab1.find('#advanced').on('click', function() {
								modeModel.toggleMode({'mode': 'advanced', 'triggerState': 'history'});
							});
						}
				});  
			},
			start: function() {
				var modeCTRL = Object.create(Controller),
				masthead   = $('#masthead tbody tr').first(),
				modeModel  = Object.create(ModeModel),
				modeView   = Object.create(ModeView);

				this.attachModeListeners(modeModel);
			
				// hide Analyse data tab
				masthead.find('td').first().hide();
				modeModel.initialize({mode: 'basic'});
				modeView.init({model: modeModel, tagName: 'td', classNames: 'tab'});
				modeView.render();
				masthead.prepend(modeView.el);
				masthead.find('td').first().addClass('active');
				modeCTRL.init({model: modeModel});
				
				return modeModel;
			}
		}
	}());
module.exports = modeApp;
}());

