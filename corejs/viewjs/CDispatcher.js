//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**
    * 核心event dispatch class
    **/
    var CDispatcher = function () {
    }

    // [--PRIVATE--]
    var listeners;

    //-------------------------------------------------------------------
    //[--PUBLIC--] Properties | Functions
    //-------------------------------------------------------------------
    var p = CDispatcher.prototype;

    p.addListener = function (commandName, callBack) {
        if (this.listeners == null) this.listeners = new Array();
        this.listners[this.listners.length] = { f: callBack, n: commandName };
    }

    p.removeListener = function (callBack) {
        if (this.listeners == null) return;
        var len = this.listners.length;
        for (var i = 0; i < len; i++) {
            if (this.listners[i].f === callBack) {
                delete (this.listners[i]);
            }
        }
    }

    p.dispatchEvent = function (commandName, eventObj) {
        if (this.listeners == null) return;
        var len = this.listners.length;
        for (var i = 0; i < len; i++) {
            if (typeof this.listners[i].f === 'function') {
                if (this.listners[i].n == commandName) {
                    this.listners[i].f(eventObj);
                }
            }
        }
    }

    viewjs.CDispatcher = CDispatcher;

}());
