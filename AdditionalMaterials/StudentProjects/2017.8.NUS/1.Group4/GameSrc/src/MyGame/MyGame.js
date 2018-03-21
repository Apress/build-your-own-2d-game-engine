/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.sceneFile = "assets/Scenes/Level0.json";
    this.curOptionID = 0;
    this.thisLevelID = 0;

    this.sceneParser = null;
    this.mCameras = [];
    this.mPlatformAttrs = [];
    this.mWallAttrs = [];
    this.mTextAttrs = [];
    this.mHumanAttrs = [];
    this.mTrapAttrs = [];
    this.mMovingPlatAttrs = [];
    
    this.mCamera = null;
    this.mHero = null;
    this.mCatherine = null;   
    this.mFlower = null;
    this.mHeart = null;
    this.mHeartBreak = null;
    
    this.mGameStatus = 0;

    this.nextLevel = null;
    this.thisLevel = null;
    
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    this.kPlatformTexture = "assets/Ground.png";
    this.kWallTexture = "assets/wall.png";
    this.kHeroSprite = "assets/Me.png";
    this.kCatherine = "assets/Catherine.png";
    this.kHuman = "assets/Human.png";
    this.kFlower = "assets/flower.png";
    this.kCage = "assets/Cage.png";
    this.kPerformance = "assets/Performance.png";
    this.kShootingHuman = "assets/Human-Shooting.png";
    this.kBullets = "assets/Bullets.png";
    this.kTrap_Thorn = "assets/Thorn.png";
    this.kHeart = "assets/Heart.png";
    this.kHeartBreak = "assets/HeartBreak.png";
    this.kFontCon72 = "assets/fonts/Consolas-72";
    
    this.kBGM = "assets/sounds/BackgroundMusic.mp3";
    this.kSBGM = "assets/sounds/SadBackgroundMusic.mp3";
    this.kHBGM = "assets/sounds/HappyBackgroundMusic.mp3";
    
    this.k_Dzy = "assets/_dzy.png";
    this.k_Wyh = "assets/_wyh.png";
    this.k_Zyc = "assets/_zyc.png";
    this.mAllImages = new GameObjectSet();
    
    gEngine.Textures.loadTexture(this.k_Dzy);
    gEngine.Textures.loadTexture(this.k_Wyh);
    gEngine.Textures.loadTexture(this.k_Zyc);
    
    
    this.sceneParser = null;
    this.mCameras = [];
    this.mPlatformAttrs = [];
    this.mWallAttrs = [];
    this.mTextAttrs = [];
    this.mHumanAttrs = [];
    this.mTrapAttrs = [];
    this.mMovingPlatAttrs = [];
    
    this.mAllPlatforms = new GameObjectSet();
    this.mAllHumans = new GameObjectSet();
    this.mTexts = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
    this.mAllTraps = new GameObjectSet();
    this.mAllMovingPlats = new GameObjectSet();
    this.mPrisoners = new GameObjectSet(); //image
    
    gEngine.TextFileLoader.loadTextFile(this.sceneFile, gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCatherine);
    gEngine.Textures.loadTexture(this.kHuman);
    gEngine.Textures.loadTexture(this.kFlower);
    gEngine.Textures.loadTexture(this.kHeart);
    gEngine.Textures.loadTexture(this.kHeartBreak);
    gEngine.Textures.loadTexture(this.kCage);
    gEngine.Textures.loadTexture(this.kPerformance);
    gEngine.Textures.loadTexture(this.kShootingHuman);
    gEngine.Textures.loadTexture(this.kBullets);
    gEngine.Textures.loadTexture(this.kTrap_Thorn);
    gEngine.Fonts.loadFont(this.kFontCon72);
    
    gEngine.AudioClips.loadAudio(this.kBGM);
    gEngine.AudioClips.loadAudio(this.kSBGM);
    gEngine.AudioClips.loadAudio(this.kHBGM);
};

MyGame.prototype.unloadScene = function () { 
    gEngine.TextFileLoader.unloadTextFile(this.sceneFile);
    gEngine.Core.startScene(this.nextLevel);
};
MyGame.prototype.initialize0 = function () {
    this.thisLevel = new MyGame();
    this.nextLevel = new Level01(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);
    //  music
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
};

MyGame.prototype.initialize = function () {
    this.initialize0();
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //  Cameras
    this.setCameras();
    //  Characters
    this.setHero();
    this.setCatherine();
    this.setHumans();
    this.setFlower();
    //  Floor
    this.setPlatforms();
    this.setMovingPlatforms();
    this.setWalls();
    //  Trap
    this.setTraps();
    //  Text
    this.setTexts();
    //  Status
    this.setStatus();
    
    this.mHeart = new Heart(this.kHeart, -50, -50, 5, 5);
    this.mHeartBreak = new Heart(this.kHeartBreak, -50, -50, 5, 5);
    //var mCameraColor = this.mCamera.getBackgroundColor();
    //this.mHeart.setColor(mCameraColor);
};
MyGame.prototype.setCameras = function() {
    this.mCameras = this.sceneParser.getCameras(this.mCameras);
    this.mCamera = this.mCameras[0];
};
MyGame.prototype.setHero = function() {
    var heroAttr = this.sceneParser.getHeroAttr();
    //  (x, y, width, height, moveSpeed, jumpSpeed);
    this.mHero = new Hero(this.kHeroSprite, heroAttr[0], heroAttr[1], heroAttr[2], heroAttr[3], heroAttr[4], heroAttr[5]);
};
MyGame.prototype.setCatherine = function() {
    var caAttr = this.sceneParser.getCatherineAttr();
    //  (x, y, width, height, chaseSpeed, trigeerDis)
    this.mCatherine = new Catherine(this.kCatherine, caAttr[0], caAttr[1], caAttr[2], caAttr[3], caAttr[4], caAttr[5]);
};
MyGame.prototype.setHumans = function() {
    this.mHumanAttrs = this.sceneParser.getHumansAttr(this.mHumanAttrs);
    if(this.mHumanAttrs !== null) {
        for(var i = 0; i < this.mHumanAttrs.length; i++) {
            var humanAttr = this.mHumanAttrs[i];
            var human = new Human(this.kHuman, humanAttr[0], humanAttr[1], humanAttr[2], humanAttr[3], humanAttr[4], humanAttr[5]);
            this.mAllHumans.addToSet(human);
        }
    }
};
MyGame.prototype.setFlower = function() {
    var flowerAttr = this.sceneParser.getFlowerAttr();
    //  (x, y, width, height)
    this.mFlower = new Flower(this.kFlower, flowerAttr[0], flowerAttr[1], flowerAttr[2], flowerAttr[3]);
};
MyGame.prototype.setPlatforms = function() {
    this.mPlatformAttrs = this.sceneParser.getPlatforms(this.mPlatformAttrs);
    for(var i = 0; i < this.mPlatformAttrs.length; i++) {
        var platformAttr = this.mPlatformAttrs[i];
        var platform = new Platform(this.kPlatformTexture, platformAttr[0], platformAttr[1], platformAttr[2], platformAttr[3]);
        this.mAllPlatforms.addToSet(platform);
    }
};
MyGame.prototype.setMovingPlatforms = function() {
    this.mMovingPlatAttrs = this.sceneParser.getMovingPlatforms(this.mMovingPlatAttrs);
    if(this.mMovingPlatAttrs === null) {
        return;
    } else {
        for (var i = 0; i < this.mMovingPlatAttrs.length; i++) {
            var movingPlatAttr = this.mMovingPlatAttrs[i];
            var movingPlatform = new MovingPlatform(this.kPlatformTexture, 
                                                    movingPlatAttr[0], movingPlatAttr[1],
                                                    movingPlatAttr[2], movingPlatAttr[3], 
                                                    movingPlatAttr[4], movingPlatAttr[5], movingPlatAttr[6]);
            this.mAllMovingPlats.addToSet(movingPlatform);
            this.mAllPlatforms.addToSet(movingPlatform);
        }
    }
};
MyGame.prototype.setWalls = function() {
    this.mWallAttrs = this.sceneParser.getWalls(this.mWallAttrs);
    for(var i = 0; i < this.mWallAttrs.length; i++) {
        var wallAttr = this.mWallAttrs[i];
        var wall = new Wall(this.kWallTexture, wallAttr[0], wallAttr[1], wallAttr[2], wallAttr[3]);
        this.mAllWalls.addToSet(wall);
    }
};
MyGame.prototype.setStatus = function() {
    this.mGameStatus = this.sceneParser.getStatus();
};
MyGame.prototype.setTexts = function() {
    this.mTextAttrs = this.sceneParser.getTexts(this.mTextAttrs);
    if(this.mTextAttrs !== null) {
         for(var i = 0; i < this.mTextAttrs.length; i++) {
            var textAttr = this.mTextAttrs[i];
            var text = new FontRenderable(textAttr[0]);
            text.setFont(this.kFontCon72);
            this.setText(text, textAttr[1], textAttr[2], textAttr[3], textAttr[4]);
            this.mTexts.addToSet(text);
        }
    }
};
MyGame.prototype.setText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

MyGame.prototype.setTraps = function() {
    this.mTrapAttrs = this.sceneParser.getTrapsAttr(this.mTrapAttrs);
    if(this.mTrapAttrs !== null) {
        for (var i = 0; i < this.mTrapAttrs.length; i++) {
            var trapAttr = this.mTrapAttrs[i];
            var trap = new Trap(this.kTrap_Thorn, trapAttr[0], trapAttr[1], trapAttr[2], trapAttr[3]);
            this.mAllTraps.addToSet(trap);
        }
    } else {
        return;
    }
};
// Level5
MyGame.prototype.humanWakeup = function() {
    for (var i = 0;  i < this.mAllHumans.size(); i++) {
        var human = this.mAllHumans.getObjectAt(i);
        human.setChaseSpeed(0.5);
    }
};

MyGame.prototype.physicsSimulation = function() {
    //  platform
    gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mCatherine, this.mAllPlatforms);    
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllPlatforms);    
    //  humans
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllHumans);
    //  wall
    gEngine.Physics.processObjSet(this.mHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mCatherine, this.mAllWalls);    
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllWalls);
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mPrisoners.draw(this.mCamera);
    
    this.mAllPlatforms.draw(this.mCamera);
    this.mAllWalls.draw(this.mCamera);
    this.mAllHumans.draw(this.mCamera);
    this.mTexts.draw(this.mCamera);
    
    this.mAllTraps.draw(this.mCamera);

    this.mAllMovingPlats.draw(this.mCamera); 
    
    this.mHero.draw(this.mCamera);
    this.mCatherine.draw(this.mCamera);
    this.mFlower.draw(this.mCamera);
    this.mHeart.draw(this.mCamera);
    this.mHeartBreak.draw(this.mCamera);
    
};

MyGame.prototype.update = function () {
    this.gameResultDetecting(); // win/lose/    
    this.mCamera.update();  // to ensure proper interpolated movement effects    
    this.mAllWalls.update();    
    this.mAllPlatforms.update();
    //playing
    
    //debug
    //this.showAnimationWin();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)) {
        this.nextLevel = new ExitLevel(this.thisLevelID);
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.nextLevel = this.thisLevel;
        gEngine.GameLoop.stop();
    }
    
    if (this.mGameStatus === 0) {
        this.showFirstTxt();
        
        this.mHero.update(this.mAllPlatforms);
        this.mCatherine.update();
        this.mAllHumans.update();
        this.mAllMovingPlats.update(); 
        //  debug
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
            gEngine.GameLoop.stop();
        }   
        //  Catherine Chasing
        this.mCatherine.chaseHero(this.mHero);
        //  Humans Chasing
        for(var i = 0; i < this.mAllHumans.size(); i++) {
            this.mAllHumans.getObjectAt(i).chaseHero(this.mHero);
        }
        
        for (var j = 0; j < this.mAllTraps.size(); j++) {
            this.mAllTraps.getObjectAt(j).touchHeroDetection(this.mHero);
        }
        
    }        
    // physics simulation
    this.physicsSimulation();
    // win/lose
    if (this.mGameStatus === 1) {
        if (this.showAnimationLose())
        {
            this.nextLevel = this.thisLevel;
            gEngine.GameLoop.stop();
        }
    }
    if (this.mGameStatus === 2) {
        if (this.showAnimationWin()){
            gEngine.GameLoop.stop();
        }
        
    }
    
    this.update0(); // to be overwrited; 
};

MyGame.prototype.update0 = function(){
    
};

MyGame.prototype.optionSelect = function() {
    if((gEngine.Input.isKeyClicked(gEngine.Input.keys.Up) || gEngine.Input.isKeyClicked(gEngine.Input.keys.W) )&& this.curOptionID === 1) {
        this.curOptionID = 0;
    } else if ((gEngine.Input.isKeyClicked(gEngine.Input.keys.Down) || gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) && this.curOptionID === 0) {
        this.curOptionID = 1;
    }
    
    if(this.curOptionID === 1) {
        this.mTexts.getObjectAt(3).setTextHeight(8);
        this.mTexts.getObjectAt(2).setTextHeight(6);
        this.mTexts.getObjectAt(3).getXform().setPosition(24 - 10, 40);
        this.mTexts.getObjectAt(2).getXform().setPosition(27, 53);
    } else if (this.curOptionID === 0) {
        this.mTexts.getObjectAt(2).setTextHeight(8);
        this.mTexts.getObjectAt(3).setTextHeight(6);
        this.mTexts.getObjectAt(2).getXform().setPosition(27 - 10,53);
        this.mTexts.getObjectAt(3).getXform().setPosition(24, 40);
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if(this.curOptionID === 0) {
            this.nextLevel = new Level01();
        } else if (this.curOptionID === 1) {
            this.nextLevel = new SelectLevel();
        }
        gEngine.GameLoop.stop();
        return true;
    }
    return false;
};

MyGame.prototype.showAnimationWin = function(){
    var delta =0.01;
    var color1 = this.mTexts.getObjectAt(1).getColor();
    var color2 = this.mTexts.getObjectAt(2).getColor();
    var color4 = this.mTexts.getObjectAt(4).getColor();
    
    this.mHeart.update(this.mCatherine.getXform());
    if (color4[3] < 1)
    {
        color4[3] += delta/2;
        this.mTexts.getObjectAt(4).setColor(color4);
        this.mTexts.getObjectAt(5).setColor(color4);
        this.mTexts.getObjectAt(6).setColor(color4);
    }
    
    if (color1[3] > -0.5)
    {
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
    }
    else if (color2[3] > -0.5)
    {
        color2[3] -= delta;
        this.mTexts.getObjectAt(2).setColor(color2);
        this.mTexts.getObjectAt(3).setColor(color2);
    }
    return this.optionSelect();
};

MyGame.prototype.showAnimationLose = function(){
    var delta =0.02;
    var mIntensity = gEngine.DefaultResources.getGlobalAmbientIntensity();
    mIntensity -= delta;
    gEngine.DefaultResources.setGlobalAmbientIntensity(mIntensity);
    if (this.mCatherine.getFallingResult()) {
        this.mHeartBreak.update(this.mHero.getXform());
    }
    return mIntensity <= 0;
};

MyGame.prototype.showFirstTxt = function() {
    if(this.mTexts.size() === 0) {
        return;
    }
    var delta = 0.005;
    var color1 = this.mTexts.getObjectAt(0).getColor();
    color1[3] -= delta;
    if(color1[3] >= 0) {
        this.mTexts.getObjectAt(0).setColor(color1);
    }
};

MyGame.prototype.gameResultDetecting = function () {
    if(this.mAllHumans.getHumanChaseResult() 
            || this.mCatherine.getCatchHeroResult()
            || this.mCatherine.getFallingResult()
            || this.mHero.getFallingResult()
            || this.getTrapTouchResult()) {
        this.mGameStatus = 1;
    }
    if (this.mFlower.getTouchingResult(this.mCatherine.getXform().getPosition())) {
        this.mGameStatus = 2;
    }
};

//edit gameResultDetecting();
MyGame.prototype.getTrapTouchResult = function() { 
    if(this.mAllTraps.size() === 0) {
        return false;
    } else {
        for(var i = 0; i < this.mAllTraps.size(); i++) {
            var trap = this.mAllTraps.getObjectAt(i);
            if(trap.getTouchHeroResult()) {
                return true;
            }
        }
    }
};