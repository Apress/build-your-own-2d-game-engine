/* 
 * File: GameOverScene.js
 * By Steven Roberts and Tyler Green
 * 
 * Builds the Game Over Screen, which displays the score and lets you play again.
 * 
 */

function GameOverScene(score) {
    
    //List of Cameras
    this.mCamera = null;
    
    //List of Objects and variables used on this scene
    this.mDisplayText = null;
    this.mGameScore = score;
    this.mNext = null;
    //this.mBg  //Don't have one of these yet
    
    //Assets
    this.kLoseSound = "assets/sound/lose.wav";
    this.mBGMTime = 7*60; //elapsed time of this.kLoseSound
}
gEngine.Core.inheritPrototype(GameOverScene, Scene);


GameOverScene.prototype.loadScene = function () {
    gEngine.AudioClips.loadAudio(this.kLoseSound);
};


GameOverScene.prototype.unloadScene = function() {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kLoseSound);
    
    var nextLevel;
    
    // starts the next level
    if(this.mNext === "play")
        nextLevel = new MainGameScene();
    else
        nextLevel = new OpeningScene();
    gEngine.Core.startScene(nextLevel);
};

GameOverScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 900, 600],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.6, 0.3, 0.0, 1]);
    
    
    //Initializes FontRenderable: Notably the Color is Set here and only here (for now)
    this.mMsg = new FontRenderable("GAME OVER");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(25, 60);
    this.mMsg.setTextHeight(10);
    
    //gEngine.AudioClips.playAsCue(this.kLoseSound);
    gEngine.AudioClips.playBackgroundAudio(this.kLoseSound);
};

//Draws everything
GameOverScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    //And here is where we'd draw the background... if we had one!
    
    //Draws Text Objects. Ugh, Text. Maybe replace with TextureRenderable PNG Art?
    this.mCamera.setupViewProjection();
    this.mMsg.setText("GAME OVER");
    this.mMsg.getXform().setPosition(25, 60);
    this.mMsg.setTextHeight(7);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Your Score: " + this.mGameScore);
    this.mMsg.getXform().setPosition(32, 55);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Press 'P' to play again");
    this.mMsg.getXform().setPosition(10, 35);
    this.mMsg.setTextHeight(4);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Press 'M' to return to the main menu");
    this.mMsg.getXform().setPosition(10, 30);
    this.mMsg.setTextHeight(4);
    this.mMsg.draw(this.mCamera);
};


GameOverScene.prototype.update = function () {
    //check when to stop music
    if (this.mBGMTime > 0) {
        this.mBGMTime--;
    }
    else if(gEngine.AudioClips.isBackgroundAudioPlaying()) {
        gEngine.AudioClips.stopBackgroundAudio();
    }
    
    //If Spacebar hit, play again
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)){
        this.mNext = "play";
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M)){
        this.mNext = "menu";
        gEngine.GameLoop.stop();
    }
};

