/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FirstLevel(aHero) {
    //this.kTestTexture = "assets/TestTexture.png";
    this.kSceneObj = "assets/SceneObjects.png";
    this.kPlatTexture = "assets/platform.png";
    this.kBrokenTexture = "assets/broken.png";
    this.kYouDied = "assets/YouDied.png";
    this.kBullet = "assets/bullet.png";
    this.kHero = "assets/EmptyAction.png";
    this.kSentences = "assets/sentences.png";
    this.kSentences2 = "assets/sentences2.png";
    this.kSceneObj2 = "assets/SceneObjects2.png";
    this.kWall = "assets/Wall_Level1.png";
    
    //this.kStabTexture = "assets/TestStab.png";
    //this.kWood = "assets/RigidShape/Wood.png";
    //this.kIce = "assets/RigidShape/Ice.png";
    //this.kDirt = "assets/RigidShape/Dirt.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    // backGround
    this.mWall = null;
    // Objects
    this.mHero = aHero ? aHero : null;
    this.mMirrorHero = null;
    this.mPlatSet = new GameObjectSet();
    this.mBrokeSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();
    //Tools
    this.mSolveCol = null;
    this.mTips = null;
    this.mTips2 = null;
    this.mShowDeath = null;
}
gEngine.Core.inheritPrototype(FirstLevel, Scene);

FirstLevel.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kSceneObj);
    gEngine.Textures.loadTexture(this.kPlatTexture);
    gEngine.Textures.loadTexture(this.kBrokenTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kSentences);
    gEngine.Textures.loadTexture(this.kSentences2);
    gEngine.Textures.loadTexture(this.kSceneObj2);
    gEngine.Textures.loadTexture(this.kWall);
    //gEngine.Textures.loadTexture(this.kStabTexture);
    //gEngine.Textures.loadTexture(this.kWood);
    //gEngine.Textures.loadTexture(this.kIce);
    //gEngine.Textures.loadTexture(this.kDirt);
};

FirstLevel.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kSceneObj);
    gEngine.Textures.unloadTexture(this.kPlatTexture);
    gEngine.Textures.unloadTexture(this.kBrokenTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kSentences);
    gEngine.Textures.unloadTexture(this.kSentences2);
    gEngine.Textures.unloadTexture(this.kSceneObj2);
    gEngine.Textures.unloadTexture(this.kWall);
    //gEngine.Textures.unloadTexture(this.kStabTexture);
    //gEngine.Textures.unloadTexture(this.kWood);
    //gEngine.Textures.unloadTexture(this.kIce);
    //gEngine.Textures.unloadTexture(this.kDirt);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(gEngine.Mine.restartLevel(), true);
    }
    if (this.LevelSelect === "SecondLevel") {
        //console.log("-------");
        gEngine.Mine.saveStatus.finishFirst = true;
        gEngine.Mine.restartLevel = () => new SecondLevel();
        gEngine.Core.changeScene(new SecondLevel(this.mHero, true), false);
    }
};

FirstLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    if (this.mHero === null)
        this.mHero = new Hero(this.kHero, this.kBullet, -500, -200, 1);
    else
        this.mHero.cleanStatus(this.mCamera);
    //this.mMirrorHero = new Hero(this.kHero, this.kBullet, 500, 200, -1);
    //
    //wall
    this.mWall = new Platform(this.kWall,0, 0, 1200, 675);
    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -600, -76.25, 60, 580, true));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 600, 0, 60, 675, true));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, -337.5, 600, 60));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 337.5, 1400, 60, true));

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 65, -180, 270, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 390, -240, 150, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 455, 60, 140, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 100, 200, 130, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -140, 140, 180, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -500, 200, 280, 30));

    //broken platforms
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, -375, 261.25, 40, 81));

    //stabs
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 4, -350, -307.5, false, false));
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 50, -165, false, false));

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, this.mMirrorHero, null, this.mPlatSet.mSet, this.mBrokeSet.mSet, this.mStabSetSet.mSet);
    this.mTips = new Sentence(this.kSentences,this.kSceneObj2,this.kSentences2);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);
    
    gEngine.Mine.timeStart();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
FirstLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
	
    this.mWall.draw(this.mCamera);
    this.mTips.draw(this.mCamera);
    
    this.mStabSetSet.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBrokeSet.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    //this.mHero.drawBBox(this.mCamera);
    //this.mMirrorHero.draw(this.mCamera);
    //this.mMirrorHero.drawBBox(this.mCamera);

    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

FirstLevel.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.LevelSelect = "SecondLevel";
        gEngine.GameLoop.stop();
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.O) && gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        gEngine.Mine.letsCheat();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        gEngine.Mine.incDeath();
        this.LevelSelect = "restart";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingLeft) {
        this.LevelSelect = "SecondLevel";
        gEngine.GameLoop.stop();
    }
    gEngine.Mine.timeSpend();
    if (this.mHero.mIsDead) {
        this.mHero.update();
        this.mSolveCol.update();
        return;
    }

    this.mStabSetSet.update();
    this.mHero.update();
    //this.mMirrorHero.update();
    this.mPlatSet.update();
    this.mBrokeSet.update();

    this.mTips.update(this.mHero.getXform());
    this.mSolveCol.update();
};