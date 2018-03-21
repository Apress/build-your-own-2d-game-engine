/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject */

function SimpleWall(x, y, w, h) {


    this.mGround = new Renderable();
    this.mGround.setColor([0, 0, 0, 1]);
    this.mGround.getXform().setPosition( x+w/2, y+h/2);
    this.mGround.getXform().setSize(w, h);
    GameObject.call(this, this.mGround);
    var r = new RigidRectangle(this.getXform(),  w, h);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 0.4, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(SimpleWall, GameObject);

