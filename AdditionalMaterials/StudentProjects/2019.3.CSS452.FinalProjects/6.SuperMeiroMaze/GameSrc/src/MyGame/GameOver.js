/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function GameOver() {
    this.kUIButton = "assets/UI/button.png";
    this.kBG = "assets/DyeAssets/bg.png";
    this.kFontImage = "assets/fonts/system-default-font.png";
    this.kFont = "assets/fonts/system-default-font";
    // The camera to view the scene
    this.mCamera = null;
    this.World1Button = null;
    this.World2Button = null;
    this.GoBackButton = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);


GameOver.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Fonts.loadFont(this.kFont);
};

GameOver.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBG);
    
    if(this.LevelSelect==="GoBack"){
        gEngine.Core.startScene(new MyGame());
    }
};

GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        200,                     // width of camera
        [0, 0, mScreenX, mScreenY]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.GoBackButton = new UIButton(this.kUIButton,this.GoBackSelect,this,[650,250],[750,100],"Go Back",8,[1,1,1,1],[0,0,0,1]);
    
    this.mGameText = new FontRenderable("Game Over");
    this.mGameText.setFont(this.kFont);
    this._initText(this.mGameText, 10, 70, [1, 1, 1 ,1], 16);
    
    this.mBg = new TextureRenderable(this.kBG);
    this.mBg.getXform().setSize(200,180);
    this.mBg.getXform().setPosition(50,20);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.GoBackButton.draw(this.mCamera);
    this.mBg.draw(this.mCamera);
    this.mGameText.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    this.GoBackButton.update();
};

GameOver.prototype.GoBackSelect= function(){
    this.LevelSelect="GoBack";
    gEngine.GameLoop.stop();
};

GameOver.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};