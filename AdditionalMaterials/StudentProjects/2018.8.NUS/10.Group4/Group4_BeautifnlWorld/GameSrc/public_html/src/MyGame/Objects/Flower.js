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

var motion;

function Flower(spriteTexture) {
    
    motion = 0;
    
    this.kDelta = 4.5;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(8.5, 60);
    this.mDye.getXform().setSize(8, 16);
    this.mDye.setElementPixelPositions(730, 876, 664, 1024);
    GameObject.call(this, this.mDye);
    
    var r = new RigidRectangle(this.getXform(), 5, 15);
    this.setRigidBody(r);

    this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Flower, WASDObj);

Flower.prototype.update = function () {
    GameObject.prototype.update.call(this);
    var xform = this.getXform();
    var up = false;

    var cPos = this.mDye.getElementPixelPositions();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        motion +=1;
        if(cPos[1] + 146 > 1022) {
            xform.incXPosBy(-this.kDelta);
            this.mDye.setElementPixelPositions(0, 146, 664, 1024);
        }else {
            xform.incXPosBy(-this.kDelta);
            if((motion%5) ===0){
            this.mDye.setElementPixelPositions(cPos[0]+146, cPos[1]+146, 664, 1024);
            }
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {      
        motion +=1;
        if(cPos[1] + 146 > 1022) {
            xform.incXPosBy(this.kDelta);
            this.mDye.setElementPixelPositions(0, 146, 304, 664);
        }else {
            xform.incXPosBy(this.kDelta);
            if((motion%5) ===0){
            this.mDye.setElementPixelPositions(cPos[0]+146, cPos[1]+146, 304, 664);
            }
        }
    }

//   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
//           xform.incYPosBy(0.5);
//           this.mDye.setElementPixelPositions(0, 146, 304, 664);
//        
//    }
    else 
    {
         //this.mDye.setElementPixelPositions(730, 876, 664, 1024);
    }
    GameObject.prototype.update.call(this);
};