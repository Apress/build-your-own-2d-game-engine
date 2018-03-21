/* File: Monster.js 
 *
 * Creates and initializes the Monster (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, SpriteRenderable, RigidCircle, RigidRectangle, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Ship(spriteTexture, atX, atY) {
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(24,24);
    this.mDye.setElementPixelPositions(0,128, 0, 128);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Ship, GameObject);


