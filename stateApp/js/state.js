 (function() {
	'use strict';
	var Dispatcher = require('./prototypes/dispatcherPrototype'),
			Controller = require('./controllers/modeCTRL'),
			ModeModel  = require('./models/modeModel'),
			ModeView   = require('./views/modeView');
	//alert("hei");
	$(document).ready(function() {
		//alert("hei 2");
		var modeCTRL = Object.create(Controller),
				dispatcher = Object.create(Dispatcher),
				masthead   = $('#masthead tbody tr').first(),
				basicAdvancedModel = Object.create(ModeModel),
				basicAdvancedView  = Object.create(ModeView);

		
		basicAdvancedModel.init({mode: 'basic'});
		basicAdvancedView.init({model: basicAdvancedModel, tagName: 'td', classNames: 'tab', dispatcher: dispatcher});
		basicAdvancedView.render();
		masthead.prepend(basicAdvancedView.el);
		modeCTRL.init({dispatcher:dispatcher, model: basicAdvancedModel});

		basicAdvancedModel.triggerEvent('change', {model: basicAdvancedModel})
		//modeCTRL.toggleMode();

		/*//
		masthead.prepend('<td class="tab" style="">'
                + '<a target="_self" href="/wizard/root">Advanced</a>'
                + '</td>');
	*/
	});

}());

