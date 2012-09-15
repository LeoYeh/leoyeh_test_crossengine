//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**
    * Main Stage class
    **/
    var CStage = function () {
    }

    //-------------------------------------------------------------------
    //STATIC SETTINGs
    //-------------------------------------------------------------------
    //CStage.instance = null;

    //-------------------------------------------------------------------
    //PROPERTIES inherited from Display
    //-------------------------------------------------------------------
    var p = CStage.prototype = new viewjs.CDisplay();
    p.alignTool = null;
    p.minWidth = 480;
    p.minHeight = 800;
    p.maxWidth = 640;
    p.maxHeight = 960;
    p.alignUpdated = null;
    p.scaleFitFlag = false;

    p.initialize = function (useDiv, bgColor, minWidth, minHeight, maxWidth, maxHeight) {

        this.minWidth = minWidth;
        this.minHeight = minHeight;
        this.maxWidth = minWidth;
        this.maxHeight = minHeight;
        if (maxWidth != undefined) this.maxWidth = maxWidth;
        if (maxHeight != undefined) this.maxHeight = maxHeight;
        this.width = this.maxWidth;
        this.height = this.maxHeight;

        this.useDiv(useDiv);
        this.fillBackground(bgColor, maxWidth, maxHeight);

        var self = this;  //reference class for js event
        $(window).resize(function () { self.alignStage(); });

    }

    p.alignStage = function (self) {
        //stage alignment update
        var screenW = $(window).width();
        var screenH = $(window).height();
        var sizeW = screenW;
        if (sizeW < this.minWidth) sizeW = this.minWidth;
        if (sizeW > this.maxWidth)  sizeW = this.maxWidth;
        var sizeH = screenH;
        if (sizeH < this.minHeight) sizeH = this.minHeight;
        if (sizeH > this.maxHeight) sizeH = this.maxHeight;
        if (this.alignSetting != null) {
            this.setSize(sizeW, sizeH);
        }
        //loop all children and update its alignment setting
        if (this.children != null) {
            var len = this.children.length;
            for (var s = 0; s < len; s++) {
                if (this.children[s].alignSetting != null) {
                    this.children[s].alignSetting.update();
                }
            }
        }

        if (this.alignSetting != null) {
            this.alignSetting.update();
        }

        if (this.alignUpdated != null) {
            this.alignUpdated(sizeW, sizeH);
        }
        
        if(this.scaleFitFlag) this.scaleToFit();

    }

    p.playUpdate = function (timeDiff) {
        var len = this.children.length;
        for (var s = 0; s < len; s++) {
            if (this.children[s] instanceof viewjs.Clip) {
                this.children[s].playUpdate(timeDiff);
            }
        }
    }
    
    p.scaleToFit = function(){
        if(this.scaleFitFlag == false) this.scaleFitFlag = true;
        var toHeight = $(window).height() - 70;
        if(toHeight>640) toHeight = 640;
        //resize based on smaller proportion
        var usep = toHeight / this.maxHeight;
        if(usep<1) usep = 1;
        this.scale(usep, usep);
     }

    viewjs.CStage = CStage;

}());
