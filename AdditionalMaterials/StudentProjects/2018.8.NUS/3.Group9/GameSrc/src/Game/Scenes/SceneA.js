"use strict";

function SceneA(game, place, sky, bgm) {
    this.mGame = game;

    this.mPlace = place;
    this.mSky = sky;
    this.mBgm = bgm;
    this.mIsBgmPlay = true;

        //GameObjectSets
    this.mAllObjs = null;   //All GameObject
    this.mAllObstacles = null; // All Obstacles which cant be destroyed
    this.mDestroyable = null; // All objects that can be shot

    this.mProps = null;

    this.mBackground = null;

    this.mCollisionInfos = [];
}
gEngine.Core.inheritPrototype(SceneA, Scene);

SceneA.prototype.loadScene = function () {
    // Beautiful but doesn't work
    // Timer.loadAssets();
    Background.loadAssets(this.mPlace, this.mSky, this.mBgm);

    Player.loadAssets();
    Archer.loadAssets();
    Arrow.loadAssets();

    HpBar.loadAssets();
    ShootController.loadAssets();
    PlayerMark.loadAssets();

    Armory.loadAssets();
    Arm.loadAssets();

    Buff.loadAssets();
    ParticleSystem.loadAssets();

    Bow.loadAssets();
    LifePotion.loadAssets();
    Mine.loadAssets();

    /*
    gEngine.Textures.loadTexture(Background.eAssets.eEasternCityTexture);
    gEngine.Textures.loadTexture(Background.eAssets.eOutskirtsTexture);
    gEngine.Textures.loadTexture(Background.eAssets.eTownTexture);

    gEngine.Textures.loadTexture(Background.eAssets.eSkyCloudyTexture);
    gEngine.Textures.loadTexture(Background.eAssets.eSkyNightCloudyTexture);
    gEngine.Textures.loadTexture(Background.eAssets.eSkyDuskTexture);
    */
};

SceneA.prototype.unloadScene = function () {
    // Beautiful but doesn't work
    // Timer.unloadAssets();
    Background.loadAssets(this.mPlace, this.mSky, this.mBgm);

    Player.unloadAssets();
    Archer.unloadAssets();
    Arrow.unloadAssets();

    HpBar.unloadAssets();
    ShootController.unloadAssets();
    PlayerMark.unloadAssets();
    Timer.loadAssets();

    Armory.unloadAssets();
    Arm.unloadAssets();

    Buff.unloadAssets();
    ParticleSystem.unloadAssets();

    Bow.unloadAssets();
    LifePotion.unloadAssets();
    Mine.unloadAssets();

    /*
    gEngine.Textures.unloadTexture(Background.eAssets.eSkyCloudyTexture);
    gEngine.Textures.unloadTexture(Background.eAssets.eSkyNightCloudyTexture);
    gEngine.Textures.unloadTexture(Background.eAssets.eSkyDuskTexture);

    gEngine.Textures.unloadTexture(Background.eAssets.eTownTexture);
    gEngine.Textures.unloadTexture(Background.eAssets.eEasternCityTexture);
    gEngine.Textures.unloadTexture(Background.eAssets.eOutskirtsTexture);
    */

    var nextLevel;
    switch (this.mGame.getState()) {
        case Game.eGameState.ePlayer1_Win: {
            this.mGame.setState(Game.eGameState.eGameOver);
            nextLevel = new GameOver1(this.mGame);
            this.mGame.mCurrentScene = nextLevel;
            gEngine.Core.startScene(nextLevel);
            break;
        }
        case Game.eGameState.ePlayer2_Win: {
            this.mGame.setState(Game.eGameState.eGameOver);
            nextLevel = new GameOver2(this.mGame);
            this.mGame.mCurrentScene = nextLevel;
            gEngine.Core.startScene(nextLevel);
            break;
        }
    }
};


SceneA.prototype.initialize = function () {
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.mAllObjs = new GameObjectSet();
    this.mAllObstacles = new GameObjectSet();
    this.mDestroyable = new GameObjectSet();

    this.mProps = new GameObjectSet();

    this.mBackground = new Background(this.mPlace, this.mSky);

    this.mGame.initialize(this.mAllObjs, this.mAllObstacles, this.mDestroyable, this.mProps, this.mBackground);

    this.createBounds();

    // Players
    var player;

    player = this.mGame.getPlayerAt(0);
    this.mAllObjs.addToSet(player.getArcher());
    this.mAllObstacles.addToSet(player.getArcher());

    player = this.mGame.getPlayerAt(1);
    this.mAllObjs.addToSet(player.getArcher());
    this.mAllObstacles.addToSet(player.getArcher());

    // Props
    var i, tempX, tempY;
    for (i = 0; i < 2; i++) {
        tempX = Game.random(0, 480) - 240;
        tempY = Game.random(110, 170) - 70;
        var lifePotion = LifePotion.randomLifePotion(
            tempX, tempY,
            this.mAllObjs, this.mAllObstacles, this.mDestroyable
        );
        this.mAllObjs.addToSet(lifePotion);
        this.mDestroyable.addToSet(lifePotion);
        this.mProps.addToSet(lifePotion);
        lifePotion = LifePotion.randomLifePotion(
            -tempX, tempY,
            this.mAllObjs, this.mAllObstacles, this.mDestroyable
        );
        this.mAllObjs.addToSet(lifePotion);
        this.mDestroyable.addToSet(lifePotion);
        this.mProps.addToSet(lifePotion);
    }

    for (i = 0; i < 4; i++) {
        tempX = Game.random(0, 480) - 240;
        tempY = Game.random(110, 170) - 70;
        var newBow = Bow.randomBow(tempX, tempY);
        this.mAllObjs.addToSet(newBow);
        this.mDestroyable.addToSet(newBow);
        this.mProps.addToSet(newBow);
        newBow = Bow.randomBow(-tempX, tempY);
        this.mAllObjs.addToSet(newBow);
        this.mDestroyable.addToSet(newBow);
        this.mProps.addToSet(newBow);
    }

    /*
    newBow = new Bow(-200, 100, Arm.eArmNum.ePuncturingArrow, 1, 50);
    this.mAllObjs.addToSet(newBow);
    this.mDestroyable.addToSet(newBow);
    this.mProps.addToSet(newBow);

    newBow = new Bow(200, 100, Arm.eArmNum.ePuncturingArrow, 1, 50);
    this.mAllObjs.addToSet(newBow);
    this.mDestroyable.addToSet(newBow);
    this.mProps.addToSet(newBow);
    */
};

SceneA.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        if (gEngine.AudioClips.isBackgroundAudioPlaying() === true) {
            gEngine.AudioClips.stopBackgroundAudio();
            this.mIsBgmPlay = false;
        }
        else if (gEngine.AudioClips.isBackgroundAudioPlaying() === false) {
            this.mIsBgmPlay = true;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {
        if (gEngine.AudioClips.isBackgroundAudioPlaying() === true)
            gEngine.AudioClips.stopBackgroundAudio();
        this.mBgm++;
        this.mBgm %= 6;
        /*
        switch (this.mBgm) {
            case Background.eBgm.eBgm_1: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_1);
                break;
            }
            case Background.eBgm.eBgm_2: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_2);
                break;
            }
            case Background.eBgm.eBgm_3: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_3);
                break;
            }
            case Background.eBgm.eBgm_4: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_4);
                break;
            }
            case Background.eBgm.eBgm_5: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_5);
                break;
            }
            case Background.eBgm.eBgm_6: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_6);
                break;
            }
            default: {
                gEngine.AudioClips.unloadAudio(Background.eAudio.eBgm_1);
                break;
            }
        }

        this.mBgm++;
        this.mBgm %= 6;

        switch (this.mBgm) {
            case Background.eBgm.eBgm_1: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_1);
                break;
            }
            case Background.eBgm.eBgm_2: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_2);
                break;
            }
            case Background.eBgm.eBgm_3: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_3);
                break;
            }
            case Background.eBgm.eBgm_4: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_4);
                break;
            }
            case Background.eBgm.eBgm_5: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_5);
                break;
            }
            case Background.eBgm.eBgm_6: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_6);
                break;
            }
            default: {
                gEngine.AudioClips.loadAudio(Background.eAudio.eBgm_1);
                break;
            }
        }
        */
    }
    if (this.mIsBgmPlay === true && gEngine.AudioClips.isBackgroundAudioPlaying() === false) {
        var bgm;
        switch (this.mBgm) {
            case Background.eBgm.eBgm_1: {
                bgm = Background.eAudio.eBgm_1;
                break;
            }
            case Background.eBgm.eBgm_2: {
                bgm = Background.eAudio.eBgm_2;
                break;
            }
            case Background.eBgm.eBgm_3: {
                bgm = Background.eAudio.eBgm_3;
                break;
            }
            case Background.eBgm.eBgm_4: {
                bgm = Background.eAudio.eBgm_4;
                break;
            }
            case Background.eBgm.eBgm_5: {
                bgm = Background.eAudio.eBgm_5;
                break;
            }
            case Background.eBgm.eBgm_6: {
                bgm = Background.eAudio.eBgm_6;
                break;
            }
            default: {
                bgm = Background.eAudio.eBgm_1;
                break;
            }
        }
        gEngine.AudioClips.playBackgroundAudio(bgm);
    }

    this.mGame.update();
    this.mAllObjs.update(this.mGame.getCurrentPlayer().getMainCamera());

    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        if (gEngine.AudioClips.isBackgroundAudioPlaying() === true)
            gEngine.AudioClips.stopBackgroundAudio();
        this.mGame.setState(Game.eGameState.ePlayer1_Win);
        gEngine.GameLoop.stop();
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        if (gEngine.AudioClips.isBackgroundAudioPlaying() === true)
            gEngine.AudioClips.stopBackgroundAudio();
        this.mGame.setState(Game.eGameState.ePlayer2_Win);
        gEngine.GameLoop.stop();
    }
};

SceneA.prototype.draw = function () {
    gEngine.Core.clearCanvas([1.0, 1.0, 1.0, 0.0]); // clear to light gray

    var player = this.mGame.getCurrentPlayer();
    player.draw();

    var opponent;
    if (player.mIndex === 0)
        opponent = this.mGame.getPlayerAt(1);
    else if (player.mIndex === 1)
        opponent = this.mGame.getPlayerAt(0);
    opponent.draw();

    this.mCollisionInfos = [];
};

SceneA.prototype.createBounds = function () {
    var x = 15;
    for (x = -250; x <= 250; x += 100) {
        this.platformAt(x, -100, 20, 0, Background.eTerrainAssets.ePlatformTexture);
        this.platformAt(x + 20, -100, 20, 0, Background.eTerrainAssets.ePlatformTexture);
        this.platformAt(x + 40, -100, 20, 0, Background.eTerrainAssets.ePlatformTexture);
        this.platformAt(x + 60, -100, 20, 0, Background.eTerrainAssets.ePlatformTexture);
        this.platformAt(x + 80, -100, 20, 0, Background.eTerrainAssets.ePlatformTexture);
    }

    var y, x, rand;
    for (y = -75; y <= 50; y += 25) {
        for (x = -250; x <= 250; ) {
            rand = Game.random(20, (y + 360) / 3);
            x += rand;
            this.platformAt(x, y, 20, 0, Background.eTerrainAssets.ePlatformTexture);
        }
    }
};

SceneA.prototype.wallAt = function (x, y, w, texture) {
    var h = w * 4;
    var p = new TextureRenderable(texture);
    var xf = p.getXform();

    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);

    //g.toggleDrawRigidShape();

    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mAllObjs.addToSet(g);
    this.mAllObstacles.addToSet(g);
};

SceneA.prototype.platformAt = function (x, y, w, rot, texture) {
    var h = w / 8;
    var p = new TextureRenderable(texture);
    var xf = p.getXform();

    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);

    //g.toggleDrawRigidShape();

    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
    this.mAllObstacles.addToSet(g);
};