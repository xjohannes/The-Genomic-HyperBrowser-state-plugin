var Model = require('../../../../stateApp/js/prototypes/modelPrototype.js');

describe("A Model PROTOTYPE", function() {
    
    it("is defined", function() {
        expect(Model).not.toBeUndefined();
    });

    it("provides the get and set methods", function() {
            var base = Model;
            expect( _.isFunction(base.set) ).toBe(true);
            expect( _.isFunction(base.get) ).toBe(true);
            expect( _.isFunction(base.toJSON) ).toBe(true);
            base = null;
    });
    
    it("initializes models with properties when creating an object", function() {
            base = Object.create(Model);
            base.init({con:'construct text'});

            expect( base.get('con') ).toEqual('construct text');
        });
    describe("On a SUPER model instance one can", function() {
    
        ////////////// Initializing /////////////
        var base, spy, result;

        beforeEach(function() {
            base = Object.create(Model);
            base.init();
        });
        afterEach(function() {
            base   = null;
            spy    = null;
            result = null;
        });
        ////////////// End initializing /////////////

        it("call the set method", function() {
            spyOn(base, 'set').and.callThrough();
            result = base.set({base:'advanced'});
            expect( base.set ).toHaveBeenCalled();
            expect( base.set ).toHaveBeenCalledWith({base:'advanced'});
        });
        it("call the get method", function() {
            spyOn(base, 'get');
            base.get('base');

            expect( base.get ).toHaveBeenCalled();
        });
        it("set several attributes", function() {
            base.set({
                a:'alf',
                b:'bear'
            });

            result = base.get('a');
            expect(result).toEqual('alf');
            result = base.get('b');
            expect(result).toEqual('bear');

        });
        it("trigger 'set' events on the model when setting a property", function() {
            spy    = spyOn(base, 'triggerEvent').and.callThrough();
            result = base.set({base:'advanced'});
            expect( spy ).toHaveBeenCalled();
            expect( spy ).toHaveBeenCalledWith('set', {model:base});
        });
        it("trigger 'change' events on the model when setting a property that has already been set", function() {
            spy    = spyOn(base, 'triggerEvent');
            base.set({base:'basic'});
            expect( spy ).toHaveBeenCalledWith('set', {model:base});
            base.set({base:'advanced'});
            expect( spy ).toHaveBeenCalledWith('change', {model:base});
        });
        it("call the set method with no attribute and it will fail silently", function() {
            spyOn(base, 'set');
            base.set();

            expect( base.set ).toHaveBeenCalled();
        });
        it("get a named attribute", function() {
            spyOn(base, 'get').and.callThrough();
            
            base.set({base:'advanced'});
            result = base.get('base');
            
            expect(result).toEqual('advanced');
        });
        it("escape HTML characters", function() {
            base.set({escape : '<script>evil();&</script>'});
            result = base.get('escape');
            expect(result).toEqual('&lt;script&gt;evil();&amp;&lt;/script&gt;');
        });
        it("retrieve a models attributes in an object", function() {
            base.set({
                a:'alfa',
                b:'beta'
            });
            result = base.toJSON();
            expect(result).toEqual({
                a:'alfa',
                b:'beta'
            });
        });
    });
});


