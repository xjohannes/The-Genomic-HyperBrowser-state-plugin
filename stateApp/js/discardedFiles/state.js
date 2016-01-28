 (function() {
	'use strict';
	var Dispatcher = require('./prototypes/dispatcherPrototype'),
			Controller = require('./controllers/modeCTRL'),
			ModeModel  = require('./models/modeModel'),
			ModeView   = require('./views/modeView'),
			History    = require('./prototypes/historyPrototype'),
			Router     = require('./prototypes/routerPrototype'),
			storage    = require('simplestorage.js');
	//alert("hei");
	$(document).ready(function() {
		//alert("hei 2");
		var modeCTRL = Object.create(Controller),
				//the dispatcher is a Singelton.
				dispatcher = Object.create(Dispatcher),
				masthead   = $('#masthead tbody tr').first(),
				basicAdvancedModel = Object.create(ModeModel),
				basicAdvancedView  = Object.create(ModeView),
				history 					 = Object.create(History),
				router  					 = Object.create(Router)
				;

		//storage.set('mode', 'basic');
		router.init({dispatcher:dispatcher});
		//basicAdvancedModel.init({mode: 'basic'});
		basicAdvancedModel.initialize({mode: 'basic'});
		//basicAdvancedModel.initialize();
		basicAdvancedView.init({model: basicAdvancedModel, tagName: 'td', classNames: 'tab', dispatcher: dispatcher});
		basicAdvancedView.render();
		masthead.prepend(basicAdvancedView.el);
		modeCTRL.init({dispatcher:dispatcher, model: basicAdvancedModel});

		//basicAdvancedModel.triggerEvent('change:mode', {model: basicAdvancedModel, modelPartName: 'mode'});

		history.start({dispatcher: dispatcher, model: basicAdvancedModel});
	});

}());

