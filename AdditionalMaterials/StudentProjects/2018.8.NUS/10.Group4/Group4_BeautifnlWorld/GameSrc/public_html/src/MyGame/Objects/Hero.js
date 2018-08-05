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
function Hero(spriteTexture) {
    this.kDelta = 0.5
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
gEngine.Core.inheritPrototype(Hero, WASDObj);

Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);
    var xform = this.getXform();
    var mot = false;

    var cPos = this.mDye.getElementPixelPositions();
 /*   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if(cPos[1] + 32 > 150) {
            xform.incYPosBy(this.kDelta);
            this.mDye.setElementPixelPositions(0, 32, 65, 95);
        }else {
            xform.incYPosBy(this.kDelta);
            this.mDye.setElementPixelPositions(cPos[0]+32, cPos[1]+32, 65, 95);
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) || gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if(cPos[0] - 32 < 0) {
            xform.incYPosBy(-this.kDelta);
            this.mDye.setElementPixelPositions(125, 155, 65, 95);
        }else {
            xform.incYPosBy(-this.kDelta);
            this.mDye.setElementPixelPositions(cPos[0]-32, cPos[1]-32, 65, 95);
        }
    }*/
    //this.mDye.setElementPixelPositions(730, 876, 664, 1024);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && xform.getXPos()>2) {
        motionstop +=1;
        mot = true;
        if(cPos[1] + 146 > 1022) {
            xform.incXPosBy(-this.kDelta);
            this.mDye.getXform().setSize(-8, 16);
            this.mDye.setElementPixelPositions(0, 146, 664, 1024);
        }else {
            xform.incXPosBy(-this.kDelta);
            if((motionstop%5) ===0){
                this.mDye.getXform().setSize(-8, 16);
            this.mDye.setElementPixelPositions(cPos[0]+146, cPos[1]+146, 664, 1024);
            }
        }       
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {      
        motionstop +=1;
        mot = true;
        if(cPos[1] + 146 > 1022) {
            xform.incXPosBy(this.kDelta);
            this.mDye.getXform().setSize(8, 16);
            this.mDye.setElementPixelPositions(0, 146, 304, 664);
        }else {
            xform.incXPosBy(this.kDelta);
            if((motionstop%5) ===0){
                this.mDye.getXform().setSize(8, 16);
            this.mDye.setElementPixelPositions(cPos[0]+146, cPos[1]+146, 304, 664);
            }
        }
    }

   if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
       mot = true;
           xform.incYPosBy(0.6);
           this.mDye.setElementPixelPositions(0, 146, 304, 664);  
    }
    if(mot === false) {
        this.mDye.setElementPixelPositions(730, 876, 664, 1024);
    }
    GameObject.prototype.update.call(this);
};