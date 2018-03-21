/* File: GameOverScene.js 
 * Date: 12/08/2015
 * Author(s): Dexter Hu
 * 
 * The Game Over scene.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

'use strict';  // Operate in Strict mode such that variables must be declared before used!

function GameOverScene(finalScore) {
    Scene.call(this);

    this.kImage = 'assets/sprites/title_gameover.png';
    
    this.mLogo = null;
    this.mScore = null;
    this.mValue = finalScore;
    this.mCamera = null;
    this.mOption = '';
}

//------------------------------------------------------------------------------
gEngine.Core.inheritPrototype(GameOverScene, Scene);

//------------------------------------------------------------------------------
GameOverScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kImage);
};

//------------------------------------------------------------------------------
GameOverScene.prototype.unloadScene = function() {
    gEngine.LayerManager.cleanUp();
    gEngine.Textures.unloadTexture(this.kImage);
    
    var nextLevel;
    if (this.mOption === 'P') {
        nextLevel = new MyGame();
    } else {    // M
        nextLevel = new StartScene();
    }

    gEngine.Core.startScene(nextLevel);
};

//------------------------------------------------------------------------------
GameOverScene.prototype.initialize = function() {
    this.initCamera();
    this.mLogo = new LightRenderable(this.kImage);
    this.mLogo.getXform().setSize(50, 50);
    var l = new Light();
    l.getIntensity(1);
    l.setNear(100);
    l.setFar(100);
    this.mLogo.addLight(l);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mLogo);
    this.mScore = new FontRenderable(this.mValue.toString());
    this.mScore.setColor([1, 1, 1, 1]);
    this.mScore.getXform().setPosition(8, -11.5);
    this.mScore.setTextHeight(4);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mScore);
    Scene.prototype.initialize.call(this);
};

//------------------------------------------------------------------------------
GameOverScene.prototype.draw = function() {
    // Clear the canvas.
    gEngine.Core.clearCanvas([0.2, 0.2, 0.2, 1]);
    
    // Set up the camera projection.
    this.mCamera.setupViewProjection();
    
    // Draw all layers.
    gEngine.LayerManager.drawAllLayers(this.mCamera);
};

//------------------------------------------------------------------------------
GameOverScene.prototype.update = function() {  
    gEngine.LayerManager.updateAllLayers();
  
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mOption = 'P';
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        this.mOption = 'M';
        gEngine.GameLoop.stop();
    }
};

//------------------------------------------------------------------------------
GameOverScene.prototype.initCamera = function() {  
  this.mCamera = new Camera(
    vec2.fromValues(0, 0), // position of the camera
    100,                   // width of camera
    [0, 0, 1280, 720]      // viewport (orgX, orgY, width, height)
  );

  this.mCamera.setBackgroundColor([0.1, 0.1, 0.1, 1]);
};
