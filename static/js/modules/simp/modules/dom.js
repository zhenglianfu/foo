/**
 *  @doc dom module of simp
 *  @author fuzhenglian
 *  @version 1.0
 *  @date 2014-06-10
 */
(function(window){
	var sim = window.simp || {},
	ELE_TYPE = 1,
	doc = window.document,
	// ie6,7,8 don't support getElementsByClassName
	Selector = function(){
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			rwhite = /\s+/g,
			id = /^#\w+$/,
			trim = function(e){
				return (e + "").replace(rtrim, "");
			},
			query = function(factor, context){
				var nodes = [], i = 0, len;
				context = typeof context === "string" ? Selector(context) : (context.length == null && context.nodeType === ELE_TYPE) ? [context] : context;
				for (len = context.length; i < len; i ++) {
					
				}
				return nodes;
			},
			fliter = function(nodes, p){
				var t = []
				return t;
			};
		return function(str, context){
			var strs = str.split(","), nodes = [], len = strs.length - 1;
			context = context || doc.body;
			if (strs.length > 0) {
				nodes = query(trim(strs[length - 1]), context);
				if (nodes.length > 0) {
					while (len > 0 && nodes.length > 0) {
						nodes = filter(nodes, trim(strs[len--]));
					}
				}
			}
			return ndoes;
		};
	}(),
	isRoot = function(node){
		return node === window || node === doc || node === doc.body;
	},
	// nodes must be array like
	Node = function Node(nodes){
		var i, len, count = 0, isCollection = false; 
		if (!(this instanceof Node)) {
			return new Node(nodes);
		}
		nodes = nodes || [];
		isCollection = nodes.length !== undefined && nodes.nodeType !== ELE_TYPE ? true : false;
		this.length = 0;
		if (isCollection) {
			for (i = 0, len = nodes.length; i < len; i ++) {
				if (nodes[i] != null && nodes[i].nodeType === 1) {
					this[count] = nodes[i];
					count ++;
				}
			}
			this.length = count;
		} else if (nodes) {
			 this.length = 1;
			 this[0] = 0; 
		}
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
			hasClass : function(){
				return false;
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
				var i = 0, len = this.length, nodes = [];
				for (; i < len; i++) {
					this[i] && this[i].parentNode && nodes.push(this[i].parentNode)
				}
				return Node(nodes);
			},
			parents : function(p){
				
			},
			children : function(){
				var i = 0, len = this.length, nodes = [], j, c, children;
				for (; i < len; i++) {
					if (this[i]) {
						children = this[i].children; 
						for (j = 0, c = children.length; j < c; j++) {
							nodes.push(children[j]);
						}
					}
				}
				return Node(nodes);
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
				var top = 0, left = 0, p;
				if (this[0]) {
					top = this[0].offsetTop;
					left = this[0].offsetLeft;
					p = this[0];
					while((p = p.offsetParent) !== null){
						top += p.offsetTop;
						left += p.offsetLeft;
					}
				}
				return {
					top : top,
					left : left
				};
			},
			offsetParent : function(){
				var i = 0, len = this.length, nodes = [];
				for (; i < len; i++) {
					this[i] && this[i].offsetParent && nodes.push(this[i].offsetParent);
				}
				return Node(nodes);
			},
			width : function(w){
				if (w === undefined) {
					return this.outWidth();
				}
				return this;
			},
			outWidth : function(){
				return (this[0] && this[0].offsetWidth) || 0;
			},
			height : function(h){
				if (h === undefined) {
					return this.outHeight();
				}
				return this;
			},
			outHeight : function(){
				return (this[0] && this[0].offsetHeight) || 0; 
			},
			show : function(){
				return this;
			},
			hide : function(){
				return this;
			},
			hasClass : function(clazz){
				return false;
			},
			is : function(){
				return false;
			},
			html : function(html){
				return this;
			},
			text : function(text){
				return this;
			},
			attr : function(k, v){
				return this;
			},
			hasAttr : function(k){
				return false;
			},
			removeAttr : function(k){
				return this;
			},
			data : function(k, d){
				return this;
			},
			find : function(selector){
				return Node(Selector(selector, this));
			}
	};
	sim.dom = function(s, context){
		if (s == null || sim.trim(s) === "") {
			return Node();
		} else if (typeof s === "string") {
			// is tag create?
			
		} else if (s.nodeType === 1) {
			return Node([s]);
		} else if (s.length) {
			return Node(s);
		}
	};

	/**
	 *  for test 
	 *  TODO delete it later;
	 * */
	//TODO delete it later;
	sim.dom = Node;
	window.simp = sim;
}(window));