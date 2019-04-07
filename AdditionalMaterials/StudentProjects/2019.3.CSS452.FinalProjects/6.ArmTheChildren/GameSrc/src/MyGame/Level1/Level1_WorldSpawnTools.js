/*
 * 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2, Reticle,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObj, mGlobalSpeed ect */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict"

Level1.prototype.SpawnWorldFromArray = function (){    
    for (var i = 0; i <this.mWorldArray.length; i++){
        for (var j = 0; j < this.mWorldArray[i].length; j++){
            if (this.mWorldArray[i][j] === "1")
                this.spawnWall(j*10, 100 - (i*10));
            if (this.mWorldArray[i][j] === "2")
                this.spawnDestructWall(j*10, 100 - (i*10));          
            if (this.mWorldArray[i][j] === "3")
                this.spawnSmallDoor(j*10, 100 - (i*10), j*10);
            if (this.mWorldArray[i][j] === "4")
                this.spawnLargeDoor(j*10, 100 - (i*10), j*10);
            if (this.mWorldArray[i][j] === "r")
                this.spawnWallRight(j*10, 100 - (i*10));
             if (this.mWorldArray[i][j] === "t")
                this.spawnWallLeft(j*10, 100 - (i*10));
            if (this.mWorldArray[i][j] === "_")
                this.spawnRigidWall(j*10, 100 - (i*10), 0);
            if (this.mWorldArray[i][j] === "6")
                this.spawnRockSpawner(j*10, 100 - (i*10));
            if (this.mWorldArray[i][j] === "7")
                this.spawnBigRockSpawner(j*10, 100 - (i*10));
            if (this.mWorldArray[i][j] === "x")
                this.spawnSaw(j*10, 100 - (i*10));  
            if (this.mWorldArray[i][j] === "X")
                this.spawnBigSaw(j*10, 100 - (i*10)); 
            if(this.mWorldArray[i][j] === "S")
                this.spawnStart(j*10, 100- (i*10));
            if(this.mWorldArray[i][j] === "E")
                this.spawnEnd(j*10, 100- (i*10));
        }
    }
};
Level1.prototype.spawnStart = function (x, y) {
  var mStart = new StartLine();
  mStart.getXform().setSize(10,10);
  mStart.getXform().setPosition(x,y);
  this.mStartEndLine.addToSet(mStart);
};

Level1.prototype.spawnEnd = function (x, y) {
  var mStart = new EndLine();
  mStart.getXform().setSize(10,10);
  mStart.getXform().setPosition(x,y);
  this.mStartEndLine.addToSet(mStart);
};

Level1.prototype.spawnSaw = function (x, y) {
  var mSaw = new Saw(this.kNinjaStar);
  mSaw.getXform().setSize(10,10);
  mSaw.getXform().setPosition(x, y);
  this.mWorldObjects.addToSet(mSaw);
};

Level1.prototype.spawnBigSaw = function (x, y) {
  var mSaw = new Saw(this.kNinjaStar);
  mSaw.getXform().setSize(30,30);
  mSaw.getXform().setPosition(x, y);
  this.mWorldObjects.addToSet(mSaw);
};

Level1.prototype.spawnWall = function (x, y){
    var mWall = new Wall(this.kWallTexture);
        mWall.getXform().setSize(10,10);
        mWall.getXform().setPosition(x, y);    
        this.mWorldObjects.addToSet(mWall);
};

Level1.prototype.spawnRigidWall = function (x, y) {
    var mWall = new RigidWall(this.kWallTexture);
    mWall.getXform().setSize(10,10);
    mWall.getXform().setPosition(x, y); 
    this.mBreakableSet.addToSet(mWall);
};

Level1.prototype.spawnWallRight = function (x, y){
    var mWall = new Wall(this.kWallTexture);
        mWall.getXform().setSize(10,20);
        mWall.getXform().setPosition(x, y);  
        mWall.getXform().setRotationInDegree(-45); 
        this.mWorldObjects.addToSet(mWall);
};

Level1.prototype.spawnWallLeft = function (x, y){
    var mWall = new Wall(this.kWallTexture);
        mWall.getXform().setSize(10,20);
        mWall.getXform().setPosition(x, y);  
        mWall.getXform().setRotationInDegree(45); 
        this.mWorldObjects.addToSet(mWall);
};

Level1.prototype.spawnDestructWall = function (x, y){
        var mWall = new BreakableWall(this.kBreakableSprite);
        mWall.getXform().setSize(10,10);
        mWall.getXform().setPosition(x, y);
        this.mBreakableSet.addToSet(mWall);
};

Level1.prototype.spawnSmallDoor = function (x, y, d) {
        var mDoor = new MovingDoor(this.kMinionSprite);
        mDoor.setXCenter(x);
        mDoor.setYCenter(y);
        mDoor.setHeight(40);
        mDoor.setInitialDelay(d);
        mDoor.setSpeed(.75);
        this.mDoorObjects.addToSet(mDoor);
};

Level1.prototype.spawnLargeDoor = function (x, y, d) {
        var mDoor = new MovingDoor(this.kMinionSprite);
        mDoor.setXCenter(x);
        mDoor.setYCenter(y);
        mDoor.setInitialDelay(d);
        this.mDoorObjects.addToSet(mDoor);
};

Level1.prototype.missileSpawn = function(spawnPos) {
    var mCamX = this.mCamera.mouseWCX();
    var mCamY = this.mCamera.mouseWCY();
    if (mCamY > 110)
            mCamY = 110;
    if (mCamY < -35)
        mCamY = -35;
    var target = vec2.fromValues(mCamX, mCamY);
    
      
    var missile = new Missile(this.kMissileSprite, spawnPos, target, this.mAllFire);
    this.mMissileSet.addToSet(missile);
    this.mTargetSet.addToSet(new Target(this.kTargetSprite, target));
};

Level1.prototype.spawnRockSpawner = function(x, y){
  var mRock = new RockSpawner(this.kBreakableSprite, this.kFallingRock, this.mBreakableSet);
  mRock.getXform().setXPos(x);
  mRock.getXform().setYPos(y);
  mRock.getXform().setSize(10,10);
  this.mWorldObjects.addToSet(mRock);
};

Level1.prototype.spawnBigRockSpawner = function(x, y){
  var mRock = new BigRockSpawner(this.kBreakableSprite, this.kFallingRock, this.mBreakableSet);
  mRock.getXform().setXPos(x);
  mRock.getXform().setYPos(y);
  mRock.getXform().setSize(10,10);
  this.mWorldObjects.addToSet(mRock);
};