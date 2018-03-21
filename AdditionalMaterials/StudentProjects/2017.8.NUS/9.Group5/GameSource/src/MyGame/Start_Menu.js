/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global vec2, gEngine, Scene */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StartGame() {
    this.kBg = "assets/start1.png";
    this.kChoose="assets/choose.png";
     this.kBg1 = "assets/how_to_play.png";
     this.kBg2 = "assets/about_us.png";
     this.kBg3 = "assets/bg.png";
     this.kBg4 = "assets/gameover.png";

     this.khero = "assets/hero.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    
    this.mChoose = null;
    this.mFlag = 0;


}
gEngine.Core.inheritPrototype(StartGame, Scene);

StartGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBg1);
    gEngine.Textures.loadTexture(this.kBg2);
      gEngine.Textures.loadTexture(this.kBg3);
      gEngine.Textures.loadTexture(this.kBg4);
  
    gEngine.Textures.loadTexture(this.khero);
    gEngine.Textures.loadTexture(this.kChoose);
};

StartGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBg1);
    gEngine.Textures.unloadTexture(this.kBg2);
      gEngine.Textures.unloadTexture(this.kBg3);
       gEngine.Textures.unloadTexture(this.kBg4);
   
       gEngine.Textures.unloadTexture(this.khero);
    gEngine.Textures.unloadTexture(this.kChoose);
};

StartGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                       // width of camera
        [0, 0, 1024, 512]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(100, 50);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
    
    this.mChoose = new SpriteRenderable(this.kChoose);
    this.mChoose.setElementPixelPositions(0, 512, 0, 512);
    this.mChoose.getXform().setPosition(-17, 0);
    this.mChoose.getXform().setSize(5, 5);


};

StartGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to bright green

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);

    this.mChoose.draw(this.mCamera);
    
};


StartGame.prototype.update = function () {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
        if(this.mFlag > 0){
            this.mChoose.getXform().setPosition(-17, this.mChoose.getXform().getYPos() + 8);
            this.mChoose.draw(this.mCamera);
            this.mFlag -= 1;
        }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
        if(this.mFlag < 2){
           this.mChoose.getXform().setPosition(-17, this.mChoose.getXform().getYPos() - 8);
            this.mChoose.draw(this.mCamera);
            this.mFlag += 1;
        }
    }
    
    var mygame = new MyGame();
    var about_us = new AboutUs();
    var how_to_play = new HowToPlay();
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        switch(this.mFlag){
        case 0: gEngine.Core.startScene(mygame); break;
        case 1: gEngine.Core.startScene(how_to_play);break;
        case 2: gEngine.Core.startScene(about_us);
    }
    }
    
    
};