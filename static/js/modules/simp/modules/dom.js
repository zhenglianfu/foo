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
	tagExpr = /^<([a-zA-Z0-9]+)\s*([a-zA-Z0-9='"\s]*)>(.*)/,
	rEndTag = /<\/([a-zA-Z0-9]+)\s*>$/,
	endTagStart = /^<\/([a-zA-Z0-9]+)\s*>/;
	// ie6,7,8 don't support getElementsByClassName
	Selector = function(){
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			chracters = /[a-z]/,
			rnowhite = /\s+/g,
			id = /^#\w+$/,
			klass = /^\.\w+/,
			attr = /\[(\w+)(=('|")?(\w+)).*\]/,
			rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			rsibling = /[\x20\t\r\n\f]*[+~]/,
			rinputs = /^(?:input|select|textarea|button)$/i,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
			// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
			whitespace = "[\\x20\\t\\r\\n\\f]",
			// http://www.w3.org/TR/css3-syntax/#characters
			characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			identifier = characterEncoding.replace( "w", "w#" ),
			// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
			operators = "([*^$|!~]?=)",
			attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
					"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
			pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",
			core_slice = Array.prototype.slice,
			core_push = Array.prototype.push,
			matchExpr = {
				"ID" : new RegExp("^#(" + characterEncoding + ")"),
				"CLASS" : new RegExp("^\\.(" + characterEncoding + ")"),
				"ATTR" : new RegExp("^" + attributes),
				"NAME" : new RegExp(),
				"TAG" : new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
				"CHILD" : new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
						"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
						"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
				"PSEUDO" : new RegExp("^" + pseudos)
			},
			rwhite = function(e){
				return (e + "").replace(rnowhite, "");
			},
			trim = function(e){
				return (e + "").replace(rtrim, "");
			},
			getElementsByClassName = function(className, context, tagName){
				var nodes = [], temp, i, len,
				 	pattern;
				tagName = tagName || "*";
				context = context || doc.body;
				if (context.getElemetsByClassName) {
					nodes = core_slice.apply(context.getElementsByClassName(className));
				} else {
					 pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
					// IE8-
					nodes = context.getElementsByTagName(tagName);
					temp = [];
					for (i = 0, len = nodes.length; i < len; i++) {
						if (pattern.test(nodes[i].className)) {
							temp.push(nodes[i]);
						}
					}
					nodes = temp;
				}
				return nodes;
			},
			query = function(factor, context){
				var nodes = [], i = 0, len;
				factor = rwhite(factor) ;
				context = typeof context === "string" ? Selector(context) : (context.length == null && context.nodeType === ELE_TYPE) ? [context] : context;
				for (len = context.length; i < len; i ++) {
						if (context[i].nodeType !== ELE_TYPE) {
							continue;
						}
						
				}
				return nodes;
			},
			fliter = function(nodes, p){
				var t = []
				return t;
			};
		doc.getElementsByClassName ? true : (doc.getElementsByClassName = getElementsByClassName);
		/**
		 *  test 
		 *  
		 * */
		window.matchExpr = matchExpr;
		/**
		 * test end
		 * */
		return function(str, context){
			var strs = str.split(","), nodes = [], len,
				selects;
			if (strs.length > 1) {
				for (var i = 0, len = strs.length; i < lne; i++ ) {
					nodes.concat(Selector(strs[i], context));
				}
			}
			context = context || doc.body;
			if (strs.length == 1) {
				selects = simp.trim(strs[0]).split(" ");
				var length = selects.length;
				nodes = query(trim(strs[--length]), context);
				if (nodes.length > 0) {
					while (length > 0 && nodes.length > 0) {
						nodes = filter(nodes, trim(strs[--length]));
					}
				}
			}
			return nodes;
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
				var i = 0, len = this.length;
				clazz = (clazz + "").split(",").join(" ");
				for (; i < len; i++) {
					if (this[i] && this[i].nodeType === ELE_TYPE) {
						this[i].className = this[i].className + " " + clazz;
					}
				}
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
			throw {
				name : "invalidate arguments",
				message : "不合法的参数"
			}
		} else if (typeof s === "string") {
			if (tagExpr.test(s)) { // is tags 
				var tags = s.match(tagExpr),
					nodes = [],
					index = 0,
					insert = true,
					currentTag = "",
					currentElement = null;
				while(tags && tags[1]){
					if (tags[3] && endTagStart.test(tags[3])) {
						insert = false;
					} else {
						insert = true;
					}
					if (nodes[index] == null) {
						nodes.push(doc.createElement(tags[1]));
						currentElement = nodes[index];
					} else if (insert) {
						currentElement ? currentElement.appendChild(doc.createElement(tags[1])) :
								nodes[index].appendChild(doc.createElement(tags[1])); 
					} else {
						currentElement.parentNode.appendChild(doc.createElement(tags[1]));
					}
					currentTag = tags[1];
					tags = tags[3] && tags[3].match(tagExpr);　
				}
				return Node(nodes);
			} else { // query 
				return Node(Selector(s, context))
			}
		} else if (s.nodeType === 1) {
			return Node([s]);
		} else if (s.length) {
			return Node(s);
		}
	};

	window.simp = sim;
}(window));