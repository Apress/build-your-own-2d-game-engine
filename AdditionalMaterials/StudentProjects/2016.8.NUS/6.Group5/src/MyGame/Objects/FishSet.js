
/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FishSet(aCamera, aTexture, myLightArray, acueRight, acueWrong) {
    this.mCamera = aCamera;
    this.mTexture = aTexture;
    this.aScore = acueRight;
    this.aWrong = acueWrong;
    this.mLightArray = myLightArray;
    GameObjectSet.call(this);
    //this.kSpriteSheet = sprite;
}
gEngine.Core.inheritPrototype(FishSet, GameObjectSet);

FishSet.prototype.initialize = function(){
    this._addFishes();
};

FishSet.prototype.addFishes= function(x){
    for(var i=0; i<x; i++){
        var tx = Math.random()*500 + 200;
        var ty = Math.random()*300 + 100;
        var tmpFish = new Fish(tx, ty, this.mCamera, this.mTexture, this.mLightArray,
                        this.aScore, this.aWrong);
        tmpFish.initialize();
        this.addToSet(tmpFish);
    }
};

/*
FishSet.prototype.update = function() {
    GameObjectSet.prototype.update.call(this);

};
*/