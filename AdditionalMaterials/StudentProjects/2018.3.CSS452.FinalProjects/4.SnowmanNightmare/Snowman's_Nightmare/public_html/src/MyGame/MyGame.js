/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
 GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light, BlockManager, HelperFunctions 
 ,CameraManager, LightManager*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {

    this.kSnowman = "assets/Snowman@2x.png";
    this.kOwl = "assets/owl.png";
    this.kBlock = "assets/Block.png";
    this.kFire = "assets/Fire.png";
    this.kWater = "assets/Water.png";
    this.kBG = "assets/BG.png";
    this.kParticle = "assets/particle.png";
    this.kIgloo = "assets/Igloo.png";
    this.kIglooNormal = "assets/IglooNormalMap.png";
    this.kbgNormal = "assets/bgNormal.png";
    this.kAngryFire = "assets/FireWithEyes_2.png";
    this.kMeteor = "assets/comet.png";
    this.kBomb = "assets/bomb.png";

    this.BGWidth = 1024;
    this.CameraCanvasWidth = HelperFunctions.Core.getCameraWidth();
    this.CameraCenter = HelperFunctions.Core.getCameraCenter();
    this.CanvasWidth = HelperFunctions.Core.getCanvasWidth();
    this.CanvasHeight = HelperFunctions.Core.getCanvasHeight();
    this.HeroSize = 128;
    this.BlockSize = 64;
    this.ScalingFactor = 1;
    
    this.SpawnTime = 60;
    
    switch(HelperFunctions.Core.getDifficulty()){
        case "easy":
            this.SpawnTime *= 1;
            break;
        case "medium":
            this.SpawnTime *= 0.7;
            break;
        case "hard":
            this.SpawnTime *= 0.3;
            break;
    }

    this.IntroLight = true;
    this.initialLightLevel = 100;
    this.lightLevel = 3.4;

    this.nextNewBlock = 5000;
    this.nextNewBlockCount = 0;
    this.winningScore = 1000000;

    this.Timer = 0;
    this.TimingAmount = 4;

    this.mHero = null;
    this.mOwl = null;
    this.mBlockManager = null;
    this.mFireManager = null;
    this.mWaterManager = null;
    this.mLightManager = null;
    this.mScoreMsg = null;
    this.mStatusMsg = null;
    this.mHealthMsg = null;
    this.mIgloo = null;

    this.mAllObjs = null;
    this.mCollisionInfos = [];

    this.firstCamera = null;
    this.secondCamera = null;
    this.thirdCamera = null;
    this.fourthCamera = null;
    this.isLost = false;
  
    this.playedEndGameAudio = false;
    
    this.kFizzAudio = "assets/sounds/fizz.wav";
    this.kExplosionAudio = "assets/sounds/explosion.wav";
    this.kBombAudio = "assets/sounds/bmb.wav";
    this.kLoseAudio = "assets/sounds/lose.wav";
    this.kWaterAudio = "assets/sounds/water.wav";
    this.kGameSceneAudio = "assets/sounds/Something_Wicked.mp3";
    this.kStartAudio = "assets/sounds/start.wav";
    this.kJumpAudio = "assets/sounds/jump.wav";
    this.kBlocksReplaceAudio = "assets/sounds/replace-blocks.wav";
    this.kSizzle = "assets/sounds/sizzle.wav";
    this.kOuch = "assets/sounds/ouch.wav";
    
    this.loseSoundActivated;
    
    this.nextLevel;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {

    gEngine.Textures.loadTexture(this.kSnowman);
    gEngine.Textures.loadTexture(this.kOwl);
    gEngine.Textures.loadTexture(this.kBlock);
    gEngine.Textures.loadTexture(this.kFire);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kIgloo);
    gEngine.Textures.loadTexture(this.kIglooNormal);
    gEngine.Textures.loadTexture(this.kbgNormal);
    gEngine.Textures.loadTexture(this.kAngryFire);
    gEngine.Textures.loadTexture(this.kMeteor);
    gEngine.Textures.loadTexture(this.kBomb);
    
    //aduio
    gEngine.AudioClips.loadAudio(this.kGameSceneAudio);
    gEngine.AudioClips.loadAudio(this.kFizzAudio);
    gEngine.AudioClips.loadAudio(this.kBombAudio);
    gEngine.AudioClips.loadAudio(this.kExplosionAudio);

    gEngine.AudioClips.loadAudio(this.kWaterAudio);
    gEngine.AudioClips.loadAudio(this.kLoseAudio);
    gEngine.AudioClips.loadAudio(this.kStartAudio);
    gEngine.AudioClips.loadAudio(this.kJumpAudio);
    gEngine.AudioClips.loadAudio(this.kBlocksReplaceAudio);
    gEngine.AudioClips.loadAudio(this.kSizzle);
    gEngine.AudioClips.loadAudio(this.kOuch);
};

MyGame.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kFizzAudio);
    gEngine.AudioClips.unloadAudio(this.kWaterAudio);
    gEngine.AudioClips.unloadAudio(this.kExplosionAudio);
    gEngine.AudioClips.unloadAudio(this.kBombAudio);
    gEngine.AudioClips.unloadAudio(this.kLoseAudio);
    gEngine.AudioClips.unloadAudio(this.kStartAudio);
    gEngine.AudioClips.unloadAudio(this.kJumpAudio);
    gEngine.AudioClips.unloadAudio(this.kBlocksReplaceAudio);
    gEngine.AudioClips.unloadAudio(this.kSizzle);
    gEngine.AudioClips.unloadAudio(this.kOuch);

    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kSnowman);
    gEngine.Textures.unloadTexture(this.kOwl);
    gEngine.Textures.unloadTexture(this.kBlock);
    gEngine.Textures.unloadTexture(this.kFire);
    gEngine.Textures.unloadTexture(this.kWater);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kIgloo);
    gEngine.Textures.unloadTexture(this.kIglooNormal);
    gEngine.Textures.unloadTexture(this.kbgNormal);
    gEngine.Textures.unloadTexture(this.kAngryFire);
    gEngine.Textures.unloadTexture(this.kMeteor);
    gEngine.Textures.unloadTexture(this.kBomb);

    gEngine.Core.startScene(this.nextLevel);
};

MyGame.prototype.initialize = function () {
    
    //initialize light manager
    LightManager.Core.initLightManager(20);
    
    this.loseSoundActivated = false;
    
    //play bg audio
    gEngine.AudioClips.playBackgroundAudio(this.kGameSceneAudio);

    //setup score message
    this.mScoreMsg = new FontRenderable("Status Message");
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(32, this.CanvasHeight - 32);
    this.mScoreMsg.setTextHeight(24);

    //setup hero health message
    this.mHealthMsg = new FontRenderable("");
    this.mHealthMsg.setColor([1, 1, 1, 1]);
    this.mHealthMsg.getXform().setPosition(this.CanvasWidth - 140, this.CanvasHeight - 32);
    this.mHealthMsg.setTextHeight(24);

    //setup status message
    this.mStatusMsg = new FontRenderable("");
    this.mStatusMsg.setColor([1, 1, 0, 1]);
    this.mStatusMsg.getXform().setPosition(this.CanvasWidth / 2 - 60, this.CanvasHeight / 2);
    this.mStatusMsg.setTextHeight(32);

    //setup status message
    this.mRestartMsg = new FontRenderable("");
    this.mRestartMsg.setColor([1, 1, 1, 1]);
    this.mRestartMsg.getXform().setPosition(50, this.CanvasHeight / 2 - 50);
    this.mRestartMsg.setTextHeight(32);

    //initialize hero object
    this.mHero = new Hero(this.kSnowman, this.HeroSize, this.CameraCenter, this.HeroSize);
    
    //initialize owl
    this.mOwl = new Owl(this.kOwl, 64, this.CameraCenter, 64 + this.BlockSize / 2, this.mHero.getXform().getPosition());
    
    //create the igloo
    this.mIgloo = new Igloo(this.kIgloo, this.kIglooNormal, this.CameraCanvasWidth);

    //intialize background
    var bgR = new IllumRenderable(this.kBG, this.kbgNormal);
    bgR.setElementPixelPositions(0, this.CameraCanvasWidth, 0, this.CameraCanvasWidth - 200);
    bgR.getXform().setSize(this.BGWidth, this.BGWidth);
    bgR.getXform().setPosition(this.CameraCenter, this.CameraCenter);
    bgR.addLight(LightManager.Core.getDirectionalLight());
    this.mBG = new GameObject(bgR);

    //initialize the block manager
    this.mBlockManager = new BlockManager(
            this.kBlock,
            this.CameraCanvasWidth / this.BlockSize + 1,
            this.BlockSize, this.BlockSize / 2,
            this.BlockSize / (this.ScalingFactor * 2));
            
    this.mFireManager = new FireManager(
            this.kFire,
            this.kAngryFire,
            this.kMeteor,
            this.kBomb,
            this.mHero.getXform().getPosition(),
            this.SpawnTime,
            this.SpawnTime * 3,
            this.mBG, this.mIgloo,
            this.mBlockManager);
            
    this.mWaterManager = new WaterManager(this.kWater);

    //add everything to the correct layer
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHealthMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mStatusMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mRestartMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mFireManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mBlockManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIgloo);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mWaterManager);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mOwl);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBG);
    

    gEngine.DefaultResources.setGlobalAmbientIntensity(this.initialLightLevel);

    CameraManager.Core.initCameraManager(4, this.CanvasHeight / 4);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {

    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

    CameraManager.Core.draw();
    this.mCollisionInfos = [];

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    if(this.mHero.isFalling() && !this.loseSoundActivated) {
            this.loseSoundActivated = true;
            gEngine.AudioClips.playACue(this.kLoseAudio);
    }

    if (this.mHero.isAlive()) {

        if (this.mFireManager.getScore() < this.winningScore) {

            CameraManager.Core.update();

            gEngine.LayerManager.updateAllLayers();

            this.mWaterManager.updatePosition(this.mHero.getXform().getPosition(), this.mHero.getDirection());

            this.bootUpLight();

//          this.checkDevKeys();

            //only need to call one way, handles collisions on both managers' objects  
            var collisionInfo = new CollisionInfo();

            //collisions (physics)
            this.mBlockManager.checkCollisions(this.mFireManager, collisionInfo);
            this.mFireManager.checkCollisionsByPixel(this.mWaterManager, collisionInfo);
            
            //per pixel collision
            this.mFireManager.checkCollisionsWith(this.mHero);
            this.mFireManager.checkCollisionsWith(this.mOwl);

            //text updates
            this.mScoreMsg.setText("Score: " + this.mFireManager.getScore());
            this.mHealthMsg.setText("Health: " + this.mHero.getHealth());

        } else {
            
            this.finishGame();
            
        }

    } else {
        
        this.finishGame();
        
    }

    // Hero platform
    gEngine.Physics.processObjSet(this.mHero, this.mBlockManager);
    gEngine.Physics.processObjSet(this.mIgloo, this.mBlockManager);
    gEngine.Physics.processObjSet(this.mOwl, this.mBlockManager);
    
};

MyGame.prototype.finishGame = function ()
{

    this.mFireManager.deleteFires();
    
    var score = this.mFireManager.getScore();
    this.nextLevel = new WinScreen(score);
    gEngine.GameLoop.stop();
    
};

MyGame.prototype.bootUpLight = function () {

    //Booting up light sequence
    var intensity = gEngine.DefaultResources.getGlobalAmbientIntensity();
    if (intensity > this.lightLevel)
        if (this.Timer >= this.TimingAmount) {
            gEngine.DefaultResources.setGlobalAmbientIntensity(intensity / 2);
            this.Timer = 0;
        } else
            this.Timer++;

};

MyGame.prototype.checkDevKeys = function () {


    //dev key to relocate all fire objects
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        var mousePosition = CameraManager.Core.getMouseLocation();
        this.mFireManager.relocate(mousePosition[0], mousePosition[1]);
    }

    //dev key to increment score
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)) {
        this.mFireManager.incrementScoreBy(10000);
    }
    
    //dev key to end game
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)) {
        this.finishGame();
    }
  
    //camera checkout keys for testing
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.firstCamera = CameraManager.Core.checkoutIthCamera(0);
        if (this.firstCamera === null)
            CameraManager.Core.returnIthCamera(0);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.secondCamera = CameraManager.Core.checkoutIthCamera(1);
        if (this.secondCamera === null)
            CameraManager.Core.returnIthCamera(1);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        this.thirdCamera = CameraManager.Core.checkoutIthCamera(2);
        if (this.thirdCamera === null)
            CameraManager.Core.returnIthCamera(2);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Four)) {
        this.fourthCamera = CameraManager.Core.checkoutIthCamera(3);
        if (this.fourthCamera === null)
            CameraManager.Core.returnIthCamera(3);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.F)){
        this.mFireManager.autoSpawn();
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.T)){
        this.mFireManager._createObject();
    }
};