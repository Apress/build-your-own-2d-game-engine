/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WallCircle(cx, cy, r,texture) {
    this.kWallWidth = r*2;
    this.kWallHeight = r*2;

    var renderableObj = new TextureRenderable(texture);

    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kWallWidth, this.kWallHeight);
    this.getXform().setPosition(cx, cy);
//    this.getXform().setRotationInDegree(r);   
    var rigidShape = new RigidCircle(this.getXform(), r);
    rigidShape.toggleDrawBound();
    rigidShape.setMass(0);  // ensures no movements!
//    rigidShape.mPositionMark.getXform().setRotationInDegree(r);
    this.setRigidBody(rigidShape);
}
gEngine.Core.inheritPrototype(WallCircle, GameObject);

