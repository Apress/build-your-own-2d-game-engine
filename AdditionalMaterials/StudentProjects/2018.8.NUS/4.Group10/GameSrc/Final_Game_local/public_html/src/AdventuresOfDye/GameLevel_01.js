/*
 * File: GameLevel_01.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, White, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_01(level, ifMask, ifRotation) {
    var flag=0;
    var win_flag=0;
    // this.kLevelFinishedPosition = 65;
    this.ifMask = ifMask;
    this.ifRotation = ifRotation;
    //My implementation
    this.sSceneFile="assets/"+level+"/"+level+".xml";
    this.sBg="assets/"+level+"/"+level+".jpg";
    this.sMask="assets/"+level+"/Mask.png";
    this.sHeroBlack="assets/"+"Black.png";
    this.sHeroWhite="assets/"+"White.png";
    this.sBGun = "assets/"+"gun_black.png";
    this.sWGun = "assets/"+"gun_white.png";
    this.sBullet = "assets/"+"gun_bullet_left.png";
    this.gun_wav = "assets/gun_fire.wav";
    var random_flag = Math.floor(Math.random()*3);
    switch(random_flag){
        case 0:
            this.kBgClip = "assets/bgm.mp3";
            break;
        case 1:
            this.kBgClip = "assets/bgm_2.mp3";
            break;
        case 2:
            this.kBgClip = "assets/bgm_3.mp3";
            break;
    }
    this.beHit = "assets/die.wav";
    this.die_wav = "assets/die.wav";
    this.sBlackHP = "assets/"+"BlackHP.png";//血量条
    this.sWhiteHP = "assets/"+"WhiteHP.png";
    
    /********************************************************/
    this.weapon_0 = "assets/"+"weapon_0.png";
    this.weapon_1 = "assets/"+"weapon_1.png";
    this.weapon_2 = "assets/"+"weapon_2.png";
    this.weapon_3 = "assets/"+"weapon_3.png";
    this.weapon_4 = "assets/"+"weapon_4.png";
    this.Sniper_fire = "assets/"+"sniper_fire.wav";
    this.Sstatus = "assets/"+"SetStatus.wav";
    this.Up_life = "assets/"+"up_blood.mp3";
    this.Bomb = "assets/"+"landmine.mp3";
    /**********************************************///more music and image
    this.sJump = "assets/"+"jump.wav";
    this.sWin = "assets/"+"win_battle.wav";
    /*************************************************/
    // The camera to view the scene
    this.mCamera = null;

    this.mBlackCam = null;
    this.mWhiteCam = null;
    this.mWhiteShow = null;
    this.mBlackShow = null;

    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;
    this.mIllumWhiteHero = null;
    this.B_weapon = null;
    this.W_weapon = null;
    this.bg=null;
    this.bgRotation=null;
    this.mBlackHP = null;
    this.mWhiteHP = null;

    this.mThisLevel = level;
    this.mRestart = false;

    this.mAllWalls = new GameObjectSet();
    
    
    /****************************************///weapon_shot delay
    this.frame_B = 60;
    this.frame_W = 60;
    /***************************************///weapon_drop_lib
    this.weapon_random_lib = null;
    /************************************/
    
    if(this.ifMask === 1){
        this.sMask = "assets/"+level+"/Mask.png";
    }
}
gEngine.Core.inheritPrototype(GameLevel_01, Scene);

GameLevel_01.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.sJump);
    gEngine.AudioClips.loadAudio(this.beHit);
    gEngine.AudioClips.loadAudio(this.sWin);
   
    gEngine.AudioClips.loadAudio(this.Bomb);
    gEngine.AudioClips.loadAudio(this.Up_life);
    gEngine.AudioClips.loadAudio(this.Sstatus);
    gEngine.AudioClips.loadAudio(this.Sniper_fire);
    gEngine.AudioClips.loadAudio(this.gun_wav);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.die_wav);
    
    /****************************************///weapon
    gEngine.Textures.loadTexture(this.weapon_0);
    gEngine.Textures.loadTexture(this.weapon_1);
    gEngine.Textures.loadTexture(this.weapon_2);
    gEngine.Textures.loadTexture(this.weapon_3);
    gEngine.Textures.loadTexture(this.weapon_4);
    
    /**************************************/
    
    gEngine.Textures.loadTexture(this.sBullet);
    gEngine.Textures.loadTexture(this.sBGun);
    gEngine.Textures.loadTexture(this.sWGun);
    gEngine.Textures.loadTexture(this.sBg);
    gEngine.Textures.loadTexture(this.sMask);
    gEngine.Textures.loadTexture(this.sHeroBlack);
    gEngine.Textures.loadTexture(this.sHeroWhite);
    gEngine.Textures.loadTexture(this.sBlackHP);
    gEngine.Textures.loadTexture(this.sWhiteHP);
    gEngine.TextFileLoader.loadTextFile(this.sSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    if(this.ifMask === 1){
        gEngine.Textures.loadTexture(this.sMask);
    }
};

GameLevel_01.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.gun_wav);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.die_wav);
    
    gEngine.AudioClips.unloadAudio(this.Bomb);
    gEngine.AudioClips.unloadAudio(this.Up_life);
    gEngine.AudioClips.unloadAudio(this.Sstatus);
    gEngine.AudioClips.unloadAudio(this.Sniper_fire);
    gEngine.AudioClips.unloadAudio(this.sJump);
    gEngine.AudioClips.unloadAudio(this.beHit);
    gEngine.AudioClips.unloadAudio(this.sWin);
    /**********************************************/
    gEngine.Textures.unloadTexture(this.weapon_0);
    gEngine.Textures.unloadTexture(this.weapon_1);
    gEngine.Textures.unloadTexture(this.weapon_2);
    gEngine.Textures.unloadTexture(this.weapon_3);
    gEngine.Textures.unloadTexture(this.weapon_4);
    
    /**********************************************/
    
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.sBullet);
    gEngine.Textures.unloadTexture(this.sBGun);
    gEngine.Textures.unloadTexture(this.sWGun);
    gEngine.Textures.unloadTexture(this.sHeroBlack);
    gEngine.Textures.unloadTexture(this.sHeroWhite);
    gEngine.Textures.unloadTexture(this.sBg);
    gEngine.Textures.unloadTexture(this.sMask);
    gEngine.Textures.unloadTexture(this.sSceneFile);
    gEngine.Textures.unloadTexture(this.sBlackHP);
    gEngine.Textures.unloadTexture(this.sWhiteHP);
    
    if(this.ifMask === 1)
    {
        gEngine.Textures.unloadTexture(this.sMask);
    }
    if (this.mRestart === true)
    {
        var nextLevel = new GameLevel_01("Level1");  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } 
    
    if(this.win_flag===0){
        var nextLevel = new WhiteWin();
        gEngine.Core.startScene(nextLevel);
    }
    
    if(this.win_flag===1){
        var nextLevel = new BlackWin();
        gEngine.Core.startScene(nextLevel);
    }

};

GameLevel_01.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1.0);
    // parse the entire scene
    var parser = new SceneFileParser(this.sSceneFile);
    this.mCamera = parser.parseCamera();

    // parse background, needs the camera as a reference for parallax
    this.bgRotation = parser.parseBackground(this.mThisLevel, this.mCamera);
    this.bg = parser.parseMask(this.mThisLevel, this.mCamera);

    var w = parser.parseWall();
    for (var i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new BlackHero(this.sHeroBlack);
    this.mIllumWhiteHero = new WhiteHero(this.sHeroWhite);
    
    this.weapon_random_lib = new weapon_random_lib();
    
    
    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumWhiteHero);
    
    // gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
     
    
    
    this.mBlackCam = new Camera(
        vec2.fromValues(2048, 1532),
        64,
        [0, 0, 50, 25],
        2
    );
    this.mBlackShow = false;

    this.mWhiteCam = new Camera(
        vec2.fromValues(2048, 1532),
        64,
        [0, 0, 50, 25],
        2
    );
    this.mWhiteShow = false;

    this.mBlackHP=new HP(this.sBlackHP);
    this.mWhiteHP=new HP(this.sWhiteHP);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_01.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    
    this.mIllumHero.bullet_lib.draw(this.mCamera);
    this.mIllumWhiteHero.bullet_lib.draw(this.mCamera);
    
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    
    if(this.mBlackShow){
        this.mBlackCam.setupViewProjection();
        this.mBlackHP.draw(this.mBlackCam);
    }

    if(this.mWhiteShow){
        this.mWhiteCam.setupViewProjection();
        this.mWhiteHP.draw(this.mWhiteCam);
    }

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_01.prototype.update = function () {
    
    var i;
    this.blood_change = null;
    /**********************************************/
    this.weapon_random_lib.update();
    this.blood_change = this.weapon_random_lib.update_collision(this.mIllumHero);
    if(this.blood_change !== 0)
    {
        this.mIllumHero.Add_Hp(this.blood_change);
        var hp=Math.floor((Number(this.mIllumHero.mHp))/25);
            this.mBlackHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mIllumHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    this.win_flag=0;
                    gEngine.GameLoop.stop();
                }
    }
    this.blood_change = this.weapon_random_lib.update_collision(this.mIllumWhiteHero);
    if(this.blood_change !== 0)
    {
        this.mIllumWhiteHero.Add_Hp(this.blood_change);
        var hp=Math.floor((Number(this.mIllumWhiteHero.mHp))/25);
            this.mWhiteHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mIllumWhiteHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    this.win_flag=1;
                    gEngine.GameLoop.stop();
                }
    }
    var deltaA=0.001;
    this.mCamera.update();  // to ensure proper interpolated movement effects
    
    this.mBlackShow=false;
    this.mWhiteShow=false;
    
    this.frame_B++;
    this.frame_W++;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)){
        this.mBlackShow=true;
        this.mBlackCam.update();
        this.mBlackCam.setViewport([
            this.mIllumHero.getXform().getXPos()-40,
            this.mIllumHero.getXform().getYPos()+40,
            50, 25]);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.O)||gEngine.Input.isKeyPressed(gEngine.Input.keys.U)){
        this.mWhiteShow=true;
        this.mWhiteCam.update();
        this.mWhiteCam.setViewport([
            this.mIllumWhiteHero.getXform().getXPos()-40,
            this.mIllumWhiteHero.getXform().getYPos()+40,
            50, 25]);
    }
    
    
   
    
    gEngine.LayerManager.updateAllLayers();
    
    if(this.ifRotation===1){
        var xform = this.bgRotation.getXform();

        xform.incRotationByDegree(1);
    }

    
    if(this.ifMask===1){
        var c = this.bg.getColor();
        var ca = c[3];
        if (this.flag===0) {
            ca = c[3] - deltaA;
        }
        if (ca<=0){
            this.flag=1;
        }
        if (this.flag===1){
            ca = c[3] + deltaA;
        }
        if (ca>=1){
            this.flag=0;
        }
        c[3] = ca;
    }
    
    

    if(this.mIllumWhiteHero.bullet_lib.bullet_count > 0)
    {
        var hp_decrease = this.mIllumWhiteHero.bullet_lib.update( this.mIllumHero);
        if(hp_decrease > 0)
        {
            this.mIllumHero.mHp-=hp_decrease;
            var hp=Math.floor((Number(this.mIllumHero.mHp))/25);
            this.mBlackHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mIllumHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    this.win_flag=0;
                    gEngine.GameLoop.stop();
                }
        }
    }
    if(this.mIllumHero.bullet_lib.bullet_count > 0)
    {
        var hp_decrease = this.mIllumHero.bullet_lib.update(this.mIllumWhiteHero);
        if(hp_decrease > 0)
        {
            this.mIllumWhiteHero.mHp-=hp_decrease;
            hp_decrease = 0;
            var hp=Math.floor((Number(this.mIllumWhiteHero.mHp))/25);
            this.mWhiteHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mIllumWhiteHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    this.win_flag=1;
                    gEngine.GameLoop.stop();
                }
        }
    }
        //delete is_collision_B;
    

    if(this.mIllumWhiteHero.getXform().getXPos()<10)  this.mIllumWhiteHero.getXform().setXPos(1000);
    if(this.mIllumWhiteHero.getXform().getXPos()>1001)  this.mIllumWhiteHero.getXform().setXPos(11);
    if(this.mIllumHero.getXform().getXPos()<10)  this.mIllumHero.getXform().setXPos(1000);
    if(this.mIllumHero.getXform().getXPos()>1001)  this.mIllumHero.getXform().setXPos(11);
    
    if(this.mIllumWhiteHero.getXform().getYPos()<0){
        gEngine.AudioClips.playACue(this.die_wav);
        this.win_flag=1;
        gEngine.GameLoop.stop();
    }
    if(this.mIllumHero.getXform().getYPos()<0){
        gEngine.AudioClips.playACue(this.die_wav);
        this.win_flag=0;
        gEngine.GameLoop.stop();
    }
    
    
    // physics simulation
    this._physicsSimulation();

    var platBox;
    var i;
    var collided = false;
    var collisionInfo = new CollisionInfo();
    for (i = 0; i < this.mAllWalls.size(); i++) {
        var platBox = this.mAllWalls.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            break;
        }
    }
    
    var platBox;
    var collided = false;
    var collisionInfo = new CollisionInfo();
    for (i = 0; i < this.mAllWalls.size(); i++) {
        var platBox = this.mAllWalls.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumWhiteHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumWhiteHero.canJump(true);
            break;
        }
    }
};

GameLevel_01.prototype._physicsSimulation = function () {

    // Hero platform
    var i;
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumWhiteHero, this.mAllWalls);
    for(i = 0; i < this.weapon_random_lib.random_weapon_max; i++)
    {
        if(this.weapon_random_lib.weapon_random[i] !== null)
            gEngine.Physics.processObjSet(this.weapon_random_lib.weapon_random[i], this.mAllWalls);
    }
};

