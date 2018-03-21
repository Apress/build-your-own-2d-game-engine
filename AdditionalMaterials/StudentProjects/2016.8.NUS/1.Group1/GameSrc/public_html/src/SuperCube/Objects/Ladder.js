"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Ladder(cx, cy, width, height) {
    this.mLadder = new Renderable();
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();
    this.mLadder.setColor([r, g, b, 0.9]);
    this.mLadder.getXform().setPosition(cx, cy);
    this.mLadder.getXform().setSize(width, height);
    GameObject.call(this, this.mLadder);
    var r = new RigidRectangle(this.getXform(), width, height);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Ladder, GameObject);

