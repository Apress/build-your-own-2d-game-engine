/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var objectChoose = "";
var leftTime;
var isLevelThreeWin;
var hf;
var reactOne;
var reactTwo;

function Level3() {
    
    hf = 0;
    leftTime = 10;
    isLevelThreeWin = true;
    reactOne = false;
    reactTwo = false;
    
    this.kMinion = "assets/reactant_minion.png";
    this.kMinionDiamond = "assets/diamond_final.png";
    this.kMinionHand = "assets/hand.png";
    this.kBg = "assets/bg_3.png";

    // The camera to view the scene
    this.mCamera = null;
//    this.mHeroCam = null;
//    this.mBrainCam = null;
    this.mBg = null;

    this.mMsg = null;

    // the hero and the support objects
    this.mWater = null;
    this.mFire = null;
    this.mWind = null;
    this.mDiamond = null;
    this.mCarbon = null;
    this.mDiamondBefore = null;
    this.mAlcohol = null;
    this.mHighTemp = null;
    this.mCatalyst = null;
    this.mDiamondFinal = null;
    this.mHand = null;

}
gEngine.Core.inheritPrototype(Level3, Scene);

Level3.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinion);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kMinionDiamond);
    gEngine.Textures.loadTexture(this.kMinionHand);
};

Level3.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kMinion);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kMinionDiamond);
    gEngine.Textures.unloadTexture(this.kMinionHand);
    
//    if(isLevelThreeWin === true && isTouch === true) {
//        var nextLevel = new WinLevel("assets/win-01.png");
//        gEngine.Core.startScene(nextLevel);
//    }else if(isLevelThreeWin === false) {
//        var nextLevel = new LoseLevel(3);
//        gEngine.Core.startScene(nextLevel);
//    }else if(isTouch === false && isLevelThreeWin === true) {
//        var nextLevel = new Level4();
//        gEngine.Core.startScene(nextLevel);
//    }
    if(isLevelThreeWin === true) {
        var nextLevel = new Level4();
        gEngine.Core.startScene(nextLevel);
    }else if(isLevelThreeWin === false) {
        var nextLevel = new LoseLevel(3);
        gEngine.Core.startScene(nextLevel);
    }
    
};

Level3.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                       // width of camera
        [0, 0, 720, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    // Large background image
    var bgR = new IllumRenderable(this.kBg,this.kBg);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 40);
        bgR.getXform().setZPos(-1);
        
    this.mBg = new GameObject(bgR);
    
    // Objects in the scene
    this.mWater = new Reactant(this.kMinion, 10, 80, 14, 14,341,682,682,1024);
    this.mFire = new Reactant(this.kMinion, 33, 80, 14, 14,0,341,682,1024);
    this.mWind = new Reactant(this.kMinion, -10, -10, 14, 14,682,1024,341,682);
    this.mDiamond = new Reactant(this.kMinion, -10, -10, 14,14,682,1024,0,341);
    this.mAlcohol = new Reactant(this.kMinion,79,80,14,14,341,682,341,682);
    this.mCatalyst = new Reactant(this.kMinion,56,80,14,14,0,341,0,341);
    this.mHighTemp = new Reactant(this.kMinion,-10,-10,14,14,0,341,341,682);
    this.mCarbon = new Reactant(this.kMinion,-10,-10,14,14,682,1024,682,1024);
    this.mDiamondBefore = new Reactant(this.kMinion,-10,-10,14,14,341,682,0,341);
    this.mDiamondFinal = new Reactant(this.kMinionDiamond,15,-15,14,14,0,512,0,512);
    this.mHand = new Reactant(this.kMinionHand,30,-9,50,50,0,512,0,512);
    
    //Message Information
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(24, 33);
    this.mMsg.setTextHeight(2.3);
    
    this.mMsg1 = new FontRenderable("");
    this.mMsg1.setColor([0, 1, 1, 1]);
    this.mMsg1.getXform().setPosition(24, 29);
    this.mMsg1.setTextHeight(2.3);
    
    this.mMsg2 = new FontRenderable("");
    this.mMsg2.setColor([0, 1, 1, 1]);
    this.mMsg2.getXform().setPosition(24, 25);
    this.mMsg2.setTextHeight(2.3);
    
    this.mMsg3 = new FontRenderable("");
    this.mMsg3.setColor([1, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(24, 18);
    this.mMsg3.setTextHeight(2.3);
    
    this.mMsg4 = new FontRenderable("");
    this.mMsg4.setColor([1, 1, 1, 1]);
    this.mMsg4.getXform().setPosition(24.3, 14);
    this.mMsg4.setTextHeight(2.2);
    
    this.mMsg5 = new FontRenderable("");
    this.mMsg5.setColor([1, 1, 1, 1]);
    this.mMsg5.getXform().setPosition(24.6, 10);
    this.mMsg5.setTextHeight(2.1);
    
    this.mMsgn = new FontRenderable("");
    this.mMsgn.setColor([0, 0, 0, 1]);
    this.mMsgn.getXform().setPosition(1, 87);
    this.mMsgn.setTextHeight(2.1);
    
    this.mInfo = new FontRenderable("");
    this.mInfo.setColor([0, 1, 0, 1]);
    this.mInfo.getXform().setPosition(24, 28);
    this.mInfo.setTextHeight(2);
    
    this.mInfo2 = new FontRenderable("");
    this.mInfo2.setColor([0, 1, 0, 1]);
    this.mInfo2.getXform().setPosition(24, 20);
    this.mInfo2.setTextHeight(2);
    
    this.mInfoe = new FontRenderable("Next: Press H");
    this.mInfoe.setColor([0, 1, 0, 1]);
    this.mInfoe.getXform().setPosition(63, 10);
    this.mInfoe.setTextHeight(2);
    
    this.mInfo3 = new FontRenderable("Next: Press H");
    this.mInfo3.setColor([0, 1, 0, 1]);
    this.mInfo3.getXform().setPosition(30, 30);
    this.mInfo3.setTextHeight(2);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level3.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Draw with all three cameras
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mWater.draw(this.mCamera);
    this.mFire.draw(this.mCamera);
    this.mWind.draw(this.mCamera);
    this.mDiamond.draw(this.mCamera);
    this.mAlcohol.draw(this.mCamera);
    this.mCatalyst.draw(this.mCamera);
    this.mHighTemp.draw(this.mCamera);
    this.mCarbon.draw(this.mCamera);
    this.mDiamondBefore.draw(this.mCamera);
    this.mDiamondFinal.draw(this.mCamera);
    this.mHand.draw(this.mCamera);   // only draw status in the main camera
    
    this.mMsg.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg4.draw(this.mCamera);
    this.mMsg5.draw(this.mCamera);
    this.mMsgn.draw(this.mCamera);
    this.mInfo.draw(this.mCamera);
    this.mInfo2.draw(this.mCamera);
    this.mInfoe.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level3.prototype.update = function () {
    if(this.mCamera.mouseWCX() >= this.mWater.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mWater.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mWater.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mWater.getXform().getYPos() - 1.5) {
        objectChoose = "water";
    }else if(this.mCamera.mouseWCX() >= this.mFire.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mFire.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mFire.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mFire.getXform().getYPos() - 1.5) {
        objectChoose = "fire";
    }else if(this.mCamera.mouseWCX() >= this.mWind.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mWind.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mWind.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mWind.getXform().getYPos() - 1.5) {
        objectChoose = "wind";
    }else if(this.mCamera.mouseWCX() >= this.mDiamond.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mDiamond.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mDiamond.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mDiamond.getXform().getYPos() - 1.5) {
        objectChoose = "diamond";
    }else if(this.mCamera.mouseWCX() >= this.mDiamondBefore.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mDiamondBefore.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mDiamondBefore.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mDiamondBefore.getXform().getYPos() - 1.5) {
        objectChoose = "diamondbefore";
    }else if(this.mCamera.mouseWCX() >= this.mCarbon.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mCarbon.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mCarbon.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mCarbon.getXform().getYPos() - 1.5) {
        objectChoose = "carbon";
    }else if(this.mCamera.mouseWCX() >= this.mAlcohol.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mAlcohol.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mAlcohol.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mAlcohol.getXform().getYPos() - 1.5) {
        objectChoose = "alcohol";
    }else if(this.mCamera.mouseWCX() >= this.mCatalyst.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mCatalyst.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mCatalyst.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mCatalyst.getXform().getYPos() - 1.5) {
        objectChoose = "catalyst";
    }else if(this.mCamera.mouseWCX() >= this.mHighTemp.getXform().getXPos() - 1.5 && this.mCamera.mouseWCX() <= this.mHighTemp.getXform().getXPos() + 1.5 
            && this.mCamera.mouseWCY() <= this.mHighTemp.getXform().getYPos() + 1.5 && this.mCamera.mouseWCY() >= this.mHighTemp.getXform().getYPos() - 1.5) {
        objectChoose = "hightemp";
    }
    
    if(gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left) && this.mDiamond.getXform().getXPos() === 79 && this.mDiamond.getXform().getYPos() === 67) {
        if(this.mCamera.mouseWCX() >= this.mHand.getXform().getXPos() -5 && this.mCamera.mouseWCX() <= this.mHand.getXform().getXPos() + 5 
            && this.mCamera.mouseWCY() <= this.mHand.getXform().getYPos() + 5 && this.mCamera.mouseWCY() >= this.mHand.getXform().getYPos() - 5) {
            this.mHand.getXform().setPosition(this.mCamera.mouseWCX(),-8);
        }
    }

    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
        if(objectChoose === "water") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mWater.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mWater.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mWater.getXform().getXPos() !== 21 || this.mWater.getXform().getXPos() !== 50) && this.mWater.getXform().getYPos() !== 67){
                this.mWater.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "fire") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            &&reactOne === false) {
                this.mFire.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mFire.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mFire.getXform().getXPos() !== 21 || this.mFire.getXform().getXPos() !== 50) && this.mFire.getXform().getYPos() !== 67){
                this.mFire.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "wind") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mWind.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mWind.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mWind.getXform().getXPos() !== 21 || this.mWind.getXform().getXPos() !== 50) && this.mWind.getXform().getYPos() !== 67){
                this.mWind.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "diamond") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mDiamond.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mDiamond.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mDiamond.getXform().getXPos() !== 21 || this.mDiamond.getXform().getXPos() !== 50) && this.mDiamond.getXform().getYPos() !== 67){
                this.mDiamond.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "diamondbefore") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 615 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mDiamondBefore.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mDiamondBefore.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mDiamondBefore.getXform().getXPos() !== 21 || this.mDiamondBefore.getXform().getXPos() !== 50) && this.mDiamondBefore.getXform().getYPos() !== 67){
                this.mDiamondBefore.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "catalyst") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mCatalyst.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mCatalyst.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mCatalyst.getXform().getXPos() !== 21 || this.mCatalyst.getXform().getXPos() !== 50) && this.mCatalyst.getXform().getYPos() !== 67){
                this.mCatalyst.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "hightemp") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mHighTemp.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mHighTemp.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mHighTemp.getXform().getXPos() !== 21 || this.mHighTemp.getXform().getXPos() !== 50) && this.mHighTemp.getXform().getYPos() !== 67){
                this.mHighTemp.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "carbon") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mCarbon.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mCarbon.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mCarbon.getXform().getXPos() !== 21 || this.mCarbon.getXform().getXPos() !== 50) && this.mCarbon.getXform().getYPos() !== 67){
                this.mCarbon.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
        if(objectChoose === "alcohol") {
            if(gEngine.Input.getMousePosX() >= 85 && gEngine.Input.getMousePosX() <= 215 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactOne === false) {
                this.mAlcohol.getXform().setPosition(21,67);
                reactOne = true;
                objectChoose = "";
            }else if(gEngine.Input.getMousePosX() >= 295 && gEngine.Input.getMousePosX() <= 425 
            && gEngine.Input.getMousePosY() <= 615 && gEngine.Input.getMousePosY() >= 495
            && reactTwo === false) {
                this.mAlcohol.getXform().setPosition(50,67);
                reactTwo = true;
                objectChoose = "";
            }else if((this.mAlcohol.getXform().getXPos() !== 21 || this.mAlcohol.getXform().getXPos() !== 50) && this.mAlcohol.getXform().getYPos() !== 67){
                this.mAlcohol.getXform().setPosition(this.mCamera.mouseWCX(),this.mCamera.mouseWCY());
            }
        }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.mInfo.setText("");
        this.mInfo2.setText("");
        this.mWater.getXform().setPosition(10,80);
        this.mFire.getXform().setPosition(33,80);
        this.mAlcohol.getXform().setPosition(56,80);
        this.mCatalyst.getXform().setPosition(79,80);
        this.mDiamondBefore.getXform().setPosition(-10,-10);
        
        reactOne = false;
        reactTwo = false;
        
        if(this.mDiamond.kDelta === 3) {
            this.mDiamond.getXform().setPosition(79,67);
        }else{
            this.mDiamond.getXform().setPosition(-10,-10);
        }
        
        if(this.mCarbon.kDelta === 3) {
            this.mCarbon.getXform().setPosition(33,45);
        }else{
            this.mCarbon.getXform().setPosition(-10,-10);
        }
        
        if(this.mHighTemp.kDelta === 3) {
            this.mHighTemp.getXform().setPosition(56,45);
        }else{
            this.mHighTemp.getXform().setPosition(-10,-10);
        }
        
        if(this.mWind.kDelta === 3) {
            this.mWind.getXform().setPosition(79,45);
        }else{
            this.mWind.getXform().setPosition(-10,-10);
        }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Y) && leftTime > 0) {
        leftTime-=1;
        //Water+Fire=Wind
        if(this.mWater.getXform().getXPos() > 10 && this.mWater.getXform().getXPos() <30 
                && this.mWater.getXform().getYPos() > 55 && this.mWater.getXform().getYPos() < 75) {
            if(this.mFire.getXform().getXPos() > 40 && this.mFire.getXform().getXPos() <60 
                && this.mFire.getXform().getYPos() > 55 && this.mFire.getXform().getYPos() < 75) {
                    this.mWind.getXform().setPosition(79,67);
                    this.mWind.kDelta = 3;
            }else {
                this.mDiamondBefore.getXform().setPosition(79,67);
                this.mDiamondBefore.kDelta = 3;
            }
        }else if(this.mFire.getXform().getXPos() > 10 && this.mFire.getXform().getXPos() <30 
                && this.mFire.getXform().getYPos() > 55 && this.mFire.getXform().getYPos() < 75) {
            if(this.mWater.getXform().getXPos() > 40 && this.mWater.getXform().getXPos() <60 
                && this.mWater.getXform().getYPos() > 55 && this.mWater.getXform().getYPos() < 75) {
                    this.mWind.getXform().setPosition(79,67);
                    this.mWind.kDelta = 3;
            }else if(this.mWind.getXform().getXPos() > 40 && this.mWind.getXform().getXPos() <60 
                && this.mWind.getXform().getYPos() > 55 && this.mWind.getXform().getYPos() < 75) {
                    this.mHighTemp.getXform().setPosition(79,67);
                    this.mHighTemp.kDelta = 3;
            }else {
                this.mDiamondBefore.getXform().setPosition(79,67);
                this.mDiamondBefore.kDelta = 3;
            }
        }else if(this.mWind.getXform().getXPos() > 10 && this.mWind.getXform().getXPos() <30 //Fire+Wind=HighTemp
                && this.mWind.getXform().getYPos() > 55 && this.mWind.getXform().getYPos() < 75) {
            if(this.mFire.getXform().getXPos() > 40 && this.mFire.getXform().getXPos() <60 
                && this.mFire.getXform().getYPos() > 55 && this.mFire.getXform().getYPos() < 75) {
                    this.mHighTemp.getXform().setPosition(79,67);
                    this.mHighTemp.kDelta = 3;
            }else {
                this.mDiamondBefore.getXform().setPosition(79,67);
                this.mDiamondBefore.kDelta = 3;
            }
        }else if(this.mCatalyst.getXform().getXPos() > 10 && this.mCatalyst.getXform().getXPos() <30  //Catalyst+HighTemp=Carbon
                && this.mCatalyst.getXform().getYPos() > 55 && this.mCatalyst.getXform().getYPos() < 75) {
            if(this.mHighTemp.getXform().getXPos() > 40 && this.mHighTemp.getXform().getXPos() <60 
                && this.mHighTemp.getXform().getYPos() > 55 && this.mHighTemp.getXform().getYPos() < 75) {
                    this.mCarbon.getXform().setPosition(79,67);
                    this.mCarbon.kDelta = 3;
            }else {
                this.mDiamondBefore.getXform().setPosition(79,67);
                this.mDiamondBefore.kDelta = 3;
            }   
        }else if(this.mHighTemp.getXform().getXPos() > 10 && this.mHighTemp.getXform().getXPos() <30 
                && this.mHighTemp.getXform().getYPos() > 55 && this.mHighTemp.getXform().getYPos() < 75) {
            if(this.mCatalyst.getXform().getXPos() > 40 && this.mCatalyst.getXform().getXPos() <60 
                && this.mCatalyst.getXform().getYPos() > 55 && this.mCatalyst.getXform().getYPos() < 75) {
                    this.mCarbon.getXform().setPosition(79,67);
                    this.mCarbon.kDelta = 3;
            }else if(this.mCarbon.getXform().getXPos() > 40 && this.mCarbon.getXform().getXPos() <60 
                && this.mCarbon.getXform().getYPos() > 55 && this.mCarbon.getXform().getYPos() < 75) {
                    this.mDiamond.getXform().setPosition(79,67);
                    this.mDiamond.kDelta = 3;
            }else {
                this.mDiamondBefore.getXform().setPosition(79,67);
                this.mDiamondBefore.kDelta = 3;
            }
        }else if(this.mCarbon.getXform().getXPos() > 10 && this.mCarbon.getXform().getXPos() <30   //Carbon+HighTemp=Diamond
                && this.mCarbon.getXform().getYPos() > 55 && this.mCarbon.getXform().getYPos() < 75) {
            if(this.mHighTemp.getXform().getXPos() > 40 && this.mHighTemp.getXform().getXPos() <60 
                && this.mHighTemp.getXform().getYPos() > 55 && this.mHighTemp.getXform().getYPos() < 75) {
                    this.mDiamond.getXform().setPosition(79,67);
                    this.mDiamond.kDelta = 3;
            }else {
                this.mDiamondBefore.getXform().setPosition(79,67);
                this.mDiamondBefore.kDelta = 3;
            }
        }else {
            this.mDiamondBefore.getXform().setPosition(79,67);
            this.mDiamondBefore.kDelta = 3;
        }
    }
    
    if(this.mDiamond.getXform().getXPos()===79 && this.mDiamond.getXform().getYPos()===67) {
        objectChoose = "";
            //this.mInfo.setTextHeight(0);
            //this.mInfo2.setTextHeight(0);
            //this.mInfoe.setText("Use Mouse to move her left hand");
            this.mInfoe.getXform().setPosition(30,10);
            this.mInfoe.setTextHeight(3);
            isLevelThreeWin = true;
            this.mInfo.setText("Do you want to touch the Diamond?");
            this.mInfo2.setText("U(Ending1)      N(Eastern Egg)");
            
        if(this.mDiamondFinal.getXform().getYPos() < 5) {
            this.mDiamondFinal.getXform().incYPosBy(0.5);
            
        }
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.U)){//this.mInfo2.getText().toString() === "U(Ending1)      N(Eastern Egg)") {
//                isLevelThreeWin = true;
                gEngine.GameLoop.stop();
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.N) && this.mDiamond.getXform().getXPos()===79 && this.mDiamond.getXform().getYPos()===67) {
//            isLevelThreeWin = true;
            gEngine.GameLoop.stop();
    }
    
    if(leftTime === 0) {
        isLevelThreeWin = false;
        gEngine.GameLoop.stop();
    }

    var msg = "";
    msg += "Chances left: "+leftTime + "  "+objectChoose ;//leftTime + " " + objectChoose;
    this.mMsgn.setText(msg);
    this.mMsg.setText("I prepared a surprising gift, a diamond");
     if(gEngine.Input.isKeyClicked(gEngine.Input.keys.R)){hf+=1;}
            if(hf===0)
            {
                
            this.mInfo.setText("Use Mouse to move 2 elements into the box");
            this.mInfo2.setText("Press Y to confirm and R to remove elements");
            this.mInfoe.getXform().setPosition(30,10);
            this.mInfoe.setText("You only have 10 chances!");}
//            this.mInfo.setText("Do you want to touch the Diamond?");
//            this.mInfo2.setText("Y         N");
//            this.mInfoe.setTextHeight(0);
};