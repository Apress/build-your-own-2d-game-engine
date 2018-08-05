/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Splash(picName, nextSceneName) {
    this.kSplashBkg = "assets/" + picName + ".png";
    this.mNextSceneName = nextSceneName;
}
gEngine.Core.inheritPrototype(Splash, Scene);


Splash.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSplashBkg);
};

Splash.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSplashBkg);
    if (this.mNextSceneName)
        document.currentScene = getScene(this.mNextSceneName);
    else
        document.currentScene = new Splash("splash", "wanggong");
    gEngine.Core.startScene(document.currentScene);
};

Splash.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mCamera = new Camera(
        vec2.fromValues(485, 300),   // position of the camera
        485,                        // width of camera
        [0, 0, 970, 600]         // viewport (orgX, orgY, width, height)
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mSplashBkg = new SpriteRenderable(this.kSplashBkg);
    this.mSplashBkg.setColor([0, 0, 0, 0]);
    this.mSplashBkg.getXform().setPosition(485, 300);
    this.mSplashBkg.getXform().setSize(485, 300);
    this.mSplashBkg.setElementPixelPositions(27, 997, 212, 812);
};

Splash.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();
    this.mSplashBkg.draw(this.mCamera);
};

Splash.prototype.update = function () {
    if  (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        if (this.mNextSceneName === null) {
            location.reload();
        }
        else
            gEngine.GameLoop.stop();
    }
};
