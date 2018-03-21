/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Cover() {
    // The camera to view the scene
    this.kCover = "assets/cover.png";
    this.mCover = null;
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(Cover, Scene);

Cover.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kCover);
    //gEngine.Textures.loadTexture(Hero3_animation);
};

Cover.prototype.unloadScene = function() {
    gEngine.Textures.unloadTexture(this.kCover);
    // Step B: starts the next level
    // starts the next level
    var start = new SuperMe();  // next level to be loaded
    gEngine.Core.startScene(start);
};


Cover.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(80, 45), // position of the camera
        160,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.mCover = new TextureRenderable(this.kCover);
    this.mCover.getXform().setPosition(80, 45);
    this.mCover.getXform().setSize(160, 90);
    this.mCover.setColor([1, 1, 1, 0]);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([0, 0, 0, 1]);   
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Cover.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mCover.draw(this.mCamera);
    this.mMsg.setTextHeight(5);
    this.mMsg.setColor([0, 1, 0, 1]);
    this.mMsg.setText("Press C to Start");
    this.mMsg.getXform().setPosition(60, 27);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Press F11 to Full Screen");
    this.mMsg.getXform().setPosition(50, 20);
    this.mMsg.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Cover.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C))
    {
        gEngine.GameLoop.stop();
    }
};


