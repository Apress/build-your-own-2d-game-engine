/*
 * File:        Storm.js
 * Programmers: Emily           March 2, 2019
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, Storm: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Waterfall(spriteTexture, x, y, rot)
{   
    this.mRenderable = new SpriteAnimateRenderable(spriteTexture);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(125, 30);
    this.mRenderable.getXform().setRotationInDegree(rot);
    this.mRenderable.setSpriteSequence(
        512,   // offset from top-left
        110, // offset from top-left
        1580,
        512,
        5,      // number of elements in sequence
        0);
    this.mRenderable.setAnimationSpeed(20);
    
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(Waterfall, GameObject);

Waterfall.prototype.draw = function(mCamera)
{
    this.mRenderable.draw(mCamera);
};

Waterfall.prototype.update = function()
{
    this.mRenderable.updateAnimation();
};
