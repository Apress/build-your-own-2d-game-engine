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

function Square(spriteTexture, atX, atY, size1,size2) {
        
    this.isfake=0;
    this.mSquare = new SpriteRenderable(spriteTexture);
    this.mSquare.setColor([1, 1, 1, 0]);
    this.mSquare.getXform().setPosition(atX,atY);
    this.mSquare.getXform().setSize(size1,size2);
    this.mSquare.setElementUVCoordinate(0.307, 0.49,0.49,0.665);

    this.isfinal=1;
    
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


gEngine.Core.inheritPrototype(Square,GameObject);


Square.prototype.update = function () {
 

 
    
    var xpos = this.getXform().getXPos();
    if(!this.isfake)
    {
    if(this.isfinal)
    {
    if(xpos>58)
        this.setSpeed(-0.05);
    if(xpos<45)
        this.setSpeed(0.05);
    }
    
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
        if(xpos<0)
            this.getXform().setXPos(100);
        if(xpos>100)
         this.getXform().setXPos(0);
        
    }

    }
    
    GameObject.prototype.update.call(this);
};