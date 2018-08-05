"use strict";

MyHero.prototype.animate = function(_config) {
    var bias = this.mJson["height"];
    var w = _config[1][0] - _config[0][0];
    var h = _config[0][1] - _config[1][1];
    this.mMyHero.getXform().setSize(w / h, 1);
    this.mMyHero.setElementPixelPositions(_config[0][0], _config[1][0], bias - _config[0][1], bias - _config[1][1]);
};

function MyHero(kPic, kJson, kPkBg, kPkBr, kPkUI, kPkMn, kPkFt/*, aCamera*/) {
    this.mWalk = new Array();
    this.mStand = [];
    this.mAction = 0;
    this.mSpeed = 30;
    this.mJson = gEngine.ResourceMap.retrieveAsset(kJson);

    this.mMyHero = null;

    var config = this.mJson["Down"]["Stand"];

    this.mMyHero = new SpriteRenderable(kPic);
    this.mMyHero.setColor([1, 1, 1, 0]);
    this.animate(config);

    this.mDir = "Down";

    this.mPackage = new Package("Mont Tang's Package", kPkBg, kPkBr, kPkUI, kPkMn, kPkFt, 20/*, aCamera*/);
}

MyHero.prototype.walk = function(dir) {
    this.mAction = (this.mAction + 1) % this.mSpeed;
    var base = this.mSpeed / 3;
    var config = null;
    if (this.mAction >= 1 && this.mAction < base) {
        config = this.mJson[dir]["Walk"][0];
    }
    if (this.mAction >= base && this.mAction < 2 * base) {
        config = this.mJson[dir]["Walk"][1];
    }
    if (this.mAction >= 2 * base && this.mAction < 3 * base) {
        config = this.mJson[dir]["Stand"];
    }
    if (this.mAction == 0) {
        config = this.mJson[dir]["Stand"];
    }
    this.mDir = dir;
    this.animate(config);
};

MyHero.prototype.stand = function(dir) {
    this.mAction = 0;
    this.mDir = dir;
    this.animate(this.mJson[dir]["Stand"]);
}

MyHero.prototype.getHero = function() {
    return this.mMyHero;
};

MyHero.prototype.getDir = function() {
    return this.mDir;
};

MyHero.prototype.drawPackage = function (/*aCamera*/) {
    this.mPackage.draw(/*aCamera*/);
};

MyHero.prototype.updatePackage = function (aHero, aCurState) {
    return (this.mPackage.update(aHero, aCurState));
};

MyHero.prototype.getPackage = function () {
    return this.mPackage;
};
