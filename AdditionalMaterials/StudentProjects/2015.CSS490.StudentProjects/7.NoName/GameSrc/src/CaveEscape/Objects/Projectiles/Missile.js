"use strict";

function Missile (x, y, dir, damage, lgtSet, speed, target, homingRate) {
    
    // Setup the missile renderable
    var r = new LightRenderable(Projectile.kMissileTexture);
    r.getXform().setSize(0.5, 1);

    // Call the projectile constructor
    Projectile.call(this, r, x, y, dir, damage, lgtSet, speed);
    
    this.kHomingRate = homingRate;
    this.kTarget = target;
}
gEngine.Core.inheritPrototype(Missile, Projectile);

Missile.prototype.update = function (aCamera) {
    Projectile.prototype.update.call(this, aCamera);
    this.rotateObjPointTo(this.kTarget.getXform().getPosition(), this.kHomingRate);
};