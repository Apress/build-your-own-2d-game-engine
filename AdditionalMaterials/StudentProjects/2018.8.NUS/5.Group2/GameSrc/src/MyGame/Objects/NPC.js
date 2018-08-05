"use strict";

MyNPC.prototype.animate = function(_config) {
    var bias = this.mJson["height"];
    var w = _config[1][0] - _config[0][0];
    var h = _config[0][1] - _config[1][1];
    this.mMyNPC.getXform().setSize(w / h, 1);
    this.mMyNPC.setElementPixelPositions(_config[0][0], _config[1][0], bias - _config[0][1], bias - _config[1][1]);
};

function MyNPC(kPic, kJson) {
    this.mJson = gEngine.ResourceMap.retrieveAsset(kJson);
    this.mMyNPC = null;

    this.currentPos = null;

    var config = this.mJson["Down"]["Stand"];

    this.mMyNPC = new SpriteRenderable(kPic);
    this.mMyNPC.setColor([1, 1, 1, 0]);
    this.animate(config);

    this.mDir = "Down";
}

MyNPC.prototype.stand = function(dir) {
    this.mDir = dir;
    this.animate(this.mJson[dir]["Stand"]);
};

MyNPC.prototype.change = function(newPic, newJson) {
    this.mMyNPC = new SpriteRenderable(newPic);
    this.mMyNPC.setColor([1, 1, 1, 0]);
    this.mJson = gEngine.ResourceMap.retrieveAsset(newJson);
    this.setPosition(this.currentPos[0], this.currentPos[1]);
    this.stand(this.mDir);
}

MyNPC.prototype.getNPC = function() {
    return this.mMyNPC;
};

MyNPC.prototype.getDir = function() {
    return this.mDir;
};

MyNPC.prototype.setPosition = function(x, y) {
    this.currentPos = [x, y];
    this.mMyNPC.getXform().setPosition(x, y);
}
