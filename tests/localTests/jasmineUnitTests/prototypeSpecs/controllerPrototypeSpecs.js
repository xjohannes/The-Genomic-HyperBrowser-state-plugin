var Controller = require('../../../../stateApp/js/prototypes/controllerPrototype.js');

describe("A Controller PROTOTYPE", function() {
    
    it("is defined", function() {
        expect(Controller).not.toBeUndefined();
    });

    it("provides the init and modeCTRL methods", function() {
            var baseCTRL = Controller;
            expect( _.isFunction(baseCTRL.init) ).toBe(true);
            //expect( _.isFunction(baseCTRL.modeCTRL) ).toBe(true);
            //expect( _.isFunction(baseCTRL.toJSON) ).toBe(true);
            baseCTRL = null;
    });
    /*
    describe("On a controller PROTOTYPE instance one can", function() {
    
        ////////////// Initializing /////////////
        var baseCTRL, spy, result;

        beforeEach(function() {
            baseCTRL = Object.create(Controller);
            baseCTRL.init();
        });
        afterEach(function() {
            baseCTRL   = null;
            spy    = null;
            result = null;
        });
        ////////////// End initializing ///////////// 
    });
*/
});


