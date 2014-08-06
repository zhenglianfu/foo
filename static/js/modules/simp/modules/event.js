/**
 * @author zhenglianfu
 * @date 2014-07-23
 */
(function(window){
	var simp = window.simp || {},
		doc = window.document,
		dom, Event, div;
	simp.require("dom", function(data, errors){
		dom = data.dom;
		div = dom("<div>");
		// 复制一份dom的prototype后再扩展， 或者借用dom的方法（for遍历添加）， 或者直接在dom的prototype上扩展
		// 首先要访问到dom的构造函数Node， 创建一个dom对象后constructor.prototype?或者开一个后门，
		// 模式借鉴，包装器，借用，
		// 尽量不去污染 各个模块的构造函数，移除模块后保持行为正常，即分离设计
		function contain(a, b){
			return true;
		}
		Event = function(e){
			this.e = e;
		};
		Event.prototype = {
				stopPropagation : function(){},
				preventDefault : function(){}
		};
		simp.event = {
				addEvent : function(ele, type, fn){
					
				},
				on : function(node, type, selector, fn){
					var i, len;
					if (typeof selector === "function") {
						fn = selector;
						selector = "*";
					}
					if (typeof node.length === "number") {
						i = 0, len = node.length;
						for (; i < len; i++) {
							addEvent(node[i], type,( function(){
								var p = node[i];
								return function(e){
									if (contain(p, e.target)) {
										fn.apply(e.target, e);
									}
								};
							}(i)));
						}
					}
				},
		};
		window.simp = simp;
	});
}(window))
