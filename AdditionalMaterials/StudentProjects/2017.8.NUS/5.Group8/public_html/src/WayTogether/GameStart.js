/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameStart() {
    // textures: 
    

     // this is also the default system font
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontConSys = "assets/fonts/system-default-font";
    this.kBgClip = "assets/sounds/StartScene.mp3";

    // The camera to view the scene
    this.mCamera = null;



    this.mTextConW = null;
    this.mTextConS = null;
    this.mTextConH = null;
    this.mTextConA = null;
    this.mTextConF = null;
    this.mTextCon2 = null;
    this.mTextCon3 = null;

    this.mTextToWork = null;
    this.mState = 0;
}
gEngine.Core.inheritPrototype(GameStart, Scene);

GameStart.prototype.loadScene = function () {
    // Step A: loads the textures    

    // Step B: loads all the fonts
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.Fonts.loadFont(this.kFontConSys);
    
    gEngine.AudioClips.loadAudio(this.kBgClip);
};

GameStart.prototype.unloadScene = function () {

    gEngine.AudioClips.stopBackgroundAudio();
    // unload the fonts
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Fonts.unloadFont(this.kFontConSys);
    
    if(this.mState === 1){
        var nextLevel = new Level0();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mState === 2){
        var nextLevel = new Level();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mState === 3){
        var nextLevel = new Level2();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mState === 4){
        var nextLevel = new Control();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mState === 5){
        var nextLevel = new AboutUs();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
     //tep B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

GameStart.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray


    this.mTextConW = new FontRenderable("WE TOGETHER!");
    this.mTextConW.setFont(this.kFontCon72);
    this._initText(this.mTextConW, 20, 50, [0.5, 0.5, 0.5, 0.5], 9);

    this.mTextConS = new FontRenderable("Level 1");
    this.mTextConS.setFont(this.kFontCon72);
    this._initText(this.mTextConS, 40, 40, [0.5, 0.5, 0.5, 1], 4);
    
    this.mTextCon2 = new FontRenderable("Level 2");
    this.mTextCon2.setFont(this.kFontCon72);
    this._initText(this.mTextCon2, 40, 35, [0.5, 0.5, 0.5, 1], 4);
    
    this.mTextCon3 = new FontRenderable("Level 3");
    this.mTextCon3.setFont(this.kFontCon72);
    this._initText(this.mTextCon3, 40, 30, [0.5, 0.5, 0.5, 1], 4);

    this.mTextConH = new FontRenderable("How to control");
    this.mTextConH.setFont(this.kFontCon72);
    this._initText(this.mTextConH, 40, 25, [0.5, 0.5, 0.5, 1], 4);

    this.mTextConA  = new FontRenderable("About us");
    this.mTextConA.setFont(this.kFontCon72);
    this._initText(this.mTextConA, 40, 20, [0.5, 0.5, 0.5, 1], 4);
    
    this.mTextConF = new FontRenderable("TTC");
    this.mTextConF.setFont(this.kFontCon72);
    this._initText(this.mTextConF, 25, 40, [0.5, 0.5, 0.5, 1], 4);
    
    
    //</editor-fold>
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

GameStart.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameStart.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    this.mTextConW.draw(this.mCamera);
    this.mTextConS.draw(this.mCamera);
    this.mTextConH.draw(this.mCamera);
    this.mTextConA.draw(this.mCamera);
    this.mTextConF.draw(this.mCamera);
    this.mTextCon2.draw(this.mCamera);
    this.mTextCon3.draw(this.mCamera);
};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameStart.prototype.update = function () {
    
    
    if(this.mTextConF.getXform().getYPos()===this.mTextConS.getXform().getYPos())
    {
        this.mTextConS.setColor([0, 0, 0, 1]);
        
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down))
        {   this.mTextConF.getXform().setYPos(35);
            this.mTextConS.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextCon2.setColor([0, 0, 0, 1]);
        }
        //start
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            this.mState = 1;
            gEngine.GameLoop.stop();
        }     
    }
    
    else if(this.mTextConF.getXform().getYPos()===this.mTextCon2.getXform().getYPos())
    {
       // this.mTextCon2.setColor([0, 0, 0, 1]);
        
         if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
            this.mTextConF.getXform().setYPos(30);
            this.mTextCon2.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextCon3.setColor([0, 0, 0, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mTextConF.getXform().setYPos(40);
            this.mTextCon2.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConS.setColor([0, 0, 0, 1]);
        }
        //control
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            this.mState = 2;
            gEngine.GameLoop.stop();
        }
    }
    
    else if(this.mTextConF.getXform().getYPos()===this.mTextCon3.getXform().getYPos())
    {
       // this.mTextCon2.setColor([0, 0, 0, 1]);
        
         if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
            this.mTextConF.getXform().setYPos(25);
            this.mTextCon3.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConH.setColor([0, 0, 0, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mTextConF.getXform().setYPos(35);
            this.mTextCon3.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextCon2.setColor([0, 0, 0, 1]);
        }
        //control
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            this.mState = 3;
            gEngine.GameLoop.stop();
        }
    }
    
    else if(this.mTextConF.getXform().getYPos()===this.mTextConH.getXform().getYPos())
    {
         if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)){
            this.mTextConF.getXform().setYPos(20);
            this.mTextConH.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextConA.setColor([0, 0, 0, 1]);
        }
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mTextConF.getXform().setYPos(30);
            this.mTextConH.setColor([0.5, 0.5, 0.5, 1]);
            this.mTextCon3.setColor([0, 0, 0, 1]);
        }
        //control
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            this.mState = 4;
            gEngine.GameLoop.stop();
        }
    }   
    
    else if(this.mTextConF.getXform().getYPos()===this.mTextConA.getXform().getYPos())
    {
        
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)){
            this.mTextConF.getXform().setYPos(25);
            this.mTextConH.setColor([0, 0, 0, 1]);
            this.mTextConA.setColor([0.5, 0.5, 0.5, 1]);
        }
        //about us
        else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        {
            this.mState = 5;
            gEngine.GameLoop.stop();
        }
    }
};