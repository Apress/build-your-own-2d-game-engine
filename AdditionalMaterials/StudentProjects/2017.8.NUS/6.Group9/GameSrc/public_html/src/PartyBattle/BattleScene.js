/* 
 * File: BattleScene.js
 * Created by phreeze Tang 24/7/2017
 * Defined the main battle scene of our game.
 * 
 * change log:
 * 24/7/2017 create the file
 * 25/7/2017 add grenade collide judge, damage, lifebar
 * 27/7/2017 add explode
 * 29/7/2017 Ready Text
 * 30/7/2017 
 */

/* global gEngine, Scene, vec2 */

"use strict";  

function BattleScene () {
    // textures
    this.kAvatarTexture = "assets/Avatar.png";
    this.kArmsTexture = "assets/Arms.png";
    this.kFaceTexture = "assets/zhizhang.png";
    this.kExplodeTexture = "assets/Explode.png";
    this.kUltraExplodeTexture = "assets/UltraExplode.png";
    this.kWallTexture = "assets/Wall.jpg";
    this.kEggTexture = "assets/Egg.png";
    this.kCakeTexture = "assets/Cake.png";
    this.kMelonTexture = "assets/Melon.png";
    this.kUIEggTexture = "assets/Egg.bmp";
    this.kUICakeTexture = "assets/Cake.bmp";
    this.kUIMelonTexture = "assets/Melon.bmp";
    this.kUIReadyTexture = "assets/ReadyGo.png";
    this.kUIUltraTexture = "assets/Ultra1.jpg";
    this.kUIKOTexture = "assets/KO.png";
    this.kBattleBgTexture = "assets/BattleScene.jpg"; 
    //this.kPlaneTexture = "";
    this.kRocketTexture = "assets/Rocket.png";
    
    
    
    this.testTexture = "assets/ArrowDummy.png";
    this.dummyTexture = "assets/Dummy.png";
    
    // fonts
    this.kDsplFont = "assets/fonts/Consolas-72";
    
    // audio clips
    this.kBgClip = "assets/audio/battle.mp3";
    this.kKO = "assets/audio/KO.mp3";
    this.kCue = "assets/audio/Beida.mp3";
    this.kExplodeClip = "assets/audio/Explode.mp3";
    this.kUltraExplodeClip = "assets/audio/UltraExplode.mp3";
    this.kUltraHintClip = "assets/audio/UltraHint.wav";
    this.kUltraStartClip = "assets/audio/UltraStart.mp3";
    this.kReadyGoClip = "assets/audio/ReadyGo.mp3";
    
    // game objects
    this.mPlayer1 = null;
    this.mPlayer2 = null;
    this.mMainCam = null;
    this.mSubCam = null;
    this.mUIHealthBar = null;
    this.mUIP1CakeCoolDownBar = null;
    this.mUIP2CakeCoolDownBar = null;
    this.mUIP1MelonCoolDownBar = null;
    this.mUIP2MelonCoolDownBar = null;
    //this.mUIWeaponSelector1 = null;
    //this.mUIWeaponSelector2 = null;
    this.mUIReadyText = null;
    this.mUIKO1Text = null;
    this.mUIKO2Text = null;
    this.mUIUltra = null;
    this.mGround = null;
    this.mTable = null;
    this.mBattleBg = null;
    
    this.mUltra = null;
    
    this.mAllGrenades = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
    this.mAllExplosion = new GameObjectSet();
    this.mAllUIText = new GameObjectSet();
    
    // local shared vars in scene
    this.sMaxHealth = 200;
    this.sPlayer1Health = 100; // sPlayer2Health = 200 - p1;
    this.sPlayer1Win = false;
    this.sPlayer2Win = false;
    this.sPlayer1Lock = false;
    this.sPlayer2Lock = false;
    this.sFreezeTimeTick = 0;
    this.sWaitingTimeTick = 0;
    this.sInGameTimeTick = 6000;
    this.sUITextChangeTimeTick = 0;
    this.sUIStateFlag = 0;
    this.sUltraStateFlag = false;
    this.sUltraUsed = false;
    this._sSpeciallizedMoveTimeTick = 0;
    this._sSpeciallizedMoving = false;
    this._sSpeciallizedMoveDuration = 0;
    this._sSpeciallizedMoveSwitch = false;
    // this.sGameTime = 0; // in game battle time
    
    // others

    // test objects
    this.testObject = null;
    this.testInfo = null;
}
gEngine.Core.inheritPrototype(BattleScene, Scene);


BattleScene.prototype.loadScene = function () {
    // load textures
    gEngine.Textures.loadTexture(this.kAvatarTexture);
    gEngine.Textures.loadTexture(this.kArmsTexture);
    gEngine.Textures.loadTexture(this.kFaceTexture);
    gEngine.Textures.loadTexture(this.testTexture);
    gEngine.Textures.loadTexture(this.dummyTexture);
    gEngine.Textures.loadTexture(this.kExplodeTexture);
    gEngine.Textures.loadTexture(this.kUltraExplodeTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kEggTexture);
    gEngine.Textures.loadTexture(this.kCakeTexture);
    gEngine.Textures.loadTexture(this.kMelonTexture);
    gEngine.Textures.loadTexture(this.kUIEggTexture);
    gEngine.Textures.loadTexture(this.kUICakeTexture);
    gEngine.Textures.loadTexture(this.kUIMelonTexture);
    gEngine.Textures.loadTexture(this.kUIReadyTexture);
    gEngine.Textures.loadTexture(this.kUIKOTexture);
    gEngine.Textures.loadTexture(this.kRocketTexture);
    gEngine.Textures.loadTexture(this.kUIUltraTexture);
    gEngine.Textures.loadTexture(this.kBattleBgTexture);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kKO);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kUltraExplodeClip);
    gEngine.AudioClips.loadAudio(this.kUltraHintClip);
    gEngine.AudioClips.loadAudio(this.kUltraStartClip);
    gEngine.AudioClips.loadAudio(this.kExplodeClip);
    gEngine.AudioClips.loadAudio(this.kReadyGoClip);
    gEngine.Fonts.loadFont(this.kDsplFont);
};

BattleScene.prototype.unloadScene = function () { 
    gEngine.AudioClips.stopBackgroundAudio();
    // unload textures
    gEngine.Textures.unloadTexture(this.kAvatarTexture);
    gEngine.Textures.unloadTexture(this.kArmsTexture);
    gEngine.Textures.unloadTexture(this.kFaceTexture);
    gEngine.Textures.unloadTexture(this.testTexture);
    gEngine.Textures.unloadTexture(this.dummyTexture);
    gEngine.Textures.unloadTexture(this.kExplodeTexture);
    gEngine.Textures.unloadTexture(this.kUltraExplodeTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kEggTexture);
    gEngine.Textures.unloadTexture(this.kCakeTexture);
    gEngine.Textures.unloadTexture(this.kMelonTexture);
    gEngine.Textures.unloadTexture(this.kUIEggTexture);
    gEngine.Textures.unloadTexture(this.kUICakeTexture);
    gEngine.Textures.unloadTexture(this.kUIMelonTexture);
    gEngine.Textures.unloadTexture(this.kUIReadyTexture);
    gEngine.Textures.unloadTexture(this.kUIKOTexture);
    gEngine.Textures.unloadTexture(this.kRocketTexture);
    gEngine.Textures.unloadTexture(this.kUIUltraTexture);
    gEngine.Textures.unloadTexture(this.kBattleBgTexture);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kKO);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kUltraExplodeClip);
    gEngine.AudioClips.unloadAudio(this.kUltraHintClip);
    gEngine.AudioClips.unloadAudio(this.kUltraStartClip);
    gEngine.AudioClips.unloadAudio(this.kExplodeClip);
    gEngine.AudioClips.unloadAudio(this.kReadyGoClip);
    gEngine.Fonts.unloadFont(this.kDsplFont);

    
    // scene jumps
    
    if (this.sPlayer1Win === true) {
        gEngine.ResourceMap.quickLoad("BattleResult", 1);
    }
    else if (this.sPlayer2Win === true) {
        gEngine.ResourceMap.quickLoad("BattleResult", 2);
    }
    var nextScene = new ResultScene();
    gEngine.Core.startScene(nextScene);
};

BattleScene.prototype.initialize = function () {
    this.sFreezeTimeTick = 180;
    //this.sGameTime = 0;
    
    // player1 
    this.mPlayer1 = new Player(
        this.kAvatarTexture, 
        this.kArmsTexture, 
        this.kFaceTexture, 
        this.mAllGrenades, 
        -5, -2.5,
        -14, -0.75,
        true, 
        1
    );
    
    // player2
    this.mPlayer2 = new Player(
        this.kAvatarTexture,
        this.kArmsTexture, 
        this.kFaceTexture, 
        this.mAllGrenades, 
        5, -2.5,
        0.75, 14,
        false,
        2
    );
    var player2Keysets = {
        up     : gEngine.Input.keys.Up,
        down   : gEngine.Input.keys.Down,
        left   : gEngine.Input.keys.Left,
        right  : gEngine.Input.keys.Right,
        skill1 : gEngine.Input.keys.Comma,            // these settings are not the final version.
        skill2 : gEngine.Input.keys.Dot,
        fire   : gEngine.Input.keys.L,
        ultra  : gEngine.Input.keys.Enter
    };
    this.mPlayer2.setKeys(player2Keysets);
    
    // walls
    this.mGround = new Wall(this.kWallTexture, 0, -6, 50, 5);
    this.mAllWalls.addToSet(this.mGround);
    this.mTable = new Wall(this.kWallTexture, 0, -0.55, 1, 3);
    this.mAllWalls.addToSet(this.mTable);
    
    // bg
    this.mBattleBg = new SpriteRenderable(this.kBattleBgTexture);
    this.mBattleBg.setElementPixelPositions(0, 815, 0, 420);
    this.mBattleBg.setColor([1, 1, 1, 0.65]);
    this.mBattleBg.getXform().setPosition(0, 3.5);
    this.mBattleBg.getXform().setSize(30, 16.875);
    
    // health bar & cooldown bar
    this.mUIHealthBar = new HealthBar(this.dummyTexture, this.dummyTexture, this.dummyTexture, this.sMaxHealth);
    this.mUIP1CakeCoolDownBar = new CooldownBar(this.kUICakeTexture, this.kDsplFont, -12, -5);
    this.mUIP2CakeCoolDownBar = new CooldownBar(this.kUICakeTexture, this.kDsplFont, 10, -5);
    this.mUIP1MelonCoolDownBar = new CooldownBar(this.kUIMelonTexture, this.kDsplFont, -10, -5);
    this.mUIP2MelonCoolDownBar = new CooldownBar(this.kUIMelonTexture, this.kDsplFont, 12, -5);
    
    // other objects
    this.mUIReadyText = new UIText(this.kUIReadyTexture, 0, 0, 12, 6);
    this.mUIReadyText.mUIText.setElementUVCoordinate(0, 1, 0.5, 1);
    this.mAllUIText.addToSet(this.mUIReadyText);
    
    this.mUIKO1Text = new UIText(this.kUIKOTexture, -5, 0, 8, 16);
    this.mUIKO1Text.mUIText.setElementUVCoordinate(0, 0.5, 0, 1);
    this.mAllUIText.addToSet(this.mUIKO1Text);
    this.mUIKO1Text.setVisibility(false);
    
    this.mUIKO2Text = new UIText(this.kUIKOTexture, 5, 0, 8, 16);
    this.mUIKO2Text.mUIText.setElementUVCoordinate(0.5, 1, 0, 1);
    this.mAllUIText.addToSet(this.mUIKO2Text);
    this.mUIKO2Text.setVisibility(false);
    
    this.mUIUltra = new UIText(this.kUIUltraTexture, 0, 0, 30, 15);
    this.mUIUltra.mUIText.setElementUVCoordinate(0, 1, 0, 1);
    this.mAllUIText.addToSet(this.mUIUltra);
    this.mUIUltra.setVisibility(false);
            
    this.sUITextChangeTimeTick = 180;
    
    this.mUltra = new Ultra(this.mAllExplosion, this.mAllGrenades);
    
    // test object
    this.testObject = new Renderable();
    this.testObject.setColor([1.0, 1.0, 0.0, 1.0]);
    this.testInfo = new FontRenderable("N/A");
    this.testInfo.setFont(this.kDsplFont);
    this.testInfo.setColor([0.0, 0.0, 0.0, 1.0]);
    //this.testInfo.getXform().setPosition(this.sPosX - 0.4, this.sPosY + 0.1);
    //this.testInfo.setTextHeight(this.sHeight / 2);
    
    // main camera
    this.mMainCam = new Camera (vec2.fromValues(0, 0), 30, [0, 0, 1280, 720], 0);
    this.mMainCam.setBackgroundColor([0.9, 0.9, 0.9, 1.0]);
    
    // sub camera
    this.mSubCam = new Camera (vec2.fromValues(0, 3), 30, [640 - 80, /*360 - 45 - 250*/ 0, 160, 90], 0);
    this.mSubCam.setBackgroundColor([0.9, 0.9, 0.9, 1.0]);
    
    // audio play
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

BattleScene.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mMainCam.setupViewProjection();
    this.mBattleBg.draw(this.mMainCam);
    this.mUltra.draw(this.mMainCam);
    this.mAllGrenades.draw(this.mMainCam);
    this.mAllWalls.draw(this.mMainCam);
    this.mPlayer1.draw(this.mMainCam);
    this.mPlayer2.draw(this.mMainCam);
    this.mAllExplosion.draw(this.mMainCam);
   
    this.mUIHealthBar.draw(this.mMainCam);
    this.mUIP1CakeCoolDownBar.draw(this.mMainCam);
    this.mUIP2CakeCoolDownBar.draw(this.mMainCam);
    this.mUIP1MelonCoolDownBar.draw(this.mMainCam);
    this.mUIP2MelonCoolDownBar.draw(this.mMainCam);
    this.mAllUIText.draw(this.mMainCam);
    
    // test object
    //this.testObject.draw(this.mMainCam);
    //this.testInfo.draw(this.mMainCam);
    
    // subcam
    this.mSubCam.setupViewProjection();
    //this.mBattleBg.draw(this.mSubCam);
    this.mUltra.draw(this.mSubCam);
    this.mAllGrenades.draw(this.mSubCam);
    this.mAllWalls.draw(this.mSubCam);
    this.mPlayer1.draw(this.mSubCam);
    this.mPlayer2.draw(this.mSubCam);
    this.mAllExplosion.draw(this.mSubCam);
};

BattleScene.prototype.update = function () {
    // UI updates
    
    // health bar
    this.mUIHealthBar.update(this.sPlayer1Health, this.sMaxHealth);
    this.mUIP1CakeCoolDownBar.update(this.mPlayer1.sCakeCDTick, this.mPlayer1.sMaxCakeCD);
    this.mUIP2CakeCoolDownBar.update(this.mPlayer2.sCakeCDTick, this.mPlayer2.sMaxCakeCD);
    this.mUIP1MelonCoolDownBar.update(this.mPlayer1.sMelonCDTick, this.mPlayer1.sMaxMelonCD);
    this.mUIP2MelonCoolDownBar.update(this.mPlayer2.sMelonCDTick, this.mPlayer2.sMaxMelonCD);
    
    // text UI
    if (this.sUITextChangeTimeTick > 0) this.sUITextChangeTimeTick--;
    if (this.sUIStateFlag === 0) {
        if (this.sUITextChangeTimeTick <= 90) {
            this.sUIStateFlag = 1;
            gEngine.AudioClips.playACue(this.kReadyGoClip);
        }
    }
    if (this.sUIStateFlag === 1) {
        if (this.sUITextChangeTimeTick <= 30) {
            this.sUIStateFlag = 2;
            this.mUIReadyText.mUIText.setElementUVCoordinate(0, 1, 0, 0.5);
        }
    }
    if (this.sUIStateFlag === 2) {
        if (this.sUITextChangeTimeTick <= 0) {
            this.sUIStateFlag = 3;
            this.mUIReadyText.setVisibility(false);
        }
    }
    if (this.sUIStateFlag === 3) {
        if (this.sPlayer1Win || this.sPlayer2Win) {
            this.sUIStateFlag = 4;
            this.sUITextChangeTimeTick = 55;
        }
    }
    if (this.sUIStateFlag === 4) {
        if (this.sUITextChangeTimeTick <= 35) {
            this.sUIStateFlag = 5;
            this.mUIKO1Text.setVisibility(true);
        }
    }
    if (this.sUIStateFlag === 5) {
        if (this.sUITextChangeTimeTick <= 0) {
            this.mUIKO2Text.setVisibility(true);
        }
    }
    this._speciallizedMove(this.mUIUltra, -20, 20, 60);
    
    // play objects update
    // if freezing, any other thing below should be paused
    if (this.sFreezeTimeTick > 0) {
        this.sFreezeTimeTick--;
        return;
    }
    if (this.sWaitingTimeTick > 0) {
        this.sWaitingTimeTick--;
    }
    // timetick and maxHealth
    this.sInGameTimeTick--;
    if (this.sMaxHealth >= 2) {
        this.sMaxHealth -= 2 / 60;
        this.sPlayer1Health -= 1 / 60;
    }
    
    // return if game set
    if ((this.sPlayer1Win || this.sPlayer2Win) && this.sWaitingTimeTick <= 0){
        gEngine.GameLoop.stop();
        return;
    }
    
    if (this.sUltraStateFlag === true) {
        if (this._sSpeciallizedMoveSwitch) {
            this.mUltra.startUltra(1, this.mPlayer2, this.mPlayer1);
            this.mUIUltra.mUIText.getXform().setSize(-30, 15);
        }
        else {
            this.mUltra.startUltra(1, this.mPlayer1, this.mPlayer2);
            this.mUIUltra.mUIText.getXform().setSize(30, 15);
        }
        this.sUltraStateFlag = false;
        //this.mMainCam.setBackgroundColor([0.9, 0.9, 0.9, 1.0]);
        this.mBattleBg.setColor([1.0, 1.0, 1.0, 0.65]);
    }
    
    // lock
    if (!this.sUltraUsed) {
        if (this.sPlayer1Lock) {
            gEngine.AudioClips.playACue(this.kUltraHintClip);
            this.mPlayer1.sFatigue = true;
            this._sSpeciallizedMoveSwitch = true;
            this._speciallizedMoveStart(60);
            this.sFreezeTimeTick = 60;
            this.mUIUltra.setVisibility(true);
            this.sUltraStateFlag = true;
            this.sUltraUsed = true;
            //this.mMainCam.setBackgroundColor([0.2, 0.2, 0.2, 1.0]);
            this.mBattleBg.setColor([0.0, 0.0, 0.0, 0.9]);
        }
        else if (this.sPlayer2Lock) {
            gEngine.AudioClips.playACue(this.kUltraHintClip);
            this.mPlayer2.sFatigue = true;
            this._speciallizedMoveStart(60);
            this.sFreezeTimeTick = 60;
            this.mUIUltra.setVisibility(true);
            this.sUltraStateFlag = true;
            this.sUltraUsed = true;
            //this.mMainCam.setBackgroundColor([0.2, 0.2, 0.2, 1.0]);
            this.mBattleBg.setColor([0.0, 0.0, 0.0, 0.9]);
        }
    }

    
    if (this.sWaitingTimeTick <= 0) this.mPlayer1.update();
    if (this.sWaitingTimeTick <= 0) this.mPlayer2.update();
    this.mAllGrenades.update();
    this.mAllExplosion.update();
    this.mUltra.update();
    
    
    // judge for grenades hit and remove
    var i, j, tempGrenade, tempWall, gBound;
    for (i = 0; i < this.mAllGrenades.size(); i++) {
        tempGrenade = this.mAllGrenades.getObjectAt(i);
        gBound = tempGrenade.getBBox();
        for (j = 0; j < this.mAllWalls.size(); j++) {
            tempWall = this.mAllWalls.getObjectAt(j);
            if (tempWall.getBBox().intersectsBound(gBound)) {
                if (tempGrenade.sIsExplode === true) this._grenadeExplode(tempGrenade);
                this.mAllGrenades.removeFromSet(tempGrenade);
                break;
            }
        }
    }
    
    
    // damage to player
    var player1Bound = this.mPlayer1.getBBox();
    for (i = 0; i < this.mAllGrenades.size(); i++) {
        tempGrenade = this.mAllGrenades.getObjectAt(i);
        gBound = tempGrenade.getBBox();
        if (tempGrenade.getBBox().intersectsBound(player1Bound) && tempGrenade.sOwnerIndex === 2) {
            // audio
            gEngine.AudioClips.playACue(this.kCue);
            // damage
            this.sPlayer1Health -= tempGrenade.sDamagePerHit;
            if (tempGrenade.sIsExplode === true) this._grenadeExplode(tempGrenade);
            this.mAllGrenades.removeFromSet(tempGrenade);
        }
    }
    var player2Bound = this.mPlayer2.getBBox();
    for (i = 0; i < this.mAllGrenades.size(); i++) {
        tempGrenade = this.mAllGrenades.getObjectAt(i);
        gBound = tempGrenade.getBBox();
        if (tempGrenade.getBBox().intersectsBound(player2Bound) && tempGrenade.sOwnerIndex === 1) {
            // audio
            gEngine.AudioClips.playACue(this.kCue);
            // damage
            this.sPlayer1Health += tempGrenade.sDamagePerHit;
            if (tempGrenade.sIsExplode === true) this._grenadeExplode(tempGrenade);
            this.mAllGrenades.removeFromSet(tempGrenade);
        }
    }
    
    
    // judge for expolsions hit and remove
    var tempExplosion;
    var h = [];
    for (i = 0; i < this.mAllExplosion.size(); i++) {
        tempExplosion = this.mAllExplosion.getObjectAt(i);
        if (this.mPlayer1.pixelTouches(tempExplosion, h) && !tempExplosion.sIsProcessedP1) {
            this.sPlayer1Health -= tempExplosion.sDamagePerHit;
            if (tempExplosion.sType === 1) this.sPlayer1HitByUltra = true;
            tempExplosion.sIsProcessedP1 = true;
        }
        else if (this.mPlayer2.pixelTouches(tempExplosion, h) && !tempExplosion.sIsProcessedP2) {
            this.sPlayer1Health += tempExplosion.sDamagePerHit;
            if (tempExplosion.sType === 2) this.sPlayer2HitByUltra = true;
            tempExplosion.sIsProcessedP2 = true;
        }
        if (tempExplosion.sLifeTimeTick <= 0) this.mAllExplosion.removeFromSet(tempExplosion);
    }
    
    
    // result judge
    if (this.sPlayer1Health <= 0) {
        this.sPlayer1Health = 0;
        this.sPlayer1Lock = true;
        //this.sPlayer2Win = true;
        //gEngine.AudioClips.playACue(this.kKO);
        //this.sFreezeTimeTick = 180;
    }
    else if (this.sPlayer1Health >= this.sMaxHealth) {
        this.sPlayer1Health = this.sMaxHealth;
        this.sPlayer2Lock = true;
        //this.sPlayer1Win = true;
        //gEngine.AudioClips.playACue(this.kKO);
        //this.sFreezeTimeTick = 180;
    }
    
    if (this.sPlayer1HitByUltra && !this.sPlayer2Win) {
        this.sPlayer2Win = true;
        gEngine.AudioClips.playACue(this.kKO);
        this.sWaitingTimeTick = 180;
    }
    else if (this.sPlayer2HitByUltra && !this.sPlayer1Win) {
        this.sPlayer1Win = true;
        gEngine.AudioClips.playACue(this.kKO);
        this.sWaitingTimeTick = 180;
    }
    
    // others 
    
    
    // test objects
    //this.testObject.update();
    //if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) this._speciallizedMoveStart(60);
    //this._speciallizedMove(this.testObject, -10, 10, 60);
    this.testInfo.setText(this.sInGameTimeTick.toFixed(0));
};

BattleScene.prototype._grenadeExplode = function (grenade) {  // judge first bufore call
    var tempPos = grenade.getXform().getPosition();
    var tempExplosion = new Explosion(this.kExplodeTexture, tempPos[0], tempPos[1], 3, 0, 20);
    this.mAllExplosion.addToSet(tempExplosion);
    gEngine.AudioClips.playACue(this.kExplodeClip);
};

// this function is just like a bullshit
// only one cut scene will work at the same time
BattleScene.prototype._speciallizedMoveStart = function (duration) {
    this._sSpeciallizedMoving = true;
    this._sSpeciallizedMoveTimeTick = duration;
    this._sSpeciallizedMoveDuration = duration;
};

BattleScene.prototype._speciallizedMove = function (gameObject, startPos, endPos) {
    if (this._sSpeciallizedMoveSwitch) {
        var mid=startPos; startPos=endPos; endPos=mid;
    }
    if (!this._sSpeciallizedMoving) return;
    if (this._sSpeciallizedMoving && this._sSpeciallizedMoveTimeTick <= 0) {
        this._sSpeciallizedMoving = false;
    }
    this._sSpeciallizedMoveTimeTick--;
    
    var midPos = (startPos + endPos) / 2.0;
    var length = (endPos - startPos);
    var x = 1 - 2 * this._sSpeciallizedMoveTimeTick / this._sSpeciallizedMoveDuration;
    gameObject.getXform().setXPos(midPos + length*x*x*x*x*x);
};
