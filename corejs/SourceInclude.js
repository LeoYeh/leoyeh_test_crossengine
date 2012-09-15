function SourceInclude() { };
SourceInclude.includeCore = function () {

    //!!!! import 順序由parent至child
    document.write("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/Util.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/AlignTool.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/CDispatcher.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/CEvent.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/CDisplay.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/Clip.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/CStage.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/AssetLoader.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/viewjs/Render.js'></script>");
	/* add 2012,09,15 by ly  */
	/* util  */
    document.write("<script type='text/javascript' src='../corejs/util/CDpi.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/util/CVersion.js'></script>");
	/* interation  */
    document.write("<script type='text/javascript' src='../corejs/lib/jquery.touchwipe.min.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/interation/DevieDetector.js'></script>");
}
SourceInclude.includeTween = function () {
    document.write("<script type='text/javascript' src='../corejs/greensock/TweenMax.min.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/greensock/easing/EasePack.min.js'></script>");
}
SourceInclude.includeGameCss = function () {
    document.write("<LINK href='../corecss/normalize.css' type='text/css' rel='stylesheet'/> ");
    document.write("<LINK href='../corecss/coreGame.css' type='text/css' rel='stylesheet'/> ");
}
SourceInclude.includeMediaCss = function () {
    document.write("<LINK href='../corecss/normalize.css' type='text/css' rel='stylesheet'/> ");
    document.write("<LINK href='../corecss/coreMedia.css' type='text/css' rel='stylesheet'/> ");
}

SourceInclude.includeBox2d = function () {
    document.write("<script type='text/javascript' src='../corejs/box2d/Box2d.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/box2d/BoxUtil.js'></script>");
    document.write("<script type='text/javascript' src='../corejs/box2d/BoxGame.js'></script>");
}

SourceInclude.includeBox2dClass = function () {
    window.b2Vec2 = Box2D.Common.Math.b2Vec2;
    window.b2AABB = Box2D.Collision.b2AABB;
    window.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    window.b2Body = Box2D.Dynamics.b2Body;
    window.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    window.b2Fixture = Box2D.Dynamics.b2Fixture;
    window.b2World = Box2D.Dynamics.b2World;
    window.b2MassData = Box2D.Collision.Shapes.b2MassData;
    window.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    window.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    window.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    window.b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    window.b2ContactListener = Box2D.Dynamics.b2ContactListener;
}
