/*
 * File: GameScene.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameScene() {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kTrap = "assets/Trap.png";
    this.kSave = "assets/save.png";
    // this.kPlatformTexture = "assets/BlockUnit/green-platform2.png";
    this.kPlatformTexture = "assets/BlockUnit/snow-platform.png";
    this.kHero = "assets/Character/3.png";
    this.kBg = "assets/Background/snow-bg.png";
    this.kBullet = "assets/Bullet/Yellow-Bullet.png";
    this.kHeroBullet = "assets/Bullet/pink-bullet.png";
    // this.kBullet = "assets/Bullet/blue-bullet.png";
    this.kBoss = "assets/Character/Boss.png";
    this.kHeart = "assets/Character/heart.png";

    this.kBgm = "assets/Music/BGM/bgm.mp3";
    this.kShoot = "assets/Music/Cue/shoot1.wav";


    // The camera to view the scene
    this.mCamera = null;
    // this.ParticleButton = null;
    // this.PhysicsButton = null;
    // this.UIButton = null;
    this.UIText = null;
    this.LevelSelect = null;
    this.mBarrage = null;
    this.mBarrageSet = null;

    this.mMsg = null;

    this.mAllPlatforms = new GameObjectSet();

    this.mBoss = null;

    this.mNPCs = [];
//    FIXME debug thing

    this.LevelSelect = null;

    this.mHero = null;
    this.mTrap = null;
    this.mSavePoint = null;

    this.reset = false;

    this.finState = "";

    this.hearts = [];
}

gEngine.Core.inheritPrototype(GameScene, Scene);


GameScene.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kBgm);
    gEngine.AudioClips.loadAudio(this.kShoot);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kTrap);
    gEngine.Textures.loadTexture(this.kSave);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHeroBullet);
    gEngine.Textures.loadTexture(this.kBoss);
    gEngine.Textures.loadTexture(this.kHeart);


};

GameScene.prototype.unloadScene = function () {
    gEngine.AudioClips.unloadAudio(this.kBgm);
    gEngine.AudioClips.unloadAudio(this.kShoot);

    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kTrap);
    gEngine.Textures.unloadTexture(this.kSave);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHeroBullet);
    gEngine.Textures.unloadTexture(this.kBoss);
    gEngine.Textures.unloadTexture(this.kHeart);

    gEngine.Core.startScene(new MyGame(this.finState));

    // if(this.LevelSelect==="Particle"){
    //     gEngine.Core.startScene(new ParticleLevel());
    // }
    // else if(this.LevelSelect==="Physics"){
    //     gEngine.Core.startScene(new RigidShapeDemo());
    // }
    // else if(this.LevelSelect==="UI"){
    //     gEngine.Core.startScene(new UIDemo());
    // }
    // gEngine.AudioClips.unloadAudio(this.kCue);
};

GameScene.prototype.initialize = function () {
    // Step A: set up the cameras
    // this.mCamera = new Camera(
    //     vec2.fromValues(50, 40), // position of the camera
    //     100,                     // width of camera
    //     [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    // );

    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);


    this.bg = new TextureRenderable(this.kBg);
    this.bg.getXform().setSize(200, 112.5);
    this.bg.getXform().setPosition(100, 56.25);

    this.mBoss = new Boss(this.kBoss, this.kBullet);
    this.mNPCs.push(this.mBoss);
    // this.ParticleButton = new UIButton(this.particleSelect,this,[400,400],[600,100],"Particle Demos",8);
    // this.PhysicsButton = new UIButton(this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8);
    // this.UIButton =  new UIButton(this.uiSelect,this,[400,200],[320,100],"UI Demo",8);
    // this.UIText = new UIText("Demo", [400, 600], 8, 1, 0, [0, 0, 0, 1]);
    // this.mBarrageSet = [];

    // this.mMsg = new FontRenderable("Status Message");
    // this.mMsg.setColor([1, 1, 1, 1]);
    // this.mMsg.getXform().setPosition(5, 5);
    // this.mMsg.setTextHeight(3);

    // this.mWing = new Wing(this.kMinionSprite,50,20,0);
    this.mHero = new Hero(this.kHero, this.kHeroBullet);
    this.mHero.setTarget(this.mNPCs);


    for (let i = 0; i < this.mNPCs.length; i++) {
        this.mNPCs[i].setTarget(this.mHero);
    }


    this.mTrap = new Trap(this.kTrap);
    this.mSavePoint = new SavePoint(this.kSave);

    var i, j, rx, ry, obj, dy, dx;

    rx = -5;
    for (i = 0; i < 45; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }

    rx = -0;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }
    rx = 200;
    for (i = 0; i < 5; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 40);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx -= 5;
    }

    rx = 50;
    for (i = 0; i < 20; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 80);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }

    rx = 0;
    for (i = 0; i < 45; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 120);
        this.mAllPlatforms.addToSet(obj);

        // obj = new Platform(this.kPlatformTexture, rx, 112);
        // this.mAllPlatforms.addToSet(obj);
        rx += 5;
    }

    rx = 10;
    for (i = 0; i < this.mHero.health; i++) {
        this.hearts[i] = new Heart(this.kHeart, rx);
        rx += 7;
    }

    gEngine.AudioClips.playBackgroundAudio(this.kBgm);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();

    this.bg.draw(this.mCamera);

    for (let i = 0; i < this.mNPCs.length; i++) {
        this.mBoss.draw(this.mCamera);
    }

    this.mHero.draw(this.mCamera);
    // this.mTrap.draw(this.mCamera);
    // this.mSavePoint.draw(this.mCamera);

    this.mAllPlatforms.draw(this.mCamera);

    for (let i = 0; i < this.mHero.health; i++) {
        this.hearts[i].draw(this.mCamera);
    }
    // this.ParticleButton.draw(this.mCamera);
    // this.PhysicsButton.draw(this.mCamera);
    // this.UIButton.draw(this.mCamera);
    // this.UIText.draw(this.mCamera);
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].draw(this.mCamera);
    // }
    //
    //
    // this.mMsg.draw(this.mCamera);
    //
    // this.mWing.draw(this.mCamera);

};

GameScene.prototype.update = function () {
    // this.ParticleButton.update();
    // this.PhysicsButton.update();
    // this.UIButton.update();
    this.mAllPlatforms.update();
    this.reset = gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);

    this.mHero.update(this.reset, this.mCamera);
    this.mTrap.update();
    this.mSavePoint.update();

    for (let i = 0; i < this.mNPCs.length; i++) {
        var NPC = this.mNPCs[i];
        NPC.update(this.mCamera, this.mHero);
    }

    this.reset = false;

    if (this.mHero.death) {

        this.finState = "You Died";
        gEngine.GameLoop.stop();
    }
    for (let i = 0; i < this.mNPCs.length; i++) {
        NPC = this.mNPCs[i];
        if (NPC.death) {
            this.mNPCs.splice(i, 1);
            break;
        }
    }

    if (this.mNPCs.length <= 0) {
        this.finState = "You Win";

        gEngine.GameLoop.stop();
    }
    // var num = 0;
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].update(this.mCamera,this.mWing);
    //     // FIXME debug thing
    //     num += this.mBarrageSet[i].size();
    // }
    //
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.CIRCLE, 30));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.D_SECTOR, 10));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.LINE, 30));
    // }
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
    //     this.mBarrageSet.push(new Barrage(this.kMinionSprite, vec2.fromValues(50, 50), 0.8, BARRAGE_TYPE.CROSS, 30));
    // }
    // if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
    //     gEngine.AudioClips.playACue(this.kCue, 0.1);
    // }

    //
    // this.mWing.update();
    // this.mMsg.setText("Bullet Num: " + num);

};

GameScene.prototype.gameSceneSelect = function () {
    this.LevelSelect = "Game";
    gEngine.GameLoop.stop();
};
//
// GameScene.prototype.physicsSelect = function(){
//     this.LevelSelect="Physics";
//     gEngine.GameLoop.stop();
// };
//
// GameScene.prototype.uiSelect= function(){
//     this.LevelSelect="UI";
//     gEngine.GameLoop.stop();
// };