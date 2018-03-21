/* File: Granade.js
 *
 * Creates and initializes a an object which can be launched in changing directions
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function Grenade(texture, x, y) {
    this.kRefWidth = 8;
    this.kRefHeight = 8;
    this.kReferenceSpeed = 50 / (5 * 60);
            // cover 100 units in 5 seconds
    this.kDetectThreshold = 20;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    this.mChipOne = new LightRenderable(texture);
    this.mChipOne.setColor([1, 1, 1, 0]);
    this.mChipOne.getXform().setPosition(x, y);
    this.mChipOne.getXform().setSize(this.kRefWidth, this.kRefHeight);
    GameObject.call(this, this.mChipOne);
    this.mChipOne.addLight(gLights.getLightAt(4));
    this.setSpeed(0.3);
    // Expired to remove
    this.mExpired = false;
    this.mHit = false;
}
gEngine.Core.inheritPrototype(Grenade, GameObject);

// getter
Grenade.prototype.setExpired = function() {
    this.mExpired = true;
};
// setter
Grenade.prototype.hasExpired = function() {
    return this.mExpired;
};

// getter
Grenade.prototype.hasHit = function() {
    return this.mHit;
};

// trigger explosion
Grenade.prototype.setHit = function() {
    this.mHit = true;
};

// set random speed
Grenade.prototype._computeSpeed = function() {
    this.setSpeed((0.8 + 0.4 * Math.random()) * this.kReferenceSpeed);
};



