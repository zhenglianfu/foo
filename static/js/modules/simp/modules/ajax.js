(function(simp){
	window.simp = simp || {};
	function xhrFactory() {
		if (window.XMLHTTPRequest) {
			return new XMLHttpRequest();
		} else {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	var foo = simp.foo || function(){},
	defaultOpt = {
		url : "",
		type : "GET",
		data : {},
		success : foo,
		error : foo,
		always : foo,
		async : true,
	};
	simp.ajax = {
		get : function(){
			
		},
		post : function(){
			
		},
		request : function(option){
			var xhr = xhrFactory(),
				opt = simp.extend({}, defaultOpt, option);
			xhr.onreadystatechange=function() {
			  if (xhr.readyState==4 && xhr.status==200) {
						  var data = xhr.responseText;
						  try{
							  data = JSON.parse(data);
							  opt.success(data);
						  }catch(e){
							  opt.success(data);
							  	opt.always();
						  }
			    }else if(xhr.readyState==4 && xhr.status >= 400){
			    		var data = xhr.responseText;
			    		opt.error(data);
			    		opt.always();
			    }
			  };
			xhr.open(opt.type.toUpperCase, opt.url, opt.async);
			xhr.send(opt.data);
		}
	};
}(window.simp));