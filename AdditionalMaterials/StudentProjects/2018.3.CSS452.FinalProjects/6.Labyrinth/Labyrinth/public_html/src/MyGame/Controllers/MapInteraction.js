/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapInteraction() {    
    this.mIceRooms = [14, 15, 16, 17, 18, 37, 38];
    this.mSandRooms = [9];
    this.mRooms = null;
    this.mPlayer = null;
};


MapInteraction.prototype.init = function (player, rooms) {
    this.mRooms = rooms;
    this.mPlayer = player;
};
// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MapInteraction.prototype.update = function () {
    if(this.isOnIce())
        this.mPlayer._transitionToOnIce();
    else if(this.isOnSand())
        this.mPlayer._transitionToOnSand();
};

MapInteraction.prototype.isOnIce = function () {
    for(var i = 0; i < this.mIceRooms.length; ++i)
    {
        if(this.mPlayer.getLowerBounds().intersectsBound(this.mRooms[this.mIceRooms[i]].getBBox()))
            return true;
    }
    return false;
};

MapInteraction.prototype.isOnSand = function () {
    for(var i = 0; i < this.mSandRooms.length; ++i)
    {
        if(this.mPlayer.getLowerBounds().intersectsBound(this.mRooms[this.mSandRooms[i]].getBBox()))
            return true;
    }
    return false;};