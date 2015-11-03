var Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype.js'),
    Model      = require('../../../../stateApp/js/models/modeModel.js'),
    View       = require('../../../../stateApp/js/views/modeView.js');

describe("A dispatcher PROTOTYPE", function() {
    it("is defined", function() {
        expect(Dispatcher).not.toBeUndefined();
    });
    it("provides the listenTo, stopListening and dispatch methods", function() {
        var dispatcherBase = Dispatcher;
            expect( _.isFunction(dispatcherBase.listenTo) ).toBe(true);
            expect( _.isFunction(dispatcherBase.stopListening) ).toBe(true);
            expect( _.isFunction(dispatcherBase.triggerEvent) ).toBe(true);
            expect( _.isFunction(dispatcherBase.getSubscribers) ).toBe(true);
            dispatcherBase = null;
    });
    describe("On a Dispatcher instance one can", function() {
        ////////////// Initializing /////////////
        var modeModel, modeView, dispatcher, subs, i, l, callbacks, result;

        beforeEach(function() {
            dispatcher = Object.create(Dispatcher);
            modeModel  = Object.create(Model);
            modeModel.init();
            modeView   = Object.create(View);
            modeView.init({model:modeModel, dispatcher: dispatcher});
            modeView.testMethod = function(attr) {
                if(attr['el']) {
                    this.setElement(attr['el']);
                }
                return true;
            };
        });
        afterEach(function() {
            delete modeView.testMethod;
            modeModel, modeView, dispatcher, subs, callbacks,
            result, i, l = null;
        });
        ////////////// End initializing /////////////
        it("register listeners", function() {
            subs = dispatcher.getSubscribers();
            dispatcher.listenTo('charge', modeView.testMethod, modeView);
            callbacks = subs['charge'];
            
            for ( i = 0; i < (l=callbacks.length); i += 1 ) {
               if(callbacks[i][0] === modeView.testMethod ) {
                    result = callbacks[i][0];
                }
            }
            expect(result).toBe(modeView.testMethod);
            expect(subs['charge'] instanceof Array).toBe(true);
        });
        it("set a specified context (this) when registering listening callbacks", function() {
            dispatcher.listenTo('delete', modeView.testMethod, modeView);
        });
        it("triggerEvent events", function() {
            
            spyOn(modeView, 'testMethod').and.callThrough();

            dispatcher.listenTo('submit', modeView.testMethod, modeView);
            dispatcher.triggerEvent('submit', {'someProp':'someArg'});
            
            expect(modeView.testMethod).toHaveBeenCalledWith({'someProp':'someArg'});
        });
        it("call listeners when events is triggerEvented", function() {
            dispatcher.listenTo('charge', modeView.testMethod, modeView);
            dispatcher.triggerEvent('charge', {'el':'section'});
            expect(modeView.el.nodeName).toEqual('SECTION');
        });
        it("stopListening (unregister) to specified events", function(){

            var modeViewTestMethod = modeView.testMethod;
            dispatcher.listenTo('cancel ', modeViewTestMethod, modeView );
            var subs = dispatcher.getSubscribers(), i, l, callbacks, 
               result;
            callbacks = subs['cancel '];
            
            dispatcher.stopListening('cancel ', modeViewTestMethod);

            for(i = 0; i < (l = callbacks.length); i+=1) {
                if(callbacks[i][0] === modeViewTestMethod) {
                    result = callbacks[i];
                }
            }
            expect(result).toBeUndefined();
        });
        it("fails silently if an event is triggered that no one listens to", function() {
            dispatcher.triggerEvent('noEvent', {'someProp':'someArg'});
        });
        it("listen to all events", function() {

            dispatcher.listenTo('change', modeView.testMethod, modeView);
            dispatcher.triggerEvent('change', {'someProp':'someArg'});
            //expect(modeView.el.nodeName).toEqual('SECTION');
/*
            expect(modeView.testMethod).toHaveBeenCalledWith({'someProp':'someArg'});
            expect(modeView.testMethod).toHaveBeenCalledWith({'someProp':'someArg'});
            expect(modeView.testMethod).not.toHaveBeenCalledWith({'someProp':'someArg'});
        */
        });
    }); 
});


