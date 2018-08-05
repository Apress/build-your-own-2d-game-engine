"use strict";

Timer.eAssets = Object.freeze({
    eBackgroundTexture: "assets/nianlun.png",
    eNumbersSpriteSheetTexture: "assets/numbers/numbersSpriteSheet_1.png"
});

function Timer(player) {
    this.mPlayer = player;
    this.mTime = 0;
    this.mTimeShow = 20;

    //this.mTimerCountDown = [];

    var wcCenter = this.mPlayer.mMainCamera.getWCCenter();
    /*
    this.mTimerCountDown = new SpriteAnimateRenderable(Timer.eAssets.eNumbersSpriteSheetTexture);
    this.mTimerCountDown.setColor([1, 1, 1, 0]);
    this.mTimerCountDown.getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown.getXform().setSize(20, 15);
    this.mTimerCountDown.setSpriteSequence(64, 0, 64, 48, 25, 0);
    this.mTimerCountDown.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mTimerCountDown.setAnimationSpeed(60);
    */
    /*
    this.mTimerCountDown[0] = new SpriteAnimateRenderable(Timer.eAssets.eNumbersSpriteSheetTexture);
    this.mTimerCountDown[0].setColor([1, 1, 1, 0]);
    this.mTimerCountDown[0].getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown[0].getXform().setSize(20, 15);
    this.mTimerCountDown[0].setSpriteSequence(256, 0, 64, 48, 10, 0);
    this.mTimerCountDown[0].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mTimerCountDown[0].setAnimationSpeed(60);

    this.mTimerCountDown[1] = new SpriteAnimateRenderable(Timer.eAssets.eNumbersSpriteSheetTexture);
    this.mTimerCountDown[1].setColor([1, 1, 1, 0]);
    this.mTimerCountDown[1].getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown[1].getXform().setSize(20, 15);
    this.mTimerCountDown[1].setSpriteSequence(208, 0, 64, 48, 10, 0);
    this.mTimerCountDown[1].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mTimerCountDown[1].setAnimationSpeed(60);

    this.mTimerCountDown[2] = new SpriteAnimateRenderable(Timer.eAssets.eNumbersSpriteSheetTexture);
    this.mTimerCountDown[2].setColor([1, 1, 1, 0]);
    this.mTimerCountDown[2].getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown[2].getXform().setSize(20, 15);
    this.mTimerCountDown[2].setSpriteSequence(160, 0, 64, 48, 4, 0);
    this.mTimerCountDown[2].setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mTimerCountDown[2].setAnimationSpeed(60);
    */

    this.mTextbox = new FontRenderable(this.mTimeShow.toString());
    if (this.mPlayer.mIndex === 0)
        this.mTextbox.setColor([0.2, 0.255, 0.722, 1]);
    else if (this.mPlayer.mIndex === 1)
        this.mTextbox.setColor([0.831, 0.1, 0.1255, 1]);
    this.mTextbox.getXform().setPosition(0, 0);
    this.mTextbox.getXform().setSize(0, 0);
    this.mTextbox.setTextHeight(8);

    this.mBackground = new TextureRenderable(Timer.eAssets.eBackgroundTexture);
    this.mBackground.setColor([1, 1, 1, 0]);
    this.mBackground.getXform().setPosition(0, 0);
    this.mBackground.getXform().setSize(13, 13);

}
Timer.prototype.setZero = function () {
    this.mTime = 0;
    this.mTimeShow = 18;
};

Timer.prototype.TimeUpdate = function (time) {

    var wcCenter = this.mPlayer.mMainCamera.getWCCenter();
    this.mTextbox.getXform().setPosition(wcCenter[0] - 2, wcCenter[1] + 55);
    this.mBackground.getXform().setPosition(wcCenter[0], wcCenter[1] + 54);

    /*
    this.mTimerCountDown.getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown.updateAnimation();
    */
    /*
    this.mTimerCountDown[0].getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown[1].getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    this.mTimerCountDown[2].getXform().setPosition(wcCenter[0], wcCenter[1] + 50);
    */

    if(time - this.mTime > 1)  {
        this.mTime++;
        this.mTimeShow--;
    }
    var zeroStr = "0";
    if (this.mTimeShow < 10)
        this.mTextbox.setText(zeroStr.concat(this.mTimeShow.toString()));
    else
        this.mTextbox.setText(this.mTimeShow.toString());
};

Timer.loadAssets = function () {
    gEngine.Textures.loadTexture(Timer.eAssets.eBackgroundTexture);
    //gEngine.Textures.loadTexture(Timer.eAssets.eNumbersSpriteSheetTexture);
};

Timer.unloadAssets = function () {
    gEngine.Textures.unloadTexture(Timer.eAssets.eBackgroundTexture);
    //gEngine.Textures.unloadTexture(Timer.eAssets.eNumbersSpriteSheetTexture);
};