/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver(currentLevel, mNextLoad, prevLevel, time, lightType, gameType) {
    
    this.kUIButton = "assets/button.png";
    this.kMazeImage= "assets/maze_image.png";
    this.mCamera = null;
    this.mMsg = null;
    
    this.mNextLoad = mNextLoad;
    this.mPrev = prevLevel;
    this.time = time;
    this.mLightType = lightType;
    this.mGameType = gameType;
    this.mCurrentLevel = currentLevel;
    this.mNextLevel = false;
    this.mRetry = false;
    this.mMain = false;
    //levels
    this.mLevel2 = "playtest_00";
    this.mLevel3 = "release_00";
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kMazeImage);
    
};
GameOver.prototype.unloadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kMazeImage);
    var nextlevel = null;
    if (this.mRetry)
    {
        nextlevel = new Level(this.mPrev, this.mLightType, this.mGameType);
    }
    else if (this.mMain)
    {
        nextlevel = new Main();
    }
    else if (this.mNextLevel)
    {
        if (this.mCurrentLevel === 1)
            nextlevel = new Level(2, this.mLevel2, this.mLightType, this.mGameType);
        else if (this.mCurrentLevel === 2)
            nextlevel = new Level(3, this.mLevel3, this.mLightType, this.mGameType);
    }
    gEngine.Core.startScene(nextlevel); 
  //  gEngine.Core.cleanUp(); // release gl resources
};

GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.61, 0.35, 0.13, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //background
    this.bg = new TextureRenderable(this.kMazeImage);
    this.bg.getXform().setSize(200,160);
    this.bg.getXform().setPosition(50,40);
    
    var sec = Math.floor(this.time/1000-Math.floor(this.time/60000)*60);
    var min = Math.floor(this.time/60000);
    if(sec > 9) {
        var text = "Finished in: " + min + ":" + sec;
    } else {
        var text = "Finished in: " + min + ":0" + sec;
    }
    console.log(text);
    var gameOver = null;
    if (this.mNextLoad === "lose")
        gameOver = "GAME OVER. TRY AGAIN.";
    else
        gameOver = "CONGRATULATIONS. YOU WON.";
    this.mWon = new FontRenderable(gameOver);
    this.mWon.setColor([1, 1, 1, 1]);
    this.mWon.getXform().setPosition(25, 50);
    this.mWon.setTextHeight(4.5);
    
    this.mMsg = new FontRenderable(text);
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(30, 40);
    this.mMsg.setTextHeight(4);
    
    this.UIButton1 = new UIButton(this.kUIButton,this.retry,this,[250,200],[180,60],"RETRY",3,[1,1,1,1],[0,0,0,1]);
    this.UIButton2 = new UIButton(this.kUIButton,this.main,this,[550,200],[180,60],"Main Menu",3,[1,1,1,1],[0,0,0,1]);
    this.UIButton3 = new UIButton(this.kUIButton,this.nextLevel,this,[700,80],[180,60],"Next Level",3,[1,1,1,1],[0,0,0,1]);
    
};

GameOver.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.bg.draw(this.mCamera);
    this.mWon.draw(this.mCamera);
    if (this.mGameType === "time" && this.mNextLoad === "won")
        this.mMsg.draw(this.mCamera);
    this.UIButton1.draw(this.mCamera);
    this.UIButton2.draw(this.mCamera);
    if (this.mNextLoad === "won" && this.mCurrentLevel !== 3)   //no next level for level 3
        this.UIButton3.draw(this.mCamera);
    
};

GameOver.prototype.update = function () {
    this.UIButton1.update();
    this.UIButton2.update();
    this.UIButton3.update();
    if (this.mRetry || this.mMain || this.mNextLevel)
        gEngine.GameLoop.stop();
};

GameOver.prototype.retry = function () {
    this.mRetry = true; 
};
GameOver.prototype.nextLevel = function () {
    this.mNextLevel = true; 
};
