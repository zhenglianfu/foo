// baidu map load function 
(function(Math){
	var aks = "GZFLMfvPktH5pmCGcEFkj9m4|ZKUo1GseRPjjS9DX6tq3GyiF|adRwIWYzfFDWXsgSDPRKFTCB|5lgsp4vEZd0Lz1yZYz1lIbc0".split("|"),
		aks_length = aks.length;
	// help function
	function loadBaiduMap(fn) {
		if (window.BMap) {
			fn && fn(window.BMap);
			return;
		}
		var body = document.body;
		var baiduScript = document.createElement("script");
		var exec = function () {
			extendMAP(window.BMap);
			fn && fn(window.BMap);
		};
		var ak = null;
		while(ak == null || ak === ""){
			ak = aks[(Math.random() * aks_length) >> 0];
		}
		window.onloadMap = exec;
		baiduScript.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=onloadMap"; 
		body.appendChild(baiduScript);
	}
	// public interface
	var MAP = function(){
		return {
			loadMap : loadBaiduMap
		};
	}();
	// extend MAP, after load MAP
	function extendMAP(map){
		var mapInstances = {};
		return extend(MAP,{
			createMap : function(id){
				if (mapInstances[id]) {
					return mapInstances[id];
				} else {
					var m = new map.Map(id);
					mapInstances[id] = m;
					return m; 
				}
			},
			createPoint : function(long, lat){
				return new map.Point(long, lat);
			},
			createNavigator : function(opts){
				return new map.NavigationControl(opts);
			},
			createScaler : function (opts) {
				return new map.ScaleControl(opts);
			},
			fixedByBrowser : function(mapInstance){
				var geolocation = new map.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var mk = new map.Marker(r.point);
						mapInstance.addOverlay(mk);
						mapInstance.panTo(r.point);
					}
				},{enableHighAccuracy: true});
			},
			fixedByIP : function(mapInstance){
				var city = new map.LocalCity();
				city.get(function(res){
					mapInstance.setCenter(res.name);
				});
			},
			createMarker : function(point) {
				var point = arguments[0],
					type = typeof point;
				if (type === "object") {
					return new map.Marker(point);
				} else {
					return new map.Marker(MAP.createPoint(point, arguments[1]));
				}
			},
			createInfoWin : function(html){
				return new map.InfoWindow(html);
			},
			addMenu : function(mapInstance, menus){
				menus = menus || [];
				var i = 0, len = menus.length, baiduMenu = new map.ContextMenu();
				for (; i < len; i++) {
					baiduMenu.addItem(new map.MenuItem(menus[i].text, menus[i].fn, 300));
				} 
				mapInstance.addContextMenu(baiduMenu);
			}
		});
	}
	function extend() {
		var target = arguments[0] || {},
			i = 1, len = arguments.length, src, p;
		while(i < len) {
			src = arguments[i];
			i ++;
			if (src) {
				for (p in src) {
					if (src[p] != null) {
						target[p] = src[p];
					} 
				}
			}
		}
	}
	window.baiduMapUtil = MAP;
}(Math));