/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, Button */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameStart() {
    this.kBg = "assets/start.jpg";
   
    this.kStartButton="assets/button/Start.png";
    this.kAboutButton="assets/button/About.png";
    this.kHelpButton="assets/button/Help.png";
    this.kStartBalloon="assets/startballoon.png";
    this.kTitle="assets/title.png";
    //this.kHint="assets/Hint.png";
    this.kBgClip = "assets/bgm.mp3";
   
    this.mCamera = null;

    
    this.mBg = null;
    this.mLight = null;
    this.mStartButton = null;
    this.mHelpButtonn = null;
    this.mAboutButton = null;
    this.mHint=null;
    this.mBalloon=null;
    this.aRotateAngle = 10;
  
    this.aDeltaAngle = 0.5;
   
    this.mRotateDir = true;
    
    
}
gEngine.Core.inheritPrototype(GameStart, Scene);

GameStart.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kStartButton);
    gEngine.Textures.loadTexture(this.kAboutButton);
    gEngine.Textures.loadTexture(this.kHelpButton);
    gEngine.Textures.loadTexture(this.kStartBalloon);
    gEngine.Textures.loadTexture(this.kTitle);
    //gEngine.Textures.loadTexture(this.kHint);
    gEngine.AudioClips.loadAudio(this.kBgClip);
};

GameStart.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kStartButton);
    gEngine.Textures.unloadTexture(this.kAboutButton);
    gEngine.Textures.unloadTexture(this.kHelpButton);
    gEngine.Textures.unloadTexture(this.kStartBalloon);
    gEngine.Textures.unloadTexture(this.kTitle);
    //gEngine.Textures.unloadTexture(this.kHint);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.Core.startScene(this.nextLevel);
};

GameStart.prototype.initialize = function () {
    if(!gEngine.AudioClips.isBackgroundAudioPlaying())
        gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    // Initialize Lights
    this._initializeLights();
    //Main Camera
    this.mCamera = new Camera(
            vec2.fromValues(40, 30),
            80,
            [0, 0, 800, 600]
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    this.mBg = new LightRenderable(this.kBg);
    this.mBg.setColor([0, 0, 0, 0]);
    this.mBg.getXform().setPosition(40, 30);
    this.mBg.getXform().setSize(80, 60);
    this.mBg.addLight(this.mLight);
  
    //button
    this.mStartButton = new Button(this.kStartButton, null, [40, 26], [14, 5], this.mLight);
    this.mAboutButton = new Button(this.kAboutButton, null, [40, 18], [14, 5], this.mLight);
    this.mHelpButton = new Button(this.kHelpButton, null, [40, 10], [14, 5], this.mLight);
    this.mBalloon = new LightRenderable(this.kStartBalloon);
    this.mBalloon.getXform().setPosition(14, 40);
    this.mBalloon.getXform().setSize(20, 20);
    this.mBalloon.addLight(this.mLight);
    this.mTitle = new LightRenderable(this.kTitle);
    this.mTitle.getXform().setPosition(40, 40);
    this.mTitle.getXform().setSize(60, 10);
    this.mTitle.addLight(this.mLight);
    // this.mHint = new LightRenderable(this.kHint);
    // this.mHint.getXform().setPosition(15, 15);
    // this.mHint.getXform().setSize(20, 20);
    // this.mHint.addLight(this.mLight);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameStart.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mBalloon.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
  //  this.mHint.draw(this.mCamera);
    this.mStartButton.draw(this.mCamera);
    this.mAboutButton.draw(this.mCamera);
    this.mHelpButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameStart.prototype.update = function () {

    var mx = this.mCamera.mouseWCX();
    var my = this.mCamera.mouseWCY();
    this.mStartButton.update(mx, my);
    this.mAboutButton.update(mx, my);
    this.mHelpButton.update(mx, my);
    if(this.mStartButton.getStatus() === Button.eButtonStatus.eClicked){
        this.nextLevel = new LevelOne();
        gEngine.GameLoop.stop();
    }
    if(this.mAboutButton.getStatus() === Button.eButtonStatus.eClicked){
         this.nextLevel = new About();
        gEngine.GameLoop.stop();
    }
    if(this.mHelpButton.getStatus() === Button.eButtonStatus.eClicked){
          this.nextLevel = new Help();
        gEngine.GameLoop.stop();
    }
    
    
     if(this.mRotateDir){
        this.mBalloon.getXform().incRotationByDegree(this.aDeltaAngle);
        if(this.mBalloon.getXform().getRotationInDegree() > this.aRotateAngle)
            this.mRotateDir = false;
    }
    else {
        this.mBalloon.getXform().incRotationByDegree(-this.aDeltaAngle);
        if(this.mBalloon.getXform().getRotationInDegree() < -this.aRotateAngle)
            this.mRotateDir = true;
    }
  
    this.testScene();
};
GameStart.prototype.testScene = function(){
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.nextLevel = new LevelOne();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.nextLevel = new LevelTwo();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.nextLevel = new LevelThree();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)){
        this.nextLevel = new LevelFour();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)){
        this.nextLevel = new GameWin();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Six)){
        this.nextLevel = new GameStart();
        gEngine.GameLoop.stop();
    }
};

GameStart.prototype._initializeLights = function(){
    this.mLight = new Light();
    this.mLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mLight.setColor([0.8, 0.8, 0.8, 1]);
    this.mLight.setDirection([0, 0, -1]);
    this.mLight.setIntensity(1);
}