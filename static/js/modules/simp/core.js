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
			default_url = function(){
				var scripts = document.getElementsByTagName("script"),
					   src = scripts[scripts.length - 1].src;
				return src.substr(0, src.lastIndexOf("/") + 1) ;
			}(),
			simply = {
				isFunction : function(f){
					return typeof f === "function";
				},
				extend : function(){
					var src, copyIsArray, copy, name, options, clone,
					target = arguements[0] || {},
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
					
				},
				require : function(m_name, uri, callback){
					
				},
				type : function(e){
					core_toString
				}
	};
	window.simp = simply;
}(window));