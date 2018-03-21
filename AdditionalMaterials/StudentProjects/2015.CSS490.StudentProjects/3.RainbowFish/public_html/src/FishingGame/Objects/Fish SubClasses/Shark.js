/*
 * @auth: Herbert Traut
 * @file: Shark.js
 * @date: 11-28-15
 * @brief: Shark which chases fishing hook when the hook is nearby
 */


/* global GameObject, gEngine, Fish, vec2, SpriteAnimateRenderable */

'use strict';

function Shark(texture, normal){
    
    this.mFish = new IllumRenderable(texture, normal);

    this.mFish.setColor([1,1,1,0]);
    
    //GameObject.call(this, this.mFish);
    this.mStatus = 0;
    this.mScore = 1;
    this.mBounces = 0;
    
    GameObject.call(this, this.mFish);
    var front = vec2.fromValues(1, 0);
    
    this.setCurrentFrontDir(front);
    this.mFish.getXform().setRotationInRad(0);
    
    this.mFish.setElementPixelPositions(0, 1024, 0, 256);
    this.mFish.setSpriteSequence(256, 0, 1024, 256, 4, 0);
    this.mFish.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mFish.setAnimationSpeed(20);
    this.mFish.setColor([1,1,1,0]);
    
    
    
    this.mChaseDist = 20;
    this.mRotateRate = 0.3;
    this.mSpeed = 2;
    this.setSpeed(this.mSpeed);
    this.mInPursuit = false;
}
gEngine.Core.inheritPrototype(Shark, Fish);

Shark.eStatus = Object.freeze({
    eChase: 8
});

Shark.prototype.update = function (){
    
    var xform = this.mFish.getXform();
    if((this.mStatus & Fish.eStatus.eCollideRight) === Fish.eStatus.eCollideRight){
        this.mSpeed *= -1;
        xform.setWidth(-xform.getWidth());
        this.mStatus ^= Fish.eStatus.eCollideRight;
    }else if((this.mStatus & Fish.eStatus.eCollideLeft) === Fish.eStatus.eCollideLeft){
        this.mSpeed *= -1;
        xform.setWidth(-xform.getWidth());
        this.mStatus ^= Fish.eStatus.eCollideLeft;
    }
    
    // the following code is to keep the shark oreinted correctly 
    this.mRenderComponent.getXform().incXPosBy(this.mSpeed);
    if(this.mSpeed > 0){
        xform.setSize(Math.abs(xform.getWidth()), xform.getHeight());
    }
};

Shark.prototype.animSpeedSix = function(){
    this.mFish.setAnimationSpeed(6);
};

