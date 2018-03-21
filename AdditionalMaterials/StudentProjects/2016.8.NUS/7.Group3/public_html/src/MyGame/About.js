/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function About() {
    this.kBg = "assets/start.jpg";
   
    //this.kStartButton="assets/button/Start.png";
    //this.kAboutButton="assets/button/Aboutus.png";
    this.kMenuButton="assets/button/Menu.png";
    this.kStartBalloon="assets/startballoon.png";
    this.kTitle="assets/AboutTitle.png";
    this.kHint="assets/Aboutus.png";
    this.kBgClip = "assets/bgm.mp3";
    this.mCamera = null;

    
    this.mBg = null;
    this.mLight = null;
    this.mStartButton = null;
    this.mMenuButton = null;
    this.mAboutButton = null;
    this.mHint=null;
    this.mBalloon=null;
    this.aRotateAngle = 10;
  
    this.aDeltaAngle = 0.5;
   
    this.mRotateDir = true;
    
    
}
gEngine.Core.inheritPrototype(About, Scene);

About.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    //gEngine.Textures.loadTexture(this.kStartButton);
    //gEngine.Textures.loadTexture(this.kAboutButton);
    gEngine.Textures.loadTexture(this.kMenuButton);
    gEngine.Textures.loadTexture(this.kStartBalloon);
    gEngine.Textures.loadTexture(this.kTitle);
    gEngine.Textures.loadTexture(this.kHint);
    gEngine.AudioClips.loadAudio(this.kBgClip);
};

About.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
   
    //gEngine.Textures.unloadTexture(this.kStartButton);
    //gEngine.Textures.unloadTexture(this.kAboutButton);
    gEngine.Textures.unloadTexture(this.kMenuButton);
    gEngine.Textures.unloadTexture(this.kStartBalloon);
    gEngine.Textures.unloadTexture(this.kTitle);
    gEngine.Textures.unloadTexture(this.kHint);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
  
    gEngine.Core.startScene(this.nextLevel);
};

About.prototype.initialize = function () {
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
    //this.mStartButton = new Button(this.kStartButton, null, [40, 26], [14, 5], this.mLight);
    //this.mAboutButton = new Button(this.kAboutButton, null, [40, 18], [14, 5], this.mLight);
    this.mMenuButton = new Button(this.kMenuButton, null, [72, 5], [14, 5], this.mLight);
    this.mBalloon = new LightRenderable(this.kStartBalloon);
    this.mBalloon.getXform().setPosition(8, 52);
    this.mBalloon.getXform().setSize(10, 10);
    this.mBalloon.addLight(this.mLight);
    this.mTitle = new LightRenderable(this.kTitle);
    this.mTitle.getXform().setPosition(30, 52);
    this.mTitle.getXform().setSize(40, 8);
    this.mTitle.addLight(this.mLight);
    this.mHint = new LightRenderable(this.kHint);
    this.mHint.getXform().setPosition(30, 25);
    this.mHint.getXform().setSize(45, 45);
    this.mHint.addLight(this.mLight);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
About.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mBalloon.draw(this.mCamera);
    this.mTitle.draw(this.mCamera);
    this.mHint.draw(this.mCamera);
   // this.mStartButton.draw(this.mCamera);
   // this.mAboutButton.draw(this.mCamera);
    this.mMenuButton.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
About.prototype.update = function () {

    var mx = this.mCamera.mouseWCX();
    var my = this.mCamera.mouseWCY();
    //this.mStartButton.update(mx, my);
    //this.mAboutButton.update(mx, my);
    this.mMenuButton.update(mx, my);
    // if(this.mStartButton.getStatus() === Button.eButtonStatus.eClicked){
    //     this.nextLevel = new LevelOne();
    //     gEngine.GameLoop.stop();
    // }
    // if(this.mAboutButton.getStatus() === Button.eButtonStatus.eClicked){
    //      this.nextLevel = new About();
    //     gEngine.GameLoop.stop();
    // }
    if(this.mMenuButton.getStatus() === Button.eButtonStatus.eClicked){
         this.nextLevel = new GameStart();
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
About.prototype.testScene = function(){
    
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
        this.nextLevel = new GameOver();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)){
        this.nextLevel = new GameWin();
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Six)){
        this.nextLevel = new About();
        gEngine.GameLoop.stop();
    }
};

About.prototype._initializeLights = function(){
    this.mLight = new Light();
    this.mLight.setLightType(Light.eLightType.eDirectionalLight);
    this.mLight.setColor([0.8, 0.8, 0.8, 1]);
    this.mLight.setDirection([0, 0, -1]);
    this.mLight.setIntensity(1);
};