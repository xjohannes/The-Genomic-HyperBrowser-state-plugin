/*var 
		Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype.js'),
    ModeModel  = require('../../../../stateApp/js/models/modeModel'),
    ModeView   = require('../../../../stateApp/js/views/modeView');

xdescribe("A router PROTOTYPE", function() {
	var routerBase, eventSpy, spy, subs, dispatcher, modelDispatcher, timerCallback;
  it("is defined", function() {
      expect(Router).not.toBeUndefined();
  });
  beforeEach(function() {
  	routerBase = Object.create(Router);
  	dispatcher = Object.create(Dispatcher);
    subs       = dispatcher.getSubscribers();
    routerBase.init({dispatcher: dispatcher});
  });
  afterEach(function() {
  	routerBase = null;
  	for(var prop in subs) {
       	dispatcher.stopListening(prop);
      }
  }); 
  it("provides the parseUrl, init methods and routes object", function() {
    expect( _.isFunction(routerBase.init) ).toBe(true);
    expect( _.isFunction(routerBase.parseState) ).toBe(true);
    expect( _.isObject(routerBase.routes) ).toBe(true);
  	routerBase = null;
  }); 
  // NB! Is it more correct to use the done() asynchronous function or the setTimeout
 
  xdescribe("Following change:", function() {
    beforeEach(function() {
        modeModel    = Object.create(ModeModel);
        modeViewInst = Object.create(ModeView);
        //console.log(modeModel);
        modeModel.init({mode:'basic'}, modeModel);
        //modeModel.initialize();
        modeViewInst.init({model:modeModel, classNames: "clickTest", dispatcher: dispatcher});  
        setFixtures(modeViewInst.el);
        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();
    });
    afterEach(function() {
        modeViewInst = null;
        modeModel    = null;
        jasmine.clock().uninstall();
        
    });
    
    it("From a click on the view", function() {
      //spy = spyOn(modeModel, 'triggerEvent').and.callThrough();

      $('.clickTest').trigger('click');
      //expect(spy).toHaveBeenCalled();
    });
    it("From a history change", function() {

    });
  });

});
*/


