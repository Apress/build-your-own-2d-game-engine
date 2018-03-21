/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level2() {
    this.kEvilSprite = "assets/Evil.png";
    this.kHero1Sprite = "assets/1P.png";
    this.kHero2Sprite = "assets/2P.png";
    this.kBG = "assets/Level1/BlueSky.png";
    this.kBullet = "assets/Bullet.png";
    this.kLevelFile = "assets/Level2/Level2.xml";
    this.kBoxes = "assets/Brick.png";
    this.kFL = "assets/FL.png";
    this.kSwitcher = "assets/zhangai.png";
    this.kWall = "assets/xianxianxian.png";
    this.kGround = "assets/Ground.png";
    
    this.kBgClip = "assets/sounds/Level1.mp3";
    this.kCue = "assets/sounds/fall down.wav";
    this.kCue1 = "assets/sounds/jump on.wav";

    this.mBG = null;
   
    this.mCamera = null;
    
    this.mPlayer1 = null;
    this.mPlayer2 = null;
    
    this.mFinishLine = null;
    this.mGround = null;
    
    this.mSwitcher = null;
    
    this.BoxSet = [];
    
    this.mWall = null;
    this.mActiveWall = null;
    
    this.mDevilSet = [];
    this.mAllDM = new GameObjectSet();
    
    this.gamestate = 0;
    
    this.mAllBoxes = new GameObjectSet();
}
gEngine.Core.inheritPrototype(Level2, Scene);

Level2.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kEvilSprite);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero1Sprite);
    gEngine.Textures.loadTexture(this.kHero2Sprite);
    gEngine.Textures.loadTexture(this.kBoxes);
    gEngine.Textures.loadTexture(this.kFL);
    gEngine.Textures.loadTexture(this.kSwitcher);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kGround);
    
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kCue1);
};

Level2.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kEvilSprite);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero1Sprite);
    gEngine.Textures.unloadTexture(this.kHero2Sprite);
    gEngine.Textures.unloadTexture(this.kBoxes);
    gEngine.Textures.unloadTexture(this.kFL);
    gEngine.Textures.unloadTexture(this.kSwitcher);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kGround);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kCue1);
    if (this.gamestate === 2)
    {
        var nextLevel = new Win();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else if (this.gamestate === 3){
        var nextLevel = new GameOver();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    
    
};

Level2.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    //gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    var parser = new SceneFileParser(this.kLevelFile);
    
    var i; 
    this.mCamera = parser.parseCamera();
    /*this.mCamera = new Camera(
        vec2.fromValues(64, 36),   // center of the WC
        128,                        // width of WC
        [0, 0, 1280, 720]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);*/
    this.mBG = parser.parseBackground(this.kBG);
    this.mPlayer1 = parser.parseHero1(this.kHero1Sprite);
    this.mPlayer2 = parser.parseHero2(this.kHero2Sprite);
    this.mFinishLine = parser.parseFinishLine(this.kFL);
    this.mSwitcher = parser.parseSwitcher(this.kSwitcher);
    this.mDevilSet = parser.parseDevilMove(this.kEvilSprite, this.kBullet);
    for(i = 0; i < this.mDevilSet.length; i++){
        this.mAllDM.addToSet(this.mDevilSet[i]);
    }
    this.mGround = new Ground(this.kGround);
    this.mWall = new Wall(this.kWall, 40, 50, 80, 3, 0, 1018, 286, 416);
    this.mActiveWall = new Wall(this.kWall, 104, 50, 48, 3, 0, 1024, 184, 250);
    var nBox = new Boxes(this.kBoxes, 4.5);
    this.BoxSet.push(nBox);
    this.mAllBoxes.addToSet(nBox);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};


Level2.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    var i;
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mGround.draw(this.mCamera);
    this.mSwitcher.draw(this.mCamera);
    this.mWall.draw(this.mCamera);
    if(this.mSwitcher.GetIsOpen() === false){this.mActiveWall.draw(this.mCamera);}
    this.mFinishLine.draw(this.mCamera);
    for(i = 0;i < this.mDevilSet.length; i++){
        this.mDevilSet[i].draw(this.mCamera);
    }
    this.mPlayer1.draw(this.mCamera);
    this.mPlayer2.draw(this.mCamera);
    for(i = 0;i < this.BoxSet.length; i++){
        this.BoxSet[i].draw(this.mCamera);
    }
    //alert(this.BoxSet.length);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level2.prototype.update = function () {
    this.mPlayer1.update();
    this.mPlayer2.update();
    for(i = 0;i < this.mDevilSet.length; i++){
        this.mDevilSet[i].update();
    }
    this.mSwitcher.update();
    for(i = 0;i < this.BoxSet.length; i++){
        this.BoxSet[i].update();
    }
    
    this._physicsSimulation();
    var i, j;
    var t = (this.BoxSet[this.BoxSet.length - 1].getXform().getYPos()) + 4;
    
    var PosP1x = this.mPlayer1.getXform().getXPos();
    var PosP2x = this.mPlayer2.getXform().getXPos();
    
    var collidedP1Ground = false;
    var collidedP1newSq = false;
    var collidedP1AllSq = false;
    
    var collidedP2Ground = false;
    var collidedP2newSq = false;
    var collidedP2AllSq = false;
    
    var collidedP1Switcher = false;
    var collidedP2Switcher = false;
    
    var collisionInfo = new CollisionInfo();
    var mGroundColl = this.mGround.getPhysicsComponent();
    var mFLColl = this.mFinishLine.getPhysicsComponent();
    var mSwitcherColl = this.mSwitcher.getPhysicsComponent();
    
    var collideP1FL = false;
    var collideP2FL = false;
    
    var P1Shooted = false;
    var P2Shooted = false;
    
    collidedP1Ground = this.mPlayer1.getJumpBox().collided(mGroundColl, collisionInfo);
    collidedP2Ground = this.mPlayer2.getJumpBox().collided(mGroundColl, collisionInfo);
    
    collideP1FL = this.mPlayer1.getPhysicsComponent().collided(mFLColl, collisionInfo);
    collideP2FL = this.mPlayer2.getPhysicsComponent().collided(mFLColl, collisionInfo);
    
    collidedP1Switcher = this.mPlayer1.getPhysicsComponent().collided(mSwitcherColl, collisionInfo);
    collidedP2Switcher = this.mPlayer2.getPhysicsComponent().collided(mSwitcherColl, collisionInfo);
    
    if(collidedP1Switcher || collidedP2Switcher){
        this.mSwitcher.SetIsOpen();
    }
    
    if (collidedP1Ground) {
        this.mPlayer1.SetCanJump(true);
        if(this.gamestate === 1){
            this.BoxSet = [];
            this.mAllBoxes = new GameObjectSet();
            var nBox = new Boxes(this.kBoxes, 4.5);
            this.BoxSet.push(nBox);
            this.mAllBoxes.addToSet(nBox);
            this.gamestate = 0;
            gEngine.AudioClips.playACue(this.kCue);
        }
        
    }
    
    if (collidedP2Ground) {
        this.mPlayer2.SetCanJump(true);
        if(this.gamestate === 1){
            this.BoxSet = [];
            this.mAllBoxes = new GameObjectSet();
            var nBox = new Boxes(this.kBoxes, 4.5);
            this.BoxSet.push(nBox);
            this.mAllBoxes.addToSet(nBox);
            this.gamestate = 0;
            gEngine.AudioClips.playACue(this.kCue);
        }
        
    }
    
    //var p = this.mDevil.GetBullets();
   
    for(i = 0; i < this.mAllDM.size(); i++)
    {
        var p = this.mAllDM.getObjectAt(i).GetBullets();
        //alert(p.length);
        for(j = 0; j < p.size() ;j++){
            var pBox = p.getObjectAt(j).getPhysicsComponent();
            P1Shooted = this.mPlayer1.getPhysicsComponent().collided(pBox, collisionInfo);
            P2Shooted = this.mPlayer2.getPhysicsComponent().collided(pBox, collisionInfo);
            if(P1Shooted || P2Shooted){this.gamestate = 3;gEngine.GameLoop.stop();}
        }
    }
    
    if(PosP1x > 128 || PosP1x < 0 || PosP2x > 128 || PosP2x < 0){
        this.gamestate = 3;
        gEngine.GameLoop.stop();
    }
    
    for (i = 0; i < this.mAllBoxes.size(); i++) {
        var mBox = this.mAllBoxes.getObjectAt(i).getPhysicsComponent();
        collidedP1AllSq = this.mPlayer1.getJumpBox().collided(mBox, collisionInfo);
        if (collidedP1AllSq) {
            this.mPlayer1.SetCanJump(true);
            break;
        }
    }
    for (i = 0; i < this.mAllBoxes.size(); i++) {
        var mBox = this.mAllBoxes.getObjectAt(i).getPhysicsComponent();
        collidedP2AllSq = this.mPlayer2.getJumpBox().collided(mBox, collisionInfo);
        if (collidedP2AllSq) {
            this.mPlayer2.SetCanJump(true);
            break;
        }
    }
    
    collidedP1newSq = this.mPlayer1.getJumpBox().collided(this.BoxSet[this.BoxSet.length - 1].getPhysicsComponent(), collisionInfo);
    collidedP2newSq = this.mPlayer2.getJumpBox().collided(this.BoxSet[this.BoxSet.length - 1].getPhysicsComponent(), collisionInfo);
    
    if (collidedP1newSq || collidedP2newSq) {
            this.BoxSet[this.BoxSet.length - 1].SetCollideHero(true);  
    }
    
    if(collidedP1newSq && collidedP2newSq) {
            var nBox = new Boxes(this.kBoxes, t);
            this.BoxSet.push(nBox);
            this.mAllBoxes.addToSet(nBox);  
            this.gamestate = 1;
            gEngine.AudioClips.playACue(this.kCue1);
    }
    
    if(collideP1FL && collideP2FL){
        this.gamestate = 2;
        gEngine.GameLoop.stop();
    }
};

Level2.prototype._physicsSimulation = function () {
    gEngine.Physics.processObjSet(this.mGround, this.mAllBoxes);
    gEngine.Physics.processObjObj(this.mPlayer1, this.mGround);
    gEngine.Physics.processObjSet(this.mPlayer1, this.mAllBoxes);
    gEngine.Physics.processObjObj(this.mPlayer1, this.mWall);
    
    gEngine.Physics.processObjObj(this.mPlayer2, this.mGround);
    gEngine.Physics.processObjSet(this.mPlayer2, this.mAllBoxes);
    gEngine.Physics.processObjObj(this.mPlayer2, this.mWall);
    
    if(this.mSwitcher.GetIsOpen() === false){
        gEngine.Physics.processObjObj(this.mPlayer1, this.mActiveWall);
        gEngine.Physics.processObjObj(this.mPlayer2, this.mActiveWall);
    }
    //gEngine.Physics.processObjObj(this.mPlayer2, this.mPlayer1);
};



