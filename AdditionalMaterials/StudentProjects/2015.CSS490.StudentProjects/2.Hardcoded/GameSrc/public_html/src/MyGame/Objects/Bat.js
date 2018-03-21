/* 
 * Author: Tyler Green, Steven Roberts
 * File: Bat.js
 * Purpose: This file contains the Bat object and update logic.
 */

/*
 * A Bat
 *  This object spawns on the far right and moves towards the left, slowly
 *      homing in towards the hero.
 *  @param atX - the X position it will spawn at.
 *  @param atY - the Y position it will spawn at.
 * 
 * NEEDS:
 *  - Update the renderable to a sprite, pass the sprite in as parameter
 *  - Fix Front direction so it doesn't fly straight up initially.
 */
function Bat(texture, atX, atY, target, normalMap) {
    
    //setup animation
    if (normalMap === null) {
        this.mBat = new LightRenderable(texture);
    } else {
        this.mBat = new IllumRenderable(texture, normalMap);
    }
    
    //this.mBat.setElementPixelPositions(0, 32, 32, 64);
    //this.mBat.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mBat.setAnimationSpeed(6);
    this.mBat.setSpriteSequence(64, 0, 32, 32, 5, 0);
    
    this.mBat.setColor([1, 0, 1, 0]);
    this.mBat.getXform().setSize(8, 8);
    this.mBat.getXform().setPosition(atX, atY);
    
    GameObject.call(this, this.mBat); 
    
    //this.setCurrentFrontDir([1, 0]); //??
    this.mSpeed = 0.4;
    this.mTurnSpeed = 0.35;
    this.mTarget = target;
    this.kDamage = 1;
}
gEngine.Core.inheritPrototype(Bat, GameObject);

/*
 * The bat moves from the right, towards the left.
 *  Faces towards the target, and will slowly alter course to attempt to
 *  intersect with the target.
 */
Bat.prototype.update = function() {
    this.mBat.updateAnimation();
    //Turn towards target, unless the target slips past it
    if(this.mTarget !== null) {
        //If hitting hero, hurt hero
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0) {
            var touchPos = [];
            if (this.mTarget.pixelTouches(this, touchPos)){ 
                this.mTarget.spin();
                this.mTarget.damage(this.kDamage);
            }
        }
        //change direction
        if(this.mTarget.getXform().getXPos() < this.mBat.getXform().getXPos()){
            this.changeTravelDirection(this.mTarget.getXform().getPosition(), 
                this.mTurnSpeed); 
        } else {
            //the target passed the bat, so go towards center
            this.changeTravelDirection([-100, 40], this.mTurnSpeed);
        }
    }
    //Default moving behavior - just move left
    //this.mBat.getXform().incXPosBy(-this.mSpeed);
    
    //Actually moving towards the target
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
};