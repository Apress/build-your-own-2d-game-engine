/*
 * File:        SunkenTreasureSet.js
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

function SunkenTreasureSet(spriteTexture, miniMapTex, spawnPosSet)
{
    GameObjectSet.call(this);
    
    this.kTreasureTex = spriteTexture;
    this.kMiniMapTex = miniMapTex;
    this.mSpawnPosSet = spawnPosSet;
    this.mSpawnPointsUsed = [];
    
    for(var i = 0; i < 7; i++)
    {
        this._createTreasure();
    }
    console.log(this.mSpawnPointsUsed);
}
gEngine.Core.inheritPrototype(SunkenTreasureSet, GameObjectSet);

SunkenTreasureSet.prototype._createTreasure = function()
{
    var skip = true;
    var index = 0;
    
    while(skip)
    {
        var index = Math.round(Math.random() * (this.mSpawnPosSet.length - 1));
        if(!this.mSpawnPosSet[index].inUse())
        {
            skip = false;
        }
    }
    
    var lifeSpan = Math.round((Math.random()*(1500-600)))+600;
    this.mSpawnPosSet[index].markInUse();
    this.mSpawnPointsUsed.push(index);
    var newTreasure = new SunkenTreasure(this.kTreasureTex, this.kMiniMapTex, this.mSpawnPosSet[index].getPosition(), lifeSpan);
    this.addToSet(newTreasure);
};

SunkenTreasureSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
        if(this.mSet[i].isDead())
        {
            var pos = this.mSet[i].getPos();
            this._resetSpawnPoint(pos);
            this.removeFromSet(this.mSet[i]);
            this._createTreasure();
            console.log("treasure died:", this.mSet);
        }
    }
};

SunkenTreasureSet.prototype.collectAt = function(atX, atY)
{
    var treasureFound = false;
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        var bBox = this.mSet[i].getBBox();
        if(bBox.containsPoint(atX, atY))
        {
            this.removeFromSet(this.mSet[i]);
            treasureFound = true;
            console.log("treasure collected:", this.mSet);
        }
    }
    
    return treasureFound;
};

SunkenTreasureSet.prototype.drawForMap = function(aCamera)
{
    for (var i = 0; i < this.mSet.length; i++)
    {
        this.mSet[i].drawForMap(aCamera);
    }
};

SunkenTreasureSet.prototype._resetSpawnPoint = function(postion)
{
    for(var i = 0; i < this.mSpawnPointsUsed.length; i++)
    {
        var index = this.mSpawnPointsUsed[i];
        var spawnPos = this.mSpawnPosSet[index].getPosition();
        if(postion[0] === spawnPos[0] && postion[1] === spawnPos[1])
        {
            this.mSpawnPosSet[index].unmarkInUse();
            this.mSpawnPointsUsed.splice(i, 1);
        }
    }
};
