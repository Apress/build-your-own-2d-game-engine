/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, GameObject, Hero, Minion, Dye */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBg = "assets/bg.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mLMinion = null;
    this.mRMinion = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBg);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBg);
};

MyGame.prototype.initialize = function() {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1900, 0, 1000);
    bgR.getXform().setSize(190, 100);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);

    // Step B: Create the hero object with texture from the lower-left corner 
    this.mHero = new Hero(this.kMinionSprite);

    this.mLMinion = new Minion(this.kMinionSprite, 30, 30);
    this.mRMinion = new Minion(this.kMinionSprite, 70, 30);

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);
};


MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    this.mBg.draw(camera);
    this.mHero.draw(camera);
    this.mLMinion.draw(camera);
    this.mRMinion.draw(camera);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Draw with all three cameras
    this.drawCamera(this.mCamera);
    this.mMsg.draw(this.mCamera);   // only draw status in the main camera
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var deltaAmbient = 0.01;
    var msg = "Current Ambient]: ";

    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mLMinion.update(); // ensure sprite animation
    this.mRMinion.update();
    this.mHero.update();  // allow keyboard control to move
    this.mCamera.panWith(this.mHero.getXform(), 0.8);

    var v = gEngine.DefaultResources.getGlobalAmbientColor();
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
        v[0] += deltaAmbient;
    }

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Middle)) {
        v[0] -= deltaAmbient;
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        gEngine.DefaultResources.setGlobalAmbientIntensity(gEngine.DefaultResources.getGlobalAmbientIntensity() - deltaAmbient);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.DefaultResources.setGlobalAmbientIntensity(gEngine.DefaultResources.getGlobalAmbientIntensity() + deltaAmbient);
    }

    msg += " Red=" + v[0].toPrecision(3) + " Intensity=" + gEngine.DefaultResources.getGlobalAmbientIntensity().toPrecision(3);
    this.mMsg.setText(msg);
};