/*
 * File: MainScene.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable, yform, texCoord, r, b, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainScene() {
    this.kFontCon24 = "assets/fonts/Consolas-24";
    this.kFontCon32 = "assets/fonts/Consolas-32";  // this is also the default system font
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontImage = "assets/ArrowB.png";
    this.kFontImage1 = "assets/Rule.png";
    this.kCue = "assets/audio/MainScene.wav";
    this.kCue1 = "assets/audio/enter.mp3";
    this.kBgClip = "assets/audio/MainSceneBG.mp3";

    this.mCamera = null;
    this.mMsg = null;
    
    this.mTextCon24 = null;
    this.mTextCon24A = null;
    this.mTextCon32 = null;
    this.mTextCon72 = null;
    this.mFontImage = null;
    this.mFontImage1 = null;
    this.mNextScene = null;
    
}
gEngine.Core.inheritPrototype(MainScene, Scene);
MainScene.prototype.loadScene = function () { 
    gEngine.Fonts.loadFont(this.kFontCon24);
    gEngine.Fonts.loadFont(this.kFontCon32);
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kFontImage1);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kCue1);
    gEngine.AudioClips.loadAudio(this.kBgClip);
};


MainScene.prototype.unloadScene = function () {
    gEngine.Fonts.unloadFont(this.kFontCon24);
    gEngine.Fonts.unloadFont(this.kFontCon32);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kFontImage1);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kCue1);

    gEngine.Core.startScene(this.mNextScene);
};

MainScene.prototype.initialize = function () {
    //gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    gEngine.DefaultResources.setGlobalAmbientColor([1.0, 1.0, 1.0, 1.0]);
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    this.mFontImage = new SpriteRenderable(this.kFontImage);
    this.mFontImage.setColor([1, 1, 1, 0.2]);
    this.mFontImage.getXform().setPosition(22.5, 39);
    this.mFontImage.getXform().setSize(20, 8);
    
    this.mFontImage1 = new SpriteRenderable(this.kFontImage1);
    this.mFontImage1.setColor([1, 1, 1, 0.65]);
    this.mFontImage1.getXform().setPosition(50, 40);
    this.mFontImage1.getXform().setSize(100, 56.25);

    //<editor-fold desc="Create the fonts!">
    // this.mText = new FontRenderable("This is green text");
    this.mMsg = new FontRenderable("Paaaaarty Battle !");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(22, 60);
    this.mMsg.setTextHeight(6);
    
    
    this.mTextCon24 = new FontRenderable("Play");
    this.mTextCon24.setFont(this.kFontCon24);
    this._initText(this.mTextCon24, 30, 40, [1, 0, 1, 1], 3);

    this.mTextCon32 = new FontRenderable("Rule");
    this.mTextCon32.setFont(this.kFontCon32);
    this._initText(this.mTextCon32, 30, 30, [0.2, 0.3, 0.4, 1], 3);

    this.mTextCon72 = new FontRenderable("About Us");
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, 30, 20, [0, 0, 1, 1], 3);
    
    this.mTextCon24A = new FontRenderable("Press <SPACE> to enter");
    this.mTextCon24A.setFont(this.kFontCon24);
    this._initText(this.mTextCon24A, 10, 10, [0, 0, 1, 1], 3);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    //</editor-fold>
};
MainScene.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainScene.prototype.draw = function () {
    // Step A: clear the canvas
    
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mFontImage1.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mTextCon24.draw(this.mCamera);
    this.mTextCon32.draw(this.mCamera);
    this.mTextCon72.draw(this.mCamera);
    this.mFontImage.draw(this.mCamera);
    this.mTextCon24A.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MainScene.prototype.update = function () {
    var nextLevel1 = new BattleScene();
    var nextLevel2 = new Rule();
    var nextLevel3 = new AboutUs();
    var deltaY = 10;
    var yform = this.mFontImage.getXform();

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        gEngine.AudioClips.playACue(this.kCue);
        yform.incYPosBy(deltaY);
      if (yform.getYPos() > 40) { 
          yform.setPosition(22.5, 19);
      }
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        gEngine.AudioClips.playACue(this.kCue);
        yform.incYPosBy(-deltaY);
       if (yform.getYPos() < 18) { 
           yform.setPosition(22.5, 39);
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.AudioClips.playACue(this.kCue1);
        if (yform.getYPos() === 39) {  
            this.mNextScene = nextLevel1;
            gEngine.GameLoop.stop();
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.AudioClips.playACue(this.kCue1);
        if (yform.getYPos() === 29) {  
            this.mNextScene = nextLevel2;
            gEngine.GameLoop.stop();
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.AudioClips.playACue(this.kCue1);
        if (yform.getYPos() === 19) {  
            this.mNextScene = nextLevel3;
            gEngine.GameLoop.stop();
        }
    }
};