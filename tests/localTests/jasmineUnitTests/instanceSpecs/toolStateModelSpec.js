var ToolStateModel = require('../../../../stateApp/js/models/toolModel.js'),
    ModeModel      = require('../../../../stateApp/js/models/modeModel.js'),
    ToolStateView  = require('../../../../stateApp/js/views/toolView.js'),
    storage        = require('simplestorage.js'),
    History        = require('../../../../stateApp/js/prototypes/historyPrototype.js'),
    uriAnchor      = require('urianchor'),
    _              = require('underscore');

describe("A ToolStateModel class / constructor", function() {
    ////////////// Initializing /////////////
    var toolStateModel, form, toolStateView, spy, result, subs, history, modeModel, 
        toolSearch       = '?GALAXY_URL=https://hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1',
        pathName         = '/state/hyper',
        currentSelection = 'hyper?#dbkey', 
        serializedForm   = 'dbkey=tair10&show_genome_info=0&tool_id=hb_test_1&URL=http://dummy&job_name=&job_info=',
        firstState = {
            toolState: {
                pathName: pathName,
                toolSearch: toolSearch
            }
        },
        secondState = {
            toolState: {
                serializedForm: serializedForm, 
                currentSelection: currentSelection
            }
        }, 
        locObj = {
                mode  :'basic',
                tool  : 'Analyze genomic tracks',
                _tool : {
                    pathName: pathName,
                    toolSearch: toolSearch 
                }
            };

        beforeEach(function() {
            
            storage.flush();
            location.hash = '';
            
            //storage.set('mode', 'basic');
            modeModel = Object.create(ModeModel);
            modeModel.initialize({mode: 'basic'});

            history = Object.create(History);
            toolStateModel = Object.create(ToolStateModel);
            toolStateView  = Object.create(ToolStateView);
        
            toolStateModel.initialize();
            toolStateView.init({model:toolStateModel});

            setFixtures(toolStateView.el);
            
            toolStateModel.setToolState(firstState);
            //console.log("toolState after first set:"); 
            //console.log(toolStateModel.get('toolState'));    
            uriAnchor.setAnchor(locObj, {}, true); 
            //console.log("TEST: location.hash");
            //console.log(location.hash);

        });
        afterEach(function() {
            toolStateModel.stopListening();
            toolStateModel.eraseAllModels();
            history.stop();
            toolStateModel = null;

        });
        ////////////// End initializing /////////////
    it("is defined", function() {
        expect(ToolStateModel).not.toBeUndefined();
    });
    it("provides the methods of the BASE prototype model", function() {
            expect( _.isFunction(toolStateModel.set) ).toBe(true);
            expect( _.isFunction(toolStateModel.get) ).toBe(true);
            expect( _.isFunction(toolStateModel.toJSON) ).toBe(true);
            expect( _.isFunction(toolStateModel.historify) ).toBe(true);  
    });
    it("setting toolState tested with get()", function() {
            toolStateModel.setToolState({toolState: serializedForm});
            expect( toolStateModel.get('toolState') ).toEqual(serializedForm);
        });
    it("sets location/history when setting toolState", function() {
            spy = spyOn(history, 'changeHistory').and.callThrough();
            history.start({initState: { mode: 'basic' }}); 
            
            toolStateModel.setToolState(secondState);
            
            expect(toolStateModel.get('tool')).toEqual('Analyze genomic tracks');
            //console.log('toolStateModel');
            //console.log(toolStateModel.get('toolState'));
            expect(toolStateModel.get('toolState')['currentSelection']).toEqual(currentSelection);
            expect( spy ).toHaveBeenCalled();
            expect( spy ).toHaveBeenCalledWith({
                model: toolStateModel,
                modelState: {
                    tool: toolStateModel.get('tool'),
                    _tool: { 
                        pathName: '/state/hyper',
                        toolSearch: '?GALAXY_URL=https://hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1',
                        serializedForm: 'dbkey=tair10&show_genome_info=0&tool_id=hb_test_1&URL=http://dummy&job_name=&job_info=', 
                        currentSelection: 'hyper?#dbkey'
                    }
                }
            });
           
            expect(location.hash.slice(2)).toEqual(uriAnchor.makeAnchorString({
                mode  :'basic',
                tool  : 'Analyze genomic tracks',
                _tool : {
                    pathName: '/state/hyper',
                        toolSearch: '?GALAXY_URL=https://hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1',
                        serializedForm: 'dbkey=tair10&show_genome_info=0&tool_id=hb_test_1&URL=http://dummy&job_name=&job_info=', 
                        currentSelection: 'hyper?#dbkey'
                }
            }));
            
        });
    it("sets toolStateModel when setting location", function() {
            spy = spyOn(toolStateModel, 'createAjaxCall').and.callThrough();
            uriAnchor.setAnchor(locObj, {}, true); 
                //$(window).trigger('hashChange');
                //console.log("location.hash SSPCE");
                //console.log(location.hash);
            history.start({initState: { mode: 'basic' }}); 
            
            expect( spy ).toHaveBeenCalled();
            //expect( spy ).toHaveBeenCalledWith();

            
        });
    
    xit("making ajax", function() {
            //console.log('toolStateModel.toJSON()');
            //console.log(toolStateModel.toJSON());
            toolStateModel.setToolStateFromHistory({toolState: serializedForm});
            //console.log('state');
            //console.log(state);
            //expect( testState ).toEqual(state);
            
        });

});


