/*
 * File: GameLevel_01.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_01(level) {
    this.kHeroSprite = "assets/hero_sprite.png";
    //this.kHeroSprite = "assets/Hero.png";
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
    this.kHealthBar = "assets/HealthBar.png";
    this.kLightBar = "assets/LightBar.png";
    this.kLightSprite = "assets/LightSprite.png";
    
    this.kHero = "assets/Hero.png";
    
    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/Background.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";
    
    //Sounds and Music
    this.kBgMusic = "assets/Sounds/TotemLightLevel_1.wav";
    this.kTotemLightPulse = "assets/Sounds/TotemLightPulse.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.mBarCam = null;
    this.mHintCam = null;
    this.mShowHint = null;
    
    this.mOriginalCamPos = null;

    this.mMsg = null;
    this.mMatMsg = null;
    
    this.mHealthMsg = null;
    this.mLightMsg = null;

    // the hero and the support objects
    this.mIllumHero = null;
    this.mDarkCreep = null;
    
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
    this.mAllTrees = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.mAllLightProjectiles = [];
    
    this.mAllDarkCreeps = [];
    this.mAllLightSprites = [];
    
    this.mWatchDoorTimer = 0;
    this.mWatchDoor = 120;
}
gEngine.Core.inheritPrototype(GameLevel_01, Scene);

GameLevel_01.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeroSprite);
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
    gEngine.Textures.loadTexture(this.kHealthBar);
    gEngine.Textures.loadTexture(this.kLightBar);
    gEngine.Textures.loadTexture(this.kLightSprite);
    gEngine.Textures.loadTexture("assets/TreeGreen.png");
    gEngine.Textures.loadTexture("assets/TreeBlue.png");
    gEngine.Textures.loadTexture("assets/TreeYellow.png");
    gEngine.Textures.loadTexture("assets/TreeSmallYellow.png");
    gEngine.Textures.loadTexture("assets/TreeSmallBlue.png");
    gEngine.Textures.loadTexture("assets/TreeSmallGreen.png");

    

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
    
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    gEngine.AudioClips.loadAudio(this.kTotemLightPulse);
    gEngine.AudioClips.loadAudio("assets/Sounds/TotemLightHit.wav");
    gEngine.AudioClips.loadAudio("assets/Sounds/TotemLightJump.wav");
    gEngine.AudioClips.loadAudio("assets/Sounds/TotemLightPickup.wav");
    
    gEngine.Textures.loadTexture(this.kHero);
};

GameLevel_01.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.Textures.unloadTexture(this.kHero);
    
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
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
    gEngine.Textures.unloadTexture(this.kHealthBar);
    gEngine.Textures.unloadTexture(this.kLightBar);
    gEngine.Textures.unloadTexture(this.kLightSprite);
    gEngine.Textures.unloadTexture("assets/TreeGreen.png");
    gEngine.Textures.unloadTexture("assets/TreeBlue.png");
    gEngine.Textures.unloadTexture("assets/TreeYellow.png");
    
    gEngine.Textures.unloadTexture("assets/TreeSmallYellow.png");
    gEngine.Textures.unloadTexture("assets/TreeSmallBlue.png");
    gEngine.Textures.unloadTexture("assets/TreeSmallGreen.png");

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBgMusic);
    gEngine.AudioClips.unloadAudio(this.kTotemLightPulse);
    gEngine.AudioClips.unloadAudio("assets/Sounds/TotemLightHit.wav");
    gEngine.AudioClips.unloadAudio("assets/Sounds/TotemLightJump.wav");
    gEngine.AudioClips.unloadAudio("assets/Sounds/TotemLightPickup.wav");


    if (this.mRestart === true)
    {
        var nextLevel = new GameOver();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        var nextLevel = new GameLevel_Boss("LevelBoss");  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

GameLevel_01.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    gEngine.AudioClips.playBackgroundAudio(this.kBgMusic);

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

    var d = parser.parseDoors(this.kDoorTop, this.kDoorBot, this.kDoorSleeve, this.mGlobalLightSet);
    for (i = 0; i < d.length; i++) {
        this.mAllDoors.addToSet(d[i]);
    }
    
    var t = parser.parseTrees(this.kTree, this.mGlobalLightSet);
    for (i = 0; i < t.length; i++) {
        this.mAllTrees.addToSet(t[i]);
    }

    var b = parser.parseButtons(this.kButton, this.mGlobalLightSet);
    for (i = 0; i < b.length; i++) {
        this.mAllButtons.addToSet(b[i]);
        
        //Light Projectile
        var tempProjectile = new DoorParticle(this.kParticle);
        this.mAllLightProjectiles.push(tempProjectile);
        
        
        var button = this.mAllButtons.getObjectAt(i).getXform();
            
        var xform = this.mAllLightProjectiles[i].getXform();
        xform.setPosition(button.getXPos(), button.getYPos());
        this.mAllLightProjectiles[i].mInterpolate.setCurrentValue(xform.getPosition());
    }
    
    var j;
    for(i = 0; i < this.mAllTrees.size(); i++)
    {
        for(j = 0; j < this.mAllButtons.size(); j++)
        {
            this.mAllTrees.getObjectAt(i).mTree.addLight(this.mAllButtons.getObjectAt(j).mSpotlight);
        }
    }


    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    for (i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }

    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }

        // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHero, 0, 6, this.mGlobalLightSet, this.kHealthBar, this.kLightBar); // 2, 6
    
    this.mAllDarkCreeps[0] = new DarkCreep(this.kHeroSprite, null, 5, 13, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[1] = new DarkCreep(this.kHeroSprite, null, 54, 15, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[2] = new DarkCreep(this.kHeroSprite, null, 70, 15, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[3] = new DarkCreep(this.kHeroSprite, null, 108, 13, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[4] = new DarkCreep(this.kHeroSprite, null, 128, 13, this.mGlobalLightSet, this.mIllumHero);
    //new creep
    this.mAllDarkCreeps[5] = new DarkCreep(this.kHeroSprite, null, 159, 8, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[6] = new DarkCreep(this.kHeroSprite, null, 174, 4, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[7] = new DarkCreep(this.kHeroSprite, null, 184, 16, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[8] = new DarkCreep(this.kHeroSprite, null, 198, 4, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[9] = new DarkCreep(this.kHeroSprite, null, 215, 8, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[10] = new DarkCreep(this.kHeroSprite, null, 228, 6, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[11] = new DarkCreep(this.kHeroSprite, null, 271, 8, this.mGlobalLightSet, this.mIllumHero);
    this.mAllDarkCreeps[12] = new DarkCreep(this.kHeroSprite, null, 292, 6, this.mGlobalLightSet, this.mIllumHero);
//    
    
    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addHeroToSet(this.mIllumHero);
    }
    
    this.mNextLevel = parser.parseNextLevel();


    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    for(i = 0; i < this.mAllDarkCreeps.length; i++) {
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mAllDarkCreeps[i]);
    }
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    
    
    this.mBarCam = new Camera(
            vec2.fromValues(0,0),
            100,
            [0,650, 1280,70]
            );
    this.mBarCam.setBackgroundColor([0, 0, 0, 1]);
    
    this.mHintCam = new Camera(
            vec2.fromValues(0, 0),
            20,
            [0, 0, 250, 180],
            2
            );
    this.mShowHint = true;
    
    var xf = this.mIllumHero.getXform();
    var p = vec2.clone(xf.getPosition());
    this.mHintCam.setWCCenter(p[0], p[1]);
    
    //this.mLightSprite = new LightSprite(this.kLightSprite);
    this.mAllLightSprites[0] = new LightSprite(this.kLightSprite, 10, 6);
    this.mAllLightSprites[1] = new LightSprite(this.kLightSprite, 40, 16);
    this.mAllLightSprites[2] = new LightSprite(this.kLightSprite, 47, 12);
    this.mAllLightSprites[3] = new LightSprite(this.kLightSprite, 100, 4 );
    this.mAllLightSprites[4] = new LightSprite(this.kLightSprite, 120, 16);
    this.mAllLightSprites[5] = new LightSprite(this.kLightSprite, 223, 8);
    
    
    
    this.mLightProjectile = new ChaserMinion(0,10, [0,1,0], 3, 2, this.kMinionSprite, null, this.mGlobalLightSet, 1, 1);
    this.mLightProjectile.setVisibility(false);
    this.mLightProjectile.setSpeed(0.1);
    
    this.mHealthMsg = new FontRenderable("Health");
    this.mHealthMsg.setColor([1, 1, 1, 1]);
    this.mHealthMsg.getXform().setPosition(-48, 0);
    this.mHealthMsg.setTextHeight(3);

    this.mLightMsg = new FontRenderable("Light");
    this.mLightMsg.setColor([1, 1, 1, 1]);
    this.mLightMsg.getXform().setPosition(-13, 0);
    this.mLightMsg.setTextHeight(3);
    
    
        
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_01.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mAllParticles.draw(this.mCamera);        
    
    //this.mLightSprite.draw(this.mCamera);
    for(var i = 0; i < this.mAllLightSprites.length; i++) {
        this.mAllLightSprites[i].draw(this.mCamera);
    }
    
    this.mLightProjectile.draw(this.mCamera);
    
    if(this.mShowHint)
    {
        this.mHintCam.setupViewProjection();
        gEngine.LayerManager.drawAllLayers(this.mHintCam);
        
        this.mAllParticles.draw(this.mHintCam);

        //this.mLightSprite.draw(this.mHintCam);
        for(var i = 0; i < this.mAllLightSprites.length; i++) {
    	    this.mAllLightSprites[i].draw(this.mHintCam);
        }
        this.mLightProjectile.draw(this.mHintCam);
        
    }
    
    
    this.mBarCam.setupViewProjection();
    this.mIllumHero.getHealthBar().draw(this.mBarCam);
    this.mIllumHero.getLightBar().draw(this.mBarCam);
    this.mHealthMsg.draw(this.mBarCam);
    this.mLightMsg.draw(this.mBarCam);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_01.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mBarCam.update();
    

    
    gEngine.LayerManager.updateAllLayers();

    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(xf.getXPos(), 10);
    var p = vec2.clone(xf.getPosition());
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);
    this.mAllParticles.update();
    this.mAllButtons.update();

    if(this.mShowHint)
    {
        this.mHintCam.update();
    }

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R))
    {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M))
    {
        this.mShowHint = !this.mShowHint;
    }

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
        if (collided && gEngine.Input.isKeyClicked(gEngine.Input.keys.X) && !this.mAllButtons.getObjectAt(i).getButtonState()) {
            
            if(this.mIllumHero.getLightBar().canActivatePuzzle())
            {
             this.mAllButtons.getObjectAt(i).pressButton();
             this.mIllumHero.getLightBar().decreaseBar();
             gEngine.AudioClips.playACue(this.kTotemLightPulse);
            }

        }
    }
    
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //Added code for lightsprite collecting
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//    collided = this.mIllumHero.getPhysicsComponent().collided(this.mLightSprite.getPhysicsComponent(), collisionInfo);
//    
//    var lightP = vec2.fromValues(0, 0);  
//    var touches = this.mIllumHero.pixelTouches(this.mLightSprite, lightP);    
//        
//    if(touches && this.mLightSprite.mIsActivated === false)
//    {
//        this.mLightSprite.setVisibility(false);
//        this.mIllumHero.getLightBar().increaseBar();
//        this.mLightSprite.mIsActivated = true;
//    }
    for(i = 0; i < this.mAllLightSprites.length; i++) {
        collided = this.mIllumHero.getPhysicsComponent().collided(this.mAllLightSprites[i].getPhysicsComponent(), collisionInfo);
    
        var lightP = vec2.fromValues(0, 0);  
        var touches = this.mIllumHero.pixelTouches(this.mAllLightSprites[i], lightP);    

        if(touches && this.mAllLightSprites[i].mIsActivated === false)
        {
            this.mAllLightSprites[i].setVisibility(false);
            this.mIllumHero.getLightBar().increaseBar();
            this.mAllLightSprites[i].mIsActivated = true;
        }
    }


    var totemUnlocked = new Array(this.mAllButtons.size());
    for (i = 0; i < this.mAllButtons.size(); i++) {
        totemUnlocked[i] = false;
    }

    for (i = 0; i < this.mAllButtons.size(); i++) {
        if (this.mAllButtons.getObjectAt(i).getButtonState()) {
            totemUnlocked[i] = true;
            this.mAllLightProjectiles[i].mInterpolate.setFinalValue(this.mAllDoors.getObjectAt(i).getXform().getPosition());    
        }
        else {
            totemUnlocked[i] = false;
        }

        if (totemUnlocked[i]) {
            //this.mAllDoors.getObjectAt(i).unlockDoor();
            //this.mAllLightProjectile[i].mActivated = true;
            //this.mCamera.panWith(this.mLightProjectile.getXform(), 0.4);
            //this.mLightProjectile.update(this.mAllDoors.getObjectAt(i));
            
            if(this.mAllLightProjectiles[i].mActivated === false)
            {

               this.mHintCam.panWith(this.mAllLightProjectiles[i].getXform(), 0.7);
            }
            
            //this.mAllLightProjectiles[i].update(this.mAllDoors.getObjectAt(i));


            this.mAllLightProjectiles[i].update(this.mAllDoors.getObjectAt(i));
            
            //collided = this.mLightProjectile.getPhysicsComponent().collided(this.mAllDoors.getObjectAt(i).getPhysicsComponent(), collisionInfo);
            //collided = this.mAllLightProjectiles[i].getPhysicsComponent().collided(this.mAllDoors.getObjectAt(i).getPhysicComponent(),collisionInfo);
            collided = this.mAllLightProjectiles[i].getPhysicsComponent().collided(this.mAllDoors.getObjectAt(i).getPhysicsComponent(), collisionInfo);

            
            
            //var p = this.createParticle(this.mLightProjectile.getXform().getXPos(), this.mLightProjectile.getXform().getYPos());
            var p = this.mAllLightProjectiles[i].createParticle(this.mAllLightProjectiles[i].getXform().getXPos(), this.mAllLightProjectiles[i].getXform().getYPos());
            
            
            this.mAllParticles.addToSet(p);
            if(collided)
            {
                //this.mLightProjectile.setVisibility(false);
                this.mAllDoors.getObjectAt(i).unlockDoor();
                
                if(this.mWatchDoorTimer < this.mWatchDoor)
                {
                    this.mWatchDoorTimer++;
                }
                else
                {
                    //this.mCamera.panTo(this.mOriginalCamPos[0], this.mOriginalCamPos[1]);
                    //this.mCamera.setWCCenter(xf.getXPos(), 10);
                    
                    if(this.mAllLightProjectiles[i].mActivated === false)
                    {
                        if(this.mAllButtons.size() !== i + 1)
                        {
                            var lightPos = vec2.clone(this.mAllButtons.getObjectAt(i+1).getXform().getPosition());
                            this.mHintCam.panTo(lightPos[0], lightPos[1]);                            
                        }
                    }
                    //this.mHintCam.setWCCenter(lightPos[0], lightPos[1]);
                    this.mAllLightProjectiles[i].mActivated = true;
                    this.mAllParticles.removeFromSet(p);
                    this.mWatchDoorTimer = 0;
                    
                }
                
            }
        }
    }
    
    if(this.mIllumHero.getHealthBar().getBarSize() === 0) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    
    if(xf.getXPos() >= 52 && xf.getXPos() < 75 && xf.getYPos() < -10) {
        xf.setPosition(52, 15);
        this.mIllumHero.hitTaken(0);
        
    }
    else if(xf.getXPos() >= 75 && xf.getXPos() < 100 && xf.getYPos() < -10) {
        xf.setPosition(76, 15);
        this.mIllumHero.hitTaken(0);

    }
    else if(xf.getXPos() >= 100 && xf.getXPos() < 150 && xf.getYPos() < -10) {
        xf.setPosition(99, 15);
        this.mIllumHero.hitTaken(0);

    }
    else if(xf.getXPos() >= 150 && xf.getXPos() < 205 && xf.getYPos() < -10) {
        xf.setPosition(146, 15);
        this.mIllumHero.hitTaken(0);

    }
    else if(xf.getXPos() >= 233 && xf.getXPos() < 292 && xf.getYPos() < -10) {
        xf.setPosition(230, 15);
        this.mIllumHero.hitTaken(0);

    }
    
    if(this.mIllumHero.getXform().getXPos() > 308)
    {
        this.mRestart = false;
        gEngine.GameLoop.stop();
    }
};

GameLevel_01.prototype._physicsSimulation = function () {

    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);
    var i;
    for(i = 0; i < this.mAllDarkCreeps.length; i++) {
    gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllWalls);
    gEngine.Physics.processObjSet(this.mAllDarkCreeps[i], this.mAllDoors);
}
    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllWalls);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllDoors);

};

GameLevel_01.prototype.createParticle = function(atX, atY) {
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
