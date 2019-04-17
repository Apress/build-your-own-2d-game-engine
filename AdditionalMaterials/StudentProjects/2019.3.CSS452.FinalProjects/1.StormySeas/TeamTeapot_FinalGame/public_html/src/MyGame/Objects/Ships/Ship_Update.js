/*
 * File:        Ship_Update.js
 * Programmers: Kyla            March 15, 2019
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Ship.prototype.update = function()
{
    
    GameObject.prototype.update.call(this);
    this.updateInvincibility();
    
    this.mLight.set2DPosition(this.getPosition());
    
    this.mWakeSet.update();
    if(this.mWakeTimer >= 20)
    {
        this._createWake(this.mWakeTexture);
        this.mWakeTimer = 0;
    }
 
    this.mWakeTimer++;
};

Ship.prototype.updateInvincibility = function()
{
    // check if invincible
    if (this.mInvincible === true)
    {
        // disable invincibility if duration is over
        if (this.mHitTimer > this.kInvincibleTime)
        {
            
            this.mShip.setColor(this.mOriginalColor);
            this.mInvincible = false;
            this.mHitTimer = 0;
        }
        // increment timer
        else
        {
            var freq = 16;
            var color = [this.mOriginalColor[0], this.mOriginalColor[1], this.mOriginalColor[2], this.mOriginalColor[3]];

            if (this.mHitTimer % freq / freq > .5)
                color = this.mOriginalColor;
            else
                color = this.mHitColor;
            
            this.mShip.setColor(color);
            this.mHitTimer++;
        } 
    }
};
