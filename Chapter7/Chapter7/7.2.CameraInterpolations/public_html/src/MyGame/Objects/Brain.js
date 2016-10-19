/* File: Brain.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Brain(spriteTexture) {
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.01;
    this.mBrain = new SpriteRenderable(spriteTexture);
    this.mBrain.setColor([1, 1, 1, 0]);
    this.mBrain.getXform().setPosition(50, 10);
    this.mBrain.getXform().setSize(3, 5.4);
    this.mBrain.setElementPixelPositions(600, 700, 0, 180);

    GameObject.call(this, this.mBrain);

    this.setSpeed(0.3);
}
gEngine.Core.inheritPrototype(Brain, GameObject);

Brain.prototype.update = function () {
    GameObject.prototype.update.call(this);  // default moving forward

    var xf = this.getXform();
    var fdir = this.getCurrentFrontDir();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xf.incRotationByDegree(this.kDeltaDegree);
        vec2.rotate(fdir, fdir, this.kDeltaRad);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xf.incRotationByRad(-this.kDeltaRad);
        vec2.rotate(fdir, fdir, -this.kDeltaRad);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        this.incSpeedBy(this.kDeltaSpeed);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        this.incSpeedBy(-this.kDeltaSpeed);
    }
};