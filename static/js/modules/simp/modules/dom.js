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
	rnowhite = /\S+/g,
	tagExpr = /^<([a-zA-Z0-9]+)\s*([a-zA-Z0-9='"\s]*)>(.*)/,
	rEndTag = /<\/([a-zA-Z0-9]+)\s*>$/,
	endTagStart = /^<\/([a-zA-Z0-9]+)\s*>/;
	// ie6,7,8 don't support getElementsByClassName
	// document.querySelectAll(cssSelector)
	// document.querySelect(cssSelector)
	Selector = function(){
		var arr = [],
			push = arr.push,
			slice = arr.slice,
			rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
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
			};
		var Expr = {
				cacheLength : 32,
				match : matchExpr,
				preFilter : {
					"ATTR" : function(){},
					"CHILD" : function(){},
					"PSEUDO" : function(){}
				},
				fliter : {
					"TAG" : function(nodeName){
						if (nodeName === "*") {
							return function(){
								return true;
							}
						} 
						nodeName = nodeName.toLowerCase();
						return function(elem){
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName; 
						}
					},
					"CLASS" : function(className){
						var p = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" );
						return function(elem){
							return p.test(elem.className || (ele.getAttribute && ele.getAttribute("class")) || "");
						}
					},
					"ATTR" : function(name, operate, check){
						return function(){
							
						}
					}
 				}
		};
		// for other select
		var select = function(str, context, result){
			
			return result;
		};
		// a contain b ?
		var contain = doc.contains || docElem.compareDocumentPosition ? function(a, b){
			var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
			return adown === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : adown.compareDocumentPosition &&
						adwon.compareDocumentPosition(bup) & 16) );
		} : function(a, b){
			while(b){
				if ((b = b.parentNode)){
					if (b === a) {
						return true;
					}
				} 
			}
			return false;
		}
		return function(str, context, result){
			var nodeType, elem, m;
			context = context || doc;
			result = result || []; 
			if (!str || typeof str !== "string") {
				return result;
			}
			if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
				return [];
			}
			// quick match id, tag, class
			if ((match = rquickExpr.exec(str))) {
				// ID
				if ((m = match[1])) {
					// context is document
					if (nodeType === 9) {
						elem = context.getElementById( m );
						// ie will get the name matched the id
						if (elem.id == m) {
							result.push(elem);
							return result;
						} else {
							return result;
						}
					} else {
						// context is not document
						if (context.ownerDocument && (elem = context.ownerDocument.getElemetById(m)) && elem.id == m && contain(context, elem)) {
							result.push(elem);
							return result;
						} else {
							return result;
						}
					}
				}
				// tag
				else if ((m = match[2])) {
					push.apply(result, slice.call(context.getElementsByTagName(m) , 0));
					return result;
				}
				// class
				else if ((m = match[2])) {
					push.apply(result, slice.call(getElementsByClassName(m, context) , 0));
					return result;
				}
			}
			// not match quick expr
			if (context.querySelectorAll) {
				var old = true,
					group = str.split(","),
					i = 0,
					nid = "foo-" + new Date().getTime(),
					newContext = context,
					newSelector = nodeType === 9 && str; // must be root
				// IE 8 doesn't work on object elements
				// add id to the elem to work around
				if (nodeType === 1 && newContext.nodeName.toLowerCase() !== 'object') {
					if ((old = newContext.getAttribute("id"))) {
						nid = old.replace("", "");
					} else {
						context.setAttribute("id", nid);
					}
					nid = "[id='" + nid + "']";
					newContext = rsibling.test(str) && context.parentNode || context;
					while(group[i++]) {					
						group[i] = nid + " " + group[i];
					}
					newSelector = group.join(",");
				} 
				if (newSelector) {
					try{
						push.apply(result, slice.call(newContext.querySelectorAll(newSelector), 0));
						return result;
					} catch(e){
						// log
					}finally{
						if (!old) {
							context.removeAttribute("id");
						}
					}
				}
			}
			// all other select
			return select(str, context, result);
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
			each : function(fn){
				if (fn && sim.isFunction(fn)) {
					for (var i = 0, len = this.length; i < len; i++) {
						fn.call(this[i], i, this[i]);
					}
				}
				return this;
			},
			map : function(fn){
				return sim.map(this, fn);
			},
			size : function(){
				return this.length;
			},
			eq : function(int){
				var len = this.length;
				return Node([this[int < 0 ? len + int : int]]);
			},
			css : function(opt){
				var i, ele, len = this.length, p;
				opt = opt || {};
				for (; i < len; i++) {
					//TODO add style
				}
				return this;
			},
			addClass : function(clazz){
				var i = 0, len = this.length, ele, classes, cur, j, clen;
				classes = ((clazz || "").match(rnowhite) || []);
				clen = classes.length;
				for (; i < len; i++) {
					ele = this[i];
					cur = ele && ele.nodeType === ELE_TYPE && (ele.className ? (" " + ele.className + " ") : " ");   
					if (cur) {
						j = 0
						for (; j < clen; j++) {
							if (cur.indexOf(" " + classes[j] + " ") < 0) {
								cur += classes[j] + " ";
							}
						}
						ele.className = sim.trim(cur);
					}
				}
				return this;
			},
			hasClass : function(className){
				var p = new Regexp("(^|\\s)" + className + "(\\s|$)")
				return p.test(this[0] && this[0].className);
			},
			removeClass : function(className){
				var i= 0, len = this.length, j, ele, cur, clen,
					classes = (className || "").match(rnowhite) || [];
				clen = classes.length;
				for (; i < len; i++) {
					ele = this[i];
					cur = ele && ele.nodeType === ELE_TYPE && (ele.className ? " " + ele.className + " " : " ");
					if (cur) {
						j = 0;
						for (; j < clen; j++) {
							cur = cur.replace(" " + classes[j] + " ", " ");
						}
					}
					// remove all if className is not defined
					ele.className = className ? sim.trim(cur) : ""; 
				}
				return this;
			},
			remove : function(){
				var i = 0, len = this.length;
				for (; i < len; i++) {
					this[i] && this[i].remove && this[i].remove();  
				}
				return this;
			},
			prepend : function(){
				
			},
			append : function(){
				
			},
			insertAfter : function(){
				
			},
			insertBefore : function(){
				
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
			is : function(){
				return false;
			},
			html : function(html){
				var i = 0, len = this.length, ele;
				if (html == null) {
					return this[0] && this[0].innerHTML;
				}
				for (; i < len; i++) {
					this[i].innerHTML = html;
				}
				return this;
			},
			text : function(text){
				var i = 0, len = this.length;
				if (text == null) {
					return this[0].textContent;
				} 
				for (; i < len; i++) {
					this[i].textContent = text;
				}
				return this;
			},
			attr : function(k, v){
				var ele = this[0], i, len;
				if (v === undefined) {
					return ele && ele.getAttribute(k);
				} else {
					for (i = 0, len = this.length; i < len; i++) {
						ele = this[i];
						ele && ele.setAttribute(k, v);
					}
				}
				return this;
			},
			hasAttr : function(k){
				var ele = this[0];
				if (k === undefined) {
					return false;
				}
				return ele && ele.hasAttribute && ele.hasAttribute(k); 
			},
			removeAttr : function(k){
				var i = 0, len = this.length;
				k = k + "";
				for (; i < len; i++) {
					this[i].removeAttribute && this[i].removeAttribute(k);
				}
				return this;
			},
			data : function(k, d){
				return this;
			},
			find : function(selector){
				var i = 0, len = this.length, result = [];
				for (; i<len; i++) {
					Selector(selector, this[i], result);
				}
				return Node(result);
			}
	};
	sim.dom = function(s, context){
		var i, len;
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
				// hasContext
				// isString, isNodeList, isMyNodeType, isNull, isHTMLElement
				context = (typeof context === "string" ? Selector(context) : context) || doc;
				if (typeof context.length === "number") {
					var nodes = [];
					for (i = 0, len = context.length; i < len; i++) {
						Selector(s, context[i], nodes);
					}
					return Node(nodes);
				}
				return Node(Selector(s, context))
			}
		} else if (s.nodeType === 1) {
			return Node([s]);
		} else if (s.length != null) {
			return Node(s);
		} else if (s instanceof Node) {
			return s;
		}
		return Node([]);
	};

	window.simp = sim;
}(window));