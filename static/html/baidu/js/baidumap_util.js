// baidu map load function 
(function(){
	// help function
	function loadBaiduMap(fn) {
		if (window.BMap) {
			fn && fn(window.BMap);
			return;
		}
		var init = false;
		var body = document.body;
		var baiduScript = document.createElement("script");
		var exec = function () {
			init === false && fn !== null && fn(window.BMap);
			init == true;
		};
		baiduScript.onload = exec;
		window.onloadMap = exec;
		baiduScript.src = "http://api.map.baidu.com/api?v=2.0&ak=ZKUo1GseRPjjS9DX6tq3GyiF&callback=onloadMap"; 
		body.appendChild(baiduScript);
	}

	// public interface
	var MAP = function(){
		return {
			loadMap : loadBaiduMap,
		};
	}();
	window.BAIDU_MAP = MAP;
}());