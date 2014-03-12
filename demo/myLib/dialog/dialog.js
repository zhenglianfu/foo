(function(){
	var $noop = function() {};
	function Dialog(opts, $ele){
		var _default = {
			title : "",
			width:0,
			height:0,
			onClose : $noop,
			autoOpen : true,
			modal : false
		};
		opts = opts || {};
		for (var i in opts) {
			_default[i] = opts[i];
		} 
		var _e = $ele;
		var _this = this;
		this._init_ = function(){
			_this.$warp = $("<div>").addClass("ui-dialog").height(_default.height || 0).width(_default.width || 0).appendTo($("body"));
			_this.$warp.append($("<div>").addClass("ui-dialog-title").text(_default.title)).append($("<div>").addClass("ui-dialog-toolbar").append($("<a>").addClass("ui-dialog-close").click(function(){
				_this.fn.close();
			})).append($("<a>").addClass("ui-dialog-max").click(function(){
				//TODO  最大化,还原
			})).append($("<a>").addClass("ui-dialog-max").click(function(){
				//TODO  最大化,还原
			}))).append($("<div>").addClass("ui-dialog-content").append($ele));
			var left = (window.innerWidth - _default.width) / 2 > 0 ? (window.innerWidth - _default.width) / 2 : 0;
			var top = (window.innerHeight - _default.height) / 2 > 0 ? (window.innerHeight - _default.height) / 2 : 0;
			_this.$warp.css({"top":top,"left":left});
			if (_default.autoOpen) {
				_this.$warp.show();
			} else {
				_this.$warp.hide();
			}
		};
		this.fn = {
				open : function(){
					if(!_this.$warp.is(":visible")){
						_this.$warp.show();
					}
				},
				close : function(){
					if(_this.$warp.is(":visible")){
						_this.$warp.hide();
						_default.onClose();
					}
				},
				destroy : function(){
					var $clone_e = _e.clone().data("dialog","destroy");
					_this.$warp.parent().empty().append($clone_e);
				} 
		};
	};
	Dialog.prototype.toString = function(){
		return "";
	};
	$.fn.dialog = function(opts,params){
		var _this = this;
		var dialog = _this.data("dialog");
		if (typeof opts === "string") {
			return dialog.fn[opts](params);
		} 
		if (_this.data("dialog")) {
			
			//重新定义
		} else {
			var dialog = new Dialog(opts,this);
			//初始化
			dialog._init_();
			_this.data("dialog",dialog);
		}
	};
})($);