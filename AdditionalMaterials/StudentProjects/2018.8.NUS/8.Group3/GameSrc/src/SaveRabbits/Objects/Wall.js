/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wall(cx, cy,cw,ch, r,texture) {
    this.kWallWidth = cw;
    this.kWallHeight = ch;

    var renderableObj = new TextureRenderable(texture);

    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kWallWidth, this.kWallHeight);
    this.getXform().setPosition(cx, cy);
    this.getXform().setRotationInDegree(r);   
    var rigidShape = new RigidRectangle(this.getXform(), this.kWallWidth, this.kWallHeight);
    rigidShape.toggleDrawBound();
    rigidShape.setMass(0);  // ensures no movements!
   // rigidShape.mPositionMark.getXform().setRotationInDegree(r);
    this.setRigidBody(rigidShape);
    this.getRigidBody().setVertices();
    this.getRigidBody().rotateVertices();
   // this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Wall, GameObject);



Wall.prototype.update = function ()
{


    GameObject.prototype.update.call(this);
};