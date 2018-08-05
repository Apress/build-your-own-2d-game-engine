"use strict";

function MineLauncher(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    Arrow.call(
        this,
        posX, posY, vX, vY, Arrow.eAssets.eMineLauncherTexture,
        aAllObjs, aObstacle, aDestroyable, aProps,
        master
    );

    this.getRigidBody().setMass(0.1);

    this.mBounceCount = 30;

    //particles
    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();
}

gEngine.Core.inheritPrototype(MineLauncher, Arrow);

MineLauncher.prototype.update = function () {
    Arrow.prototype.update.call(this);

    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

MineLauncher.prototype.draw = function (aCamera) {
    this.mParticles.draw(aCamera);
    Arrow.prototype.draw.call(this, aCamera);
};

MineLauncher.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eBoom, atX, atY, life);
    p.getRenderable().setColor([1, 1, 1, 0.5]);

    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 3.5 + Math.random();
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

MineLauncher.prototype.effectOnObstacle = function (obj) {
    this.mAllObjs.removeFromSet(this);

    this.plantMine();
    this.mGenerateParticles = 0;
    this.mCurrentState = Arrow.eArrowState.eHit;
};

MineLauncher.prototype.effectOnArcher = function () {
    this.mAllObjs.removeFromSet(this);

    this.plantMine();

    this.mGenerateParticles = 0;
    this.mCurrentState = Arrow.eArrowState.eHit;
};

MineLauncher.prototype.effectOnDestroyable = function (obj) {
    this.mAllObjs.removeFromSet(this);

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
    this.plantMine();

    this.mGenerateParticles = 0;
    this.mCurrentState = Arrow.eArrowState.eHit;
};

MineLauncher.prototype.plantMine = function (damage) {
    var mine;
    var XPos = this.getXform().getXPos();
    var YPos = this.getXform().getYPos() + 10;
    mine = new Mine(
        XPos - 10, YPos, Mine.eAssets.eMineTexture, 1,
        this.mAllObjs, this.mObstacle, this.mDestroyable, this.mProps);
    this.mAllObjs.addToSet(mine);
    this.mDestroyable.addToSet(mine);

    mine = new Mine(
        XPos, YPos, Mine.eAssets.eMineTexture, 1,
        this.mAllObjs, this.mObstacle, this.mDestroyable, this.mProps);
    this.mAllObjs.addToSet(mine);
    this.mDestroyable.addToSet(mine);

    mine = new Mine(
        XPos + 10, YPos, Mine.eAssets.eMineTexture, 1,
        this.mAllObjs, this.mObstacle, this.mDestroyable, this.mProps);
    this.mAllObjs.addToSet(mine);
    this.mDestroyable.addToSet(mine);
};