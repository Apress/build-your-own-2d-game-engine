/*
 * File:        StormSet.js
 * Programmers: Emily           March 2, 2019
 *              Kyla            March 13, 2019
 *
 */

/* jslint node: true, vars: true */
/* global gEngine: false, GameObject: false, GameObjectSet: false,
 * SpriteAnimateRenderable: false, Storm: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StormSet(spriteTexture,miniMapTex, xRange, yRange, shipPosition)
{
    this.kStormTex = spriteTexture;
    this.kMiniMapStorm = miniMapTex;
    this.mTotalStorms = 50;
    this.mOffsetX = xRange / 2 + 5;
    this.mOffsetY = yRange / 2 + 5;
    this.mBoundCenter = shipPosition.getXform().getPosition();
    
    this.mStormSpawnTimer = 60;
    this.mTimer = 0;
    GameObjectSet.call(this);
}

gEngine.Core.inheritPrototype(StormSet, GameObjectSet);

StormSet.prototype.createStorm = function ()
{
    //For now I am hardcoding the size of our world to be 300 WC X 300 WC
    var xspawn = -300 + Math.random() * 600;
    var yspawn = -300 + Math.random() * 600;
    var randomizer = Math.floor(Math.random() + 0.5);

    var storm = new Storm(this.kStormTex, this.kMiniMapStorm, xspawn, yspawn);
    this.addToSet(storm);
};

StormSet.prototype.update = function(minimapCam)
{
    //Update timer
    this.mTimer++;
    this.mStormSpawnTimer--;
    
    // Spawn the storms
    if(this.mStormSpawnTimer <= 0)
    {
        this.mStormSpawnTimer = Math.random() * 60 + 120;
        if(this.size() < this.mTotalStorms) {
            this.createStorm();
        } 
    }

    //Lastly update all storms
    var center = minimapCam.getWCCenter();
    var width = minimapCam.getWCWidth();
    var height = minimapCam.getWCHeight();
    var left = center[0] - (width/2);
    var right = center[0] + (width/2);
    var bottom = center[1] - (height/2);
    var top = center[1] + (height/2);
    var i;
    for (i = 0; i < this.mSet.length; i++)
    {
        //First update the object
        this.mSet[i].update();
        
        if (this.mSet[i].isDead() && this._checkStormOffMinimap(this.mSet[i], left, right, bottom, top))
        {
            this.mSet.splice(i, 1);
            i--;
        }
    }
};

StormSet.prototype.drawForMap = function(aCamera)
{
    for (var i = 0; i < this.mSet.length; i++)
    {
        this.mSet[i].drawForMap(aCamera);
    }
};

StormSet.prototype._checkStormOffMinimap = function(storm, left, right, bottom, top)
{
    var stormPos = storm.getPosition();
    if(stormPos[0] < (left - 20) || stormPos[0] > (right + 20) ||
            stormPos[1] < (bottom - 20) || stormPos[1] > (top + 20)) {
        return true;
    } else {
        return false;
    }
        
};