    var ModeCTRL  = require('../../../../stateApp/js/controllers/modeCTRL.js'),
    Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype.js');

    describe("A modeCTRL prototype object", function() {
    window.force_left_panel = function(mode) {};
    //window.top = {};
    //window.top.frames = {};
    //window.top.frames['galaxy_main'] = {};
    //window.top.frames['galaxy_main'].location = {};
    
    it("is defined", function() {
        expect(ModeCTRL).not.toBeUndefined();
    });

    it("provides the methods of the BASE prototype controller", function() {
        var modeCTRL = Object.create(ModeCTRL);
            expect( _.isFunction(modeCTRL.initialize) ).toBe(true);
            expect( _.isFunction(modeCTRL.toggleLeftPanel) ).toBe(true);
            expect( _.isFunction(modeCTRL.parseEvent) ).toBe(true);
            expect( _.isFunction(modeCTRL.updateMode) ).toBe(true);
            
            modeCTRL = null;
    });
     
    describe("On a modeCTRLl instance one can", function() {

        ////////////// Initializing /////////////
        var modeCTRL, dispatcher;

        beforeEach(function() {
            dispatcher = Object.create(Dispatcher);
            modeCTRL    = Object.create(ModeCTRL);
            modeCTRL.init({dispatcher: dispatcher});
        });
        afterEach(function() {
            modeCTRL = null;
        });
        ////////////// End initializing /////////////
        it("sets a dispatcher when creating an object", function() {
            expect( modeCTRL.listenTo).toBe(Dispatcher.listenTo);
        });
        
    });

    });


