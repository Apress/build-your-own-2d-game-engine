/*
 * File:        Cannonball.js
 * Programmers: Kyla            March 14, 2019
 *              
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Cannonball(spriteTexture, position, target)
{
    var x = target[0] - position[0];
    var y = target[1] - position[1];
    
    this.mRenderable = new LightRenderable(spriteTexture);
    this.mRenderable.getXform().setPosition(position[0], position[1]);
    this.mRenderable.getXform().setSize(8, 8);
    
    Projectile.call(this, this.mRenderable, [x,y], 1, 60);
    
    var angle = Math.atan2(y, x);
    angle = angle * (180/Math.PI) - 90;
    this.getXform().setRotationInDegree(angle);
}
gEngine.Core.inheritPrototype(Cannonball, Projectile);

Cannonball.prototype.update = function()
{
    Projectile.prototype.update.call(this);
};
