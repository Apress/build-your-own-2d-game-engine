//------------------------------------------------------------------------------
function BubbleSpawner(options) {
  GameObjectSet.call(this);
  
  this.mCamera = options.camera;
  this.mPlayer = options.player;
  this.mLaneSet = options.laneSet;
  this.mBubbles = [];
  
  this.mBubbleTexture = options.bubbleTexture;
  this.mBubbleNormalMap = options.bubbleNormalMap;
  this.mBubbleReplenishSound = options.bubbleReplenishSound;
  
  this.mNextSpawnTime = this.calcRandomSpawnTime();
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(BubbleSpawner, GameObjectSet);

//------------------------------------------------------------------------------
BubbleSpawner.prototype.update = function() {
  GameObjectSet.prototype.update.call(this);
  
  this.spawnBubble();
  this.updateBubblePositions();
  this.collectBubble();
};

//------------------------------------------------------------------------------
BubbleSpawner.prototype.updateBubblePositions = function() {
  var i = 0;
  
  for(i = 0; i < this.mSet.length; i++) {
    var bubbleXForm = this.mSet[i].getXform();
    var bubblePosition = bubbleXForm.getPosition();
    
    bubbleXForm.setPosition(bubblePosition[0], bubblePosition[1] + Bubble.constants.delta);
  }
};

//------------------------------------------------------------------------------
BubbleSpawner.prototype.spawnBubble = function() {
  var currentTime = new Date().getTime();
  
  if(!this.mPlayer.isIncapacitated() && this.mNextSpawnTime - currentTime < 0) {
    this.mNextSpawnTime = this.calcRandomSpawnTime();
    
    var randomLane = this.mLaneSet.getRandomLane();
    var laneXForm = randomLane.getXform();
    var lanePosition = laneXForm.getPosition();
    
    var cameraCenter = this.mCamera.getWCCenter();
    var cameraWidth = this.mCamera.getWCWidth();
    var cameraRight = cameraCenter[0] + cameraWidth * 0.5;
    
    this.addToSet(new Bubble({
      texture: this.mBubbleTexture,
      normalMap: this.mBubbleNormalMap,
      position: {
        x: cameraRight + 20 + (20 * Math.random()),
        y: lanePosition[1]
      }
    }));
  }
};

//------------------------------------------------------------------------------
BubbleSpawner.prototype.collectBubble = function() {
  var h = [];
  var i = 0;
  
  if(!this.mPlayer.isIncapacitated()) {
    for(i = 0; i < this.mSet.length; i++) {
      if(this.mPlayer.isIncapacitated()) {
        break;
      }
      
      if(this.mSet[i].pixelTouches(this.mPlayer, h)) {
        this.removeFromSet(this.mSet[i]);
        this.mPlayer.addOxygenBubble();

        gEngine.AudioClips.playACue(this.mBubbleReplenishSound);
      }
    } 
  }
};

//------------------------------------------------------------------------------
BubbleSpawner.prototype.calcRandomSpawnTime = function() {
  var currentTime = new Date().getTime();  
  var randomPercentage = 0.6 + 0.4 * Math.random();
  
  return currentTime + Math.ceil(Player.constants.oxygenDelta * randomPercentage);
};
