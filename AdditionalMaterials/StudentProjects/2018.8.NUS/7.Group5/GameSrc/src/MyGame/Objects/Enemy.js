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

   function Enemy(spriteTexture,atX, atY, size1,size2) {
      
    this.mEnemy = new SpriteAnimateRenderable(spriteTexture);
    this.mEnemy.setColor([1, 1, 1, 0]);  // tints red
    this.mEnemy.getXform().setPosition(atX, atY);
    this.mEnemy.getXform().setSize(size1, size2);
    this.mEnemy.setElementUVCoordinate(0.0, 0.5, 0.5, 1.0); 
    this.mEnemy.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    128, 128,       // widthxheight in pixels
                                    2,              // number of elements in this sequence
                                    0);             // horizontal padding in between)
    this.mEnemy.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mEnemy.setAnimationSpeed(13);
    
    GameObject.call(this, this.mEnemy);
    
        
    //this.setSpeed(0.05);
    //this.setCurrentFrontDir([1,0]);
    
    
    
    
    /*var r;   
    r = new RigidRectangle(this.getXform(), size1, size2);
    this.r=r;
    this.setRigidBody(this.r);
    this.r.setMass(0);
    this.r.setInertia(0);
    this.r.setFriction(0);*/
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
    
};


gEngine.Core.inheritPrototype(Enemy, GameObject);

Enemy.prototype.update = function () {
    this.mEnemy.updateAnimation(); 


    /*var xform = this.getXform();
    var xpos = xform.getXPos();
    var ypos = xform.getYPos();
    if(xpos>58)
        this.setSpeed(-0.05);
    if(xpos<45)
        this.setSpeed(0.05);*/

 
    GameObject.prototype.update.call(this);
};    

