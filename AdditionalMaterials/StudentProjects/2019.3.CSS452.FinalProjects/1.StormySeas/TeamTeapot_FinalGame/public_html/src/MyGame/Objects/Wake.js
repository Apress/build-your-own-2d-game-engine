/*
 * File:        Wake.js
 * Programmers: Kyla            March 15, 2019
 *              Emily           March 17, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wake(spriteTexture, position, forwardDir)
{
    this.mRenderable = new SpriteAnimateRenderable(spriteTexture);
    this.mRenderable.getXform().setPosition(position[0], position[1]);
    this.mRenderable.getXform().setSize(8, 4);
    this.mRenderable.setSpriteSequence(
            256,   // offset from top-left
            0, // offset from top-left
            677,
            256,
            6,      // number of elements in sequence
            0);
    this.mRenderable.setAnimationSpeed(16);
    
    Projectile.call(this, this.mRenderable, forwardDir, 0.01, 90);
}
gEngine.Core.inheritPrototype(Wake, Projectile);

Wake.prototype.update = function()
{
    this.mRenderable.updateAnimation();
    Projectile.prototype.update.call(this);
};
