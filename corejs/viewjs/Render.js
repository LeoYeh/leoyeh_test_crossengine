//-------------------------------------------------------------------
//global render framecall back
//-------------------------------------------------------------------
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


//-------------------------------------------------------------------
//GLOBAL STATIC Render 
//-------------------------------------------------------------------
function Render() { };
Render.fps = 30; // 30 frame per second (100/30)
Render.callBack = null;
Render.startTime = null;
Render.lastUpdate = null;
Render.currentUpdate = null;
Render.callBacks = [];
Render.callBacksTotal = 0;
Render.running = false;
Render.fpsWatchDiv = null;
Render.addCallBack = function (callBack) {
    if (Render.callBacks.indexOf(callBack) == -1) {
        Render.callBacks.push(callBack);
        Render.callBacksTotal = Render.callBacks.length;
    }
}
Render.removeCallBack = function (callBack) {
    var index = Render.callBacks.indexOf(callBack);
    if (index > -1) {
        Render.callBacks.splice(index, 1);
        Render.callBacksTotal = Render.callBacks.length;
    }
}
Render.start = function () {
    if (Render.running == false) {
        Render.running = true;
        Render.startTime = new Date().getTime();
        Render.lastUpdate = Render.startTime;
        requestAnimFrame(Render.runStep);
    }
}
Render.runStep = function () {
    Render.currentUpdate = new Date().getTime();
    var timeDiff = Render.currentUpdate - Render.lastUpdate;
    //make sure it is running on Right FPS, different browser varies
    if (timeDiff >= Render.fps) {
        if (Render.fpsWatchDiv != null) Render.fpsWatchDiv.update(Render.lastUpdate, Render.currentUpdate);
        Render.lastUpdate = Render.currentUpdate;
        for (var s = 0; s < Render.callBacksTotal; s++) {
            Render.callBacks[s](timeDiff);
        }
    }
    requestAnimFrame(Render.runStep);
}

Render.addFPSWatch = function (parent, x, y) {
    if (Render.fpsWatchDiv == null) {
        Render.fpsWatchDiv = new FPSWatch(parent, x, y);
    }
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------



//-------------------------------------------------------------------
//GLOBAL STATIC FLOAT ABSOLUTE POSITION DEBUG DIV 
//-------------------------------------------------------------------
function DebugView() {};
DebugView.dom = null;
DebugView.clearBtn = null;
DebugView.msgs = [];
DebugView.setUp = function (parent, x, y) {
    DebugView.dom = document.createElement('div');
    parent.appendChild(DebugView.dom);
    DebugView.dom.style.position = 'absolute';
    DebugView.dom.style.display = 'block';
    DebugView.dom.style.left = x + 'px';
    DebugView.dom.style.top = y + 'px';
    DebugView.dom.style.zIndex = '10000';
    DebugView.dom.style.backgroundColor = "#f3f3f3";
    DebugView.dom.style.width = '400px';
    DebugView.dom.style.height = '200px';
    DebugView.dom.style.overflow = 'auto';
    DebugView.dom.style.fontSize = '13px';
    DebugView.dom.style.fontWeight = 'normal';
    DebugView.dom.style.fontFamily = 'Arial';
    DebugView.dom.style.color = '#333333';
    DebugView.dom.style.padding = '5px';

    DebugView.clearBtn = document.createElement("BUTTON");
    DebugView.clearBtn.appendChild(document.createTextNode("CLEAR"));
    parent.appendChild(DebugView.clearBtn);
    DebugView.clearBtn.style.position = 'absolute';
    DebugView.clearBtn.style.left = x + 'px';
    DebugView.clearBtn.style.top =  (y + 220) + 'px';
    DebugView.clearBtn.style.zIndex = '10001';
    DebugView.clearBtn.onclick = function () {
        DebugView.msgs = [];
        DebugView.dom.innerHTML = "";
    }
}

DebugView.trace = function (msg) {
    DebugView.msgs.unshift(msg);
    var len = DebugView.msgs.length;
    var output = "<pre>";
    for (var s = 0; s < len; s++) {
        output += DebugView.msgs[s] + "\n";
    }
    output += "</pre>";
    if (DebugView.dom != undefined) {
        DebugView.dom.innerHTML = output;
    }
    if (len > 30) DebugView.msgs.pop();
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------


//-------------------------------------------------------------------
//GLOBAL FPS display
//-------------------------------------------------------------------
function FPSWatch(parent, x, y) {
    this.fpsDiv = $("<div>");
    this.fpsDiv.css({
        "display": "block", "position": "absolute", "z-index": "10003", "color": "#dddddd",
        "background-color":"#333333", "width":"62px", "height":"16px", "padding":"3px",
        "font-size":"13px", "font-Family":"Arial", "left": x+"px", "top":y+"px"
    });
    $(parent).append(this.fpsDiv);
    this.update = function (lastUpdate, current) {
        var fpsNum = Math.round(1000 / (current - lastUpdate) * 10) / 10;
        if (fpsNum > 0 && fpsNum < 100) {
            this.fpsDiv.html("FPS: " + fpsNum);
        }
    }

}