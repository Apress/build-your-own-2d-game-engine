/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kDelta = 0.3;
    
    this.mDye = new LightRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(0,50);
    this.mDye.getXform().setSize(9, 12);
    this.mDye.setElementPixelPositions(0, 60, 78, 128);
    GameObject.call(this, this.mDye);
    
    this.mHSpeed = .65;
    this.mVSpeed = this.mHSpeed * .75;
    this.mX = 9;           //Width
    this.mY = 12;          //Height
    this.mFlashing = true;
    this.mFlashTimer = 0;
    this.mFlashTimer2 = 0;
    this.mFlashTimerMax = 10;
    this.mIsInvunerable = false;
    this.mShakePosition = new ShakePosition(0, 0, 0, 0);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function (mCamera) {
    this.updateControls(mCamera);

    
}; 

Hero.prototype.updateControls = function (mCamera) {
    var xform = this.getXform();    
    var mCurrentPos = xform.getPosition();
    var mCameraPos = mCamera.getWCCenter();
    
    //Left Right Jam
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        return;
    }
    //Top Bot Jam
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        return;
    }
    //Top Right
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        if (mCurrentPos[1] < 95)
            xform.incYPosBy(this.mVSpeed);
        if (mCurrentPos[0] < mCameraPos[0] + 95)
            xform.incXPosBy(this.mHSpeed);
        return;
    }
    //Top Left
    else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        if (mCurrentPos[1] < 95)
            xform.incYPosBy(this.mVSpeed);
        if (mCurrentPos[0] > mCameraPos[0] - 90)
            xform.incXPosBy(-this.mHSpeed);
        return;
    }
    //Top
    else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        if (mCurrentPos[1] < 95)
            xform.incYPosBy(this.mVSpeed);
        return;
    }
    //BotRight
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        if (mCurrentPos[1] > 5)
            xform.incYPosBy(-this.mVSpeed);
        if (mCurrentPos[0] < mCameraPos[0] + 95)
            xform.incXPosBy(this.mHSpeed);
        return;
    }
    //BotLeft
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        if (mCurrentPos[1] > 5)
            xform.incYPosBy(-this.mVSpeed);
        if (mCurrentPos[0] > mCameraPos[0] - 90)
            xform.incXPosBy(-this.mHSpeed);
        return;
    }
    //Bot
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        if (mCurrentPos[1] > 5)
            xform.incYPosBy(-this.mVSpeed);
        return;
    }
    //Left
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        if (mCurrentPos[0] > mCameraPos[0] - 90)
            xform.incXPosBy(-this.mHSpeed);
        return;
    }
    //Right
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        if(mCurrentPos[0] < mCameraPos[0] + 95)
            xform.incXPosBy(this.mHSpeed);
        return;
    }
};

//Hero.prototype.setInvunerable = function (time){
//    this.mIsInvunerable = true;
 //   this.mFlashTimerMax = time;      
//};

//Hero.prototype.isInvunerable = function (){
//    return this.mIsInvunerable;
//};

//Hero.prototype.hitShake = function () {
//    if (this.mShakePosition.shakeDone())
//        this.mShakePosition = new ShakePosition(4.5, 6, 4, 60); 
//};