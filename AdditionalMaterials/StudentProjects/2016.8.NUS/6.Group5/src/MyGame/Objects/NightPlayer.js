"use strict";

function NightPlayer(myCamera, foodTexture, aLevel, aFontFile, iniScore, aChance) {
    
    this.mCamera = myCamera;
    this.mFood = null;
    this.mFoodTexture = foodTexture;

    this.kScore = "assets/score.wav";

    this.mCameraBBox = null;

    this.mFoodPos = null;
    
    this.timerFeedGap = 100;
    this.timerFeed = this.timerFeedGap;

    // some flages
    this.shootFood = false;

    this.mFontFile = aFontFile;
    this.mScoreBoard = null;
    this.mInitScore = iniScore;
    this.mLastScore = iniScore;

    this.mChance = aChance;

    this.mNumFoodLeft = aLevel;

    this.mCurrentLevel = aLevel;

    this.numLevelUp = -1;
    this.isGameOver = false;

    // boundaries.
    this.leftWorldBound = 350;
    this.rightWorldBound = gWorldWidth - 350;
    this.upWorldBound = gWorldHeight - 0.5*gViewHeight+10;
    this.downWorldBound = 0.5*gViewHeight-10;

    this.mLock = true;
    this.mLight = null;
}

NightPlayer.prototype._initializeFood = function() {
    var mRenderable = new LightRenderable(this.mFoodTexture);
    //mRenderable.setColor([0, 5, 2, 1]);
    
    /*
    if(this.mCurrentLevel === 3){
        this.mLastLevel = 0;
    }   else{
        this.mLastLevel = this.mCurrentLevel-1;
    }*/
    this.mFood = new GameObject(mRenderable);
    this.mFood.getXform().setSize(20, 20);
    //this.mFood.getXform().setPosition(0.5*gWorldWidth, 0.5*gWorldHeight-0.5*(gCameraWidth*9)/16+10);
    this._updateFood(); 
};

NightPlayer.prototype._initializeCameraBBox = function() {
    this.mCameraBBox = new Renderable();
    this.mCameraBBox.setColor([0.9, 0.9, 0.9, 0.3]);
    var center = this.mCamera.getWCCenter();
    var XPos = center[0];
    var YPos = center[1];
    this.mCameraBBox.getXform().setPosition(XPos, YPos);
    this.mCameraBBox.getXform().setSize(this.mCamera.getWCWidth(), this.mCamera.getWCHeight());
};

NightPlayer.prototype._initializeLight = function() {
        this.mLight = new Light();
	this.mLight.setLightType(Light.eLightType.eSpotLight);
	this.mLight.setColor([1, 1, 1, 1]);
        this.mLight.setDirection([0, -1, 1]);
	this.mLight.setXPos(0.5*gWorldWidth);
	this.mLight.setYPos(gWorldHeight);
	this.mLight.setZPos(0);
        this.mLight.setOuter(2.0);
	this.mLight.setInner(1.5);
	this.mLight.setNear(500);
	this.mLight.setFar(550);
        this.mLight.setIntensity(1.5);
};


NightPlayer.prototype.initialize = function(){
    
    this._initializeCameraBBox();
    this._initializeFood();
    this._initializeLight();

    this.mScoreBoard = new ScoreBoard(this.mFontFile, this.mInitScore, this.mCurrentLevel,
            this.mChance);
    this.mScoreBoard.initialize();
   
};

NightPlayer.prototype._updateFood = function() {//fix food to the bottomCenter of camera
    var camCenter = this.mCamera.getWCCenter();
    var xPos = camCenter[0];
    var yPos = camCenter[1] - 0.5*this.mCamera.getWCHeight();
    this.mFood.getXform().setPosition(xPos, yPos);
};

NightPlayer.prototype._updateCameraBBox = function(){
    
    var camCenter = this.mCamera.getWCCenter();
    var xPos = camCenter[0];
    var yPos = camCenter[1];
    this.mCameraBBox.getXform().setPosition(xPos, yPos);
};

NightPlayer.prototype.update = function() {
    
    var delta = 0.01;  
    
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        var x = this.mLight.getDirection()[0] - delta;
        var y = this.mLight.getDirection()[1];
        var z = this.mLight.getDirection()[2];
        this.mLight.setDirection([x, y, z]);
        this._updateFood();
        this._updateCameraBBox();
    }   
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        var x = this.mLight.getDirection()[0] + delta;
        var y = this.mLight.getDirection()[1];
        var z = this.mLight.getDirection()[2];
        this.mLight.setDirection([x, y, z]);
        this._updateFood();
        this._updateCameraBBox();
    }
    
    
    if (!this.mFood.mVisible){
        this._initializeFood();
    }
    
    this._feed();
    
    this.mScoreBoard.update();

    if(gAngry){
        gAngry = false;
        this.mNumFoodLeft -= 1;
    }

    if(this.mNumFoodLeft == 0){
        var score = this.mScoreBoard.getScore();
        this.mInitScore = score;
        if((score-this.mLastScore) === this.mCurrentLevel){
            this.numLevelUp = 1;
        }   else if(((score-this.mLastScore)===this.mCurrentLevel-1) && this.mChance){
            this.numLevelUp = 0;
        }   else{
            this.isGameOver = true;
        }
    }
};

NightPlayer.prototype._startTimer = function(){
    this.timerFeed -= 1;
    if(this.timerFeed <= 0){
        this.timerFeed = this.timerFeedGap;
        gCanFeed = true;
        gCanShoot = false;
    }
};
NightPlayer.prototype._feed = function(){
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left) && gCanFeed && gCanShoot){
        this.mFood.getXform().setSize(20, 20);
        var mouseXPos = this.mCamera.mouseWCX();
        var mouseYPos = this.mCamera.mouseWCY();
        this.mFoodPos = vec2.fromValues(mouseXPos, mouseYPos);
        //this.mNumFoodLeft -= 1;
        if(this.mNumFoodLeft >= 0){
            this.shootFood = true;// to move the food
            gCanFeed = false;
            this.mLock = true;
        }

        //this.mFood.mRenderComponent.setColor([0, 0, 200, 1]);
    }    
    if(!this.canFeed){
        this._startTimer();
    }
    if(this.shootFood){
        this._shootFoodTowards(this.mFoodPos);
    }
};

NightPlayer.prototype._shootFoodTowards = function(pos){
    
    var sub = [];
    vec2.subtract(sub, pos, this.mFood.getXform().getPosition());
       
    var d = vec2.length(sub);

    var fish = gWaitingFishes.pop();
    var fishObj = fish.getObject();
    var h = [];
    if(this.mFood.pixelTouches(fishObj, h)){
        this.shootFood = false;
        fish.getFed();
        this.mFood.setVisibility(false);
        //this.mFood = null;
        this.mScoreBoard.changeScore(1);
        this.mNumFoodLeft -= 1;
        this.mLock = false;
        gEngine.AudioClips.playACue(this.kScore);
    }
    
    if(d > 1 && this.mLock){
            this.mFood.getXform().incXPosBy(sub[0]*0.1);
            this.mFood.getXform().incYPosBy(sub[1]*0.1);
    }
    /*
    else {
            this.shootFood = false;
            this.mFood.setVisibility(false);
    }
    */
};

NightPlayer.prototype.draw = function(){
    this.mFood.draw(this.mCamera);
    //this.mScoreBoard.draw();
};

NightPlayer.prototype.getCameraBBox = function(){
    return this.mCameraBBox;
};

NightPlayer.prototype.LevelUp = function(){
    return this.numLevelUp;
};

NightPlayer.prototype.GameOver = function(){
    return this.isGameOver;
};

NightPlayer.prototype.getCurrentScore = function(){
    return this.mInitScore;
};

NightPlayer.prototype.getLight = function() {
    return this.mLight;
};
