/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/* 
 * How to use:
 * 1. Instantiate CollectibleSet obj when game scene initializes.
 * 2. Add Collectible objects to using addCollectible.
 * 3. Set update() and draw() in their respective functions in game scene.
 * 4. Set it so when a certain object touches a Collectible, 
 *      collectibleTouches is called.
 */

function CollectibleSet(rooms, texture, shadowReceiver){
    GameObjectSet.call(this);
    
    this.mItemsRemoved = 0;
    this.reductionModeIsOn = false;
    this.kAmbushThreshold = 20;
    this.mShadowReceiver = shadowReceiver;
    
    var pos = rooms[1].getXform().getPosition();
    var newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
    
    pos = rooms[3].getXform().getPosition();
    newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
    
    pos = rooms[5].getXform().getPosition();
    newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
    
    pos = rooms[9].getXform().getPosition();
    newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
    
    pos = rooms[11].getXform().getPosition();
    newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
    
    pos = rooms[15].getXform().getPosition();
    newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
    
    pos = rooms[18].getXform().getPosition();
    newCollectible = new Collectible(texture, pos);
    this.addToSet(newCollectible);
}
gEngine.Core.inheritPrototype(CollectibleSet, GameObjectSet);

CollectibleSet.prototype.update = function(){
    GameObjectSet.prototype.update.call(this);
    
    if(this.reductionModeIsOn){
        this.removeCollectible();
    }
};

CollectibleSet.prototype.collectibleTouches = function(GameObject){
    for(var i = 0; i < this.mSet.length; i++){
        if(this.mSet[i].isTouching(GameObject)){
            this.mSet[i].isDisintigrating = true;
            this.mSet[i].disintigrate();
            this.reductionModeIsOn = true;
            this.mItemsRemoved++;
        }
    }
    return false;  
};

//Only use within this class. For removing
//collectible when collectibleTouches is true.
CollectibleSet.prototype.removeCollectible = function(){
    for(var i = 0; i < this.mSet.length; i++){
        if(this.mSet[i].isDisintigrating){
            var collectible = this.getObjectAt(i);
            this.mShadowReceiver.removeShadowCaster(collectible);
        }
    }
    this.reductionModeIsOn = false;
};

//To see how many collectibles are left
CollectibleSet.prototype.getItemsRemoved = function(){
    return this.mItemsRemoved;
};

CollectibleSet.prototype.size = function(){
    return this.mSet.length;
};

CollectibleSet.prototype.isPlayerNearby = function (pos) {
    for(var i = 0; i < this.mSet.length; i++)
    {
        if(!this.mSet[i].isDisintigrating)
        {
            var vec = vec2.create();
            vec = vec2.sub(vec, this.mSet[i].getXform().getPosition(), pos);
            var dist = vec2.length(vec);
            if(dist < this.kAmbushThreshold)
                return true;
        }
    }
    return false;
};