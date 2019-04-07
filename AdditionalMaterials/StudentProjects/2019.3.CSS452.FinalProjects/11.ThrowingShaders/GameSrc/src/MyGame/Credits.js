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

function Credits() {
    this.kUIButton = "assets/UI/button.png";
    this.Credits = null;
    this.Credits2 = null;
    this.Credits3 = null;
    this.Credits4 = null;
    this.Credits5 = null;
    // The camera to view the scene
    //this.puzzleBgColor = null;
    this.mCamera = null;
    this.ReturnButton = null;
    this.PhysicsButton = null;
    this.UIButton = null;
    this.UIText = null;

}
gEngine.Core.inheritPrototype(Credits, Scene);

Credits.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};

Credits.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);

    gEngine.Core.startScene(new MyGame);

};

Credits.prototype.initialize = function () {
    this.Credits = new UIText("Credits", [600, 900], 4, 0, 0, [0.3, 0.3, 0.6, 1]);
    this.Credits2 = new UIText("Throwing Shaders", [580, 750], 2, 0, 0, [1, 0, 0, 1]);
    this.Credits3 = new UIText("Dual Blockage", [610, 700], 2, 0, 0, [1, 0, 0, 1]);
    this.Credits4 = new UIText("John Ghattas, Hossam Basiony, Luke Smiley", [350, 650], 2, 0, 0, [1, 0, 0, 1]);
    this.Credits5 = new UIText("Music from Jukedeck - create your own at http://jukedeck.com/", [200, 600], 2, 0, 0, [1, 0, 0, 1]);
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(50, 40), // position of the camera
            100, // width of camera
            [0, 0, 1500, 900]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    //function UIButton(buttonSprite, callback, context, position, size, text, textSize, textColor, clickTextColor) {
    this.ReturnButton = new UIButton(this.kUIButton, this.ReturnSelect, this, [750, 200], [600, 100], "Main Menu", 4, [1, 1, 1, 1], [0, 0, 0, 1]);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Credits.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.Credits.draw(this.mCamera);
    this.Credits2.draw(this.mCamera);
    this.Credits3.draw(this.mCamera);
    this.Credits4.draw(this.mCamera);
    this.Credits5.draw(this.mCamera);

    this.ReturnButton.draw(this.mCamera);

};



Credits.prototype.update = function () {
    this.ReturnButton.update();


};




Credits.prototype.ReturnSelect = function () {

    this.LevelSelect = "Credits";
    gEngine.GameLoop.stop();

};

