//####################################################################################
//
//####################################################################################
//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**********************************************************
    FOR AssetLoading and Managements
    [usage]
    uiMapAsset = new viewjs.AssetLoader();
    uiMapAsset.initialize(["assets/uiMap.png","assets/uiMap.txt","assets/dockFill.png"]);
    uiMapAsset.itemLoaded = function (result) { // itemLoaded Event}
    uiMapAsset.allItemLoaded = function (result) { // allItemLoaded Event}
    uiMapAsset.load();
    **********************************************************/
    var AssetLoader = function () {

    }

    //-------------------------------------------------------------------
    //PROPERTIES
    //-------------------------------------------------------------------
    var p = AssetLoader.prototype;

    /**********************************************************
    setting for loading manifests , a array of resource path
    ["assets/uiMap.png","assets/uiMap.txt","assets/dockFill.png"]
    **********************************************************/
    p.manifest = null;
    p.loadPosition = 0;
    p.totalItems = 0;
    p.assets = null;
    //function to dispatch
    p.itemLoaded = null;
    p.allItemLoaded = null;

    p.initialize = function (manifest) {
        this.manifest = manifest;
        this.loadPosition = 0;
        this.totalItems = manifest.length;
        this.assets = [];
    }

    p.load = function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: this.manifest[0],
            success: function (data) {
                self.loadNext(data);
            }
        });
    }

    p.loadNext = function (loadedData) {
        var loadedFileName = this.manifest[this.loadPosition];
        //only cache loaded xml data, images are cached in browser
        if (loadedFileName.indexOf(".xml") > -1) {
            //a xml spritesheet data loaded
            var namePart = Util.getFileNamePart(loadedFileName);
            //convert xml spritesheet into dictionary array
            var xmlObj = [];
            $(loadedData).find("SubTexture").each(function () {
                xmlObj.push({ name: $(this).attr("name"), x: $(this).attr("x"), y: $(this).attr("y"), w: $(this).attr("width"), h: $(this).attr("height") });
            });
            this.assets[namePart] = xmlObj;
        }
        this.loadPosition++;
        if (this.loadPosition < this.totalItems) {
            var self = this;
            $.ajax({
                type: "HEAD",
                url: this.manifest[this.loadPosition],
                success: function (data) {
                    self.loadNext(data);
                }
            });
            //dispatch item loaded event
            if (this.itemLoaded!=null) {
                this.itemLoaded(this);
            }
        } else {
            //everything loaded
            if (this.allItemLoaded!=null) {
                this.allItemLoaded(this);
            }
        }
    }

    viewjs.AssetLoader = AssetLoader;
}());
