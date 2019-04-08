/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Rock(tex_rock, pos) {
    this.LifeCounter = 0;
    this.LifeLimit = 240; //4 second life
    this.mIsDead = false;
    this.mIsBreakable = true;
    var vx = (Math.random() - 0.5);
    var vy = (Math.random() - 0.5);
    var speed = 20 + Math.random() * 10;
    //
    this.mRock = new SpriteRenderable(tex_rock);
    this.mRock.setColor([1,1,1,0]);
   // this.mRock.setElementPixelPositions(0,64,0,64); 
    this.mRock.getXform().setSize(5,5);
    this.mRock.getXform().setPosition(pos[0], pos[1]-3);
    GameObject.call(this, this.mRock);
    var r = new RigidCircle(this.mRock.getXform(), 0.35*Math.sqrt(5*5 + 5*5));
    this.setRigidBody(r);
    r.setVelocity(vx*speed, vy*speed);
    r.setMass(1);
    
}
gEngine.Core.inheritPrototype(Rock, GameObject);

Rock.prototype.update = function () {
    this.LifeCounter++;
    
    if(this.LifeCounter > this.LifeLimit){
         this.mIsDead = true;
    }
GameObject.prototype.update.call(this);
};

Rock.prototype.IsDead = function(){
    return this.mIsDead;
};

Rock.prototype.MarkDead = function(){
    this.mIsDead = true;
};

Rock.prototype.IsBreakable = function (){
    return this.mIsBreakable;
};