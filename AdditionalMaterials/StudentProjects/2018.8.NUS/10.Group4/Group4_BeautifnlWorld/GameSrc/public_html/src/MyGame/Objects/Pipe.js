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

function Pipe(spriteTexture,atX, atY,cX,cY,lX,lY) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(10, 10);
    this.mDye.setElementPixelPositions(cX,cY,lX,lY);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 10, 10);
    r.setMass(0);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();

}
gEngine.Core.inheritPrototype(Pipe, WASDObj);

Pipe.prototype.update = function () {
    GameObject.prototype.update.call(this);
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        
    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
//        xform.incRotationByDegree(90);
//    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {
//        xform.incRotationByDegree(-90);
//    }
    this.getRigidBody().userSetsState();
};

