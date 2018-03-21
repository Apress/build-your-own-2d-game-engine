/* File: Eel.js 
 * Date: 12/13/2015
 * Author(s): Dexter Hu
 * 
 * The Eel object.
 * It moves diagonally and has a pixel-accurate collision.
 * If hit by a flashlight, temporarily chase the player.
 * It gains a definite boost to size as the player goes deeper.
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, Enemy, Player, PlayerState, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Eel(spriteTexture, normalMap, atX, atY, camera, player, depthProgress, radarSprite) {
    this.kDelta = 0.2;          // Modifiable.  Speed to move.
    this.kDelta2 = 0.4;         // Modifiable.  How fast to chase.
    
    this.mChaseTime = 30;       // Modifiable.  The starting number of updates to chase (reduces itself while active).
    
    if (normalMap !== null) {
        this.mObj = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mObj = new LightRenderable(spriteTexture);
    }
    this.mObj.setColor([1, 1, 1, 0]);
    this.mObj.getXform().setPosition(atX, atY);
    this.mObj.getXform().setZPos(0);
    var size = 6 * Math.random() + 8 + (3 * depthProgress);
    this.mObj.getXform().setSize(size, size);
    this.mObj.setSpriteSequence(127, 1,      // first element's (y, x) top-left pixel position (sprite sheet origin is bottom left)
                                126, 127,    // widthxheight in pixels
                                2,           // number of elements in this sequence
                                2);          // horizontal padding in between
    this.mObj.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mObj.setAnimationSpeed(24);
  
    Enemy.call(this, this.mObj, 1 /* collision type */, camera, player, radarSprite);
}
gEngine.Core.inheritPrototype(Eel, Enemy);

Eel.prototype.update = function () {
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

Eel.prototype.collided = function () {
    // Called from update after having collided with the player
    if (this.kTarget.getState() !== PlayerState.constants.states.incapacitated) {
        this.kTarget.incapacitate();
        this.mCamera.shake(-2, -2, 20, 30);
    }
};

Eel.prototype.updateState = function () {
    // Updates the state at the start of each update cycle
    
    // Only does updates to state and nothing else!
    if (this.mState === 0 && this.checkFlashlight()) {
        // State 0 and flashlight causes change to state 1
        this.mState = 1;
    } else if (this.mState === 1) {
        // Decrease remaining chase time and change state if ran out of time
        this.mChaseTime--;
        if (this.mChaseTime === 0) {
            this.mState = 2;
        }
    }
    // Do nothing if state === 2, since it's the last state
};

Eel.prototype.roam = function () {
    // Simulates moving diagonally
    var xform = this.mObj.getXform();
    xform.incYPosBy(this.kDelta);
    xform.incXPosBy(-1 * this.kDelta);
};

Eel.prototype.chase = function () {
    // Chase this.kTarget with this.kDelta amount
    var xform = this.mObj.getXform();
    var dx = this.kTarget.getXform().getXPos() - xform.getXPos();
    var dy = this.kTarget.getXform().getYPos() - xform.getYPos() - Player.constants.delta;
    var hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (hyp > this.kDelta2) {
        var fraction = hyp / this.kDelta2;
        dx /= fraction;
        dy /= fraction;
    }
    xform.incXPosBy(dx);
    xform.incYPosBy(dy);
};