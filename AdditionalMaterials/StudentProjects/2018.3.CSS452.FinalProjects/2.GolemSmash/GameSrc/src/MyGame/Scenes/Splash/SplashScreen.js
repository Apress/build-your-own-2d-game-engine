/*
 * File: SplashScreen.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, BossBattle
  GameObject, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SplashScreen() {
    //background
    this.mFarBG = null;
    this.mMidBG = null;
    
    //arrow stuff
    this.mArrowTimer = 0;
    
    //UI stuff
    this.mTitle = null;
    this.mPlayButton = null;
    this.mHardModeButon = null;
    this.mCreditsButton = null;
    this.mControlsButton = null;
    
    // The camera to view the scene
    this.mMainCamera = null;
    this.kNextSceneName = "BossBattle";
    
    this.mHardMode = false;
}
gEngine.Core.inheritPrototype(SplashScreen, Scene);

SplashScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.SplashScreen.Textures) {
        gEngine.Textures.loadTexture(Config.SplashScreen.Textures[texture]);
    }

};

SplashScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    /*   for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.SplashScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.SplashScreen.Textures[texture]);
    }
   */
    if(this.kNextSceneName === "CreditsScreen") {
      gEngine.Core.startScene(new CreditsScreen());
    }
    else if(this.kNextSceneName === "ControlsScreen") {
        gEngine.Core.startScene(new ControlsScreen());
    }
    else{
        gEngine.Core.startScene(new BossBattle(this.mHardMode));
    }
};

SplashScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.SplashScreen.Camera.StartingPosition,
        Config.SplashScreen.Camera.WorldWidth,  
        Config.SplashScreen.Camera.Viewport         
    );
    this.mMainCamera.setBackgroundColor(Config.SplashScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    

    this.spawnArrow();
    this._initializeBackground();
    this._initializeUI();
};

SplashScreen.prototype._initializeUI = function() {
    var configUI = Config.SplashScreen.UI;
    this.mTitle = new UIText(configUI.Title.Text,
                             configUI.Title.Position,
                             configUI.Title.TextHeight,
                             UIText.eHAlignment.eCenter, 
                             UIText.eVAlignment.eBottom);
    this.mTitle.setColor(configUI.Title.Color);
    
    this.mPlayButton = new UIButton(Config.UI.Textures.UIButton, 
                                    this._playButtonCallback,
                                    this,
                                    configUI.PlayButton.Position,
                                    configUI.PlayButton.Size,
                                    configUI.PlayButton.Text,
                                    configUI.PlayButton.TextHeight,
                                    configUI.PlayButton.TextColor);
    
    this.mHardModeButton = new UIButton(Config.UI.Textures.UIButton, 
                                    this._hardModeButtonCallback,
                                    this,
                                    configUI.HardModeButton.Position,
                                    configUI.HardModeButton.Size,
                                    configUI.HardModeButton.Text,
                                    configUI.HardModeButton.TextHeight,
                                    configUI.HardModeButton.TextColor);
    
    this.mCreditsButton = new UIButton(Config.UI.Textures.UIButton, 
                                this._creditsButtonCallback,
                                this,
                                configUI.CreditsButton.Position,
                                configUI.CreditsButton.Size,
                                configUI.CreditsButton.Text,
                                configUI.CreditsButton.TextHeight,
                                configUI.CreditsButton.TextColor);
    
    this.mControlsButton = new UIButton(Config.UI.Textures.UIButton, 
                            this._controlsButtonCallback,
                            this,
                            configUI.ControlsButton.Position,
                            configUI.ControlsButton.Size,
                            configUI.ControlsButton.Text,
                            configUI.ControlsButton.TextHeight,
                            configUI.ControlsButton.TextColor);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mPlayButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHardModeButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mCreditsButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mControlsButton);
};

SplashScreen.prototype._playButtonCallback = function() {
    this.kNextSceneName = "BossBattle";
    gEngine.GameLoop.stop();
};

SplashScreen.prototype._hardModeButtonCallback = function () {
    this.kNextSceneName = "BossBattle";
    this.mHardMode = true;
    gEngine.GameLoop.stop();
};

SplashScreen.prototype._creditsButtonCallback = function() {
    this.kNextSceneName = "CreditsScreen";
    gEngine.GameLoop.stop();
};

SplashScreen.prototype._controlsButtonCallback = function() {
    this.kNextSceneName = "ControlsScreen";
    gEngine.GameLoop.stop();
};

SplashScreen.prototype._initializeBackground = function() {
    var farBG = new LightRenderable(Config.SplashScreen.Textures.FarBackgroundTexture);
    farBG.setElementPixelPositions(0, 1024, 0, 512);
    farBG.getXform().setSize(400, 200);
    farBG.getXform().setPosition(0, 0);
    farBG.getXform().setZPos(-10);
    this.mFarBG = new ParallaxGameObject(farBG, 5, this.mMainCamera);
    this.mFarBG.setCurrentFrontDir([-1, 0, 0]);
    this.mFarBG.setSpeed(.2);
    this.mFarBG.setIsTiled(true);
    
    var midBG = new LightRenderable(Config.SplashScreen.Textures.MidBackgroundTexture);
    midBG.setElementPixelPositions(0, 1024, 0, 512);
    midBG.getXform().setSize(352, 176);
    midBG.getXform().setPosition(0, 0);
    midBG.getXform().setZPos(-10); 
  
    this.mMidBG = new ParallaxGameObject(midBG , 1, this.mMainCamera);
    this.mMidBG.setCurrentFrontDir([0, -1, 0]);
    this.mMidBG.setIsTiled(false);
    

    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mMidBG);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mFarBG);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SplashScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SplashScreen.prototype.update = function () {
    gEngine.LayerManager.updateAllLayers();
    
    this.mArrowTimer++;
    if(this.mArrowTimer >= Config.SplashScreen.ArrowTimerLength) {
        this.spawnArrow();
        this.mArrowTimer = 0;
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        gEngine.GameLoop.stop();
    }
};

SplashScreen.prototype.spawnArrow = function() {
    var pos = [0,0];
    pos[0] = pos[0] - 80;
    pos[1] = pos[1] - 10;
    var raffle = Math.random()*3;
    var newArrow=null;
    if(raffle<1){newArrow = new Arrow(pos,1.1,50);}
    else if(raffle<2){newArrow = new FireArrow(pos,1.1,50);}
    else{newArrow = new IceArrow(pos,1.1,50);}
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, newArrow);
};
