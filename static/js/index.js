simp.ready(function(){
	simp.require("dom,event", function(data, errors){
		var dom = data.dom,
			event = data.event;
		console.log(dom, event);
		var container = dom(".container");
		event.on(container,  "click",  "[data-href]",  function(){
			
		});
	});
});