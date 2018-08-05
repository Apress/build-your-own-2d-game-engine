/* File: Brain.js
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Alice(spriteTexture) {
    this.posX = 0;
    this.posY = 50;
    this.weight =  10;
    this.vX = 0;
    this.vY = 0;
    this.radius = 2 * Math.sqrt(this.weight);
    this.speed = 1.2/Math.sqrt(this.weight);

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(this.posX, this.posY);
    this.mDye.getXform().setSize(this.radius, this.radius);
    this.mDye.setElementPixelPositions(0, 1024, 0, 1024);
    GameObject.call(this, this.mDye);
    const r = new RigidCircle(this.getXform(), 0.25*Math.sqrt(this.radius*this.radius + this.radius*this.radius));
    this.setRigidBody(r);
    this.setSpeed(this.speed);
}
gEngine.Core.inheritPrototype(Alice, GameObject);

Alice.prototype.changePicture = function(dir){
    this.mDye.setElementPixelPositions(dir * 1024, (dir+1) * 1024, 0, 1024);
};

Alice.prototype.update = function () {
    this.setSpeed(this.speed);
    this.posX = this.mDye.getXform().getXPos();
    this.posY = this.mDye.getXform().getYPos();
    this.radius = 2*Math.sqrt(this.weight);
    this.mDye.getXform().setSize(this.radius, this.radius);
    var r = new RigidCircle(this.getXform(), 0.25*Math.sqrt(this.radius*this.radius + this.radius*this.radius));
    this.setRigidBody(r);
    this.getRigidBody().setVelocity(this.vX,this.vY);
    this.checkBound();      //检测Competitor边界
    GameObject.prototype.update.call(this);
};

Alice.prototype.checkBound = function(){
    var xform = this.getXform();
    if(xform.getXPos() <= -256){
        xform.setXPos(-256);
    }else if (xform.getXPos() >= 256){
        xform.setXPos(256);
    }

    if(xform.getYPos() <= -256){
        xform.setYPos(-256);
    }else if(xform.getYPos() >= 256){
        xform.setYPos(256);
    }
};


Alice.prototype.incWeight = function(delta) {
    this.weight += delta;
    this.speed = 1.2/Math.sqrt(this.weight);
};


Alice.prototype.getWeight = function() {
    return this.weight;
};


Alice.prototype.getAliceRadius = function() {
    return this.radius/2;
};

Alice.prototype.getVX = function() { return this.vX; };

Alice.prototype.getVY = function() { return this.vY; };

Alice.prototype.setVX = function(vx) {
    this.vX = vx;
};

Alice.prototype.setVY = function(vy) {
    this.vY = vy;
};