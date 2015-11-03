var ModeModel = require('../../../../stateApp/js/models/modeModel.js');

describe("A modeModel class / constructor", function() {
    it("is defined", function() {
        expect(ModeModel).not.toBeUndefined();
    });
    it("provides the methods of the BASE prototype model", function() {
        var mode = Object.create(ModeModel);
            expect( _.isFunction(mode.set) ).toBe(true);
            expect( _.isFunction(mode.get) ).toBe(true);
            expect( _.isFunction(mode.toJSON) ).toBe(true);
            mode = null;
    });
     
    
    it("sets a named attribute when creating an object, tested with get()", function() {
            mode = Object.create(ModeModel);
            mode.init({construct:'construction text'});

            expect( mode.get('construct') ).toEqual('construction text');
        });
    describe("On a model instance one can", function() {
    
        ////////////// Initializing /////////////
        var mode;

        beforeEach(function() {
            window.force_left_panel = function(mode) {};
            mode = Object.create(ModeModel);
            mode.init()
        });
        afterEach(function() {
            mode = null;
        });
        ////////////// End initializing /////////////
        it("provides the methods of the ModeModel prototype object", function() {
            expect( _.isFunction(ModeModel.toggleMode) ).toBe(true);
            modeViewInst = null;
        });
        it("call the set method", function() {
            spyOn(mode, 'set').and.callThrough();
            var result = mode.set({mode:'advanced'});
            expect( mode.set ).toHaveBeenCalled();
            expect( mode.set ).toHaveBeenCalledWith({mode:'advanced'});
        });
        it("call the get method", function() {
            spyOn(mode, 'get');
            mode.get('mode');

            expect( mode.get ).toHaveBeenCalled();
        });
        it("set several attributes", function() {
            
            mode.set({
                a:'alf',
                b:'bear'
            });

            var result = mode.get('a');
            expect(result).toEqual('alf');
            result = mode.get('b');
            expect(result).toEqual('bear');

        });
        it("call the set method with no attribute and it will fail silently", function() {
            spyOn(mode, 'set');
            mode.set();

            expect( mode.set ).toHaveBeenCalled();
        });
        it("get a named attribute", function() {
            spyOn(mode, 'get').and.callThrough();
            
            mode.set({mode:'advanced'});
            var result = mode.get('mode');
            
            expect(result).toEqual('advanced');
        });
        it("escape HTML characters", function() {
            mode.set({escape : '<script>evil();&</script>'});
            var result = mode.get('escape');
            expect(result).toEqual('&lt;script&gt;evil();&amp;&lt;/script&gt;');
        });
    });

});


