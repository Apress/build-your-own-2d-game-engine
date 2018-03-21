/* File: Shark.js 
 * Date: 12/13/2015
 * Author(s): Dexter Hu
 * 
 * The Shark object. 
 * It moves left to right in a helix pattern.
 * If hit by a flashlight, flee from the player until out of range.
 * It moves faster in terms of x as the player goes deeper.
 * It gains a larger max size as the player goes deeper.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, Enemy, Player, PlayerState, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Shark(spriteTexture, normalMap, atX, atY, camera, player, depthProgress, radarSprite) {
    this.kDelta = (Player.constants.delta / 9.5) * (1 + (0.2 * depthProgress));     // Modifiable.  The speed to move rightwards, while roaming.
    this.kMaxRoamSpeed = 0.5;                                                       // Modifiable.  Max roam speed in x direction (once reached, change direction).
    this.kRoamAccel = 0.02;                                                         // Modifiable.  Pseudo-acceleration for changing the x speed for roaming.
    
    this.mRoamDir = 1;                                                              // Do not modify.  Indicates direction while roaming.
    this.mRoamAmount = 0;                                                           // Do not modify.  Current roaming amount.
    
    if (normalMap !== null) {
        this.mObj = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mObj = new LightRenderable(spriteTexture);
    }
    this.mObj.setColor([1, 1, 1, 0]);
    this.mObj.getXform().setPosition(atX, atY);
    this.mObj.getXform().setZPos(0);
    var size = (8 + (3 * depthProgress)) * Math.random() + 8;
    this.mObj.getXform().setSize(size, size);
    this.mObj.setSpriteSequence(512, 1,      // first element's (y, x) top-left pixel position (sprite sheet origin is bottom left)
                                126, 127,    // widthxheight in pixels
                                4,           // number of elements in this sequence
                                2);          // horizontal padding in between
    this.mObj.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mObj.setAnimationSpeed(12);
  
    Enemy.call(this, this.mObj, 1 /* collision type */, camera, player, radarSprite);
}
gEngine.Core.inheritPrototype(Shark, Enemy);

Shark.prototype.update = function () {
    // Calls updateState() and typical update function calls: collision, screen bounds checking, and destruction when it leaves screen.
    if (!this.updateAllowed()) {
        return;
    }
    
    Enemy.prototype.update.call(this);
    
    // Update animation 
    this.mObj.updateAnimation();
    
    // If hit by flashlight, then react, else, roam as normal
    if (this.checkFlashlight()) {
        this.reactFlashlight();
    } else {
        this.roam();
    }
};

Shark.prototype.collided = function () {
    // Called from update after having collided with the player
    if (this.kTarget.getState() !== PlayerState.constants.states.incapacitated) {
        this.kTarget.incapacitate();
        this.mCamera.shake(-2, -2, 20, 30);
    }
};

Shark.prototype.roam = function () {
    // Simulates moving rightward in a helix-like zigzag
    var xform = this.mObj.getXform();
    xform.incXPosBy(this.kDelta);
    xform.incYPosBy(this.mRoamAmount);
    
    /* Update variables for the next roam cycle.
     * Speed fluctuates from negative this.mRoamAmount to positive this.mRoamAmount.
     */
    if (this.mRoamDir === -1) {
        if (Math.abs(this.mRoamAmount - this.kRoamAccel) <= this.kMaxRoamSpeed) {
            this.mRoamAmount -= this.kRoamAccel;
        } else {
            this.mRoamDir = 1;
            this.mRoamAmount += this.kRoamAccel;
        }
    } else {
        if (this.mRoamAmount + this.kRoamAccel <= this.kMaxRoamSpeed) {
            this.mRoamAmount += this.kRoamAccel;
        } else {
            this.mRoamDir = -1;
            this.mRoamAmount -= this.kRoamAccel;
        }
    }
};

Shark.prototype.reactFlashlight = function () {
    // Run away from the player
    var xform = this.mObj.getXform();
    var dx = this.kTarget.getXform().getXPos() - xform.getXPos() + Player.constants.delta;
    var dy = this.kTarget.getXform().getYPos() - xform.getYPos();
    var hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (hyp > this.kDelta) {
        var fraction = hyp / this.kDelta;
        dx /= fraction;
        dy /= fraction;
    }
    xform.incXPosBy(-1.5 * dx);
    xform.incYPosBy(-1.5 * dy);
};

Shark.prototype.isInScreenX = function () {
    // Returns true if inside viewable area, and false if it has surpassed the right side of the screen
    
    var right = this.mCamera.getWCCenter()[0] + (this.mCamera.getWCWidth() / 2);
    var xform = this.mObj.getXform();
    var result = true;
           
    if (xform.getXPos() - (xform.getWidth() / 2) > right) {
        result = false;
    }

    return result;
};