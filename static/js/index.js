simp.ready(function(){
	simp.require("dom,event", function(data, errors){
		var dom = data.dom,
			event = data.event;
		var container = dom(".container");
		event.on(container,  "click",  "[data-href]",  function(){
			alert(simp.dom(this).attr("data-href"));
//			window.location.href = simp.dom(this).attr("data-href");
		});
		// for go on
		for (var i = 0, len = container.length; i < len; i++){
			event.addEvent(container[i], "click", function(e){
				console.log(this, e);
			});
		}
	});
});