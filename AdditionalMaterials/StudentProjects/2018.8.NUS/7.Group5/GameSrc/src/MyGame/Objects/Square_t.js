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

function Squaret(spriteTexture, atX, atY, size1,size2) {
        
    this.isfinal=1;
    this.mSquare = new SpriteRenderable(spriteTexture);
    this.mSquare.setColor([1, 1, 1, 0]);
    this.mSquare.getXform().setPosition(atX,atY);
    this.mSquare.getXform().setSize(size1,size2);
    this.mSquare.setElementUVCoordinate(0.15, 0.85,0.2,0.9);

    GameObject.call(this, this.mSquare);
    
    this.setSpeed(0.05);
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


gEngine.Core.inheritPrototype(Squaret,GameObject);


Squaret.prototype.update = function () {
 

    var xpos = this.getXform().getXPos();
    
    if(this.isfinal===1){
        if(xpos>58)
            this.setSpeed(-0.05);
        if(xpos<45)
            this.setSpeed(0.05);
    }
    if(this.isfinal===2){
        
        if(xpos>58)
            this.setSpeed(-0.1);
        if(xpos<30)
            this.setSpeed(0.1);
    }
    if(this.isfinal===3){
        
        this.setSpeed(-0.13);
        if(xpos<1)
            this.getXform().setXPos(99);
        
        
    }

    
    
    GameObject.prototype.update.call(this);
};