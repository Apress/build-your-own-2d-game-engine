/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Boom(cx, cy,cw,ch, texture) {
    this.kWallWidth = cw;
    this.kWallHeight = ch;

    var renderableObj = new TextureRenderable(texture);

    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kWallWidth, this.kWallHeight);
    this.getXform().setPosition(cx, cy);
    //this.setColor([0,0,0,0]);
    var rigidShape = new RigidRectangle(this.getXform(), this.kWallWidth, this.kWallHeight);
    
    rigidShape.toggleDrawBound();
    rigidShape.setMass(0);  // ensures no movements!
    this.setRigidBody(rigidShape);
}
gEngine.Core.inheritPrototype(Boom, GameObject);

