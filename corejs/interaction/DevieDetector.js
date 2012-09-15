/* depende jquery */
//namespace
this.interaction = this.interaction || {};
(function () {
	
	var win = $(window);
	var doc = $(document);
	var DevieDetector = function(){};
	var proto = DevieDetector.prototype;
	/* static variables */
	proto.LEFT = 'left';
	proto.RIGHT = 'right';
	proto.UP = 'up';
	proto.DOWN = 'down';
	
	/* gesture input event */
	proto.touchstart = function(cb){
		win.bind('touchstart', function(e){
			if(cb!=null) cb(e);
		});
	}
	proto.touchmove = function(cb){
		win.bind('touchmove', function(e){
			if(cb!=null) cb(e);
		});
	}
	proto.touchend = function(cb){
		win.bind('touchend', function(e){
			if(cb!=null) cb(e);
		});
	}
	/* require ../lib/jquery.touchwipe.min.js */
	
	proto.swipe = function( lfun, rfun, ufun, dfun, minx, miny){
		lfun = ( lfun || null );
		rfun = ( rfun || null );
		ufun = ( ufun || null );
		dfun = ( dfun || null );
		minx = ( minx || 20 );
		miny = ( miny || 20 );
		doc.touchwipe({
			wipeUp: ufun,
			wipeDown: dfun,
			wipeLeft: lfun,
			wipeRight: rfun,
			min_move_x: minx,
			min_move_y: miny,
			preventDefaultEvents: true
		});
	}
	
	proto.swipeHorizontal = function( lfun, rfun, minx, miny ){
		proto.swipe( lfun, rfun, null, null, minx, miny  );
	}
	
	proto.swipeVertical = function( ufun, dfun, minx, miny ){
		proto.swipe( null, null, ufun, dfun, minx, miny  );
	}
	/* position event */
	proto.ishorizontal = function(cb){
		win.bind('orientationchange resize', function(e){
			if(cb!=null) cb( win.width() > win.height() );
		});
	}
	/* devicemotion require test */
	proto.devicemotion = function(cb){
		win.addEventListener("devicemotion", function(e) {
			// Process event.acceleration, event.accelerationIncludingGravity,
			// event.rotationRate and event.interval
			/* e.accelerationIncludingGravity { x:0, y:0, z:0 } */
			if( cb!= null ) cb( e.accelerationIncludingGravity );
		}, true);
	}
	
	proto.demo = function(){
		trace("<br/>");
		proto.touchstart(function(){ trace('touchstart<br/>'); });
		proto.touchmove(function(){ trace('touchmove<br/>'); });
		proto.touchend(function(){ trace('touchend<br/>'); });
		proto.ishorizontal(function(flag){ trace( flag+"" ); });
		proto.swipeHorizontal( function(){ trace( "left<br/>" ); }, function(){ trace( "right<br/>" ); } );
		proto.swipeVertical( function(){ trace( "up<br/>" ); }, function(){ trace( "down<br/>" ); } );
		trace("<br/>");
	}
	
	interaction.DevieDetector = DevieDetector;
}());


