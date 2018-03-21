/* 
 * ControlsScreen.js
 * A Scene for displaying Credits
 */

"use strict";

function ControlsScreen() {
    this.mMainCamera = null;
    this.mReturnButton = null;
    this.mTitle = null;
    this.mTorchText = null;
};
gEngine.Core.inheritPrototype(ControlsScreen, Scene);

ControlsScreen.prototype.loadScene = function () {
    for(var texture in Config.UI.Textures) {
        gEngine.Textures.loadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.ControlsScreen.Textures) {
        gEngine.Textures.loadTexture(Config.ControlsScreen.Textures[texture]);
    }
};

ControlsScreen.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
 /*   for(var texture in Config.UI.Textures) {
        gEngine.Textures.unloadTexture(Config.UI.Textures[texture]);
    }
    for (var texture in Config.ControlsScreen.Textures) {
        gEngine.Textures.unloadTexture(Config.ControlsScreen.Textures[texture]);
    }
   */ 
    gEngine.Core.startScene(new SplashScreen());
};
ControlsScreen.prototype.initialize = function () {
    this.mMainCamera = new Camera(
        Config.ControlsScreen.Camera.StartingPosition,
        Config.ControlsScreen.Camera.WorldWidth,  
        Config.ControlsScreen.Camera.Viewport         
    );
    this.mMainCamera.setBackgroundColor(Config.ControlsScreen.Camera.BackgroundColor);
    gEngine.DefaultResources.setGlobalAmbientIntensity(2.5);
    

    this._initializeBackground();
    this._initializeUI();
};

ControlsScreen.prototype._initializeBackground = function() {
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

ControlsScreen.prototype._initializeUI = function() {
    var configUI = Config.ControlsScreen.UI;
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
    
    this.mTorchText = new UIText(configUI.TorchText.Text,
                                 configUI.TorchText.Position,
                                 configUI.TorchText.TextHeight,
                                 UIText.eHAlignment.eCenter,
                                 null);
    this.mTorchText.setColor(configUI.TorchText.Color);
    
    this._makeTextSet(configUI.KeysTextSet);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTitle);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mReturnButton);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mTorchText);
};

ControlsScreen.prototype._makeTextSet = function(textSetData){
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

ControlsScreen.prototype._returnCallback = function() {
    gEngine.GameLoop.stop();
};

ControlsScreen.prototype.update = function() {
    gEngine.LayerManager.updateAllLayers();
};

ControlsScreen.prototype.draw = function() {
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mMainCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mMainCamera);
};