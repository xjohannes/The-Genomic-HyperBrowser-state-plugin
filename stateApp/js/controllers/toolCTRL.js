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
                this.createAjaxCall(eventObj);
            } else if(this.newlyCreated) {
                   this.newlyCreated = false;
            } else {
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
            $.ajax({
                type: 'post',
                url: config.urlHyperPostfix, 
                data: eventObj.get('serializedForm'),
                beforeSend: function () {
                    self.triggerEvent('ajaxCall');
                },
                success: function (data) {
                    self.triggerEvent('change:tool', {model: this, data: data});
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("AJAX Error");
                }
            });
        },
        goBack: function (eventObj) {
            var self = this, currentSelection;
            $.ajax({
                type: 'post',
                url:  eventObj.backToWelcome, 
                
                beforeSend: function () {
                    self.triggerEvent('ajaxCall');
                },
                success: function (data) {
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