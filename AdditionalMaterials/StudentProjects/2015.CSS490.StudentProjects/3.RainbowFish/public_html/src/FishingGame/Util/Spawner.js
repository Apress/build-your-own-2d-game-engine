/*
 * @auth: Herbert Traut
 * @file: Spawner.js
 * @date: 11-27-15
 * @brief: Spawn controller for objects
 * 
 */


/* global Camera, Fish */

function Spawner(world, camera){
    this.mWorld = world;
    this.mWorldCenter = world.getXform().getPosition();
    this.mWorldWidth = world.getXform().getWidth();
    this.mWorldHeight = world.getXform().getHeight();
    this.mCamera = camera;
    this.mCamCenter = camera.getWCCenter();
    this.mCamWidth = camera.getWCWidth();
    this.mCamHeight = camera.getWCHeight();
    
    this.mMinL;
    this.mMinR;
    this.mMinT;
    this.mMinB;
    
    this.mMaxL;
    this.mMaxR;
    this.mMaxT;
    this.mMaxB;
    
    this.mZoneSizeLimit = 15;
    
    this._findSpawnZone();
};

/*
 * @amount: the amount to spawn
 * @type: the object type to be spawned
 * @texture: an array of sprite sheets for the object(s)
 */
Spawner.prototype.populate = function (amount, type, texturePack){
    
    if(amount === 0) return;
    if(type === null) return;
    
    var population = [];
    var i = 0;
    var objXform = null;
    var object = null;
    var w, h, x, y;
    
    for(i; i < amount; i++){
        switch(type){
            case "Fish":
                object = new Fish(texturePack[0], texturePack[1], texturePack[2], texturePack[3], texturePack[4]);
                object.setSpeed(0.1);
                objXform = object.getXform();
                x = this._generateXPos(Math.round(Math.random()));
                if(this.mCamCenter[1] > (0-this.mCamHeight)){
                    y = this._generateYPos(0);
                }else{
                    y = this._generateYPos(Math.round(Math.random()));
                }
                // fish size based on depth of fish
                w = Math.floor((Math.random() * 3 + Math.abs(y/35) + 2));
                h = w / 2;
                objXform.setSize(w, h);
                object.setScore(w * h);
                objXform.setPosition(x, y);
                population.push(object);
                if(w > 3 * h){
                    w = h / 2;
                }
                continue;
            case "Shark":
                object = new Shark(texturePack[0], texturePack[1]);
                object.setSpeed(0.145);
                objXform = object.getXform();
                w = 15;
                h = w / 4;
                objXform.setSize(w, h);
                object.setScore(0);
                x = this._generateXPos(Math.round(Math.random()));
                if(this.mCamCenter[1] > (0-this.mCamHeight)){
                    y = this._generateYPos(0);
                }else{
                    y = this._generateYPos(Math.round(Math.random()));
                }
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            case "Angler":
                object = new AnglerFish(texturePack[0], texturePack[1]);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*3) + 6);
                h = w;
                objXform.setSize(w, h);
                object.setScore(w * h);
                x = this._generateXPos(Math.round(Math.random()));
                if(this.mCamCenter[1] > (0-this.mCamHeight)){
                    y = this._generateYPos(0);
                }else{
                    y = this._generateYPos(Math.round(Math.random()));
                }
                objXform.setPosition(x, y);
                object.createLight();
                population.push(object);
                continue;    
            case "Cloud":
                object = new Cloud(texturePack[0], texturePack[1], this.mWorld);
                object.setSpeed(0.1);
                objXform = object.getXform();
                w = Math.floor((Math.random()*15) + 30);
                h = w * 0.5;
                objXform.setSize(w, h);
                x = this._generateXPos(Math.round(Math.random()));
                y = 0 + (Math.floor((Math.random()*20) + 17));
                objXform.setPosition(x, y);
                population.push(object);
                continue;
            default: 
                break;
        }
    }
    
    return population;
};

/*
 * Coordinates a generated around the camera's center
 * @value: 0 for x coordinate to the left, 1 for x coordinate to the right
 */
Spawner.prototype._generateXPos = function(value){
    var x;
    if(value === 1 && this._checkZoneSize(this.mMinR, this.mMaxR)){
        
        x = this._getRandomInt(this.mMinR, this.mMaxR) - this.mZoneSizeLimit;
        
    }else if(this._checkZoneSize(this.mMinL, this.mMaxL)){
        
         x = this._getRandomInt(this.mMinL, this.mMaxL) + this.mZoneSizeLimit;
         
    }else{
        //Fail Condition incase SpawnZone is ever too small on both sides,
        //in which case spawn in the camera view
        x = this._getRandomInt(this.mMaxL, this.mMinR);
    }
    return x;
};

/*
 * @value: 0 for y coordinate below, 1 for y coordinate above
 */
Spawner.prototype._generateYPos = function(value){
    var y;
    if(value === 1 && this._checkZoneSize(this.mMinT, this.mMaxT)){
        
        y = this._getRandomInt(this.mMinT, this.mMaxT) - this.mZoneSizeLimit;
        
    }else if(this._checkZoneSize(this.mMinB, this.mMaxB)){
        
        y = this._getRandomInt(this.mMinB, this.mMaxB) + this.mZoneSizeLimit;
        
    }else{ 
        //Fail Condition incase SpawnZone is ever too small on both sides,
        //in which case spawn in the camera view
        y = this._getRandomInt(this.mMaxB, this.mMinT);
    }
    
    return y;
};

Spawner.prototype._updateCameraPos = function(){
    this.mCamCenter = this.mCamera.getWCCenter();
    this.mCamWidth = this.mCamera.getWCWidth();
    this.mCamHeight = this.mCamera.getWCHeight();
};

Spawner.prototype._findSpawnZone = function(){
    
    this.mMaxL = this.mCamCenter[0] - (this.mCamWidth/2);
    this.mMinL = this.mWorldCenter[0] - (this.mWorldWidth/2);
    
    this.mMinR = this.mCamCenter[0] + (this.mCamWidth/2);
    this.mMaxR = this.mWorldCenter[0] + (this.mWorldWidth/2);
    
    this.mMinT = this.mCamCenter[1] + (this.mCamHeight/2);
    
    this.mMaxT = 0;
    
    this.mMaxB = this.mCamCenter[1] - (this.mCamHeight/2);
    this.mMinB = this.mWorldCenter[1] - (this.mWorldHeight/2);
};

Spawner.prototype._getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Spawner.prototype._checkZoneSize = function (min, max){
    return ((max - min) < this.mZoneSizeLimit) ? false : true; 
};

Spawner.prototype.update = function(){
    this._updateCameraPos();
    this._findSpawnZone();
};