/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Projectile.kMissileTexture = null;
Projectile.kBeamTexture = null;

function Projectile(lgtRenderable, x, y, dir, damage, lgtSet, speed) {
            
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    this.mDamage = damage;
    if(this.mDamage < 1) { this.mDamage = 1; }

    lgtRenderable.getXform().setPosition(x, y);
    lgtRenderable.addLight(lgtSet.getLightAt(0));  
    lgtRenderable.addLight(lgtSet.getLightAt(1));  
    lgtRenderable.addLight(lgtSet.getLightAt(2));
    GameObject.call(this, lgtRenderable);
    
    this.setCurrentFrontDir([0, 1]);  // The textures all point up
    this.rotateObjPointToDir(dir, 1); // rotate the projectile to face in the correct direction
    this.setSpeed(speed);
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.getDamage = function() { return this.mDamage; };
Projectile.prototype.setExpired = function() {
    this.mExpired = true;
};
Projectile.prototype.hasExpired = function() {
    return this.mExpired;
};

Projectile.prototype.update = function(aCamera) {
   
   if(this.mExpired) { return; }
   
    GameObject.prototype.update.call(this);
    var hit = false;

    if (aCamera.collideWCBound(this.getXform(), 1.1) !== 
            BoundingBox.eboundCollideStatus.eInside)
            this.setExpired();
    
    return hit;
};