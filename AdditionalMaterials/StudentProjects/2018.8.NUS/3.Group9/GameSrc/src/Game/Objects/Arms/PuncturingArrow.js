"use strict";

function PuncturingArrow(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    Arrow.call(
        this,
        posX, posY, vX, vY,
        Arrow.eAssets.ePuncturingArrowTexture,
        aAllObjs, aObstacle, aDestroyable, aProps,
        master
    );

    this.mVx = vX;
    this.mVy = vY;

    this.mHitSet = new GameObjectSet();
    this.mDamage = 4;

    this.mSoundTimer = 0;

    //particles
    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();
}

gEngine.Core.inheritPrototype(PuncturingArrow, Arrow);


PuncturingArrow.prototype.update = function () {
    Arrow.prototype.update.call(this);

    this.mSoundTimer++;
    if (this.mSoundTimer > 30) {
        //gEngine.AudioClips.playACue(Arrow.eAudio.ePuncturing);
        this.mSoundTimer = 0;
    }

    this.getRigidBody().setVelocity(this.mVx, this.mVy);

    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

PuncturingArrow.prototype.draw = function (aCamera) {
    this.mParticles.draw(aCamera);
    Arrow.prototype.draw.call(this, aCamera);
};

PuncturingArrow.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eSnow, atX, atY, life);

    p.getRenderable().setColor([1, 1, 1, 1]);

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

PuncturingArrow.prototype.effectOnObstacle = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.ePuncturing);

    if (!this.mHitSet.hasObject(obj)) {
        this.mHitSet.addToSet(obj);
        if (this.mDamage >= 2)
            this.mDamage--;
    }
};

PuncturingArrow.prototype.effectOnArcher = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.ePuncturing);

    if (obj === this.mMaster) {
        this.mMaster.loseHp(1);
    }
    else if (!this.mHitSet.hasObject(obj)) {
        obj.loseHp(this.mDamage);
        this.mHitSet.addToSet(obj);
    }
};

PuncturingArrow.prototype.effectOnDestroyable = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.ePuncturing);

    if (obj instanceof LifePotion) {
        this.mMaster.getArcher().addHp(obj.getRestore());
        this.mAllObjs.removeFromSet(obj);
        this.mDestroyable.removeFromSet(obj);
        this.mProps.removeFromSet(obj);
    }
    else if (obj instanceof Bow) {
        this.mMaster.getMoreArm(obj.getArmNum(), obj.getArmAmount());
        this.mAllObjs.removeFromSet(obj);
        this.mDestroyable.removeFromSet(obj);
        this.mProps.removeFromSet(obj);
    }
    else if (obj instanceof Mine) {
        obj.explode();
    }

    if (!this.mHitSet.hasObject(obj)) {
        this.mHitSet.addToSet(obj);
        if (this.mDamage >= 3)
            this.mDamage--;
    }
};
