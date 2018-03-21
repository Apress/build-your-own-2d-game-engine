/*
 * File: AboutUs.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable, yform, texCoord, r, b, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AboutUs() {
    this.kFontCon24 = "assets/fonts/Consolas-24";
    this.kFontCon32 = "assets/fonts/Consolas-32";
    this.kFontImage2 = "assets/AboutUs.png";

    this.mCamera = null;
    this.mMsg = null;
    
    this.mTextCon24 = null;
    this.mTextCon32 = null;
    this.mFontImage2 = null;
    
    this.mNextScene = null;
}
gEngine.Core.inheritPrototype(AboutUs, Scene);
AboutUs.prototype.loadScene = function () { 
    gEngine.Fonts.loadFont(this.kFontCon24);
    gEngine.Fonts.loadFont(this.kFontCon32);
    gEngine.Textures.loadTexture(this.kFontImage2);
};


AboutUs.prototype.unloadScene = function () {
    gEngine.Fonts.unloadFont(this.kFontCon24);
    gEngine.Fonts.unloadFont(this.kFontCon32);
    gEngine.Textures.unloadTexture(this.kFontImage2);
    
    gEngine.Core.startScene(this.mNextScene);
};

AboutUs.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mFontImage2 = new SpriteRenderable(this.kFontImage2);
    this.mFontImage2.setColor([1, 1, 1, 0.2]);
    this.mFontImage2.getXform().setPosition(50, 33);
    this.mFontImage2.getXform().setSize(100, 56.25);

    //<editor-fold desc="Create the fonts!">
    // this.mText = new FontRenderable("This is green text");
    this.mMsg = new FontRenderable("Party Battle Developer:");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 55);
    this.mMsg.setTextHeight(3);
    
    
    this.mTextCon24 = new FontRenderable("The images are from Go ballistic comic");
    this.mTextCon24.setFont(this.kFontCon24);
    this._initText(this.mTextCon24, 1, 7, [0, 0, 1, 1], 2.7);
    
    this.mTextCon32 = new FontRenderable("Press <A> to Return");
    this.mTextCon32.setFont(this.kFontCon32);
    this._initText(this.mTextCon32, 1, 15, [0.5, 0.6, 0.3, 1], 2.5);
};
AboutUs.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
AboutUs.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mFontImage2.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mTextCon24.draw(this.mCamera);
    this.mTextCon32.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
AboutUs.prototype.update = function () {
    var nextLevel = new MainScene();

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) { 
        this.mNextScene = nextLevel;
        gEngine.GameLoop.stop();
    }
};