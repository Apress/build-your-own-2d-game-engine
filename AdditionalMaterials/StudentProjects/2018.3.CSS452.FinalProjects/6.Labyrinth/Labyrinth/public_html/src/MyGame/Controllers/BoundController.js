/*
 * File: BoundController.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, BoundingBox */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BoundController(hero, rooms, hallways) {
    this.mHero = hero;
    this.mRooms = rooms;
    this.mHallways = hallways;
}

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BoundController.prototype.update = function () {
    var room = null;
    var hallway = null;
    // figure out which room hero is in
    for(var i = this.mRooms.length - 1; i >= 0; --i)
    {
        if(this.mHero.getLowerBounds().intersectsBound(this.mRooms[i].getBBox()))
        {
            room = i;
            break;
        }
    }
    // if in a room (at least partially)
    if(room !== null)
    {
        // Check if outside room bounds
        var status = this.mRooms[room].getBBox().boundCollideStatus(this.mHero.getLowerBounds());
        if(status !== 16)
        {
            // check if also intersecting a hallway
            for(var j = 0; j < this.mHallways[room].length; ++j)
            {
                if(this.mHero.getLowerBounds().intersectsBound(this.mHallways[room][j].getBBox()))
                {
                    hallway = j;
                    break;
                }
            }
            // if intersecting room and hallway, make sure hero isn't stuck on corner
            if(hallway !== null)
            {
                var hallStatus = this.mHallways[room][hallway].getBBox().boundCollideStatus(this.mHero.getLowerBounds());
                // return if hero is only intersecting opposite bounds of room and hallway
                // that means hero is transitioning from one to other within bounds
                if(status + hallStatus === 3 || status + hallStatus === 12)
                    return;
                //Otherwise hero should be pushed into room or hallway
                else
                {
                   this._pushInsideObjects(this.mRooms[room], this.mHallways[room][hallway]);
                }
            }
            // if just outside room, push back in
            else
            {
                this._pushInsideObject(this.mRooms[room]);
            }
        }
    }
    else
    {
        console.log("Hero out of bounds");
    }
};

BoundController.prototype._pushInsideObject = function (obj) {
    var status = obj.getBBox().boundCollideStatus(this.mHero.getLowerBounds());
    var left = status & 1;
    var right = status & 2;
    var top = status & 4;
    var bot = status & 8;
    // if intersecting left
    if(left === 1)
    {
        var xDelta = obj.getBBox().minX() - this.mHero.getLowerBounds().minX();
        this.mHero.getXform().incXPosBy(xDelta);
    }
    //if intersecting right
    if(right === 2)
    {
        var xDelta = obj.getBBox().maxX() - this.mHero.getLowerBounds().maxX();
        this.mHero.getXform().incXPosBy(xDelta);
    }
    //if intersecting top
    if(top === 4)
    {
        var yDelta = obj.getBBox().maxY() - this.mHero.getLowerBounds().maxY();
        this.mHero.getXform().incYPosBy(yDelta);
    }
    //if intersecting bottom
    if(bot === 8)
    {
        var yDelta = obj.getBBox().minY() - this.mHero.getLowerBounds().minY();
        this.mHero.getXform().incYPosBy(yDelta);
    }
};

BoundController.prototype._pushInsideObjects = function (objOne, objTwo) {
    // Push in either room or hallway
    var dir = this.mHero.getCurrentFrontDir();
    var statusOne = objOne.getBBox().boundCollideStatus(this.mHero.getLowerBounds());
    var statusTwo = objTwo.getBBox().boundCollideStatus(this.mHero.getLowerBounds());
    var leftOne = statusOne & 1;
    var rightOne = statusOne & 2;
    var topOne = statusOne & 4;
    var botOne = statusOne & 8;
    var leftTwo = statusTwo & 1;
    var rightTwo = statusTwo & 2;
    var topTwo = statusTwo & 4;
    var botTwo = statusTwo & 8;

    // if trying to leave objOne
    if((dir[0] < 0 && leftOne === 1) ||
       (dir[0] > 0 && rightOne === 2) ||
       (dir[1] > 0 && topOne === 4) ||
       (dir[1] < 0 && botOne === 8))
    {
        //Trying to transition left/right
        if(leftOne === 1 && rightTwo === 2 || rightOne === 2 && leftTwo === 1)
        {
            if(topOne === 4)
            {
                var yDelta = objOne.getBBox().maxY() - this.mHero.getLowerBounds().maxY();
                this.mHero.getXform().incYPosBy(yDelta);
            }
            else if(botOne === 8)
            {
                var yDelta = objOne.getBBox().minY() - this.mHero.getLowerBounds().minY();
                this.mHero.getXform().incYPosBy(yDelta);
            }
            else
                this._pushInsideObject(objOne);
        }
        //Trying to transition top/bot
        if(topOne === 4 && botTwo === 8 || botOne === 8 && topTwo === 4)
        {
            if(leftOne === 1)
            {
                var xDelta = objOne.getBBox().minX() - this.mHero.getLowerBounds().minX();
                this.mHero.getXform().incXPosBy(xDelta);
            }
            else if(rightOne === 2)
            {
                var xDelta = objOne.getBBox().maxX() - this.mHero.getLowerBounds().maxX();
                this.mHero.getXform().incXPosBy(xDelta);
            }
            else
                this._pushInsideObject(objOne);
        }
    }
    else if((dir[0] < 0 && leftTwo === 1) ||
       (dir[0] > 0 && rightTwo === 2) ||
       (dir[1] > 0 && topTwo === 4) ||
       (dir[1] < 0 && botTwo === 8))
    {
        //Trying to transition left/right
        if(leftTwo === 1 && rightOne === 2 || rightTwo === 2 && leftOne === 1)
        {
            if(topTwo === 4)
            {
                var yDelta = objTwo.getBBox().maxY() - this.mHero.getLowerBounds().maxY();
                this.mHero.getXform().incYPosBy(yDelta);
            }
            else if(botTwo === 8)
            {
                var yDelta = objTwo.getBBox().minY() - this.mHero.getLowerBounds().minY();
                this.mHero.getXform().incYPosBy(yDelta);
            }
            else
                this._pushInsideObject(objTwo);
        }
        //Trying to transition top/bot
        if(topTwo === 4 && botOne === 8 || botTwo === 8 && topOne === 4)
        {
            if(leftTwo === 1)
            {
                var xDelta = objTwo.getBBox().minX() - this.mHero.getLowerBounds().minX();
                this.mHero.getXform().incXPosBy(xDelta);
            }
            else if(rightTwo === 2)
            {
                var xDelta = objTwo.getBBox().maxX() - this.mHero.getLowerBounds().maxX();
                this.mHero.getXform().incXPosBy(xDelta);
            }
            else
                this._pushInsideObject(objTwo);
        }
    }
    this.update();
};
