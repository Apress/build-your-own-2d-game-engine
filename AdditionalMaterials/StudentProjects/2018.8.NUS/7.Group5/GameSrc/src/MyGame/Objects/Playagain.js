/* File: Playagain.js 
 *
 * Creates and initializes a Playagain object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Playagain(spriteTexture, atX, atY, size1, size2) {
    this.mPlayagain = new SpriteRenderable(spriteTexture);
    this.mPlayagain.setColor([1, 1, 1, 0]);
    this.mPlayagain.getXform().setPosition(atX, atY);
    this.mPlayagain.getXform().setSize(size1, size2);
    this.mPlayagain.setElementUVCoordinate(0, 1, 0, 1);
    GameObject.call(this, this.mPlayagain);
    this.setSpeed(0);
    /*var r;

    r = new RigidRectangle(this.getXform(), size1, size2);
    this.setRigidBody(r);
    r.setMass(0);
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();*/
}

gEngine.Core.inheritPrototype(Playagain, GameObject);


Playagain.prototype.update = function () {
    
GameObject.prototype.update.call(this);
};
    /*
    this.kDelta = 0.2;
    this.mPlayagain = new SpriteAnimateRenderable(spriteTexture);
    this.mPlayagain.setColor([1, 1, 1, 0]);
    this.mPlayagain.getXform().setPosition(Math.random() * 100, atY);
    this.mPlayagain.getXform().setSize(size1, size2);
    this.mPlayagain.setSpriteSequence(400, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    800, 400,   // widthxheight in pixels
                                    1,          // number of elements in this sequence
                                    0);         // horizontal padding in between
    this.mPlayagain.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mPlayagain.setAnimationSpeed(15);
                                // show each element for mAnimSpeed updates

    GameObject.call(this, this.mPlayagain);
}
    */
//gEngine.Core.inheritPrototype(Playagain, GameObject);
/*
Playagain.prototype.update = function () {
    // remember to update this.mMinion's animation
    this.mPlayagain.updateAnimation();

    // move towards the left and wraps
    var xform = this.getXform();
    if(xform.getYPos() > 100){
        xform.incYPosBy(-this.kDelta);
    }
    /*
    // if fly off to the left, re-appear at the right
    if (xform.getXPos() < 0) {
        xform.setXPos(100);
        xform.setYPos(65 * Math.random());
    }
    */

//update = function () {
//GameObject.prototype.update.call(this);};
