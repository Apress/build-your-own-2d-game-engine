

/* global gEngine, Scene, MyScene, vec2, gManager */

function MenuLevel() {
    this.kBgTexture = "assets/BgMenu.png";
    this.kTitleTexture = "assets/BgTitle.png";
    this.kStartTexture = "assets/StartGame.png";
    this.kNewPlayerTexture = "assets/NewPlayer.png";
    this.kAboutUsTexture = "assets/AboutUs.png";
    this.kChoiceTexture = "assets/Choice.png";
//    this.kAboutUsTexture = "";

    this.aBgClip = "assets/sounds/bgClip.mp3";
    this.aChooseCue = "assets/sounds/choose.mp3";
    this.aEnterCue = "assets/sounds/focus.mp3";
    
    this.mBgTexture = null;
    this.mTitleTexture = null;
    this.mStartTexture = null;
    this.mNewPlayerTexture = null;
    this.mAboutUsTexture = null;
    this.mChoiceTexture = null;

    this.mCamera = null;

    //场景切换
    this.Choice = 1;
    this.StartGame = false;
    this.NewPlayer = false;
    this.AboutUs = false;


}

gEngine.Core.inheritPrototype(MenuLevel, Scene);

MenuLevel.prototype.initialize = function () {
    Scene.prototype.initialize.call(this);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([1,1,1,1]);
    gEngine.Physics.setSystemAcceleration([0,0]);
    gEngine.ParticleSystem.setSystemtAcceleration([0,0]);
    
    this.mCamera = new Camera(
            vec2.fromValues(100, 400), // position of the camera
            140, // width of camera
            [0, 0, 1280, 720], // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([250 / 256, 150 / 256, 134 / 256, 1]);

    //backgroud
    this.mBgTexture = new TextureRenderable(this.kBgTexture);
    this.mBgTexture.getXform().setSize(150, 80);
    this.mBgTexture.getXform().setPosition(100, 400);

    //Title
    this.mTitleTexture = new TextureRenderable(this.kTitleTexture);
    this.mTitleTexture.getXform().setSize(120, 15);
    this.mTitleTexture.getXform().setPosition(115, 420);


    //New player button
    this.mNewPlayerTexture = new TextureRenderable(this.kNewPlayerTexture);
    this.mNewPlayerTexture.getXform().setSize(40, 8);
    this.mNewPlayerTexture.getXform().setPosition(105, 400);

    //Start game button
    this.mStartTexture = new TextureRenderable(this.kStartTexture);
    this.mStartTexture.getXform().setSize(30, 8);
    this.mStartTexture.getXform().setPosition(105, 390);

    //AboutUs button
    this.mAboutUsTexture = new TextureRenderable(this.kAboutUsTexture);
    this.mAboutUsTexture.getXform().setSize(30, 8);
    this.mAboutUsTexture.getXform().setPosition(100, 380);

    //Choice
    this.mChoiceTexture = new TextureRenderable(this.kChoiceTexture);
    this.mChoiceTexture.getXform().setSize(10, 10);
    this.mChoiceTexture.getXform().setPosition(75, 400);
     //audio
    gEngine.AudioClips.playBackgroundAudio(this.aBgClip);
   
};
MenuLevel.prototype.loadScene = function () {
    // Load scene

    gEngine.Textures.loadTexture(this.kBgTexture);
    gEngine.Textures.loadTexture(this.kTitleTexture);
    gEngine.Textures.loadTexture(this.kStartTexture);
    gEngine.Textures.loadTexture(this.kNewPlayerTexture);
    gEngine.Textures.loadTexture(this.kChoiceTexture);
    gEngine.Textures.loadTexture(this.kAboutUsTexture);

 ///audio
    gEngine.AudioClips.loadAudio(this.aBgClip);
    gEngine.AudioClips.loadAudio(this.aChooseCue);
    gEngine.AudioClips.loadAudio(this.aEnterCue);
//    gEngine.AudioClips.loadAudio(this.aChooseCue);
//    gEngine.AudioClips.loadAudio(this.aChooseCue);
//    gEngine.AudioClips.loadAudio(this.aChooseCue);

};

MenuLevel.prototype.unloadScene = function () {
    //stop bg music
    gEngine.AudioClips.stopBackgroundAudio();
    // 卸载场景
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBgTexture);
    gEngine.Textures.unloadTexture(this.kTitleTexture);
    gEngine.Textures.unloadTexture(this.kStartTexture);
    gEngine.Textures.unloadTexture(this.kNewPlayerTexture);
    gEngine.Textures.unloadTexture(this.kChoiceTexture);
    gEngine.Textures.unloadTexture(this.kAboutUsTexture);
    //audio
    gEngine.AudioClips.unloadAudio(this.aBgClip);
    gEngine.AudioClips.unloadAudio(this.aChooseCue);
    gEngine.AudioClips.unloadAudio(this.aEnterCue);

//    var win = new winLevel();
//    gEngine.Core.startScene(win);

    if (this.StartGame === true) {
        var nextLevel = new SaveRabbits();
        gEngine.Core.startScene(nextLevel);
    }
    if (this.NewPlayer === true) {
        var nextLevel = new NewPlayerLevel();
        gEngine.Core.startScene(nextLevel);
    }
    if (this.AboutUs === true) {
        var nextLevel = new AboutUsLevel();
        gEngine.Core.startScene(nextLevel);
    }

};

MenuLevel.prototype.update = function () {
    this.mCamera.update();
   
    Scene.prototype.update.call(this);
    //gEngine.Physics.processObjSet(this.SpaceShip, this.mAllWalls);
    //next tip
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        gEngine.AudioClips.playACue(this.aEnterCue);
        this.confirm(this.Choice);
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked((gEngine.Input.keys.Down))) {
        gEngine.AudioClips.playACue(this.aChooseCue);
        if (this.Choice < 3)
            this.Choice++;
        var curPos = this.mChoiceTexture.getXform().getPosition();
        if (curPos[1] > 380)
            this.mChoiceTexture.getXform().setPosition(curPos[0], curPos[1] - 10);
    }
    if (gEngine.Input.isKeyClicked((gEngine.Input.keys.Up))) {
        gEngine.AudioClips.playACue(this.aChooseCue);
        if (this.Choice > 1)
            this.Choice--;
        var curPos = this.mChoiceTexture.getXform().getPosition();
        if (curPos[1] < 400)
            this.mChoiceTexture.getXform().setPosition(curPos[0], curPos[1] + 10);
    }
    this.choose(this.Choice);
//    this.mCamera.setWCCenter(this.shipPos[0], this.shipPos[1]);
};

MenuLevel.prototype.draw = function () {
    //Scene.prototype.draw.call(this);
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mCamera.setupViewProjection();
    this.mBgTexture.draw(this.mCamera);
    this.mTitleTexture.draw(this.mCamera);
    this.mStartTexture.draw(this.mCamera);
    this.mNewPlayerTexture.draw(this.mCamera);
    this.mAboutUsTexture.draw(this.mCamera);
    this.mChoiceTexture.draw(this.mCamera);
};

MenuLevel.prototype.choose = function (Choice) {
     var transparency = 0.1;
    switch (Choice) {
        case 1:
            this.mNewPlayerTexture.setColor([1, 0, 0, transparency]);
            this.mNewPlayerTexture.getXform().setPosition(105+1, 400 +1);
            this.mStartTexture.setColor([1, 1, 1, 0]);
            this.mStartTexture.getXform().setPosition(105, 390);
            this.mAboutUsTexture.setColor([1, 1, 1, 0]);
            this.mAboutUsTexture.getXform().setPosition(105, 380);
            break;
        case 2:
            this.mNewPlayerTexture.setColor([1, 1, 1, 0]);
            this.mNewPlayerTexture.getXform().setPosition(105, 400);
            this.mStartTexture.setColor([1, 0, 0, transparency]);
            this.mStartTexture.getXform().setPosition(105+1, 390+1);
            this.mAboutUsTexture.setColor([1, 1, 1, 0]);
            this.mAboutUsTexture.getXform().setPosition(105, 380);
            break;
        case 3:
            this.mNewPlayerTexture.setColor([1, 1, 1, 0]);
            this.mNewPlayerTexture.getXform().setPosition(105, 400);
            this.mStartTexture.setColor([1, 1, 1, 0]);
            this.mStartTexture.getXform().setPosition(105, 390);
            this.mAboutUsTexture.setColor([1, 0, 0, transparency]);
            this.mAboutUsTexture.getXform().setPosition(105+1, 380+1);
            break;
    }
};
MenuLevel.prototype.confirm = function (Choice) {
    switch (Choice) {
        case 1:
            this.NewPlayer = true;

            break;
        case 2:
            this.StartGame = true;
            break;
        case 3:
            this.AboutUs = true;
            break;
    }
}
