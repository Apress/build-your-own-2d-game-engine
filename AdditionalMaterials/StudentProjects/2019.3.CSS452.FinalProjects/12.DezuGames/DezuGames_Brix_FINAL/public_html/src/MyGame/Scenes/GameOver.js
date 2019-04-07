/* global gEngine, Scene, vec2 */

function GameOver(sceneFile){
    this.mMsg = null;
    this.mRetry = null;
    this.mYes = null;
    this.mNo = null;
    this.mCamera = null;
    this.mChoice = false;
    this.kLevelSceneFile = sceneFile;
    this.kLevelOneBgClip = "assets/sounds/BgMusic.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    this.kUIButton = "assets/UI/button.png";
}

gEngine.Core.inheritPrototype(GameOver,Scene);

GameOver.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kUIButton);
};

GameOver.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kUIButton);
    var nextLevel = null;
    if(this.mChoice){
        nextLevel = new Level(this.kLevelSceneFile, this.kLevelOneBgClip,
        this.kCue);
    }else{
        nextLevel = new MyGame();
    }
    gEngine.Core.startScene(nextLevel);
};

GameOver.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 1000, 750]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mMsg = new UIText("GAME OVER",[500,700],12,1,0,[1,0,0,1]);
    this.mRetry = new UIText("Retry?", [500,500],10,1,0,[0,0,0,1]);
    this.mYes = new UIButton(this.kUIButton,this.PLAYAGAIN,this,[300,150],[200,100],"Yes",8,[1,1,1,1],[0,0,0,1]);
    this.mNo = new UIButton(this.kUIButton,this.STARTSCREEN,this,[700,150],[200,100],"No",8,[1,1,1,1],[0,0,0,1]);
};

GameOver.prototype.draw = function(){
    gEngine.Core.clearCanvas([.9,.9,.9,1]);
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
    this.mYes.draw(this.mCamera);
    this.mNo.draw(this.mCamera);
    this.mRetry.draw(this.mCamera);
};

GameOver.prototype.update = function(){
    this.mYes.update();
    this.mNo.update();
};

GameOver.prototype.PLAYAGAIN = function(){
    this.mChoice = true;
    gEngine.GameLoop.stop();
};

GameOver.prototype.STARTSCREEN = function(){
    gEngine.GameLoop.stop();
};