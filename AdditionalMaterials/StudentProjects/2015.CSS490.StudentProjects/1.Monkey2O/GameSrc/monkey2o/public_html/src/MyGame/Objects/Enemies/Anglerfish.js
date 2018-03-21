/* File: Anglerfish.js 
 * Date: 12/13/2015
 * Author(s): Dexter Hu
 * 
 * The Anglerfish object.
 * It moves like a slower shark, and has a point light.
 * It doesn't react to the flashlight.  If the player touches it, player light is temporarily impaired.
 * It impairs the player light for longer as the player goes deeper.
 * Max 1 Anglerfish on screen at any time for the purposes of reducing the number of lights.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, Enemy, Player, PlayerState, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Anglerfish(spriteTexture, normalMap, atX, atY, camera, player, sound, radarSprite) {
    this.kDelta = Player.constants.delta / 10;      // Modifiable.  The speed to move rightwards, while roaming.
    this.kMaxRoamSpeed = 0.2;                       // Modifiable.  Max roam speed in x direction (once reached, change direction).
    this.kRoamAccel = 0.02;                         // Modifiable.  Pseudo-acceleration for changing the x speed for roaming.
    
    this.mRoamDir = 1;                              // Do not modify.  Indicates direction while roaming.
    this.mRoamAmount = 0;                           // Do not modify.  Current roaming amount.
    
    this.mSound = sound;
    this.mDepthProgress = 0;
    
    if (normalMap !== null) {
        this.mObj = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mObj = new LightRenderable(spriteTexture);
    }
    this.mObj.setColor([1, 1, 1, 0]);
    this.mObj.getXform().setPosition(atX, atY);
    this.mObj.getXform().setZPos(0);
    var size = 5 * Math.random() + 7;
    this.mObj.getXform().setSize(size, size);
    this.mObj.setSpriteSequence(255, 0,      // first element's (y, x) top-left pixel position (sprite sheet origin is bottom left)
                                127, 127,    // widthxheight in pixels
                                4,           // number of elements in this sequence
                                1);          // horizontal padding in between
    this.mObj.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mObj.setAnimationSpeed(12);
  
    Enemy.call(this, this.mObj, 1 /* collision type */, camera, player, radarSprite);
}
gEngine.Core.inheritPrototype(Anglerfish, Enemy);

Anglerfish.prototype.update = function () {
    // Calls updateState() and typical update function calls: collision, screen bounds checking, and destruction when it leaves screen.
    if (!this.updateAllowed()) {
        return;
    }
    
    Enemy.prototype.update.call(this);
    
    // Update animation 
    this.mObj.updateAnimation();
    
    // Only has one state: roaming
    this.roam();
};

Anglerfish.prototype.collided = function () {
    // Called from update after having collided with the player
    if(!this.kTarget.isImpaired()) {
      gEngine.AudioClips.playACue(this.mSound);
    }
    
    this.kTarget.mImpairedTimeLeft = 600 + (this.mDepthProgress * 900);
};

Anglerfish.prototype.updateState = function () {
    // Updates the state at the start of each update cycle
    
    // Only does updates to state and nothing else!
    if (this.mState === 0) {
        // Try to look for player
        var x1 = this.mObj.getXform().getXPos();
        var x2 = this.kTarget.getXform().getXPos();
        var y1 = this.mObj.getXform().getYPos();
        var y2 = this.kTarget.getXform().getYPos();
        if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) <= this.kChaseDistance) {
            this.mState = 1;
        }
    } else if (this.mState === 1) {
        // Decrease remaining chase time and change state if ran out of time
        this.mChaseTime--;
        if (this.mChaseTime === 0) {
            this.mState = 2;
        }
    }
    // Do nothing if state === 2, since it's the last state
};

Anglerfish.prototype.roam = function () {
    // Simulates moving upwards in a helix-like zigzag
    var xform = this.mObj.getXform();
    
    // Sentinel value for an off-screen anglerfish (needs a "respawn")
    if (xform.getXPos() === -1000 && xform.getYPos() === -1000) {
        return;
    }
    
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

Anglerfish.prototype.isInScreenX = function () {
    // Returns true if inside viewable area, and false if it has surpassed the right side of the screen
    
    var right = this.mCamera.getWCCenter()[0] + (this.mCamera.getWCWidth() / 2);
    var xform = this.mObj.getXform();
    var result = true;
           
    if (xform.getXPos() - (xform.getWidth() / 2) > right) {
        result = false;
    }

    return result;
};

Anglerfish.prototype.destroy = function () {
    // Hide this object (and as a result, its light) where it won't be seen
    var xform = this.mObj.getXform();
    xform.setXPos(-1000);
    xform.setYPos(-1000);
    this.mActive = false;
};