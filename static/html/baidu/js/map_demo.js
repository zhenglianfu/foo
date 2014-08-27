(function(){
	var mapUtil = window.baiduMapUtil,
		map;
	// load MAP and exec the init function
	mapUtil.loadMap(function(bMap){
		var point = mapUtil.createPoint(116.404, 39.915),
		navigator = mapUtil.createNavigator();
		map = mapUtil.createMap("map_1");
		map.centerAndZoom(point, 14);
		map.enableScrollWheelZoom();
		map.addControl(navigator);
		mapUtil.fixedByIP(map);
		mapUtil.addMenu(map, [{text : "添加标记", fn : function(location, point){
			var marker = mapUtil.createMarker(location.lng, location.lat),
				infoWin = mapUtil.createInfoWin("<div><h3>标记</h3><p>这是一条神奇的天路哎</p></div>");
			map.addOverlay(marker);
			marker.addEventListener("click", function(){
				this.openInfoWindow(infoWin);
			});
		}}]);
	});
}());