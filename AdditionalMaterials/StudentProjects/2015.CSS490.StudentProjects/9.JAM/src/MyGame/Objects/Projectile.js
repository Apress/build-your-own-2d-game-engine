/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Projectile.kSpeed = 100 / (0.8 * 60);  
        // across the entire screen in 0.5 seconds
Projectile.kTexture = null;

function Projectile(x, y, light, dir) {
    var textInfo = gEngine.Textures.getTextureInfo(Projectile.kTexture);
    this.kRefHeight = 6;
    this.kRefWidth = this.kRefHeight / textInfo.mHeight * textInfo.mWidth;

    if(dir === null){
        dir = 0;
    }
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    var r = new LightRenderable(Projectile.kTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    GameObject.call(this, r);
    r.addLight(gLights.getLightAt(4)); 
     
    this.mLight = light;
    this.mLight.setXPos(x);
    this.mLight.setYPos(y);
    this.mLight.setNear(3);
    this.mLight.setFar(7);
    this.mLight.setLightTo(true);
    
    if(dir === undefined){
        this.setCurrentFrontDir([1, 0]);
    }else{
        this.setCurrentFrontDir(dir);
        this.mLight.setLightTo(false);
    }
    
    this.setSpeed(Projectile.kSpeed);
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.setExpired = function() {
    this.mExpired = true;
};
Projectile.prototype.hasExpired = function() {
    return this.mExpired;
};

Projectile.prototype.update = function(dyes, dyes2, dyes3Set, particle, func, aCamera, powerUpSet) {
    GameObject.prototype.update.call(this);
    this.mLight.setXPos(this.getXform().getXPos());
    this.mLight.setYPos(this.getXform().getYPos());
    var hit = false;
    // remove projectile if outside
    if (aCamera.collideWCBound(this.getXform(), 0.9) === BoundingBox.eboundCollideStatus.eOutside)
        this.setExpired();

    var i, obj;
    var p = vec2.fromValues(0, 0);
    for (i = 0; i < dyes.size(); i++) {
        obj = dyes.getObjectAt(i);
        if (this.pixelTouches(obj, p)) {
            this.setExpired();
            particle.addEmitterAt(p, 200, func);
            obj.hitOnce();
            hit = true;
        }
    }

    var j;
    for (j = 0; j < dyes2.size(); j++) {
        obj = dyes2.getObjectAt(j);
        if (this.pixelTouches(obj, p)) {
            this.setExpired();
            particle.addEmitterAt(p, 200, func);
            obj.setExpired();
            hit = true;
            powerUpSet.generateChanceAt(p);
        }
    }

    var q;
    for (q = 0; q < 10; q++) {
        var dyes3 = dyes3Set[q];
        var o;
        for (o = 0; o < dyes3.size(); o++) {
            obj = dyes3.getObjectAt(o);
            if (this.pixelTouches(obj, p)) {
                this.setExpired();
                particle.addEmitterAt(p, 200, func);
                obj.setExpired();
                hit = true;
            }
        }
    }
    return hit;
};

