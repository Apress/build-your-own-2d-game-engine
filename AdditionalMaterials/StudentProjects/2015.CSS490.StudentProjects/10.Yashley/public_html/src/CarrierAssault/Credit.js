
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame:false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Credit() {

    this.kBg = "assets/credit.png"; 
    this.kCursor = "assets/cursor.png"; 
    this.mMsg = null; 
    // The camera to view the scene
    this.mCamera = null;
    this.mNextLevel = null; 
    this.mCursor = null; 
    this.kDelta = 0.015;
    this.mOriginalXPos = null; 
}
gEngine.Core.inheritPrototype(Credit, Scene);

Credit.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kCursor);

};

Credit.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kCursor);
    var nextLevel = new Start();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

Credit.prototype.initialize = function () {
   //var parser =  parser.parseNextLevel(); 
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    this.mCamera = new Camera(
        vec2.fromValues(8, 14),   // position of the camera
        50,                        // width of camera
        [0, 0, 1280, 720]         // viewport (orgX, orgY, width, height)
        );
    
     this.mCamera.setBackgroundColor([1, 1, 1, 0]);
    var bgR = new SpriteRenderable(this.kBg);
   // bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(26, 20);
    bgR.getXform().setPosition(-4, 10);
    this.mBg = new GameObject(bgR);

    this.mMsg = new FontRenderable(""); 
    this.mMsg.setColor([1, 1, 1, 1]);
    
    this.mCursor = new SpriteRenderable(this.kCursor);
    this.mCursor.getXform().setPosition(1.7, 1.6);
    this.mOriginalXPos = this.mCursor.getXform().getXPos(); 
    this.mCursor.getXform().setSize(4.5,1.5); 
  
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Credit.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 0.0]); // clear to light gray
   // this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);

    var msg = "position" + this.mCursor.getXform().getXPos(); 
    this.mMsg.setText(msg); 
    this.mMsg.getXform().setPosition(-15, 3); 
    this.mMsg.getXform().setSize(10,2); 
    //this.mMsg.draw(this.mCamera); 
    this.mCursor.draw(this.mCamera); 
    
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Credit.prototype.update = function () {
    // For this very simple game, let's move the first square
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
       gEngine.GameLoop.stop();
    }
    
   var pos = this.mCursor.getXform();
   
   pos.incXPosBy(this.kDelta);
   if (pos.getXPos() >= this.mOriginalXPos+0.5 || pos.getXPos() <= this.mOriginalXPos-0.1) {
         this.kDelta *= -1;
   }
};