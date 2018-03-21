


/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightFishSet(aCamera, aTexture) {
    this.mCamera = aCamera;
    this.mTexture = aTexture;
    GameObjectSet.call(this);
    this.mLight = null;
    this.num = 0;
}
gEngine.Core.inheritPrototype(LightFishSet, FishSet);

LightFishSet.prototype.initialize = function(){
    this._addFishes();
};

LightFishSet.prototype.addFishes= function(x){
    for(var i=0; i<x; i++){
        var tx = Math.random()*500 + 200;
        var ty = Math.random()*300 + 100;
        var tmpFish = new LightFish(tx, ty, this.mCamera, this.mTexture);
        tmpFish.initialize();
        this.addToSet(tmpFish);
        this.num += 1;
      
    }
};

LightFishSet.prototype.getLightSet = function(){
    /*
    this.mLight = new Light();
	this.mLight.setLightType(Light.eLightType.ePointLight);
	this.mLight.setColor([100, 0, 0, 1]);
	this.mLight.setXPos(0.5*gWorldWidth);
	this.mLight.setYPos(0.5*gWorldHeight);
	this.mLight.setZPos(-1);
	this.mLight.setNear(50);
	this.mLight.setFar(100);
	this.mLight.setIntensity(50);
    return this.mLight;
    */
   
   var lightSet = new Array();
   for (var i = 0; i < this.num; i++){
       lightSet.push(this.getObjectAt(i).getLight());
   }
   return lightSet;
};

/*
FishSet.prototype.update = function() {
    GameObjectSet.prototype.update.call(this);

};
*/