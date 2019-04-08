/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, vec2, mGlobalSpeed: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MovingDoor(spriteTexture) {
    GameObject.call(this, this.mDoor);
    this.mTexture = spriteTexture;
    this.mHeight = 100;
    this.mY = 5;
    this.mX = 10;
    this.mXCenter = 50;
    this.mYCenter = 40;
    this.mIsClosing = true;
    this.mNumSegments = null;
    this.mDelayTime = 30;
    this.mInitialDelay = 0;
    this.mInitialTimer = 0;
    this.mTimer = 0;
    this.mCloseSpeed = 1;
    this.mCurrentMovingPoint = null;
    this.mMovingPointCounter = 1;
    this.mTopStartingPos = null;
    this.mBotStartingPos = null;
    this.initialize();
}
gEngine.Core.inheritPrototype(MovingDoor, GameObject);

MovingDoor.prototype.initialize = function () {
    this.mNumSegments = (this.mHeight / 2) /  this.mY;
    this.mTopSet = null;
    this.mBotSet = null;
    this.mTopSet = [];
    this.mBotSet = [];
    this.mCurrentMovingPoint = this.mNumSegments - 2;
    this.mTopStartingPos = this.mYCenter + (this.mY * (this.mNumSegments-1)) + (this.mY/2);
    this.mBotStartingPos = this.mYCenter - (this.mY * (this.mNumSegments-1)) - (this.mY/2);
   
    for (var i = 0; i < this.mNumSegments; i++){
    var mDoor = new DoorSegment(this.mTexture);
    mDoor.getXform().setPosition(this.mXCenter, this.mTopStartingPos);
    mDoor.getXform().setSize(this.mX, this.mY);
    this.mTopSet.push(mDoor);
    }
    
    for (var i = 0; i < this.mNumSegments; i++){
    var mDoor = new DoorSegment(this.mTexture);
    mDoor.getXform().setPosition(this.mXCenter, this.mBotStartingPos);
    mDoor.getXform().setSize(this.mX, this.mY);
    this.mBotSet.push(mDoor);
    }
};

MovingDoor.prototype.draw = function (camera){
    for (var i = 0; i < this.mTopSet.length; i++) 
        this.mTopSet[i].draw(camera);
        
     for (var i = 0; i < this.mBotSet.length; i++) 
        this.mBotSet[i].draw(camera);    
};

MovingDoor.prototype.update = function () {
    this.mTimer += 1;
    this.mInitialTimer += 1;
    if (this.mInitialTimer <= this.mInitialDelay){
        return;
    }
    
        //Logic once the doors closed fully
        if (this.mCurrentMovingPoint < 0){
            //console.log("closed");
            this.mIsClosing = false;
            this.mCurrentMovingPoint += 1;
            this.mMovingPointCounter -= 1;
        }
        //Logic once the doors are opened fully
        if (this.mCurrentMovingPoint === this.mTopSet.length - 1){
            //console.log("open");
            this.mIsClosing = true;
            this.mCurrentMovingPoint -= 1;
            this.mMovingPointCounter += 1;
            this.mTimer = 0;
            for (var i = 0; i < this.mTopSet.length; i++)
                this.mTopSet[i].getXform().setYPos(this.mTopStartingPos);
            for (var i = 0; i < this.mBotSet.length; i++)
                this.mBotSet[i].getXform().setYPos(this.mBotStartingPos);
           
        }
        
        //logic for closing doors
        if (this.mIsClosing){
            //Timer elasped, stop closing door
            if (this.mTimer >= this.mDelayTime){
                //Check if segments have moved enough
                var mCur = this.mTopSet[this.mCurrentMovingPoint].getXform().getYPos();
                var mGoal = this.mTopStartingPos - (this.mY * this.mMovingPointCounter);

                if (mCur <= mGoal){  
                this.mCurrentMovingPoint -= 1;
                    this.mMovingPointCounter += 1;
                }
                for (var i = 0; i <= this.mCurrentMovingPoint; i++){
                    var xform = this.mTopSet[i].getXform();
                    xform.incYPosBy(-this.mCloseSpeed);
                }
                for (var i = 0; i <= this.mCurrentMovingPoint; i++){
                    var xform = this.mBotSet[i].getXform();
                    xform.incYPosBy(this.mCloseSpeed);
                }
            }
        }
        
        //logic for opening doors
        if (!this.mIsClosing){            
            if (this.mTopSet[this.mCurrentMovingPoint].getXform().getYPos() >= this.mTopStartingPos - (this.mY * (this.mMovingPointCounter -1))){
                    this.mCurrentMovingPoint += 1;
                    this.mMovingPointCounter -= 1;
                }
            for (var i = 0; i <= this.mCurrentMovingPoint; i++){
                var xform = this.mTopSet[i].getXform();
                xform.incYPosBy(+this.mCloseSpeed);
                //console.log("move loop reached");
                }
            for (var i = 0; i <= this.mCurrentMovingPoint; i++){
                var xform = this.mBotSet[i].getXform();
                xform.incYPosBy(-this.mCloseSpeed);
                }
        }
}; 


MovingDoor.prototype.setHeight = function (d) {
    this.mHeight = d;
    this.initialize();
};

MovingDoor.prototype.setX = function (x) {
    this.mX = x;
    this.initialize();
};

MovingDoor.prototype.setY = function (y){
  this.mY = y;
  this.initialize();
};

MovingDoor.prototype.setXCenter = function (x){
  this.mXCenter = x;
  this.initialize();
};

MovingDoor.prototype.setYCenter = function (y){
  this.mYCenter = y;
  this.initialize();
};

MovingDoor.prototype.setDelay = function (t){
    this.mDelayTime = t;
};

MovingDoor.prototype.setInitialDelay = function (t){
    this.mInitialDelay = t;
};

MovingDoor.prototype.setSpeed = function (s){
    this.mCloseSpeed = s;
};

MovingDoor.prototype.getTopSet = function (){
  return this.mTopSet;  
};

MovingDoor.prototype.getBotSet = function (){
  return this.mBotSet;  
};