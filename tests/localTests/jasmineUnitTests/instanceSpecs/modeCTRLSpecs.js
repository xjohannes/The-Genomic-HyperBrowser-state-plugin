var ModeCTRL  = require('../../../../stateApp/js/controllers/modeCTRL.js'),
    Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype.js');

describe("A modeCTRL prototype object", function() {
    it("is defined", function() {
        expect(ModeCTRL).not.toBeUndefined();
    });
    
    it("provides the methods of the BASE prototype controller", function() {
        var modeCTRL = Object.create(ModeCTRL);
            expect( _.isFunction(modeCTRL.initialize) ).toBe(true);
            expect( _.isFunction(modeCTRL.toggleMode) ).toBe(true);
            //expect( _.isFunction(modeCTRL.toJSON) ).toBe(true);
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
            expect( modeCTRL.dispatcher.listenTo).toBe(Dispatcher.listenTo);
        });
        /*
        it("provides the methods of the ModeCTRL prototype object", function() {
            expect( _.isFunction(ModeCTRL.toggleMode) ).toBe(true);
            modeCTRLViewInst = null;
        });
        it("call the set method", function() {
            spyOn(modeCTRL, 'set').and.callThrough();
            var result = modeCTRL.set({modeCTRL:'advanced'});
            expect( modeCTRL.set ).toHaveBeenCalled();
            expect( modeCTRL.set ).toHaveBeenCalledWith({modeCTRL:'advanced'});
        });
        it("call the get method", function() {
            spyOn(modeCTRL, 'get');
            modeCTRL.get('modeCTRL');

            expect( modeCTRL.get ).toHaveBeenCalled();
        });
        it("set several attributes", function() {
            
            modeCTRL.set({
                a:'alf',
                b:'bear'
            });

            var result = modeCTRL.get('a');
            expect(result).toEqual('alf');
            result = modeCTRL.get('b');
            expect(result).toEqual('bear');

        });
        it("call the set method with no attribute and it will fail silently", function() {
            spyOn(modeCTRL, 'set');
            modeCTRL.set();

            expect( modeCTRL.set ).toHaveBeenCalled();
        });
        it("get a named attribute", function() {
            spyOn(modeCTRL, 'get').and.callThrough();
            
            modeCTRL.set({modeCTRL:'advanced'});
            var result = modeCTRL.get('modeCTRL');
            
            expect(result).toEqual('advanced');
        });
        it("escape HTML characters", function() {
            modeCTRL.set({escape : '<script>evil();&</script>'});
            var result = modeCTRL.get('escape');
            expect(result).toEqual('&lt;script&gt;evil();&amp;&lt;/script&gt;');
        });
        it("acts as an observer with an update method", function() {

        });
*/
    });

});


