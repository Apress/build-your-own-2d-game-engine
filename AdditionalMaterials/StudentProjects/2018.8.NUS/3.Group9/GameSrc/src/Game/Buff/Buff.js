"use strict";

Buff.eAssets = Object.freeze({
    ePoisonBuffTexture: "assets/buffs/poisonSpriteSheet.png",
    eRegenerationBuffTexture: "assets/buffs/regenerationSpriteSheet.png",
});

function Buff(remainTurns, texture) {
    this.mPlayer = null;
    this.mStartTurns = null;
    this.mCurrentTurns = null;
    this.mEndTurns = null;
    this.mVisible = new SpriteAnimateRenderable(texture);
    this.mVisible.setColor([1, 1, 1, 0.2]);
    this.mVisible.getXform().setSize(12, 14);
    this.mVisible.getXform().setRotationInRad(0);
    this.mVisible.setSpriteSequence(128, 0, 128, 128, 3, 0);
    this.mVisible.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mVisible.setAnimationSpeed(10);
}

Buff.prototype.initialize = function (player, startTurns, remainTurns) {
    this.mPlayer = player;
    this.mStartTurns = startTurns;
    this.mCurrentTurns = startTurns;
    this.mEndTurns = startTurns + remainTurns;

    var pos = this.mPlayer.getArcher().getXform().getPosition();
    this.mVisible.getXform().setPosition(pos[0], pos[1]);
};

Buff.prototype.update = function (currentTurns) {
    this.mVisible.updateAnimation();
    var pos = this.mPlayer.getArcher().getXform().getPosition();
    this.mVisible.getXform().setPosition(pos[0], pos[1]);
    if (this.mCurrentTurns < currentTurns) {
        this.mCurrentTurns++;
        if (this.mPlayer.mIndex === 0) {
            if (this.mCurrentTurns % 2 === 1) {
                this.effect();
            }
        }
        else if (this.mPlayer.mIndex === 1) {
            if (this.mCurrentTurns % 2 === 0) {
                this.effect();
            }
        }
    }
    else if (currentTurns > this.mEndTurns) {
        this.end();
    }
};

Buff.prototype.draw = function (aCamera) {
    this.mVisible.draw(aCamera);
};

Buff.prototype.effect = function () {

};

Buff.prototype.end = function () {
    var index = this.mPlayer.mBuffSet.indexOf(this);
    if (index > -1)
        this.mPlayer.mBuffSet.splice(index, 1);
};

Buff.loadAssets = function () {
    gEngine.Textures.loadTexture(Buff.eAssets.ePoisonBuffTexture);
    gEngine.Textures.loadTexture(Buff.eAssets.eRegenerationBuffTexture);
};

Buff.unloadAssets = function () {
    gEngine.Textures.unloadTexture(Buff.eAssets.ePoisonBuffTexture);
    gEngine.Textures.unloadTexture(Buff.eAssets.eRegenerationBuffTexture);
};