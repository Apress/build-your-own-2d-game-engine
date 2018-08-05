/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, TextureRenderable, RigidCircle*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; 


function Chaser(texture, atX, atY, w, h,speed,life) {
    this.mCycleLeft = life;

    this.mChaser = new TextureRenderable(texture);

    this.mChaser.setColor([1, 1, 1, 0]);
    this.mChaser.getXform().setPosition(atX, atY);
    this.mChaser.getXform().setSize(w, h);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mChaser);
    this.setSpeed(speed);
    this.setCurrentFrontDir([1, 0]);

    var rigidShape = new RigidRectangle(this.getXform(), w,h);
    rigidShape.setMass(0.1);
    rigidShape.setAcceleration([0, 0]);
    // rigidShape.setDrawBounds(true);
    this.setRigidBody(rigidShape);
}
gEngine.Core.inheritPrototype(Chaser, GameObject);


Chaser.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mCycleLeft--;  
};

Chaser.prototype.hasExpired = function() { return this.mCycleLeft <= 0; };