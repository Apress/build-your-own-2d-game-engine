/**
 * Main Menu Scene
 *
 * Shows the splash screen
 * Has buttons for switching to the MyGame scene
 * Has buttons for selecting the difficulty
 */

"use strict";

function MainMenu()
{
    // Assets
    this.kImage = "assets/main_menu.png"
    this.kBGM = "assets/sounds/kelvin_373_title.ogg";
    
    this.mCamera = null;
    this.mRen = null;
};

gEngine.Core.inheritPrototype(MainMenu, Scene);

MainMenu.prototype.initialize = function()
{
    // BGM
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    
    this.mCamera = new Camera(
        vec2.fromValues(500, 350),
        1000,
        [0, 0, 1000, 700],
        0 // new bound value
    );
    
    this.mRen = new TextureRenderable(this.kImage);
    this.mRen.setColor([1, 1, 1, 0]);
    this.mRen.getXform().setPosition(500, 350);
    this.mRen.getXform().setSize(1000, 700);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
};

MainMenu.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kImage);
    gEngine.AudioClips.loadAudio(this.kBGM);
};

MainMenu.prototype.unloadScene = function() {
gEngine.Textures.unloadTexture(this.kImage);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGM);
    var mainGame = new MyGame();
    gEngine.Core.startScene(mainGame);
};


MainMenu.prototype.goToMainGame = function()
{
    var mainGame = new MyGame();
    gEngine.Core.startScene(mainGame);
};

MainMenu.prototype.update = function()
{
    // Check for the Space key to start the game
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        gEngine.GameLoop.stop();
    }
};

MainMenu.prototype.draw = function()
{
  this.mCamera.setupViewProjection();
  this.mRen.draw(this.mCamera);
};
