/* File: 		Projectile.js
 * Author:      	Ryu Muthui, Michael Voght, Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Defines the Projectile and logic for firing of projectiles */
"use strict";  

Projectile.kSpeed = 8; 
Projectile.kTexture = null;

function Projectile(x, y, owner) {
    this.kRefWidth = 7;
    this.kRefHeight = 20;    
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
    var r = new LightRenderable(Projectile.kTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    GameObject.call(this, r, owner);
    this.mOwner = owner;
    
    this.setCurrentFrontDir(owner.getCurrentFrontDir());
    this.setSpeed(Projectile.kSpeed);
    
    // Expired to remove
    this.mExpired = false;
    this.kEnemy_CollisionSFX = "assets/Audio/SFX/SmallExplosion_SFX.mp3";
}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.setExpired = function() { this.mExpired = true; };
Projectile.prototype.hasExpired = function() { return this.mExpired; };

Projectile.prototype.update = function(target, aCamera, particles) {
    GameObject.prototype.update.call(this);
    if (this.mOwner instanceof Enemy_Turret) {
        if (vec2.distance(this.mOwner.getXform().getPosition(), this.getXform().getPosition()) > 2000)
            this.setExpired();
    }
    else {
        if (aCamera.collideWCBound(this.getXform(), 1.1) !== BoundingBox.eboundCollideStatus.eInside){
            this.setExpired();
        }
    }
    
    var i, obj;
    var p = vec2.fromValues(0, 0);
    for (i=0; i<target.size(); i++) {
        obj = target.getObjectAt(i);
        if (!(obj instanceof Shield)) {
            if (this.pixelTouches(obj, p)) {
                this.setExpired();
                particles.addEmitterAt(this.getXform().getPosition(), 25, createParticleProjectile, this.mOwner);
                aCamera.shake(5, 5, 20, 30);
                if (!(this.mOwner instanceof StarFighter))
                    score -= 100;
                gEngine.AudioClips.playACue(this.kEnemy_CollisionSFX);
                obj.hitOnce(aCamera, particles);
            }
        }
    }
};
