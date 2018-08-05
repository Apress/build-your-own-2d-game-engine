/*
 * File: Level4.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var isWin = true;
var wordarr=["i","was","born","in","a","game","world","it","will","be","end","today",
            "and","destiny","made","us","met","nice","to","meet","you","and","good","bye",""];
var error=0;
function Level4() {
    this.kBg = "assets/typer.png";
    this.kLetter = "assets/letter.png";
//    this.win = "assets/Ending2.png";
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    
    this.timeCamera = null;   
    this.mMsgtime = null;

}
gEngine.Core.inheritPrototype(Level4, Scene);


Level4.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kLetter);
//    gEngine.Textures.loadTexture(this.win);
};

Level4.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kLetter);
//    gEngine.Textures.unloadTexture(this.win);
    
    if(isWin === true) {
        var nextLevel = new WinLevel("assets/Ending2.png");  // load the next level
        gEngine.Core.startScene(nextLevel);
    }else if(isWin === false) {
        var nextLevel = new LoseLevel(4);  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
//    if(error>=6)
//    {
//        var nextLevel = new LoseLevel();  // load the next level
//        gEngine.Core.startScene(nextLevel);
//    }
};

Level4.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 720, 720]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var bgR = new IllumRenderable(this.kBg,this.kBg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);
        bgR.getXform().setZPos(-1);        
    this.mBg = new GameObject(bgR);

    var letterR = new IllumRenderable(this.kLetter,this.kBg);
        letterR.getXform().setSize(90, 45);
        letterR.getXform().setPosition(50, 28);        
    this.mLetter = new GameObject(letterR);
    
    this.wordCamera = new Camera(
        vec2.fromValues(30,40),
        50,
        [243,600,222,111]
        );
    this.wordCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.timeCamera = new Camera(
       vec2.fromValues(70,40),
            20,
            [220, 500, 120, 50]
        );
    this.timeCamera.setBackgroundColor([0, 0, 0, 1]);  
    
    this.letterCamera = new Camera(
       vec2.fromValues(70,40),
            20,
            [1220, 500, 100, 50]
        );
    this.letterCamera.setBackgroundColor([0, 0, 0, 1]);  
    //Message Information
 
    this.mMsg1 = new FontRenderable(wordarr[0]);
    this.mMsg1.setColor([0.1, 0.1, 0.1, 1]);
    this.mMsg1.getXform().setPosition(10, 45);
    this.mMsg1.setTextHeight(5);
    
    this.mMsg2 = new FontRenderable(wordarr[1]);
    this.mMsg2.setColor([0.1, 0.1, 0.1, 1]);
    this.mMsg2.getXform().setPosition(10, 35);
    this.mMsg2.setTextHeight(5);
 
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([0.9, 0, 0, 1]);
    this.mMsg.getXform().setPosition(35, 45);
    this.mMsg.setTextHeight(5);
 
    this.mMsgtime = new FontRenderable("00:35");
    this.mMsgtime.setColor([1, 1, 1, 1]);
    this.mMsgtime.getXform().setPosition(65, 40);
    this.mMsgtime.setTextHeight(5);
    
    this.mMsg3 = new FontRenderable("I even prepared a letter for you");
    this.mMsg3.setColor([1, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(24, 28);
    this.mMsg3.setTextHeight(2.8);
    
    this.mMsg4 = new FontRenderable("");
    this.mMsg4.setColor([1, 1, 1, 1]);
    this.mMsg4.getXform().setPosition(24, 29);
    this.mMsg4.setTextHeight(2.2);
    
    this.mInfoe = new FontRenderable("After each word, press Enter");
    this.mInfoe.setColor([0, 1, 0, 1]);
    this.mInfoe.getXform().setPosition(24, 10);
    this.mInfoe.setTextHeight(2.5);
    
    this.mInfoe1 = new FontRenderable("Type the words on the typer");
    this.mInfoe1.setColor([0, 1, 0, 1]);
    this.mInfoe1.getXform().setPosition(24, 14);
    this.mInfoe1.setTextHeight(2.5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level4.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mInfoe.draw(this.mCamera);
    this.mInfoe1.draw(this.mCamera);
   // this.mLetter.setVisibility(false);
 
    
    this.wordCamera.setupViewProjection();
    this.mMsg1.draw(this.wordCamera);
    this.mMsg2.draw(this.wordCamera);
    this.mMsg.draw(this.wordCamera);   

    this.timeCamera.setupViewProjection();    
    this.mMsgtime.draw(this.timeCamera); 
    
    this.letterCamera.setupViewProjection();
    this.mLetter.draw(this.letterCamera); 
    
};
var count=0;
var msg="";
var counttime=0;
var time = 35;
// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
var flag=false;
Level4.prototype.update = function () {  
    //enter to start 
    counttime++;
    if(counttime%60 === 0){time=time-1;}; 
    if(time<0){
       /* time = 35;
        //this.mTimer.setZero();
        count = 0;
        msg="";
        this.mMsg1.setText(wordarr[count]);
        this.mMsg2.setText(wordarr[count+1]);*/
                    msg = "";
            count = 0;
            time=35;
            isWin = false;
            gEngine.GameLoop.stop();
    }

    if(time<10){this.mMsgtime.setText("00:0"+time);}
    else{this.mMsgtime.setText("00:"+time);}
    this.mMsg1.update(this.wordCamera);
    this.mMsg2.update(this.wordCamera);
    this.mMsg.update(this.wordCamera);   
    this.mMsgtime.update(this.timeCamera);      
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {msg += "a";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.B)) {msg += "b";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {msg += "c";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {msg += "d";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)) {msg += "e";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.F)) {msg += "f";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {msg += "g";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {msg += "h";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {msg += "i";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {msg += "j";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {msg += "k";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {msg += "l";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {msg += "m";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {msg += "n";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.O)) {msg += "o";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {msg += "p";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {msg += "q";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {msg += "r";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {msg += "s";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.T)) {msg += "t";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.U)) {msg += "u";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {msg += "v";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {msg += "w";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.X)) {msg += "x";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Y)) {msg += "y";}
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Z)) {msg += "z";}

    this.mMsg.setText(msg);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) && count<=23){
        if(wordarr[count]=== msg){
            if(count <= 22){
                count = count + 1;
                msg = "";
                this.mMsg1.setText(wordarr[count]);
                this.mMsg2.setText(wordarr[count+1]);
            }
            else  if(count === 23){
                 msg = "";
                this.mMsg1.setText(msg);
                this.mMsg2.setText(msg);
                
                this.letterCamera = new Camera(
                vec2.fromValues(50,20),
                50,
                [160, 100, 390, 230]
                );
                this.letterCamera.setBackgroundColor([0, 0, 0, 1]);  
                
                this.timeCamera = new Camera(
                vec2.fromValues(70,40),
                20,
                [220, 500, 0, 0]
                );
    this.timeCamera.setBackgroundColor([0, 0, 0, 1]);  
                flag=true;
            }
        }
        else
        {
            error=error+1;
            msg = "";
            count = 0;
            time=35;
            isWin = false;
            gEngine.GameLoop.stop();
        }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        isWin = true;
        gEngine.GameLoop.stop();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        gEngine.GameLoop.stop();
    }
};
