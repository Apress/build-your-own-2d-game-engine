
/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainLevel(level, iniScore, aChance) {
    this.mCamera = null;
    this.mCamera2 = null;   // Camera for the minimap
    this.mScoreBoard = null;

    this.mCamPos = null;
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.mBgTexture = "assets/day_bg.png";
    this.mFgTexture4 = "assets/FeedMe_bg_bush_down.png";
    this.mFgTexture2 = "assets/FeedMe_bg_up_light.png";
    this.mFgTexture3 = "assets/FeedMe_bg_up_dark.png";
    this.mFishTexture = "assets/Cute_Fish.png";
    this.mFoodTexture = "assets/Food.png";
    this.mShadowFishTexture = "assets/shadowFish.png";

    this.kBgMusic = "assets/backgroundMusic.mp3";
    this.kScore = "assets/score.wav";
    this.kWrong = "assets/wrong.wav";
    this.kEndMusic = "assets/end.mp3";
    this.mLightFishSet = null;
    this.mLightArray = null;
    
    this.mShadowFishSet = null;
    this.mFishSet = null;
    this.mPlayer = null;
    this.mSmallViewPort = null;
    //this.mScoreBoard = null;
    this.mBg = null;
    this.mFg = null;
    this.mFg2 = null;

    this.mChance = aChance;

    this.mLevel = level;
    this.nextLevelNum = 0;

    this.mLevelUp = null;
    this.mGameOver = null;

    this.mNextScore = iniScore;
    
    this.smallViewOn = true; 
    this.scoreBoardOn = true;

}
gEngine.Core.inheritPrototype(MainLevel, Scene);

MainLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.mBgTexture);
    //gEngine.Textures.loadTexture(this.mFgTexture);
    gEngine.Textures.loadTexture(this.mFgTexture2);
    gEngine.Textures.loadTexture(this.mFgTexture3);
    gEngine.Textures.loadTexture(this.mFgTexture4);
    gEngine.Textures.loadTexture(this.mFishTexture);
    gEngine.Textures.loadTexture(this.mFoodTexture);
    gEngine.Textures.loadTexture(this.mShadowFishTexture);
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    gEngine.AudioClips.loadAudio(this.kScore);
    gEngine.AudioClips.loadAudio(this.kWrong);
    gEngine.AudioClips.loadAudio(this.kEndMusic);
};

MainLevel.prototype.unloadScene = function () {
    //gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.mBgTexture);
    //gEngine.Textures.unloadTexture(this.mFgTexture);
    gEngine.Textures.unloadTexture(this.mFgTexture2);
    gEngine.Textures.unloadTexture(this.mFgTexture3);
    gEngine.Textures.unloadTexture(this.mFgTexture4);
    gEngine.Textures.unloadTexture(this.mFishTexture);
    gEngine.Textures.unloadTexture(this.mFoodTexture);
    gEngine.Textures.unloadTexture(this.mShadowFishTexture);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.AudioClips.unloadAudio(this.kBgMusic);
    gEngine.AudioClips.unloadAudio(this.kScore);
    gEngine.AudioClips.unloadAudio(this.kWrong);
    gEngine.AudioClips.loadAudio(this.kEndMusic);

    if(!this.mChance && this.nextLevelNum===0){
        var cScore = this.mPlayer.getCurrentScore();
        if(cScore > gHighScore){
            gHighScore = cScore;
        }
        var nextLevel = new GameOver(cScore);
        gEngine.Core.startScene(nextLevel);
    }

    if(this.mGameOver){
        var cScore = this.mPlayer.getCurrentScore();
        if(cScore > gHighScore){
            gHighScore = cScore;
        }
        var nextLevel = new GameOver(cScore);
        gEngine.Core.startScene(nextLevel);
    }   else {
        this.mNextScore = this.mPlayer.getCurrentScore();
        if(this.nextLevelNum === 0){
            var nextLevel = new MainLevel(this.mLevel+this.nextLevelNum, this.mNextScore, false);
            gEngine.Core.startScene(nextLevel);
        }
        else{
            var nextLevel = new NightLevel(this.mLevel+this.nextLevelNum, this.mNextScore, true);
            gEngine.Core.startScene(nextLevel);
        }
    }

};

MainLevel.prototype._initializeLight = function(){
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
};


MainLevel.prototype._initializeForeground = function(){
    
    // bush below
    this.mFg = [];
    for (var j = 0; j < 8; j++){
        var newFg = new Background(this.mCamera, this.mFgTexture4);
        newFg.initialize([256, 128], [128+j*200, 15+10*Math.pow(-1, j)]);
        for (var i = 0; i < this.mLightArray.length; i++){
            newFg.getRenderable().addLight(this.mLightArray[i]);
        }
        this.mFg.push(newFg);
    }
    //bush above
    for (var j = 0; j < 8; j++){
        var newFg = new Background(this.mCamera, this.mFgTexture4);
        newFg.initialize([256, 128], [128+j*200, 550+20*Math.pow(-1, j)]);
        for (var i = 0; i < this.mLightArray.length; i++){
            newFg.getRenderable().addLight(this.mLightArray[i]);
            newFg.getRenderable().getXform().incRotationByDegree(90);
        }
        this.mFg.push(newFg);
    }
    //bush left
    for (var j = 0; j < 8; j++){
        var newFg = new Background(this.mCamera, this.mFgTexture4);
        newFg.initialize([256, 128], [10+30*Math.pow(-1, j), 100*j]);
        for (var i = 0; i < this.mLightArray.length; i++){
            newFg.getRenderable().addLight(this.mLightArray[i]);
            newFg.getRenderable().getXform().incRotationByDegree(150);
        }
        this.mFg.push(newFg);
    }
    //bush right
    for (var j = 0; j < 8; j++){
        var newFg = new Background(this.mCamera, this.mFgTexture4);
        newFg.initialize([256, 128], [1000+30*Math.pow(-1, j), 100*j]);
        for (var i = 0; i < this.mLightArray.length; i++){
            newFg.getRenderable().addLight(this.mLightArray[i]);
            newFg.getRenderable().getXform().incRotationByDegree(60);
        }
        this.mFg.push(newFg);
    }
    
    // lily pad   
    this.mFg2 = [];
    var newPad = null;
    for (var j = 0; j < 3; j++){
        if (j==0||j==2)
            newPad = new Background(this.mCamera, this.mFgTexture2);
        else
            newPad = new Background(this.mCamera, this.mFgTexture3);
        var xpos = 100 + Math.random()*(gWorldWidth-100);
        var ypos = 100 + Math.random()*(gWorldWidth-100);
        newPad.initialize([128, 128], [xpos, ypos]);
        for (var i = 0; i < this.mLightArray.length; i++){
             newPad.getRenderable().addLight(this.mLightArray[i]);
        }
        this.mFg2.push(newPad);
    }
};

MainLevel.prototype.initialize = function () {
    // initialize cute audio
    if (!gEngine.AudioClips.isBackgroundAudioPlaying())
        gEngine.AudioClips.playBackgroundAudio(this.kBgMusic);

    // initialize light
    this._initializeLight();

    // 
    this.mGameOver = false;
    this.mLevelUp = false;

    // small camera initialize
    this.mCamera2 = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0, 0, 256, 160]
        );
    this.mCamera2.setBackgroundColor([0.2, 0.2, 0.2, 0]);

    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        700,
        [0, 0, gWorldWidth, gWorldHeight]
        );
    this.mCamera.setBackgroundColor([1, 0, 0, 0]);

    this.mLightFishSet = new LightFishSet(this.mCamera, this.mFishTexture);
    this.mLightFishSet.addFishes(2);
    this.mLightArray = this.mLightFishSet.getLightSet();
    
    this.mBg = new Background(this.mCamera, this.mBgTexture);
    this.mBg.initialize([gWorldWidth+400, gWorldHeight+400], [0.5*gWorldWidth, 0.5*gWorldHeight]);
    for (var i = 0; i < this.mLightArray.length; i++){
        this.mBg.getRenderable().addLight(this.mLightArray[i]);
    }
    
    this._initializeForeground();
    
    // initialize the fish set.
    this.mFishSet = new FishSet(this.mCamera, this.mFishTexture, 
                                this.mLightArray, this.kScore, this.kWrong);
    this.mFishSet.addFishes(this.mLevel);
    
    this.mShadowFishSet = new ShadowFishSet(this.mCamera, this.mShadowFishTexture);
    this.mShadowFishSet.addFishes(2);
    
    
    // initialize the player.
    this.mPlayer = new Player(this.mCamera, this.mFoodTexture, 
                            this.mLevel, this.kFontCon72, this.mNextScore, this.mChance);
    this.mPlayer.initialize();

};


MainLevel.prototype._drawForeground = function(myCamera){
    
    for (var i = 0; i < this.mFg.length; i++){
        this.mFg[i].draw(myCamera);
    }
    
    
    for (var i = 0; i < this.mFg2.length; i++){
        this.mFg2[i].draw(myCamera);
    }
};


MainLevel.prototype.draw = function () {

    gEngine.Core.clearCanvas([0, 0, 1, 1]);

    // setup big camera
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mShadowFishSet.draw(this.mCamera);
    this.mFishSet.draw(this.mCamera);
    this._drawForeground(this.mCamera);//draw foreground decoration
    this.mLightFishSet.draw(this.mCamera);
    this.mPlayer.draw();

    // set up the small camera
    if (this.smallViewOn==true){
        this.mCamera2.setupViewProjection();
        var bigCameraBBox = this.mPlayer.getCameraBBox();
        this.mBg.draw(this.mCamera2);
        bigCameraBBox.draw(this.mCamera2);
        this.mFishSet.draw(this.mCamera2); 
        this.mShadowFishSet.draw(this.mCamera);
        this._drawForeground(this.mCamera2)
        this.mLightFishSet.draw(this.mCamera2);
    }
    
    if (this.scoreBoardOn==true){
        this.mPlayer.mScoreBoard.draw();
    }

    //this.mScoreBoard.draw();

};

MainLevel.prototype.update = function () {
    //this.testFish.update();
    this.mFishSet.update();
    this.mPlayer.update();
    this.mLightFishSet.update();
    this.mShadowFishSet.update();
   // this.mScoreBoard.update();

    var num = this.mPlayer.LevelUp();
    if(num >= 0){
        this.nextLevelNum = num;
        gEngine.GameLoop.stop();
        //this.unloadScene();
    }
    
    if(this.mPlayer.GameOver()){
        this.mGameOver = true;
        gEngine.GameLoop.stop();
        //this.unloadScene;
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.F)){
        this.smallViewOn = !this.smallViewOn;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.scoreBoardOn = !this.scoreBoardOn;
    }
};
