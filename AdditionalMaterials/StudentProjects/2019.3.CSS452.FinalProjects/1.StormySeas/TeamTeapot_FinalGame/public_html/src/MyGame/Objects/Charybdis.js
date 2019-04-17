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

function Charybdis(spriteTexture, miniMapTex, atX, atY)
{       
    this.mIsActive = false;
    this.mIsShrinking = false;
    this.mJustFinished = false;
    
    Storm.call(this, spriteTexture, miniMapTex, atX, atY);
    
    this.mStorm.getXform().setSize(0, 0);
    this.mMapRenderable.setColor([1.0, 1.0, 1.0, 0.0]);
    this.mXdelta = 0;
    this.mYdelta = 0;
    this.kRot1 = 2.5;
    this.kSize = 50;
    this.mTotalLifeSpan = 20 * 60;
}

gEngine.Core.inheritPrototype(Charybdis, Storm);

Charybdis.prototype.update = function () 
{
    
    if (this.mIsActive)
    {
        if (this.mLifespan <= this.mTotalLifeSpan)
        {
            this.kRot1 += 2.5;
            Storm.prototype.update.call(this);
            this.kRot1 -= 2.5;
        }
        else
        {
            this.mIsActive = false;
            this.mIsShrinking = true;
        }
    }
    else if (this.mIsShrinking)
    {
        this.shrink();
    }
};

Charybdis.prototype.draw = function(camera)
{
    Storm.prototype.draw.call(this, camera);
};

Charybdis.prototype.shrink = function()
{
    
    
    // reset lifespan
    if (this.mLifespan > 0)
    {
        this.mLifespan -= this.mTotalLifeSpan / 60 / 10;
    }
    else
    {
        this.mLifespan = 0;
        this.mIsShrinking = false;
        this.mJustFinished = true;
    }
        
    
    var ratio =  this.mLifespan / this.mTotalLifeSpan;
    var newSize = this.kSize * ratio;
    this.mStorm.getXform().setSize(newSize, newSize);
    this.mMapRenderable.getXform().setSize(newSize, newSize);
    
    this.mStorm.getXform().incRotationByDegree((this.kRot1 + 2.5) * ratio);
    
};

Charybdis.prototype.checkIfCanSpawn = function(chance)
{
    var rand = Math.random() * chance;
    
    return !this.mIsActive && !this.mIsShrinking && (rand <= 1);
};

Charybdis.prototype.spawn = function(player)
{    
    var distanceVec = [0, 30];
    var otherPos = player.getCurrentFrontDir();
    vec2.add(distanceVec, distanceVec, player.getXform().getPosition());
    var theta = Math.atan2(otherPos[1], otherPos[0]) - Math.PI * Math.random();
    
    vec2.rotateWRT(distanceVec, distanceVec, theta, player.getXform().getPosition());
    this.getXform().setPosition(distanceVec[0], distanceVec[1]);
    this.getXform().setSize(0,0);
    this.mGrowStorm = true;
    
    this.mJustFinished = false;
    this.mIsActive = true;
};
