/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Rocket(x, y, speed) {
    //this.mRocket = new TextureRenderable("assets/RigidShape/rocket.png");
    this.mRocket = new IllumRenderable("assets/RigidShape/rocket.png", "assets/RigidShape/rocket_normal.png");
    this.mRocket.setColor([1, 1, 1, 0]);
    this.mRocket.getXform().setPosition(x, y);
    this.mRocket.getXform().setSize(8, 8);
    
    GameObject.call(this, this.mRocket);
    this.setSpeed(speed);
    //.7 default speed
   
    this.kLifespan = 5; // seconds
    
    this.mTime = Date.now();
    
    this.mCollisionShake = false;
    this.mHasCollision = false;
    this.mDyePackX = null;
    this.mDyePackY = null;
    
    this.mDestroyed = false;
    
    var mouselocation = vec2.fromValues(gEngine.Input.getMousePosX()/4, gEngine.Input.getMousePosY()/4);
    this.rotateObjPointTo(mouselocation, 1);
    
}
gEngine.Core.inheritPrototype(Rocket, GameObject);

Rocket.prototype.update = function () {
    var xform = this.getXform();
    
    // Terminate
    if (Date.now() > this.mTime + (this.kLifespan * 1000)
            || xform.getXPos() > 200
            || this.kSpeed <= 0) {
        this.mDestroyed = true;
    }
    
    
    GameObject.prototype.update.call(this);
};

Rocket.prototype.isDestroyed = function () {
    return this.mDestroyed;
};

Rocket.prototype.setHasCollidedTrue = function () {
    this.mHasCollision = true;
};

Rocket.prototype.getHasCollided = function () {
    return this.mHasCollision;
};
