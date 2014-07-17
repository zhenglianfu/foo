(function(window){
	var blankReg = /\s+/;
	var trimReg = /\s/g;
	isArray = Array.isArray && Array.isArray([]) && !Array.isArray({}) ? function(a){
		return Array.isArray(a);
	} : function(a){
		return Object.prototype.toString.call(a) === "[object Array]";
	};
	isHTMLCollection = function(c){
		return c instanceof HTMLCollection;
	};
	var trim = "".trim ? function(str){
		if (typeof str === "string") {
			return str.trim();
		}
		return str;
	}  : function(str){
		if (typeof str === "string") {
			return str.replace(trimReg, "");
		}
	};
	var _id = function(id){
		return document.getElementById(id);
	};
	
	var _class = function(className, context){
		context = context || document.body;
		return context.getElementsByClassName(className);
	};
	
	var _tag = function(targetName, context){
		context = context || document.body;
		return context.getElementsByTagName(targetName);
	};
	// function select
	var select = function(selector, context){
		var selects, i = 0, len, clen, result = [], s, t, j, elen, re;
		context = context || document;
		if (typeof context == "string") {
			context = select(context) || document.body;
		}
		if (context.length && context.length > 0) {
			for (i = 0, clen = context.length; i < clen; i++) {
				result.push(select(selector, context[i]));
			}
		} else if (selector && typeof selector === "string") {
			selects = selector.split(",");
			len = selects.length;
			if (len > 1) {
				for (;i < len; i++) {
					t = select(selects[i], context);
					if (isArray(t)){
						result.concat(t);
					} else if (isHTMLCollection(t)) {
						for (j = 0, elen = t.length; j < elen; j++) {
							result.push(t[j]);
						}
					} else if (t) {
						result.push(t);
					}
				};
			} else {
				s = selector.split(blankReg);
				len = s.length;
				if (len > 1) {
					i = 0;
					while(i < len){
						if (!blankReg.test(s[i])) {
							context = select(s[i], context);
							if (context == null) {
								break;
							}
							i++;
						}
					}
					return context;
				} else {
					// core parse
					s = trim(selector);
					if (s.indexOf("#") >= 0){
						return _id(s.substr(1));
					} else if(s.indexOf(".") >= 0) {
						return _class(s.substr(1), context);
					} else {
						return _tag(s, context);
					}
				}
			}
		}
		re = [];
		for (i = 0, len = result.length; i < len; i++) {
			if (isArray(result[i]) || isHTMLCollection(result[i])) {
				for (j = 0, elen = result[i].length; j < elen; j++) {
					re.indexOf(result[i][j]) < 0 && re.push(result[i][j]);
				}
			} else {
				re.indexOf(result[i]) < 0 && re.push(result[i]);
			}
		}
		return re;
	};
	
	var graphic = function(){
		
	}();
	var Canvas = function Canvas(){
		
	}
	Canvas.prototype = {
			get2D : function(){
				return this[0] && this[0].getContext ? this[0].getContext("2d") : null;
			},
			get3D : function(){
				return this[0] && this[0].getContext ? this[0].getContext("3d") : null;
			},
			setStyle : function(){
				
			},
			chart : function(){
				
			},
			clear : function(){
				if (this[0] == null) {
					return this;
				}
				var width = this[0].width || this[0].clientWidth;
				this[0].width = width;
			}
	};
	
	var CanvasChart = function CanvasChart(){
		
	}
	window.select = select;
	window.canvas = canvas;
})(window);