/* File: 		PowerUp.js
 * Author:      	Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes power up for health objects. */
"use strict";

function PowerUp(renderableObj, x, y) {
    this.mPowerUp = renderableObj;
    this.mPowerUp.setSpriteSequence(32, 0,   
                                    32, 32,   // WidthxHeight in pixels for 1 frame
                                    2,        // number of frames to animate in this sequence
                                    0);       // horizontal padding in between
    // adjust type to set dir of animation
    this.mPowerUp.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    // adjust this for animation speed
    this.mPowerUp.setAnimationSpeed(10);
    this.mPowerUp.getXform().setPosition(x, y);
    this.mPowerUp.getXform().setSize(40, 40);
    GameObject.call(this, this.mPowerUp);
    
    this.mPowerUpMiniMap = new Renderable();
    this.mPowerUpMiniMap.setColor([0, 0, 1, 1]);
    this.mPowerUpMiniMap.getXform().setSize(40, 40);
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(PowerUp, GameObject);

PowerUp.prototype.update = function() {
    this.mPowerUpMiniMap.getXform().setPosition(this.getXform().getXPos(), 
        this.getXform().getYPos());
    this.mPowerUp.updateAnimation();
};

PowerUp.prototype.drawRenderable = function (aCamera) {
    if(!this.mExpired){
        this.mPowerUpMiniMap.draw(aCamera);
    }
};

PowerUp.prototype.setExpired = function() { this.mExpired = true; };
PowerUp.prototype.hasExpired = function() { return this.mExpired; };