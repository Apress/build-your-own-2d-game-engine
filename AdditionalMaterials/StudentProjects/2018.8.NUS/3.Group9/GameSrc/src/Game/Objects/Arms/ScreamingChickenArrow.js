"use strict";

function ScreamingChickenArrow(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    if (vX < 0) {
        Arrow.call(
            this,
            posX, posY, vX, vY, Arrow.eAssets.eScreamingChickenArrowLeftTexture,
            aAllObjs, aObstacle, aDestroyable, aProps,
            master
        );
        this.mArrow.getXform().setSize(8, 8);
        this.mArrow.setSpriteSequence(496, 336, 64, 64, 2, 32);
    }
    else {
        Arrow.call(
            this,
            posX, posY, vX, vY, Arrow.eAssets.eScreamingChickenArrowRightTexture,
            aAllObjs, aObstacle, aDestroyable, aProps,
            master
        );
        this.mArrow.getXform().setSize(8, 8);
        this.mArrow.setSpriteSequence(496, 16, 64, 64, 2, 32);
    }
    var r = new RigidRectangle(this.getXform(), 8, 8);
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(vX, vY);
    this.getRigidBody().setMass(0.1);
    
    this.mIsChicken = false;
    this.mScreamingChicken = null;

    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();

    this.mAffected = [];

    this.mDirection = 0;

    this.mSoundTimer = 0;
//    this.toggleDrawRigidShape(); // Draw RigidShape
}
gEngine.Core.inheritPrototype(ScreamingChickenArrow, Arrow);


ScreamingChickenArrow.prototype.update = function () {
    this.mSoundTimer++;
    if (this.mSoundTimer > 60) {
        gEngine.AudioClips.playACue(Arrow.eAudio.eChickenScreaming);
        this.mSoundTimer = 0;
    }

    Arrow.prototype.update.call(this);
    this.mArrow.getXform().setRotationInRad(0);
    if (this.mIsChicken) {
        if (this.mDirection) {
            this.getRigidBody().setVelocity(100, -30);
        }
        else {
            this.getRigidBody().setVelocity(-100, -30);
        }
    }
    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

ScreamingChickenArrow.prototype.draw = function (aCamera) {
    if (!this.mIsChicken) {
        this.mParticles.draw(aCamera);
        Arrow.prototype.draw.call(this, aCamera);
    }
    else {
        this.mParticles.draw(aCamera);
        Arrow.prototype.draw.call(this, aCamera);
    }
};

ScreamingChickenArrow.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eEmoji, atX, atY, life);
    p.getRenderable().setColor([0.2, 0.2, 0.2, 0]);

    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);

    p.setFinalColor([0.2, 0.2, 0.2, 0]);

    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getParticle().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(0.98);

    return p;
};

ScreamingChickenArrow.prototype.isChicken = function () {
    return this.mIsChicken;
};
ScreamingChickenArrow.prototype.getScreamingChicken = function () {
    return this.mScreamingChicken;
};

ScreamingChickenArrow.prototype.effectOnArcher = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.eChickenScreaming);
    var i;
    var hasDamaged = 0;
    for (i = 0; i < this.mAffected.length; ++i) {
        if (obj === this.mAffected[i]) {
            hasDamaged = 1;
            break;
        }
    }
    if (!hasDamaged) {
        obj.loseHp(2);
        this.mAffected.push(obj);
    }

    if (!this.mIsChicken) {
        this.mIsChicken = true;
        if (this.getRigidBody().getVelocity()[0] < 0)
            this.mDirection = 0;
        else
            this.mDirection = 1;

        if (this.mDirection)
            obj.getRigidBody().setVelocity(30, 50);
        else
            obj.getRigidBody().setVelocity(-30, 50);
    }
    else {
        if (this.mDirection)
            obj.getRigidBody().setVelocity(30, 50);
        else
            obj.getRigidBody().setVelocity(-30, 50);
    }
};

ScreamingChickenArrow.prototype.effectOnObstacle = function (obj) {
    if (!this.mIsChicken) {
        gEngine.AudioClips.playACue(Arrow.eAudio.eChickenScreaming);
        this.mIsChicken = true;
        if (this.getRigidBody().getVelocity()[0] < 0)
            this.mDirection = 0;
        else
            this.mDirection = 1;
    }
};

ScreamingChickenArrow.prototype.effectOnDestroyable = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.eChickenScreaming);
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
};