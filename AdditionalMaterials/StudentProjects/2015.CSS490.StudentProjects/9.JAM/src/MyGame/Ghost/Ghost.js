/* File: DyePack.js
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


Ghost.eGhostState = Object.freeze({
    eWaveMovement: 15,
    eRising: 16,
    eFalling: 17,
    eWait: 18,
    eDied: 19,
    eFlee: 20
});

function Ghost(spriteTexture, deadSprite, x, y) {
    this.kRefWidth = 14;
    this.kRefHeight = 14;
    this.mAlive = true;
    // drawn when dead
    this.mDeadGhost = new LightRenderable(deadSprite);
    this.mDeadGhost.getXform().setSize(this.kRefWidth, this.kRefHeight);
    this.mDeadGhost.addLight(gLights.getLightAt(4));

    this.mGhost = new LightRenderable(spriteTexture);
    this.mGhost.setColor([1, 1, 1, 0.1]);
    this.mGhost.getXform().setPosition(x, y);
    this.mGhost.getXform().setSize(this.kRefWidth, this.kRefHeight);
    this.mGhost.addLight(gLights.getLightAt(4));
    GameObject.call(this, this.mGhost);
    this.mHealth = 1;
    this.mCurrentState = Ghost.eGhostState.eWait;

    // state is governed by time
    this.mStateTimeTick = 0;  // this is the time
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Ghost, GameObject);
// remove from set
Ghost.prototype.setExpired = function() {
    this.mExpired = true;
};
Ghost.prototype.hasExpired = function() {
    return this.mExpired;
};
// check which renderable to use
Ghost.prototype.isAlive = function() { return this.mAlive };

Ghost.prototype.draw = function (aCamera) {
    if (this.mCurrentState === Ghost.eGhostState.eDied) {
        this.mDeadGhost.draw(aCamera);
    }
    else GameObject.prototype.draw.call(this, aCamera);
};

Ghost.prototype.hitOnce = function () {
    this.mHealth--;
    if (this.mHealth <= 0 && this.mCurrentState !== Ghost.eGhostState.eDied) {
        this.mCurrentState = Ghost.eGhostState.eDied;
        this.mHealth = 4;
    } else if (this.mHealth <= 0 && this.mCurrentState === Ghost.eGhostState.eDied) {
        this.setExpired()
    }
};