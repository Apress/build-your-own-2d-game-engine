/* File: ParticleGameObject.js 
 *
 * support particle object particulars: color change and expiration
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, ParticleRenderable, Particle, vec4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

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

ParticleGameObject.prototype.setFinalColor = function(f) {    
    vec4.sub(this.mDeltaColor, f, this.mRenderComponent.getColor());
    if (this.mCyclesToLive !== 0) {
        vec4.scale(this.mDeltaColor, this.mDeltaColor, 1/this.mCyclesToLive);
    }
};
ParticleGameObject.prototype.setSizeDelta = function(d) {
    this.mSizeDelta = d;
};

ParticleGameObject.prototype.hasExpired = function() {
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