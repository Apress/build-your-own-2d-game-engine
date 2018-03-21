/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function DoorParticle(particleTexture) {
    this.mLightRend = new LightRenderable(particleTexture);
    this.kSpeed = 0.075;
    this.kWidth = 1;
    this.kHeight = 1;
    
    this.mActivated = false;
    
    GameObject.call(this, this.mLightRend);
    
    this.setSpeed(this.kSpeed);
    this.setCurrentFrontDir([0, 1]);
    
    this.mInterpolate = new InterpolateVec2(this.getXform().getPosition(), 5, 2);
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(1);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(DoorParticle, GameObject);

DoorParticle.prototype.update = function(target) {
    GameObject.prototype.update.call(this);
    var p = target.getXform().getPosition();
    this.rotateObjPointTo(p, 0.08);
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    
//    this.mInterpolate.updateInterpolation();
//    var pos = this.mInterpolate.getValue();
//    this.getXform().setPosition(pos[0], pos[1]);
//    
};

DoorParticle.prototype.createParticle = function(atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([0, 0, 0.7, 0.5]);
    
    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);
    
    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    //p.setFinalColor([0.2,0.2,0.2,0.6]);
    
    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);
    
    // size delta
    p.setSizeDelta(0.25);
    
    return p;
};