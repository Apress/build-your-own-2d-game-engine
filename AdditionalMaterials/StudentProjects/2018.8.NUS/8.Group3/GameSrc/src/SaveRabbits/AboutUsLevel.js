

/* global gEngine, Scene, MyScene, vec2, gManager */

function AboutUsLevel() {
    this.kBgTexture = "assets/BgAboutUs.png";
    this.kContentTexture = "assets/aknowledgement.png";
    this.kBgStar1 = "assets/BgStar1.png";
    this.kBgStar2 = "assets/BgStar2.png";
    this.kBgStar3 = "assets/BgStar3.png";
    this.aBgClip = "assets/sounds/bgClip.mp3";
    this.mBgTexture = null;
    this.mContentTexture = null;
    this.mBgStar1 = null;
    this.mBgStar2 = null;
    this.mBgStar3 = null;
    
  
    this.mCamera = null;
    
    //roll speed
    this.rollSpeed = 1/9;
    //场景切换，return to main interface
    this.Menu = false;
}

gEngine.Core.inheritPrototype(AboutUsLevel, Scene);

AboutUsLevel.prototype.initialize = function () {
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
    this.mBgTexture.getXform().setSize(150,80);
    this.mBgTexture.getXform().setPosition(100,400);
    
    //content show
    this.mContentTexture = new TextureRenderable(this.kContentTexture);
    this.mContentTexture.getXform().setSize(80,160);
    this.mContentTexture.getXform().setPosition(105,320);
    
    //Bg star1
    this.mBgStar1 = new TextureRenderable(this.kBgStar1);
    this.mBgStar1.getXform().setSize(10,10);
    this.mBgStar1.getXform().setPosition(60,420);
    
    //Bg star2
    this.mBgStar2 = new TextureRenderable(this.kBgStar2);
    this.mBgStar2.getXform().setSize(10,10);
    this.mBgStar2.getXform().setPosition(55,380);
    
    //Bg star3
    this.mBgStar3 = new TextureRenderable(this.kBgStar3);
    this.mBgStar3.getXform().setSize(10,10);
    this.mBgStar3.getXform().setPosition(150,390);
        //audio
    gEngine.AudioClips.playBackgroundAudio(this.aBgClip);
};
AboutUsLevel.prototype.loadScene = function () {
    // Load scene
  
    gEngine.Textures.loadTexture(this.kBgTexture);
    gEngine.Textures.loadTexture(this.kContentTexture);
    gEngine.Textures.loadTexture(this.kBgStar1);
    gEngine.Textures.loadTexture(this.kBgStar2);
    gEngine.Textures.loadTexture(this.kBgStar3);
    gEngine.AudioClips.loadAudio(this.aBgClip);
};

AboutUsLevel.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    // 卸载场景
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBgTexture);
    gEngine.Textures.unloadTexture(this.kContentTexture);
    gEngine.Textures.unloadTexture(this.kBgStar1);
    gEngine.Textures.unloadTexture(this.kBgStar2);
    gEngine.Textures.unloadTexture(this.kBgStar3);
    gEngine.AudioClips.unloadAudio(this.aBgClip);
    if (this.Menu === true) {
        var nextLevel = new MenuLevel();
        gEngine.Core.startScene(nextLevel);
    }
};

AboutUsLevel.prototype.update = function () {

    this.mCamera.update();
    Scene.prototype.update.call(this);
    //gEngine.Physics.processObjSet(this.SpaceShip, this.mAllWalls);
    //next tip
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
            this.Menu = true;
            gEngine.GameLoop.stop();
    }
    this.roll(this.rollSpeed);
    this.rotate(this.mBgStar1);
    this.rotate(this.mBgStar2);
    this.rotate(this.mBgStar3);
    gEngine.AudioClips.unloadAudio(this.aBgClip);    
};

AboutUsLevel.prototype.draw = function () {
    //Scene.prototype.draw.call(this);
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mCamera.setupViewProjection();
    this.mBgTexture.draw(this.mCamera);
    this.mContentTexture.draw(this.mCamera);
    this.mBgStar1.draw(this.mCamera);
    this.mBgStar2.draw(this.mCamera);
    this.mBgStar3.draw(this.mCamera);
};

AboutUsLevel.prototype.rotate = function (star){
    star.getXform().incRotationByDegree(1.2);
};
AboutUsLevel.prototype.roll = function (rollSpeed){
    var Xform = this.mContentTexture.getXform();
    Xform.incYPosBy(rollSpeed);
    
    //放映结束回到主界面
    if(Xform.getPosition()[1] >500){
        this.Menu = true;
        gEngine.GameLoop.stop();
    }
} ;

