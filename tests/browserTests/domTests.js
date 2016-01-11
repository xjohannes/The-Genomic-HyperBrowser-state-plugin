var Dispatcher = require('../../stateApp/js/prototypes/dispatcherPrototype.js'),
    ModeModel      = require('../../stateApp/js/models/modeModel.js'),
    ModeView       = require('../../stateApp/js/views/modeView.js');

xdescribe("DOM testing", function(){
	it("is defined", function() {
        expect(ModeModel).not.toBeUndefined();
    });
});