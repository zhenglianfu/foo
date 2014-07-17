/**
 * @author fuzhenglian
 * @date 2014-06-10
 * @version 1.0
 */
(function(window){
	var _sim = window.simp,
			version = "1.0",
			class2type = {},
			modules = ["dom", "ajax"],
			core_toString = class2type.toString,
			core_hasOwn = class2type.hasOwnProperty,
			core_slice = modules.slice,
			default_url = function(){
				var scripts = document.getElementsByTagName("script"),
					   src = scripts[scripts.length - 1].src;
				return src.substr(0, src.lastIndexOf("/") + 1) ;
			}(),
			simply = {
				extend : function(){
					var src, copyIsArray, copy, name, options, clone,
					target = arguments[0] || {}, asArray, 
					i = 1,
					length = arguments.length,
					deep = false;
					if (typeof target === "boolean") {
						deep = target;
						target = arguments[1];
						i ++;
					}
					if (typeof target !== "object" && !simply.isFunction(target)) {
						target = {};
					}
					if (i === length) {
						target = this;
						i --;
					}
					for (; i < length; i++) {
						if((options = arguments[i]) != null) {
							for (name in options) {
								src = target[name];
								copy = options[name];
								if (src === copy) {
									continue;
								}
								// resolve with [], {}
								if (deep && copy && (asArray = simply.isArray(copy) || simply.isPlainObject(copy))) {
									//don't move original properties
									if (asArray) {
										clone = simply.isArray(src) ? src : [];
									} else {
										clone = simply.isPlainObject(src) ? src : {};
									}
									target[name] = simply.extend(deep, clone, copy);
								} else if (copy !== undefined){
									target[name] = copy;
								}
							}
						}
					}
				},
				type : function(e){
					if (e == null){
						return e + "";
					}
					return typeof e === "object" ? class2type[core_toString.apply(e)] || "object" : typeof e;
				}
	};
    simply.extend({
    	require : function(m_name, uri, callback){
			
		},
		isWindow : function(win){
			//weak
			return obj != null && obj == obj.window;
		},
    	isFunction : function(f){
			return typeof f === "function";
		},
    	isArray : Array.isArray || function(e){
			return simply.type(e) === "array";
		},
		isNumber : function(n){
			return typeof n === "number";
		},
		isNumeric : function(num){
			return num - parseFloat(num) >= 0;
		},
		isEmptyObject : function(o){
			var i;
			for (i in o) {
				return false;
			}
			return true;
		},
		isPlainObject : function(obj){
			if (!obj || simply.type(obj) !== "object" || obj.nodeType || simply.isWindow( obj )) {
				return false;
			}
			return 
		},
    	each : function(arr, fun){
    		var i ,len;
    		if (simply.isFunction(fun)) {
    			for (i = 0, len = arr.length; i < len; i++) {
    				fun(arr[i], i);
    			}
    		}
    	},
    	map : function(arr, fun){
    		var rets = [], i, len, ret;
    		for (i = 0, len = arr.length; i < len; i++) {
    			ret = simply.isFunction(fun) ? fun(arr[i]) : fun;
    			rets.push(ret);
    		}
    	}
    });
    simply.each("Number|Array|Object|Function|Null|Undefined|Date|RegExp|String".split("|"), function(e){
    	class2type["[object " + e + "]"] = e.toLowerCase(); 
    });
	window.simp = simply;
}(window));