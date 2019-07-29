/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, vec2, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ThirdLevel(aHero, hasPaper) {
    //this.kTestTexture = "assets/TestTexture.png";
    this.kSceneObj = "assets/SceneObjects.png";
    this.kSceneObj2 = "assets/SceneObjects2.png";
    this.kPlatTexture = "assets/platform.png";
    this.kBrokenTexture = "assets/broken.png";
    this.kMoveTexture = "assets/moving.png";
    this.kYouDied = "assets/YouDied.png";
    this.kBullet = "assets/bullet.png";
    this.kHero = "assets/EmptyAction.png";
    this.kMirrorHero = "assets/EmptyActionR.png";
    this.kNoRoad = "assets/NoRoad.png";
    //the hint
    this.kPaper = "assets/clue_s.png";
    this.kContent = "assets/clue_b2.png";
    //this.kStabTexture = "assets/TestStab.png";
    //this.kWood = "assets/RigidShape/Wood.png";
    this.kIce = "assets/RigidShape/Ice.png";
    this.kWall = "assets/Wall_Level3.png";
    //this.kDirt = "assets/RigidShape/Dirt.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    //wall
    this.mWall = null;
    // Objects
    this.mHero = aHero ? aHero : null;
    this.mMirrorHero = null;
    //TrapProcess
    this.mTrapP = null;

    this.mPlatSet = new GameObjectSet();
    this.mBrokeSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();
    this.mTrapSet = new GameObjectSet();
    this.mNoCollisionStab = new GameObjectSet(); //不参与碰撞检测的刺
    this.mDoor = null;
    this.mButton = null;//button
    this.mPaper = null;
    this.mNoRoad = null;

    //Tools
    this.mSolveCol = null;
    this.mShowDeath = null;
    this.mHasPaper = hasPaper ? hasPaper : null;
}
gEngine.Core.inheritPrototype(ThirdLevel, Scene);

ThirdLevel.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kSceneObj);
    gEngine.Textures.loadTexture(this.kSceneObj2);
    gEngine.Textures.loadTexture(this.kPlatTexture);
    gEngine.Textures.loadTexture(this.kBrokenTexture);
    gEngine.Textures.loadTexture(this.kMoveTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kMirrorHero);
    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kContent);
    gEngine.Textures.loadTexture(this.kNoRoad);
    gEngine.Textures.loadTexture(this.kWall);
    //gEngine.Textures.loadTexture(this.kStabTexture);
    //gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);
    //gEngine.Textures.loadTexture(this.kDirt);
};

ThirdLevel.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kSceneObj);
    gEngine.Textures.unloadTexture(this.kSceneObj2);
    gEngine.Textures.unloadTexture(this.kPlatTexture);
    gEngine.Textures.unloadTexture(this.kBrokenTexture);
    gEngine.Textures.unloadTexture(this.kMoveTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kMirrorHero);
    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kContent);
    gEngine.Textures.unloadTexture(this.kNoRoad);
    gEngine.Textures.unloadTexture(this.kWall);
    //gEngine.Textures.unloadTexture(this.kStabTexture);
    //gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kIce);
    //gEngine.Textures.unloadTexture(this.kDirt);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(gEngine.Mine.restartLevel(), true);
    }
    if (this.LevelSelect === "BossLevel") {
        gEngine.Mine.restartLevel = () => new BossLevel();
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.Core.startScene(new BossLevel(null, true));
    }
    if (this.LevelSelect === "SecondLevel") {
        gEngine.Core.changeScene(new SecondLevel(this.mHero), false);
    }
};

ThirdLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    if (this.mHero === null)
        this.mHero = new Hero(this.kHero, this.kBullet, 550, -200, 1, true);
    else
        this.mHero.cleanStatus(this.mCamera);
    this.mMirrorHero = new Hero(this.kHero, this.kBullet, -460, 250, -1, true);
    //wall
    this.mWall = new Platform(this.kWall,0, 0, 1200, 675);
    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -590, 240, 30, 1400, true));//左边界 0
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 589, 200, 30, 240, true));//右边的边界 1
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -400, -635, 350, 660));//左下角平台 2
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 500, -615, 270, 700));//右下角的初始站立平台 3
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 500, 637.5, 400, 660, true));//最上面的边界 4
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -500, 637.5, 450, 660, true));//最上面的边界 5

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -490, 0, 170, 30));//左上伸出来的平台 6
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 510, 100, 130, 30, true));//右上伸出来的小平台 7
    this.mPlatSet.addToSet(new MovePlatform(this.kMoveTexture, 0, 230, 158, 32, -200, 230));//会动的平台 8
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 410, 118, 450, 94));//右上伸出来的长平台 9

    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 150, 192, 30));//门的上平台 10
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, -20, 192, 30));//门的下平台 11
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 85, 65, 30, 200));//门的右平台 12
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -85, 65, 30, 200));//门的左平台 13

    //this.mPlatSet.getObjectAt(13).setVisibility(false); //测试门用，正式版需要注释

    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 360, -20, 46, 46)); //充满刺的小平台 14
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 180, -150, 46, 46));//充满刺的小平台 15

    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -230, -550, 30, 780));//左下角竖着的长方形平台 16
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -325, -175, 180, 30));//左下角横着的 17
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -405, -232.5, 30, 145));//先消失后出现的左下角平台 18

    this.mPlatSet.getObjectAt(18).setVisibility(false);

    this.mPlatSet.addToSet(new SpriteObj(this.kSceneObj, 185, -190, 30, 30, [160, 199, 25, 64])); //120 159 25 64 小平台上的白色勾玉 19
    this.mPlatSet.addToSet(new SpriteObj(this.kSceneObj, 550, 280, 30, 30, [200, 239, 25, 64])); //120 159 25 64 小平台上的黑色勾玉 20

    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, 100, 150, 30));//移动平台下的小平台 21



    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, 385, -205, 40, 121));//用来挡住hero  0
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, 425, -165, 40, 41));//用来挡住hero   1
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, 465, -165, 40, 41));//用来挡住hero   2
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, 505, -205, 40, 121));//用来挡住hero  3
    this.mBrokeSet.getObjectAt(3).setVisibility(false);

    if (this.mHasPaper) {
        this.mPlatSet.addToSet(new Platform(this.kPaper, 434, -250, 30, 30)); //纸团 //22
        this.mPaper = new Platform(this.kContent, 0, 0, 1000, 500);//纸团内容
        this.mPaper.setVisibility(false);
    }


    //stabs
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 4, -88, 165)); //门的上平台上的一排刺，一开始看不见 0
    this.mStabSetSet.getObjectAt(0).setVisibility(false);

    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 383, -43, true, false));//第一个小平台右边的刺 1
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 337, -43, true, true));//第一个小平台左边的刺 2
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 337, 3));//第一个小平台上面的刺 3

    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 203, -173, true, false));//第二个小平台右边的刺 4
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 157, -173, true, true));//第二个小平台左边的刺 5
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, 157, -127));//第二个小平台上面的刺 6

    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 4, -570, -400)); //飞出来的刺 7
    
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 4, -88, -36, false, true)); //门的上平台上的一排刺，一开始看不见 0

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, this.mMirrorHero, null, this.mPlatSet.mSet, this.mBrokeSet.mSet, this.mStabSetSet.mSet);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);
    this.mShowDeath.setVisibility(false);

    //Door
    this.mDoor = new SpriteObj(this.kSceneObj2, 0, 65, 66.3, 115.7, [0, 51, 91, 180]);

    //trapArea
    this.mTrapSet.addToSet(new Platform(this.kIce, 434, -250, 40, 40));//打开纸        0
    this.mTrapSet.addToSet(new Platform(this.kIce, -275, -250, 60, 60));//触发按钮      1  18
    this.mTrapSet.addToSet(new Platform(this.kIce, 290, -151, 100, 60));//4号刺飞出     2
    this.mTrapSet.addToSet(new Platform(this.kIce, 185, -190, 43, 43));//白色勾玉触发 19  3
    this.mTrapSet.addToSet(new Platform(this.kIce, 550, 280, 40, 40));//黑色勾玉触发 20   4
    this.mTrapSet.addToSet(new Platform(this.kIce, -490, -60, 170, 100));//下面飞出一排刺 7   5
    this.mTrapSet.addToSet(new Platform(this.kIce, 0, 190, 200, 50));//0 号刺出现   6


    var ss = this.mTrapSet.size();
    var i;
    for (i = 0; i < ss; i++) {
        this.mTrapSet.getObjectAt(i).setVisibility(false);
    }
    this.mButton = new Button(this.kSceneObj, -275, -250, 60, 60);//button
    this.mButton.getXform().incRotationByDegree(180);
    this.mTrapP = new SecondTrap(this.mTrapSet, this.mHero, this.mMirrorHero, this.mPlatSet, this.mStabSetSet, this.mBrokeSet, [this.mButton, this.mPaper]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
ThirdLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mWall.draw(this.mCamera);
    this.mStabSetSet.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBrokeSet.draw(this.mCamera);
    this.mTrapSet.draw(this.mCamera);
    this.mNoCollisionStab.draw(this.mCamera);
    this.mButton.draw(this.mCamera);

    this.mDoor.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    //this.mHero.drawBBox(this.mCamera);
    this.mMirrorHero.draw(this.mCamera);
    if (this.mPaper)
        this.mPaper.draw(this.mCamera);
    this.mShowDeath.draw(this.mCamera);
};

ThirdLevel.prototype.doorOpen = function () {
    var hBox = this.mHero.getBBox();
    var mhBox = this.mMirrorHero.getBBox();
    var dBox = this.mDoor.getBBox();
    var status1 = hBox.boundCollideStatus(dBox);
    var status2 = mhBox.boundCollideStatus(dBox);
    if (status1 | status2) {
        return true;
    } else {
        return false;
    }
};

ThirdLevel.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.LevelSelect = "BossLevel";
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
    if (this.doorOpen()) {
        this.LevelSelect = "BossLevel";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingRight) {
        this.LevelSelect = "SecondLevel";
        gEngine.GameLoop.stop();
    }
    gEngine.Mine.timeSpend();
    if (this.mHero.mIsDead || this.mMirrorHero.mIsDead) {
        this.mShowDeath.setVisibility(true);
        if (this.mHero.mIsDead) {
            this.mHero.update();
            this.mShowDeath.getXform().setRotationInDegree((this.mHero.kMirror - 1) * 90);
        }
        if (this.mMirrorHero.mIsDead) {
            this.mMirrorHero.update();
            this.mShowDeath.getXform().setRotationInDegree((this.mMirrorHero.kMirror - 1) * 90);
        }
        this.mSolveCol.update();
        return;
    }

    this.mTrapP.update();
    this.mStabSetSet.update();
    this.mHero.update();
    this.mMirrorHero.update();
    this.mPlatSet.update();
    this.mBrokeSet.update();
    this.mDoor.update();
    this.mTrapSet.update();
    this.mNoCollisionStab.update();
    this.mButton.update();
    //console.log(this.mHero.getXform().getPosition());
    this.mSolveCol.update();
};