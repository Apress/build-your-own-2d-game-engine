/*
 * File: MyGame.js 
 * Super Meiro Maze  By Jacob Lefeat & Andrei Morokov
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var mGlobalSpeed = 1;
var mScreenX = 1300;
var mScreenY = 700;
function MyGame() {
    this.kUIButton = "assets/UI/button.png";
    this.kPointer = "assets/OpenSource/pointer.bmp";
    this.kBG = "assets/DyeAssets/bg.png";
    this.kFontImage = "assets/fonts/system-default-font.png";
    this.kFont = "assets/fonts/system-default-font";
    
    // The camera to view the scene
    this.mCamera = null;
    this.StartGameButton = null;
    this.LevelSelectButton = null;
    this.HighScoresButton = null;
    this.LevelSelect = null;
    //this.mCursor = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Fonts.loadFont(this.kFont);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    
    if(this.LevelSelect==="Level1"){
        gEngine.Core.startScene(new Level1());
    }
    else if(this.LevelSelect==="LevelSelect"){
        gEngine.Core.startScene(new LevelSelect());
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        200,                     // width of camera
        [0, 0, mScreenX, mScreenY]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.StartGameButton = new UIButton(this.kUIButton,this.StartGameSelect,this,[650,350],[600,100],"Start Game",8,[1,1,1,1],[0,0,0,1]);
    this.LevelSelectButton = new UIButton(this.kUIButton,this.SelectLevel,this,[650,250],[600,100],"Level Select",8,[1,1,1,1],[0,0,0,1]);
    
    this.mGameText = new FontRenderable("Super Meiro Maze");
    this.mGameText.setFont(this.kFont);
    this._initText(this.mGameText, -20, 70, [1, 1, 1 ,1], 16);
    
    this.mBg = new TextureRenderable(this.kBG);
    this.mBg.getXform().setSize(200,180);
    this.mBg.getXform().setPosition(50,20);
};

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.StartGameButton.draw(this.mCamera);
    this.LevelSelectButton.draw(this.mCamera);   
    this.mBg.draw(this.mCamera);
    this.mGameText.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.StartGameButton.update();
    this.LevelSelectButton.update();
};

MyGame.prototype.StartGameSelect = function(){
    this.LevelSelect="Level1";
    gEngine.GameLoop.stop();
};

MyGame.prototype.SelectLevel = function(){
    this.LevelSelect="LevelSelect";
    gEngine.GameLoop.stop();
};

MyGame.prototype.HighScoresSelect= function(){
   // this.LevelSelect="HighScores";
   // gEngine.GameLoop.stop();
};

MyGame.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};