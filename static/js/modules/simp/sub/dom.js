/**
 *  @doc dom module of simp
 *  @author fuzhenglian
 *  @version 1.0
 *  @date 2014-06-10
 */
(function(window){
	var sim = window.simp || {},
	doc = window.document,
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	Selector = function(str, context){
		
	},
	isRoot = function(node){
		return node === window || node === doc || node === doc.body;
	},
	Node = function Node(nodes){
		var i, len; 
		if (!(this instanceof nodes)) {
			return new Node(arguments);
		}
		nodes = nodes || [];
		for (i = 0, len = nodes.length; i < len; i ++) {
			this[i] = nodes[i];
		}
		this.length = len;
	};
	Node.prototype = {
			size : function(){
				return this.length;
			},
			eq : function(int){
				var len = this.length;
				return _(this[int]);
			},
			css : function(){
				return this;
			},
			addClass : function(clazz){
				return this;
			},
			removeClass : function(clazz){
				return this;
			},
			remove : function(){
				return this;
			},
			append : function(){
				
			},
			after : function(){
				
			},
			before : function(){
				
			},
			next : function(){
				
			},
			prev : function(){
				
			},
			parent : function(){
				
			},
			parents : function(p){
				
			},
			children : function(){
				
			},
			first : function(){
				
			},
			firstChild : function(){
				
			},
			last : function(){
				
			},
			lastChild : function() {
				
			},
			offset : function(){
				
			},
			width : function(){
				
			},
			outWidth : function(){
				
			},
			height : function(){
				
			},
			outHeight : function(){
				
			},
			show : function(){
				
			},
			hide : function(){
				
			},
			hasClass : function(clazz){
				
			},
			is : function(){
				
			},
			html : function(){
				
			},
			text : function(){
				
			},
			attr : function(){
				
			},
			data : function(){
				
			}
	};
	Node.find = function(){
		return Node(Selector(arguments));
	};
	sim.dom = Node;
	window.simp = sim;
}(window));