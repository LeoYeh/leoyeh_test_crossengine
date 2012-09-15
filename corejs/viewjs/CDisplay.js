//namespace
this.viewjs = this.viewjs || {};
//Immediate Functions
(function () {

    /**
    * Base CDisplay Class
    **/
    CDisplay = function () {
    }

    //-------------------------------------------------------------------
    //STATIC SETTINGs
    //-------------------------------------------------------------------

    //-------------------------------------------------------------------
    //PROPERTIES
    //-------------------------------------------------------------------
    var p = CDisplay.prototype = new viewjs.CDispatcher();

    /**
    * Dom Div elements serve as body
    */
    p.div;

    p.name = "";
    p.x = 0;
    p.y = 0;
    p.z = 0;
    p.width = 0;
    p.height = 0;
    p.deg = 0;
    p.sx = 1;
    p.sy = 1;
    p.alpha = 1;
    p.parent = null;
    p.children = null;
    p.alignSetting = null;

    p.useDiv = function (divName) {
        if (this.div == null) {
            this.div = $("#"+divName);
            this.div.css({ "display": "block", "position": "absolute" });
        }
    }
    p.createDiv = function () {
        if (this.div == null) {
            this.div = $("<div>");
            this.div.css({ "display": "block", "position": "absolute" });
        }
    }
    p.fillBackground = function (color, width, height) {
        if (this.div == null)  this.createDiv();
        this.div.css({ "backgroundColor": color });
        this.setSize(width, height);
    }
    p.randomBackground = function (width, height) {
        if (this.div == null) this.createDiv();
        this.div.css({ "backgroundColor": '#' + (Math.random() * 0xFFFFFF << 0).toString(16) });
        this.setSize(width, height);
    }
 
    //-------------------------------------------------------------------
    // CHILD CONTROLS 
    //-------------------------------------------------------------------
    p.addChild = function (newOne) {
        if (newOne == null) return null;
        if (this.children == null) this.children = [];
        this.children.push(newOne);
        $(this.div).append(newOne.div);
        if (newOne.parent != null) newOne.parent.removeChild(newOne);
        newOne.parent = this;
        newOne.setz(this.children.length);
        return newOne;
    }
    p.removeChild = function (removeOne) {
        var childPos = this.children.indexOf(removeOne);
        $(removeOne.div).remove();
        if (childPos > -1) {
            this.children.splice(childPos, 1);
        }
        this.resetDepth();
        removeOne = null;
    }
    p.swapChildren = function (childA, childB) {
        var aPos = this.children.indexOf(childA);
        var bPos = this.children.indexOf(childB);
        if (aPos > -1 && bPos > -1) {
            this.children[aPos] = childB;
            this.children[bPos] = childA;
        }
        this.resetDepth();
    }
    p.hide = function () {
        if (this.div == null) return;
        $(this.div).hide();
    }
    p.show = function () {
        if (this.div == null) return;
        $(this.div).show();
    }

    //-------------------------------------------------------------------
    // ALIGNMENTS, POSITIONING
    //-------------------------------------------------------------------
    p.setAlign = function (obj) {
        this.alignSetting = new viewjs.AlignSetting();
        this.alignSetting.initialize(this, obj);
    };
   

    //-------------------------------------------------------------------
    // CDisplay MOVEMENT, ROTATION, SCALE, DEPTH
    //-------------------------------------------------------------------
    p.setz = function (zto) {
        if (this.parent) {
            this.z = this.parent.z + zto;
        } else {
            this.z = zto;
        }
        $(this.div).css({"zIndex":this.z});
    }
    p.resetDepth = function () {
        if (this.children != null) {
            var len = this.children.length;
            for (var s = 0; s < len; s++) {
                this.children[s].setz(s + 1);
            }
        }
    }
    p.move = function (xto, yto) {
        this.x = xto;
        this.y = yto;
        this.render();
    }
    p.movex = function (xto) {
        this.x = xto;
        this.render();
    }
    p.movey = function (yto) {
        this.y = yto;
        this.render();
    }
    p.rotate = function (degree) {
        this.deg = degree;
        this.render();
    }
    p.setAlpha = function (alphaTo) {
        this.alpha = alphaTo;
        this.render();
    }
    p.scale = function (scalex, scaley) {
        this.sx = scalex;
        this.sy = scaley;
        this.render();
    }
    p.scalex = function (scalex) {
        this.sx = scalex;
        this.render();
    }
    p.scaley = function (scaley) {
        this.sy = scaley;
        this.render();
    }
    p.render = function () {
        var trans = "translate3d(" + this.x + "px," + this.y + "px, " + this.z + "px) ";
        //IE does not support 3d tranlate, use 2d instead
        if (Util.isIE()) {
            trans = "translate(" + this.x + "px," + this.y + "px) ";
        }
        trans += "rotate(" + this.deg + "deg) ";
        trans += "scaleX(" + this.sx + ") scaleY(" + this.sy + ") ";
        $(this.div).css({
            "-webkit-transform": trans,
            "-moz-transform": trans,
            "-o-transform": trans,
            "msTransform": trans,
            "transform": trans,
            "-moz-opacity" : this.alpha,
            "-webkit-opacity": this.alpha,
            "-ms-opacity": this.alpha,
            "opacity": this.alpha
        });
    }
    p.setSelectable = function (flag) {
        if (flag == false) {
            $(this.div).css({
                "-webkit-user-select": "none",
                "user-select": "none",
                "-moz-user-select": "-moz-none",
                "-khtml-user-select": "none",
                "-o-user-select": "none",
                "-ms-user-select": "none"
            });
        } else {
            $(this.div).css({
                "-webkit-user-select": "",
                "user-select": "",
                "-moz-user-select": "",
                "-khtml-user-select": "",
                "-o-user-select": "",
                "-ms-user-select": ""
            });
        }
    }
    p.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        //尺寸縮放可能為 css % ex: 50% 如果為數字則加 px 值
        if (!isNaN(width)) width = width + "px";
        if (!isNaN(height)) height = height + "px";
        if (this.div == null) this.createDiv();
        this.div.css({"width": width, "height": height });
    }
    p.setMask = function () {
        $(this.div).css({
            "overflow": "hidden"
        });
    }
    //-------------------------------------------------------------------

    //-------------------------------------------------------------------
    // TWEENING
    //-------------------------------------------------------------------
    p.tweenHide = function (seconds, properties) {
        var self = this;
        properties.onComplete = function () {
            self.hide();
        }
        this.tween(seconds, properties);
    }
    p.tween = function (seconds, properties) {
        var self = this;
        properties.roundProps = ["x", "y"];
        properties.onUpdate = function () {
            self.render();
        };
        TweenMax.to(self.div, seconds, properties);
    }

    //set it to NameSpace
    viewjs.CDisplay = CDisplay;

}());
