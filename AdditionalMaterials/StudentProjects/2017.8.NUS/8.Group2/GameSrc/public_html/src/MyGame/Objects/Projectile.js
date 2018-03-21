/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable,BoundingBox, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//Projectile.kSpeed = 120 / (0.8 * 60);  
        // across the entire screen in 0.5 seconds
Projectile.kTexture = null;
Projectile.kTexture1 = null;
Projectile.kTexture2 = null;
Projectile.kTexture3 = null;
Projectile.size1 = 10;
Projectile.size2 = 20;
Projectile.kCue = null;
function Projectile(x, y, Power, speed, xdir, ydir, number) {
    this.kPower = Power;  
    this.kSpeed = speed / (0.8 * 60);
    this.kRefWidth = 10;
    this.kRefHeight = 10;
            
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    if(number===0)
        this.r = new TextureRenderable(Projectile.kTexture);
    else if(number===1)
        this.r = new TextureRenderable(Projectile.kTexture1);
    else if(number===2)
        this.r = new TextureRenderable(Projectile.kTexture2);
    else if(number===3)
        this.r = new TextureRenderable(Projectile.kTexture3);
    
    this.r.setColor([0.8, 1, 0.8, 0.1]);
    this.r.getXform().setPosition(x, y);
    this.r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    GameObject.call(this, this.r);
    
    this.setCurrentFrontDir([xdir, ydir]);
    this.setSpeed(this.kSpeed);
    
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


Projectile.prototype.update = function(Hero, StoneSet, allParticles, func, aCamera) {
    GameObject.prototype.update.call(this);
//    var xf = this.r.getXform();
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
//        xf.incYPosBy(Hero.kDelta);
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
//        xf.incXPosBy(-Hero.kDelta);
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
//        xf.incYPosBy(-Hero.kDelta);
//    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
//        xf.incXPosBy(Hero.kDelta);
    //this.r.getXform().incRotationByDegree(1);
    var hit = false;
    //delete Projectile when it is out of camera
    if (aCamera.collideWCBound(this.getXform(), 1.1) !== 
            BoundingBox.eboundCollideStatus.eInside){
            this.setExpired();
    }
    var p = vec2.fromValues(0, 0);
    //collision with stones
    var i, obj, StonecollisionPt = [0, 0],HerocollisionPt = [0,0];
    for (i=0; i<StoneSet.size(); i++) {
        obj = StoneSet.getObjectAt(i);
        if (this.pixelTouches(obj, StonecollisionPt)) {
            gEngine.AudioClips.playACue(Projectile.kCue);
            this.setExpired();
            obj.decreaseHP(this.kPower);
            hit = true;
            allParticles.addEmitterAt(StonecollisionPt, 200, func);
        }
    }
    //collision with Hero
    if (this.pixelTouches(Hero, HerocollisionPt)) {
            this.setExpired();
            Hero.decreaseHP(this.kPower);
            allParticles.addEmitterAt(HerocollisionPt, 200, func);
    }
    return hit;
};