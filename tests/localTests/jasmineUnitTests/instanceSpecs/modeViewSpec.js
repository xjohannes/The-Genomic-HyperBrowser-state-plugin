var ModeModel  = require('../../../../stateApp/js/models/modeModel'),
    ModeView   = require('../../../../stateApp/js/views/modeView'),
    Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype');

describe("A modeView Prototype ", function() {
    it("is defined", function() {
        expect(ModeView).not.toBeUndefined();
    });
    
    it("provides the methods of the BASE VIEW prototype object", function() {
        expect( _.isFunction(ModeView.initialize) ).toBe(true);
        expect( _.isFunction(ModeView.render) ).toBe(true);
        expect( _.isFunction(ModeView.setElement) ).toBe(true);
        modeViewInst = null;
    });
    it("provides the methods of the ModeView prototype object", function() {
        expect( _.isFunction(ModeView.toggleMode) ).toBe(true);
        modeViewInst = null;
    });
    
    
    describe("On a mode view instance on can", function() {
        ////////////// Initializing /////////////
    var modeViewInst, result, dispatcher,
        modeModel, spy, eventSpy;

    beforeEach(function() {
        dispatcher   = Object.create(Dispatcher);
        modeModel    = Object.create(ModeModel);
        modeViewInst = Object.create(ModeView);
        modeModel.init({mode:'basic'});
        modeViewInst.init({model:modeModel, classNames: "clickTest", dispatcher: dispatcher});  
    });
    afterEach(function() {
        modeViewInst = null;
        modeModel    = null;
        dispatcher   = null;
    });
    ////////////// End initializing /////////////
        it("set the root tagName when created", function() {
            modeViewInst = null;
            modeViewInst = Object.create(ModeView);
            modeViewInst.init({model:modeModel, tagName: 'aside', dispatcher: dispatcher});

            modeViewInst.render();
            expect(modeViewInst.tagName).toEqual('aside');
        });
        it("set classes on the DOM element when initialized/created", function() {
            modeViewInst = null;
            modeViewInst = Object.create(ModeView);
            modeViewInst.init({model: modeModel, classNames: 'hidden toggle', dispatcher: dispatcher})
            modeViewInst.render();
            result = modeViewInst.el;
            expect(result.outerHTML).toEqual('<div class="hidden toggle">'
                + '<a target="_self" href="">Advanced</a>'
                + '</div>');
        });
        it("rewrite the render function", function() {
            spy = spyOn(modeViewInst, 'render');

            result = modeViewInst.render("new render property");
            expect( spy ).toHaveBeenCalledWith("new render property"); 
        });
        it("set the top element", function() {
            result = modeViewInst.setElement('p');
            expect(modeViewInst.el.nodeName.toLowerCase()).toEqual('p');
        });

        it("the top element is wrapped in a jQuery element", function() {
            result = modeViewInst.setElement('p');
            expect(modeViewInst.$el instanceof $).toBe(true);
        });

        it("initialize methods with proper attributes when the init method is called", function() {
            spyOn(ModeView, 'initialize');
            modeViewInst = Object.create(ModeView);
            modeViewInst.init( {model:modeModel, dispatcher: dispatcher},  {initialize: 'some initialize options'});
            expect(modeViewInst.initialize).toHaveBeenCalledWith( {initialize: 'some initialize options'});
        });
        it("render a template ready for attachment to the DOM", function() {
            modeViewInst.render();
            result = modeViewInst.el;
            expect(result.outerHTML).toEqual('<div class="clickTest">'
                + '<a target="_self" href="">Advanced</a>'
                + '</div>');
        });
        it("get initialized with a dispatcher", function() {
            expect(modeViewInst.dispatcher).toBe(dispatcher);
        });
        describe("DOM testing: " , function() {
            beforeEach(function() {
                //mock a window method
                window.force_left_panel = function(mode) {};
                setFixtures(modeViewInst.el);
            });
            it("the jasmine-jquery helper can trigger DOM events", function() {
                eventSpy = spyOnEvent('.clickTest', 'click');
                $('.clickTest').trigger( "click" );
                
                //expect('click').toHaveBeenTriggeredOn('.clickTest');
                expect(eventSpy).toHaveBeenTriggered();
            });
            it("listens to the events specified in the initialize method of the view", function() { 
                spy = spyOn(modeViewInst.model, 'toggleMode');
                $('.clickTest').trigger( "click" );
                
                expect(spy).toHaveBeenCalled();
            });
            it("can listen to events on its model", function() {
                modeViewInst.dispatcher.listenTo('change', modeViewInst.update , modeViewInst);
                spy = spyOn(modeViewInst.model, 'toggleMode').and.callThrough();
                $('.clickTest').trigger( "click" );

                expect(spy).toHaveBeenCalled();
                expect(modeModel.get('mode')).toEqual('advanced');
                
                expect(modeViewInst.el.outerHTML).toEqual('<div class="clickTest">'
                    + '<a target="_self" href="">Basic</a>'
                    + '</div>');
            });

        });
        

        
        
        
        
    });

});


