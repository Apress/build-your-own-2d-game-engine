/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wall(cx, cy, width, height) {
    
    this.kWall = "assets/Level1/gear1.png" ;
    this.mWall = new TextureRenderable(this.kWall);
    this.mWall.setColor([0, 0, 0, 0]);
    this.mWall.getXform().setPosition(cx, cy);
    this.mWall.getXform().setSize(width, height);
    GameObject.call(this, this.mWall);
    var r = new RigidRectangle(this.getXform(),  width, height+5);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Wall, GameObject);
