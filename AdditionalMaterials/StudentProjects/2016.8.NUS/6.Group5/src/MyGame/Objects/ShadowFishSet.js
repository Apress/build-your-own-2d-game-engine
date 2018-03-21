"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ShadowFishSet(aCamera, aTexture) {
    this.mCamera = aCamera;
    this.mTexture = aTexture;
    GameObjectSet.call(this);
    //this.kSpriteSheet = sprite;
}
gEngine.Core.inheritPrototype(ShadowFishSet, FishSet);

ShadowFishSet.prototype.initialize = function(){
    this._addFishes();
};

ShadowFishSet.prototype.addFishes= function(x){
    for(var i=0; i<x; i++){
        var tx = Math.random()*500 + 200;
        var ty = Math.random()*300 + 100;
        var tmpFish = new ShadowFish(tx, ty, this.mCamera, this.mTexture);
        tmpFish.initialize();
        this.addToSet(tmpFish);
    }
};