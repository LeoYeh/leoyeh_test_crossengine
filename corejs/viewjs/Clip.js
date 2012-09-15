//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**
    * Main Stage class
    **/
    var Clip = function () {
    }

    //-------------------------------------------------------------------
    //PROPERTIES inherited from Display
    //-------------------------------------------------------------------
    var p = Clip.prototype = new viewjs.CDisplay();
    p.imgSrc = "";
    p.frameInfo = null; 
    p.clipData = null;

    p.initialize = function () {
    }

    /**********************************************************
    更新圖形顯示
    **********************************************************/
    p.imgUpdate = function (dataEntry) {
        var cssVal = "transparent url(" + this.imgSrc + ") no-repeat ";
        cssVal += "-" + dataEntry.x + "px -" + dataEntry.y + "px";
        $(this.div).css({ "background": cssVal});
    }

    /**********************************************************
    設定單張圖形顯示 
    imgScr (圖片來源 ex: assets/img.png)    imgData (texture atlas 資訊)   imgName(單張圖的名稱)
    **********************************************************/
    p.asImage = function (imgSrc, imgDatas, imgName) {
        if (this.div == null) this.createDiv();
        this.imgSrc = imgSrc;
        var len = imgDatas.length;
        for (var k = 0; k < len; k++) {
            if (imgDatas[k].name == imgName) {
                this.imgUpdate(imgDatas[k]);
                break;
            }
        }
    }

    p.asSingleImg = function (imgSrc, width, height) {
        this.setSize(width, height);
        if (this.div == null) this.createDiv();
        this.imgSrc = imgSrc;
        var cssVal = "transparent url(" + this.imgSrc + ") no-repeat ";
        cssVal += "0px 0px";
        $(this.div).css({ "background": cssVal });
    }
    p.asTileImg = function (imgSrc, width, height) {
        this.setSize(width, height);
        if (this.div == null) this.createDiv();
        this.imgSrc = imgSrc;
        var cssVal = "transparent url(" + this.imgSrc + ") ";
        cssVal += "0px 0px";
        $(this.div).css({ "background": cssVal });
    }

    /**********************************************************
    設定撥放影格資訊 
    imgScr (圖片來源 ex: assets/img.png)    
    imgData (texture atlas 資訊)
    prefix, 資料紀錄所有同一sprite 名稱 prefix
    frameInfo - 格式 anchor 名稱，與涵蓋影格
    {
        "walkLeft":     [0, 2],
        "walkDown":     [3, 5],
        "walkRight":    [6, 8],
        "walkUp":       [9, 11]
    };
    **********************************************************/
    //目前影格
    p.currentFrame = 0;
    //計算影格更新每次render的時間總和
    p.timeAdded = 0;
    //目前play模式
    p.playMode = "";
    //目前撥放片段 anchor
    p.playAnchor = "";
    //yoyo Mode撥放方向
    p.yoyoDir = "";
    p.fps = 1;
    p.fpsEach = 0;

    p.asClip = function (imgSrc, imgDatas, prefix, frameInfo) {
        this.imgSrc = imgSrc;
        this.frameInfo = frameInfo;
        this.clipData = [];
        var len = imgDatas.length;
        for (var s = 0; s < len; s++) {
            var baseName = imgDatas[s].name;
            baseName = baseName.substr(0, baseName.length - 4);
            if (baseName == prefix) {
                //imgDatas filename format = "filename":"HeroA0000" , remove last 4 digit for baseName
                var digit = Number(imgDatas[s].name.substr(imgDatas[s].name.length - 4, 4));
                this.clipData[digit] = imgDatas[s];
            }
        }
        this.currentFrame = 0;
        this.setFPS(12);
    }

    p.stopAt = function (anchor) {
        if (this.frameInfo[anchor]) {
            this.playAnchor = "";
            this.gotoFrame(this.frameInfo[anchor][0]);
        }
    }
    p.playYoyo = function (anchor) {
        this.timeAdded = 0;
        this.playMode = "yoyo";
        this.yoyoDir = "R";
        this.playAnchor = anchor;
        this.gotoFrame(this.frameInfo[this.playAnchor][0]);
    }
    p.playLoop = function (anchor) {
        this.timeAdded = 0;
        this.playMode = "loop";
        this.playAnchor = anchor;
        this.gotoFrame(this.frameInfo[this.playAnchor][0]);
    }
    p.gotoFrame = function (framePos) {
        if (framePos != this.currentFrame) {
            this.currentFrame = framePos;
            if (this.clipData[framePos] != null) {
                this.imgUpdate(this.clipData[framePos]);
            }
        }
    }

    p.setFPS = function(fps){
        this.fps = fps;
        this.fpsEach = 1000 / fps;
    }

    p.playUpdate = function (timeDiff) {

        //if this is stoped , playAnchor == "" return
        if (this.playAnchor == "") return;

        var min = this.frameInfo[this.playAnchor][0];
        var max = this.frameInfo[this.playAnchor][1];

        if (max == undefined) {
            //only one frame for this anchor, simply stop at that frame
            this.gotoFrame(min);
            return;
        }

        this.timeAdded += timeDiff;
        if (this.timeAdded > this.fpsEach) {
            this.timeAdded = this.timeAdded % this.fpsEach;
            var frameTo = this.currentFrame;
            if (this.playMode == "yoyo") {
                if (this.yoyoDir == "R") {
                    frameTo++;
                    if (frameTo > max - 1) {
                        frameTo = max;
                        this.yoyoDir = "L";
                    }
                } else {
                    frameTo--;
                    if (frameTo < min + 1) {
                        frameTo = min;
                        this.yoyoDir = "R";
                    }
                }
            }
            if (this.playMode == "loop") {
                frameTo++;
                if (frameTo > max) {
                    frameTo = min;
                }
            }
            this.gotoFrame(frameTo);
        }
    }

    viewjs.Clip = Clip;

}());
