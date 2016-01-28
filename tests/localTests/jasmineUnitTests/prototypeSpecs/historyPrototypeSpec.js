var History    = require('../../../../stateApp/js/prototypes/historyPrototype.js'),
		Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype.js'),
    storage    = require('simplestorage.js'),
    ModeModel  = require('../../../../stateApp/js/models/modeModel.js'),
    ToolModel  = require('../../../../stateApp/js/models/toolModel.js'),
    ModeView       = require('../../../../stateApp/js/views/modeView.js'),
    uriAnchor  = require('urianchor');

xdescribe("A history PROTOTYPE", function() {
	var history, eventSpy, spy, subs, dispatcher, modelDispatcher;
  
  it("is defined", function() {
      expect(History).not.toBeUndefined();
  });
  beforeEach(function() {
    storage.flush();
    location.hash = uriAnchor.setAnchor({mode:"advanced"}, {}, true);
    //console.log('location.hash historySpec');
    //console.log(location.hash);
  	history = Object.create(History);
    history.start({initState: { mode: 'basic' }});
  	dispatcher  = Object.create(Dispatcher);
    //console.log(location.hash);
  });
  afterEach(function() {
    history.stop();
  	history = null;
    dispatcher.stopListening();
    /*
  	for(var prop in subs) {
       	dispatcher.stopListeningl(prop);
      }
      */
  }); 
  it("provides the start and stop methods", function() {
    expect( _.isFunction(history.start) ).toBe(true);
    expect( _.isFunction(history.stop) ).toBe(true);
    expect( _.isFunction(history.setModelState) ).toBe(true);
  }); 
  it("is a dispatcher", function() {
    expect( _.isFunction(history.listenTo) ).toBe(true);
    expect( _.isFunction(history.stopListening) ).toBe(true);
    expect( _.isFunction(history.triggerEvent) ).toBe(true);
  }); 
  it("can set eventlisteners on hashchange", function() {
    location.hash = $.param({mode:"basic"});
  	eventSpy = spyOnEvent(window, 'hashchange');
  	spy      = spyOn(history, 'hashChangeHandler');
  	history.start();
   	$(window).trigger( "hashchange" );
   	expect(eventSpy).toHaveBeenTriggered();
   	expect(spy).toHaveBeenCalled();
   	});
  it("can set eventlisteners on pushState "
  		+ "if options.pushState is true", function() {
    location.hash = $.param({mode:"basic"});
  	spy      = spyOn(history, 'pushStateHandler');
  	history.start({pushState: true});
   	$(window).trigger( "pushState" );
   	expect(spy).toHaveBeenCalled();
   	});
  describe("The hashChange event handler should", function () {
  	var modeModel;
  	beforeEach(function() {
  		modeModel = Object.create(ModeModel);
  		modeModel.initialize({mode:'basic'});
  		subs = dispatcher.getSubscribers();
  	});
  	afterEach(function() {
  		for(var prop in subs) {
  			//console.log("subs");
       	modeModel.stopListening(prop);
      }
      modeModel = null;
      subs = {}; 
  	});
  	
  	it("trigger a 'state:mode' event sets the model" +
  		 "following the fake mode object created in historyPrototype",function() {
  		spy = spyOn(modeModel, 'set').and.callThrough();
   		$(window).trigger( "hashchange" );
      expect(spy).toHaveBeenCalled();
  		expect(spy).toHaveBeenCalledWith({mode: 'advanced'});
  	});
  	
  	it("set the model and triggers an addEventType:change event",function() {
  		spy = spyOn(modeModel, 'triggerEvent');
  		$(window).trigger( "hashchange" );
      expect(spy).toHaveBeenCalledWith("addEventType:change", {model: modeModel});
  	});

  	it("set the model and triggers a change:mode event", function() {
      var view = Object.create(ModeView);
  		spy = spyOn(modeModel, 'triggerEvent').and.callThrough();
  		$(window).trigger( "hashchange" );
      //expect(spy).toHaveBeenCalledWith('change:mode', {model:modeModel, modelState: {mode:'mode'}});
  	});
    it("setHistory (from model change):",function() {
      //location.hash = $.param({mode:"advanced"});
      history.changeHistory({model:modeModel, modelState: {mode:'basic'}});
      expect(location.hash).toEqual('#!mode=basic');
      
    });
    
  	it("changeHistory (from model change):",function() {
      location.hash = $.param({mode:"advanced"});
      history.changeHistory({model:modeModel, modelState: {mode:'basic'}});
      expect(location.hash).toEqual('#!mode=basic');  
  	});

    it("setModelState from (location/history) change:",function() {
      //location.hash = $.param({mode:"advanced"});

      var tmpUrlString = location.hash.slice(1),
      tmpUrlObject = history.objectify(tmpUrlString);
      expect(modeModel.get('mode')).toEqual('basic');
      history.setModelState(tmpUrlObject);
      expect(modeModel.get('mode')).toEqual('advanced');
    });
    it("tool model.toJSON when setting a nested object on initialization", function() {
      var stateObj = { 
        toolName  : 'adam',
        toolState : {
          c: 'cedric',
          d: {
            e: 'espen'
          }
        }
      }, 
      toolModel = Object.create(ToolModel);

      toolModel.initialize(stateObj);
      expect(toolModel.toJSON()).toEqual(stateObj);
    });
    it("set location.hash with nested objects", function() {
      var stateObj = { 
        tool      : 'adam',
        toolState : {
          c: 'cedric',
          d: {
            e: 'espen'
          }
        }
      }, 
      toolModel = Object.create(ToolModel);

      toolModel.initialize(stateObj);
      expect(location.hash.slice(2)).toEqual(uriAnchor.makeAnchorString(stateObj));
    });
  });
});
describe("Navigation tests", function() {
  var modeModel, modeView, toolModel, history, eventSpy, spy, subs, result;
    beforeEach(function() {
      storage.flush();
      location.hash = uriAnchor.makeAnchorString({});
      //console.log('location.hash');
      //console.log(location.hash);
      modeModel = Object.create(ModeModel);
      modeView  = Object.create(ModeView);
      history   = Object.create(History);
      modeModel.initialize({mode:'basic'});
      modeView.init({model: modeModel, classNames: "clickTest"});
      
      setFixtures(modeView.el);

    });
    afterEach(function() {
      modeModel.stopListening();
    });
    describe("Following a click:", function() {
      it("Triggers a click", function() {
       
        eventSpy = spyOnEvent('.clickTest', 'click');
        $('.clickTest').trigger( "click" );
        
        expect('click').toHaveBeenTriggeredOn('.clickTest');
        expect(eventSpy).toHaveBeenTriggered();
      });
      it("the model changed", function() {
        spy = spyOn(modeModel, 'set').and.callThrough();
        $('.clickTest').trigger( "click" );
        expect(spy).toHaveBeenCalled();
        result = modeModel.get('mode');
        expect(result).toEqual('advanced');
      });
      it("A change event reaches changeHistory method", function() {
        spy = spyOn(history, 'changeHistory');
        
        history.start({initState: { mode: 'basic' }});
        expect(spy.calls.count()).toEqual(0);
        $('.clickTest').trigger( "click" );
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toEqual(1);
      });
      it("Starting the history does not trigger a history:change (no loop)", function() {
        spy = spyOn(history, 'changeHistory');
        expect(spy.calls.count()).toEqual(0);
        history.start({initState: { mode: 'basic' }});
        expect(spy.calls.count()).toEqual(0);

        expect(spy).not.toHaveBeenCalled();
        
      });
      it("Starting the history triggers a setModelState event ", function() {
        location.hash = uriAnchor.makeAnchorString({mode: 'advanced'});
        spy = spyOn(history, 'setModelState');
        expect(spy.calls.count()).toEqual(0);
        history.start({initState: { mode: 'basic' }});
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toEqual(1);
        //expect(spy.calls.count()).toEqual(2);
      });
      xit("location.hash is set when triggering a click", function() {
        spy = spyOn(history, 'changeHistory');
        history.start({initState: { mode: 'basic' }});
        result = location.hash;
        expect(result).toEqual("#!mode=basic");
        $('.clickTest').trigger( "click" );
        //expect(spy).toHaveBeenCalled();
        //expect(spy.calls.count()).toEqual(1);
        //history.start({initState: { mode: 'basic' }});
        //
        //expect(result).toEqual("#!mode=basic");
        
        
        //expect(spy.calls.count()).toEqual(1);
      });
    });
    
  });


