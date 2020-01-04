/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Scene, gEngine, vec2 */

function BossLevel(aHero, showAnimation) {
    //this.kTestTexture = "assets/TestTexture.png";
    this.kSceneObj = "assets/SceneObjects.png";
    this.kPlatTexture = "assets/platform.png";
    this.kBrokenTexture = "assets/broken.png";
    this.kYouDied = "assets/YouDied.png";
    this.kBullet = "assets/bullet.png";
    this.kHero = "assets/EmptyAction.png";
    this.kSeed = "assets/dreamSeed.png";
    this.kBoss = "assets/Dreamer.png";
    this.kBossBullet = "assets/dbullet.png";
    this.kDialog = "assets/Dialogs.png";
    //the hint
    this.kPaper = "assets/clue_s.png";
    this.kContent = "assets/clue_b3.png";
    this.kIce = "assets/RigidShape/Ice.png";
    
    this.kBossBGM = "assets/Sound/bossBGM.mp3";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    this.mHero = aHero ? aHero : null;
    this.mBoss = null;
    this.mPlatSet = new GameObjectSet();

    this.mPaperBall = null;
    this.mPaper = null;
    this.mSeed = null; //梦想之种
    this.mSentence = new GameObjectSet(); //sentence

    //Trap
    this.mTraps = new GameObjectSet();
    this.mTrapP = null;

    //判断camera shake 
    this.mShake = false;
    //Tools
    this.mSolveCol = null;
    this.mShowDeath = null;
    this.mShowAnim = showAnimation ? showAnimation : false;
}
gEngine.Core.inheritPrototype(BossLevel, Scene);

BossLevel.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kSceneObj);
    gEngine.Textures.loadTexture(this.kPlatTexture);
    gEngine.Textures.loadTexture(this.kBrokenTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kSeed);
    gEngine.Textures.loadTexture(this.kBoss);
    gEngine.Textures.loadTexture(this.kBossBullet);
    if (this.mShowAnim) gEngine.Textures.loadTexture(this.kDialog);

    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kContent);
    gEngine.Textures.loadTexture(this.kIce);
};

BossLevel.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kSceneObj);
    gEngine.Textures.unloadTexture(this.kPlatTexture);
    gEngine.Textures.unloadTexture(this.kBrokenTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kSeed);
    gEngine.Textures.unloadTexture(this.kBoss);
    gEngine.Textures.unloadTexture(this.kBossBullet);
    if (this.mShowAnim) gEngine.Textures.unloadTexture(this.kDialog);

    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kContent);
    gEngine.Textures.unloadTexture(this.kIce);
    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(gEngine.Mine.restartLevel(), true);
    } else {
        gEngine.Core.changeScene(new EndScene(), false);
    }
};

BossLevel.prototype.initialize = function () {
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
    this.mBoss = new Boss(this.kBoss, this.kBossBullet, this.kSceneObj, 370, -150, 295.4, 179.2, this.mHero.getXform().getPosition());
    if (!this.mShowAnim) {
        this.mBoss.setVisibility(true);
        this.mBoss.mUIbar.setVisible(true);
        this.mBoss.setMoveTo(350, 80);
        this.mBoss.mMoveStatus = 0;
    }

    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -600, -76.25, 60, 780)); //0
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 600, 0, 60, 675));  //1
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, -337.5, 1800, 60)); //2
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 337.5, 1400, 60, true)); //3

    //platforms
    //this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 65, -200, 270, 30)); 
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -350, -100, 100, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -140, 50, 100, 30));
    //this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, 200, 240, 30)); 

    if (this.mShowAnim) {
        this.mPaperBall = new Platform(this.kPaper, -250, -290, 30, 30); //纸团
        this.mPaper = new Platform(this.kContent, 0, 0, 1000, 500);//纸团内容
        this.mPaper.setVisibility(false);

        //seed
        this.mSeed = new Platform(this.kSeed, 300, -210, 100, 50);   //seed
        //sentence
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 45, -180, 271, 115, [0, 542, 1300, 1530]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 50, -185, 271, 117, [0, 542, 1814, 2048]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 40, -190, 271, 138.5, [0, 542, 1536, 1813]));

        this.mSentence.addToSet(new SpriteObj(this.kDialog, 100, 0, 270, 152, [545, 1085, 1744, 2048]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 90, -10, 270, 166.5, [561, 1101, 1409, 1742]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 100, 10, 270, 166.5, [561, 1101, 1074, 1407]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 95, -20, 270, 167, [1087, 1627, 1714, 2048]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 110, 15, 270, 166.5, [1103, 1643, 1379, 1712]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 90, -10, 270, 166.5, [1103, 1643, 1044, 1377]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 100, 0, 270, 166.5, [561, 1101, 739, 1072]));
        this.mSentence.addToSet(new SpriteObj(this.kDialog, 100, 10, 270, 164, [1103, 1643, 712, 1040]));
        for (var i = 0; i < this.mSentence.size(); i++) {
            this.mSentence.getObjectAt(i).setVisibility(false);
        }
    }

    //traps
    this.mTraps.addToSet(new Platform(this.kIce, -250, -290, 40, 40));//打开纸团
    for (var i = 0; i < this.mTraps.size(); i++) {
        this.mTraps.getObjectAt(i).setVisibility(false);
    }//set invisible

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null, this.mBoss, this.mPlatSet.mSet, [], []);
    this.mTrapP = new BossTrap(this.mTraps, this.mHero, this.mPlatSet, null, this.mSentence, this.mBoss, this.mSeed, [this.mPaper, this.mPaperBall]);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mPlatSet.draw(this.mCamera);
    this.mBoss.draw(this.mCamera);
    this.mHero.draw(this.mCamera);

    if (this.mPaper) {
        this.mSeed.draw(this.mCamera);
        this.mSentence.draw(this.mCamera);
        this.mPaperBall.draw(this.mCamera);
        this.mPaper.draw(this.mCamera);
    }

    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

BossLevel.prototype.update = function () {
    if (this.mBoss.isVisible() && !this.mShake) {
        this.mCamera.shake(80, 80, 20, 30);
        this.mShake = true;
        if (!gEngine.AudioClips.isBackgroundAudioPlaying()) {
            gEngine.AudioClips.playBackgroundAudio(this.kBossBGM);
            gEngine.AudioClips.incBackgroundVolume(-2);
        }
    }

    /*if (gEngine.Input.isKeyPressed(gEngine.Input.keys.O) && gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
     gEngine.Mine.letsCheat();
     }*/
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        gEngine.Mine.incDeath();
        this.LevelSelect = "restart";
        gEngine.GameLoop.stop();
    }
    gEngine.Mine.timeSpend();
    if (this.mHero.mIsDead) {
        this.mHero.update();
        this.mSolveCol.update();
        return;
    }

    //console.log(gEngine.Mine.gameStatus.finish);
    if (this.mBoss.mDeath) {
        gEngine.Mine.gameStatus.finish = true;
    }
    this.mTrapP.update();
    this.mBoss.update(this.mCamera);
    this.mHero.update();
    this.mPlatSet.update();
    this.mCamera.update();

    this.mSolveCol.update();
};