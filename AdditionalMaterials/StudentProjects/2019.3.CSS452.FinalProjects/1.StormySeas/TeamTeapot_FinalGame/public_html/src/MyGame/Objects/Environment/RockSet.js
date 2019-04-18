/*
 * File:        RockSet.js
 * Programmers: Emily           March 2, 2019
 *              Kyla            March 10, 2019
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, Rock: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function RockSet(spriteTexture, miniMapTexture, spawnPosSet)
{
    this.kRockTex = spriteTexture;
    this.kMiniMapMarker = miniMapTexture;
    this.mSpawnPosSet = spawnPosSet;
    
    GameObjectSet.call(this);
    
    for (var i = 0; i < 20; i++)
    {
        this._createRock();
    }
}

gEngine.Core.inheritPrototype(RockSet, GameObjectSet);

RockSet.prototype._createRock = function ()
{
    var skip = true;
    var index = 0;
    while(skip)
    {
        var index = Math.floor(Math.random() * (this.mSpawnPosSet.length - 1));
        console.log(index);
        if(!this.mSpawnPosSet[index].inUse())
        {
            skip = false;
        }
    }
    
    this.mSpawnPosSet[index].markInUse();
    var rock = new Rock(this.kRockTex, this.kMiniMapMarker, this.mSpawnPosSet[index].getPosition()[0], this.mSpawnPosSet[index].getPosition()[1]);
    rock.getXform().setRotationInRad(Math.random() * 2 * Math.PI);
    
    var scale = Math.random() * .5;
    var newSize = rock.getXform().getSize();
    newSize[0] = newSize[0] * scale + newSize[0] * .75;
    newSize[1] = newSize[1] * scale + newSize[1] * .75;
    
    rock.getXform().setSize(newSize[0], newSize[1]);
    this.addToSet(rock);
};

RockSet.prototype.getRockSet = function ()
{
    return this.mSet;
};

RockSet.prototype.drawForMap = function (aCamera)
{
    for (var i = 0; i < this.mSet.length; i++)
    {
        this.mSet[i].drawForMap(aCamera);
    }
};
