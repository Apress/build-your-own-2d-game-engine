/* File: 		CreditsScreen.js
 * Author:      	Ryu Muthui, Chad Dugie
 * Last Date Modified: 	12/15/2015
 * Description:		Creates and initializes the Credit Screen */
"use strict";

function CreditsScreen() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
    this.mBG = null;
    this.mCredits = null;
    this.kSpeed = 3.0;
    this.mRepeat = 180;
    this.mRepeatCounter = 0;
    this.kCreditsScreen = "assets/Screens/CREDITS_SCREEN.png";
    this.kCreditsScreenBGM = "assets/Audio/Music/CreditsScreen_BGM.mp3";
}
gEngine.Core.inheritPrototype(CreditsScreen, Scene);

CreditsScreen.prototype.initialize = function () {
    
    this.mCamera = new Camera(          // Set up the camera
        vec2.fromValues(500, 300),      // position of the camera
        1000,                           // width of camera
        [0, 0, 1000, 600]               // viewport (orgX, orgY, width, height)
    );   
    this.mCamera.setBackgroundColor([0.5, 0.5, 0.9, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(4); 
    
    this.mCredits = new GameObject(new TextureRenderable(this.kCreditsScreen));
    var creditsXform = this.mCredits.getXform();
    creditsXform.setSize(this.mCamera.getWCWidth(), this.mCamera.getWCHeight() * 4);
    creditsXform.setPosition(this.mCamera.getWCWidth() / 2, 
        -((creditsXform.getHeight() / 2) - this.mCamera.getWCHeight()));

    this.mMsg = new FontRenderable("Credits Screen Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.setTextHeight(30);
    this.mMsg.getXform().setPosition(725, 30);
   
    // play credits screen bgm
    gEngine.AudioClips.playBackgroundAudio(this.kCreditsScreenBGM);
};

CreditsScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kCreditsScreen);
    gEngine.AudioClips.loadAudio(this.kCreditsScreenBGM);
};

CreditsScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kCreditsScreen);
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCreditsScreenBGM);
    var nextScreen = new TitleScreen("TitleScreen");  // next screen to be loaded
    gEngine.Core.startScene(nextScreen);
};

CreditsScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.0, 0.0, 0.0, 1.0]); // clear to black
    this.mCamera.setupViewProjection();
    this.mCredits.draw(this.mCamera);
    this.mMsg.setText("[Enter] to Exit");
    this.mMsg.draw(this.mCamera);
};

CreditsScreen.prototype.update = function () {
    var creditsXform = this.mCredits.getXform();
    
    if (this.mRepeatCounter >= this.mRepeat) {
        if (creditsXform.getYPos() >= creditsXform.getHeight() / 2) {
            creditsXform.setYPos(-((creditsXform.getHeight() / 2) - 
            this.mCamera.getWCHeight()));
        }else {
            creditsXform.incYPosBy(this.kSpeed);
        }
        this.mRepeatCounter = 0;
    }
    
    if ((creditsXform.getYPos() < creditsXform.getHeight() / 2 )&& 
         (creditsXform.getYPos() > -((creditsXform.getHeight() / 2) -
         this.mCamera.getWCHeight()))){
        creditsXform.incYPosBy(this.kSpeed);
    }else{
        this.mRepeatCounter++;
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){gEngine.GameLoop.stop();}
};