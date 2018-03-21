/* 
 * File: GameOverScene.js
 * By Steven Roberts and Tyler Green
 * 
 * Builds the Game Over Screen, which displays the score and lets you play again.
 * 
 */

function OpeningScene() {
    
    //List of Cameras
    this.mCamera = null;
    
    //List of Objects and variables used on this scene
    this.mDisplayText = null;
    this.kBgMusic = "assets/sound/InnerCore.wav";  
    //this.mBg  //Don't have one of these yet
}
gEngine.Core.inheritPrototype(OpeningScene, Scene);

//No assets to load yet. Override availble here if we decide to load an asset
OpeningScene.prototype.loadScene = function () {   
    
    //BGM turned off for tuning to advance load time
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    };

OpeningScene.prototype.unloadScene = function() {
    // starts the next level
    var nextLevel = new MainGameScene();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

OpeningScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 900, 600],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.6, 0.3, 0.0, 1]);
    
    //Initializes FontRenderable: Notably the Color is Set here and only here (for now)
    this.mMsg = new FontRenderable();
    this.mMsg.setColor([0, 0, 0, 1]);
};

//Draws everything
OpeningScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    //And here is where we'd draw the background... if we had one!
    
    //Draws Text Objects. Ugh, Text. Maybe replace with TextureRenderable PNG Art?
    this.mCamera.setupViewProjection();
    this.mMsg.setText("CAVE ESCAPE!");
    this.mMsg.getXform().setPosition(25, 75);
    this.mMsg.setTextHeight(7);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Press 'P' to Play");
    this.mMsg.getXform().setPosition(25, 70);
    this.mMsg.setTextHeight(4);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Designed and Developed by:");
    this.mMsg.getXform().setPosition(5, 65);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Tyler Green");
    this.mMsg.getXform().setPosition(5, 61);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Steven Roberts");
    this.mMsg.getXform().setPosition(5, 57);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("With Art and Music from:");
    this.mMsg.getXform().setPosition(5, 45);
    this.mMsg.setTextHeight(4);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Artists:");
    this.mMsg.getXform().setPosition(5, 42);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Ariel Williams");
    this.mMsg.getXform().setPosition(5, 39);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Darya \"MistiqMiu\"");
    this.mMsg.getXform().setPosition(5, 36);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("DezrasDragons");
    this.mMsg.getXform().setPosition(5, 33);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Mike \"MoikMellah\" Miller");
    this.mMsg.getXform().setPosition(5, 30);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);    
    
    this.mMsg.setText("NARFNra");
    this.mMsg.getXform().setPosition(5, 27);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("DemonSpawnn")    
    this.mMsg.getXform().setPosition(5, 24);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Musicians:");
    this.mMsg.getXform().setPosition(35, 42);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("remaxim");
    this.mMsg.getXform().setPosition(35, 39);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Toni \"Max Gooroo\" Gottschall");
    this.mMsg.getXform().setPosition(35, 36);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("n3b");
    this.mMsg.getXform().setPosition(35, 33);
    this.mMsg.setTextHeight(2);
    this.mMsg.draw(this.mCamera);
};


OpeningScene.prototype.update = function () {
    
    //If Spacebar hit, play again
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P))
        gEngine.GameLoop.stop();
};

