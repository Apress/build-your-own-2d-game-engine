"use strict";

function EndLevel(finalScore, possibleScore) {
    this.mFinalScore = null;
    this.mFinishMessage = null;
    this.mThanksMessage = null;
    this.mPossibleScore = null;
    this.kFinalScore = finalScore;
    this.kPossibleScore = possibleScore;
    
    this.kBackgroundMusic = "assets/Audio/FinishScreenBG.mp3";
    this.kBackgroundSprite = "assets/Backdrops/menu-bg.png";
    this.kButtonSprite = "assets/UI/button.png"
    
    this.mRestartButton = null;
    this.mMainMenuButton = null;
    
    this.mRestart = false;
    this.mQuitGame = false;
    this.mSecretLevel = false;
};
gEngine.Core.inheritPrototype(EndLevel, Scene);


EndLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackgroundSprite);
    gEngine.Textures.loadTexture(this.kButtonSprite);
    gEngine.AudioClips.loadAudio(this.kBackgroundMusic);
};

EndLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackgroundSprite);
    gEngine.Textures.unloadTexture(this.kButtonSprite);
    gEngine.AudioClips.stopBackgroundAudio();
    
    gEngine.LayerManager.cleanUp();
    
    if (this.mRestart) {
        gEngine.Core.startScene(new BirdCreek());
    }
    else if (this.mQuitGame){
        gEngine.Core.startScene(new MainMenu());
    }
    else if (this.mSecretLevel){
        gEngine.Core.startScene(new SecretLevel());
    }
//    else {
//        gEngine.Core.startScene(new MainMenu());
//    }
};

EndLevel.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        200,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0.5, 1]);
    
    this.text = "Finish!";
    
    if(this.kPossibleScore === this.kFinalScore){
        this.text = "PERFECT!";
    }
    else if(this.kFinalScore === 0){
        this.text = "Better Luck Next Time!";
    }
    
    this.mFinishMessage = new UIText(this.text, [400, 460], 12, 1, 2, [1, 1, 1, 1]);
    this.mFinishMessageShadow = new UIText(this.text, [400, 455], 12, 1, 2, [0, 0, 0, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mFinishMessageShadow);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mFinishMessage);
    
    
    var totalScoreText = "Total Score: " + this.kFinalScore;
    
    this.mFinalScore = new UIText(totalScoreText, [400, 360], 10, 1, 2, [0, 0, 0, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mFinalScore);
    
    var possibleScoreText = "Max Possible Score: " + this.kPossibleScore;
    
    this.mPossibleScore = new UIText(possibleScoreText, [400, 310], 10, 1, 2, [0, 0, 0, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mPossibleScore);
    
    this.mThanksMessage = new UIText("Thanks for Playing!", [400, 210], 10, 1, 2, [0, 0, 0, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mThanksMessage);
    
    this.mRestartButton = new UIButton(this.kButtonSprite,this.restart,this,[390,135],[270,60],"Play Again",5,[0.2,0.5,0,1],[1,1,1,1]);
    
    this.mMainMenuButton = new UIButton(this.kButtonSprite,this.goHome,this,[390,60],[270,60],"Return to Main Menu",5,[0.8,0,0.2,1],[1,1,1,1]);
    
    this.mBackground = new TextureRenderable(this.kBackgroundSprite);
    this.mBackground.getXform().setPosition(0, 50);
    this.mBackground.getXform().setSize(450, 450);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBackgroundMusic);
};

EndLevel.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 1.0]);

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mRestartButton.draw(this.mCamera);
    this.mMainMenuButton.draw(this.mCamera);
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

EndLevel.prototype.update = function () {    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mQuitGame = true;
        gEngine.GameLoop.stop();
    }
//    else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.T)){
//        this.mSecretLevel = true;
//        gEngine.GameLoop.stop();
//    }
    
    this.mRestartButton.update();
    this.mMainMenuButton.update();
    
    gEngine.LayerManager.updateAllLayers();
};

EndLevel.prototype.restart = function () {
    this.mRestart = true;
    gEngine.GameLoop.stop();
};

EndLevel.prototype.goHome = function () {
    this.mQuitGame = true;
    gEngine.GameLoop.stop();
};