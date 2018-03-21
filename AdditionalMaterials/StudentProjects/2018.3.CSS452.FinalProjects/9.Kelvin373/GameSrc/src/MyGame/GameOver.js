/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function GameOver() {
    // Assets
    this.kImage = "assets/game_over.png";
    this.kBGM = "assets/sounds/kelvin_373_title.ogg";
    
    this.mCamera = null;
    this.mRen = null;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.loadScene = function() {
    gEngine.Textures.loadTexture(this.kImage);
    gEngine.AudioClips.loadAudio(this.kBGM);
};

GameOver.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kImage);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGM);
    
    var restart = new MyGame();
    gEngine.Core.startScene(restart);
};

GameOver.prototype.initialize = function () {
    // BGM
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
    // camera
    this.mCamera = new Camera(
        vec2.fromValues(500, 350),
        1000,
        [0, 0, 1000, 700]
    );
   
    this.mRen = new TextureRenderable(this.kImage);
    this.mRen.setColor([1, 1, 1, 0]);
    this.mRen.getXform().setPosition(500, 350);
    this.mRen.getXform().setSize(1000, 700);
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
}; 
        
GameOver.prototype.draw = function () {
    this.mCamera.setupViewProjection();
    this.mRen.draw(this.mCamera);
};

GameOver.prototype.update = function () {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R)){
        gEngine.GameLoop.stop();
    }
};
