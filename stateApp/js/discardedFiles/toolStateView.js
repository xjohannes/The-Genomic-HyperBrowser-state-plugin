/*(function(){
	'use strict';
	var BaseView = require('../prototypes/viewPrototype'),
	_    = require('underscore');

	var ToolView = Object.create(BaseView);

	_.extend(ToolView, (function() {
			// private variables

			return {
				template: _.template(''
					+ '<form name="form" id="form" method="post" action="hyper?">'
						+ '<div class="genome">Genome build:'
    					+ '<select id="dbkey" name="dbkey" style="background-color: rgb(186, 218, 85);">'
    						+ '<option value="" selected="">----- Select -----</option>'
    						+ '<option value="AaegL3">Aedes aegypti Liverpool LVP strain April 2014 (AaegL3)</option>'
    						+ '<option value="agamp3">Anopheles gambiae PEST Apr. 2012 (agamp3)</option>'
    						+ '<option value="tair10">Arabidopsis thaliana Nov. 2010 (TAIR10)</option>'
    						+ '<option value="gadMor2">Atlantic cod - uploaded 08/15 (gadMor2)</option>'
    						+ '<option value="ASM800v1">Bacillus cereus strain ATCC 10987 Feb 2004 (ASM800v1)</option>'
    						+ '<option value="blackrust">Black rust</option><option value="B.taurus">Bos taurus Dec. 2009</option>'
    					+ '</select>'
 							+ '<script type="text/javascript">'
 								+ "$(document).ready(function () {$('#dbkey').change(function (){resetAll();reloadForm(this.form, this);})});"
							+ '</script>'
							+ '<input type="hidden" name="show_genome_info" id="show_genome_info" value="0">'
						+ '</div>'
						+ '<div style="clear:both;height:0"></div>'
						+ '<p><input id="start" type="submit" value="Start analysis" disabled="disabled">'
						+ '<span id="validating" style="display:none">Validating...</span></p>'
						+ '<input type="HIDDEN" name="tool_id" value="hb_test_1">'
    				+ '<input type="HIDDEN" name="URL" value="http://dummy">'
						+ '<input type="HIDDEN" id="job_name" name="job_name" value="">'
    				+ '<input type="HIDDEN" id="job_info" name="job_info" value="">'
					+ '</form>'
					),
				initialize: function(options) {
					this.$el.on('click', this, this.someFunction);
					this.listenTo('change:tool', this.update, this);
				},
				render: function(data) {
					var attributes = this.model.toJSON();
					this.$el.html(data);
					return this;
				},
				someFunction: function() {

				},
				update: function(data) {
					console.log("update");
					this.render(data);
				}
			}
		}())
	);

	module.exports = ToolView; 

}());
*/