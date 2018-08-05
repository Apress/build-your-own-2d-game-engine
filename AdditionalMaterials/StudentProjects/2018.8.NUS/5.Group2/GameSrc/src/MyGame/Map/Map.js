"use scrict";

function Map(name, mapFile, eventFile, eventIndexFile) {
    var mapJson = gEngine.ResourceMap.retrieveAsset(mapFile);
    this.mName = name;
    this.mWidth = Number(mapJson["width"]);
    this.mHeight = Number(mapJson["height"]);
    this.mData = mapJson["data"];
    this.mContent = mapJson["content"];
    this.mBorn = mapJson["born"];
    this.mNPC = mapJson["NPC"];
    this.mEvents = gEngine.ResourceMap.retrieveAsset(eventFile);
    this.mEventIndex = gEngine.ResourceMap.retrieveAsset(eventIndexFile);

    this.mViewWidth = 970;
    this.mViewHeight = 600;

    this.mPixelArray = new Array();
    this.mItems = [];
}

Map.prototype.addItems = function () {
    var mapInfo = this.mData;
    var i;
    for (i = 0; i < mapInfo.length; ++i) {
        var tmp = new Renderable();
        var tmpCenter = this.pixelCenter(i);
        tmp.getXform().setPosition(tmpCenter[0], tmpCenter[1]);
        switch (Math.floor(mapInfo[i] / 100)) {
            case 1:
            if (Math.floor(mapInfo[i] % 100 / 10) == 2)
                tmp.setColor([1, 1, 0.2, 1]);
            else
                tmp.setColor([0.8, 0.8, 0.8, 1]);
            this.mItems.push(tmp);
            break;
            case 2:
            if (Math.floor(mapInfo[i] % 100 / 10)) {
                tmp.setColor([1, 1, 0.2, 1]);
                this.mItems.push(tmp);
            }
            break;
        }
    }
}
