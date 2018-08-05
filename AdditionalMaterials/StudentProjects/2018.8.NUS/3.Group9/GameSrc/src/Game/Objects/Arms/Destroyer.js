function Destroyer(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    /*
    Arrow.call(
        this,
        posX, posY, vX, vY, Arrow.eAssets.eDestroyerTexture,
        aAllObjs, aObstacle, aDestroyable,
        master
    );
    */

    this.mCurrentState = Arrow.eArrowState.eFlying;

    this.mAllObjs = aAllObjs;
    this.mMaster = master;
    this.mObstacle = aObstacle;
    this.mDestroyable = aDestroyable;
    this.mProps =  aProps;

    this.kVelocity = [vX, vY];
    this.kSpeed = Math.sqrt(this.kVelocity[0] * this.kVelocity[0] + this.kVelocity[1] * this.kVelocity[1]);
    this.kRotationInRad = null;
    if (vX > 0) {
        this.kRotationInRad = -Math.acos(this.kVelocity[1] / this.kSpeed);
    }
    else {
        this.kRotationInRad = Math.acos(this.kVelocity[1] / this.kSpeed);
    }


    this.mArrow = new SpriteAnimateRenderable(Arrow.eAssets.eDestroyerTexture);
    if (vX >= 0)
        this.mArrow.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    else if (vX < 0)
        this.mArrow.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mArrow.setColor([1, 1, 1, 0]);
    this.mArrow.getXform().setPosition(posX, posY);
    this.mArrow.getXform().setSize(8, 8);
    this.mArrow.getXform().setRotationInRad(this.kRotationInRad);
    this.mArrow.setSpriteSequence(128, 0, 128, 128, 8, 0);
    this.mArrow.setAnimationSpeed(10);
    GameObject.call(this, this.mArrow);

    var r = new RigidCircle(this.getXform(), 4);
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(vX, vY);
    this.getRigidBody().setMass(0.1);

    this.mEffectTimer = 0;
    this.mEffectTimeLimit = 120;
    this.mEffectObj = [];

    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();
}

gEngine.Core.inheritPrototype(Destroyer, Arrow);


Destroyer.prototype.update = function () {
    Arrow.prototype.update.call(this);

    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

Destroyer.prototype.draw = function (aCamera) {
    this.mParticles.draw(aCamera);
    Arrow.prototype.draw.call(this, aCamera);
};


Destroyer.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject(ParticleSystem.eAssets.eBoom, atX, atY, life);
    p.getRenderable().setColor([0.898, 0.898, 0.976, 1]);

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

Destroyer.prototype.effectOnObstacle = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.eDestroyerHit);

    this.mObstacle.removeFromSet(obj);
    this.mAllObjs.removeFromSet(obj);
    this.mAllObjs.removeFromSet(this);
    this.mGenerateParticles = 0;
    this.mCurrentState = Arrow.eArrowState.eHit;
};


Destroyer.prototype.effectOnArcher = function (obj) {
    gEngine.AudioClips.playACue(Arrow.eAudio.eDestroyerHit);

    obj.loseHp(3);
    this.mAllObjs.removeFromSet(this);
    this.mGenerateParticles = 0;
    this.mCurrentState = Arrow.eArrowState.eHit;
};