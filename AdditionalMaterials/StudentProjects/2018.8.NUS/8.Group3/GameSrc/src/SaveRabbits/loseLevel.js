

/* global gEngine, Scene, MyScene, vec2, gManager */

function loseLevel() {
    this.kBgTexture = "assets/BgAboutUs.png";
    this.kContentTexture = "assets/Tip2.png";
    this.kloseTexture = "assets/lose.png";
    this.mBgTexture = null;
    this.mContentTexture = null;
    this.mloseTexture = null;
    this.mCamera = null;
    this.aBgClip = "assets/sounds/bgClip.mp3";
    //roll speed
    this.rollSpeed = 1 / 9;
    //场景切换，return to main interface
    this.Menu = false;
    this.StartGame = true;
}

gEngine.Core.inheritPrototype(loseLevel, Scene);

loseLevel.prototype.initialize = function () {
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

    //content show
    this.mContentTexture = new TextureRenderable(this.kContentTexture);
    this.mContentTexture.getXform().setSize(80, 40);
    this.mContentTexture.getXform().setPosition(100, 400);
    //content show
    this.mloseTexture = new TextureRenderable(this.kloseTexture);
    this.mloseTexture.getXform().setSize(60, 30);
    this.mloseTexture.getXform().setPosition(100, 405);
    
        gEngine.AudioClips.playBackgroundAudio(this.aBgClip);
};
loseLevel.prototype.loadScene = function () {
    // Load scene
    gEngine.Textures.loadTexture(this.kBgTexture);
    gEngine.Textures.loadTexture(this.kContentTexture);
    gEngine.Textures.loadTexture(this.kloseTexture);
    
        gEngine.AudioClips.loadAudio(this.aBgClip);
};

loseLevel.prototype.unloadScene = function () {
    // 卸载场景
    
         //stop bg music
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kBgTexture);
    gEngine.Textures.unloadTexture(this.kContentTexture);
    gEngine.Textures.unloadTexture(this.kloseTexture);
    
        gEngine.AudioClips.unloadAudio(this.aBgClip);
    if (this.Menu === true) {
        var nextLevel = new MenuLevel();
        gEngine.Core.startScene(nextLevel);
    }
    if (this.StartGame === true) {
        var nextLevel = new SaveRabbits();
        gEngine.Core.startScene(nextLevel);
    }
};

loseLevel.prototype.update = function () {
    this.mCamera.update();
    Scene.prototype.update.call(this);
    //gEngine.Physics.processObjSet(this.SpaceShip, this.mAllWalls);
    //next tip
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.Menu = true;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.StartGame = true;
        gEngine.GameLoop.stop();
    }
};

loseLevel.prototype.draw = function () {
    //Scene.prototype.draw.call(this);
    gEngine.Core.clearCanvas([0, 0, 0, 1]);
    this.mCamera.setupViewProjection();
    this.mBgTexture.draw(this.mCamera);
    //this.mContentTexture.draw(this.mCamera);
    this.mloseTexture.draw(this.mCamera);
};

