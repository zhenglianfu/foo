(function(){
	function Message(opts,$ele) {
		var foo = function(){};
		var _default = {
				modal : false,
				title : "",
				type : "tip",
				ok : foo,
				cancel : foo,
				message : "",
				width:"350px",
				height:"170px"
		};
		opts = opts || {};
		for (var i in opts) {
			_default[i] = opts[i];
		}
		function init() {
			var _this = this;
			this.$warp = $("<div>");
		}
		init();
	}
	$.fn.msg = function(opts,params){
		var message = this.data("_msg");
		if (typeof opts === "string") {
			return message.fn[opts](params);
		}
		if (message) {
			//reset
		} else {
			//init
			var message = new Message(opts);
			this.data("_msg",message);
		}
	};
})(window,$);