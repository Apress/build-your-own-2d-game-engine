"use strict";

function BirdCreek() {
    this.kLevelFile = "assets/BirdCreek/BirdCreek.xml";
    this.kBirdTexture = "assets/Birds/bird-sketch-3.png";
    this.kBirdNormal = "assets/Birds/bird-sketch-3-normal.png";
    this.kBirdFeatherTexture = "assets/Birds/feather.png";
    this.kHeartTexture = "assets/BirdCreek/heart.png";
    this.kBackgroundFile = "assets/BirdCreek/bg.png";
    this.kForegroundFile = "assets/BirdCreek/fg.png";
    this.kBackgroundMusic = "assets/Audio/EggCollector.mp3";
    this.kEggGrabSound = "assets/Audio/drop.mp3";
    this.kEggReleaseSound = "assets/Audio/drop.mp3";
    this.kEggHomeSound = "assets/Audio/whistle.mp3";
    
    this.cStartingSunAngle = 135;
    this.cMaxSunAngle = 225;
    
    this.mUITitle = null;
    this.mUIScore = null;
    this.mUIRemainder = null;
    this.mRestart = false;
    this.mPaused = false;
    
    this.mForestSun = null;
    this.mSunset = null;
    
    this.mCamera = null;
    this.mMiniMap = null;
    this.mBird = null;

    this.mBirdPhysicsObjects = new GameObjectSet();
    this.mEggPhysicsObjects = new GameObjectSet();
    
    this.mBirdPlatformSet = new GameObjectSet();

    this.mNestSet = null;
    this.mPlatformSet = null;
    this.mEggSet = null;
    this.mAllParticles = null;
    
    this.mEnemyBird = null;
    this.mEnemyBirdTwo = null;
    this.mEnemyBirdThree = null;
    this.mEnemyBirdFour = null;
    this.mEnemyBirdFive = null;
    
    this.mScore = 0;
    this.mRemainingEggs = 0;
    this.mHomeNest = null;
    this.mGround = null;
    
    this.mSunFluctuation = 5;
    this.mSunRange = this.cStartingSunAngle;
}
gEngine.Core.inheritPrototype(BirdCreek, Scene);


BirdCreek.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kBirdTexture);
    gEngine.Textures.loadTexture(this.kBirdNormal);
    gEngine.Textures.loadTexture(this.kBirdFeatherTexture);
    gEngine.Textures.loadTexture(this.kBackgroundFile);
    gEngine.Textures.loadTexture(this.kForegroundFile);
    gEngine.Textures.loadTexture(this.kHeartTexture);
    gEngine.AudioClips.loadAudio(this.kBackgroundMusic);
    gEngine.AudioClips.loadAudio(this.kEggGrabSound);
    gEngine.AudioClips.loadAudio(this.kEggReleaseSound);
    gEngine.AudioClips.loadAudio(this.kEggHomeSound);
};

BirdCreek.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kBirdTexture);
    gEngine.Textures.unloadTexture(this.kBirdNormal);
    gEngine.Textures.unloadTexture(this.kBirdFeatherTexture);
    gEngine.Textures.unloadTexture(this.kBackgroundFile);
    gEngine.Textures.unloadTexture(this.kForegroundFile);
    gEngine.Textures.unloadTexture(this.kHeartTexture);
    gEngine.AudioClips.unloadAudio(this.kEggGrabSound);
    gEngine.AudioClips.unloadAudio(this.kEggReleaseSound);
    gEngine.AudioClips.unloadAudio(this.kEggHomeSound);
    
    if (this.mRestart) {
        gEngine.Core.startScene(new BirdCreek());
    }
    else if (this.mSwitchLevel){
        gEngine.Core.startScene(new MainMenu());
    }
    else {
        gEngine.Core.startScene(new EndLevel(this.mScore, this.mEggSet.size()));
    }
};

BirdCreek.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mForestSun = new Light();
    this.mForestSun.setLightType(Light.eLightType.eSpotLight);
    this.mForestSun.setXPos(0);
    this.mForestSun.setYPos(-40);
    this.mForestSun.setZPos(0);
    this.mForestSun.setDirection([0, -1, 0]);
    this.mForestSun.setNear(1);
    this.mForestSun.setFar(800);
    this.mForestSun.setColor([1, 1, 1, 1]);
    this.mForestSun.setInner(Math.PI);
    this.mForestSun.setOuter(Math.PI);
    this.mForestSun.setIntensity(1);
    
    this.mSunset = new Light();
    this.mSunset.setLightType(Light.eLightType.eSpotLight);
    this.mSunset.setXPos(0);
    this.mSunset.setYPos(-40);
    this.mSunset.setZPos(0);
    this.mSunset.setDirection([0, 1, 0]);
    this.mSunset.setNear(1);
    this.mSunset.setFar(800);
    this.mSunset.setColor([0.45, 0.005, 0.0, 1]);
    this.mSunset.setInner(Math.PI);
    this.mSunset.setOuter(Math.PI);
    this.mSunset.setIntensity(4);
    
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    
    this.mNestSet = parser.parseNests(this.kBirdTexture, this.kBirdNormal);
    for (var i = 0; i < this.mNestSet.size(); i++) {
        var nest = this.mNestSet.getObjectAt(i);
        if(nest.getHomeNest()){
            this.mHomeNest = nest;
        }
        this.mBirdPlatformSet.addToSet(nest);
        this.mBirdPhysicsObjects.addToSet(nest.getRigidBodies()[0]);
        nest.addRigidBodiesToSet(this.mEggPhysicsObjects);
        nest.getRenderable().addLight(this.mSunset);
        nest.getRenderable().addLight(this.mForestSun);
    }
    
    this.mMiniMap = parser.parseMiniMap(this.kLevelFile);
    
    // Step C: the far Background
    var bgR = new TextureRenderable(this.kBackgroundFile);
    bgR.getXform().setSize(200, 200);
    bgR.getXform().setPosition(-300, 5);
    bgR.getXform().setZPos(-10);
    this.mBg = new ParallaxGameObject(bgR, 10, this.mCamera);
    this.mBg.setCurrentFrontDir([0, -1, 0]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBg);
    
    // Main Level Art
    this.mFg = new TextureRenderable(this.kForegroundFile);
    this.mFg.getXform().setSize(800, 200);
    this.mFg.getXform().setPosition(0, 0);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, this.mFg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eMiniMap, this.mFg);
    
    this.mPlatformSet = parser.parseRenderablePlatform();
    for (var i = 0; i < this.mPlatformSet.size(); i++) {
        if(this.mPlatformSet.getObjectAt(i).getGround()){
            this.mGround = this.mPlatformSet.getObjectAt(i);
            this.mBirdPlatformSet.addToSet(this.mPlatformSet.getObjectAt(i));
        }
        this.mBirdPhysicsObjects.addToSet(this.mPlatformSet.getObjectAt(i));
        this.mEggPhysicsObjects.addToSet(this.mPlatformSet.getObjectAt(i));
    }
    
    this.mEggSet = parser.parseEggs(this.kBirdTexture, this.kBirdNormal);
    this.mRemainingEggs = this.mEggSet.size();

    for (var i = 0; i < this.mEggSet.size(); i++) {
        var egg = this.mEggSet.getObjectAt(i);
        this.mEggPhysicsObjects.addToSet(egg);
        egg.getRenderable().addLight(this.mForestSun);
        egg.getRenderable().addLight(this.mSunset);
    }

    this.mBird = new PlayerBird(this.kBirdTexture, this.mNestSet.concat(this.mBirdPlatformSet) ,this.mEggSet, this.kBirdNormal);
    this.mBird.getXform().setPosition(-340, -45);
    this.mBird.setGrabSound(this.kEggGrabSound);
    this.mBird.setReleaseSound(this.kEggReleaseSound);
    this.mBird.setWingPower([160, 160]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mBird);
    this.mBirdPhysicsObjects.addToSet(this.mBird);
    this.mBird.getRenderable().addLight(this.mForestSun);
    this.mBird.getRenderable().addLight(this.mSunset);
    
    var icon = new MiniIcon(this.kBirdTexture, this.mBird.getXform());
    SpriteRenderable.prototype.setElementPixelPositions.call(icon, 0, 512, 1536, 2048);
    SpriteRenderable.prototype.getXform.call(icon).setSize(20, 20);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eMiniMap, icon);
    
    // Move the egg in front of the bird
    for (var i = 0; i < this.mEggSet.size(); i++) {
        gEngine.LayerManager.moveToLayerFront(gEngine.eLayer.eActors, this.mEggSet.getObjectAt(i));
    }
    
    this.mUITitle = new UIText("Bird Creek", [400, 560], 5, 1, 2, [0.1, 1, 1, 1]);
    this.mAllParticles = new ParticleGameObjectSet();
    
    this.mEnemyBird = new EnemyBird(this.kBirdTexture, this.kBirdNormal, this.mBird, [150, 30], [70, 70], this.kBirdFeatherTexture, this.mAllParticles);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyBird);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyBird);
    this.mEnemyBird.getRenderable().addLight(this.mForestSun);
    this.mEnemyBird.getRenderable().addLight(this.mSunset);
    
    this.mEnemyBirdTwo = new EnemyBird(this.kBirdTexture, this.kBirdNormal, this.mBird, [-116, 45], [60, 60], this.kBirdFeatherTexture, this.mAllParticles);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyBirdTwo);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyBirdTwo);
    this.mEnemyBirdTwo.getRenderable().addLight(this.mForestSun);
    this.mEnemyBirdTwo.getRenderable().addLight(this.mSunset);
    
    this.mEnemyBirdThree = new EnemyBird(this.kBirdTexture, this.kBirdNormal, this.mBird, [-340, -25], [40, 40], this.kBirdFeatherTexture, this.mAllParticles);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyBirdThree);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyBirdThree);
    this.mEnemyBirdThree.getRenderable().addLight(this.mForestSun);
    this.mEnemyBirdThree.getRenderable().addLight(this.mSunset);
    
    this.mEnemyBirdFour = new EnemyBird(this.kBirdTexture, this.kBirdNormal, this.mBird, [-295, 92], [50, 50], this.kBirdFeatherTexture, this.mAllParticles);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyBirdFour);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyBirdFour);
    this.mEnemyBirdFour.getRenderable().addLight(this.mForestSun);
    this.mEnemyBirdFour.getRenderable().addLight(this.mSunset);
    
    this.mEnemyBirdFive = new EnemyBird(this.kBirdTexture, this.kBirdNormal, this.mBird, [340, 30], [90, 90], this.kBirdFeatherTexture, this.mAllParticles);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyBirdFive);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyBirdFive);
    this.mEnemyBirdFive.getRenderable().addLight(this.mForestSun);
    this.mEnemyBirdFive.getRenderable().addLight(this.mSunset);

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mUITitle);
    
    this.mUIScore = new UIText("Score: 0", [400, 540], 3, 1, 2, [1, 1, 1, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mUIScore);
    
    var remainingEggs = "Eggs Left: " + this.mEggSet.size();
    
    this.mUIRemainder = new UIText(remainingEggs, [400, 520], 3, 1, 2, [1, 1, 1, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mUIRemainder);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBackgroundMusic);
};

BirdCreek.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 1.0]);

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    this.mAllParticles.draw(this.mCamera);
    
    this.mMiniMap.setupViewProjection();
    //gEngine.LayerManager.drawLayer(gEngine.eLayer.eBackground, this.mMiniMap);
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eMiniMap, this.mMiniMap);
};

BirdCreek.prototype.update = function () {    

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        if(this.mPaused){
            this.mPaused = false;
            this.mUITitle.setText("Bird Creek");
            this.mUITitle.setColor([0.1, 1, 1, 1]);
        }
        else {
            this.mPaused = true;
            this.mUITitle.setColor([1, 1, 0.1, 1]);
            this.mUITitle.setText("PAUSED");
        }
    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
//        gEngine.GameLoop.stop();
//    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) {
        this.mSwitchLevel = true;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)) {
            this.mMiniMap.show();
        } else {
            this.mMiniMap.hide();
        } 
        
    this.mAllParticles.update();

    if (!this.mPaused) {
        gEngine.LayerManager.updateAllLayers();
        gEngine.Physics.processCollision(this.mBirdPhysicsObjects, []);
        gEngine.Physics.processCollision(this.mEggPhysicsObjects, []);

        var egg = null;
        for (var i = 0; i < this.mEggSet.size(); i++) {
            egg = this.mEggSet.getObjectAt(i);;
            if (egg.isInPlay()) {
                var status = egg.checkIfHome(this.mHomeNest);

                if (status && egg.isInPlay()) {
                    this.mScore++;
                    --this.mRemainingEggs;
                    if (this.mRemainingEggs > 0)
                        gEngine.AudioClips.playACue(this.kEggHomeSound);
                    
                    this._generateHearts(12);
                    
                    egg.setNotInPlay(Egg.status.SCORE);
                    //this.mEggSet.getObjectAt(i).setPhysicsEnabled(false);
                } else {
                    status = egg.checkIfOnGround(this.mGround);
                    if (status) {
                        this.mCamera.shake(7,7,6,5);
                        --this.mRemainingEggs;
                        egg.setNotInPlay(Egg.status.GROUNDED);
                        //this.mEggSet.getObjectAt(i).setPhysicsEnabled(false);
                    }
                }
            }
        }

        this.mUIScore.setText("Score: " + this.mScore);
        this.mUIRemainder.setText("Eggs Left: " + this.mRemainingEggs);

        gEngine.LayerManager.updateLayer(gEngine.eLayer.eMiniMap);

        //end game if all eggs collected
        var count = 0;
        for (var i = 0; i < this.mEggSet.size(); i++) {
            if (!this.mEggSet.getObjectAt(i).isInPlay()) {
                count++;
            }
        }

        if (count === this.mEggSet.size()) {
            gEngine.GameLoop.stop();
        }

        
        var x = this.mBird.getXform().getXPos();
        var y = this.mBird.getXform().getYPos();
        if (x < -340) {
            x = -340;
        } else if (x > 340) {
            x = 340;
        }
        if (y < -55) {
            y = -55;
        } else if (y > 155) {
            y = 155;
        }

        this.mCamera.panTo(x, y);
        this.mCamera.update();
    }
    
    this.mSunRange += this.mSunFluctuation * gEngine.GameLoop.getUpdateIntervalInSeconds();
    if (this.mSunRange > this.cMaxSunAngle || this.mSunRange < this.cStartingSunAngle) {
        this.mSunFluctuation *= -1;
    }
    
    this.mSunset.setInner(this.degreesToRadians(this.mSunRange));
    this.mSunset.setOuter(this.degreesToRadians(this.mSunRange));
    
    this.mForestSun.setInner(this.degreesToRadians(this.cFullCircle - this.mSunRange));
    this.mForestSun.setOuter(this.degreesToRadians(this.cFullCircle - this.mSunRange));
};

BirdCreek.prototype._generateHearts = function(hearts) {
    var xf = this.mHomeNest.getXform();
    for (var i = 0; i < hearts; i++) {
        var life = 120 + Math.random() * 60;
        var p = new ParticleGameObject(this.kHeartTexture, xf.getXPos() + 26 / hearts * i - 12, xf.getYPos(), life);
        p.getXform().setSize(5, 5);

        // size of the particle
        var r = 4 + Math.random() * 1.5;
        p.getXform().setSize(r, r);

        p.getParticle().setVelocity([0, Math.random() * 5]);
        p.getParticle().setAcceleration([0, Math.random() * 20]);

        // size delta
        p.setSizeDelta(0.999 + Math.random() * 0.002);
        
        this.mAllParticles.addToSet(p);
    }
};

BirdCreek.prototype.degreesToRadians = function(degrees) {
    return degrees * Math.PI / 180;
};