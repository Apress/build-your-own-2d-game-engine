"use strict";

function RegenerationBuff (remainTurns, texture) {
    Buff.call(this, remainTurns, texture);

    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(RegenerationBuff, Buff);

RegenerationBuff.prototype.update = function (currentTurns) {
    var pos = this.mPlayer.getArcher().getXform().getPosition();
    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(pos[0], pos[1]);
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);

    this.mVisible.updateAnimation();
    this.mVisible.getXform().setPosition(pos[0], pos[1]);
    if (this.mCurrentTurns < currentTurns) {
        this.mCurrentTurns++;
        if (this.mPlayer.mIndex === 0) {
            if (this.mCurrentTurns % 2 === 1) {
                this.effect();
            }
        }
        else if (this.mPlayer.mIndex === 1) {
            if (this.mCurrentTurns % 2 === 0) {
                this.effect();
            }
        }
    }
    else if (currentTurns > this.mEndTurns) {
        this.end();
    }
};

RegenerationBuff.prototype.draw = function (aCamera) {
    this.mVisible.draw(aCamera);
    this.mParticles.draw(aCamera);
};

RegenerationBuff.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eHeart, atX, atY, life);

    p.getRenderable().setColor([1, 1, 1, 0.5]);

    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 0.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getParticle().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(0.98);

    return p;
};

RegenerationBuff.prototype.effect = function () {
    this.mPlayer.getArcher().addHp(1);
};