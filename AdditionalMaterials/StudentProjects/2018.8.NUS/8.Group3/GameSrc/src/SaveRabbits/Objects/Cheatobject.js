/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Cheatobject(atX, atY,texture,  w, h) {
   // this.kDelta = 1;
    this.kWidth = w;
    this.kHeight = h;
   // this.kSpeed = 0.3;

    //this.mProjectiles = new ParticleGameObjectSet();

    // control of movement
   // this.mInitialPosition = vec2.fromValues(atX, atY);
   // this.mMovementRange = movementRange;


    this.mMinion = new TextureRenderable(texture);
    this.mMinion.setColor([0,1,1,0]);

    //this.changeSprite(atX, atY);
    
    GameObject.call(this, this.mMinion);
    this.getXform().setSize(w, h);
    this.getXform().setPosition(atX, atY);

    // velocity and movementRange will come later

    var rigidShape = new RigidCircle(this.getXform(), this.kWidth/2);
    rigidShape.setMass(1);  // ensures no movements!
    rigidShape.setFriction(0);
    rigidShape.toggleDrawBound();
    rigidShape.mLine.setPointSize(5);
    rigidShape.kNumSides = 60;
    this.setRigidBody(rigidShape);
}
gEngine.Core.inheritPrototype(Cheatobject, GameObject);

Cheatobject.prototype.update = function () {
    // remember to update this.mMinion's animation
    // this.mProjectiles.update();
    //this.mRenderComponent.setpos([spaceship.getXform().getXPos(),spaceship.getXform().getYPos()]);
    GameObject.prototype.update.call(this);
};

Cheatobject.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
   // this.mProjectiles.draw(aCamera);
};

Cheatobject.prototype.incXpos = function(delta){
    this.getXform().incXPosBy(delta);
};
Cheatobject.prototype.incYpos = function (delta){
    this.getXform().incYPosBy(delta);
};

