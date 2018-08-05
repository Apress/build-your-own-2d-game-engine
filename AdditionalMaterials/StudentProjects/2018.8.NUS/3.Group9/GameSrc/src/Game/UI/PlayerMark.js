"use strict";

PlayerMark.eAssets = Object.freeze({
    eMark1: "assets/UI/P1Mark_deeper.png",
    eMark2: "assets/UI/P2Mark_deeper.png"
});

function PlayerMark(player) {
    this.mMark = null;
    this.mPlayer = player;

    if (this.mPlayer.mIndex === 0)
        this.mMark = new TextureRenderable(PlayerMark.eAssets.eMark1);
    else if (this.mPlayer.mIndex === 1)
        this.mMark = new TextureRenderable(PlayerMark.eAssets.eMark2);

    this.mMark.getXform().setSize(4, 4);
}

PlayerMark.prototype.update = function (Xpos, Ypos) {
    this.mMark.getXform().setPosition(Xpos, Ypos + 10);
};

PlayerMark.prototype.draw = function (mCamera) {
    this.mMark.draw(mCamera);
};

PlayerMark.loadAssets = function () {
    gEngine.Textures.loadTexture(PlayerMark.eAssets.eMark1);
    gEngine.Textures.loadTexture(PlayerMark.eAssets.eMark2);
};

PlayerMark.unloadAssets = function () {
    gEngine.Textures.unloadTexture(PlayerMark.eAssets.eMark1);
    gEngine.Textures.unloadTexture(PlayerMark.eAssets.eMark2);
};