/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, vec2, gEngine */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Way(spriteTexture,light) {
    GameObject.call(this, spriteTexture);   
    spriteTexture.addLight(light);
    var rigidShape = new RigidRectangle(this.getXform(), 30, 6);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setFriction(0.5);
    this.setPhysicsComponent(rigidShape);

}
gEngine.Core.inheritPrototype(Way, GameObject);

Way.prototype.update = function () {
    GameObject.prototype.update.call(this); 
};

Way.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this,aCamera);
};
