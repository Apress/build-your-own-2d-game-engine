/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: ParticleGameObject.js 
 * 
 * This file encapsulates the particle objects to be used as game objects
 */


function ParticleGameObject(texture, atX, atY, cyclesToLive) {
    var renderableObj = new ParticleRenderable(texture);
    var xf = renderableObj.getXform();
    xf.setPosition(atX, atY);
    GameObject.call(this, renderableObj);
    var p = new Particle(xf.getPosition());
    this.setPhysicsComponent(p);
    this.mDeltaColor = [0, 0, 0, 0];
    this.mSizeDelta = 0;
    this.mCyclesToLive = cyclesToLive;
}
gEngine.Core.inheritPrototype(ParticleGameObject, GameObject);

ParticleGameObject.prototype.setFinalColor = function (f) {
    vec4.sub(this.mDeltaColor, f, this.mRenderComponent.getColor());
    if (this.mCyclesToLive !== 0) {
        vec4.scale(this.mDeltaColor, this.mDeltaColor, 1 / this.mCyclesToLive);
    }
};

ParticleGameObject.prototype.setSizeDelta = function (d) {
    this.mSizeDelta = d;
};
ParticleGameObject.prototype.hasExpired = function () {
    return (this.mCyclesToLive < 0);
};

ParticleGameObject.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mCyclesToLive--;
    var c = this.mRenderComponent.getColor();
    vec4.add(c, c, this.mDeltaColor);
    var xf = this.getXform();
    var s = xf.getWidth() * this.mSizeDelta;
    xf.setSize(s, s);
};