(function(){
	$.fn.drag = function(){
		var $this = this;
		if ($this.data("ui-draggable")) {
			return;
		} else {
			_init();
		}
		function _init(){
			$this[0].style.position = "absolute";
			$this.data("ui-draggable",true);
			bindEvent();
		}
		function bindEvent(){
			var m_left = 0,
				m_top = 0,
				e_left = $this.offset().left,
				e_top = $this.offset().top,
				key = 0;
			$this.on("mousedown","*",function(event){
				if (isFF() && event.button == 0) {
					key = 1;
				} else if(isChrome()){
					key = event.which;
				} else if(isIE()){
					key = event.button;
				}
				if (key == 1) {
					m_left = event.clientX,
					m_top = event.clientY;
					this.style.cursor = "move";
					//持续获取mouse事件
					this.setCapture();
				}
				return true;
			});
			
			function render(event){
				
			}
			
			$this.on("mousemove","*",function(event){
				if (key == 1) {
					var d_x = event.clientX - m_left,
						d_y = event.clientY- m_top;
					$this[0].style.top = e_top + d_y + "px",
					$this[0].style.left = e_left + d_x + "px";
				}
				return true;
			});
			$this.on("mouseup","*",function(event){
				//重设
				key = 0,
				e_left = $this.offset().left,
				e_top = $this.offset().top;
				//释放鼠标
				this.releaseCapture();
				this.style.cursor = "default";
			});
		}
	};
	
	$(".ui-draggable").drag();
	function isFF(){
		return window.navigator.userAgent.indexOf("Firefox") > 0;
	}
	
	function isChrome(){
		return window.navigator.userAgent.indexOf("Chrome") > 0;
	}
	
	function isIE(){
		return window.navigator.userAgent.indexOf("MSIE") > 0;
	}
	
})(window,$);