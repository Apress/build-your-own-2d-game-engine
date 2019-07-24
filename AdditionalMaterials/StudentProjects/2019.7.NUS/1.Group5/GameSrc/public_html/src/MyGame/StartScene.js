/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, Scene, vec2 */

function StartScene() {
    this.kSentence = "assets/sentences2.png";
    
    this.kLevelBGM = "assets/Sound/levelBGM.mp3";
    
    this.kBeginning = new Array();
    for (var i = 0; i < 277; i++) {
        if (i < 10) {
            this.kBeginning[i] = "assets/Beginning/beginning000" + i + ".png";
        } else if (i < 100) {
            this.kBeginning[i] = "assets/Beginning/beginning00" + i + ".png";
        } else {
            this.kBeginning[i] = "assets/Beginning/beginning0" + i + ".png";
        }
    }

    this.mBg = [];
    this.mBgCount = 0;
    this.mBgStart = false;
    this.mTimer = 0;
    this.mCamera = null;
    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(StartScene, Scene);

StartScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSentence);
};

StartScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSentence);
    for (var i = 0; i < 277; i++) {
        gEngine.Textures.unloadTexture(this.kBeginning[i]);
    }
    
    gEngine.Mine.tipDisappear();
    gEngine.AudioClips.playBackgroundAudio(this.kLevelBGM);
    gEngine.AudioClips.incBackgroundVolume(-2);
    gEngine.Core.changeScene(new FirstLevel(), true);
};

StartScene.prototype.initialize = function () {
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    for (var i = 0; i < 277; i++) {
        this.mBg[i] = new Platform(this.kBeginning[i], 0, 0, 1200, 675); //.setTexture
    }
    gEngine.Mine.tipAppear();
    //this.mSentence = new SpriteObj(this.kSentence, -200, 260, 560, 23.8, [0, 400, 30, 47]);
};

StartScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mBg[this.mBgCount].draw(this.mCamera);
    //this.mSentence.draw(this.mCamera);
};

StartScene.prototype.update = function () {
    this.mTimer += 1;
    if (this.mTimer === 11 && this.mBgCount < 226) {
        this.mBgCount += 1;
        //this.mBg.mPlatform.setTexture(this.kBeginning[this.mBgCount]);
        this.mTimer = 0;
    }
    //console.log(this.mTimer, this.mBgCount);
    if (this.mBgCount === 226) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
            this.mBgStart = true;
            this.mTimer = 0;
        }
    }
    if (this.mBgStart) {
        if (this.mTimer === 12) {
            this.mBgCount += 1;
            //this.mBg.mPlatform.setTexture(this.kBeginning[this.mBgCount]);
            this.mTimer = 0;
        }
    }
    
    //console.log(this.mBgCount);
    if (this.mBgCount === 276 || gEngine.Input.isKeyClicked(gEngine.Input.keys.Control)) {
        gEngine.GameLoop.stop();
    }
    //if(this.mBgCount === 31){
    //    this.mSentence.setVisibility(false);
    //}
};