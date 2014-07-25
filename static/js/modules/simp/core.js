/**
 * @author fuzhenglian
 * @date 2014-06-10
 * @version 1.0
 */
(function(window){
		var _sim = window.simp,
			doc = window.document,
			version = "1.0",
			rtrim = /^\s+|\s+$/g, 
			class2type = {},
			modules = ["dom", "ajax", "event"],
			modulesCache = {},
			core_toString = class2type.toString,
			core_hasOwn = class2type.hasOwnProperty,
			core_slice = modules.slice,
			default_url = function(){
				var scripts = document.getElementsByTagName("script"),
					   src = scripts[scripts.length - 1].src;
				return src.substr(0, src.lastIndexOf("/")) + "/modules/";
			}(),
			agent = window.navigator.userAgent,
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
					return target;
				}
	};
    simply.extend({
    	defaultURI : default_url,
    	isIE : function(){
    		
    	}(),
    	gtIE8 : function(){
    		
    	}(),
    	isFireFox : function(){
    		var p = /Firefox\/([\d\.]+)/i,
    			m = agent.match(p);
    		if (m && m.length) {
    			return m[1];
    		}
    		return false;
    	}(),
    	isChrome : function(){
    		
    	}(),
    	setDefaultURI : function(uri){
    		if (typeof uri === "string") {
    			simply.defaultURI = uri;
    			default_url = uri;
    		} 
    	},
    	addModule : function(name){
    		if (modules.indexOf(name) === -1) {
    			modules.push(name);
    		} 
    	},
    	setModules : function(m){
    		if (simply.isArray) {
    			modules = m;
    		} else {
    			throw {
    				name : "invildate argument",
    				message : "must be an array"
    			};
    		}
    	},
    	foo : function(){},
    	ready : function(fn){
    		if (doc.readyState === 'complete') {
    			fn && fn();
    		} else {
    			setTimeout(function(){
    				simply.ready(fn);
    			}, 300);
    		}
    	},
		type : function(e){
			if (e == null){
				return e + "";
			}
			return typeof e === "object" ? class2type[core_toString.apply(e)] || "object" : typeof e;
		},
		removeModule : function(name){
			var names = (name + "").split(","),
				i = 0, len = names.length, t;
			for (; i < len; i++) {
				t = simply.trim(names[i]);
				if (modules.indexOf(t) > -1) {
					simply[names[i]] = undefined;
				}
			}
		},
    	require : function(m_name, uri, callback){
			var names = (m_name + "").split(","), i, len, name, errors = [], scripts = [], data = {};
			uri = uri || default_url;
			if (simply.isFunction(uri)) {
				callback = uri;
				uri = default_url;
			}
			uri = simply.trim(uri);
			for (i = 0, len = names.length; i < len; i++) {
				name = simply.trim(names[i]);
				if (modules.indexOf(name) >= 0) {
					if (modulesCache[name] === undefined) {
						scripts.push(insertScriptNode(uri, name));
					} else {
						(data[name] = modulesCache[name]);
					}
				} else {
					errors.push({
						message : "the module " + name + " is not existed or is not supported" 
					});
				}
			}
			if (scripts.length === 0) {
				callback && callback(data, errors); 
			} else {
				simply.defer(function(){
					var ready = true, i = 0, len = scripts.length, name;
					for (; i < len; i++) {
						name = scripts[i].modulename;
						if (scripts[i].error === true) {
							errors.push({
								message : "the request url '" + scripts[i].src + "' is incorrect"
							});
						} else if (scripts[i].ready === true) {
							if (modulesCache[name] === undefined) {
								modulesCache[name] = simply[name];
							}
							data[name] = simply[name];
						} else {
							ready = false;
						}
					}
					return ready;
				}, function(){
					callback && callback(data, errors);
				});
			}
		},
		// 50ms per time
		defer : function(cond, fn, timeout){
			var time = timeout === undefined ? -1 : timeout; 
			if (cond === true || (simply.isFunction(cond) && cond())) {
				fn && fn();
			} else if (time < 0 || !((time - 50) < 0)) {
				setTimeout(function(){
					simply.defer(cond, fn, time - 50);
				}, 50)
			}
		},
		trim : function(s){
			return (s + "").replace(rtrim, "");
		},
		isWindow : function(win){
			//weak
			return obj != null && obj == obj.window;
		},
    	isFunction : function(f){
			return typeof f === "function";
		},
    	isArray : (Array.isArray && Array.isArray([]) === true && Array.isArray({}) === false) ? Array.isArray :  function(e){
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
			// filter the objects created by new, except new Object()
			if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, "hasOwnProperty")) {
				return false;
			}
			var key;
			for (key in obj) {}
			return key === undefined || core_hasOwn.call(obj, key);  
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
    			ret = simply.isFunction(fun) ? fun(arr[i], i) : fun;
    			rets.push(ret);
    		}
    		return rets;
    	}
    });
    simply.each("Number|Array|Object|Function|Null|Undefined|Date|RegExp|String".split("|"), function(e){
    	class2type["[object " + e + "]"] = e.toLowerCase(); 
    });
	window.simp = simply;
	/* tool functions */
	function insertScriptNode(uri, name){
    	var script = doc.createElement("script"),
    		source;
    	//set src
    	if (uri.indexOf(".js") > 0 || uri.indexOf("?") > 0) {
    		source = uri;
    	} else if (uri[uri.length - 1] === "/"){
    		source = uri + name + ".js?version=1.0";
    	} else {
    		source = uri + "/" + name + ".js?version=1.0";
    	}
    	script.onload = function(){
    		script.ready = true;
    	};
    	script.onerror = function(){
    		script.ready = true;
    		script.error = true;
    	}
    	script.modulename = name;
    	script.type = "text/javascript";
    	script.src = source;
    	doc.body.appendChild(script);
    	return script;
	}
	//for ie6,7,8
	(function(){
		if (Array.prototype.indexOf === undefined) {
			Array.prototype.indexOf = function(e){
				var index = -1, i = 0;
				for (; i < this.length; i ++) {
					if (e === this[i]) {
						index = i;
						break;
					}
				}
				return index;
			}
		}
	}());
}(window));