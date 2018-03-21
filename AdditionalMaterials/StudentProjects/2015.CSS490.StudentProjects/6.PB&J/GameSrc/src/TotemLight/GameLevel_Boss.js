/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * File: GameLevel_01.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_Boss(level) {
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/plat.png";
    this.kPlatformNormal = "assets/plat_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal2.png";
    this.kParticle = "assets/particle.png";
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";
    //this.kButton = "assets/DoorFrame_Button_180x100.png";
    this.kButton = "assets/Totem1.png";
    this.kProjectileTexture = "assets/EMPPulse.png";
    this.kHealthBar = "assets/HealthBar.png";
    this.kLightBar = "assets/LightBar.png";
    this.kLightSprite = "assets/LightSprite.png";
    this.kStoneSprite = "assets/Stone.png";
    this.kLightningBolt = "assets/lightning.png";
    
    this.kHero = "assets/Hero.png";
    
    this.kLaserSound = "assets/Sounds/Laser_Shoot.wav";
    this.kBoltSound = "assets/Sounds/LightningBolt.wav";
    this.kShockSound = "assets/Sounds/electricshock.wav";
    this.kQuakeSound = "assets/Sounds/earthq.wav";
    
    this.kBGMusic = "assets/Sounds/Battle2.mp3";

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";

    this.kLevelFinishedPosition = 300;
    this.mStateTimeClick = 0;
    this.mCurrentState = GameLevel_Boss.eGameLevel_BossState.eWait;

    // The camera to view the scene
    this.mCamera = null;
    this.mPeekCam = null;
    this.mShowPeek = false;

    this.mBarCam = null;
    this.mOriginalCamPos = null;

    this.mMsg = null;
    this.mMatMsg = null;
    this.mHealthMsg = null;
    this.mEnergyMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;
    this.mDarkCreep = null;
    
    this.mHeroHitTaken = false;

    this.mHealthBar = null;
    this.mLightBar = null;

    this.mLightSprite = null;

    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;
    this.mRestart = false;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllWalls = new GameObjectSet();
    this.mAllPlatforms = new GameObjectSet();
    this.mAllButtons = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();

    this.mAllDarkCreeps = [];

    this.mFinalBoss = null;
}
gEngine.Core.inheritPrototype(GameLevel_Boss, Scene);

GameLevel_Boss.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kLaserSound);
    gEngine.AudioClips.loadAudio(this.kBoltSound);
    gEngine.AudioClips.loadAudio(this.kShockSound);
    gEngine.AudioClips.loadAudio(this.kQuakeSound);
    
    gEngine.AudioClips.loadAudio(this.kBGMusic);
    
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kDoorTop);
    gEngine.Textures.loadTexture(this.kDoorBot);
    gEngine.Textures.loadTexture(this.kDoorSleeve);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kLightBar);
    gEngine.Textures.loadTexture(this.kLightSprite);
    gEngine.Textures.loadTexture(this.kStoneSprite);
    gEngine.Textures.loadTexture(this.kLightningBolt);

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
};

GameLevel_Boss.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kDoorTop);
    gEngine.Textures.unloadTexture(this.kDoorBot);
    gEngine.Textures.unloadTexture(this.kDoorSleeve);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kLightBar);
    gEngine.Textures.unloadTexture(this.kLightSprite);

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);

    if (this.mRestart === true)
    {
        var nextLevel = new GameLevel_Boss("LevelBoss");  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        var nextLevel = new YouWin();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }


};

GameLevel_Boss.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    gEngine.AudioClips.playBackgroundAudio(this.kBGMusic);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();

    this.mOriginalCamPos = vec2.clone(this.mCamera.getWCCenter());

    var m = parser.parseMinions(this.kMinionSprite, null, this.mGlobalLightSet);
    var i;
    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addToSet(m[i]);
    }
    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

//    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
//    for (i = 0; i < w.length; i++) {
//        this.mAllWalls.addToSet(w[i]);
//    }

//    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
//    for (i = 0; i < p.length; i++) {
//        this.mAllPlatforms.addToSet(p[i]);
//    }

//    var d = parser.parseDoors(this.kDoorTop, this.kDoorBot, this.kDoorSleeve, this.mGlobalLightSet);
//    for (i = 0; i < d.length; i++) {
//        this.mAllDoors.addToSet(d[i]);
//    }
//
//    var b = parser.parseButtons(this.kButton, this.mGlobalLightSet);
//    for (i = 0; i < b.length; i++) {
//        this.mAllButtons.addToSet(b[i]);
//    }

    //var v = "1 0 0".split(" ");
    //console.log(this._convertToNum(v));
    this.mHealthBar = new Bar(this.kHealthBar, [1, 0, 0, 1], 9, [-35, 0], [3, 3], 0.5, this.mGlobalLightSet);
    this.mHealthBar.initialize();
    

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHero, 220, 6, this.mGlobalLightSet, this.kHealthBar, this.kLightBar); // 2, 6
    this.mIllumHero.toggleLight();
    this.mIllumHero.isBossLevel(true);
    
    this.mFinalBoss = new FinalBoss(230, 8, 0, 2, 2, this.kMinionSprite, null, this.mGlobalLightSet, 1, 1.5, this.mIllumHero, this.mCamera);

    this.mAllDarkCreeps[0] = new DarkCreep(this.kHeroSprite, null, 12, 2, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[1] = new DarkCreep(this.kHeroSprite, null, 26, 2, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[2] = new DarkCreep(this.kHeroSprite, null, 50, 12.5, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[3] = new DarkCreep(this.kHeroSprite, null, 180, 15, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[4] = new DarkCreep(this.kHeroSprite, null, 125, 2, this.mGlobalLightSet, this.mIllumHero);

    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addHeroToSet(this.mIllumHero);
    }



    this.mNextLevel = parser.parseNextLevel();


    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    for (i = 0; i < this.mAllDarkCreeps.length; i++) {
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mAllDarkCreeps[i]);
    }

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mFinalBoss);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }
    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    for (i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }


    this.mPeekCam = new Camera(
            vec2.fromValues(0, 0),
            44,
            [0, 0, 250, 180],
            2
            );
    this.mShowPeek = false;


    this.mBarCam = new Camera(
            vec2.fromValues(0, 0),
            100,
            [0, 650, 1280, 70]
            );
    this.mBarCam.setBackgroundColor([0, 0, 0, 1]);



    this.mLightBar = new Bar(this.kLightBar, [0, 0, 1, 1], 0, [0, 0], [3, 3], 0.5, this.mGlobalLightSet);
    this.mLightBar.initialize();

    this.mLightSprite = new LightSprite(this.kLightSprite);
    
    this.mHealthMsg = new FontRenderable("Health");
    this.mHealthMsg.setColor([1, 1, 1, 1]);
    this.mHealthMsg.getXform().setPosition(-48, 0);
    this.mHealthMsg.setTextHeight(3);
    
    this.mEnergyMsg = new FontRenderable("Energy");
    this.mEnergyMsg.setColor([1, 1, 1, 1]);
    this.mEnergyMsg.getXform().setPosition(12, 0);
    this.mEnergyMsg.setTextHeight(3);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_Boss.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mAllParticles.draw(this.mCamera);

    this.mLightSprite.draw(this.mCamera);
    //this.mLightProjectile.draw(this.mCamera);

    if (this.mShowPeek) {
        this.mPeekCam.setupViewProjection();
        gEngine.LayerManager.drawAllLayers(this.mPeekCam);
    }

    this.mBarCam.setupViewProjection();
    this.mIllumHero.getHealthBar().draw(this.mBarCam);
    this.mLightBar.draw(this.mBarCam);
    this.mIllumHero.getEnergyBar().draw(this.mBarCam);

    this.mHealthMsg.draw(this.mBarCam);
    this.mEnergyMsg.draw(this.mBarCam);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_Boss.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mBarCam.update();
    //this.mIllumHero.getHealthBar().update();
    gEngine.LayerManager.updateAllLayers();

    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(230, 8);                               //   this.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());
    //p[0] -= 8;
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);
    this.mAllParticles.update();

    if (this.mShowPeek) {
        this.mPeekCam.setWCCenter(p[0], p[1]);
        this.mPeekCam.update();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mShowPeek = !this.mShowPeek;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }

//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
//    {
//        var lightOn = this.mGlobalLightSet.getLightAt(this.mLgtIndex).isLightOn();
//        this.mGlobalLightSet.getLightAt(this.mLgtIndex).setLightTo(!lightOn);
//        this.mIllumHero.toggleLight();
//    }

    // physics simulation
    this._physicsSimulation();

    var platBox;
    var i;
    var collided = false;
    var collisionInfo = new CollisionInfo();
    for (i = 0; i < this.mAllPlatforms.size(); i++) {
        var platBox = this.mAllPlatforms.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            break;
        }
    }

//    for (i = 0; i < this.mAllPlatforms.size(); i++) {
//        var platBox = this.mAllPlatforms.getObjectAt(i).getPhysicsComponent();
//        collided = this.DarkCreep.getJumpBox().collided(platBox, collisionInfo);
//        if (collided) {
//            this.mIllumHero.canJump(true);
//            break;
//        }
//    }

//    for (i = 0; i < this.mAllMinions.size(); i++) {
//        var minionBox = this.mAllMinions.getObjectAt(i).getPhysicsComponent();
//        collided = this.mIllumHero.getPhysicsComponent().collided(minionBox, collisionInfo);
//        if (collided) {
//            var dCreepXPos = this.mAllMinions.getObjectAt(i).getMinion().getXform().getXPos();
//            var heroXPos = this.mIllumHero.getXform().getXPos();
//            
//            this.mHealthBar.decreaseBar();
//            //this.mRestart = true;
//            //gEngine.GameLoop.stop();
//        }
//    }


    var j;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var p = this.mAllMinions.getObjectAt(i).getProjectiles();

        for (j = 0; j < p.size(); j++) {
            var pBox = p.getObjectAt(j).getPhysicsComponent();
            collided = this.mIllumHero.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                this.mRestart = true;
                gEngine.GameLoop.stop();
            }
        }
    }

    for (i = 0; i < this.mAllButtons.size(); i++) {
        var buttonBox = this.mAllButtons.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(buttonBox, collisionInfo);
        if (collided && gEngine.Input.isKeyClicked(gEngine.Input.keys.X) && !this.mAllButtons.getObjectAt(i).getButtonState()
                && this.mLightBar.getBarSize() !== 0) {
            this.mAllButtons.getObjectAt(i).pressButton();
            this.mLightBar.decreaseBar();
        }
    }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Added code for lightsprite collecting
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    collided = this.mIllumHero.getPhysicsComponent().collided(this.mLightSprite.getPhysicsComponent(), collisionInfo);
    if (collided && this.mLightSprite.mIsActivated === false)
    {
        this.mLightSprite.setVisibility(false);
        this.mLightBar.increaseBar();
        this.mLightSprite.mIsActivated = true;
    }




    var totemUnlocked = new Array(this.mAllButtons.size());
    for (i = 0; i < this.mAllButtons.size(); i++) {
        totemUnlocked[i] = false;
    }

    for (i = 0; i < this.mAllButtons.size(); i++) {
        if (this.mAllButtons.getObjectAt(i).getButtonState()) {
            totemUnlocked[i] = true;
        }
        else {
            totemUnlocked[i] = false;
        }

        if (totemUnlocked[i]) {
            this.mAllDoors.getObjectAt(i).unlockDoor();
            this.mCamera.panWith(this.mLightProjectile.getXform(), 0.4);

            this.mLightProjectile.update(this.mAllDoors.getObjectAt(i));

            collided = this.mLightProjectile.getPhysicsComponent().collided(this.mAllDoors.getObjectAt(i).getPhysicsComponent(), collisionInfo);

            var p = this.createParticle(this.mLightProjectile.getXform().getXPos(), this.mLightProjectile.getXform().getYPos());
            this.mAllParticles.addToSet(p);
            if (collided)
            {
                this.mLightProjectile.setVisibility(false);
                this.mCamera.panTo(this.mOriginalCamPos[0], this.mOriginalCamPos[1]);
                this.mCamera.setWCCenter(xf.getXPos(), 8);

            }
        }
    }

    if (this.mIllumHero.getHealthBar().getBarSize() === 0) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    
    if(this.mFinalBoss.getHealth() < 0)
    {
        this.mRestart = false;
        gEngine.GameLoop.stop();
    }
    
//        var p = vec2.fromValues(0, 0);
//
//        if (this.mFinalBoss.pixelTouches(this.mIllumHero, p)) {
//            this.mCurrentState = GameLevel_01.eGameLevel_01State.eDecHeroHealth;
//        }

    switch (this.mCurrentState) {
        case GameLevel_Boss.eGameLevel_BossState.eWait:
            this._wait();
            break;
        case GameLevel_Boss.eGameLevel_BossState.eDecBossHealth:
            this._decBossHealth();
            break;
        case GameLevel_Boss.eGameLevel_BossState.eDecHeroHealth:
            this._decHeroHealth();
            break;
    }
    
};

GameLevel_Boss.prototype._physicsSimulation = function () {

    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);
    var i;
    for (i = 0; i < this.mAllDarkCreeps.length; i++) {
        gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllPlatforms);
        gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllWalls);
        gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllDoors);
    }


    // Minion platform
    //gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllWalls);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllDoors);

};

GameLevel_Boss.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([0, 0, 0.7, 0.5]);

    // size of the particle
    var r = 3.5 + Math.random() * 2.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    //p.setFinalColor([0.2,0.2,0.2,0.6]);

    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(0.25);

    return p;
};

GameLevel_Boss.prototype._convertToNum = function (a) {
    var j;
    for (j = 0; j < a.length; j++) {
        a[j] = Number(a[j]);
    }
};

GameLevel_Boss.prototype._distToHero = function () {
    var toHero = [];
    vec2.subtract(toHero, this.mIllumHero.getXform().getPosition(), this.mFinalBoss.getXform().getPosition());
    return vec2.length(toHero);
};

GameLevel_Boss.prototype._wait = function () {
    if (this.mStateTimeClick === 25) {
        this.mStateTimeClick = 0;
        if (this._distToHero() < 3.5) {
            if(this.mIllumHero.getLight()) {
            this.mCurrentState = GameLevel_Boss.eGameLevel_BossState.eDecBossHealth;
        }
        }
    }
    else {
        this.mStateTimeClick += 1;
    }

};

GameLevel_Boss.prototype._decBossHealth = function () {
    if (!this.mFinalBoss.getInvulnarable()) {
        if (this.mStateTimeClick === 25) {
            this.mFinalBoss.decHealth();
            this.mFinalBoss.decHealth();
            this.mFinalBoss.decHealth();
            this.mFinalBoss.decHealth();
            
            this.mStateTimeClick = 0;
            this.mCurrentState = GameLevel_Boss.eGameLevel_BossState.eWait;
            this.mFinalBoss.getRenderable().setColor([0, 0, 0, 0]);
        }
        else {

            if (this.mStateTimeClick % 2 === 0) {
                this.mFinalBoss.getRenderable().setColor([0, 0, 0, 0]);
            }
            else {
                this.mFinalBoss.getRenderable().setColor([1, 1, 1, 1]);
            }
        }
        this.mStateTimeClick += 1;
    }
};

GameLevel_Boss.eGameLevel_BossState = Object.freeze({
    eWait: 0,
    eDecBossHealth: 1,
    eDecHeroHealth: 2
});

GameLevel_Boss.prototype._decHeroHealth = function () {
        if (this.mStateTimeClick === 200) {
            this.mStateTimeClick = 0;
            this.mCurrentState = GameLevel_Boss.eGameLevel_BossState.eWait;
            this.mHeroHitTaken = false;
        }
        else {
           this.mStateTimeClick += 1;
        }
        if(!this.mHeroHitTaken) {
        this.mIllumHero.hitTaken(-1);
        this.mHeroHitTaken = true;
    }
};