/* depende jquery */
//namespace
this.util = this.util || {};
(function () {
	/* define */
	var CDpi = function(){};
	var proto = CDpi.prototype;
	
	var doc = $(document);
	var win = $(window);
	/* functions */
	proto.getWinWidth = function(){ return win.width(); }
	proto.getWinHeight = function(){ return win.height(); }
	proto.getDocWidth = function(){ return doc.width(); }
	proto.getDocHeight = function(){ return doc.height(); }
	/* pulibc */
	proto.getDpi = function( px, py, type ){
		type = ( type || "" );
		var result = null;
		if( type.indexOf("html") > -1 ){
			result = showDpi( px, py );
		}else{
			result = countDpi( px, py );
		}
		return result;
	}
	/* private */
	function countDpi( px, py ){
		/* DPI = PixelSize / ScreenSize */
		px = ( px || 1 );
		py = ( py || 1 );
		return { w: proto.getDocWidth() / px, h: proto.getDocHeight() / py };
	}
	/* private */
	function showDpi( px, py ){
		var str = '';
		var dpi = countDpi( px, py )
		str = "dpi: " + dpi.w +" x "+ dpi.h;
		return str;
	}
	
	proto.demo = function(){
		$(document).ready(function() {
			var html = '';
			html += "<br/>";
			html += proto.getDpi(1,1,'html');
			html += "<br/>";
			trace( html );
		});
	}
	
	util.CDpi = CDpi;
}());
