
/*
 * File: Level_Input: support the checking of inputs in the game to reduce overhead.
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet, Level */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Level.prototype.checkInput = function()
{  
    if (this.mExit.pixelTouches(this.mHero, [])){
        this.mNextLoad = "won";
        gEngine.GameLoop.stop();
    }
    if (this.mSprite.update(this.mHero,this.mSpriteEnd))    //returns true of pixel pixelTouches with last particle in system
    {
        if(this.mSpriteEnd) {
            this.mNextLoad = "lose";
            gEngine.GameLoop.stop(); 
        }
    }
    if (this.mGameTimer.getTime() >= this.mGameTimer.totalTime){
        this.mNextLoad = "lose";
        gEngine.GameLoop.stop();
    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
//        this.mSpriteEnd = !this.mSpriteEnd;
//    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mNextLoad = this.mLevel;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        console.log(this.mWallSet);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var min = 500;
        var minObj = null;
//        for(var i = 0; i < this.mButtonSet.size(); i++) {
//            var dist = this.getDistance(this.mHero,this.mButtonSet.getObjectAt(i));
//            if(dist < min) {
//                min = dist;
//                minObj = this.mButtonSet.getObjectAt(i);
//            }
//        }
        for(var i = 0; i < this.mLeverSet.size(); i++) {
            var dist = this.getDistance(this.mHero,this.mLeverSet.getObjectAt(i));
            if(dist < min) {
                min = dist;
                minObj = this.mLeverSet.getObjectAt(i);
            }
        }
        if(min < 3) {
            if(minObj.getState()===0) {
                minObj.set();
                var door = this.mDoorSet.getObjectAt(minObj.getDoorIndex());
                if(door !== undefined) {
                    if(door.set() <= 0) {
                        this.mCamera.shake(-5, -5, 5, 50);
                        this.mSprite.shake();
                    }
                    
                }
                
            }
        }
    }
};
Level.prototype.getDistance = function(obj1,obj2) {
    var dist = 0;
    var x1 = obj1.getXform().getXPos();
    var y1 = obj1.getXform().getYPos();
    var x2 = obj2.getXform().getXPos();
    var y2 = obj2.getXform().getYPos();
    dist = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
    return dist;
};
