/* File: DyePack.js 
 *
 * Creates a DyePack object
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, TextureRenderable, RigidCircle*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(texture, atX, atY) {
    this.mCycleLeft = 300;

    this.mDyePack = new TextureRenderable(texture);

    this.mDyePack.setColor([1, 1, 1, 0]);
    this.mDyePack.getXform().setPosition(atX, atY);
    this.mDyePack.getXform().setSize(4, 3);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mDyePack);
    this.setSpeed(0.5);
    this.setCurrentFrontDir([1, 0]);

    var rigidShape = new RigidCircle(this.getXform(), 1.5);
    rigidShape.setMass(0.1);
    rigidShape.setAcceleration([0, 0]);
    rigidShape.setDrawBounds(true);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);


DyePack.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mCycleLeft--;
};

DyePack.prototype.hasExpired = function() { return this.mCycleLeft <= 0; };