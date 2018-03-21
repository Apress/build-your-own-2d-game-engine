/*
 * @auth: Herbert Traut
 * @file: FishingLevel_FishControl.js
 * @date: 12-13-15
 * @brief: Control for Fish in FishingLevel
 */

/* global FishingLevel, Fish, vec2 */

'use strict';

FishingLevel.prototype.updateAllFish = function(){
    this._updateBaseFish();
    this._updateShark();
    this._updateAngler();
};

FishingLevel.prototype._updateBaseFish = function(){
    var i;
    for(i = 0; i < this.mFish.length; i++){
        this.mFish[i].statusCheck(this.mBG, this.mHook, this.mBoatSet);
        this.mFish[i].update();
        if(this.mFish[i].getBounces() > 2){
            this.mFish.splice(i, 1);
        }else if((this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn && 
                (this.mFish[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            this.mScore += this.mFish[i].getScore();
            this.mFish.splice(i, 1);
        }
    }
};

FishingLevel.prototype._updateShark = function(){
    var i;
    var result = vec2.create();
    for(i = 0; i < this.mShark.length; i++){
        if((this.mShark[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn){
            if(this.mHook.pixelTouches(this.mShark[i], result)){
                this.sharkHooked();
                this.mShark[i].animSpeedSix();
            }
            if(this.mShark[i].despawn(this.mBG)){
                this.mShark.splice(i, 1);
            }
        }else if((this.mShark[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mShark[i].resetStatus();
            this.mShark[i].updateStatus(Fish.eStatus.eDespawn);
            this.mShark[i].animSpeedSix();
            this.sharkHooked();
        }else{
            this.mShark[i].chase(this.mBG, this.mHook);
        }
    }
};

FishingLevel.prototype._updateAngler = function(){
    var i;
    for(i = 0; i< this.mAngler.length; i++){
        this.mAngler[i].statusCheck(this.mBG, this.mHook, this.mBoatSet);
        this.mAngler[i].update();
        if(this.mAngler[i].getBounces() > 2){
            this.mLightStorage.push(this.mAngler[i].getLight());
            this.mAngler.splice(i, 1);
        }else if((this.mAngler[i].getStatus() & Fish.eStatus.eDespawn) === Fish.eStatus.eDespawn && 
                (this.mAngler[i].getStatus() & Fish.eStatus.eHooked) === Fish.eStatus.eHooked){
            this.mScore += this.mAngler[i].getScore();
            this.mLightStorage.push(this.mAngler[i].getLight());
            this.mAngler.splice(i, 1);
            this.mHook.setLineLength(this.mHook.getLineLength() + 30);
        }
    }
};
