var ToolStateModel = require('../../../../stateApp/js/models/toolModel.js'),
    ToolApp        = require('../../../../stateApp/js/toolsApp.js'),
    ModeModel      = require('../../../../stateApp/js/models/modeModel.js'),
    ToolStateView  = require('../../../../stateApp/js/views/toolView.js'),
    storage        = require('simplestorage.js'),
    History        = require('../../../../stateApp/js/prototypes/historyPrototype.js'),
    uriAnchor      = require('../../../../stateApp/js/polyfills/uriAnchor_mod'),
    _              = require('underscore');

describe("A ToolApp class ", function() {
    ////////////// Initializing /////////////
    var toolApp, toolStateModel, form, toolStateView, spy, result, subs, history, modeModel;

        beforeEach(function() {
            
            storage.flush();
            location.hash = '';
            
            //storage.set('mode', 'basic');
            modeModel = Object.create(ModeModel);
            modeModel.initialize({mode: 'basic'});
            toolApp = Object.create(ToolApp); 
            toolApp.start();
            history = Object.create(History);
            toolStateModel = Object.create(ToolStateModel);
            toolStateView  = Object.create(ToolStateView);
        
            toolStateModel.initialize();
            toolStateView.init({model:toolStateModel});

            setFixtures(toolStateView.el);
            
        });
        afterEach(function() {
            toolStateModel.stopListening();
            toolStateModel.eraseAllModels();
            history.stop();
            toolStateModel = null;

        });
        ////////////// End initializing /////////////
    it("is defined", function() {
        expect(ToolApp).not.toBeUndefined();
    });
    it("provides the methods of the BASE prototype model", function() {
            expect( _.isFunction(toolApp.start) ).toBe(true);    
    });
    it("calling private method from within public method", function() {
           
           //expect( result ).toEqual('test2');
        });
});


