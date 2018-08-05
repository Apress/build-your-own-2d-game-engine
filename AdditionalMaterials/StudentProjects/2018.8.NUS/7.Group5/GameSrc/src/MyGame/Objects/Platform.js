/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false ,vec2,*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Platform(spriteTexture, atX, atY, size1,size2) {
        
    
    this.mSquare = new SpriteRenderable(spriteTexture);
    this.mSquare.setColor([1, 1, 1, 0]);
    this.mSquare.getXform().setPosition(atX,atY);
    this.mSquare.getXform().setSize(size1,size2);

    this.isfinal=1;
    
    GameObject.call(this, this.mSquare);
    
    //this.setSpeed(0.05);
    this.setCurrentFrontDir([1,0]);
    
    var r;   
    r = new RigidRectangle(this.getXform(), size1,size2);
    this.r=r;
    this.setRigidBody(this.r);
    this.r.setMass(0);
    this.r.setInertia(0);
    this.r.setFriction(0);
    this.r.setRestitution(0);
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
}


gEngine.Core.inheritPrototype(Platform,GameObject);


Platform.prototype.update = function () {
 

    /*var v=vec2.fromValues(0.0005, 0);
    this.r.setVelocity(v);
    console.log("ok"+v);
    console.log('oo'+this.getXform().getPosition());*/
    
    /*var xpos = this.getXform().getXPos();
    if(this.isfinal)
    {
    if(xpos>58)
        this.setSpeed(-0.05);
    if(xpos<45)
        this.setSpeed(0.05);
    }*/
    
    
    GameObject.prototype.update.call(this);
};