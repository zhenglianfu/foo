/**
 * @author zhenglianfu
 * @date 2014-07-23
 */
(function(window){
	var simp = window.simp || {},
		dom, Event;
	simp.require("dom", function(data, errors){
		var DomEventExtend, div;
		dom = data.dom;
		div = dom.createElement("div");
		// 复制一份dom的prototype后再扩展， 或者借用dom的方法（for遍历添加）， 或者直接在dom的prototype上扩展
		// 首先要访问到dom的构造函数Node， 创建一个dom对象后constructor.prototype?或者开一个后门，
		// 模式借鉴，包装器，借用，
		// 尽量不去污染 各个模块的构造函数，移除模块后保持行为正常，即分离设计
		Event = function(e){
			
		};
		Event.prototype = {
				stop : function(){},
		};
		DomEventExtend = function(ele){
			
		};
		DomEventExtend.prototype = simp.extend(div, {
			//reset constructor
			constructor : Event,
			addEvent : function(type, fn, catching){
				
			},
			removeEvent : function(type){
				
			}
		});
		simp.event = function(){
			return dom(arguments);
		};
	});
}(window))
