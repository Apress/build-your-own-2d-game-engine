function PaperPlane(
    posX, posY, vX, vY,
    aAllObjs, aObstacle, aDestroyable, aProps,
    master
) {
    Arrow.call(
        this,
        posX, posY, vX, vY,
        Arrow.eAssets.ePaperPlaneTexture,
        aAllObjs, aObstacle, aDestroyable, aProps,
        master
    );

    //particles
    this.mGenerateParticles = 1;
    this.mParticles = new ParticleGameObjectSet();

    //this.toggleDrawRigidShape(); // Draw RigidShape
}

gEngine.Core.inheritPrototype(PaperPlane, Arrow);

PaperPlane.prototype.update = function () {
    Arrow.prototype.update.call(this);

    if (this.mGenerateParticles === 1) {
        var p = this.createParticle(this.getXform().getXPos(), this.getXform().getYPos());
        this.mParticles.addToSet(p);
    }
    gEngine.ParticleSystem.update(this.mParticles);
};

PaperPlane.prototype.draw = function (aCamera) {
    this.mParticles.draw(aCamera);
    Arrow.prototype.draw.call(this, aCamera);
};

PaperPlane.prototype.createParticle = function(atX, atY) {
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

PaperPlane.prototype.effectOnObstacle = function (obj) {
    this.mAllObjs.removeFromSet(this);
    this.transfer();
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.mGenerateParticles = 0;
    //this.mMaster.setState(Player.ePlayerState.eReady);
};

PaperPlane.prototype.effectOnArcher = function (obj) {
    this.mAllObjs.removeFromSet(this);
    this.transfer();
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.mGenerateParticles = 0;
    //this.mMaster.setState(Player.ePlayerState.eReady);
};

PaperPlane.prototype.effectOnDestroyable = function (obj) {
    this.mAllObjs.removeFromSet(this);
    this.transfer();
    this.mCurrentState = Arrow.eArrowState.eHit;
    this.mGenerateParticles = 0;
    this.mProps.removeFromSet(obj);
    //this.mMaster.setState(Player.ePlayerState.eReady);
};


PaperPlane.prototype.transfer = function () {
    // this.getRigidBody().setInertia(0);
    // this.getRigidBody().setRestitution(0);
    var pos = this.getXform().getPosition();
    this.mMaster.getArcher().getXform().setPosition(pos[0], pos[1] + 10);
};