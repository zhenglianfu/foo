/**
 *  @doc dom module of simp
 *  @author fuzhenglian
 *  @version 1.0
 *  @date 2014-06-10
 */
(function(window){
	var sim = window.simp || {},
	Selector = function(str){
		
	},
	_ = function _(nodes){
			if (!(this instanceof nodes)) {
				return new _(arguments);
			}
			nodes = nodes || [];
			
	};
	_.prototype = {
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
	_.find = function(){
		return _(Selector(arguments));
	};
	sim.dom = _;
	window.simp = sim;
}(window));