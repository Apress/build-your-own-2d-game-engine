/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level0() {
    //this.kEvilSprite = "assets/Evil.png";
    this.kHero1Sprite = "assets/1P.png";
    this.kHero2Sprite = "assets/2P.png";
    this.kBG = "assets/Level1/BlueSky.png";
    this.kGround = "assets/Ground.png";
    this.kLevelFile = "assets/Level1/Level1.xml";
    this.kBoxes = "assets/Brick.png";
    this.kFL = "assets/FL.png";
    this.kBgClip = "assets/sounds/Level1.mp3";
    this.kCue = "assets/sounds/fall down.wav";
    this.kCue1 = "assets/sounds/jump on.wav";
    this.mBG = null;
   
    this.mCamera = null;
    
    this.mPlayer1 = null;
    this.mPlayer2 = null;
    
    this.mFinishLine = null;
    this.mGround = null;
    
    this.BoxSet = [];
    
    this.mGlobalLight = null;
    
    //this.mDevil = null;
    
    this.gamestate = 0;
    
    this.mAllBoxes = new GameObjectSet();
}
gEngine.Core.inheritPrototype(Level0, Scene);

Level0.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kGround);
    gEngine.Textures.loadTexture(this.kBG);
    //gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero1Sprite);
    gEngine.Textures.loadTexture(this.kHero2Sprite);
    gEngine.Textures.loadTexture(this.kBoxes);
    gEngine.Textures.loadTexture(this.kFL);
    
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kCue1);
};

Level0.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kGround);
    gEngine.Textures.unloadTexture(this.kBG);
    //gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero1Sprite);
    gEngine.Textures.unloadTexture(this.kHero2Sprite);
    gEngine.Textures.unloadTexture(this.kBoxes);
    gEngine.Textures.unloadTexture(this.kFL);
    if (this.gamestate === 2)
    {
        var nextLevel = new Win1();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else if (this.gamestate === 3){
        var nextLevel = new GameOver();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kCue1);
};

Level0.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    //gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);
    
    /*var light = new Light();
    light.setLightType(Light.eLightType.ePointLight);
    light.setColor([0.9, 0.8, 0, 0]);
    light.setXPos(64);
    light.setYPos(36);      
    light.setZPos(2);
    light.setDirection([0, 0, -1]);
    light.setNear(8);
    light.setFar(20);
    light.setInner(0.1);
    light.setOuter(0.2);
    light.setIntensity(5);
    light.setDropOff(1.0);
    
    var bgR = new LightRenderable(this.kBG);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(128, 72);
    bgR.getXform().setPosition(64, 36);
    bgR.addLight(light);
    this.mBG = new GameObject(bgR);*/
    var parser = new SceneFileParser(this.kLevelFile);
    
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
    //this.mDevil = parser.parseDevil(this.kEvilSprite, this.kBullet);
    this.mGround = new Ground(this.kGround);
    var nBox = new Boxes(this.kBoxes, 4.5);
    this.BoxSet.push(nBox);
    this.mAllBoxes.addToSet(nBox);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};


Level0.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    var i;
    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mGround.draw(this.mCamera);
    this.mFinishLine.draw(this.mCamera);
    //this.mDevil.draw(this.mCamera);
    this.mPlayer1.draw(this.mCamera);
    this.mPlayer2.draw(this.mCamera);
    for(i = 0;i < this.BoxSet.length; i++){
        this.BoxSet[i].draw(this.mCamera);
    }
    //alert(this.BoxSet.length);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level0.prototype.update = function () {
    this.mPlayer1.update();
    this.mPlayer2.update();
    //this.mDevil.update();
    for(i = 0;i < this.BoxSet.length; i++){
        this.BoxSet[i].update();
    }
    
    this._physicsSimulation();
    var i;
    var t = (this.BoxSet[this.BoxSet.length - 1].getXform().getYPos()) + 4;
    
    var PosP1 = this.mPlayer1.getXform().getPosition();
    var PosP2 = this.mPlayer2.getXform().getPosition();
    
    var PosP1x = this.mPlayer1.getXform().getXPos();
    var PosP2x = this.mPlayer2.getXform().getXPos();
    
    var mRan = Math.random();
    
    
//    if(mRan > 0.5){this.mDevil.setTarget(PosP1);}
//    else{this.mDevil.setTarget(PosP2);}
    
    var collidedP1Ground = false;
    var collidedP1newSq = false;
    var collidedP1AllSq = false;
    
    var collidedP2Ground = false;
    var collidedP2newSq = false;
    var collidedP2AllSq = false;
    
    var collisionInfo = new CollisionInfo();
    var mGroundColl = this.mGround.getPhysicsComponent();
    var mFLColl = this.mFinishLine.getPhysicsComponent();
    
    var collideP1FL = false;
    var collideP2FL = false;
    
//    var P1Shooted = false;
//    var P2Shooted = false;
    
    collidedP1Ground = this.mPlayer1.getJumpBox().collided(mGroundColl, collisionInfo);
    collidedP2Ground = this.mPlayer2.getJumpBox().collided(mGroundColl, collisionInfo);
    
    collideP1FL = this.mPlayer1.getPhysicsComponent().collided(mFLColl, collisionInfo);
    collideP2FL = this.mPlayer2.getPhysicsComponent().collided(mFLColl, collisionInfo);
    
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
    
//    var p = this.mDevil.GetBullets();
//    for(i = 0;i < p.size(); i++)
//    {
//        var pBox = p.getObjectAt(i).getPhysicsComponent();
//        P1Shooted = this.mPlayer1.getPhysicsComponent().collided(pBox, collisionInfo);
//        P2Shooted = this.mPlayer2.getPhysicsComponent().collided(pBox, collisionInfo);
//    }
    
    if(PosP1x > 128 || PosP1x < 0 || PosP2x > 128 || PosP2x < 0 ){
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

Level0.prototype._physicsSimulation = function () {
    gEngine.Physics.processObjSet(this.mGround, this.mAllBoxes);
    gEngine.Physics.processObjObj(this.mPlayer1, this.mGround);
    gEngine.Physics.processObjSet(this.mPlayer1, this.mAllBoxes);
    //gEngine.Physics.processSetSet(this.mAllBoxes, this.mAllBoxes);
    gEngine.Physics.processObjObj(this.mPlayer2, this.mGround);
    gEngine.Physics.processObjSet(this.mPlayer2, this.mAllBoxes);
    //gEngine.Physics.processObjObj(this.mPlayer2, this.mPlayer1);
};




