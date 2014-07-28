simp.ready(function(){
	simp.require("dom,event", function(data, errors){
		console.log(data, errors);
		var dom = data.dom,
			event = data.event;
		var container = dom(".container");
		event.on(container,  "click",  "[data-href]",  function(){
			window.location.href = this[data-href];
		});
	});
});