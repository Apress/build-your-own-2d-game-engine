/*
 * File:        Projectile.js
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

function Projectile(renderable, forwardDir, speed, lifeSpan)
{
    this.mRenderable = renderable;
        
    this.mSpeed = speed;
    
    this.mLifeSpan = lifeSpan;
    this.mLifeTimer = 0;
    
    GameObject.call(this, this.mRenderable);
    
    this.mCurrentFrontDir = vec2.fromValues(forwardDir[0], forwardDir[1]);
    vec2.normalize(this.mCurrentFrontDir, this.mCurrentFrontDir);
    

}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.update = function()
{
    GameObject.prototype.update.call(this);
    
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
    
    this.mLifeTimer++;
};

Projectile.prototype.isDead = function()
{
    return this.mLifeTimer > this.mLifeSpan;
};

Projectile.prototype.kill = function()
{
    this.mLifeTimer = this.mLifeSpan;
};