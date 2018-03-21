/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Projectile2.kSpeed = 100 / (0.8 * 60);  
        // across the entire screen in 0.5 seconds
Projectile2.kTexture = null;

function Projectile2(x, y) {
    this.kRefWidth = 4.5;
    this.kRefHeight = 4.5;
            
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    var r = new TextureRenderable(Projectile2.kTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    GameObject.call(this, r);
    
    this.setCurrentFrontDir([0, -1]);
    this.setSpeed(Projectile2.kSpeed);
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Projectile2, GameObject);

Projectile2.prototype.setExpired = function() {
    this.mExpired = true;
};
Projectile2.prototype.hasExpired = function() {
    return this.mExpired;
};


Projectile2.prototype.update = function(dyes, aCamera) {
    GameObject.prototype.update.call(this);
    var hit = false;
    
    if (aCamera.collideWCBound(this.getXform(), 1.1) !== 
            BoundingBox.eboundCollideStatus.eInside)
            this.setExpired();
    
    var i, obj;
    var p = vec2.fromValues(0, 0);
    for (i=0; i<dyes.size(); i++) {
        obj = dyes.getObjectAt(i);
        if (this.pixelTouches(obj, p)) {
            this.setExpired();
            obj.setExpired();
            hit = true;
        }
    }
    
    return hit;
};