//<<<<<<< HEAD
/*
 * File:        PirateShip.js
 * Programmers: Kyla            March 13, 2019
 *              
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PirateShip(spriteTexture, miniMapTex, collisionTexture, wakeTexture, cannonballTexture, mAngryAnim)
{    
    //GameObject.call(this, this.mPirateShip);
    
    this.kSpeedDelta = 0.05;
    
    Ship.call(this, spriteTexture, collisionTexture, wakeTexture, [50, 0], [5, 10], 10, 0, -15, 15, .02);
    
    this.mCannonballTex = cannonballTexture;
    this.mCannonballSet = new ProjectileSet();
    this.mCbSpawnRate = 150;
    this.mCbTimer = 0;

    this.mSpot = false;
    this.mAngryAnim = new PopUp(mAngryAnim, 128,0, 100, 100, 61, 0, 180);
    
    this.mOriginalColor = [1, 1, 1, 0];
    this.mShip.setColor(this.mOriginalColor);
    
    this.mShip.setElementPixelPositions(0, 510, 0, 1024);
    this.mCollisionTex.setElementPixelPositions(13, 64, 0, 128);
    this.kInvincibleTime = 60;
    this.mHitColor = [1.0, 0, 0, 1];
    
    this.mMapRenderable = new UISpriteRenderable(miniMapTex);
    this.mMapRenderable.setColor([1, 0, 0, 1.0]);
    this.mMapRenderable.getXform().setSize(10, 10);
    this.mMapRenderable.getXform().setPosition(this.getXform().getXPos(), 
                                                        this.getXform().getYPos());
                                 
}
gEngine.Core.inheritPrototype(PirateShip, Ship);

PirateShip.prototype.update = function(heroPos)
{
    Ship.prototype.update.call(this);
    this.mCannonballSet.update();
    
    var direction = .1 * ((this.getRigidBody().getAngularVelocity() < 0) ? 1 : -1);
    this.getRigidBody().setAngularVelocityDelta(direction);
    
    if(vec2.distance(this.getXform().getPosition(), heroPos) < 50)
    {
        this.mSpot = true;
        this._chase(heroPos);
        
        if(this.mCbTimer >= this.mCbSpawnRate)
        {
            this._shoot(heroPos);
            this.mCbTimer = 0;
        }
        
        this.mCbTimer++;
    }
    // went out of range, can no longer see player
    else
    {
        this.mCbTimer = this.mCbSpawnRate;
        this.mSpot = false;
    }
    
    this.mLifeTime++;
    this.mMapRenderable.getXform().setPosition(this.getXform().getXPos(), 
                                                        this.getXform().getYPos());
};

PirateShip.prototype._chase = function(target)
{
    this.moveTowards(target, this.mTurningDelta);
};

PirateShip.prototype._shoot = function(target)
{
    var newCb = new Cannonball(this.mCannonballTex, this.getXform().getPosition(), target);
    this.mCannonballSet.addToSet(newCb);
};

PirateShip.prototype.draw = function(camera)
{
    Ship.prototype.draw.call(this, camera);
    this.mCannonballSet.draw(camera);
    // if spot player and animation isn't done, draw animation
    if (this.mSpot === true && !this.mAngryAnim.isPopUpDone())
    {
        var pos = this.getXform().getPosition();
        this.mAngryAnim.getXform().setPosition(pos[0], pos[1] + 6);
        this.mAngryAnim.draw(camera);
        this.mAngryAnim.updatePopUp();
    }
};

PirateShip.prototype.drawForMap = function(aCamera)
{
    this.mMapRenderable.draw(aCamera);
};

PirateShip.prototype.isChasingPlayer = function()
{
    return this.mSpot;
};

PirateShip.prototype.getCannonballSet = function()
{
    return this.mCannonballSet;
};

PirateShip.prototype.isDead = function()
{
    return (!this.mInvincible && this.getHealth() <= 0);
};
