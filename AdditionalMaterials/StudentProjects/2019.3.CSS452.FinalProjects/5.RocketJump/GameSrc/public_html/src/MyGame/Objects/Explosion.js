/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Explosion(x, y) {
    //this.mExplosion = new TextureRenderable("assets/RigidShape/explosion.png");
    this.mExplosion = new IllumRenderable("assets/RigidShape/explosion.png", "assets/RigidShape/explosion_normal.png");
    this.mExplosion.setColor([1, 1, 1, 0]);
    this.mExplosion.getXform().setPosition(x, y);
    this.mExplosion.getXform().setSize(20, 20);
    
    GameObject.call(this, this.mExplosion);
   
    this.kLifespan = .3; // seconds
    
    this.mTime = Date.now();
    
    this.mCollisionShake = false;
    this.mHasCollision = false;
    this.mDyePackX = null;
    this.mDyePackY = null;
    
    this.mDestroyed = false;
    
    
}
gEngine.Core.inheritPrototype(Explosion, GameObject);

Explosion.prototype.update = function () {
    
    // Terminate
    if (Date.now() > this.mTime + (this.kLifespan * 1000)){
        this.mDestroyed = true;
    }
    
};

Explosion.prototype.isDestroyed = function () {
    return this.mDestroyed;
};

Explosion.prototype.setHasCollidedTrue = function () {
    this.mHasCollision = true;
};

Explosion.prototype.getHasCollided = function () {
    return this.mHasCollision;
};
