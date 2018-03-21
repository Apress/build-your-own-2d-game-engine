'using strict';

//------------------------------------------------------------------------------
function BackgroundScroller(options) {
  this.mBackgroundTexture = options.bgTexture;
  this.mBackgroundNormalMap = options.bgNormalMap;
  this.mCamera = options.camera;
  this.mLights = options.lights;
  
  this.mFirstBackground = null;
  this.mSecondBackground = null;
  
  this.mCurrentBackground = null;
  this.mNextBackground = null;
  
  this.init();
}

//------------------------------------------------------------------------------
BackgroundScroller.prototype.init = function() {
  var bgUsableTextureWidth = 5785;
  var bgUsableTextureHeight = 1600;
  var bgAspectRatio = bgUsableTextureWidth / bgUsableTextureHeight;
  
  var bgTextureInfo = gEngine.Textures.getTextureInfo(this.mBackgroundTexture);
  var bgActualTextureHeight = bgTextureInfo.mHeight;
  
  var bgLeft = 0;
  var bgRight = bgUsableTextureWidth;
  var bgBottom = bgActualTextureHeight - bgUsableTextureHeight;
  var bgTop = bgActualTextureHeight;
  
  var bgWorldHeight = this.mCamera.getWCHeight();
  var bgWorldWidth = bgWorldHeight * bgAspectRatio;
  
  this.mFirstBackground = new IllumRenderable(this.mBackgroundTexture, this.mBackgroundNormalMap);
  this.mFirstBackground.setElementPixelPositions(bgLeft, bgRight, bgBottom, bgTop);
  this.mFirstBackground.getXform().setSize(bgWorldWidth, bgWorldHeight);
  this.mFirstBackground.getXform().setPosition(bgWorldWidth * 0.5, 0);
  this.mFirstBackground.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
  this.mFirstBackground.getMaterial().setShininess(50);
  this.mFirstBackground.getXform().setZPos(-10);
  this.mFirstBackground.addLight(this.mLights.getLightAt(1));
  
  this.mSecondBackground = new IllumRenderable(this.mBackgroundTexture, this.mBackgroundNormalMap);
  this.mSecondBackground.setElementPixelPositions(bgLeft, bgRight, bgBottom, bgTop);
  this.mSecondBackground.getXform().setSize(bgWorldWidth, bgWorldHeight);
  this.mSecondBackground.getXform().setPosition(bgWorldWidth * 0.5, 0);
  this.mSecondBackground.getMaterial().setSpecular([0.2, 0.1, 0.1, 1]);
  this.mSecondBackground.getMaterial().setShininess(50);
  this.mSecondBackground.getXform().setZPos(-10);
  this.mSecondBackground.addLight(this.mLights.getLightAt(1));
  
  this.mCurrentBackground = this.mFirstBackground;
  this.mNextBackground = this.mSecondBackground;
  
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mFirstBackground);
  gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, this.mSecondBackground);
};

//------------------------------------------------------------------------------
BackgroundScroller.prototype.update = function() {
  var currentBGXForm = this.mCurrentBackground.getXform();
  var currentBGPosition = currentBGXForm.getPosition();
  
  var nextBGXForm = this.mNextBackground.getXform();
  var nextBGPosition = nextBGXForm.getPosition();
  
  var cameraCenter = this.mCamera.getWCCenter();
  
  if(cameraCenter[0] > currentBGPosition[0]) {
    var nextX = currentBGPosition[0] + currentBGXForm.getWidth() * 0.5 + nextBGXForm.getWidth() * 0.5 - 0.1;
    var nextY = nextBGPosition[1];
    
    nextBGXForm.setPosition(nextX, nextY);
    
    var currentTemp = this.mCurrentBackground;
    
    this.mCurrentBackground = this.mNextBackground;
    this.mNextBackground = currentTemp;
  }
};

//------------------------------------------------------------------------------
BackgroundScroller.prototype.addLight = function(light) {
    this.mFirstBackground.addLight(light);
    this.mSecondBackground.addLight(light);
};