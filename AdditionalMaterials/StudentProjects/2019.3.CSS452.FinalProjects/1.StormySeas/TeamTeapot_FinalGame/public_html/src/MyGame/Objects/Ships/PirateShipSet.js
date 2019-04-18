/*
 * File:        PirateShipSet.js
 * Programmers: Kyla            March 17, 2019
 *              
 *
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PirateShipSet(worldBounds, pirateInfo)
{
    GameObjectSet.call(this);
    
    this.mPirateInfo = pirateInfo;
    
    this.mSpawnRate = 240;
    this.mTimer = 0;
    
    this.mWorldBounds = worldBounds;
}
gEngine.Core.inheritPrototype(PirateShipSet, GameObjectSet);

PirateShipSet.prototype.update = function(minimapCam, heroPos)
{
    var center = minimapCam.getWCCenter();
    var width = minimapCam.getWCWidth();
    var height = minimapCam.getWCHeight();
    var left = center[0] - (width/2);
    var right = center[0] + (width/2);
    var bottom = center[1] - (height/2);
    var top = center[1] + (height/2);
    
    if(this.mTimer >= this.mSpawnRate)
    {
        this._createShip(left, right, bottom, top);
        this.mTimer = 0;
        console.log("pirate spawned");
    }
    this.mTimer++;
    
    var i;
    for (i = 0; i < this.mSet.length; i++)
    {
        //First update the object
        this.mSet[i].update(heroPos);
        
        if (this.mSet[i].isDead())
        {
            this.mSet.splice(i, 1);
            i--;
        }
        
        var despawnCoinFlip = Math.round(Math.random(1));
        if(despawnCoinFlip === 0)
        {
            this._checkShipOffMinimap(this.mSet[i], left, right, bottom, top);
        }
    }
};

PirateShipSet.prototype.drawForMap = function(aCamera)
{
    var i;
    for (i = 0; i < this.mSet.length; i++)
    {
        //First update the object
        this.mSet[i].drawForMap(aCamera);
    }
};


PirateShipSet.prototype._createShip = function(left, right, bottom, top)
{
    var tryAgain = true;
    var xSpawn = 0;
    var ySpawn = 0;
    
    while(tryAgain)
    {
        var lrCoinFlip = Math.round(Math.random(1));
        var btCoinFlip = Math.round(Math.random(1));

        if(lrCoinFlip === 0)
        {
            xSpawn = left - 5 - Math.random(10);
        }
        else
        {
            xSpawn = right + 5 + Math.random(10);
        }
        if(btCoinFlip === 0)
        {
            ySpawn = left - 5 - Math.random(10);
        }
        else
        {
            ySpawn = right + 5 + Math.random(10);
        }

        if(xSpawn < this.mWorldBounds[0] || xSpawn > this.mWorldBounds[1] ||
                ySpawn < this.mWorldBounds[2] || ySpawn > this.mWorldBounds[3])
        {
            continue;
        }
        else
        {
            tryAgain = false;
        }
    }
    
    var pirate = new PirateShip(this.mPirateInfo[0], this.mPirateInfo[1], this.mPirateInfo[2],
                                this.mPirateInfo[3], this.mPirateInfo[4], this.mPirateInfo[5]);
    pirate.getXform().setPosition(xSpawn, ySpawn);
    this.addToSet(pirate);
};

PirateShipSet.prototype._checkShipOffMinimap = function(ship, left, right, bottom, top)
{
    var shipPos = ship.getPosition();
    if(shipPos[0] < (left - 20) || shipPos[0] > (right + 20) ||
            shipPos[1] < (bottom - 20) || shipPos[1] > (top + 20))
    {
        this.removeFromSet(ship);
        console.log("pirate despawned");
    }
};

PirateShipSet.prototype.setSpawnRate = function(value)
{
    this.mSpawnRate = value;
    if(this.mSpawnRate < 0)
    {
        this.mSpawnRate = 0;
    }
};

PirateShipSet.prototype.incSpawnRateBy = function(value) { this.setSpawnRate(this.mSpawnRate + value); };

PirateShipSet.prototype.getShipsOnCamera = function(camera)
{
    var ret = [];
    var center = camera.getWCCenter();
    var width = camera.getWCWidth();
    var height = camera.getWCHeight();
    var left = center[0] - (width/2);
    var right = center[0] + (width/2);
    var bottom = center[1] - (height/2);
    var top = center[1] + (height/2);
    
    for(var i = 0; i < this.size(); i++)
    {
        var shipPos = this.mSet[i].getPosition();
        var onCam = true;
        if(shipPos[0] < left || shipPos[0] > right ||
                shipPos[1] < bottom || shipPos[1] > top)
        {
            onCam = false;
        }
        if(onCam)
        {
            ret.push(this.mSet[i]);
        }
    }
    
    return ret;
};
