/* global gEngine, Scene, vec2 */

function Win(){
    this.mMsg = null;
    this.mMsg2 = null;
    this.mYes = null;
    this.mNo = null;
    this.mCamera = null;
    this.mChoice = false;
    this.kLevelOneSceneFile = "assets/levels/one.xml";
    this.kLevelOneBgClip = "assets/sounds/BGClip1.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    this.kUIButton = "assets/UI/button.png";
}

gEngine.Core.inheritPrototype(Win,Scene);

Win.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kUIButton);
};

Win.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.mChoice){
        var nextLevel = new Level(this.kLevelOneSceneFile, this.kLevelOneBgClip,
        this.kCue);
    }else{
        var nextLevel = new MyGame();
    }
    gEngine.Core.startScene(nextLevel);
};

Win.prototype.initialize = function(){
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 1000, 750]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mMsg = new UIText("CONGRATULATIONS",[500,700],8,1,0,[0,0,0,1]);
    this.mMsg2 = new UIText("Play Again?", [500,550],7.5,1,0,[0,0,0,1]);
    this.mYes = new UIButton(this.kUIButton,this.PLAYAGAIN,this,[300,150],[200,100],"Yes",8,[1,1,1,1],[0,0,0,1]);
    this.mNo = new UIButton(this.kUIButton,this.STARTSCREEN,this,[700,150],[200,100],"No",8,[1,1,1,1],[0,0,0,1]);
};

Win.prototype.draw = function(){
    gEngine.Core.clearCanvas([.9,.9,.9,1]);
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
    this.mYes.draw(this.mCamera);
    this.mNo.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
};

Win.prototype.update = function(){
    this.mYes.update();
    this.mNo.update();
};

Win.prototype.PLAYAGAIN = function(){
    this.mChoice = true;
    gEngine.GameLoop.stop();
};

Win.prototype.STARTSCREEN = function(){
    gEngine.GameLoop.stop();
};

