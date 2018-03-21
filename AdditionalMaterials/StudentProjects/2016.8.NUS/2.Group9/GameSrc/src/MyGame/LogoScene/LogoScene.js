/* global gEngine, vec2, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LogoScene() {

    this.LogoFilePath = "assets/Logo.png";
    this.incAlpha = 0.01;
    this.logo = null;

    var canvas=document.getElementById("GLCanvas");           
    this.WinSize = [canvas.width,canvas.height];
    this.mCamera = null;
}

gEngine.Core.inheritPrototype(LogoScene, Scene);


LogoScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.LogoFilePath);
};

LogoScene.prototype.unloadScene = function () {
    var nextLevel = new ChooseScene(); 
    gEngine.Core.startScene(nextLevel);
};

LogoScene.prototype.initialize = function () {
   
   this.mCamera = new Camera( 
           vec2.fromValues(0, 0),   
           this.WinSize[0]/2,                       
           [0, 0, this.WinSize[0], this.WinSize[1]],
           2
    );
    this.mCamera.setBackgroundColor([0,0,0,1]);

    this.logo = new SpriteRenderable(this.LogoFilePath);
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.LogoFilePath);
    this.logo.getXform().setPosition(0, 0);
    this.logo.setColor([1,1,1,0]);
    this.logo.getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
   
};

LogoScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1,1,1,1]); // clear to light gray
 
    this.mCamera.setupViewProjection();
    this.logo.draw(this.mCamera);
   
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LogoScene.prototype.update = function () {
    this.mCamera.setViewport([0, 0, this.WinSize[0], this.WinSize[1]]);
    var alpha = this.logo.getColor()[3];
    
    alpha += this.incAlpha;
    if(alpha > 1.5){
        this.incAlpha*=-1;
    } else if (alpha < -0.5){
        gEngine.GameLoop.stop();
    }
     
    this.logo.setColor([1,1,1,alpha]);
};