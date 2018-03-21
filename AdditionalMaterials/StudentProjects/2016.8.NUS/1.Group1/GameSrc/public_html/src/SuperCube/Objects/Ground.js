/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Ground(atY) {
    this.kGround = "assets/black.png" ;

    this.mGround = new TextureRenderable(this.kGround);
    this.mGround.setColor([0, 0, 0, 0]);
    this.mGround.getXform().setPosition(90, atY);
    this.mGround.getXform().setSize(180, 1);
    GameObject.call(this, this.mGround);
    var r = new RigidRectangle(this.getXform(),  180, 1);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Ground, GameObject);