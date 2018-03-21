"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LightFish(x, y, aCamera, aTexture) {
    // The camera to view the scene
    //this.mSpeed = 0.1;   // 0.8 is properly.
    this.mCamera = aCamera;

    this.mFish = new LightRenderable(aTexture);
    
    this.mFishRadius = 30;
    this.mFishObj = new GameObject(this.mFish);
    GameObject.call(this, this.mFishObj);

    this.mShowBounds = false;

    this.mCurrentState = null;
    this.mTargetPosition = null;

    this.kReferenceSpeed = 1;

    this.xPos = x;
    this.yPos = y;
    
    // light in the LightFish
    this.mLight = null;

}

gEngine.Core.inheritPrototype(LightFish, Fish);

LightFish.prototype._initializeLight = function(){
    	this.mLight = new Light();
	this.mLight.setLightType(Light.eLightType.ePointLight);
	this.mLight.setColor([0, 1, 1, 1]);
	this.mLight.setXPos(0.5*gWorldWidth);
	this.mLight.setYPos(0.5*gWorldHeight);
	this.mLight.setZPos(0);
	this.mLight.setNear(20);
	this.mLight.setFar(60);
	this.mLight.setIntensity(2);
    //this.mFish.addLight(this.mLight);
};

LightFish.prototype.initialize = function(){
    
    // initialize light in the fish
    
    this.mFishObj.getXform().setSize(this.mFishRadius, 2*this.mFishRadius);
    this.mFishObj.getXform().setPosition(this.xPos, this.yPos);
    
    this._initializeLight();
    
    // initialize the mTargetPosition and set speed;
    this.mTargetPosition = this._getRandomPosition();

    // initialize the current state;

    // initilize the timer
    this.timerAngry = this.timerAngryGap;
    
};


LightFish.prototype._getRandomPosition = function(){
    var tmpX = 10 + Math.random()*(gWorldWidth-10);  // 10 -- width/height-10
    var tmpY = 10 + Math.random()*(gWorldHeight-10);

    this.setSpeed( (0.7+0.6*Math.random()) * this.kReferenceSpeed);
    return vec2.fromValues(tmpX, tmpY);
};

LightFish.prototype._patrol = function(){

   // Continue patrolling!
    GameObject.prototype.update.call(this);
    var toTarget = [];
    vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
    var d = vec2.length(toTarget);
    if(d>80){
        this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
        var fishPos = this.mFishObj.getXform().getPosition();
        this.mLight.setXPos(fishPos[0]);
        this.mLight.setYPos(fishPos[1]);
    }
    else{
        this.mTargetPosition = this._getRandomPosition();
    }
};

LightFish.prototype.update = function(){
    
    this._patrol();  
    //gEngine.Physics.processObjObj(this.mPlatformObject, this.mMinionObject);
};


LightFish.prototype.getLight = function(){
    return this.mLight;
};
