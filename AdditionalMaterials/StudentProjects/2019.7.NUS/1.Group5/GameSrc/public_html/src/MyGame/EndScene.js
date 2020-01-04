/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, Scene, vec2 */

function EndScene() {
    this.kEndBGM = "assets/Sound/endBGM.mp3";
    
    this.kHero = "assets/EmptyAction.png";
    this.kDreamer = "assets/Dreamer2.png";
    this.kPlatTexture = "assets/platform.png";
    this.kBullet = "assets/bullet.png";
    this.kThanks = "assets/thanks.png";
    
    this.kEnding = [];
    for (var i = 0; i < 266; i++) {
        if (i < 10) {
            this.kEnding[i] = "assets/Ending/ending000" + i + ".png";
        } else if (i < 100) {
            this.kEnding[i] = "assets/Ending/ending00" + i + ".png";
        } else {
            this.kEnding[i] = "assets/Ending/ending0" + i + ".png";
        }
    }
    
    this.mHero = null;
    this.mBoss = null;
    this.mPlatSet = new GameObjectSet();
    this.mSolveCol = null;
    this.mTKS = null;

    this.mBg = [];
    this.mBgCount = 0;
    this.mTimer = 0;
    this.mCamera = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(EndScene, Scene);

EndScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kDreamer);
    gEngine.Textures.loadTexture(this.kPlatTexture);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kThanks);
};

EndScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kDreamer);
    gEngine.Textures.unloadTexture(this.kPlatTexture);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kThanks);
    for (var i = 0; i < 266; i++) {
        gEngine.Textures.unloadTexture(this.kEnding[i]);
    }
};

EndScene.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    
    for (var i = 0; i < 266; i++) {
        this.mBg[i] = new Platform(this.kEnding[i], 0, 0, 1200, 675); //.setTexture
    }
    
    this.mHero = new Hero(this.kHero, this.kBullet, -500, -200, 1);
    this.mTKS = new Platform(this.kThanks, 0, 0, 300, 300);
    this.mBoss = new SpriteObj(this.kDreamer, 300, 0, 295, 223, [0, 295, 0, 223])
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -600, -76.25, 60, 780)); //0
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 600, 0, 60, 675));  //1
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, -337.5, 1800, 60)); //2
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 337.5, 1400, 60, true)); //3
    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null, null, this.mPlatSet.mSet, [], []);
    
    gEngine.AudioClips.playBackgroundAudio(this.kEndBGM);
    gEngine.AudioClips.incBackgroundVolume(-2);
};

EndScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    if (this.mBgCount < 266 ) {
        this.mBg[this.mBgCount].draw(this.mCamera);
    }
    else {
        this.mTKS.draw(this.mCamera);
        this.mBoss.draw(this.mCamera);
        this.mHero.draw(this.mCamera);
    }
};

EndScene.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.mBgCount = 266;
    }
    
    this.mTimer += 1;
    if (this.mTimer === 7 && this.mBgCount < 266) {
        this.mBgCount += 1;
        this.mTimer = 0;
    }
    
    if (this.mBgCount === 266) {
        this.mHero.update();
        this.mSolveCol.update();
    }
};