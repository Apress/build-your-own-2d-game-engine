/*
 * File: AdventuresOfDye.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function YouWin() {
    // The camera to view the scene
    //this.mCamera = null;
    this.mMsg = null;
    this.mWin = null;
    //this.kBg = "assets/TitleScreenRoughBG.png";
    this.kBg = "assets/SplashScreen/Background.png";
    this.kPlatform = "assets/plat.png";
    this.kPlatformNormal = "assets/plat_normal.png";
    //this.kButton = "assets/DoorFrame_Button_180x100.png";
    this.kButton = "assets/Totem1.png";
    this.kParticle = "assets/particle.png";
    this.kWin = "assets/YouWin.png";
    // specifics for the splash screen
    this.kLevelFile = "assets/SplashScreen/SplashScreen.xml";
    
    // The camera to view the scene
    this.mCamera = null;
    
    // light array and support objects
    this.mGlobalLightSet = null;
    this.mAllPlatforms = new GameObjectSet();
    this.mAllTotems = new GameObjectSet();
    this.mAllLightProjectiles = [];
    
    //sound
    this.kBgMusic = "assets/Sounds/TotemLightIntro.wav";
    this.mBackground = null;
    
    this.mThisLevel = "SplashScreen";
}
gEngine.Core.inheritPrototype(YouWin, Scene);

YouWin.prototype.loadScene = function()
{
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kWin);
    gEngine.Textures.loadTexture("assets/SplashScreen/bg_normal.png");

    gEngine.AudioClips.loadAudio(this.kBgMusic);
};

YouWin.prototype.unloadScene = function()
{   
    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kWin);
    gEngine.Textures.unloadTexture("assets/SplashScreen/bg_normal.png");

    gEngine.AudioClips.unloadAudio(this.kBgMusic);
    
     // Step B: starts the next level
    // starts the next level
    var nextLevel = new TotemLight();  // next level to be loaded
    //var nextLevel = new GameLevel_Boss("Level1");
    gEngine.Core.startScene(nextLevel);
};

YouWin.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    gEngine.AudioClips.playBackgroundAudio(this.kBgMusic);
    
    // Step A: set up the cameras

    // parse the entire splash screen
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();
    
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    for(i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }
    
    var b = parser.parseButtons(this.kButton, this.mGlobalLightSet);
    var i;
    for(i = 0; i < b.length; i++) {
        this.mAllTotems.addToSet(b[i]);
    }
    

    
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

    this.mMsg = new FontRenderable("<Space Bar> to Play Again");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-9, 8);
    this.mMsg.setTextHeight(2);
    
    this.mWin = new LightRenderable(this.kWin);
    var xform = this.mWin.getXform();
    xform.setPosition(6, 14);
    xform.setSize(20, 20);
    //gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mMsg);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
YouWin.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mMsg.draw(this.mCamera);
    this.mWin.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
YouWin.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    gEngine.LayerManager.updateAllLayers();

    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop();
};
