function PoisonArrow(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    Arrow.call(
        this,
        posX, posY, vX, vY,
        Arrow.eAssets.ePoisonArrowTexture,
        aAllObjs, aObstacle, aDestroyable, aProps,
        master
    );

    //particles
    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();

    //this.toggleDrawRigidShape(); // Draw RigidShape
}
gEngine.Core.inheritPrototype(PoisonArrow, Arrow);

PoisonArrow.prototype.update = function () {
    Arrow.prototype.update.call(this);

    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

PoisonArrow.prototype.draw = function (aCamera) {
    this.mParticles.draw(aCamera);
    Arrow.prototype.draw.call(this, aCamera);
};

PoisonArrow.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eGreen, atX, atY, life);

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

PoisonArrow.prototype.effectOnObstacle = function (obj) {
    this.mAllObjs.removeFromSet(this);
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.mGenerateParticles = 0;
};

PoisonArrow.prototype.effectOnArcher = function (obj) {
    this.mAllObjs.removeFromSet(this);
    obj.loseHp(1);
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.poison(obj);
    this.mGenerateParticles = 0;
};

PoisonArrow.prototype.effectOnDestroyable = function (obj) {
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
    else if (obj instanceof Mine) {
        obj.explode();
    }
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.mGenerateParticles = 0;
};

PoisonArrow.prototype.poison = function (obj) {
    obj.mPlayer.addBuff(new PoisonBuff(2, Buff.eAssets.ePoisonBuffTexture));
};