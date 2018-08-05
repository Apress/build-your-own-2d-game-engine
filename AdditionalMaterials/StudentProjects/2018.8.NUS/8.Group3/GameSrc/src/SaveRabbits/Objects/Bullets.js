///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
//
//"use strict";
//
//function Bullets(atX, atY, velocity, radius) {
//    this.kTexture = "assets/jetpack.png";
//    this.kSpeed = 0.5;
//    this.damage = 1;
//
//    ParticleGameObject.call(this, this.kTexture, atX, atY, 500);
//    this.setCurrentFrontDir(velocity);
//    this.setVelocity(this.kSpeed);
//
//    var obj = this.getRenderable();
//    obj.getXform().setSize(3, 6);
//    obj.getXform().setRotationInDegree(radius);
//    obj.setColor([1,1,1,0]);
//
//    var rigidShape = new RigidRectangle(this.getXform(),3,3);
//    rigidShape.setMass(1);
//    rigidShape.toggleDrawBound();
//    this.setRigidBody(rigidShape);
//
//    this.setSizeDelta(1);
//}
//gEngine.Core.inheritPrototype(Bullets, ParticleGameObject);
//
//Bullets.prototype.update = function () {
//    GameObject.prototype.update.call(this);
//    ParticleGameObject.prototype.update.call(this);
//};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

function Bullets(atX, atY, velocity, radius,Texture) {
    this.kTexture = Texture;
    this.kSpeed = 20;
    this.damage = 1;

    ParticleGameObject.call(this, this.kTexture, atX, atY, 500);
    this.setCurrentFrontDir(velocity);
    var obj = this.getRenderable();
    obj.getXform().setSize(3, 6);
    obj.getXform().setRotationInDegree(radius);
    obj.setColor([1,1,1,0]);
    var rigidShape = new RigidRectangle(this.getXform(),3,3);
    rigidShape.setMass(1);
    rigidShape.toggleDrawBound();
    rigidShape.setVelocityByValue(this.getCurrentFrontDir(),this.kSpeed);
    this.setRigidBody(rigidShape);

    this.getParticle().setVelocity(velocity);
    this.getParticle().setDrawBounds(true);

    this.toggleDrawRigidShape();
    rigidShape.toggleDrawBound();
    this.setSizeDelta(1);
}
gEngine.Core.inheritPrototype(Bullets, ParticleGameObject);

Bullets.prototype.update = function () {
    GameObject.prototype.update.call(this);
    ParticleGameObject.prototype.update.call(this);
};