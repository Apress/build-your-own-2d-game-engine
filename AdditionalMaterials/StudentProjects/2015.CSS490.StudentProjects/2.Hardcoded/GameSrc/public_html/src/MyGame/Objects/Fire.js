/* 
 * Author: Tyler Green, Steven Roberts
 * File: Fire.js
 * Purpose: This file contains the Fire object and update logic.
 */

function Fire(spriteTexture, atX, atY, target, normalMap, light) {
    
    //Not sure why FIRE would be affected by light... these programmers...
    if (normalMap === null) {
        this.mFire = new LightRenderable(spriteTexture);
    } else {
        this.mFire = new IllumRenderable(spriteTexture, normalMap);
    }
    
    this.mFire.setColor([1, 0, 0, 0.5]);
    this.mFire.getXform().setSize(5, 1);
    this.mFire.getXform().setPosition(atX, atY);
    
    this.mFire.setSpriteSequence(54, 0,      // first element pixel position: top, left
                                   16, 54,    // width, height in pixels
                                   9,           // number of elements in this sequence
                                   1);          // horizontal padding in between
    this.mFire.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mFire.setAnimationSpeed(5);
    
    GameObject.call(this, this.mFire); 
    
    this.mSpeed = 0.4;  //Actual change is 1.5x this number
    this.mRising = true;
    
    this.mMaxHeight = 90;
    this.mMinHeight = 50;
    this.mTarget = target;
    this.kDamage = 1;
    this.mFireLight = light;
}
gEngine.Core.inheritPrototype(Fire, GameObject);

/*
 * The fire rises from the ground and flares up.  Once at max height, it
 *  shrinks slightly, and bounces between these two heights.
 */
Fire.prototype.update = function() {
    this.mFire.updateAnimation();
    
    var height;
    var xForm = this.mFire.getXform();
    //if hitting hero, hurt hero
    if (this.mTarget !== null){
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0) {
            var touchPos = [];
            if (this.mTarget.pixelTouches(this, touchPos)){
                this.mTarget.damage(this.kDamage);
            }
        }
    }
    //The fire undulates between two heights
    if(this.mRising){
        xForm.incHeightBy(this.mSpeed);
        xForm.incYPosBy(this.mSpeed/2);
    } else {
        xForm.incHeightBy(-this.mSpeed);
        xForm.incYPosBy(-this.mSpeed/2);
    }
    
    //Don't let the fire get too large or too small
    height = xForm.getHeight() + xForm.getYPos();
    if(this.mRising)
        if(this.mMaxHeight < height)
            this.mRising = false;
    if(!this.mRising)
        if(this.mMinHeight > height)
            this.mRising = true;
    if(this.mFireLight !== null){
        this.mFireLight.setLightTo(true);
        this.mFireLight.setXPos(this.getXform().getXPos());
        this.mFireLight.setYPos(this.getXform().getYPos());
    }
};

Fire.prototype.setMaxHeight = function(height) {this.mMaxHeight = height; };
Fire.prototype.setMinHeight = function(height) {this.mMinHeight = height; };