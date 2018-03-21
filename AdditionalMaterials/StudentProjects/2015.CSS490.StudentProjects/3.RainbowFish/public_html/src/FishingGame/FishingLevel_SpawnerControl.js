/*
 * @auth: Herbert Traut
 * @file: FishingLevel_SpawnerControl.js
 * @date: 12-13-15
 * @brief: Control for spawning objects in FishingLevel
 */

/* global FishingLevel */

'use strict';

FishingLevel.prototype.checkNPCcount = function(){
    this.mSpawner.update();
    var batch = null;
    var i = 0;
    
    if(this.mFish.length < (this.mSpawnLimit)){
        var amount = this.mSpawnLimit - this.mFish.length;
        batch = this.mSpawner.populate(amount, "Fish", this.mFishTextures);
        for(i = 0; i < batch.length; i++){
            this.mFish.push(batch[i]);
            this.addAllLightsTo(batch[i].getRenderable());
        }
    }
    
    if(this.mShark.length < this.mSpawnLimitShark){
        var amount = this.mSpawnLimitShark - this.mShark.length;
        batch = this.mSpawner.populate(amount, "Shark", this.mSharkTextures);
        for(i = 0; i < batch.length; i++){
            this.mShark.push(batch[i]);
            this.addAllLightsTo(batch[i].getRenderable());
        }
    }
    
    if(this.mAngler.length < this.mSpawnLimitAngler){
        var amount = this.mSpawnLimitAngler - this.mAngler.length;
        batch = this.mSpawner.populate(amount, "Angler", this.mAnglerTextures);
        for(i = 0; i < batch.length; i++){
            batch[i].setLight(this.mLightStorage.pop());
            this.mAngler.push(batch[i]);
            this.addAllLightsTo(batch[i].getRenderable());
        }
    }
};
