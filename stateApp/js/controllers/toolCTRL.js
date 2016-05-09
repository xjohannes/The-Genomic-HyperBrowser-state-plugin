(function () {
    'use strict';
    var BaseController = require('../prototypes/controllerPrototype'),
        _ = require('underscore'),
        config = require('../stateAppConfig'),
        storage = require('simplestorage.js');

    var ToolController = Object.create(BaseController);

    _.extend(ToolController, {
        initialize: function () {
            this.listenTo('set:tool', this.parseEvent, this);
            this.newlyCreated = true;
        },
        parseEvent: function (eventObj) {
            if(eventObj.backToWelcome !== undefined && typeof eventObj.backToWelcome !== 'function') {
                this.goBack(eventObj);
            } else if(eventObj.get("serializedForm") !== undefined) {
                //console.log("ToolModel is defined. Triggers ajax");
                this.createAjaxCall(eventObj);
            } else if(this.newlyCreated) {
                   this.newlyCreated = false;
                //console.log("toolCTRL is newly created. Set var to false. Do nothing");
            } else {
                //console.log("toolCTRL: no toolModel.serializedForm and not newly created. Flush storage and reload window.location");
                var tmpMode = storage.get('mode');
                    storage.flush();
                    storage.set('mode', tmpMode);
                    window.location.reload(false); 
            }
        },
        //*
        /* Ajax call will only be executed when setting a tool for the first time.
         */
        createAjaxCall: function (eventObj) {
            var self = this, currentSelection;
           // currentSelection = eventObj.get('currentSelection');
            $.ajax({
                type: 'post',
                url: config.urlHyperPostfix, //+ "?" + currentSelection,
                data: eventObj.get('serializedForm'),
                beforeSend: function () {
                    self.triggerEvent('ajaxCall');
                    //console.log("AJAX Before send");
                },
                success: function (data) {
                    //console.log("AJAX Success");
                    self.triggerEvent('change:tool', {model: this, data: data});
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("AJAX Error");
                }
            });
        },
        goBack: function (eventObj) {
            var self = this, currentSelection;
           // currentSelection = eventObj.get('currentSelection');
            $.ajax({
                type: 'post',
                url:  eventObj.backToWelcome, //+ "?" + currentSelection,
                
                beforeSend: function () {
                    self.triggerEvent('ajaxCall');
                    //console.log("AJAX Before send. Going back");
                },
                success: function (data) {
                    //console.log("AJAX Success. Going back");
                    self.triggerEvent('change:tool', {model: this, data: data, backToWelcome: 1});
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("AJAX Error");
                }
            });
        }
    });
    module.exports = ToolController;
}());