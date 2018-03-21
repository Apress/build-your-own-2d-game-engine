/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gScore = "gScore";
var LastScore = "LastScore";
function MyGame() {
    this.kBg = "assets/sky.png";
    this.kBound = "assets/bound.png";
    this.kBalloon = "assets/balloon.png";
    this.kStrawberry = "assets/strawberry.png";
    this.kBlueberry = "assets/blueberry.png";
    this.kGrapes = "assets/grapes.png";
    this.kMango = "assets/mango.png";
    this.kCircle = "assets/circle.png";
    this.kBird = "assets/bird.png";
    this.kTurtle = "assets/turtle.png";
    this.kEnd = "assets/circle.png";
    this.kBuilding = "assets/building1.png";
    this.kBuilding1 = "assets/building2.png";
    this.kBuilding2 = "assets/building3.png";
    this.kBuilding3 = "assets/building4.png";
    this.kSpider = "assets/spider.png";
    this.kTree1 = "assets/tree1.png";
    this.kTree1NM = "assets/treeNM.png";
    this.kBird1 = "assets/bird2.png";
    this.kBgNM = "assets/sky0NM.png";
    this.kTile = "assets/tile.png";
    this.kStar = "assets/star.png";
    this.kEatClip = "assets/eat.mp3";
    this.kWinClip = "assets/win.mp3";
    this.kBgClip = "assets/bgm.mp3";
    this.kHitClip = "assets/hit.mp3";
    
    
    this.aMapWidth = 260;
    this.aMapHeight = 60;
    this.aViewWidth = 80;
    this.aViewHeight = 60;
    this.aSpeedCam = 0.1;
    
    this.mStar = null;
    this.kStartX = 18;
    this.kStartY = 15;
    //this.kDeltaEnergy = 0.2;
    this.kIncEnergy = 20;
    this.kDecEnergy = 10;
    
    this.maxEnergy = 100;
    //this.mEnergy = this.maxEnergy;
    this.mHasEnergy = true;
    this.mNeedType = 0;
    this.mChangeTime = 0;
    this.mScore = 0;
    this.mStatus = null;
    this.mHit = false;
    
    this.mCamera = null;
    this.mMapCam = null;
    this.mInteractiveBound = null;
    this.mBg = null;
    this.mBalloon = null;
    this.mLightSet = null;
    this.mEnergyBar = null;
    this.mMsg0 = null;
    this.mMsg1 = null;
    this.mMsg2 = null;
    this.mCircle = null;
    this.mEnd = null;
    
    this.mFoodSet = new GameObjectSet();
    this.mStaticObjSet = new GameObjectSet();
    this.mSignSet = new GameObjectSet();
    this.mChaseSet = new GameObjectSet();
    this.mFreeSet = new GameObjectSet();
    
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBound);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBalloon);
    gEngine.Textures.loadTexture(this.kMango);
    gEngine.Textures.loadTexture(this.kStrawberry);
    gEngine.Textures.loadTexture(this.kBlueberry);
    gEngine.Textures.loadTexture(this.kGrapes);
    gEngine.Textures.loadTexture(this.kCircle);
    gEngine.Textures.loadTexture(this.kBird);
    gEngine.Textures.loadTexture(this.kTurtle);
    gEngine.Textures.loadTexture(this.kEnd);
    gEngine.Textures.loadTexture(this.kBuilding);
    gEngine.Textures.loadTexture(this.kBuilding1);
    gEngine.Textures.loadTexture(this.kBuilding2);
    gEngine.Textures.loadTexture(this.kBuilding3);
    gEngine.Textures.loadTexture(this.kTree1);
    gEngine.Textures.loadTexture(this.kTree1NM);
    gEngine.Textures.loadTexture(this.kSpider);
    gEngine.Textures.loadTexture(this.kBird1);
    gEngine.Textures.loadTexture(this.kBgNM);
    gEngine.Textures.loadTexture(this.kTile);
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.AudioClips.loadAudio(this.kEatClip);
    gEngine.AudioClips.loadAudio(this.kWinClip);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kHitClip);
    
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBound);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBalloon);
    gEngine.Textures.unloadTexture(this.kMango);
    gEngine.Textures.unloadTexture(this.kStrawberry);
    gEngine.Textures.unloadTexture(this.kBlueberry);
    gEngine.Textures.unloadTexture(this.kGrapes);
    gEngine.Textures.unloadTexture(this.kCircle);
    gEngine.Textures.unloadTexture(this.kBird);
    gEngine.Textures.unloadTexture(this.kTurtle);
    gEngine.Textures.unloadTexture(this.kEnd);
    gEngine.Textures.unloadTexture(this.kBuilding);
    gEngine.Textures.unloadTexture(this.kBuilding1);
    gEngine.Textures.unloadTexture(this.kBuilding2);
    gEngine.Textures.unloadTexture(this.kBuilding3);
    gEngine.Textures.unloadTexture(this.kTree1);
    gEngine.Textures.unloadTexture(this.kTree1NM);
    gEngine.Textures.unloadTexture(this.kSpider);
    gEngine.Textures.unloadTexture(this.kBird1);
    gEngine.Textures.unloadTexture(this.kBgNM);
    gEngine.Textures.unloadTexture(this.kTile);
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.AudioClips.unloadAudio(this.kEatClip);
    gEngine.AudioClips.unloadAudio(this.kWinClip);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kHitClip);
    
   gEngine.ResourceMap.storeAsset(gScore, this.mScore);
    
    gEngine.Core.startScene(this.nextLevel);
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function(){
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.mBg.draw(this.mCamera);
    this.mFoodSet.draw(this.mCamera);
    this.mStaticObjSet.draw(this.mCamera);
    this.mFreeSet.draw(this.mCamera);
    this.mChaseSet.draw(this.mCamera);
    this.mEnd.draw(this.mCamera);
    this.mStar.draw(this.mCamera);
    this.mBalloon.draw(this.mCamera);
    this.mCircle.draw(this.mCamera);
    this.mSignSet.draw(this.mCamera);
    this.mMsg0.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    
    // Draw Map Camera
    if(this.ShowMapCam){
        this.mMapCam.setupViewProjection();
        this.mBg.draw(this.mMapCam);
        this.mInteractiveBound.draw(this.mMapCam);
        this.mStaticObjSet.draw(this.mMapCam);
        this.mBalloon.draw(this.mMapCam);
    }
};

MyGame.prototype.gameOver = function(){
    gEngine.AudioClips.stopBackgroundAudio();
    
    this.nextLevel = new GameOver(this.level);
    gEngine.GameLoop.stop();
};

MyGame.prototype.LevelWin = function(){
};
