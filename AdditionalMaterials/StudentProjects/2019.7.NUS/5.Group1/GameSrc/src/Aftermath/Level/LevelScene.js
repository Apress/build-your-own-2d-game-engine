/*
 * File: LevelScene.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LevelScene(aHero) {
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";
    this.kMinionSprite = "assets/minion_sprite.png";
    // this.kGadgets = "assets/Trap.png";
    this.kGadgets = "assets/item/gadgets.png";
    this.kSave = "assets/save.png";
    this.kPlatformTexture = "assets/BlockUnit/snow-platform.png";
    // this.kCharacters = "assets/Character/3.png";
    this.kCharacters = "assets/Character/characters.png";
    this.kNPC = "assets/Character/NPC.png";
    this.kBg = "assets/Background/snow-bg.png";
    this.kBullet = "assets/Bullet/Yellow-Bullet.png";
    this.kCharactersBullet = "assets/Bullet/pink-bullet.png";
    this.kBoss = "assets/Character/Boss.png";
    this.kHeart = "assets/Character/heart.png";

    this.kBgm = "assets/Music/BGM/bgm.mp3";
    this.kShoot = "assets/Music/Cue/shoot1.wav";

    // this.kText = "assets/Word/1/1-1-1.png";
    this.kText = "assets/Word/" + ROUND + "/";

    this.mDialogue = null;
    this.inDia = true;
    this.currentDia = 1;
    this.maxDia = 1;


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


    this.mNPCs = [];
    this.mFriends = [];
//    FIXME debug thing

    this.LevelSelect = null;

    if (aHero !== undefined) {
        this.mHero = aHero;
    } else {
        this.mHero = null;
    }
    this.mTrap = null;
    this.mTrapSet = [];
    this.mSavePoint = null;

    this.reset = false;

    this.finState = "";
    this.levelClear = false;

    this.hearts = [];

    this.BackButton = null;
    this.back = false;

    this.ButtonWidth = 50;
    this.ButtonHeight = 40;
    this.ButtonSize = [this.ButtonWidth, this.ButtonHeight];
    this.ButtonFontSize = 3;
    this.ButtonPosition = [1250, 700];

}

gEngine.Core.inheritPrototype(LevelScene, Scene);

var GAME_STATE = {
    DEFAULT: 0,
    LEVEL_CLEAR: 1,
    LOSE: 2,

};

LevelScene.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kBgm);
    gEngine.AudioClips.loadAudio(this.kShoot);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kGadgets);
    gEngine.Textures.loadTexture(this.kSave);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kCharacters);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kCharactersBullet);
    gEngine.Textures.loadTexture(this.kBoss);
    gEngine.Textures.loadTexture(this.kHeart);
    gEngine.Textures.loadTexture(this.kNPC);
    for (let i = 1; i <= this.maxDia; i++) {

        gEngine.Textures.loadTexture(this.kText + this.levelName + i + ".png");
    }

};

LevelScene.prototype.unloadScene = function () {
    gEngine.AudioClips.unloadAudio(this.kBgm);
    gEngine.AudioClips.unloadAudio(this.kShoot);

    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kGadgets);
    gEngine.Textures.unloadTexture(this.kSave);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kCharacters);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kCharactersBullet);
    gEngine.Textures.unloadTexture(this.kBoss);
    gEngine.Textures.unloadTexture(this.kHeart);
    gEngine.Textures.unloadTexture(this.kNPC);

    for (let i = 1; i <= this.maxDia; i++) {
        gEngine.Textures.unloadTexture(this.kText + this.levelName + i + ".png");
    }
    if (this.Win!==undefined &&this.Win){
        gEngine.Core.startScene(new FakeLoseScene());
        return;
    }
    if (this.back) {
        gEngine.Core.startScene(new HomePage());
        return;
    }
    if (this.levelClear) {
        startNextLevel();
    } else {
        gEngine.Core.startScene(new LoseScene("You Died"));
    }

};

LevelScene.prototype.initialize = function () {

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


    if (this.mHero === null) {
        this.mHero = new Hero(this.kCharacters, this.kCharactersBullet);
    }

    this.mHero.setTarget(this.mNPCs);


    for (let i = 0; i < this.mNPCs.length; i++) {
        this.mNPCs[i].setTarget(this.mHero);
    }


    this.mTrap = new Trap(this.kGadgets);
    this.mSavePoint = new SavePoint(this.kSave);

    var i, j, rx, ry, obj, dy, dx;
    dx = 8;
    dy = 8;


    rx = 10;
    for (i = 0; i < this.mHero.health; i++) {
        this.hearts[i] = new Heart(this.kHeart, rx);
        rx += 7;
    }
    if (!gEngine.AudioClips.isBackgroundAudioPlaying()) {
        gEngine.AudioClips.playBackgroundAudio(this.kBgm);
    }

    this.BackButton = new UIButton(this.goBack, this, this.ButtonPosition, this.ButtonSize, "Home", this.ButtonFontSize);
    if (this.inDia)
    this.dia = new Dialogue(this.kText + this.levelName + this.currentDia + ".png");


};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LevelScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();

    this.bg.draw(this.mCamera);

    for (let i = 0; i < this.mNPCs.length; i++) {
        this.mNPCs[i].draw(this.mCamera);
    }
    for (let i = 0; i < this.mFriends.length; i++) {
        this.mFriends[i].draw(this.mCamera);
    }
    this.mAllPlatforms.draw(this.mCamera);

    this.mHero.draw(this.mCamera);
    // this.mTrap.draw(this.mCamera);
    // this.mSavePoint.draw(this.mCamera);


    for (let i = 0; i < this.mHero.health; i++) {
        this.hearts[i].draw(this.mCamera);
    }

    this.BackButton.draw(this.mCamera);

    if (this.inDia) {
        this.dia.draw(this.mCamera);
    }
};

LevelScene.prototype.update = function () {
    // this.ParticleButton.update();
    // this.PhysicsButton.update();
    // this.UIButton.update();

    if (this.inDia) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
            if (this.currentDia >= this.maxDia) {

                this.inDia = false;
            } else {

                this.currentDia += 1;
                this.dia.setTexture(this.kText + this.levelName + this.currentDia + ".png")
            }

        }
    }

    else {
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
            this.goLose();
        }
        for (let i = 0; i < this.mNPCs.length; i++) {
            NPC = this.mNPCs[i];
            if (NPC.death) {
                this.mNPCs.splice(i, 1);
                break;
            }
        }

        if (this.mNPCs.length <= 0) {
            this.levelClear = true;
        }

        if (this.levelClear && (this.mCamera.collideWCBound(this.mHero.getXform(), 1) === 2)
            && (CURRENT_LEVEL !== SELECT.L_2_3)&&(CURRENT_LEVEL !== SELECT.HIDDEN)) {
            CURRENT_LEVEL += 1;
            gEngine.GameLoop.stop();
        }

        if (this.mCamera.collideWCBound(this.mHero.getXform(), 1) === 8) {
            this.goLose();
        }

        this.BackButton.update();
    }

    // var num = 0;
    // for (let i = 0; i < this.mBarrageSet.length; i++) {
    //     this.mBarrageSet[i].update(this.mCamera,this.mWing);
    //     // FIXME debug thing
    //     num += this.mBarrageSet[i].size();
    // }
    //
    //
    // if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
    //     startNextLevel();
    // }
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

LevelScene.prototype.goBack = function () {
    this.back = true;
    gEngine.GameLoop.stop();
};

LevelScene.prototype.addGround = function () {
    var i, j, rx, ry, obj, dy, dx;
    dx = 8;
    dy = 8;

    rx = 0;
    for (i = 0; i < 26; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 5);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }


};
LevelScene.prototype.addTopWall = function () {
    var i, j, rx, ry, obj, dy, dx;
    dx = 8;
    dy = 8;

    rx = 0;
    ry = 120;
    for (i = 0; i < 27; i++) {
        obj = new Platform(this.kPlatformTexture, rx, ry);
        this.mAllPlatforms.addToSet(obj);

        rx += dx;
    }
};
LevelScene.prototype.goLose = function () {
    this.levelClear = false;
    gEngine.GameLoop.stop();
};
LevelScene.prototype.LevelSceneSelect = function () {
    this.LevelSelect = "Game";
    gEngine.GameLoop.stop();
};
