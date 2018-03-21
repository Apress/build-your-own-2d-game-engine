/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, vec2, PlayerState, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict';

function Player(options) {
  // Flashlight constants
  this.kFlashlightCooldown = 480;   // Max cooldown
  this.kFlashlightDuration = 240;   // Max duration
    
  this.mPlayer = null;
  this.mCamera = options.camera;
  this.mLightSet = options.lightSet;
  this.mLaneSet = options.laneSet;
  this.mScore = 0;
  this.mOxygenBubbleCount = Player.constants.oxygenBubbleCount;
  this.mLastOxygenTime = new Date().getTime();
  this.mIncapacitationSound = options.incapacitationSound;
  this.mOxygenBubblePopSound = options.oxygenBubblePopSound;
  this.mFlashlightSound = options.flashlightSound;
  this.mFlashlightCooldownSound = options.flashlightCooldownSound;
  this.mImpairedTimeLeft = 0;
  this.mGlobalLightSet = options.set;
  
  // Flashlight vars
  this.mFlashlightCooldown = 0;   // 0: ready, anything larger is a cooldown
  this.mFlashlightDuration = 0;   // 0: unused, kFlashlightDuration: fully used (go on cooldown)
  this.mFlashlightIsOn = false;   // A flag read by MyGame, which will update the light for us
    
  if(options.spriteNormal) {
    this.mPlayer = new IllumRenderable(options.sprite, options.spriteNormal);
  } else {
    this.mPlayer = new LightRenderable(options.sprite);
  }
  
  var firstLaneXForm = this.mLaneSet.getObjectAt(0).getXform();
  var firstLanePosition = firstLaneXForm.getPosition();
  var playerPosition = {
    x: Player.constants.dimensions.width * 0.5 + MyGame.constants.camera.offset,
    y: firstLanePosition[1]
  };

  this.mPlayer.setColor([1.0, 1.0, 1.0, 0]);
  this.mPlayer.getXform().setPosition(playerPosition.x, playerPosition.y);
  this.mPlayer.getXform().setZPos(0);
  this.mPlayer.getXform().setSize(Player.constants.dimensions.width, Player.constants.dimensions.height);
  this.mPlayer.setSpriteSequence(127, 1,     // first element's (y, x) top-left pixel position (sprite sheet origin is bottom left)
                                127, 127,    // widthxheight in pixels
                                4,           // number of elements in this sequence
                                1);          // horizontal padding in between
  this.mPlayer.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  this.mPlayer.setAnimationSpeed(12);
  
  this.mPlayerState = new PlayerState([playerPosition.x, playerPosition.y]);
  
  //----------------------------------------------------------------------------
  this.mRadarRenderable = new SpriteAnimateRenderable(options.sprite);
  
  this.mRadarRenderable.setColor([1, 1, 1, 1]);
  this.mRadarRenderable.getXform().setPosition(playerPosition.x, playerPosition.y);
  this.mRadarRenderable.getXform().setZPos(0);
  this.mRadarRenderable.getXform().setSize(Player.constants.dimensions.width, Player.constants.dimensions.height);
  this.mRadarRenderable.setSpriteSequence(127, 1,     // first element's (y, x) top-left pixel position (sprite sheet origin is bottom left)
                                127, 127,    // widthxheight in pixels
                                4,           // number of elements in this sequence
                                1);          // horizontal padding in between
  this.mRadarRenderable.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
  this.mRadarRenderable.setAnimationSpeed(12);

  GameObject.call(this, this.mPlayer);
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(Player, GameObject);

//------------------------------------------------------------------------------
Player.constants = Object.freeze({
  delta: 5,
  oxygenBubbleCount: 5,
  oxygenDelta: 10000, // milliseconds
  dimensions: Object.freeze({
    width: 9,
    height: 9
  })
});

//------------------------------------------------------------------------------
Player.prototype.setCenter = function(x, y) {
  var pos = vec2.fromValues(x, y);
  
  this.mPlayerState.setCenter(pos);
};

//------------------------------------------------------------------------------
Player.prototype.update = function() {
  this.mPlayer.updateAnimation();
  this.mPlayerState.update();
  
  this.updateInput();
  this.updatePosition();
  this.updateLight();
  this.updateOxygen();
  this.updateFlashlight();
  this.checkForGameOver();
  
  var pos = this.mPlayer.getXform().getPosition();
  
  this.mRadarRenderable.updateAnimation();
  this.mRadarRenderable.getXform().setPosition(pos[0], pos[1]);
};

//------------------------------------------------------------------------------
Player.prototype.updateInput = function() {
  this.updateCooldown();
};

//------------------------------------------------------------------------------
Player.prototype.updateCooldown = function() {
  // Use flashlight
  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
    if(this.mFlashlightCooldown === 0 && this.mImpairedTimeLeft <= 0) {
      this.mFlashlightIsOn = true;
      this.mFlashlightCooldown = this.kFlashlightCooldown;
      gEngine.AudioClips.playACue(this.mFlashlightSound);
    } else {
      gEngine.AudioClips.playACue(this.mFlashlightCooldownSound);
    }
  }
};

//------------------------------------------------------------------------------
Player.prototype.updateFlashlight = function() {
  // Flashlight cooldown
  if (this.mFlashlightCooldown > 0) {
      this.mFlashlightCooldown--;
  }
  
  // Flashlight duration
  if (this.mFlashlightIsOn) {
      if (this.mFlashlightDuration === this.kFlashlightDuration) {
          // Turn off the flashlight, you've used it long enough! (cooldown was already set)
          this.mFlashlightIsOn = false;
          this.mFlashlightDuration = 0;
      } else {
        this.mFlashlightDuration++;
      }
  }
};

//------------------------------------------------------------------------------
Player.prototype.updatePosition = function() {
  if(!this.isIncapacitated()) {
    var currentLane = this.mLaneSet.getCurrentLane();
    var currentLaneXForm = currentLane.getXform();
    var currentLanePosition = currentLaneXForm.getPosition();

    var playerXForm = this.mPlayer.getXform();
    var playerPosition = playerXForm.getPosition();

    this.setCenter(playerPosition[0] + Player.constants.delta, currentLanePosition[1]);

    var newCenter = this.mPlayerState.getCenter();
    var xForm = this.getXform();

    xForm.setPosition(newCenter[0], newCenter[1]);
  }
};

//------------------------------------------------------------------------------
Player.prototype.updateLight = function() {
  if(!this.isIncapacitated()) {
    var playerPosition = this.getXform().getPosition();
    
    this.mLightSet.getLightAt(1).set2DPosition(playerPosition);
  }
};

//------------------------------------------------------------------------------
Player.prototype.updateOxygen = function() {
  if(!this.isIncapacitated()) {
    var timeNow = new Date().getTime();

    if(timeNow - this.mLastOxygenTime > Player.constants.oxygenDelta) {
      this.mOxygenBubbleCount--;
      this.mLastOxygenTime = timeNow;

      if(this.mOxygenBubbleCount <= 0) {
        this.incapacitate();
      } else {
        gEngine.AudioClips.playACue(this.mOxygenBubblePopSound);
      }
    }
  }
};

//------------------------------------------------------------------------------
Player.prototype.checkForGameOver = function() {
  var cameraShake = this.mCamera.getCameraShakeObject();

  if(this.isIncapacitated() && cameraShake !== null && cameraShake.shakeDone()) {
    gEngine.GameLoop.stop();
  }
};

//------------------------------------------------------------------------------
Player.prototype.incapacitate = function() {
  this.setVisibility(false);
  this.setState(PlayerState.constants.states.incapacitated);
  this.mCamera.shake(-2, -2, 20, 30);
  this.mLightSet.getLightAt(1).setLightTo(false);
  this.mGlobalLightSet.getLightAt(3).setIntensity(0);
  
  gEngine.AudioClips.playACue(this.mIncapacitationSound);
};

//------------------------------------------------------------------------------
Player.prototype.setState = function(state) {
  this.mPlayerState.setState(state);
};

//------------------------------------------------------------------------------
Player.prototype.getState = function() {
  return this.mPlayerState.getState();
};

//------------------------------------------------------------------------------
Player.prototype.getScore = function() {
  return this.mScore;
};

//------------------------------------------------------------------------------
Player.prototype.setScore = function(score) {
  this.mScore = score;
};

//------------------------------------------------------------------------------
Player.prototype.incrementScore = function() {
  this.mScore += 1;
};

//------------------------------------------------------------------------------
Player.prototype.getOxygenBubbleCount = function() {
  return this.mOxygenBubbleCount;
};

//------------------------------------------------------------------------------
Player.prototype.isIncapacitated = function() {
  return this.mPlayerState.getState() === PlayerState.constants.states.incapacitated;
};

//------------------------------------------------------------------------------
Player.prototype.addOxygenBubble = function() {
  this.mOxygenBubbleCount++;
  
  if(this.mOxygenBubbleCount > Player.constants.oxygenBubbleCount) {
    this.mOxygenBubbleCount = Player.constants.oxygenBubbleCount;
    this.mLastOxygenTime = new Date().getTime();
  }
};

//------------------------------------------------------------------------------
Player.prototype.getDistanceInMeters = function() {
  var playerPosition = this.mPlayer.getXform().getPosition();

  return Math.floor(playerPosition[0] / MyGame.constants.unitsPerMeter);
};

//------------------------------------------------------------------------------
Player.prototype.calcScore = function() {
  return this.getDistanceInMeters() + this.mScore;
};

//------------------------------------------------------------------------------
Player.prototype.drawRadarRepresentation = function(camera) {
  if(!this.isIncapacitated()) {
    this.mRadarRenderable.draw(camera);
  }
};

//------------------------------------------------------------------------------
Player.prototype.isImpaired = function() {
  return this.mImpairedTimeLeft > 0;
};