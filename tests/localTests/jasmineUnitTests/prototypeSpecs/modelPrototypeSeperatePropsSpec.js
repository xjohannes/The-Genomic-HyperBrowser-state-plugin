/*var sModel = require('../../../../stateApp/js/prototypes/modelPrototypeSeperateProps.js');

describe("A sModel PROTOTYPE", function() {
    
    it("is defined", function() {
        expect(sModel).not.toBeUndefined();
    });

    it("provides the get and set methods", function() {
            var sBase = sModel;
            expect( _.isFunction(sBase.set) ).toBe(true);
            expect( _.isFunction(sBase.get) ).toBe(true);
            expect( _.isFunction(sBase.toJSON) ).toBe(true);
            // model is a
            expect( _.isFunction(sBase.listenTo) ).toBe(true);
            sBase = null;
    });
    it("is a dispatcher", function() {
            var sBase = sModel;
            expect( _.isFunction(sBase.listenTo) ).toBe(true);
            expect( _.isFunction(sBase.stopListening) ).toBe(true);
            expect( _.isFunction(sBase.triggerEvent) ).toBe(true);
            sBase = null;
    });
    
    it("initializes models with properties when creating an object", function() {
            sBase = Object.create(sModel);
            sBase.init({con:'construct text'});

            expect( sBase.get('con') ).toEqual('construct text');
        });
    describe("On a SUPER sModel instance one can", function() {
    
        ////////////// Initializing /////////////
        var sBase, spy, result;

        beforeEach(function() {
            sBase = Object.create(sModel);
            sBase.init();
        });
        afterEach(function() {
            sBase.eraseAllModels();
            sBase   = null;
            spy    = null;
            result = null;

        });
        ////////////// End initializing /////////////

        it("call the set method", function() {
            spyOn(sBase, 'set').and.callThrough();
            result = sBase.set({sBase:'advanced'});
            expect( sBase.set ).toHaveBeenCalled();
            expect( sBase.set ).toHaveBeenCalledWith({sBase:'advanced'});
        });
        it("call the get method", function() {
            spy = spyOn(sBase, 'get');
            sBase.get('sBase');

            expect( spy ).toHaveBeenCalled();
        });
        it("set several attributes", function() {
            sBase.set({
                a:'alf',
                b:'bear'
            });

            result = sBase.get('a');
            expect(result).toEqual('alf');
            result = sBase.get('b');
            expect(result).toEqual('bear');

        });
        it("trigger 'set' events on the model when setting a property", function() {
            spy    = spyOn(sBase, 'triggerEvent').and.callThrough();
            result = sBase.set({sBase:'advanced'});
            expect( spy ).toHaveBeenCalled();
            expect( spy ).toHaveBeenCalledWith('addEventType:set', {model:sBase});
        });
        it("trigger 'change' events on the model when setting a property that has already been set", function() {
            spy    = spyOn(sBase, 'triggerEvent');
            sBase.set({sBase:'basic'});
            expect( spy ).toHaveBeenCalledWith('addEventType:set', {model:sBase});
            sBase.set({sBase:'advanced'});
            expect( spy ).toHaveBeenCalledWith('addEventType:change', {model:sBase});
        });
        it("call the set method with no attribute and it will fail silently", function() {
            spyOn(sBase, 'set');
            sBase.set();

            expect( sBase.set ).toHaveBeenCalled();
        });
        it("get a named attribute", function() {
            spyOn(sBase, 'get').and.callThrough();
            
            sBase.set({sBase:'advanced'});
            result = sBase.get('sBase');
            
            expect(result).toEqual('advanced');
        });
        it("escape HTML characters", function() {
            sBase.set({escape : '<script>evil();&</script>'});
            result = sBase.get('escape');
            expect(result).toEqual('&lt;script&gt;evil();&amp;&lt;/script&gt;');
        });
        it("retrieve a models attributes in an object", function() {
            sBase.set({
                a:'alfa',
                b:'beta'
            });
            result = sBase.toJSON();
            expect(result).toEqual({
                a:'alfa',
                b:'beta'
            });
        });
    });
});

*/
