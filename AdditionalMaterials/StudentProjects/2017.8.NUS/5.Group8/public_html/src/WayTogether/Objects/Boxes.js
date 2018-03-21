/* File: Heros.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

/*Heros.Jumpstate = Object.freeze({
    OntheGround: 0,
    JumpUp: 1,
    GoingDown: 2
});*/

function Boxes(texture, aty) { 
    var t = parseInt(Math.random()*23 + 12, 10);
    this.mBoxes = new SpriteRenderable(texture);
    this.mBoxes.setColor([1, 0, 0, 0]);
    this.mBoxes.getXform().setPosition(0 - t/2, aty);
    this.mBoxes.getXform().setSize(t, 4);
    var temp = parseInt(Math.random()*5 + 0, 10);
    
    if(temp === 0){
        this.mBoxes.setElementPixelPositions(0, 265, 0, 29);
    }
    else if(temp === 1){
        this.mBoxes.setElementPixelPositions(0, 268, 36, 76);
    }
    else if(temp === 2){
        this.mBoxes.setElementPixelPositions(0, 283, 84, 132);
    }
    else if(temp === 3){
        this.mBoxes.setElementPixelPositions(0, 299, 141, 188);
    }
    else if(temp === 4){
        this.mBoxes.setElementPixelPositions(0, 268, 195, 240);
    }
    
    this.IsCollideHero = false;
    
    GameObject.call(this, this.mBoxes);
    
    var r = new RigidRectangle(this.getXform(), t, 4);
    r.setMass(0);
    r.setRestitution(0);
    r.setFriction(0);
    r.setColor([1, 0, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
    
    var v = this.getPhysicsComponent().getVelocity();
    v[0] = parseInt(Math.random()*15 + 20, 10);
}
gEngine.Core.inheritPrototype(Boxes, GameObject);

Boxes.prototype.update = function(){
    GameObject.prototype.update.call(this);
    var v = this.getPhysicsComponent().getVelocity(); 
    var mXform = this.mBoxes.getXform();
    var mWidth = this.mBoxes.getXform().getWidth();
    
    if(this.IsCollideHero){v[0] = 0;}
  
    if((mXform.getXPos()) >= 128 + mWidth/2){
        mXform.setXPos(0 - mWidth/2);
    }
    
    
};

Boxes.prototype.SetCollideHero = function(a){
    this.IsCollideHero = a;
};


