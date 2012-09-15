/* depende jquery */
//namespace
this.util = this.util || {};
(function () {
	
	var CVersion = function(){};
	var proto = CVersion.prototype;
	
	var win = $(window);
	var doc = $(document);
	var navi = navigator;
	var uAgent = navi.userAgent;
	
	/* browser information */
	/* return result object { platform:"", version:"", } 
	return { "appCodeName":"Mozilla"
	, "appName":"Netscape"
	, "appVersion":"5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1"
	, "cookieEnabled":"true"
	, "userAgent":"User-agent header: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1" }*/
	function getNaviInfo(){	return navi; }
	
	function isBoxModel(){ return $.support.boxModel; }

	function isTouch(){ return $.support.touch; }

	proto.toString = function(){
		var txt = "<b>Browser appCodeName: </b>" + navi.appCodeName + "</br>";
		txt += "<b>Browser appName: </b>" + navi.appName + "</br>";
		txt += "<b>Browser appVersion: </b>" + navi.appVersion + "</br>";
		txt += "<b>Cookies cookieEnabled: </b>" + navi.cookieEnabled + "</br>";
		txt += "<b>Platform: </b>" + navi.platform + "</br>";
		txt += "<b>User-agent header: </b>" + navi.userAgent + "</br>";
		return txt;
	}

	function getBrowserinfoToString(){
		var str = '';
		$.each( $.browser, function(i, val) {
			str += "<div>" + i + " : <span>" + val + "</span>";
		});
		return str;
	}
	
	function getBrowserinfoObject(){ return $.browser; }
	
	proto.getBrowserinfo = function(type){		
		var result = null;
		type = ( type || "" );
		if( type.indexOf("html") > -1 ){
			result = getBrowserinfoToString();
		}else{
			result = getBrowserinfoObject();
		}
		return result;
	}
	
	/* device information */	
	function isIos(){ return (uAgent.match(/(iPad|iPhone|iPod)/i) ? true : false ); }
	
	function isAndroid(){ return (uAgent.match(/(android)/i) ? true : false ); }
	
	function isWebOS(){ return (uAgent.match(/(webOS)/i) ? true : false ); }
	
	function isWindow(){ return (uAgent.match(/(Windows Phone [1-6])/i) ? true : false ); }
	
	function isMobile(){ return isIos() || isAndroid() || isWebOS() || isWindow() || isMobile() }
	
	function getIosVersion(){
		var version = '-1';
		if( isIos() ){
			version = ( !!win.history && !!win.history.pushState ? '4+' : '4-' );
			if( !!win.matchMedia ){ iOSversion = '5+'; }
		}
		return version;
	}
	
	function getAndroidVersion(){
		var version = '-1';
		if( isAndroid() ){
			version = ( !win.orientation ? '2+' : '4+' );
		}
		return version;
	}
	
	proto.getDeviceVersion = function(){
		return { "ios": getIosVersion(), "android": getAndroidVersion() };
	}

	proto.demo = function(){
		doc.ready(function() {
			var result = proto.getBrowserinfo('html')
			, device = proto.getDeviceVersion();
			
			var html = '';
			html += proto.toString() + "<br/>";
			html += result;
			html += "<br/> ios: "+ device.ios + ", android: "+ device.android;
			html += "<br/>";
			trace( html );
		});
	}
	
	util.CVersion = CVersion;
}());


