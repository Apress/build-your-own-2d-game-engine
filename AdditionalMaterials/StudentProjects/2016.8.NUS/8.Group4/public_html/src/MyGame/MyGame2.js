/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame2() {
    
    this.kBgBrick = "assets/bgBrick.png";
    this.kBullet = "assets/bullet.png";
    this.kBullet2 = "assets/bullet2.png";
    this.kHero = "assets/Hero.png";
    this.kEnemy = "assets/Enemy.png";
    this.kSuperEnemy = "assets/SuperEnemy.png";
    this.kFloor5 = "assets/Floor6.png";
    //音乐
    this.kGameBGSong = "assets/BGClip2.mp3";
    this.kGameCueSound = "assets/BlueLevel_cue.wav";
    this.kGameCueSound2 = "assets/hero_die.wav";
    this.kGameCueSound3 = "assets/enemy_die.wav";
    this.kGameCueSound4 = "assets/enemy_die2.wav";
    this.kGameCueSound5 = "assets/medicine.wav";
    //medicine
    this.kMedicine="assets/Medicine.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mSmallCamera = null;
    this.mBgBrick = [];
   
    this.mFloor = null;
    this.mHero = null;
    
    this.mBullet = [];
    
    this.mEnemyBullet = [];
    
    this.mSuperEnemyBullet = [];
    
    this.mEnemy = [];
    
    this.mSuperEnemy = [];
    
    this.mMedicine = [];
    
    this.mGun = [];
    
    this.HP = 80;
    
    this.kDelta = 0.3;
    this.pastX =  160;
    this.pastZ =  40;
    this.pastW =  50;
    this.pastY =  50;
    this.count = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0;
    this.countEnemy = 0;
    this.countSuperEnemy = 0;
 
    
    this.mLevel = null;
    this.mHP = null;
    this.mGunName = null;
    this.mGunName2 = null;
}
gEngine.Core.inheritPrototype(MyGame2, Scene);

MyGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBgBrick);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kBullet2); 
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kEnemy);
    gEngine.Textures.loadTexture(this.kFloor5);
    gEngine.Textures.loadTexture(this.kSuperEnemy);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.loadAudio(this.kGameBGSong);
    gEngine.AudioClips.loadAudio(this.kGameCueSound);
    gEngine.AudioClips.loadAudio(this.kGameCueSound2);
    gEngine.AudioClips.loadAudio(this.kGameCueSound3);
    gEngine.AudioClips.loadAudio(this.kGameCueSound4);
    gEngine.AudioClips.loadAudio(this.kGameCueSound5);
    gEngine.Textures.loadTexture(this.kMedicine);
};

MyGame2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBgBrick);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kBullet2);  
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kEnemy);
    gEngine.Textures.unloadTexture(this.kFloor5);
    gEngine.Textures.unloadTexture(this.kSuperEnemy);
    gEngine.AudioClips.unloadAudio(this.kGameBGSong);
    gEngine.AudioClips.unloadAudio(this.kGameCueSound);
    gEngine.AudioClips.unloadAudio(this.kGameCueSound2);
    gEngine.AudioClips.unloadAudio(this.kGameCueSound3);
    gEngine.AudioClips.unloadAudio(this.kGameCueSound4);
    gEngine.AudioClips.unloadAudio(this.kGameCueSound5);
    gEngine.Textures.unloadTexture(this.kMedicine);
};

MyGame2.prototype.initialize = function () {    
   this.mCamera = new Camera(
        vec2.fromValues(50, 60),   // position of the camera
        200,                       // width of camera
        [0, 0, 700, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mSmallCamera = new Camera(
        vec2.fromValues(900, 37.5),   // position of the camera
        250,                       // width of camera
        [440, 365, 200, 120]           // viewport (orgX, orgY, width, height)
    );
    this.mSmallCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mHero = new Hero(this.kHero);
    
    
    for(var i=0;i<50;i++){ 
    var bgR = new SpriteRenderable(this.kBgBrick);
    this.mBgBrick[i] = new GameObject(bgR);
    bgR.setElementPixelPositions(0, 512, 0, 512);
    bgR.getXform().setSize(40, 40);
    bgR.getXform().setPosition(-41+40*(i-25), 75);
};
    
    var flr = new SpriteRenderable(this.kFloor5);
    flr.setElementPixelPositions(0, 4096, 0, 256);
    flr.getXform().setSize(2000, 128);
    flr.getXform().setPosition(200, -9);
    this.mFloor = new GameObject(flr);
    
    this.mLevel = new FontRenderable("Level 2");
    this.mLevel.setColor([0, 0, 0, 1]);
    this.mLevel.getXform().setPosition(-40, 120);
    this.mLevel.getXform().setSize(40,20);
    
    this.mHP = new FontRenderable("HP : " + this.HP);
    this.mHP.setColor([0, 0, 0, 1]);
    this.mHP.getXform().setPosition(25, 120);
    this.mHP.getXform().setSize(20,10);
    
    this.mGunName = new FontRenderable("Enemy :  "+ this.countEnemy+"/20");
    this.mGunName.setColor([0, 0, 0, 1]);
    this.mGunName.getXform().setPosition(25, 108);
    this.mGunName.getXform().setSize(12,5);
    
    this.mGunName2 = new FontRenderable("SuperEnemy :  "+this.countSuperEnemy+"/10");
    this.mGunName2.setColor([0, 0, 0, 1]);
    this.mGunName2.getXform().setPosition(10, 100);
    this.mGunName2.getXform().setSize(12,5);

    gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
};

MyGame2.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    for(var i=0;i<50;i++){ 
    this.mBgBrick[i].draw(camera);
    };
    this.mFloor.draw(camera);
    this.mHero.draw(camera);
    
  
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame2.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.drawCamera(this.mSmallCamera);
    this.drawCamera(this.mCamera);
    
    var i;
    for(i = 0; i<this.mBullet.length;i++){
        this.mBullet[i].draw(this.mCamera);
    }
    for(i = 0; i<this.mEnemyBullet.length;i++){
        this.mEnemyBullet[i].draw(this.mCamera);
    }
    for(i = 0; i<this.mSuperEnemyBullet.length;i++){
        this.mSuperEnemyBullet[i].draw(this.mCamera);
    }    
    for(i = 0; i < this.mEnemy.length; i++){
        this.mEnemy[i].draw(this.mCamera);
    }
    for(i = 0; i < this.mSuperEnemy.length; i++){
        this.mSuperEnemy[i].draw(this.mCamera);
    }
    for(i = 0; i < this.mMedicine.length; i++){
        this.mMedicine[i].draw(this.mCamera);
    }
    this.mLevel.draw(this.mCamera);
    this.mHP.draw(this.mCamera);
    this.mGunName.draw(this.mCamera);
    this.mGunName2.draw(this.mCamera);
    
    this.drawCamera(this.mSmallCamera);
    for(i = 0; i < this.mEnemy.length; i++){
        this.mEnemy[i].draw(this.mSmallCamera);
    }
    for(i = 0; i < this.mSuperEnemy.length; i++){
        this.mSuperEnemy[i].draw(this.mSmallCamera);
    }
    for(i = 0; i < this.mMedicine.length; i++){
        this.mMedicine[i].draw(this.mSmallCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame2.prototype.update = function () {
    this.mHP.setText("HP : " + this.HP);
    this.mGunName.setText("Enemy :  "+ this.countEnemy+"/20");
    this.mGunName2.setText("SuperEnemy :  "+ this.countSuperEnemy+"/10");
    this.mHero.update();
    this.mCamera.update();
    this.mSmallCamera.update();
        
    var i = 0;
    var j = 0;
    for(i = 0; i<this.mBullet.length;i++){
        this.mBullet[i].update();
    
        for(j = 0; j < this.mEnemy.length; j++){
            if(this.mBullet[i].getXform().getXPos() > this.mEnemy[j].getXform().getXPos() - 3
                && this.mBullet[i].getXform().getXPos() < this.mEnemy[j].getXform().getXPos() + 3
                && this.mBullet[i].getXform().getYPos() > this.mEnemy[j].getXform().getYPos() - 6
                && this.mBullet[i].getXform().getYPos() < this.mEnemy[j].getXform().getYPos() + 6){
             var t = this.mBullet[0];
                this.mBullet[0] = this.mBullet[i];
                this.mBullet[i] = t;
                this.mBullet.shift();
                t = this.mEnemy[0];
                this.mEnemy[0] = this.mEnemy[j];
                this.mEnemy[j] = t;
                this.mEnemy.shift();
            this.countEnemy+=1;
            gEngine.AudioClips.playACue(this.kGameCueSound3);
            this.mGunName.setText("Enemy : "+ this.countEnemy+"/20");
        }
        }
        for(j = 0; j < this.mSuperEnemy.length; j++){
            if(this.mBullet[i].getXform().getXPos() > this.mSuperEnemy[j].getXform().getXPos() - 4.5 
                && this.mBullet[i].getXform().getXPos() < this.mSuperEnemy[j].getXform().getXPos() + 4.5
                && this.mBullet[i].getXform().getYPos() > this.mSuperEnemy[j].getXform().getYPos() - 9
                && this.mBullet[i].getXform().getYPos() < this.mSuperEnemy[j].getXform().getYPos() + 9){
             var t = this.mBullet[0];
                this.mBullet[0] = this.mBullet[i];
                this.mBullet[i] = t;
                this.mBullet.shift();
                t = this.mSuperEnemy[0];
                this.mSuperEnemy[0] = this.mSuperEnemy[j];
                this.mSuperEnemy[j] = t;
                this.mSuperEnemy.shift();
            this.countSuperEnemy+=1;
            gEngine.AudioClips.playACue(this.kGameCueSound4);
            this.mGunName2.setText("Enemy : "+ this.countSuperEnemy+"/10");
        }
        }
    }
    for(i = 0;i<this.mEnemyBullet.length;i++){
        this.mEnemyBullet[i].update();
        for(j = 0; j < this.mEnemy.length; j++){
            if(this.mEnemyBullet[i].getXform().getXPos() > this.mHero.getXform().getXPos() - 4 
                && this.mEnemyBullet[i].getXform().getXPos() < this.mHero.getXform().getXPos() + 4
                && this.mEnemyBullet[i].getXform().getYPos() > this.mHero.getXform().getYPos() - 8
                && this.mEnemyBullet[i].getXform().getYPos() < this.mHero.getXform().getYPos() + 8){
                var t = this.mEnemyBullet[0];
                this.mEnemyBullet[0] = this.mEnemyBullet[i];
                this.mEnemyBullet[i] = t;
                this.mEnemyBullet.shift();
            this.HP -= 5;
            this.mHP.setText("HP : " + this.HP);
        }
        }
    }
    for(i = 0;i<this.mSuperEnemyBullet.length;i++){
        this.mSuperEnemyBullet[i].update();
        for(j = 0; j < this.mEnemy.length; j++){
            if(this.mSuperEnemyBullet[i].getXform().getXPos() > this.mHero.getXform().getXPos() - 5 
                && this.mSuperEnemyBullet[i].getXform().getXPos() < this.mHero.getXform().getXPos() + 5
                && this.mSuperEnemyBullet[i].getXform().getYPos() > this.mHero.getXform().getYPos() - 10
                && this.mSuperEnemyBullet[i].getXform().getYPos() < this.mHero.getXform().getYPos() + 10){
                var t = this.mSuperEnemyBullet[0];
                this.mSuperEnemyBullet[0] = this.mSuperEnemyBullet[i];
                this.mSuperEnemyBullet[i] = t;
                this.mSuperEnemyBullet.shift();
            this.HP -= 10;
            this.mHP.setText("HP : " + this.HP);
        }
        }
    }
    for(i = 0; i < this.mEnemy.length; i++){
        this.mEnemy[i].update();
        var t = Math.floor(Math.random()*6);
        if(t >= 3){
            this.count3++;
            if(this.count3 > 100){
                this.count3 = 0; 
                var enemyBullet = new Bullet(this.kBullet, this.mEnemy[i].getXform().getXPos(), this.mEnemy[i].getXform().getYPos()-4, 1);
            this.mEnemyBullet.push(enemyBullet);
            }
        }
                for(j = 0; j < this.mEnemy.length; j++){
            if(this.mEnemy[i].getXform().getXPos() > this.mHero.getXform().getXPos() - 9 
                && this.mEnemy[i].getXform().getXPos() < this.mHero.getXform().getXPos() + 9
                && this.mEnemy[i].getXform().getYPos() > this.mHero.getXform().getYPos() - 17
                && this.mEnemy[i].getXform().getYPos() < this.mHero.getXform().getYPos() + 17){
                var t = this.mEnemy[0];
                this.mEnemy[0] = this.mEnemy[i];
                this.mEnemy[i] = t;
                this.mEnemy.shift();
            this.HP -= 10;
            this.mHP.setText("HP : " + this.HP);
        }
        }
    }
    for(i = 0; i < this.mSuperEnemy.length; i++){
        this.mSuperEnemy[i].update();
        var t = Math.floor(Math.random()*6);
        if(t >= 3){
            this.count4++;
            if(this.count4 > 70){
                this.count4 = 0;
                var enemyBullet = new Bullet(this.kBullet2, this.mSuperEnemy[i].getXform().getXPos(), this.mSuperEnemy[i].getXform().getYPos(), 1);
                this.mSuperEnemyBullet.push(enemyBullet);
            }
        }
                for(j = 0; j < this.mSuperEnemy.length; j++){
            if(this.mSuperEnemy[i].getXform().getXPos() > this.mHero.getXform().getXPos() - 9 
                && this.mSuperEnemy[i].getXform().getXPos() < this.mHero.getXform().getXPos() + 9
                && this.mSuperEnemy[i].getXform().getYPos() > this.mHero.getXform().getYPos() - 20
                && this.mSuperEnemy[i].getXform().getYPos() < this.mHero.getXform().getYPos() + 20){
                var t = this.mSuperEnemy[0];
                this.mSuperEnemy[0] = this.mSuperEnemy[i];
                this.mSuperEnemy[i] = t;
                this.mSuperEnemy.shift();
            this.HP -= 20;
            this.mHP.setText("HP : " + this.HP);
        }
        }
    }
    for(i = 0; i<this.mMedicine.length;i++){
        this.mMedicine[i].update();
        for(j = 0; j < this.mMedicine.length; j++){
            if(this.mMedicine[i].getXform().getXPos() > this.mHero.getXform().getXPos() - 9 
                && this.mMedicine[i].getXform().getXPos() < this.mHero.getXform().getXPos() + 9
                && this.mMedicine[i].getXform().getYPos() > this.mHero.getXform().getYPos() - 15
                && this.mMedicine[i].getXform().getYPos() < this.mHero.getXform().getYPos() + 15){
                var t = this.mMedicine[0];
                this.mMedicine[0] = this.mMedicine[i];
                this.mMedicine[i] = t;
                this.mMedicine.shift();
                if(this.HP<75)
                {
                    this.HP += 5;   
                    this.mHP.setText("HP : " + this.HP);
                }
        gEngine.AudioClips.playACue(this.kGameCueSound5);
        }
        }
    }
    xform = this.mHero.getXform();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        var heroBullet = new Bullet(this.kBullet, xform.getXPos(), xform.getYPos(), 0);
        this.mBullet.push(heroBullet);
        gEngine.AudioClips.playACue(this.kGameCueSound);
    }
    
    for(var i=0;i<50;i++){ 
    var xform = this.mBgBrick[i].getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(-this.kDelta);
    }
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(this.kDelta);
    }
  /* if(xform.getXPos() - this.pastZ > 160 || this.pastZ - xform.getXPos() > 160){
        xform.setXPos(this.pastX);
    }*/
};
    
   
    var xform = this.mFloor.getXform();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(-this.kDelta);
    }
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(this.kDelta);
    }
   
    
   var v = Math.floor(Math.random()*24);
    if(v >= 12){
        this.count++;
        if(this.count === 80){
            this.count = 0;
            var enemy = new Enemy(this.kEnemy);
            this.mEnemy.push(enemy);
            var enemyBullet = new Bullet(this.kBullet, enemy.getXform().getXPos()-2, enemy.getXform().getYPos()-4, 1);
            this.mEnemyBullet.push(enemyBullet);
        }else{
            this.count2++;
            if(this.count2 === 150){
                this.count2 = 0;
                var superEnemy = new SuperEnemy(this.kSuperEnemy);
                this.mSuperEnemy.push(superEnemy);
                var superEnemyBullet = new Bullet(this.kBullet2, superEnemy.getXform().getXPos(), superEnemy.getXform().getYPos(), 1);
                this.mSuperEnemyBullet.push(superEnemyBullet);
            }
        }
    }
     var v = Math.floor(Math.random()*24);
    if(v >= 12){
        this.count5++;
        if(this.count5 === 450){
            this.count5 = 0;
            var medicine = new Medicine(this.kMedicine);
            this.mMedicine.push(medicine);
            
        }}
    if(this.HP <= 0){
        var nextLevel = new LoseGame();  // load the next level
        gEngine.Core.startScene(nextLevel);
        gEngine.AudioClips.stopBackgroundAudio();
        gEngine.AudioClips.playACue(this.kGameCueSound2);
    }
    
    if(this.countEnemy >= 20 && this.countSuperEnemy >= 10){
        var nextLevel = new MyGame3();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
    this.mSmallCamera.panTo(this.mHero.getXform().getXPos()+100, this.mHero.getXform().getYPos());
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {
		if(gEngine.AudioClips.isBackgroundAudioPlaying())
			gEngine.AudioClips.stopBackgroundAudio();
		else
                        gEngine.AudioClips.playBackgroundAudio(this.kGameBGSong);
    }
};

    