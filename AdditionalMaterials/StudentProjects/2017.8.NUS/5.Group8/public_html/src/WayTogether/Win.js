/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Win() {
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontConSys = "assets/fonts/system-default-font";
    this.kBG = "assets/Level1/BlueSky.png";
    
    this.kCue = "assets/sounds/vanish.wav";
    
    this.mCamera = null;
    this.mMsg = null;
    this.mMsg0 = null;
    this.mMsg1 = null;
    //this.mMsg2 = null;
    
    this.flag = 1;
    //this.mState = 0;
}
gEngine.Core.inheritPrototype(Win, Scene);

//GameOver.prototype.unloadScene = function () {
//     var nextLevel = new GameStart();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
//};
Win.prototype.loadScene = function () {
    // Step A: loads the textures    

    // Step B: loads all the fonts
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.Fonts.loadFont(this.kFontConSys);
    gEngine.Textures.loadTexture(this.kBG);
    
    gEngine.AudioClips.loadAudio(this.kCue);
   
};

Win.prototype.unloadScene = function () {

    // unload the fonts
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Fonts.unloadFont(this.kFontConSys);
    gEngine.Textures.unloadTexture(this.kBG);
    
    gEngine.AudioClips.unloadAudio(this.kCue);
    
    
    
        var nextLevel = new GameStart();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    
    // Step B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};
Win.prototype.initialize = function () {
    // Step A: set up the cameras
    
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray
    this.mBG = new BackGround(this.kBG);
    //<editor-fold desc="Create the fonts!">
    // this.mText = new FontRenderable("This is green text");
    this.mMsg = new FontRenderable("CONGRATULATIONS!!!");
    this.mMsg.setFont(this.kFontCon72);
    this.mMsg.setColor([0, 1, 1, 1]);
    this.mMsg.getXform().setPosition(10, 45);
    this.mMsg.setTextHeight(8);
    this.mMsg0 = new FontRenderable("0");
    this.mMsg0.setColor([0.9, 0.9, 0.9, 1]);
    this.mMsg0.getXform().setPosition(50, 32);
    this.mMsg0.setTextHeight(4);
    this.mMsg1 = new FontRenderable("Menu");
    this.mMsg1.setColor([0.9, 0.9, 0.9, 1]);
    this.mMsg1.getXform().setPosition(60, 32);
    this.mMsg1.setTextHeight(4);
//    this.mMsg2 = new FontRenderable("Menu");
//    this.mMsg2.setColor([0.9, 0.9, 0.9, 1]);
//    this.mMsg2.getXform().setPosition(60, 22);
//    this.mMsg2.setTextHeight(4);
    //</editor-fold>
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Win.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mMsg0.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    //this.mMsg2.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Win.prototype.update = function () {
    if(this.flag === 1){
        gEngine.AudioClips.playACue(this.kCue);
        this.flag = 2;
    }
 
        this.mMsg1.setColor([0, 0, 0, 1]);
       
        //start
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            //this.mState = 1;
             gEngine.GameLoop.stop();
        }     
    
};