/*
 * @auth: Herbert Traut
 * @file: FishingLevel_SpawnerControl.js
 * @date: 12-13-15
 * @brief: Control hook related tasks in FishingLevel
 */

/* global FishingLevel, Fish, gEngine, vec2 */

'use strict';

FishingLevel.prototype.updateHooks = function(){
    var textX = (this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth()/2)+ 3;
    var textY = (this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight()/2) + 2.5;
    var offset = 20;
    
    if(this.mLives < this.mHooks.length){
        this.mHooks.pop();
    }
    
    var i;
    for(i = 0; i < this.mHooks.length; i++){
        this.mHooks[i].getXform().setPosition(textX + offset, textY);
        offset += 2;
    }
};

FishingLevel.prototype.clearHook = function(){
    var i = 0;
    
    for(i = 0; i < this.mFish.length; i++){
        if((this.mFish[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mFish.splice(i, 1);
        }
    }
    
    for(i = 0; i < this.mAngler.length; i++){
        if((this.mAngler[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mLightStorage.push(this.mAngler[i].getLight());
            this.mAngler.splice(i, 1);
        }
    }

    var spawnPos = vec2.fromValues(this.mBoat.getXform().getXPos()-(this.mBoat.getXform().getWidth()/2), 0);
    var hook = this.mBoatSet.getMember(1);
    hook.getXform().setPosition(spawnPos[0], spawnPos[1]);
    hook.setStatus(0);
    hook.resetSpeed();
};

FishingLevel.prototype.sharkHooked = function(){
    if(!this.mInvuln){
        this.mCamera.shake(-2, -2, 20, 30);
        gEngine.AudioClips.playACue(this.kSharkBite);
        this.mLives -= 1;
        this.mInvuln = true;
        this.clearHook();
    }
};