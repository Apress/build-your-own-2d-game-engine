/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver(currentScore) {
    
    this.kFontFile =  "assets/fonts/Consolas-72";
    this.mFontRenderableGameOver = null;
    this.mFontRenderableHighScore = null;
    //this.mFontRenderableLastScore = null;
    this.mCamera = null;
    this.kEndMusic = "assets/end.mp3";

    this.mReturnButton = null;
    this.mReturnButtonWidth = 100;
    this.mReturnButtonHeight = 50;
    this.mReturnButtonPosX = 500;
    this.mReturnButtonPosY = 80;
    this.mReturnTexture = "assets/restart_button.png";
    this.mReturnTextureOver = "assets/restartOver_button.png";

    this.mGameOver = "assets/GameOverMain.png";
    this.mGameOverRenderable = null;
    
    this.mFontRenderableCurrentScore = null;
    this.mCurrentScore = currentScore;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

    
GameOver.prototype.loadScene = function () {
    gEngine.Fonts.loadFont(this.kFontFile);
    gEngine.AudioClips.loadAudio(this.kEndMusic);
    gEngine.Textures.loadTexture(this.mReturnTexture);
    gEngine.Textures.loadTexture(this.mReturnTextureOver);
    gEngine.Textures.loadTexture(this.mGameOver);
};

GameOver.prototype.unloadScene = function () {
    gEngine.AudioClips.unloadAudio(this.kEndMusic);
    gEngine.Fonts.unloadFont(this.kFontFile);
    gEngine.Textures.unloadTexture(this.mReturnTexture);
    gEngine.Textures.unloadTexture(this.mReturnTextureOver);
    gEngine.Textures.unloadTexture(this.mGameOver);


    //var nextLevel = new MainLevel(3, 0, true);
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};

GameOver.prototype.initialize = function () {
    
    gEngine.AudioClips.playBackgroundAudio(this.kEndMusic);
    
    this.mCamera = new Camera(
        vec2.fromValues(0.5*gWorldWidth, 0.5*gWorldHeight),
        gWorldWidth,
        [0, 0, gWorldWidth, gWorldHeight]
        );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    /*
    this.mFontRenderableGameOver = new FontRenderable('Game Over');
    this.mFontRenderableGameOver.setFont(this.kFontFile);
    this.mFontRenderableGameOver.getXform().setPosition(400, 150);
    this.mFontRenderableGameOver.setColor([100, 0, 0, 1]);
    this.mFontRenderableGameOver.setTextHeight(30);
    */

    this.mFontRenderableHighScore = new FontRenderable('The record is '+gHighScore);
    this.mFontRenderableHighScore.setFont(this.kFontFile);
    this.mFontRenderableHighScore.getXform().setPosition(350, 210);
    this.mFontRenderableHighScore.setColor([0, 0, 0, 1]);
    this.mFontRenderableHighScore.setTextHeight(30);

    /*
    this.mFontRenderableLastScore= new FontRenderable('The last score is '+gLastScore);
    this.mFontRenderableLastScore.setFont(this.kFontFile);
    this.mFontRenderableLastScore.getXform().setPosition(400, 110);
    this.mFontRenderableLastScore.setColor([100, 0, 0, 1]);
    this.mFontRenderableLastScore.setTextHeight(30);
    */

    this.mFontRenderableCurrentScore = new FontRenderable('You got '+this.mCurrentScore+' points.');
    this.mFontRenderableCurrentScore.setFont(this.kFontFile);
    this.mFontRenderableCurrentScore.getXform().setPosition(350, 170);
    //this.mFontRenderableCurrentScore.setColor([173/256, 37/256, 116/256, 1]);
    this.mFontRenderableCurrentScore.setColor([0, 0, 0, 1]);
    this.mFontRenderableCurrentScore.setTextHeight(30);

    this.mReturnButton = new Button(this.mReturnTexture, this.mReturnTextureOver);
    this.mReturnButton.initialize(
                                    [this.mReturnButtonPosX, this.mReturnButtonPosY],
                                    this.mReturnButtonWidth, this.mReturnButtonHeight
                                    );

    this.mGameOverRenderable = new Background(this.mCamera, this.mGameOver);
    this.mGameOverRenderable.initialize(
        [512, 256], [0.5*gWorldWidth, 0.5*gWorldHeight+100]
        );
};

GameOver.prototype.draw = function () {
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();
    
    //this.mFontRenderableGameOver.draw(this.mCamera);
    //this.mFontRenderableLastScore.draw(this.mCamera);
    this.mFontRenderableHighScore.draw(this.mCamera);
    this.mFontRenderableCurrentScore.draw(this.mCamera);
    this.mReturnButton.draw(this.mCamera);

    this.mGameOverRenderable.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    this.mReturnButton.update(this.mCamera);

    var xMouse = this.mCamera.mouseWCX();
    var yMouse = this.mCamera.mouseWCY();

    if(
        gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left) &&
        xMouse > (this.mReturnButtonPosX-0.5*this.mReturnButtonWidth) && 
        xMouse < (this.mReturnButtonPosX+0.5*this.mReturnButtonWidth) &&
        yMouse > (this.mReturnButtonPosY-0.5*this.mReturnButtonHeight) && 
        yMouse < (this.mReturnButtonPosY+0.5*this.mReturnButtonHeight))
    {
        gEngine.GameLoop.stop();
    }
};

