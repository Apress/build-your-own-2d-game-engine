/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ResultScene() {
    // textures: 
    this.k1p = "assets/1P.png";
    this.k2p = "assets/2P.png";
    this.kCue1 = "assets/audio/winner.mp3";
    this.mCamera = null;

    this.m2p = null;
    this.sPlaytime = 600;
    this.kNextScene = null;
}
gEngine.Core.inheritPrototype(ResultScene, Scene);

ResultScene.prototype.loadScene = function () {
    // Step A: loads the textures    
    //gEngine.Textures.loadTexture(this.kFontImage);
    //gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.k1p);
    gEngine.Textures.loadTexture(this.k2p);
    gEngine.AudioClips.loadAudio(this.kCue1);
    // Step B: loads all the fonts

};

ResultScene.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kFontImage);
   // gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.k1p);
    gEngine.Textures.unloadTexture(this.k2p);

    // unload the fonts


    // Step B: starts the next level
    gEngine.Core.startScene(this.kNextScene);
};

ResultScene.prototype.initialize = function () {
    var result = gEngine.ResourceMap.retrieveAsset("BattleResult");
    
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 15, 1320, 700]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    if (result === 1) {
        this.m2p = new SpriteRenderable(this.k1p);
    }
    else {
        this.m2p = new SpriteRenderable(this.k2p);
    }

    this.m2p.setColor([1, 1, 1, 0]);
    this.m2p.getXform().setPosition(62.5, 47);
    this.m2p.getXform().setSize(125, 80);
    gEngine.AudioClips.playBackgroundAudio(this.kCue1);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ResultScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.m2p.draw(this.mCamera);

};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ResultScene.prototype.update = function () {
    if (this.sPlaytime > 0) this.sPlaytime--;
    if (this.sPlaytime <= 0) gEngine.AudioClips.stopBackgroundAudio(this.kCue1);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        this.kNextScene = new MainScene();
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.kNextScene = new BattleScene();
        gEngine.GameLoop.stop();
    }
};