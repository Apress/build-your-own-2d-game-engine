/*
 * File: Hero_1  Win.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver1() {

   
    this.kSceneFile = "assets/Background1.jpg";
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.mPlayer1win = null;        // these are the Renderable objects
    this.returnMenu = false;
    this.kBgClip = "assets/sounds/gameWin1.mp3";
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(GameOver1, Scene);

GameOver1.prototype.loadScene = function () {

    gEngine.Textures.loadTexture(this.kSceneFile);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.Fonts.loadFont(this.kFontCon72);

};

GameOver1.prototype.unloadScene = function () {

    gEngine.Textures.unloadTexture(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.stopBackgroundAudio(this.kBgClip);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    if(this.returnMenu===true){
        gEngine.Core.startScene(new Startscene());
    }else{
        var nextLevel = new MyGame();  
        gEngine.Core.startScene(nextLevel);
    }

};

GameOver1.prototype.initialize = function () {
    
     this.mCamera = new Camera(
        vec2.fromValues(0,0),  // position of the camera
        100,                      // width of camera
        [400, 0, 600, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    
    
    this.mTextCon72 = new FontRenderable("Press Q to return menu");
    this.mTextCon72.setFont(this.kFontCon72);
    this._initText(this.mTextCon72, -20, 20, [0.9, 0.9, 0.9, 0.8], 5);
    
    
    this.mPlayer1win = new SpriteRenderable(this.kSceneFile);
    this.mPlayer1win.setColor([1,1,1,0]);
    this.mPlayer1win.getXform().setPosition(0,0);
    this.mPlayer1win.getXform().setSize(100,120);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};
GameOver1.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
GameOver1.prototype.draw = function () {

    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to light gray


    this.mCamera.setupViewProjection();
    this.mPlayer1win.draw(this.mCamera);
    this.mTextCon72.draw(this.mCamera);

};


GameOver1.prototype.update = function (){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.returnMenu = true;
        gEngine.GameLoop.stop();
    }
};

