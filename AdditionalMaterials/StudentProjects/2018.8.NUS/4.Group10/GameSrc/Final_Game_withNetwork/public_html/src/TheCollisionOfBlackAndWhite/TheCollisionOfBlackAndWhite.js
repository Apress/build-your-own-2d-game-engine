/*
 * File: TheCollisionOfBlackAndWhite.jskAndWhite.js
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TheCollisionOfBlackAndWhite() {
    var judgement = 0;
    
    this.kBg="assets/Mbg.png";
    this.kArrow="assets/Arrow.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBg = null;
    
    this.mArrow = null;

}
gEngine.Core.inheritPrototype(TheCollisionOfBlackAndWhite, Scene);

TheCollisionOfBlackAndWhite.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kArrow);
};

TheCollisionOfBlackAndWhite.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(512, 256), // position of the camera
        1024,                        // width of camera
        [0, 0, 1024, 512]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mArrow = new TextureRenderable(this.kArrow);
    this.mArrow.setColor([0, 0, 0, 1]);
    this.mArrow.getXform().setPosition(382, 146);
    this.mArrow.getXform().setSize(64, 32);
    
    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(30);
    
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(1024, 512);
    bgR.getXform().setPosition(512, 256);
    this.mBg = new GameObject(bgR);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
TheCollisionOfBlackAndWhite.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mArrow.draw(this.mCamera);
    
    this.mMsg.setText("The Collision of Black and White");
    this.mMsg.getXform().setPosition(125, 350);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Select scenes");
    this.mMsg.getXform().setPosition(450, 150);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Operating Instruction");
    this.mMsg.getXform().setPosition(450, 105);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("WASD:controll arrow  Enter:confirm");
    this.mMsg.getXform().setPosition(250, 55);
    this.mMsg.draw(this.mCamera);
    };

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
TheCollisionOfBlackAndWhite.prototype.update = function () {



    // select which character to work with
    if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.W)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) && this.mArrow.getXform().getYPos()===100){
        this.mArrow.getXform().setYPos(146);
    }
    if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.S)||gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) && this.mArrow.getXform().getYPos()===146){
        this.mArrow.getXform().setYPos(100);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Return)){
        if(this.mArrow.getXform().getYPos()===100){
            this.judgement=-1;
            gEngine.GameLoop.stop();
        }
        if(this.mArrow.getXform().getYPos()===146){
            this.judgement=1;
            gEngine.GameLoop.stop();
        }
    }

};

TheCollisionOfBlackAndWhite.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kArrow);
    // Step B: starts the next level
    // starts the next level
    if(this.judgement===1){
        var nextLevel = new Select();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.judgement===-1){
        var nextLevel = new Intro();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};