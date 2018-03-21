/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Player, Minion, Dye, Light, BubbleSpawner, EnemySpawner, BananaSpawner,
  BananaSet*/
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict';  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    Scene.call(this);
    
    this.kBananasSprite = 'assets/sprites/bananas_sprite.png';
    this.kBananasNormalMap = 'assets/sprites/bananas_sprite_normal.png';
    this.kSheet1 = 'assets/sprites/spritesheet_shark_squid_angler_player.png';
    this.kSheet2 = 'assets/sprites/spritesheet_bubble_eel.png';
    this.kBackground = 'assets/background.png';
    this.kBackgroundNormalMap = 'assets/background_normal.png';
    this.kBananaSound = 'assets/sounds/banana.mp3';
    this.kIncapacitationSound = 'assets/sounds/incapacitation.wav';
    this.kOxygenBubblePopSound = 'assets/sounds/oxygen_bubble_pop.wav';
    this.kOxygenBubbleReplenishSound = 'assets/sounds/oxygen_bubble_replenish.wav';
    this.kAnglerFishSound = 'assets/sounds/angler_fish.wav';
    this.kFlashlightSound = 'assets/sounds/flashlight.wav';
    this.kFlashlightCooldownSound = 'assets/sounds/flashlight_cooldown.wav';
    this.kRadarSprite = 'assets/sprites/skull.png';
        
    // Light referencing
    this.mPlayerLight = null;
    this.mBGLight = null;

    // the hero and the support objects
    this.mPlayer = null;

    this.mLaneSet = null;
    this.mBananaSets = [];

    this.mGlobalLightSet = null;

    this.mLgtIndex = 0;
    this.mLgtRotateTheta = 0;
    
    this.mAngler = null;
    
    this.mBackgroundScroller = null;
    
    this.mHUD = null;
    this.mBubbleSpawner = null;
    this.mEnemySpawner = null;
    this.mBananaSpawner = null;
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(MyGame, Scene);

//------------------------------------------------------------------------------
MyGame.constants = Object.freeze({
  unitsPerMeter: 25,
  camera: Object.freeze({
    width: 100,
    offset: 12
  })
});

//------------------------------------------------------------------------------
MyGame.prototype.loadScene = function () {
  gEngine.Textures.loadTexture(this.kBackground);
  gEngine.Textures.loadTexture(this.kBackgroundNormalMap);
  gEngine.Textures.loadTexture(this.kBananasSprite);
  gEngine.Textures.loadTexture(this.kBananasNormalMap);
  gEngine.Textures.loadTexture(this.kSheet1);
  gEngine.Textures.loadTexture(this.kSheet2);
  gEngine.Textures.loadTexture(this.kRadarSprite);
  gEngine.AudioClips.loadAudio(this.kBananaSound);
  gEngine.AudioClips.loadAudio(this.kIncapacitationSound);
  gEngine.AudioClips.loadAudio(this.kOxygenBubblePopSound);
  gEngine.AudioClips.loadAudio(this.kOxygenBubbleReplenishSound);
  gEngine.AudioClips.loadAudio(this.kAnglerFishSound);
  gEngine.AudioClips.loadAudio(this.kFlashlightSound);
  gEngine.AudioClips.loadAudio(this.kFlashlightCooldownSound);
};

//------------------------------------------------------------------------------
MyGame.prototype.unloadScene = function() {
  gEngine.LayerManager.cleanUp();
  
  gEngine.Textures.unloadTexture(this.kBackground);
  gEngine.Textures.unloadTexture(this.kBackgroundNormalMap);
  gEngine.Textures.unloadTexture(this.kBananasSprite);
  gEngine.Textures.unloadTexture(this.kBananasNormalMap);
  gEngine.Textures.unloadTexture(this.kSheet1);
  gEngine.Textures.unloadTexture(this.kSheet2);
  gEngine.Textures.unloadTexture(this.kRadarSprite);
  gEngine.AudioClips.unloadAudio(this.kBananaSound);
  gEngine.AudioClips.unloadAudio(this.kIncapacitationSound);
  gEngine.AudioClips.unloadAudio(this.kOxygenBubblePopSound);
  gEngine.AudioClips.unloadAudio(this.kOxygenBubbleReplenishSound);
  gEngine.AudioClips.unloadAudio(this.kAnglerFishSound);
  gEngine.AudioClips.unloadAudio(this.kFlashlightSound);
  gEngine.AudioClips.unloadAudio(this.kFlashlightCooldownSound);
  
  gEngine.Core.startScene(new GameOverScene(this.mPlayer.calcScore()));
};

//------------------------------------------------------------------------------
MyGame.prototype.initialize = function() {
  this.initCamera();
  this._initializeLights();   // defined in MyGame_Lights.js
  this.initBackground();
  this.initLaneSet();
  this.initPlayer();
  this.initEnemies();
  this._initializeAnglerLight();
  this._initializeBGLight();
  this._initializePlayerLight();
  this.assignLights();
  this.initBubbleSpawner();
  this.initEnemySpawner();
  this.initHUD();
  this.initBananaSpawner();
  
  Scene.prototype.initialize.call(this);
};

//------------------------------------------------------------------------------
MyGame.prototype.draw = function() {
  // Clear the canvas.
  gEngine.Core.clearCanvas([0.2, 0.2, 0.2, 1]);
  
  // Set up the camera projection.
  this.mCamera.setupViewProjection();
  
  // Draw all layers.
  gEngine.LayerManager.drawAllLayers(this.mCamera);
};

//------------------------------------------------------------------------------
MyGame.prototype.update = function() {  
  gEngine.LayerManager.updateAllLayers();
  
  this.updateCamera();
  this.mHUD.update();
  this.mBackgroundScroller.update();
    
  this.updateAnglerLight();
  this.updatePlayerLight();
  this.updateBGLight();
  
  this.mEnemySpawner.update();
  this.mBananaSpawner.update();
};

//------------------------------------------------------------------------------m
MyGame.prototype.updateBGLight = function() {
  // Background light gets dimmer as you go
  if (!this.mPlayer.isIncapacitated()) {
    var maxDarkness = -0.3;   // Lowest intensity value
    var darkAt = 40;          // It reaches that value at this many meters
    this.mBGLight.setIntensity(maxDarkness * Math.min(this.mPlayer.getDistanceInMeters() / darkAt, 1));
  }
};

//------------------------------------------------------------------------------m
MyGame.prototype.updateAnglerLight = function() {
  // Anglerfish light
  var anglerLight = this.mGlobalLightSet.getLightAt(2);
  var xform = this.mAngler.mObj.getXform();
  anglerLight.setXPos(xform.getXPos());
  anglerLight.setYPos(xform.getYPos());
};

//------------------------------------------------------------------------------m
MyGame.prototype.updatePlayerLight = function() {
  // Player light
  if (this.mPlayer.mImpairedTimeLeft > 0) {
    // Impaired player light
    this.mPlayerLight.setNear(10);
    this.mPlayerLight.setFar(20);
    this.mPlayerLight.setIntensity(Math.random() * 0.5 + 0.2);
    this.mPlayerLight.setColor([0.5, 0.5, 1, 1]);
    this.mPlayerLight.setLightType(Light.eLightType.eSpotLight);
    this.mPlayer.mImpairedTimeLeft--;
    // Sorry, but you can't use a flashlight if you're impaired.
    this.mPlayer.mFlashlightIsOn = false;
    this.mPlayer.mFlashlightDuration = 0;
  } else {
    if (this.mPlayer.mFlashlightIsOn) {
      // Flashlight
      var l = this.mGlobalLightSet.getLightAt(4);
      this.mPlayerLight.setNear(30);
      this.mPlayerLight.setFar(50);
      this.mPlayerLight.setIntensity(l.getIntensity());
      this.mPlayerLight.setColor(l.getColor());
      this.mPlayerLight.setLightType(Light.eLightType.ePointLight);
    } else {
      // Normal player light
      var l = this.mGlobalLightSet.getLightAt(4);
      this.mPlayerLight.setNear(l.getNear());
      this.mPlayerLight.setFar(l.getFar());
      this.mPlayerLight.setIntensity(l.getIntensity());
      this.mPlayerLight.setColor(l.getColor());
      this.mPlayerLight.setLightType(l.getLightType());
    }
  }
};

//------------------------------------------------------------------------------
MyGame.prototype.updateCamera = function() {
  // Update the camera (interpolation and/or shake).
  this.mCamera.update();
  
  var cameraCenter = this.mCamera.getWCCenter();
  var playerXForm = this.mPlayer.getXform();
  var playerPosition = playerXForm.getPosition();
  
  this.mCamera.setWCCenter(playerPosition[0] + this.mCamera.getWCWidth() * 0.5 - MyGame.constants.camera.offset, cameraCenter[1]);
};

//------------------------------------------------------------------------------
MyGame.prototype.initCamera = function() {
  var initialPosition = {
    x: MyGame.constants.camera.width * 0.5,
    y: 0
  };
  
  this.mCamera = new Camera(
    vec2.fromValues(initialPosition.x, initialPosition.y), // position of the camera
    MyGame.constants.camera.width,                   // width of camera
    [0, 0, 1280, 720]      // viewport (orgX, orgY, width, height)
  );

  this.mCamera.setBackgroundColor([0, 0, 0, 1]);
  this.resize();
};

//------------------------------------------------------------------------------
MyGame.prototype.initBackground = function() {
  this.mBackgroundScroller = new BackgroundScroller({
    bgTexture: this.kBackground,
    bgNormalMap: this.kBackgroundNormalMap,
    camera: this.mCamera,
    lights: this.mGlobalLightSet
  });
};

//------------------------------------------------------------------------------
MyGame.prototype.initLaneSet = function() {
  this.mLaneSet = new LaneSet({
    camera: this.mCamera,
    game: this
  });
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mLaneSet);
};

//------------------------------------------------------------------------------
MyGame.prototype.initPlayer = function() {
  this.mPlayer = new Player({
    sprite: this.kSheet1,
    spriteNormal: null,
    camera: this.mCamera,
    lightSet: this.mGlobalLightSet,
    laneSet: this.mLaneSet,
    incapacitationSound: this.kIncapacitationSound,
    oxygenBubblePopSound: this.kOxygenBubblePopSound,
    flashlightSound: this.kFlashlightSound,
    flashlightCooldownSound: this.kFlashlightCooldownSound,
    set: this.mGlobalLightSet
  });
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPlayer);
};

//------------------------------------------------------------------------------
MyGame.prototype.initEnemies = function() {
  this.mAngler = new Anglerfish(this.kSheet1, null, -1000, -1000, this.mCamera, this.mPlayer, this.kAnglerFishSound, this.kRadarSprite);
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mAngler);
};

//------------------------------------------------------------------------------
MyGame.prototype.initBubbleSpawner = function() {
  this.mBubbleSpawner = new BubbleSpawner({
    camera: this.mCamera,
    player: this.mPlayer,
    laneSet: this.mLaneSet,
    bubbleTexture: this.kSheet2,
    bubbleNormalMap: null,
    bubbleReplenishSound: this.kOxygenBubbleReplenishSound
  });
  
  this.mBubbleSpawner.addLight(this.mGlobalLightSet.getLightAt(1));
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eBubbles, this.mBubbleSpawner);
};

//------------------------------------------------------------------------------
MyGame.prototype.initEnemySpawner = function() {
  this.mEnemySpawner = new EnemySpawner(this.mCamera, this.mPlayer, this.mAngler, this.mPlayerLight, this.mGlobalLightSet, this.kSheet1, this.kSheet2, this.kRadarSprite);
};

//------------------------------------------------------------------------------
MyGame.prototype.initBananaSpawner = function() {
  this.mBananaSpawner = new BananaSpawner(this.mCamera, this.mPlayer, this.mPlayerLight, this.mGlobalLightSet, this.kBananasSprite, this.kBananasNormalMap, this.kBananaSound, this.mHUD, this.mLaneSet);
};

//------------------------------------------------------------------------------
MyGame.prototype.initHUD = function() {
  this.mHUD = new HUD({
    camera: this.mCamera,
    lightSet: this.mGlobalLightSet,
    player: this.mPlayer,
    bananaSprite: this.kBananasSprite,
    bubbleSprite: this.kSheet2
  });
};

//------------------------------------------------------------------------------
MyGame.prototype.assignLights = function() {
    this.mPlayer.clearLights();
    this.mAngler.clearLights();

    // Player light
    this.mPlayerLight = this.mGlobalLightSet.getLightAt(1);
    this.mPlayer.addLight(this.mPlayerLight);   
    this.mAngler.addLight(this.mPlayerLight);

    this.mPlayer.addLight(this.mGlobalLightSet.getLightAt(2));
    
    var i = 0;
    for(i = 2; i <= 3; i++) {
        var lightToAdd = this.mGlobalLightSet.getLightAt(i);
        this.mAngler.addLight(lightToAdd);
    }
    
    // Apply them to bananas also
    i = 0;
    for(i = 0; i < this.mBananaSets.length; i++) {
        this.mBananaSets[i].clearLights();
        this.mBananaSets[i].addLight(this.mPlayerLight);
        this.mBananaSets[i].addLight(this.mGlobalLightSet.getLightAt(2));
        this.mBananaSets[i].addLight(this.mGlobalLightSet.getLightAt(3));
    }
    
    // Set background light reference
    this.mBGLight = this.mGlobalLightSet.getLightAt(3);
};
