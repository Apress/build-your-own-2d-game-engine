'use strict';

function BananaSet(options) {
  GameObjectSet.call(this);
  
  this.mBananaCount = BananaSet.constants.bananaCount;
  this.mTexture = options.texture;
  this.mNormalMap = options.normalMap;
  this.mPosition = options.position;
  this.mDirection = options.direction;
  this.mPivot = options.pivot;
  this.mPlayer = options.player;
  this.mCamera = options.camera;
  this.mHUD = options.hud;
  this.mBananaSound = options.bananaSound;
  
  this.init();
};

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(BananaSet, GameObjectSet);

//------------------------------------------------------------------------------
BananaSet.constants = Object.freeze({
  bananaCount: 5,
  directions: Object.freeze({
    horizontal: 0,
    vertical: 1
  }),
  pivots: Object.freeze({
    left: 0,
    right: 1,
    top: 2,
    bottom: 3,
    center: 4
  })
});

//------------------------------------------------------------------------------
BananaSet.prototype.init = function() {
  this.getXform().setPosition(this.mPosition.x, this.mPosition.y);
  this.initBananas();
};

//------------------------------------------------------------------------------
BananaSet.prototype.initBananas = function() {
  var biggerDimension = Banana.dimensions.width;
  
  if(Banana.dimensions.height > biggerDimension) {
    biggerDimension = Banana.dimensions.height;
  }
  
  var startPosition = 0;
  
  if(this.mPivot === BananaSet.constants.pivots.center) {
    startPosition = BananaSet.constants.bananaCount * biggerDimension * -0.5 + biggerDimension * 0.5;
  } else if(this.mPivot === BananaSet.constants.pivots.top || this.mPivot === BananaSet.constants.pivots.right) {
    startPosition = -(BananaSet.constants.bananaCount - 1) * biggerDimension - biggerDimension * 0.5;
  } else if(this.mPivot === BananaSet.constants.pivots.bottom || this.mPivot === BananaSet.constants.pivots.left) {
    startPosition = biggerDimension * 0.5;
  }

  var position = {
    x: 0,
    y: 0
  };
  
  var i = 0;
  
  for(i = 0; i < BananaSet.constants.bananaCount; i++) {
    var offset = startPosition + biggerDimension * i;
    
    if(this.mDirection === BananaSet.constants.directions.horizontal) {
      position.x = offset;
    } else {
      position.y = offset;
    }
    
    this.addToSet(new Banana({
      texture: this.mTexture,
      normalMap: this.mNormalMap,
      position: position
    }));
  }
};

//------------------------------------------------------------------------------
BananaSet.prototype.update = function() {
  GameObjectSet.prototype.update.call(this);
  
  var cameraWCPos = this.mCamera.getWCCenter();
  var playerBB = this.mPlayer.getBBox();
  var i = 0;
  
  for(i = 0; i < this.mBananaCount; i++) {
    var childWCXForm = this.getChildWCXForm(this.mSet[i]);
    var childWCPos = childWCXForm.getPosition();
    var childWCBB = this.getChildWCBB(this.mSet[i]);

    if(!this.mPlayer.isIncapacitated() && playerBB.intersectsBound(childWCBB)) {
      this.mHUD.spawnDummyBanana({
        x: childWCPos[0] - cameraWCPos[0],
        y: childWCPos[1] -cameraWCPos[1]
      });

      this.removeFromSet(this.mSet[i]);
      this.mBananaCount--;
      this.mPlayer.incrementScore();
      
      gEngine.AudioClips.playACue(this.mBananaSound);
    }
  }
};

//------------------------------------------------------------------------------
BananaSet.prototype.getChildWCXForm = function(obj) {
  var concatXform = mat4.create();
  var tempXform = new Transform();

  // Transform the child in regards to its parent.
  mat4.multiply(
    concatXform,
    this.getXform().getXform(),
    obj.getXform().getXform()
  );

  tempXform.setXform(concatXform);
  
  return tempXform;
};

//------------------------------------------------------------------------------
BananaSet.prototype.getChildWCBB = function(obj) {
  var childWCXForm = this.getChildWCXForm(obj);
  
  return new BoundingBox(childWCXForm.getPosition(), childWCXForm.getWidth(), childWCXForm.getHeight());
};
