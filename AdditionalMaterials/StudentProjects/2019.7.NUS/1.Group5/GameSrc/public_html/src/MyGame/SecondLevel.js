/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, vec2, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SecondLevel(aHero, hasPaper) {
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
    this.kContent = "assets/clue_b1.png";
    //this.kStabTexture = "assets/TestStab.png";
    //this.kWood = "assets/RigidShape/Wood.png";
    this.kIce = "assets/RigidShape/Ice.png";
    this.kWall = "assets/Wall_Level2.png";
    //this.kDirt = "assets/RigidShape/Dirt.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    //Wall
    this.mWall = null;
    // Objects
    this.mHero = aHero ? aHero : null;
    //TrapProcess
    this.mTrapP = null;

    this.mPlatSet = new GameObjectSet();
    this.mBrokeSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();
    this.mTrapSet = new GameObjectSet();
    this.mButton = null;//button
    this.mPaper = null;
    this.mNoRoad = null;
    this.mGetItem = null;

    //Tools
    this.mSolveCol = null;
    this.mShowDeath = null;
    this.mHasPaper = hasPaper ? hasPaper : null;
}
gEngine.Core.inheritPrototype(SecondLevel, Scene);

SecondLevel.prototype.loadScene = function () {
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
    //gEngine.Textures.loadTexture(this.kStabTexture);
    //gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);
    gEngine.Textures.loadTexture(this.kWall);
    //gEngine.Textures.loadTexture(this.kDirt);
};

SecondLevel.prototype.unloadScene = function () {
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
    //gEngine.Textures.unloadTexture(this.kStabTexture);
    //gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kIce);
    gEngine.Textures.unloadTexture(this.kWall);
    //gEngine.Textures.unloadTexture(this.kDirt);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(gEngine.Mine.restartLevel(), true);
    }
    if (this.LevelSelect === "ThirdLevel") {
        gEngine.Mine.saveStatus.finishSecond = true;
        gEngine.Mine.restartLevel = () => new ThirdLevel();
        gEngine.Core.changeScene(new ThirdLevel(this.mHero, true), false);
    }
    if (this.LevelSelect === "FirstLevel") {
        gEngine.Core.changeScene(new FirstLevel(this.mHero), false);
    }
};

SecondLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    if (this.mHero === null)
        this.mHero = new Hero(this.kHero, this.kBullet, 522, 238.4, 1, true);
    else {
        this.mHero.cleanStatus(this.mCamera);
        this.mHero.setMirror(1);
    }
    
    //wall
    this.mWall =new Platform(this.kWall,0, 0, 1200, 675);
    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -500, 110, 270, 126));//左边的胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 589, 70, 250, 290));//右边的大平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -500, -315, 270, 100));//左下角的矮胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 337.5, 1400, 60, true));//最上面的边界

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 550, -315, 270, 100));//右下角的矮胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 430, -172, 30, 186, true));//右下角的矮胖平台上的瘦高平台（触发按钮后消失）
    this.mPlatSet.addToSet(new MovePlatform(this.kMoveTexture, 290, -280, 158, 32, -250, 300));//会动的平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 135, -65, 1000, 30));//右边平台伸出来的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 260, 150, 130, 30));//大平台旁边第一个消失的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 150, 130, 30));//大平台旁边第二个看上去不正常其实可以踩的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -230, 40, 50, 180));//第三个竖着的长方形平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -580, 240, 60, 135, true));//左上角竖着的平台
    //this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -380, 240, 30, 135, true));//左上角胖平台上长方形障碍物
    //this.mPlatSet.getObjectAt(12).setVisibility(false);

    if (this.mHasPaper) {
        this.mPlatSet.addToSet(new Platform(this.kPaper, 470, 230, 30, 30)); //纸团
        this.mPaper = new Platform(this.kContent, 0, 0, 1000, 500);//纸团内容
        this.mPaper.setVisibility(false);
    }
    this.mNoRoad = new Platform(this.kNoRoad, -545, -205, 100, 50);
    this.mGetItem = new SpriteObj(this.kSceneObj, 500, -246, 38, 38, [120, 159, 25, 64]);

    //broken platforms
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, -389, -18, 40, 121));

    //stabs
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 14, -192, -50));//第一层平台上的14个刺
    //this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -463, -265));
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -417, -265));//要设置成看不见
    this.mStabSetSet.getObjectAt(1).setVisibility(false);
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 2, -600, -265)); //要设置成看不见
    this.mStabSetSet.getObjectAt(2).setVisibility(false);
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 14, -228, -80, false, true));//倒着的一排刺，触发trap后第五个刺会掉下来
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 2, -360, 195, true, true));//左上角胖平台上的障碍刺
    this.mStabSetSet.getObjectAt(4).setVisibility(false);

    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -365, 90, true, false));//左上角胖平台侧着的刺
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -255, 60, true, true));//左上角胖平台侧着的刺
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 4, 645, -270, true, true));//右下角触发trap后飞出的一排刺
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 3, 192, 307.5, false, true));
    this.mStabSetSet.getObjectAt(8).setVisibility(false);
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 5, -600, -184, true, false)); //最左边一排刺
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -486, -265));//看的见但是是一个假刺,不参与collision处理
    this.mStabSetSet.getObjectAt(10).setTouchable();

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null, null, this.mPlatSet.mSet, this.mBrokeSet.mSet, this.mStabSetSet.mSet);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);

    //trapArea
    this.mTrapSet.addToSet((new NormalPlatform(this.kIce, 260, 175, 130, 20))); //进入该区域后，this.mPlatSet[8].fall
    this.mTrapSet.addToSet(new NormalPlatform(this.kIce, -520, 240, 60, 60));//第二个trap，碰到按钮之后，按钮改变样子，this.mPlatSet[5]open,this.mPlatSet[12]出现，过几秒后最左边出现一排刺fly out
    this.mTrapSet.addToSet((new NormalPlatform(this.kIce, -554, -219, 100, 92)));//进入该区域，invisible的刺出现
    this.mTrapSet.addToSet((new NormalPlatform(this.kIce, -394, -219, 46, 92)));//进入该区域，invisible的刺出现
    this.mTrapSet.addToSet(new NormalPlatform(this.kIce, -20, -230, 110, 160));//进入该区域，上面有个刺掉下来
    this.mTrapSet.addToSet(new NormalPlatform(this.kIce, 525, -172, 160, 185));//进入该区域，右下角最右边出现一排刺，并且飞出
    this.mTrapSet.addToSet(new NormalPlatform(this.kIce, 480, 230, 40, 40));//打开纸团
    var ss = this.mTrapSet.size();
    var i;
    for (i = 0; i < ss; i++) {
        this.mTrapSet.getObjectAt(i).setVisibility(false);
    }
    this.mButton = new Button(this.kSceneObj, -520, 245, 60, 60)//button;
    this.mTrapP = new FirstTrap(this.mTrapSet, this.mHero, this.mPlatSet, this.mStabSetSet, [this.mButton, this.mPaper, this.mGetItem]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SecondLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mWall.draw(this.mCamera);
    this.mNoRoad.draw(this.mCamera);
    this.mStabSetSet.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBrokeSet.draw(this.mCamera);
    this.mTrapSet.draw(this.mCamera);
    this.mButton.draw(this.mCamera);
    this.mHero.draw(this.mCamera);

    if (this.mPaper) this.mPaper.draw(this.mCamera);
    this.mGetItem.draw(this.mCamera);

    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

SecondLevel.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.LevelSelect = "ThirdLevel";
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
        this.LevelSelect = "ThirdLevel";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingRight) {
        this.LevelSelect = "FirstLevel";
        gEngine.GameLoop.stop();
    }
    gEngine.Mine.timeSpend();
    if (this.mHero.mIsDead) {
        this.mHero.update();
        this.mSolveCol.update();
        return;
    }

    this.mTrapP.update();
    this.mStabSetSet.update();
    this.mHero.update();
    this.mPlatSet.update();
    this.mBrokeSet.update();
    this.mButton.update();
    //console.log(this.mHero.getXform().getPosition());
    this.mSolveCol.update();
};


