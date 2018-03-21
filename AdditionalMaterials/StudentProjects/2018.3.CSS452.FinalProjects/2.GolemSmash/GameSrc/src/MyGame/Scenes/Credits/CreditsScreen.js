/* 
 * CreditsScreen.js
 * A Scene for displaying Credits
 */

"use strict";

function CreditsScreen() {
    this.mMainCamera = null;
    this.mReturnButton = null;
    this.mFarBG = null;
    this.mFarBGStart = vec2.create();
};
gEngine.Core.inheritPrototype(CreditsScreen, Scene);

CreditsScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.CreditsScreen.Textures) {
        gEngine.Textures.loadTexture(Config.CreditsScreen.Textures[texture]);
    }
};

CreditsScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
 /*   for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.CreditsScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.CreditsScreen.Textures[texture]);
    }
   */ 
    gEngine.Core.startScene(new SplashScreen());
};
CreditsScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.CreditsScreen.Camera.StartingPosition,
        Config.CreditsScreen.Camera.WorldWidth,  
        Config.CreditsScreen.Camera.Viewport         
    );
    this.mMainCamera.setBackgroundColor(Config.CreditsScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    

    this._initializeBackground();
    this._initializeUI();
};

CreditsScreen.prototype._initializeBackground = function() {
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

CreditsScreen.prototype._initializeUI = function() {
    var configUI = Config.CreditsScreen.UI;
    this.mTitle = new UIText(configUI.Title.Text,
                             configUI.Title.Position,
                             configUI.Title.TextHeight,
                             UIText.eHAlignment.eCenter, 
                             UIText.eVAlignment.eBottom);
    this.mTitle.setColor(configUI.Title.Color);

    this.mReturnButton = new UIButton(Config.UI.Textures.UIButton, 
                                this._returnCallback,
                                this,
                                configUI.ReturnButton.Position,
                                configUI.ReturnButton.Size,
                                configUI.ReturnButton.Text,
                                configUI.ReturnButton.TextHeight,
                                configUI.ReturnButton.TextColor);
    
    this._makeTextSet(configUI.CreditsTextSet);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mReturnButton);
};

CreditsScreen.prototype._makeTextSet = function(textSetData){
    var curPos = vec2.clone(textSetData.StartPos);
    
    for(var string in textSetData.Set) {
        var newText = new UIText(textSetData.Set[string],
                             curPos,
                             textSetData.TextHeight,
                             UIText.eHAlignment.eCenter,
                             null);
        newText.setColor(textSetData.Color);
        
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, newText);
        curPos[1] -= (textSetData.TextHeight + textSetData.Spacing);
    }
};

CreditsScreen.prototype._returnCallback = function() {
    gEngine.GameLoop.stop();
};

CreditsScreen.prototype.update = function() {
    console.log("update");
    gEngine.LayerManager.updateAllLayers();
};

CreditsScreen.prototype.draw = function() {
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};