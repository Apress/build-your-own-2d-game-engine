/* File: Squid.js 
 * Date: 12/13/2015
 * Author(s): Dexter Hu
 * 
 * The Squid object.
 * It moves leftward in a helix pattern and also temporarily chases the player if near, reverting to the helix-movement after.
 * It doesn't react to the flashlight.
 * It accelerates into a larger helix as the player goes deeper.
 * It gains a larger max size as the player goes deeper.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, Enemy, Player, PlayerState, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Squid(spriteTexture, normalMap, atX, atY, camera, player, depthProgress, radarSprite) {
    this.kDelta = 0;                                // Modifiable.  Makes you go left faster.
    this.kDelta2 = 0.5;                             // Modifiable.  How fast to chase.
    this.kMaxRoamSpeed = 0.2 * depthProgress + 0.3; // Modifiable.  Max roam speed in x direction (once reached, change direction).
    this.kRoamAccel = 0.01;                         // Modifiable.  Pseudo-acceleration for changing the x speed for roaming.
    this.kChaseDistance = 30;                       // Modifiable.  Chase if within this distance.
    
    this.mChaseTime = 20;                           // Modifiable.  The starting number of updates to chase (reduces itself while active).
    this.mRoamDir = 1;                              // Do not modify.  Indicates direction while roaming.
    this.mRoamAmount = 0;                           // Do not modify.  Current roaming amount.
    
    if (normalMap !== null) {
        this.mObj = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mObj = new LightRenderable(spriteTexture);
    }
    this.mObj.setColor([1, 1, 1, 0]);
    this.mObj.getXform().setPosition(atX, atY);
    this.mObj.getXform().setZPos(0);
    var size = (5 + (3 * depthProgress)) * Math.random() + 7;
    this.mObj.getXform().setSize(size, size);
    this.mObj.setSpriteSequence(384, 0,      // first element's (y, x) top-left pixel position (sprite sheet origin is bottom left)
                                128, 128,    // widthxheight in pixels
                                4,           // number of elements in this sequence
                                0);          // horizontal padding in between
    this.mObj.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mObj.setAnimationSpeed(12);
  
    Enemy.call(this, this.mObj, 1 /* collision type */, camera, player, radarSprite);
}
gEngine.Core.inheritPrototype(Squid, Enemy);

Squid.prototype.update = function () {
    // Calls updateState() and typical update function calls: collision, screen bounds checking, and destruction when it leaves screen.
    if (!this.updateAllowed()) {
        return;
    }
    
    Enemy.prototype.update.call(this);
    
    // Update animation 
    this.mObj.updateAnimation();
    
    // Perform the appropriate behavior
    switch (this.mState) {
        case 0:
            this.roam();    // Roam and look for player
            break;
        case 1:
            this.chase();   // Temporarily chase player
            break;
        case 2:
            this.roam();    // Roam but never look for the player again
            break;
    }
};

Squid.prototype.collided = function () {
    // Called from update after having collided with the player
    if (this.kTarget.getState() !== PlayerState.constants.states.incapacitated) {
        this.kTarget.incapacitate();
        this.mCamera.shake(-2, -2, 20, 30);
    }
};

Squid.prototype.updateState = function () {
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

Squid.prototype.roam = function () {
    // Simulates moving upwards in a helix-like zigzag
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

Squid.prototype.chase = function () {
    // Chase this.kTarget with this.kDelta amount
    var xform = this.mObj.getXform();
    var dx = this.kTarget.getXform().getXPos() - xform.getXPos() + Player.constants.delta;
    var dy = this.kTarget.getXform().getYPos() - xform.getYPos();
    var hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (hyp > this.kDelta2) {
        var fraction = hyp / this.kDelta2;
        dx /= fraction;
        dy /= fraction;
    }
    xform.incXPosBy(dx);
    xform.incYPosBy(dy);
};