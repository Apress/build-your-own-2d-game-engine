"use strict";

function Projectile(atX, atY, velocity, radius) {
    this.kTexture = "assets/EMPPulse.png";
    this.kSpeed = 0.2;

    ParticleGameObject.call(this, this.kTexture, atX, atY, 500);
    this.setSpeed(this.kSpeed);
    this.setCurrentFrontDir(velocity);
    var obj = this.getRenderable();
    obj.setColor([1, 1, 1, 1]);
    obj.getXform().setSize(radius, radius);
    
    var rigidShape = new RigidCircle(this.getXform(), radius);
    rigidShape.setMass(0.1);
    rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
    
    this.setSizeDelta(1);
}
gEngine.Core.inheritPrototype(Projectile, ParticleGameObject);


