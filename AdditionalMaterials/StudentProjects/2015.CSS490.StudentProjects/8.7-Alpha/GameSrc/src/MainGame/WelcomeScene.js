/*
 * Team 7-Alpha
 * CSS 490C
 * 2D Game Engine Design
 * File: WelcomeScene.js 
 * 
 * This is the logic of our game. 
 * 
 */

/* global gEngine */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

WelcomeScene.eViewStatus = Object.freeze({
    eViewMain: 1,
    eViewControls: 2,
    eViewCredits: 3
});

function WelcomeScene() {

    this.kBg = "assets/stars.png";

    this.kBgLayer = "assets/background.png";
    this.kBgLayerNormal = "assets/bgLayer_normal.png";
    this.kLeftArrowSprite = "assets/left_arrow.png";
    this.kRightArrowSprite = "assets/right_arrow.png";
    this.kStartButtonSound = "assets/sounds/pressStart.wav";
    this.kInterfaceGraphics = "assets/interfaceGraphics1.png";
    this.kCloseButton = "assets/close-button.png";
    this.kCreditsButton = "assets/credits-button.png";
    this.kControlsButton = "assets/controls-button.png";
    this.kShip = "assets/ship.png";
    this.kShipNormal = "assets/shipNormal.png";
    this.kStartScreenMusic = "assets/sounds/introSong.mp3";
    
    this.kExplosiveRocketImage = "assets/explosiveRocket.png";
    this.kParticleTexture = "assets/explosion.png";
    this.kHomingRocketImage = "assets/homingRocket.png";
    this.kMenuBg = "assets/menu_bg.png";
    
    
    this.kControls = ["A: Left", "D: Right", "Space: Shoot", "E: Scan"];
    this.kPowerups = ["Explosives", "Homing"];
    
    this.kFadeTime = 10; // number of tics after start is pressed
    this.mTick = 0;
    this.mStartPressedBoolean = false;
    
    this.viewMode = WelcomeScene.eViewStatus.eViewMain;
    
    // The camera to view the scene
    this.mCamera = null;
    this.mParallaxCam = null;
    this.mShowHeroCam = false;
    
    this.mBg = null;
    this.mBgL1 = null;
    this.mFront = null;

    this.mInstructionSet = null;
    this.mInstructionTitle = null;
    this.mGoalMessage = null;
    this.mPowerupSet = null;
    this.mPowerupTitle = null;
    this.mExplosive = null;
    this.mHoming = null;
        
    this.mLeftArrow = null;
    this.mRightArrow = null;
    
    this.mStartGameButton = null;
    this.mMenuButton = null;
    
    this.kKeith = "Dev/sound: Keith McAfee";
    this.kJesse = "Art: Jesse Mauk";
    this.kKevin = "Art: Kevin Shively";
    this.kRaymond = "Art: Raymond Tien";
    this.kDavid = "Dev: David Watson";
    this.kGeorge = "Dev: George Urick";
    

    this.mDevs = null;

    // the hero and the support objects
    this.mLgtHero = null;
    this.mIllumHero = null;

    this.mLgtMinion = null;
    this.mIllumMinion = null;

    this.mBlock1 = null;   // to verify switching between shaders is fine
    this.mBlock2 = null;

    this.mLgtIndex = 0;
    this.mLgtRotateTheta = 0;
    
    // shadow support
    this.mBgShadow1 = null;
}
gEngine.Core.inheritPrototype(WelcomeScene, Scene);

WelcomeScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kCloseButton);
    gEngine.Textures.loadTexture(this.kCreditsButton);
    gEngine.Textures.loadTexture(this.kControlsButton);
    gEngine.Textures.loadTexture(this.kHomingRocketImage);
    gEngine.Textures.loadTexture(this.kExplosiveRocketImage);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kLeftArrowSprite);
    gEngine.Textures.loadTexture(this.kRightArrowSprite);
    gEngine.Textures.loadTexture(this.kBg);
    
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);

    gEngine.Textures.loadTexture(this.kInterfaceGraphics);
    gEngine.Textures.loadTexture(this.kShip);
    gEngine.Textures.loadTexture(this.kShipNormal);
    gEngine.AudioClips.loadAudio(this.kStartButtonSound);
//    gEngine.AudioClips.loadAudio(this.kStartScreenMusic);
};

WelcomeScene.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kCloseButton);
    gEngine.Textures.unloadTexture(this.kHomingRocketImage);
    gEngine.Textures.unloadTexture(this.kExplosiveRocketImage);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kLeftArrowSprite);
    gEngine.Textures.unloadTexture(this.kRightArrowSprite);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.kInterfaceGraphics);
    gEngine.Textures.unloadTexture(this.kShip);
    gEngine.Textures.unloadTexture(this.kShipNormal);
    gEngine.AudioClips.unloadAudio(this.kStartButtonSound);
    gEngine.AudioClips.unloadAudio(this.kStartScreenMusic);

    gEngine.AudioClips.stopBackgroundAudio();
    
    var nextLevel = new GameScene();  // the next level
    gEngine.Core.startScene(nextLevel);
};

WelcomeScene.prototype.initialize = function () {
    // Step A: set up the cameras

    this.mParallaxCam = new Camera(
        vec2.fromValues(25, 40),      // position of the camera
        30,                           // width of camera
        [0, 420, 700, 300],           // viewport (orgX, orgY, width, height)
        2
    );
    this.mParallaxCam.setBackgroundColor([0.5, 0.5, 0.9, 1]);
    

    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
            // sets the background to gray
    
    // Step B: the lights
    gGameLights.initialize();
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    gEngine.AudioClips.playBackgroundAudio(this.kStartScreenMusic);

 
    this.mBg = new SpriteRenderable(this.kBgLayer);
    this.mBg.setElementPixelPositions(0, 1024, 0, 1024);
    this.mBg.getXform().setSize(60, 60);
    this.mBg.getXform().setPosition(39, 40);
    
    
//    // Step C: the far Background
//    var bgR = new IllumRenderable(this.kBg, this.kBgNormal);
//    bgR.setElementPixelPositions(0, 1024, 0, 1024);
//    bgR.getXform().setSize(30, 30);
//    bgR.getXform().setPosition(0, 0);
//    bgR.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
//    bgR.getMaterial().setShininess(50);
//    bgR.getXform().setZPos(-10);
//    bgR.addLight(this.mGlobalLightSet.getLightAt(1));   // only the directional light
//    this.mBg = new ParallaxGameObject(bgR, 5, this.mCamera);
//    this.mBg.setCurrentFrontDir([0, -1, 0]);
//    this.mBg.setSpeed(0.1);
    
    this.mInstructionTitle = new FontSet(["Controls"], 
                                         3, 
                                         [1,1,1,1], 
                                         [1.2, 28]);
    this.mPowerupTitle = new FontSet(["Power Ups"],
                                         3,
                                        [1, 1, 1, 1],
                                        [60.2, 28]);
    this.mCloseMenuButton = new Button(70, 55, this.kCloseButton);
    this.mGoalTitle = new FontSet(["Your Mission"], 3, [1,1,1,1], [30,50]);
    this.mGoalMessage = new FontSet(["Control your rocket to destroy the asteroids. Scan for",
                                    "asteroids that contain power-ups and beat your high score!"],
                                2, [1,1,1,1], [5, 45]);
                                        
    this.mExplosive = new ExplosiveRocket(75, 25);
    
    this.mHoming = new HomingRocket(75, 21.6);
    
    this.mInstructionSet = new FontSet(this.kControls,
                                2, 
                                [1,1,1,1], 
                                [1, 25]);
                                
    this.mPowerupSet = new FontSet(this.kPowerups, 2, [1,1,1,1], [60,25]);
    
    this.mShip = new MiningShip(40, 23);
    this.mLeftArrow = new LeftArrow(this.kLeftArrowSprite, 32, 23);
    this.mRightArrow = new RightArrow(this.kRightArrowSprite, 48, 23);
    
    this.mStartGameButton = new StartButton(40, 36, this.kInterfaceGraphics);
    this.mMenuButton = new Button(30, 20, this.kControlsButton);
    this.mCreditsButton = new Button(50, 20, this.kCreditsButton);
    
    var developers = [this.kDavid, this.kGeorge, this.kKeith, this.kJesse, 
    this.kKevin, this.kRaymond];
    
    this.mDevs = new FontSet(developers, 3, [1,1,1,1], [2, 35]);
    this.mCreditsTitle = new FontSet(["Credits"], 4, [1,1,1,1], [35, 45]);
    // add to layer managers ...
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBg);
//    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg);
};

WelcomeScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1]);
    
    this.mCamera.setupViewProjection();
    if (this.viewMode === WelcomeScene.eViewStatus.eViewMain) {
        gEngine.LayerManager.drawAllLayers(this.mCamera);
        this.mStartGameButton.draw(this.mCamera);
        this.mMenuButton.draw(this.mCamera);
        this.mCreditsButton.draw(this.mCamera);
    }
    //this.mTitle.draw(this.mCamera);
    //this.mSubtitle.draw(this.mCamera);
    else if (this.viewMode === WelcomeScene.eViewStatus.eViewControls) {
        this.mInstructionSet.draw(this.mCamera);
        this.mInstructionTitle.draw(this.mCamera);
        this.mShip.draw(this.mCamera);
        this.mLeftArrow.draw(this.mCamera);
        this.mRightArrow.draw(this.mCamera);

        this.mPowerupSet.draw(this.mCamera);
        this.mCloseMenuButton.draw(this.mCamera);
        this.mGoalTitle.draw(this.mCamera);
        this.mGoalMessage.draw(this.mCamera);
        this.mExplosive.draw(this.mCamera);
        this.mHoming.draw(this.mCamera);
        this.mPowerupTitle.draw(this.mCamera);
    }
    else if (this.viewMode === WelcomeScene.eViewStatus.eViewCredits) {
        this.mCloseMenuButton.draw(this.mCamera);
        this.mDevs.draw(this.mCamera);
        this.mCreditsTitle.draw(this.mCamera);
    }
};

WelcomeScene.prototype.update = function () {
    this.mCamera.update();
    this.mBg.update();
    
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }
    if (this.mStartPressedBoolean === true)
    {
        this.mTick++;
        if (this.mTick > this.kFadeTime) {
            gEngine.GameLoop.stop();
        }
    }
    
    
    var mouseX = this.mCamera.mouseWCX();
    var mouseY = this.mCamera.mouseWCY();
    
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        if (this.mStartGameButton.getButtonObj().getBBox().containsPoint(mouseX, mouseY)) {
            gEngine.AudioClips.playACue(this.kStartButtonSound);
            this.mStartGameButton.hasBeenClicked();
            this.mStartPressedBoolean = true;
        }
        else if (this.mMenuButton.getButtonObj().getBBox().containsPoint(mouseX, mouseY)) {
            gEngine.AudioClips.playACue(this.kStartButtonSound);
            this.viewMode = WelcomeScene.eViewStatus.eViewControls;
        }
        else if (this.mCreditsButton.getButtonObj().getBBox().containsPoint(mouseX, mouseY)) {
            gEngine.AudioClips.playACue(this.kStartButtonSound);
            this.viewMode = WelcomeScene.eViewStatus.eViewCredits;
        }
        else if (this.mCloseMenuButton.getButtonObj().getBBox().containsPoint(mouseX, mouseY)) {
            gEngine.AudioClips.playACue(this.kStartButtonSound);
            this.viewMode = WelcomeScene.eViewStatus.eViewMain;
        }
    }
    
};
