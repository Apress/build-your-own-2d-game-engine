/*
 * File: Level7.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var isWin;
var blockIndex;
var pX;
var pY;

function Level7() {
    isWin=true;
    this.kBg = "assets/computer1.png";
    this.kBlack = "assets/blockblack.png";
    this.kWhite = "assets/blockwhite.png";
    // The camera to view the scene
    this.mCamera = null;
    this.mAllBlocks = null;
    this.mMsg = null;    
}
gEngine.Core.inheritPrototype(Level7, Scene);


Level7.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBlack);
    gEngine.Textures.loadTexture(this.kWhite);
};

Level7.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBlack);
    gEngine.Textures.unloadTexture(this.kWhite);
    
    if(isWin === true) {
        var nextLevel = new Level6();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }else if(isWin === false) {
        var nextLevel = new Level7();  // load the next level
        gEngine.Core.startScene(nextLevel);
    }
};

Level7.prototype.initialize = function () {
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
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 45);
    this.mMsg.setTextHeight(5);
    
    this.mAllBlocks = new GameObjectSet();
    
    var ob;
    var x1=35;
    var y1=50;
    var compen = 8;
    ob = new Colorblock(x1, y1);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+1*compen,y1);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+2*compen,y1);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+3*compen,y1);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+4*compen,y1);
    this.mAllBlocks.addToSet(ob);
    
    ob = new Colorblock(x1, y1+1*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+1*compen,y1+1*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+2*compen,y1+1*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+3*compen,y1+1*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+4*compen,y1+1*compen);
    this.mAllBlocks.addToSet(ob);
    
    ob = new Colorblock(x1, y1+2*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+1*compen,y1+2*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+2*compen,y1+2*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+3*compen,y1+2*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+4*compen,y1+2*compen);
    this.mAllBlocks.addToSet(ob);
    
    ob = new Colorblock(x1, y1+3*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+1*compen,y1+3*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+2*compen,y1+3*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+3*compen,y1+3*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+4*compen,y1+3*compen);
    this.mAllBlocks.addToSet(ob);
    
    ob = new Colorblock(x1, y1+4*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+1*compen,y1+4*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+2*compen,y1+4*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+3*compen,y1+4*compen);
    this.mAllBlocks.addToSet(ob);
    ob = new Colorblock(x1+4*compen,y1+4*compen);
    this.mAllBlocks.addToSet(ob);
    
    this.mMsg3 = new FontRenderable("There used to be millions of lights");
    this.mMsg3.setColor([1, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(24, 28);
    this.mMsg3.setTextHeight(2.8);
    
    this.mMsg4 = new FontRenderable("They all gone now");
    this.mMsg4.setColor([1, 1, 1, 1]);
    this.mMsg4.getXform().setPosition(24, 24);
    this.mMsg4.setTextHeight(2.8);
    
    this.mInfoe = new FontRenderable("Press R to reset");
    this.mInfoe.setColor([0, 1, 0, 1]);
    this.mInfoe.getXform().setPosition(24, 10);
    this.mInfoe.setTextHeight(2.5);
    
    this.mInfoe2 = new FontRenderable("Use mouse to close the lights");
    this.mInfoe2.setColor([0, 1, 0, 1]);
    this.mInfoe2.getXform().setPosition(24, 13);
    this.mInfoe2.setTextHeight(2.5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Level7.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mMsg3.draw(this.mCamera);
    this.mMsg4.draw(this.mCamera);
    this.mInfoe.draw(this.mCamera);
    this.mInfoe2.draw(this.mCamera);
    this.mAllBlocks.draw(this.mCamera);
};
var msg="";
// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Level7.prototype.update = function () {  
    this.mMsg.update(this.mCamera); 
    
    this.mAllBlocks.update(this.mCamera);    
//    this.BlockMouse();
    pX = gEngine.Input.getMousePosX();
    pY = gEngine.Input.getMousePosY();
    
//    if((color0.toString()=== "1,1,0,1")&&(color1.toString()=== "1,1,0,1")&&(color2.toString()=== "1,1,0,1")&&(color3.toString()=== "1,1,0,1")&&(color4.toString()=== "1,1,0,1")
//        &&(color5.toString()=== "1,1,0,1")&&(color6.toString()=== "1,1,0,1")&&(color7.toString()=== "1,1,0,1")&&(color8.toString()=== "1,1,0,1")&&(color9.toString()=== "1,1,0,1")
//        &&(color10.toString()=== "1,1,0,1")&&(color11.toString()=== "1,1,0,1")&&(color12.toString()=== "1,1,0,1")&&(color13.toString()=== "1,1,0,1")&&(color14.toString()=== "1,1,0,1")
//        &&(color15.toString()=== "1,1,0,1")&&(color16.toString()=== "1,1,0,1")&&(color17.toString()=== "1,1,0,1")&&(color18.toString()=== "1,1,0,1")&&(color19.toString()=== "1,1,0,1")
//        &&(color20.toString()=== "1,1,0,1")&&(color21.toString()=== "1,1,0,1")&&(color22.toString()=== "1,1,0,1")&&(color23.toString()=== "1,1,0,1")&&(color24.toString()=== "1,1,0,1"))
//        {
//            isWin=true;
//            gEngine.GameLoop.stop();
//        }
    this.BlockMouse();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)){
        isWin=false;
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)){
        isWin=true;
        gEngine.GameLoop.stop();
    }
    
    if((color0.toString()=== "1,1,0,1")&&(color1.toString()=== "1,1,0,1")&&(color2.toString()=== "1,1,0,1")&&(color3.toString()=== "1,1,0,1")&&(color4.toString()=== "1,1,0,1")
        &&(color5.toString()=== "1,1,0,1")&&(color6.toString()=== "1,1,0,1")&&(color7.toString()=== "1,1,0,1")&&(color8.toString()=== "1,1,0,1")&&(color9.toString()=== "1,1,0,1")
        &&(color10.toString()=== "1,1,0,1")&&(color11.toString()=== "1,1,0,1")&&(color12.toString()=== "1,1,0,1")&&(color13.toString()=== "1,1,0,1")&&(color14.toString()=== "1,1,0,1")
        &&(color15.toString()=== "1,1,0,1")&&(color16.toString()=== "1,1,0,1")&&(color17.toString()=== "1,1,0,1")&&(color18.toString()=== "1,1,0,1")&&(color19.toString()=== "1,1,0,1")
        &&(color20.toString()=== "1,1,0,1")&&(color21.toString()=== "1,1,0,1")&&(color22.toString()=== "1,1,0,1")&&(color23.toString()=== "1,1,0,1")&&(color24.toString()=== "1,1,0,1"))
        {
            isWin=true;
            gEngine.GameLoop.stop();
        }
    
};


