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
	// nodes must be array like
	Node = function Node(nodes){
		var i, len, count = 0; 
		if (!(this instanceof nodes)) {
			return new Node(arguments);
		}
		nodes = nodes || [];
		for (i = 0, len = nodes.length; i < len; i ++) {
			if (nodes[i] != null) {
				this[count] = nodes[i];
				count ++;
			}
		}
		this.length = count;
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
				return Node([this[0]]);
			},
			firstChild : function(){
				
			},
			last : function(){
				return Node([this[this.length - 1]]);
			},
			lastChild : function() {
				
			},
			offset : function(){
				var top = 0, left = 0;
				return {
					top : top,
					left : left
				};
			},
			width : function(w){
				if (w === undefined) {
					return this.outWidth();
				}
				return this;
			},
			outWidth : function(){
				
			},
			height : function(h){
				if (h === undefined) {
					return this.outHeight();
				}
				return this;
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