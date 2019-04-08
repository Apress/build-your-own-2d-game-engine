/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, SpriteAnimateRenderable,Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Help(help, levels) {  
    this.kUIButton = "assets/button.png";
    this.kMazeImage= "assets/maze_image.png";
    this.kKeys= "assets/keys.png";
    // The cameras to view the level
    this.mCamera = null;
    this.mHelp = help;
    this.mLevels = levels; 
    this.mBack = false;
    //levels
    this.mLevelSelect = null;
    this.mLightPref = "bright";
    this.mGamePref = "time";
    
}
gEngine.Core.inheritPrototype(Help, Scene);


Help.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kMazeImage);
    gEngine.Textures.loadTexture(this.kKeys);

};

Help.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kMazeImage);
    gEngine.Textures.unloadTexture(this.kKeys);

    var nextlevel = null;
    if(this.mBack){
        nextlevel = new Main();
    }
    else if (this.mLevelSelect !== null)
    {
        if (this.mLevelSelect === 1)
            nextlevel = new Level(1, 'testlevel2', this.mLightPref, this.mGamePref);
        if (this.mLevelSelect === 2)
            nextlevel = new Level(2, 'playtest_00', this.mLightPref, this.mGamePref);
        else if (this.mLevelSelect === 3)
            nextlevel = new Level(3, 'release_00', this.mLightPref, this.mGamePref);
    }
    gEngine.Core.startScene(nextlevel);
};

Help.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40),   // position of the camera
        100,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.61, 0.35, 0.13, 1.0]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //background
    this.bg = new TextureRenderable(this.kMazeImage);
    this.bg.getXform().setSize(200,160);
    this.bg.getXform().setPosition(50,40);
    
    this.UIButton1 = new UIButton(this.kUIButton,this.main,this,[100,50],[120,50],"BACK",3,[1,1,1,1],[0,0,0,1]);  
    
    //HELP
    this.mKeys = new SpriteRenderable(this.kKeys);
    this.mKeys.setColor([1, 1, 1, 0]);
    this.mKeys.getXform().setPosition(14, 35);
    this.mKeys.getXform().setSize(20, 25);
    this.mKeys.setElementPixelPositions(0, 256, 0, 256);  
    this.mMessage = new UIText("Help the llama get to his destination",[420,530],3.5,1,0,[1,1,1,1]);
    this.mMessage2 = new UIText("before time runs or he is caught by the Sprite",[400,480],3.5,1,0,[1,1,1,1]); 
    this.mArrows = new UIText("Move llama with Up/Down/Left/Right keys",[500,300],2.5,1,0,[1,1,1,1]);
    this.mSpace = new UIText("Space bar lifts levers",[500,250],2.5,1,0,[1,1,1,1]);
    
    //Levels
    this.UIButtonLevel1 = new UIButton(this.kUIButton,this.level1,this,[280,400],[160,70],"LEVEL 1",3,[1,1,1,1],[0,0,0,1]);  
    this.UIButtonLevel2 = new UIButton(this.kUIButton,this.level2,this,[280,300],[160,70],"LEVEL 2",3,[1,1,1,1],[0,0,0,1]);  
    this.UIButtonLevel3 = new UIButton(this.kUIButton,this.level3,this,[280,200],[160,70],"LEVEL 3",3,[1,1,1,1],[0,0,0,1]);  
    //add more for extra levels 
    this.UIDDButtonGame = new UIDropDown([500,370],"GAME TYPE",3,[0,0,0,1],[1,1,1,1]);
    this.UIDDButtonGame.addToSet("TIME",[0,0,0,1],[1,1,1,1],this.setToTime,this,this.mCamera);
    this.UIDDButtonGame.addToSet("CHASE",[0,0,0,1],[1,1,1,1],this.setToChase,this,this.mCamera);
    //light preference
    this.UIDDButtonLight = new UIDropDown([500,290],"LIGHT TYPE",3,[0,0,0,1],[1,1,1,1]);
    this.UIDDButtonLight.addToSet("BRIGHT",[0,0,0,1],[1,1,1,1],this.setToBright,this,this.mCamera);
    this.UIDDButtonLight.addToSet("DIM",[0,0,0,1],[1,1,1,1],this.setToDim,this,this.mCamera);
    this.UIDDButtonLight.addToSet("DARK",[0,0,0,1],[1,1,1,1],this.setToDark,this,this.mCamera);
 
};

Help.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);      //draw floor

};
Help.prototype.drawCamera = function(camera) {
    //Setup the camera
    camera.setupViewProjection();
    this.bg.draw(camera);
    this.UIButton1.draw(camera);
    if (this.mHelp) {
        this.mMessage.draw(camera);
        this.mMessage2.draw(camera);
        this.mKeys.draw(camera);
        this.mArrows.draw(camera);
        this.mSpace.draw(camera);
    }
    else if (this.mLevels)
    {
        this.UIButtonLevel1.draw(camera);
        this.UIButtonLevel2.draw(camera);
        this.UIButtonLevel3.draw(camera);
        this.UIDDButtonGame.draw(camera);
        this.UIDDButtonLight.draw(camera);
    }
};

Help.prototype.update = function () {
    this.UIButton1.update();
    this.UIButtonLevel1.update();
    this.UIButtonLevel2.update();
    this.UIButtonLevel3.update();
    this.UIDDButtonGame.update(this.mCamera);
    this.UIDDButtonLight.update(this.mCamera);
    if (this.mBack || this.mLevelSelect !== null)
        gEngine.GameLoop.stop();

};
//go back to main menu
Help.prototype.main = function () {
    this.mBack = true;
};

Help.prototype.setToTime = function () {
    this.mGamePref = "time";
};
Help.prototype.setToChase = function () {
    this.mGamePref = "chase";
};
Help.prototype.setToBright = function () {
    this.mLightPref = "bright";
};
Help.prototype.setToDim = function () {
    this.mLightPref = "dim";
};
Help.prototype.setToDark = function () {
    this.mLightPref = "dark";
};
Help.prototype.level1 = function () {
    this.mLevelSelect = 1;
};
Help.prototype.level2 = function () {
    this.mLevelSelect = 2;
};
Help.prototype.level3 = function () {
    this.mLevelSelect = 3;
};
