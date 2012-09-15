//####################################################################################
//ALIGN TOOL Setting
//####################################################################################
//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**
    * Store all alignment setting when item resizes
    */
    var AlignSetting = function () {
    }

    //-------------------------------------------------------------------
    //PROPERTIES
    //-------------------------------------------------------------------
    var p = AlignSetting.prototype;
    p.targetDisplay = null;

    /**********************************************************
    setting for alignment
    {
        w: 310, h: 134,                     //width and height of the DOM object
        ha: "T", va: "C",                   //[horizontal align L,C,R] [vertical align T,C,B]
        toff:200, loff:0, roff:0, boff:0    //offset for top left bottom and right
    }
    **********************************************************/
    p.setting = null;

    p.initialize = function (targetDisplay, setting) {
        this.targetDisplay = targetDisplay;
        this.setting = setting;
        this.setting.w = targetDisplay.width;
        this.setting.h = targetDisplay.height;
    }

    p.update = function () {

        var screenW = $(window).width();
        var screenH = $(window).height();
        if (this.targetDisplay.parent != undefined) {
            screenW = this.targetDisplay.parent.width;
            screenH = this.targetDisplay.parent.height;
        }

        var finalw = this.setting.w;
        var finalh = this.setting.h;

        //see if using percentage
        if (isNaN(finalw)) {
            finalw = screenW * Number(finalw.replace("%", "")) / 100;
        }
        if (isNaN(finalh)) {
            finalh = screenH * Number(finalh.replace("%", "")) / 100;
        }

        var axto = 0;
        var ayto = 0;

        //align based on setting horizontally
        if (this.setting.ha != undefined) {
            if (this.setting.ha == "C") {
                axto = (screenW - finalw) * .5;
            }
            if (this.setting.ha == "R") {
                axto = (screenW - finalw);
            }
        }
        //align based on setting horizontally
        if (this.setting.va != undefined) {
            if (this.setting.va == "C") {
                ayto = (screenH - finalh) * .5;
            }
            if (this.setting.va == "B") {
                ayto = (screenH - finalh);
            }
        }

        if (axto < 0) axto = 0;
        if (ayto < 0) ayto = 0;
        //adding offsets horizontally if presented
        if (this.setting.hoff != undefined)  axto += this.setting.hoff;
        if (this.setting.voff != undefined)  ayto += this.setting.voff;
        this.targetDisplay.move(axto, ayto);

    }

    viewjs.AlignSetting = AlignSetting;
}());