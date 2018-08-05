function RegenerationArrow(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    Arrow.call(
        this,
        posX, posY, vX, vY,
        Arrow.eAssets.eRegenerationArrowTexture,
        aAllObjs, aObstacle, aDestroyable, aProps,
        master
    );

    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setSize(8, 8);
    this.mArrow.setSpriteSequence(128, 0, 128, 128, 4, 0);
    this.mArrow.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mArrow.setAnimationSpeed(10);

    //particles
    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();

    //this.toggleDrawRigidShape(); // Draw RigidShape
}

gEngine.Core.inheritPrototype(RegenerationArrow, Arrow);

RegenerationArrow.prototype.update = function () {
    Arrow.prototype.update.call(this);

    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

RegenerationArrow.prototype.draw = function (aCamera) {
    this.mParticles.draw(aCamera);
    Arrow.prototype.draw.call(this, aCamera);
};

RegenerationArrow.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eHeart, atX, atY, life);

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

RegenerationArrow.prototype.effectOnObstacle = function (obj) {
    this.mAllObjs.removeFromSet(this);
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.mGenerateParticles = 0;
};

RegenerationArrow.prototype.effectOnArcher = function (obj) {
    this.mAllObjs.removeFromSet(this);
    obj.addHp(1);
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.regeneration(obj);
    this.mGenerateParticles = 0;
};

RegenerationArrow.prototype.effectOnDestroyable = function (obj) {
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
    this.mGenerateParticles = 0;
    this.mCurrentState = Arrow.eArrowState.eHit;
};

RegenerationArrow.prototype.regeneration = function (obj) {
    obj.mPlayer.addBuff(new RegenerationBuff(3, Buff.eAssets.eRegenerationBuffTexture));
};