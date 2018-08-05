/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update funciton of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Minion(atX, atY, texture,  w, h) {
    this.kDelta = 0.1;
    this.kWidth = w;
    this.kHeight = h;
    this.kSpeed = 0.03;
    this.HP = 3;
    this.mProjectiles = new ParticleGameObjectSet();
    this.mMinion = new SpriteAnimateRenderable(texture);

    this.changeSprite(atX, atY);
    GameObject.call(this, this.mMinion);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(1);  // ensures no movements!
    rigidShape.toggleDrawBound();
    rigidShape.setFriction(0);
    rigidShape.setInertia(0);
    this.setRigidBody(rigidShape);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
    // remember to update this.mMinion's animation
   // this.mMinion.updateAnimation();
    this.mProjectiles.update();
    GameObject.prototype.update.call(this);
    this.getRenderable().updateAnimation();
};

Minion.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

Minion.prototype.changeSprite = function (atX, atY) {
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(this.kWidth, this.kHeight);
};

Minion.prototype.getProjectiles = function () {
    return this.mProjectiles;
};
