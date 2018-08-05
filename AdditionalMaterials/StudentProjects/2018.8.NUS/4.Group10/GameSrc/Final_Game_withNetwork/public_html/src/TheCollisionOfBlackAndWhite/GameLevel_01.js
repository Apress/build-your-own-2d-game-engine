/*
 * File: GameLevel_01.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, White, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_01(level, ifMask, ifRotation,vNewStatus,vRoomNo, ifM) {
    var flag=0;
    var win_flag=0;
    // this.kLevelFinishedPosition = 65;
    this.ifMask = ifMask;
    this.ifM=ifM;
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
    this.First_hero = "assets/First_Hero.png";
    /****************************************/
    this.kParticleTexture = "assets/particle.png";
    /*************************************************/
    // The camera to view the scene
    this.mCamera = null;

    this.mBlackCam = null;
    this.mWhiteCam = null;
    this.mWhiteShow = null;
    this.mBlackShow = null;

    // the hero and the support objects
    this.mHero = null;
    this.mFirstHero = null;
    this.mSecondHero = null;
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


    //Server status
    this.roomNo=vRoomNo;
    this.newStatus=vNewStatus;
}

gEngine.Core.inheritPrototype(GameLevel_01, Scene);

GameLevel_01.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.sJump);
    gEngine.AudioClips.loadAudio(this.beHit);
    gEngine.AudioClips.loadAudio(this.sWin);
   
    gEngine.Textures.loadTexture(this.kParticleTexture);
   
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
    gEngine.Textures.loadTexture(this.First_hero);
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
    if(this.ifMask === 1 || this.ifM===1){
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
    gEngine.Textures.unloadTexture(this.First_hero);
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
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    
    if(this.ifMask === 1 || this.ifMask === 1)
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
    if(this.ifBg===1 || this.ifMask===1){
        this.bg = parser.parseMask(this.mThisLevel, this.mCamera);
    }

    var w = parser.parseWall();
    for (var i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }

    let BlackPos=[350,380];
    let WhitePos=[480,380];
    this.mFirstHero = new FirstHero(this.newStatus?this.sHeroBlack:this.sHeroWhite
        ,this.newStatus?BlackPos[0]:WhitePos[0]
        ,this.newStatus?BlackPos[1]:WhitePos[1]);
    this.mSecondHero = new SecondHero(this.newStatus?this.sHeroWhite:this.sHeroBlack
        ,this.newStatus?WhitePos[0]:BlackPos[0]
        ,this.newStatus?WhitePos[1]:BlackPos[1]);
    
    this.weapon_random_lib = new weapon_random_lib(this.newStatus);
    
    
    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mFirstHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mSecondHero);
    
    // gEngine.LayerManager.addAsShadowCaster(this.mFirstHero);
    
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

    this.mFirstHero.bullet_lib.draw(this.mCamera);
    this.mSecondHero.bullet_lib.draw(this.mCamera);
    
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

GameLevel_01.prototype._updateFromServer = function (evt) {
    var ServerAction=evt.data.split("_");

    switch (ServerAction[0]) {
        case "action":{
            if(this.mSecondHero){
                this.mSecondHero.mPreviousHeroState=this.mSecondHero.mHeroState;
                this.mSecondHero.mHeroState=Number(ServerAction[1]);
                this.mSecondHero.getXform().setXPos(Number(ServerAction[2]));
                this.mSecondHero.getXform().setYPos(Number(ServerAction[3]));
                this.mSecondHero.mIsMoving=Boolean(Number(ServerAction[4]));
                this.mSecondHero.mCanJump=Boolean(Number(ServerAction[5]));
            }
            break;
        }
        case "weapon":{
            //[0-5]_[100-924]_[100-512]
            this.weapon_random_lib.updateWeapon(Number(ServerAction[1])
                , Number(ServerAction[2])
                , Number(ServerAction[3]));
            break;
        }
        case "fire":{
            //ServerAction[x]
            //xpos_ypos_direction
            //123.21_213.13_1
            //1 is right,0 is left
            this.mSecondHero.bullet_lib.fire(Number(ServerAction[1])
                , Number(ServerAction[2])
                , Number(ServerAction[3]));

            break;
        }
        default:
            throw "Don't know server action";
    }
};

GameLevel_01.prototype.update = function () {
    
    var i;
    this.blood_change = null;
    /**********************************************/
    this.weapon_random_lib.update();
    this.blood_change = this.weapon_random_lib.update_collision(this.mFirstHero);
    if(this.blood_change !== 0)
    {
        this.mFirstHero.Add_Hp(this.blood_change);
        var hp=Math.floor((Number(this.mFirstHero.mHp))/25);
            this.mBlackHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mFirstHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    this.win_flag=0;
                    gEngine.GameLoop.stop();
                }
    }
    this.blood_change = this.weapon_random_lib.update_collision(this.mSecondHero);
    if(this.blood_change !== 0)
    {
        this.mSecondHero.Add_Hp(this.blood_change);
        var hp=Math.floor((Number(this.mSecondHero.mHp))/25);
            this.mWhiteHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mSecondHero.mHp<=0){
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
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)){
        this.mBlackShow=true;
        this.mBlackCam.update();
        this.mBlackCam.setViewport([
            this.mFirstHero.getXform().getXPos()-40,
            this.mFirstHero.getXform().getYPos()+40,
            50, 25]);
    }

    gEngine.LayerManager.updateAllLayers();

    //Solve action
    gEngine.Network.send(String("action_"
        +String(this.mFirstHero.mHeroState))
        +"_"+String(this.mFirstHero.getXform().getXPos())
        +"_"+String(this.mFirstHero.getXform().getYPos())
        +"_"+String(this.mFirstHero.mIsMoving)
        +"_"+String(this.mFirstHero.mCanJump));

    //Solve bullet
    
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
    
    

    if(this.mSecondHero.bullet_lib.bullet_count > 0)
    {
        var hp_decrease = this.mSecondHero.bullet_lib.update( this.mFirstHero);
        if(hp_decrease > 0)
        {
            this.mFirstHero.mHp-=hp_decrease;
            var hp=Math.floor((Number(this.mFirstHero.mHp))/25);
            this.mBlackHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mFirstHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    if(this.newStatus === true)
                    {
                        this.win_flag = 0;
                    }
                    else{
                        this.win_flag = 1;
                    }
                    gEngine.GameLoop.stop();
                }
        }
    }
    if(this.mFirstHero.bullet_lib.bullet_count > 0)
    {
        var hp_decrease = this.mFirstHero.bullet_lib.update(this.mSecondHero);
        if(hp_decrease > 0)
        {
            this.mSecondHero.mHp-=hp_decrease;
            hp_decrease = 0;
            var hp=Math.floor((Number(this.mSecondHero.mHp))/25);
            this.mWhiteHP.getRenderable().setElementPixelPositions(0,256
                ,(hp-1)*32,hp*32);
                if(this.mSecondHero.mHp<=0){
                    //gEngine.AudioClips.playACue(this.die_wav);
                    gEngine.AudioClips.playACue(this.sWin);
                    if(this.newStatus === true)
                    {
                        this.win_flag=1;
                    }
                    else
                    {
                        this.win_flag = 0;
                    }
                    gEngine.GameLoop.stop();
                }
        }
    }
        //delete is_collision_B;
    

    if(this.mSecondHero.getXform().getXPos()<10)  this.mSecondHero.getXform().setXPos(1000);
    if(this.mSecondHero.getXform().getXPos()>1001)  this.mSecondHero.getXform().setXPos(11);
    if(this.mFirstHero.getXform().getXPos()<10)  this.mFirstHero.getXform().setXPos(1000);
    if(this.mFirstHero.getXform().getXPos()>1001)  this.mFirstHero.getXform().setXPos(11);
    
    if(this.mSecondHero.getXform().getYPos()<0){
        gEngine.AudioClips.playACue(this.die_wav);
        if(this.newStatus === true)
        {
            this.win_flag=1;
        }
        else
        {
            this.win_flag = 0;
        }
        gEngine.GameLoop.stop();
    }
    if(this.mFirstHero.getXform().getYPos()<0){
        gEngine.AudioClips.playACue(this.die_wav);
        if(this.newStatus === true)
        {
            this.win_flag=0;
        }
        else
        {
            this.win_flag = 1;
        }
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
        collided = this.mFirstHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mFirstHero.canJump(true);
            break;
        }
    }
};

GameLevel_01.prototype._physicsSimulation = function () {

    // Hero platform
    var i;
    gEngine.Physics.processObjSet(this.mFirstHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mSecondHero, this.mAllWalls);
    for(i = 0; i < this.weapon_random_lib.random_weapon_max; i++)
    {
        if(this.weapon_random_lib.weapon_random[i] !== null)
            gEngine.Physics.processObjSet(this.weapon_random_lib.weapon_random[i], this.mAllWalls);
    }
};

