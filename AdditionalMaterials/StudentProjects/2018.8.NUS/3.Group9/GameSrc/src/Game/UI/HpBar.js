"use strict";

HpBar.eAssets = Object.freeze({
    eRedHeart: "assets/UI/redHeart.png",
    eBlueHeart: "assets/UI/blueHeart.png",
    eBackgroundTexture: "assets/UI/HpBarBackground.png"
});

function HpBar(XPos, YPos, archer) {
    this.mArcher = archer;
    this.mHpBar = [];
    this.mMaxHp = 10;
    this.mHp = 10;
    this.Xpos = XPos;
    this.Ypos = YPos;
    this.mSize = 10;

    GameObjectSet.call(this);

    this.mBackground = new TextureRenderable(HpBar.eAssets.eBackgroundTexture);
    this.mBackground.setColor([1, 1, 1, 0]);
    this.mBackground.getXform().setSize(100, 10);
    this.mBackground.getXform().setPosition(this.Xpos + 45, this.Ypos);

    var i = 0;
    for(i = 0; i < this.mMaxHp; i++)
    {
        var newHp = new TextureRenderable(HpBar.eAssets.eRedHeart);
        newHp.setColor([1, 1, 1, 0]);
        newHp.getXform().setSize(this.mSize, this.mSize);
        newHp.getXform().setPosition(this.Xpos + i * this.mSize, this.Ypos);
        this.mHpBar.push(newHp);
    }
}

HpBar.prototype.update = function () {
    this.mHp = this.mArcher.getHp();
};

HpBar.prototype.draw = function (aCamera) {
    this.mBackground.draw(aCamera);
    var i;
    for (i = 0; i < this.mHp; i++) {
        this.mHpBar[i].draw(aCamera);
    }
};

HpBar.loadAssets = function () {
    gEngine.Textures.loadTexture(HpBar.eAssets.eBackgroundTexture);
    gEngine.Textures.loadTexture(HpBar.eAssets.eRedHeart);
};

HpBar.unloadAssets = function () {
    gEngine.Textures.unloadTexture(HpBar.eAssets.eBackgroundTexture);
    gEngine.Textures.unloadTexture(HpBar.eAssets.eRedHeart);
};