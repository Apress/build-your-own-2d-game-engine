/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";
/*
var WIN_SCENE = 0;
var LOSE_SCENE = 1;
var START_SCENE = 2;
var GAME_SCENE = 3;
*/
function StartScene() {
    var canvas = document.getElementById('GLCanvas');
    this.kCanvasWidth = canvas.width;
    this.kCanvasHeight = canvas.height;


    this.kStarsBG = "assets/bg_blend.jpg";
    this.kStatus = "Status: ";
    this.kSpaceShooter2015Logo = "assets/SpaceShooter2015Logo.png";
    this.kPressSpaceToBeginLogo= "assets/PressSpaceToBegin.png";


    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;

    // Alternating background images in a set
    this.mBackground = null;

    // Projectile.js has already been read in ...
    Projectile.kTexture = this.kProjectileTexture;
}
gEngine.Core.inheritPrototype(StartScene, Scene);

StartScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kStarsBG);
    gEngine.Textures.loadTexture(this.kSpaceShooter2015Logo);
    gEngine.Textures.loadTexture(this.kPressSpaceToBeginLogo);

};

StartScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kStarsBG);
    gEngine.Textures.unloadTexture(this.kSpaceShooter2015Logo);
    gEngine.Textures.unloadTexture(this.kPressSpaceToBeginLogo);

    switch (this.mNextScene) {
        case GAME_SCENE:
            var nextLevel = new MyGame();
            break;
        case LOSE_SCENE:
            var nextLevel = new LoseScene();
            break;
        case WIN_SCENE:
            var nextLevel = new WinScene();
            break;
        case START_SCENE:
            var nextLevel = new StartScene();
            break;
        case GAMEOVER_SCENE:
            var nextLevel = new GameOverScene();
            break;
    }
    gEngine.Core.startScene(nextLevel);
};


StartScene.prototype.initialize = function () {
    // Initialize the cameras.
    this.mCamera = new Camera(
        vec2.fromValues(50, 35),  // position of the camera
        100,                      // width of camera
        [0, 0, this.kCanvasWidth, this.kCanvasHeight]        // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mCamera.setSpeed(0.1);

    gEngine.DefaultResources.setGlobalAmbientIntensity(3.6);


    // Initialize the background.
    this.mBackground = new Background(this.kStarsBG, this.mCamera);

    this.mSpaceShooter2015LogoRend = new TextureRenderable(this.kSpaceShooter2015Logo);
    this.mSpaceShooter2015Logo = new GameObject(this.mSpaceShooter2015LogoRend);
    this.mSpaceShooter2015Logo.getXform().setSize(45,45);


    this.mPressSpaceToBeginLogoRend = new TextureRenderable(this.kPressSpaceToBeginLogo);
    this.mPressSpaceToBeginLogo = new GameObject(this.mPressSpaceToBeginLogoRend);
    this.mPressSpaceToBeginLogo.getXform().setSize(80,20);
    this.mPressSpaceToBeginLogo.visibilityCount = 0;

};


StartScene.prototype.update = function () {

    // Updates background.
    this.mBackground.update(this.mCamera);
    this.mSpaceShooter2015Logo.update(this.mCamera);
    this.mSpaceShooter2015Logo.getXform().setPosition(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]+5);

    this.mPressSpaceToBeginLogo.getXform().setPosition(this.mCamera.getWCCenter()[0],this.mCamera.getWCCenter()[1]-22);
    this.mPressSpaceToBeginLogo.visibilityCount = (this.mPressSpaceToBeginLogo.visibilityCount + 1)%100;

    if(this.mPressSpaceToBeginLogo.visibilityCount < 80)
    {
        this.mPressSpaceToBeginLogo.setVisibility(true);
    }
    else
    {
        this.mPressSpaceToBeginLogo.setVisibility(false);
    }

    // Updates cameras.
    this.mCamera.update();  // to ensure proper interpolated movement effects

    // User press spacebar to start the game.
    //TODO: change
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.mNextScene = GAME_SCENE;
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mNextScene = WIN_SCENE;
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        this.mNextScene = LOSE_SCENE;
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.O)) {
        this.mNextScene = GAMEOVER_SCENE;
        gEngine.GameLoop.stop();
    }

};



StartScene.prototype.draw = function () {
    // Clear the entire canvas to light gray.
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    // Draw on all camera.
    this.drawCamera(this.mCamera);

};

// draw delegates the drawing on each camera to this function.
StartScene.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();

    this.mBackground.draw(camera);
    this.mSpaceShooter2015Logo.draw(camera);
    this.mPressSpaceToBeginLogo.draw(camera);
};