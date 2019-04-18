/*
 * File:        Storm.js
 * Programmers: Kyla            March 13, 2019
 *              Emily           March 2, 2019
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, Storm: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Storm(spriteTexture, miniMapTex, atX, atY)
{   
    this.kSpeedDelta = 0.002; // use 0.05 when using rigid body, 0.002 when not
    this.kRot1 = Math.random() * 10 + 5;
    this.kSize = Math.random() * 15 + 5;
    this.mGrowStorm = true;

    
    this.mTotalLifeSpan = Math.random() * 1500;
    this.mLifespan = 0;
    
    this.mStorm = new SpriteRenderable(spriteTexture);
    this.mStorm.getXform().setPosition(atX, atY);
    this.mStorm.getXform().setSize(0.01, 0.01);
    
    this.mMapRenderable = new UISpriteRenderable(miniMapTex);
    this.mMapRenderable.setColor([0, 0, 1.0, 1.0]);
    this.mMapRenderable.getXform().setSize(0.01, 0.01);
    
    this.mXdir = Math.random() - 0.5;
    this.mYdir = Math.random() - 0.5;
    
    this.mXdelta = Math.random() * 10;
    this.mYdelta = Math.random() * 10;
    
    if(this.mXdir > 0) {
        this.mXdir = 1;
    } else {
        this.mXdir = -1;
    }
    if(this.mYdir > 0) {
        this.mYdir = 1;
    } else {
        this.mYdir = -1;
    }
    
    GameObject.call(this, this.mStorm);
    
    this.mSpeed = 0;
}

gEngine.Core.inheritPrototype(Storm, GameObject);

Storm.prototype.update = function () 
{
    if(this.mGrowStorm) 
    {
        this.growStorm();
    }
    this.mLifespan++;
    var xform = this.mStorm.getXform();
    var xSpeed = this.mXdir * (this.mXdelta) / 60;
    var ySpeed = this.mYdir * (this.mYdelta) / 60;
    
    //Move the Storm object
    xform.incXPosBy(xSpeed);
    xform.incYPosBy(ySpeed);
    xform.incRotationByDegree(this.kRot1);
    
    this.mMapRenderable.getXform().setPosition(xform.getXPos(), xform.getYPos());
};

Storm.prototype.growStorm = function ()
{
    var size = this.mStorm.getXform().getSize();
    var deltaSize = 5 / 60;
    if(size[0] <= this.kSize) {
        this.mStorm.getXform().setSize(size[0] + deltaSize, size[0] + deltaSize);
        this.mMapRenderable.getXform().setSize(size[0] + deltaSize, size[0] + deltaSize);
    } else {
        this.mGrowStorm = false;
    }
};

Storm.prototype.getPosition = function ()
{
    return this.mStorm.getXform().getPosition();
};

Storm.prototype.draw = function (aCamera)
{
    this.mStorm.draw(aCamera);
};

Storm.prototype.drawForMap = function (aCamera)
{
    this.mMapRenderable.draw(aCamera);
};

Storm.prototype.getMiniRenderable = function ()
{
    return this.mMapRenderable;
};

Storm.prototype.isDead = function() 
{
    return (this.mLifespan >= this.mTotalLifeSpan);    
};

Storm.prototype.getSuctionBBox = function()
{
    var xform = this.getXform();
    var pos = xform.getPosition();
    var width = xform.getWidth()* 2; 
    var height = xform.getHeight()* 2;
    return new BoundingBox(pos, width, height);
};

Storm.prototype.getSize = function()
{
    return this.kSize;
};

Storm.prototype.getRotSpeed = function()
{
    return this.kRot1;
};