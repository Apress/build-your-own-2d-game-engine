'use strict';

function LaneSet(options) {
  GameObjectSet.call(this);
  
  this.mLaneCount = LaneSet.constants.laneCount;
  this.mCurrentLane = 0;
  this.mCamera = options.camera;
  this.mGame = options.game;
  this.init();
};

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(LaneSet, GameObjectSet);

//------------------------------------------------------------------------------
LaneSet.constants = Object.freeze({
  laneCount: 3,
  minLanes: 2,
  maxLanes: 5
});

//------------------------------------------------------------------------------
LaneSet.prototype.init = function() {
  this.initLanes();
};

//------------------------------------------------------------------------------
LaneSet.prototype.initLanes = function() {
  var i = 0;
  
  var cameraWidth = this.mCamera.getWCWidth();
  var cameraHeight = this.mCamera.getWCHeight();
  
  var laneWidth = Lane.constants.width;
  var laneHeight = cameraHeight / this.mLaneCount;
  
  this.mSet = [];
  
  for(i = 0; i < this.mLaneCount; i++) {
    var lane = new Lane({
      sequence: i,
      size: {
        width: laneWidth,
        height: laneHeight
      },
      position: {
        x: laneWidth * 0.5 - cameraWidth * 0.5,
        y: i * laneHeight - cameraHeight * 0.5 + laneHeight * 0.5
      }
    });

    this.addToSet(lane);
  }
};

//------------------------------------------------------------------------------
LaneSet.prototype.update = function() {
  this.updateInput();
};

//------------------------------------------------------------------------------
LaneSet.prototype.updateInput = function() {
  this.updateGameInput();
//  this.updateDebugInput();
};

//------------------------------------------------------------------------------
LaneSet.prototype.updateGameInput = function() {
  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
    this.mCurrentLane--;
    
    if(this.mCurrentLane < 0) {
      this.mCurrentLane = 0;
    }
  }
  
  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
    this.mCurrentLane++;
    
    if(this.mCurrentLane >= this.mLaneCount) {
      this.mCurrentLane = this.mLaneCount - 1;
    }
  }
};

//------------------------------------------------------------------------------
//LaneSet.prototype.updateDebugInput = function() {
//  var currentLaneCount = this.mLaneCount;
//  
//  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
//    this.mLaneCount++;
//    
//    if(this.mLaneCount > LaneSet.constants.maxLanes) {
//      this.mLaneCount = LaneSet.constants.maxLanes;
//    }
//  }
//  
//  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
//    this.mLaneCount--;
//    
//    if(this.mLaneCount < LaneSet.constants.minLanes) {
//      this.mLaneCount = LaneSet.constants.minLanes;
//    }
//    
//    if(this.mCurrentLane >= this.mLaneCount) {
//      this.mCurrentLane = this.mLaneCount - 1;
//    }
//  }
//  
//  if(currentLaneCount !== this.mLaneCount) {
//    this.initLanes();
//    
//    if(this.mGame) {
//      MyGame.prototype.initBananaSets.call(this.mGame);
//      MyGame.prototype.assignLights.call(this.mGame);
//    }
//  }
//};

//------------------------------------------------------------------------------
LaneSet.prototype.getCurrentLane = function() {
  return this.getObjectAt(this.mCurrentLane);
};

//------------------------------------------------------------------------------
LaneSet.prototype.getLaneCount = function() {
  return this.mLaneCount;
};

//------------------------------------------------------------------------------
LaneSet.prototype.getRandomLane = function() {
  return this.getObjectAt(Math.floor(Math.random() * this.mLaneCount));
};
