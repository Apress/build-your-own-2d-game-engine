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

function Herine(spriteTexture) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(90, 13);
    this.mDye.getXform().setSize(8, 16);
    this.mDye.setElementPixelPositions(0, 256, 0, 512);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 5, 10);
    r.setMass(0);
    this.setRigidBody(r);
    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Herine, WASDObj);

Herine.prototype.update = function () {
    GameObject.prototype.update.call(this);
//    var xform = this.getXform();
//    var cPos = this.mDye.getElementPixelPositions();
//    
//    if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.A) || gEngine.Input.isKeyPressed(gEngine.Input.keys.A))) {
//        if(cPos[0] + 256 > 1024) {
//            xform.incXPosBy(-this.kDelta);
//            this.mDye.setElementPixelPositions(0, 256, 512, 1024);
//        }else {
//            xform.incXPosBy(-this.kDelta);
//            this.mDye.setElementPixelPositions(cPos[0]+256, cPos[1]+256, 512, 1024);
//        }
//    }
//    else if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.D) || gEngine.Input.isKeyPressed(gEngine.Input.keys.D))) {
//        if(cPos[1] + 256 > 1024) {
//            xform.incXPosBy(this.kDelta);
//            this.mDye.setElementPixelPositions(0, 256, 0, 512);
//        }else {
//            xform.incXPosBy(this.kDelta);
//            this.mDye.setElementPixelPositions(cPos[0]+256, cPos[1]+256, 0, 512);
//        }
//    }
//    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || gEngine.Input.isKeyPressed(gEngine.Input.keys.W) ){
//            xform.incYPosBy(0.5);
//            this.mDye.setElementPixelPositions(0, 256, 512, 1024);
//    }
//    else 
//    {
//         this.mDye.setElementPixelPositions(768, 1024, 0, 512);
//    }
    this.getRigidBody().userSetsState();
};