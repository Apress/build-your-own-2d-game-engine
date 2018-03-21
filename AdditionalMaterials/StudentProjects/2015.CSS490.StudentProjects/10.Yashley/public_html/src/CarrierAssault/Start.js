
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame:false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Start() {
    this.kBgClip = "assets/sounds/bg.wav";
    this.kBg = "assets/startscreen.png";
    this.kCursor = "assets/cursor.png";
    this.mMsg = null;
    // The camera to view the scene
    this.mCamera = null;
    this.mNextLevel = new LandLevel('LandLevel');
    this.mCursor = null;
    this.kDelta = 0.015;
    this.mOriginalXPos = null;
    this.cursorPos = null;
    this.interpolate = null;
}
gEngine.Core.inheritPrototype(Start, Scene);

Start.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kCursor);

};

Start.prototype.unloadScene = function () {
    //gEngine.AudioClips.stopBackgroundAudio();
    gEngine.Textures.unloadTexture(this.kBgClip);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kCursor);
    // var nextLevel = new LandLevel('LandLevel');  // next level to be loaded
    gEngine.Core.startScene(this.mNextLevel);
};

Start.prototype.initialize = function () {
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

    //var parser =  parser.parseNextLevel(); 
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    this.mCamera = new Camera(
            vec2.fromValues(8, 14), // position of the camera
            50, // width of camera
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
    this.mCursor.getXform().setPosition(-11, 5.5);
    this.mOriginalXPos = this.mCursor.getXform().getXPos();
    this.mCursor.getXform().setSize(4.5, 1.5);
    //this.cursorPos = new InterpolateVec2([-13, 5], 100, .1); 

    this.cursorPos = new InterpolateVec2(this.mCursor.getXform().getPosition(), 100, .1); 
    //this.cursorPos.setFinalValue([-13,5]);

    //this.interpolate = new Interpolate(2, 300, .1);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Start.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 0.0]); // clear to light gray
    // this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);

    var msg = "position" + this.mCursor.getXform().getXPos();
    this.mMsg.setText(msg);
    this.mMsg.getXform().setPosition(-15, 3);
    this.mMsg.getXform().setSize(10, 2);
    //this.mMsg.draw(this.mCamera); 
    this.mCursor.draw(this.mCamera);

};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Start.prototype.update = function () {
    // For this very simple game, let's move the first square
    //this.mCursor.getXform().setPosition(this.cursorPos);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        //var XPos = this.mCursor.getXform().getXPos(); 
        var XPos = this.cursorPos.getFinalValue()[0];

        if (XPos == -11) {
            this.cursorPos.setFinalValue([-8, 3.3]);
            XPos = this.cursorPos.getFinalValue()[0];
            this.mNextLevel = new Help();

        } else if (XPos == -8) {
            this.cursorPos.setFinalValue([-9, 1]);
            XPos = this.cursorPos.getFinalValue()[0];
            this.mNextLevel = new Credit();

        }
    }



    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        var XPos = this.cursorPos.getFinalValue()[0];

        if (XPos == -8) {
            this.cursorPos.setFinalValue([-11, 5.5]);
            XPos = this.cursorPos.getFinalValue()[0];
            this.mNextLevel = new LandLevel('LandLevel');

        } else if (XPos == -9) {
            this.cursorPos.setFinalValue([-8, 3.3]);
            XPos = this.cursorPos.getFinalValue()[0];
            this.mNextLevel = new Help();

        }
        // this.cursorPos.setFinalValue([-11, 5.5]);

    }
    /*
     var pos = this.mCursor.getXform();
     pos.incXPosBy(this.kDelta);
     if (pos.getXPos() >= this.mOriginalXPos + 0.5 || pos.getXPos() <= this.mOriginalXPos - 0.1) {
     this.kDelta *= -1;
     }
     */

//this.cursorPos
    this.cursorPos.updateInterpolation();
//this.interpolate.updateInterpolation();

}
;