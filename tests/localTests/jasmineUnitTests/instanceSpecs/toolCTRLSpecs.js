    var ToolCTRL   = require('../../../../stateApp/js/controllers/toolCTRL.js'),
        Dispatcher = require('../../../../stateApp/js/prototypes/dispatcherPrototype.js'),
        ToolModel  = require('../../../../stateApp/js/models/toolModel.js'),
        History    = require('../../../../stateApp/js/prototypes/historyPrototype.js'),
        uriAnchor  = require('urianchor');

    describe("A toolCTRL prototype object", function() {
        //window.top.frames['galaxy_main'].location = {};  
    it("is defined", function() {
        expect(ToolCTRL).not.toBeUndefined();
    });

    it("provides the methods of the BASE prototype controller", function() {
        var toolCTRL = Object.create(ToolCTRL);
            expect( _.isFunction(toolCTRL.init) ).toBe(true);
            toolCTRL = null;
    });
     
    describe("On a toolCTRL instance one can", function() {

        ////////////// Initializing /////////////
        var toolCTRL, spy, toolModel, history;

        beforeEach(function() {
            history = Object.create(History);
            toolCTRL  = Object.create(ToolCTRL);
            toolModel = Object.create(ToolModel);
            
        });
        afterEach(function() {
            toolCTRL.stopListening();
            toolCTRL = null;
        });
        ////////////// End initializing /////////////
        it("sets a dispatcher when creating an object", function() {
            expect( toolCTRL.listenTo).toBe(Dispatcher.listenTo);
        });
        xit("listens to change:tool events", function() {
            spy = spyOn(toolCTRL, 'triggerTool').and.callThrough();
            toolCTRL.init({model: toolModel});
            toolModel.initialize({
                    toolState: {
                        pathName: '/state/hyper',
                        toolSearch: '?GALAXY_URL=https%3A//hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1'
                    },
                    tool: 'Analyze genomic tracks',
                    toolHref: 'https://hyperbrowser.uio.no/state/hyper?GALAXY_URL=https%3A//hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1',
                    toolClass: 'tool-link',
                    hostName: 'hyperbrowser.uio.no',
                    target: 'galaxy_main'
            });
            expect(spy).toHaveBeenCalled();
        });
        xit("triggers history:tool event", function() {
            spy = spyOn(history, 'changeHistory').and.callThrough();
            toolCTRL.init({model: toolModel});
            history.start();
            toolModel.initialize({
                    toolState: {
                        pathName: '/state/hyper',
                        toolSearch: '?GALAXY_URL=https%3A//hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1'
                    },
                    tool: 'Analyze genomic tracks',
                    toolHref: 'https://hyperbrowser.uio.no/state/hyper?GALAXY_URL=https%3A//hyperbrowser.uio.no/state/tool_runner&tool_id=hb_test_1',
                    toolClass: 'tool-link',
                    hostName: 'hyperbrowser.uio.no',
                    target: 'galaxy_main'
            });
            expect(spy).toHaveBeenCalled();
        });
        xit("should NOT triggerTool when  coming from history", function() {
            spy = spyOn(toolCTRL, 'triggerTool').and.callThrough();
            uriAnchor.setAnchor({mode: 'advanced', 
                                tool : 'Analyze functional genomics of gwas tracks'}, {}, true);
            toolCTRL.init({model: toolModel});
            toolModel.initialize();
            history.start();

            expect(spy).not.toHaveBeenCalled();
        });
        xit("should triggerTool when  coming from click", function() {
            spy = spyOn(toolCTRL, 'triggerTool').and.callThrough();
            uriAnchor.setAnchor({mode: 'advanced', 
                                tool : 'Analyze functional genomics of gwas tracks'}, {}, true);
            toolCTRL.init({model: toolModel});
            toolModel.initialize();
            history.start();

            expect(spy).not.toHaveBeenCalled();
        });
    });

    });


