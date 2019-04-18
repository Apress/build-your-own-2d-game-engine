/*
 * File:        PlayerShip.js
 * Programmers: Kyla            March 13, 2019
 *              Emily           March 5, 2019
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PlayerShip(spriteTexture, miniMapTexture, collisionTexture, wakeTexture, popupAnim)
{
    this.kSpeedDelta = 0.5; 
    this.kInvincibleTime = 120;
    this.mInvincible = false;
    
    this.mHitTimer = 0;                                 // Timer that tracks how much longer the player remains invincible after getting hit
    this.mHitCheckTimer = 0;                            // Timer that tracks when to check for rock collision again
    Ship.call(this, spriteTexture,collisionTexture, wakeTexture, [0, 0], [5, 10], 100, 0, -25, 25, 0.02);

    console.log(this);
    
    this.mOriginalColor = [1, 1, 1, 0];
    this.mShip.setColor(this.mOriginalColor);
    this.mShip.getXform().setRotationInRad(Math.PI);

    this.mShip.setElementPixelPositions(510, 1024, 0, 1024);
    this.mCollisionTex.setElementPixelPositions(64, 115, 0, 128);
    
    this.mTreasureCollected = 0;
        
    //The renderable for the minimap    
    this.mMapRenderable = new UISpriteRenderable(miniMapTexture);
    this.mMapRenderable.setColor([0, 0, 0, 1.0]);
    this.mMapRenderable.getXform().setSize(10, 10);
    this.mMapRenderable.getXform().setPosition(this.getXform().getXPos(), 
                                                        this.getXform().getYPos());
}
gEngine.Core.inheritPrototype(PlayerShip, Ship);

PlayerShip.prototype.update = function()
{
    Ship.prototype.update.call(this);
    
    var currXform = this.mShip.getXform();
    
    // get direction ship is facing
    var dir = this.getCurrentFrontDir();
    
    // check for input
    var noPress = true;
    
    // Move forward
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W) ||
            gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
    {
        noPress = false;
        this.incSpeedBy(this.kSpeedDelta);
    }
    // slow down
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S) ||
            gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
    {
        // only slow down if moving forward
        if (this.mSpeed > 0)
        {
            noPress = false;
            this.incSpeedBy(-this.kSpeedDelta);
        }
    }
    // Turn left
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A) ||
            gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        noPress = false;
        vec2.rotate(dir, dir, this.getTurningDelta());
    }
    // turn right
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D) ||
            gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
    {
        vec2.rotate(dir, dir, -this.getTurningDelta());
        noPress = false;
    }
    // slow down if no input
    if (noPress)
    {
        var decay = this.kSpeedDelta;
        if (this.mSpeed > 0)
            decay *= -1;
            
        this.incSpeedBy(decay);
    }
    else
    {
        // rotate ship sprite
        this.getXform().setRotationInRad(Math.atan2(dir[0], -dir[1]));
    }
    
    // set ship velocity in new direction
    var theta = Math.atan2(dir[1], dir[0]);
    this.setVelocity(this.mSpeed * Math.cos(theta), this.mSpeed * Math.sin(theta));
    
    //console.log(theta + ' ' + dir);
    
    //Update the renderable's position on the map
    this.mMapRenderable.getXform().setPosition(this.getXform().getXPos(), 
                                                        this.getXform().getYPos());
};

PlayerShip.prototype.drawForMap = function (aCamera)
{
    this.mMapRenderable.draw(aCamera);
};

PlayerShip.prototype.addTreasure = function()
{
    this.mTreasureCollected++;
};

PlayerShip.prototype.getTreasureAmount = function()
{
    return this.mTreasureCollected;
};

PlayerShip.prototype.changeSpeed = function(speed)
{
    var pos = this.getXform().getPosition();
    var dir = this.getCurrentFrontDir();
    
    vec2.scaleAndAdd(pos,pos,dir, speed);
};

PlayerShip.prototype.regenHealth = function(incHealth)
{
    if(this.mHealth < this.mMaxHealth) {
        this.mHealth += incHealth;   
    }
    if(this.mHealth > this.mMaxHealth) {
        this.mHealth = this.mMaxHealth;   
    }
};

// bounds = [left, right, bottom, top]
PlayerShip.prototype.getWithinBounds = function(bounds)
{
    var pos = this.getXform().getPosition();
    if(pos[0] < bounds[0] ||
            pos[0] > bounds[1] ||
            pos[1] < bounds[2] ||
            pos[1] > bounds[3])
    {
        return false;
    }
    return true;
};
