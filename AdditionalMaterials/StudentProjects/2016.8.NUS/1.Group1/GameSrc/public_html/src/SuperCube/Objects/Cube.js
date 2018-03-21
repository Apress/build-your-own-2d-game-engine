/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, Cx: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Cube(x,y) {
    this.kDelta = 1;
    
    this.mCube = new Renderable();
    this.mCube.setColor([0.5, 0.9, 0.9, 1]);
    this.mCube.getXform().setPosition(x, y);
    this.mCube.getXform().setSize(2, 2);
    GameObject.call(this, this.mCube);
    var r = new RigidRectangle(this.getXform(),  2, 2);
    r.setMass(0);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    r.setAcceleration([0, -50]);
    this.setPhysicsComponent(r);

}
gEngine.Core.inheritPrototype(Cube, GameObject);

Cube.prototype.update = function () {
    // control by WASD
            var xform = this.getXform();
            var dx = this.getXform().getPosition();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)&&dx[1]>5) {
        xform.incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(this.kDelta);
    }
    
};