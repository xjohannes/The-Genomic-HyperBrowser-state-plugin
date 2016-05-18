(function () {
    'use strict';
    var _ = require('underscore'),
        storage = require('simplestorage.js'),
        Dispatcher = require('./dispatcherPrototype'),
        uriAnchor = require('../polyfills/uriAnchor_mod'),
        config = require('../stateAppConfig');

    var History = (function () {
        // Private variables
        var triggerHashchange = true,
        // Private methods
            _hashChangeHandler = function (event) {
                var tmpUrlObject = uriAnchor.makeAnchorMap();
                if (triggerHashchange) {
                    event.data.self.triggerEvent('history:change', tmpUrlObject);
                }
                setTimeout(function() {
                    triggerHashchange = true;
                }, 100);
            },
            _pushStateHandler = function (event) {
                console.log("History pushState eventType");
            };

        return {
            start: function (options) {
                uriAnchor.configModule({sub_delimit_char: "->"})
                options = options || {};
              
                if (options.pushState !== undefined) {
                    $(window).on('pushState', {self: this}, this.pushStateHandler);
                } else {
                    $(window).on('hashchange', {self: this}, this.hashChangeHandler);
                }
                this.listenTo('history:change', this.setModelState, this);
                this.listenTo('change:history', this.changeHistory, this);
                this.listenTo('set:history', this.changeHistory, this);

                if (location.hash !== '') {
                    //some browsers (firefox) does not trigger hashchange when coming 
                    //to a webpage for the first time
                    this.triggerEvent('history:change', uriAnchor.makeAnchorMap());
                } else if (storage.index().length > 0) {
                    this.triggerEvent('history:change', this.getStoredStateObject());
                } else {
                    this.triggerEvent('history:mode', options.initState);
                    triggerHashchange = false;
                    var anchorString = uriAnchor.makeAnchorString(options.initState);
                    location.hash = anchorString;

                }
            },
            stop: function (options) {
                options = options || {};
                this.stopListening();
                if (options) {
                    $(window).off('pushState');
                } else {
                    $(window).off('hashchange');
                }
            },
            //public methods only needed for testing
            hashChangeHandler: function (event) {
                event.stopPropagation();
                event.preventDefault();
                _hashChangeHandler(event);
            },
            pushStateHandler: function (event) {
                console.log("Histoyr pushState");
                event.stopPropagation();
                _pushStateHandler(event);
            },
            // Hack to account for the fact that both the browser and this app adds to the history, thus braking back button. 
            // Not working consistently over browsers.
            // The idea is that when the local store has tool state stored, but the URI does not
            // then the app should return to the g suite tabs. This is best done by reloading the page
            // while the URI hash only has mode state attached: i.e. #mode=basic
            checkIfGoingBack: function (locationObj) {
                var localStoreTool = storage.get('tool');
                if(localStoreTool !== undefined && locationObj['tool'] === undefined) {
                    // going back to the welcome page 
                    storage.deleteKey('tool');
                    locationObj['backToWelcome'] = 'https://hyperbrowser.uio.no/state/static/welcome.html'
                    delete locationObj['tool'];
                   
                } else {
                    delete locationObj.backToWelcome;
                }
            },
            // Not working. 
            isPropChanged: function (locationObj, currentProp) {
                var localStoredProp = storage.get(currentProp);
                if(locationObj["_s_" + currentProp] !== undefined) {
                    
                }else if(localStoredProp !== currentProp) {
                    return true
                } else {
                    return false;
                }
            },
            setModelState: function (locationObj) {
                // Invariant: All states found in the location hash object is already in the storedStateObject
                var tmpModel, dependentObj;
                this.checkIfGoingBack(locationObj);
                for (var prop in locationObj) {
                    tmpModel = {};
                    if (locationObj.hasOwnProperty(prop) ) {//&& this.isPropChanged(locationObj, prop)
                        if ((prop.charAt(0) !== '_')) {
                            dependentObj = ('_' + prop);
                            if (locationObj[dependentObj]) {
                                tmpModel = locationObj[dependentObj];
                            }
                            tmpModel[prop] = locationObj[prop];
                            this.triggerEvent('history:' + prop, tmpModel);
                        }
                    }
                }
            },
            changeHistory: function (modelObj) {
                var locationBefore = location.hash, locationAfter = '',
                    modelName = modelObj.get('modelName'), modelState = modelObj.toJSON(),
                    locationObj = uriAnchor.makeAnchorMap(), anchorString, baseUri;
                locationObj[modelName] = modelState[modelName];
                locationObj['_' + modelName] = {};
                for(var prop in modelState) {
                    if(modelState.hasOwnProperty(prop) && prop !== modelName) {
                        locationObj['_' + modelName][prop] = modelState[prop];
                        storage.set('_' + modelName, modelState,{TTL: 86400000});
                    }
                    storage.set(prop, modelState[prop]);
                }

                triggerHashchange = false;
                baseUri = location.protocol + "//" +  location.host + hbGetBaseUrl();
                anchorString = uriAnchor.makeAnchorString(locationObj);

                if(modelName === 'tool' || modelObj.gsuite) {
                    location.replace(baseUri + "#" + anchorString);
                } else if(modelName === 'mode'){
                    location.assign(baseUri + "#" + anchorString);
                }
                locationAfter = location.hash;
                if(modelObj.gsuite) {
                   modelObj.gsuite = false;
                } else if(locationAfter === locationBefore) {
                    triggerHashchange = true;
                }
            },
            getStoredStateObject: function () {
                var i, j, store = storage.index(), tmpStorageObj = {};
                for (i = 0; i < (j = store.length); i += 1) {
                    tmpStorageObj[store[i]] = storage.get(store[i]);
                }
                return tmpStorageObj;
            }
        };
    }());
    _.extend(History, Object.create(Dispatcher));
    module.exports = History;
})();