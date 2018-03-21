/*jslint node: true, vars: true */
/*global gEngine, Player */
/* find out more about jslint: http://www.jslint.com/help.html */

//------------------------------------------------------------------------------
function HUD(options) {
  this.mOxygenBubbles = [];
  this.mDistanceFont = null;
  this.mScoreBanana = null;
  this.mScoreFont = null;
  
  this.mCamera = options.camera;
  this.mLightSet = options.lightSet;
  this.mPlayer = options.player;
  this.mBananaSprite = options.bananaSprite;
  this.mBubbleSprite = options.bubbleSprite;
  
  this.mRadar = null;
  
  this.mDummyBananas = null;
  
  this.init();
};

//------------------------------------------------------------------------------
HUD.prototype.init = function() {
  this.initOxygen();
  this.updateOxygen();
  
  this.initDistance();
  this.updateDistance();
  
  this.initScore();
  this.updateScore();
  
  this.initDummyBananas();
  
  this.initRadar();
};

//------------------------------------------------------------------------------
HUD.prototype.initOxygen = function() {
  var i = 0;
  var bubble = null;
  
  for(i = 0; i < Player.constants.oxygenBubbleCount; i++) {
    bubble = new Bubble({
      texture: this.mBubbleSprite,
      normalMap: null,
      position: {
        x: 0,
        y: 0
      }
    });
    
    bubble.addLight(this.mLightSet.getLightAt(0));

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, bubble);
    
    this.mOxygenBubbles.push(bubble);
  }
};

//------------------------------------------------------------------------------
HUD.prototype.initDistance = function() {
  this.mDistanceFont = new FontRenderable('0m');
  this.mDistanceFont.setColor([1, 1, 1, 1]);
  this.mDistanceFont.getXform().setPosition(0, 0);
  this.mDistanceFont.setTextHeight(4);
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mDistanceFont);
};

//------------------------------------------------------------------------------
HUD.prototype.initScore = function() {
  this.mScoreFont = new FontRenderable('0');
  this.mScoreFont.setColor([1, 1, 1, 1]);
  this.mScoreFont.getXform().setPosition(0, 0);
  this.mScoreFont.setTextHeight(4);
  
  this.mScoreBanana = new Banana({
    texture: this.mBananaSprite,
    normalMap: null,
    position: {
      x: 0,
      y: 0
    }
  });
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreFont);
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mScoreBanana);
  
  this.mScoreBanana.addLight(this.mLightSet.getLightAt(0));
};

//------------------------------------------------------------------------------
HUD.prototype.initDummyBananas = function() {
  var cameraPosition = this.mCamera.getWCCenter();
  
  this.mDummyBananas = new DummyBananaSet({
    texture: this.kBananasSprite,
    normalMap: this.kBananasNormalMap,
    position: {
      x: cameraPosition[0],
      y: cameraPosition[1]
    },
    hud: this
  });
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mDummyBananas);
};

//------------------------------------------------------------------------------
HUD.prototype.initRadar = function() {
  this.mRadar = new Radar({
    mainCamera: this.mCamera,
    player: this.mPlayer
  });
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mRadar);
};

//------------------------------------------------------------------------------
HUD.prototype.update = function() {
  this.updateOxygen();
  this.updateDistance();
  this.updateScore();
  this.updateDummyBananas();
};

//------------------------------------------------------------------------------
HUD.prototype.updateOxygen = function() {
  var playerOxygenBubbleCount = this.mPlayer.getOxygenBubbleCount();
  var cameraCenter = this.mCamera.getWCCenter();
  var i = 0;
  
  for(i = 0; i < this.mOxygenBubbles.length; i++) {
    var bubble = this.mOxygenBubbles[i];
    var bubbleXForm = bubble.getXform();
    var color = [1, 1, 1, 0];
    
    var position = {
      x: cameraCenter[0] - this.mCamera.getWCWidth() * 0.5 + bubbleXForm.getWidth() * 0.5 + (bubbleXForm.getWidth() + 0.5) * i + 1.25,
      y: cameraCenter[1] + this.mCamera.getWCHeight() * 0.5 - bubbleXForm.getHeight() * 0.5 - 1.25
    };
    
    bubbleXForm.setPosition(position.x, position.y);
    
    if(i > playerOxygenBubbleCount - 1) {
      color = [0.2, 0.2, 0.2, 0.75];
    }
    
    bubble.getRenderable().setColor(color);
  }
};

//------------------------------------------------------------------------------
HUD.prototype.updateDistance = function() {
  var cameraCenter = this.mCamera.getWCCenter();
  var distanceFontXForm = this.mDistanceFont.getXform();
  this.mDistanceFont.setText(this.mPlayer.getDistanceInMeters().toString() + 'm');
  
  var distanceFontPosition = {
    x: cameraCenter[0] - distanceFontXForm.getWidth() * 0.5,
    y: cameraCenter[1] + this.mCamera.getWCHeight() * 0.5 - distanceFontXForm.getHeight() + 1.5
  };
  
  this.mDistanceFont.getXform().setPosition(distanceFontPosition.x, distanceFontPosition.y);
};

//------------------------------------------------------------------------------
HUD.prototype.updateScore = function() {
  this.mScoreFont.setText(this.mPlayer.getScore().toString());
  
  var cameraCenter = this.mCamera.getWCCenter();  
  var scoreBananaXForm = this.mScoreBanana.getXform();
  var scoreBananaPosition = {
    x: cameraCenter[0] - this.mCamera.getWCWidth() * 0.5 + scoreBananaXForm.getWidth() * 0.5 + 1.25,
    y: cameraCenter[1] + this.mCamera.getWCHeight() * 0.5 - 6.5
  };
  
  scoreBananaXForm.setPosition(scoreBananaPosition.x, scoreBananaPosition.y);
  
  var scoreFontXForm = this.mScoreFont.getXform();
  var scoreFontPosition = {
    x: scoreBananaPosition.x + scoreBananaXForm.getWidth() * 0.5 + 1.5,
    y: scoreBananaPosition.y + 0.4
  };
  
  scoreFontXForm.setPosition(scoreFontPosition.x, scoreFontPosition.y);
};

//------------------------------------------------------------------------------
HUD.prototype.updateDummyBananas = function() {
  var cameraPosition = this.mCamera.getWCCenter();
  var dummyBananasXForm = this.mDummyBananas.getXform();
  
  dummyBananasXForm.setPosition(cameraPosition[0], cameraPosition[1]);
};

//------------------------------------------------------------------------------
HUD.prototype.spawnDummyBanana = function(position) {
  var dummyBanana = new Banana({
    texture: this.mBananaSprite,
    normalMap: null,
    position: position
  });
  
  dummyBanana.addLight(this.mLightSet.getLightAt(0));

  this.mDummyBananas.addToSet(dummyBanana);
};

//------------------------------------------------------------------------------
HUD.prototype.getScoreBanana = function() {
  return this.mScoreBanana;
};
