(function(window){
	function Node(ele){
		var i, len;
		if (!(this instanceof Node)) {
			return new Node(ele);
		}
		if (ele && ele.length){
			for (i = 0, len = ele.length; i < len; i++) {
				this[i] = ele[i];
			}
			this.length = len;
		} else {
			this[0] = ele;
			ele && ele.nodeType ? (this.length = 1) : (this.length = 0);
		}
	}
	
	Node.prototype = {
			text : function(html){
				var i, len = this.length;
				if (html == null) {
					return this[0] && this[0].nodeType == 1 ? this[0].innerHTML.replace(rnottag, "")  : "";
				} else {
					html += "";
					html = html.replace(rnottag, "");
					for (i = 0; i < len; i++) {
						if (this[i] && this[i].nodeType == 1) {
							this[i].innerHTML = html;
						}
					}
				}
				return this;
			},
			html : function(html){
				var i, len = this.length;
				if (html == null) {
					this[0] && this[0].nodeType == 1 ? this[0].innerHTML : "";
				} else {
					html += "";
					for (i = 0; i < len; i++) {
						if (this[i] && this[i].nodeType == 1) {
							this[i].innerHTML = html;
						}
					}
				}
				return this;
			},
			attr : function(key, value){
				var e = this[0], attrs, i, len, index;
				if (e && e.nodeType && key) {
					attrs = e.attributes
					for (i = 0, len = attrs.length; i < len; i++) {
						if (attrs[i].name == key) {
							index = i;
							break;
						}
					}
					if (index == null) {
						return null;
					} else if(value){
						attrs[i].nodeValue = value;
					} else {
						return attrs[i].nodeValue; 
					}
				}
				return this;
			},
			addClass : function(name){
				var i = 0, len = this.length, list;
				for (; i < len; i++) {
					if (this[i] && this[i].classList){
						list = this[i].classList;
						list.add(name);
					} 
				}
				return this;
			},
			removeClass : function(name){
				var i = 0, len = this.length, list, cur, classes, j, clazz;
				classes = (name || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					if (this[i] && this[i].className){
						cur = " " + this[i].className + " ";
						j = 0;
						while((clazz = classes[j++])){
							cur = cur.replace(" " + name + " ", " ");
						}
						cur = cur ? trim(cur) : "";
						this[i].className == cur ? false : (this[i].className = cur);
					} 
				}
				return this;
			}
	}
	var rnotwhite = /\S+/g;
	var rnottag = /(<\w+>)|(<\\\w+>)/g;
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	var trim = function(str){
		return str == null ? 
				"" : (str + "").replace(rtrim, ""); 
	}
	var str = "I do something";
	var listener = function(e){
		var element = e.target, btn, clazz;
		if (element.nodeName == "BUTTON") {
			demoButton.removeClass("bounceInLeft");
			btn = Node(element);
			clazz = btn.attr("data-test");
			demoButton.addClass(clazz).text(btn.text());
			setTimeout(function(){
				demoButton.removeClass(clazz);
				demoButton.text(str);
			}, 1500)
		}
	};
	var doc = window.document;
	var demoButton = Node(doc.getElementById("demo_button"));
	var container = doc.getElementsByClassName("container")[0];
	if(container.addEventListener){
		container.addEventListener("click", listener);
	} else if (container.attachEvent) {
		container.attachEvent("click", listener);
	} else {
		container.onclick = listener;
	}
}(window, window.simp));