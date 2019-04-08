"use strict";

function Level1() {
    this.kLevelFile = "assets/BirdTesting/Level1.xml";
    this.kBirdTexture = "assets/Birds/bird-sketch-2.png";
    this.kBackgroundMusic = "assets/Audio/Level1BG.mp3";
    this.kBackgroundSprite = "assets/Backdrops/bg.png";
    this.mUITitle = null;
    this.mUIScore = null;
    this.mRestart = false;
    this.mQuitLevel = false;
    
    this.mCamera = null;
    this.mMiniMap = null;
    
    this.mSun = null;
    
    this.mBird = null;
    this.mEnemyOne = null;
    this.mEnemyTwo = null;
    this.mEnemyThree = null;

    this.mBirdPhysicsObjects = new GameObjectSet();
    this.mEggPhysicsObjects = new GameObjectSet();

    this.mNestSet = null;
    this.mPlatformSet = null;
    this.mEggSet = null;
    this.mTreeSet = null;
    this.mBranchSet = null;
    
    this.mScore = 0;
    this.mHomeNest = null;
    this.mGround = null;
    
    this.mPaused = false;
    
    //this.mScreenKeyboard = null;
}
gEngine.Core.inheritPrototype(Level1, Scene);


Level1.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kBirdTexture);
    gEngine.Textures.loadTexture(this.kBackgroundSprite);
    gEngine.AudioClips.loadAudio(this.kBackgroundMusic);
};

Level1.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kBirdTexture);
    gEngine.Textures.unloadTexture(this.kBackgroundSprite);
    gEngine.AudioClips.stopBackgroundAudio();
    
    if (this.mRestart === true) {
        gEngine.Core.startScene(new Level1());
    }
    else if(this.mQuitLevel) {
        gEngine.Core.startScene(new MainMenu());
    }
    else {
        gEngine.Core.startScene(new EndLevel(this.mScore, this.mEggSet.size()));
    }
};

Level1.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    
    this.mUITitle = new UIText("Level 1", [400, 560], 5, 1, 2, [0.1, 1, 1, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mUITitle);
    
    this.mUIScore = new UIText("Score: 0", [400, 540], 3, 1, 2, [1, 1, 1, 1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mUIScore);
    
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    
    this.mSun = new Light();
    this.mSun.setXPos(0);
    this.mSun.setYPos(37.5);
    this.mSun.setZPos(10);
    this.mSun.setDirection([0, 0, -1]);
    this.mSun.setNear(8);
    this.mSun.setFar(20);
    this.mSun.setColor([0.0, 1.0, 0.0, 1]);
    this.mSun.setInner(0.1);
    this.mSun.setOuter(0.2);
    this.mSun.setIntensity(50);
    //this.mSun.setLightType(Light.eLightType.eDirectionalLight);
    
    /*[20, 25, 10],         // position
            [0, 0, -1],          // Direction 
            [0.6, 1.0, 0.0, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            5,                   // intensity
            1.0                  // drop off*/
    
    this.mTreeSet = parser.parseTrees();

    this.mBranchSet = parser.parseBranches();
    for (var i = 0; i < this.mBranchSet.size(); i++) {
        this.mBirdPhysicsObjects.addToSet(this.mBranchSet.getObjectAt(i));
        this.mEggPhysicsObjects.addToSet(this.mBranchSet.getObjectAt(i));
    }
    
    this.mNestSet = parser.parseNests(this.kBirdTexture);
    for (var i = 0; i < this.mNestSet.size(); i++) {
        if(this.mNestSet.getObjectAt(i).getHomeNest()){
            this.mHomeNest = this.mNestSet.getObjectAt(i);
        }
        
        this.mNestSet.getObjectAt(i).addRigidBodiesToSet(this.mBirdPhysicsObjects);
        this.mNestSet.getObjectAt(i).addRigidBodiesToSet(this.mEggPhysicsObjects);
    }
    
    this.mMiniMap = parser.parseMiniMap(this.kLevelFile);
    
    this.mPlatformSet = parser.parseRenderablePlatform();
    for (var i = 0; i < this.mPlatformSet.size(); i++) {
        if(this.mPlatformSet.getObjectAt(i).getGround()){
            this.mGround = this.mPlatformSet.getObjectAt(i);
        }
        this.mBirdPhysicsObjects.addToSet(this.mPlatformSet.getObjectAt(i));
        this.mEggPhysicsObjects.addToSet(this.mPlatformSet.getObjectAt(i));
    }
    
    this.mEggSet = parser.parseEggs(this.kBirdTexture);
    for (var i = 0; i < this.mEggSet.size(); i++) {
        this.mEggPhysicsObjects.addToSet(this.mEggSet.getObjectAt(i));
    }

    this.mBird = new PlayerBird(this.kBirdTexture, this.mNestSet.concat(this.mPlatformSet) ,this.mEggSet);
    this.mBird.getXform().setPosition(40, 15);
    this.mBird.mSprite.setColor([1,1,1,1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mBird);
    this.mBirdPhysicsObjects.addToSet(this.mBird);
    this.mBird.getRenderable().addLight(this.mSun);
    
    this.mEnemyOne = new EnemyBird(this.kBirdTexture, this.mBird, [-50, -10], [40, 30]);
    //this.mTestEnemy.setDrawRigidShape(true);
    this.mEnemyOne.getXform().setPosition(-50, 0);
    this.mEnemyOne.mSprite.setColor([1,1,1,1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyOne);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyOne);
    
    this.mEnemyTwo = new EnemyBird(this.kBirdTexture, this.mBird, [50, 55], [40, 40]);
    //this.mTestEnemy.setDrawRigidShape(true);
    this.mEnemyTwo.getXform().setPosition(50, 55);
    this.mEnemyTwo.mSprite.setColor([1,1,1,1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyTwo);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyTwo);
    
    this.mEnemyThree = new EnemyBird(this.kBirdTexture, this.mBird, [-45, 90], [40, 40]);
    //this.mTestEnemy.setDrawRigidShape(true);
    this.mEnemyThree.getXform().setPosition(-45, 90);
    this.mEnemyThree.mSprite.setColor([1,1,1,1]);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mEnemyThree);
    this.mBirdPhysicsObjects.addToSet(this.mEnemyThree);
    
    var icon = new MiniIcon(this.kBirdTexture, this.mBird.getXform());
    SpriteRenderable.prototype.setElementPixelPositions.call(icon, 768, 896, 896, 1024);
    SpriteRenderable.prototype.getXform.call(icon).setSize(20, 20);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eMiniMap, icon);
    
    // Move the egg in front of the bird
    for (var i = 0; i < this.mEggSet.size(); i++) {
        gEngine.LayerManager.moveToLayerFront(gEngine.eLayer.eActors, this.mEggSet.getObjectAt(i));
    }    
    
    this.mBackground = new TextureRenderable(this.kBackgroundSprite);
    this.mBackground.getXform().setPosition(0, 50);
    this.mBackground.getXform().setSize(450, 450);
    //gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mBird);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBackgroundMusic);
};

Level1.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 1.0]);

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    
    this.mMiniMap.setupViewProjection();
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eBackground, this.mMiniMap);
    gEngine.LayerManager.drawLayer(gEngine.eLayer.eMiniMap, this.mMiniMap);
    //gEngine.LayerManager.drawLayer(gEngine.eLayer.eActors, this.mMiniMap);
};

Level1.prototype.update = function () {    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mQuitLevel = true;
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        if(this.mPaused){
            this.mPaused = false;
            this.mUITitle.setText("Level 1");
        }
        else {
            this.mPaused = true;
                this.mUITitle.setText("PAUSED");
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.M)) {
            this.mMiniMap.show();
        } else {
            this.mMiniMap.hide();
        }
    
    this.mUIScore.setText("Goal: Collect Eggs and place them in the Green Nest");
    
    if (!this.mPaused) {
        gEngine.LayerManager.updateAllLayers();
        gEngine.Physics.processCollision(this.mBirdPhysicsObjects, []);
        gEngine.Physics.processCollision(this.mEggPhysicsObjects, []);

        this.mUIScore.setText("Score: " + this.mScore);

        for (var i = 0; i < this.mEggSet.size(); i++) {
            var status = this.mEggSet.getObjectAt(i).checkIfHome(this.mHomeNest);
            if (status && this.mEggSet.getObjectAt(i).isInPlay()) {
                this.mScore++;
                this.mEggSet.getObjectAt(i).setNotInPlay(Egg.status.SCORE);
            } 
            else {
                status = this.mEggSet.getObjectAt(i).checkIfOnGround(this.mGround);
                if (status) {
                    this.mEggSet.getObjectAt(i).setNotInPlay(Egg.status.GROUNDED);
                }
            }
        }

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

        this.mCamera.panTo(this.mBird.getXform().getXPos(), this.mBird.getXform().getYPos());
        this.mCamera.update();
    }
    
};