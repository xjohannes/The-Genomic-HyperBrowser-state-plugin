(function() {
	'use strict';

	//var $ = require('jquery');
	
	$(document).ready(function() {
		///////////////////////////////
		var hist = document.getElementById('#galaxy_history');
		$('a').css('color', 'red');
		var mainFrame = $('iframe'),
				tools = $('#galaxy_tools'),
				main    = $('#galaxy_main'),
				history = $('#galaxy_history');

		tools.on('load', function() {
			tools = $($('#galaxy_tools')[0]).contents();
			tools.find('a').css('color', '#BADA55');
			
			$("a", tools ).on('click', function(e) {
				console.log("e");
				console.log(e);
				$(this).hide();
			});
			
		//$('a', tools).css('color', '#fff');
		});

	


	///////////////////////////////
		
	});

	
}());

/*
		// craches the app
		console.log(history);

		
		//history.getElementsByTagName('p');	
*/



/*
		tools.on('load', function() {
			tools = $($('#galaxy_tools')[0]).contents();
			tools.find('a').css('color', '#BADA55');
			
			$("a", tools ).on('click', function(e) {
				console.log("e");
				console.log(e);
				$(this).hide();
			});
			
		$('a', tools).css('color', '#fff');
		});
*/

/*
		console.log("mainFrame");
		console.log(mainFrame.contents()[0]);
		
		mainFrame.find('a').css('color', 'green');
		$('iframe', 'a').css('color', '#BADA55');
*/
		
	
	/*
	var elem = iframes[0].contentDocument.getElementById('title_hb_repository');
	elem.addEventListener('click', function(e) {
		console.log('First event: ' + e.target);
	});
	//console.log(iframes);
	*/
	
	/*
	window.parent.document.getElementsByClassName("historyItem")[0].contentWindow.document.addEventListener('click', function(e) {
		console.log('frame 1.addEventListener event: ' + e.target);
	});
*/
/*
	parent.document.getElementsByTagName("iframe")[0].contentWindow.document.addEventListener('click', function(e) {
		console.log('frame 0.addEventListener event: ' + e.target);
		parent.history.replaceState(e, '#iframe0', e.target);
	});
	parent.document.getElementsByTagName("iframe")[1].contentWindow.document.addEventListener('click', function(e) {
		console.log('frame 1.addEventListener event: ' + e.target);
		var baseUrl = "hyper?GALAXY_URL=";
		//parent.history.pushState({gunnar: 'rud'}, '#iframe1', e.target.href);
		parent.history.pushState({gunnar: 'rud'}, e.target.textContent, baseUrl + e.target.href);
		return event.preventDefault();
	});
	parent.document.getElementsByTagName("iframe")[2].contentWindow.document.addEventListener('click', function(e) {
		console.log('frame 2.addEventListener event: ' + e.target);
	});
	window.addEventListener('popstate', function(e) {
		e.preventDefault();
		console.log('popstate fired!');
		console.log("popstate: ");
		console.log(e.state);
	});

	window.onpopstate = function(e, f, g) {
		console.log("e:");
		console.log(e);
		console.log("f");
		console.log(f);
		console.log("g");
		console.log(g);
	}
	*/
	/*
	window.addEventListener("click", function(e) {
		console.log('window.addEventListener event: ' + e.target);
	});
	window.onclick = function(e) {
		console.log('onclick event: ' + e.target);
	};
	*/
	/* vanilla javascript
			var tool = document.getElementById('galaxy_tools').contentWindow.document;
			var as = tool.getElementsByTagName('a');
			tool.addEventListener('click', function(e) {
				console.log("e");
				e = e || window.event;
				var target = e.target || e.srcElement;
				$('e').css('#fff');
				console.log(e.target);
				target.style.color='red';
			});
			*/