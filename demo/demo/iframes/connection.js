(function(){
	$(window.document).bind("click",function(){
		alert("click");
	});
	
	$(window).on("click","iframe body",function(){
		debugger;
		var win = this.contentWindow;
		$(win.parent.window).click();
	});
})();