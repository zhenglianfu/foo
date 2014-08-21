simp.ready(function(){
	simp.require("dom,event", function(data, errors){
		var dom = data.dom,
			event = data.event;
		var container = dom(".container");
		event.on(container,  "click",  "[data-href]",  function(){
			alert(simp.dom(this).attr("data-href"));
//			window.location.href = simp.dom(this).attr("data-href");
		});
	});
});