/*
 * File: ResultsScreen.js 
 * This is the logic for the boss battle results scene.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable, BossBattle, SplashScreen
  GameObject, Config */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function ResultsScreen(result) {
    this.kNextSceneName = "SplashScreen";
    this.mResult = result;
    this.kMusicCue = null;
    
    //Background
    this.mBg = null;
    
    //Boss Death
    this.mGolem = null;
    //Hero Death
    this.mHero = null;
    this.mPlatform = null;
    
    //Arrow
    this.mArrow = null;
    this.mVictoryArrowSpawnPos = vec2.fromValues(-80, -10);
    this.mSpawnRange = 100;
    this.mSpawnTime = 5;
    this.mSpawnFrame = 0;
    
    //UI
    this.mTitle = null;
    this.mReplayButton = null;
    this.mHardModeReplayButton = null;
    this.mMenuButton = null;

    // The camera to view the scene
    this.mMainCamera = null;
    
    this.mHardMode = false;

}
gEngine.Core.inheritPrototype(ResultsScreen, Scene);

ResultsScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    
    for(var texture in Config.ResultsScreen.Textures) {
        gEngine.Textures.loadTexture(Config.ResultsScreen.Textures[texture]);
    }
    
    for(var audio in Config.ResultsScreen.Audio) {
        gEngine.AudioClips.loadAudio(Config.ResultsScreen.Audio[audio]);
    }
};

ResultsScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    /*
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    } 
    for(var texture in Config.ResultsScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.ResultsScreen.Textures[texture]);
    }
    
    for(var audio in Config.ResultsScreen.Audio) {
        gEngine.AudioClips.unloadAudio(Config.ResultsScreen.Audio[audio]);
    }
    */
    //Start the appropriate scene based on what the user clicked
    var nextScene = null;
    if (this.kNextSceneName === "BossBattle") {
        nextScene = new BossBattle(this.mHardMode);
    } else {
        nextScene = new SplashScreen();
    }
    gEngine.Core.startScene(nextScene);
};

ResultsScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.ResultsScreen.Camera.StartingPosition, // position of the camera
        Config.ResultsScreen.Camera.WorldWidth,                     // width of camera
        Config.ResultsScreen.Camera.Viewport         // viewport (orgX, orgY, width, height)
    );
    this.mMainCamera.setBackgroundColor(Config.ResultsScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);

    //initialize the UI
    this._initializeUI();
    
    //create the arrow
    this.spawnArrow(this.mVictoryArrowSpawnPos);

    //set up the background
    this._initializeBackground();
        
    this.mPlatform = new Platform(Config.ResultsScreen.Textures.PlatformTexture,
                                  Config.ResultsScreen.Textures.PlatformNormal,
                                  Config.ResultsScreen.Platform.x,
                                  Config.ResultsScreen.Platform.y,
                                  Config.ResultsScreen.Platform.w,
                                  Config.ResultsScreen.Platform.h);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPlatform);
    //play the corresponding audio cue
    if (this.mResult) {
        this.kMusicCue = Config.ResultsScreen.Audio.VictoryClip;

        //Set up the dying entity
        this.mGolem = new ResultsScreenGolem();
        this.mGolem.getXform().setPosition(Config.ResultsScreen.Golem.Position[0],
                                           Config.ResultsScreen.Golem.Position[1]);
        this.mGolem.getXform().setSize(Config.ResultsScreen.Golem.Size[0],
                                       Config.ResultsScreen.Golem.Size[1]);
                                       
                                       
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mGolem);
    } 
    else {
        this.kMusicCue = Config.ResultsScreen.Audio.GameOverClip;
        
        //set up the background
        
        //Set up the dying entity
        this.mHero = new ResultsScreenHero();        
        this.mHero.getXform().setPosition(Config.ResultsScreen.Hero.Position[0],
                                           Config.ResultsScreen.Hero.Position[1]);
        this.mHero.getXform().setSize(Config.ResultsScreen.Hero.Size[0],
                                       Config.ResultsScreen.Hero.Size[1]);
                                       
                                       
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mHero);
    }
   
    gEngine.AudioClips.playACue(this.kMusicCue, 0.1);
};

ResultsScreen.prototype._initializeUI = function() {
    var configUI = Config.ResultsScreen.UI;
    
    var titleMsg = this.mResult === true ? "You won!" : "You lost...";
    this.mTitle = new UIText(titleMsg,
                             configUI.Title.Position,
                             configUI.Title.TextHeight,
                             UIText.eHAlignment.eCenter, 
                             UIText.eVAlignment.eBottom);
    this.mTitle.setColor(configUI.Title.Color);
    
    this.mReplayButton = new UIButton(Config.UI.Textures.UIButton, 
                                this._replayCallback,
                                this,
                                configUI.ReplayButton.Position,
                                configUI.ReplayButton.Size,
                                configUI.ReplayButton.Text,
                                configUI.ReplayButton.TextHeight,
                                configUI.ReplayButton.TextColor);

    this.mHardModeReplayButton = new UIButton(Config.UI.Textures.UIButton, 
                                this._hardModeReplaayCallback,
                                this,
                                configUI.HardModeReplayButton.Position,
                                configUI.HardModeReplayButton.Size,
                                configUI.HardModeReplayButton.Text,
                                configUI.HardModeReplayButton.TextHeight,
                                configUI.HardModeReplayButton.TextColor);
    
    this.mMenuButton = new UIButton(Config.UI.Textures.UIButton, 
                                this._menuCallback,
                                this,
                                configUI.MenuButton.Position,
                                configUI.MenuButton.Size,
                                configUI.MenuButton.Text,
                                configUI.MenuButton.TextHeight,
                                configUI.MenuButton.TextColor);
                                
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mReplayButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHardModeReplayButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMenuButton);
};

ResultsScreen.prototype._initializeBackground = function() {
    var bgRend;
    if(this.mResult)
        bgRend = new LightRenderable(Config.ResultsScreen.Textures.VictoryBackground);
    else
        bgRend = new LightRenderable(Config.ResultsScreen.Textures.DefeatBackground);
    
    var configBG = Config.ResultsScreen.Background;
    bgRend.setElementPixelPositions(0, 1024, 0, 1024);
    bgRend.getXform().setSize(configBG.Width,
                              configBG.Height);
    bgRend.getXform().setPosition(configBG.XPos, configBG.YPos);
    bgRend.getXform().setZPos(-10);
    this.mBg = new ParallaxGameObject(bgRend, 5, this.mMainCamera);
    this.mBg.setCurrentFrontDir([-1, 0, 0]);
    this.mBg.setSpeed(configBG.PanSpeed);
    this.mBg.setIsTiled(true);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBg);
};

ResultsScreen.prototype._replayCallback = function() {
    this.kNextSceneName = "BossBattle";
    gEngine.GameLoop.stop();
};

ResultsScreen.prototype._hardModeReplaayCallback = function () {
    this.kNextSceneName = "BossBattle";
    this.mHardMode = true;
    gEngine.GameLoop.stop();
};

ResultsScreen.prototype._menuCallback = function() {
    this.kNextSceneName = "SplashScreen";
    gEngine.GameLoop.stop();
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ResultsScreen.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.5, 0.5, 0.5, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ResultsScreen.prototype.update = function () {
    gEngine.LayerManager.updateAllLayers();
    
    //Updated the alpha of the Title
    var tColor = this.mTitle.getColor();
    var tColor = [tColor[0],tColor[1],tColor[2],tColor[3]+1/60];
    //sets new alpha of main title
    if(this.mArrow.getXform().getPosition()[0]>120){
        this.mTitle.setColor(tColor);
    }
    
    if(this.mResult)
    {
        this.mSpawnFrame++;
        if(this.mSpawnFrame >= this.mSpawnTime)
        {
            var pos = vec2.clone(this.mVictoryArrowSpawnPos);
            pos[1] += ((Math.random() - .5) * this.mSpawnRange);
            this.spawnArrow(pos);
            this.mSpawnFrame = 0;
        }
    }
};

ResultsScreen.prototype.spawnArrow = function(spawnPos) {
    this.mArrow = new FireArrow([spawnPos[0], spawnPos[1]],1.1,50);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mArrow);
};
