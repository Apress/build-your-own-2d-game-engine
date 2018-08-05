/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bomb(spriteTexture,cX,cY) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(cX, cY);
    this.mDye.getXform().setSize(2, 2);
    this.mDye.setElementPixelPositions(0, 30, 65, 95);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 2, 2);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}

gEngine.Core.inheritPrototype(Bomb, WASDObj);

Bomb.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.getRigidBody().userSetsState();
};