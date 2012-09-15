//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**
    * 核心event class
    **/
    var CEvent = function (commandName, value, index, extra) {
        this.commandName = commandName;
        this.value = value;
        this.index = index;
        this.extra = extra;
    }

    //-------------------------------------------------------------------
    //[--PUBLIC--] Properties | Functions
    //-------------------------------------------------------------------
    var p = CEvent.prototype;
    p.commandName = "";
    p.value = null;
    p.index = 0;
    p.extra = null;

    p.dump = function () {
        return "commandName: " + this.commandName + " , value: " + this.value + " , index: " + this.index + " , extra : " + this.extra;
    }

    viewjs.CEvent = CEvent;

}());
