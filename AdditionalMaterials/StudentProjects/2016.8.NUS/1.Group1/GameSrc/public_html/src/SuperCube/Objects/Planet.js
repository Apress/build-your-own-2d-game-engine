/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Planet(cx, cy, width, height, png) {
    
    this.kPlanet = png;
    this.mPlanet = new TextureRenderable(this.kPlanet);
    this.mPlanet.setColor([0, 0, 0, 0]);
    this.mPlanet.getXform().setPosition(cx, cy);
    this.mPlanet.getXform().setSize(width, height);
    GameObject.call(this, this.mPlanet);
    var r = new RigidCircle(this.getXform(),width/2-3);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Planet, GameObject);

