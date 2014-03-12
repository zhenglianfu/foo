(function(){
	var _f = window.F,
		F = null;
	F = function(selector){
		return new Selector(selector);
	};
	var Selector = function Selector(select){
		var obj,
			type = typeof select;
		if (type === 'string') {
			
		} else if (type === 'object') {
			
		} else {
			return [];
		}
	};
	F.required = function(moduleName, callback){
		
	};
	F.conflict = function(){
		window["F" + new Date().getTime()] = window.F;
		window.F = _f;
		return F;
	};
	window.F = F;	
})(F, window);