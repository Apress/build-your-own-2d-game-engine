"use strict";

function SentryMinion(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;

    this.mNumCycles = 0;
    this.mSpotlight = this._createSpotLight(atX, atY, velocity);
    lightSet.addToSet(this.mSpotlight);
    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);

}
gEngine.Core.inheritPrototype(SentryMinion, Minion);

SentryMinion.prototype.update = function () {
    Minion.prototype.update.call(this);
    var b;
    this.mNumCycles++;
    if(this.mNumCycles > this.kShootTimer){
        this.mNumCycles = 0;
        b = new Projectile(this.getXform().getXPos() - 0.5, this.getXform().getYPos(), [-1, 0], 0.75);
        this.mProjectiles.addToSet(b);
    }
        
    var p = [0, 0];
    p[0] = this.getXform().getXPos() + this.kOffset;
    p[1] = this.getXform().getYPos();
    this.mSpotlight.set2DPosition(p);
};


SentryMinion.prototype._createSpotLight = function (atX, atY, velocity) {
    var lgt = new Light();
    lgt.setLightType(2);
    lgt.setColor([1, 1, 1, 1]);
    lgt.setXPos(atX - this.kOffset);
    lgt.setYPos(atY);
    lgt.setZPos(0.7);
    lgt.setDirection([-1, 0, -2]);
    lgt.setNear(15);
    lgt.setFar(20);
    lgt.setInner(0.1);
    lgt.setOuter(0.2);
    lgt.setIntensity(15);
    lgt.setDropOff(2);
    lgt.setLightCastShadowTo(true);
    return lgt;
};





