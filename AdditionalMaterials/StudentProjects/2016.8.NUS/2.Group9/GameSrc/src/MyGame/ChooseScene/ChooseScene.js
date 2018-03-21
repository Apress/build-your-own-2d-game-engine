/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, Scene, vec2 */

function ChooseScene (){
    this.GameNamePath = "assets/GameName.png";
    this.StartBtnPath = "assets/startbtndown.png";
    this.editorbtnPath = "assets/editorbtn.png";
    var canvas=document.getElementById("GLCanvas");           
    this.WinSize = [canvas.width,canvas.height];
    this.mCamera = null;
    this.moveCamera = null;
    this.universeLayer = null;
    this.GameName = null;
    this.StartBtn = null;
    this.AboutBtn = null;
    this.chooseSize = 60;
    this.unChooseSize = 45;
    this.Choose = 1;
}

gEngine.Core.inheritPrototype(ChooseScene, Scene);


ChooseScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.GameNamePath);
    gEngine.Textures.loadTexture(this.StartBtnPath);
    gEngine.Textures.loadTexture(this.editorbtnPath);
};

ChooseScene.prototype.unloadScene = function () {
    var nextLevel = null;
    if(this.Choose === 1){
        nextLevel = new MainScene(); 
    } else if (this.Choose === 2){
        nextLevel = new AboutScene();
    }
    
    gEngine.Core.startScene(nextLevel);
};

ChooseScene.prototype.initialize = function () {
    
    this.mCamera = new Camera( 
           vec2.fromValues(0, 0),   
           this.WinSize[0]/2,                       
           [0, 0, this.WinSize[0], this.WinSize[1]],
           2
    );
    this.mCamera.setBackgroundColor([0,0,0,1]);
    
    this.moveCamera = new Camera( 
           vec2.fromValues(0, 0),   
           this.WinSize[0]/2,                       
           [0, 0, this.WinSize[0], this.WinSize[1]],
           2
    );
    this.moveCamera.setBackgroundColor([0,0,0,1]);
    
    this.universeLayer = new UniverseLayer();
    
    this.GameName = new SpriteRenderable(this.GameNamePath);
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.GameNamePath);
    this.GameName.getXform().setPosition(0, 100);
    this.GameName.setColor([1,1,1,1]);
    this.GameName.getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
    
    this.StartBtn = new SpriteRenderable(this.StartBtnPath);
    var color = this.StartBtn.getColor();
    color[3] = 1;
    this.StartBtn.setColor(color);
    this.StartBtn.getXform().setPosition(-60, -30);
    this.StartBtn.getXform().setSize(60,60);
    
    this.AboutBtn = new SpriteRenderable(this.editorbtnPath);
    var color = this.AboutBtn.getColor();
    color[3] = 0.5;
    this.AboutBtn.setColor(color);
    this.AboutBtn.getXform().setPosition(60, -30);
    this.AboutBtn.getXform().setSize(this.unChooseSize,this.unChooseSize);
    
};

ChooseScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1,1,1,1]); // clear to light gray
 
    this.moveCamera.setupViewProjection();
    this.mCamera.setupViewProjection();
    this.universeLayer.draw(this.moveCamera);
 
    
    this.GameName.draw(this.mCamera);
    this.StartBtn.draw(this.mCamera);
    this.AboutBtn.draw(this.mCamera);
    
   
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
ChooseScene.prototype.update = function () {
    var center = this.moveCamera.getWCCenter();
    center[0]+=0.1;
    this.moveCamera.setWCCenter(center[0],center[1]);
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.A)){
        this.StartBtn.getXform().setSize(this.chooseSize,this.chooseSize);
        this.AboutBtn.getXform().setSize(this.unChooseSize,this.unChooseSize);
        this.Choose = 1;
    } else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.D)){
        this.AboutBtn.getXform().setSize(this.chooseSize,this.chooseSize);
        this.StartBtn.getXform().setSize(this.unChooseSize,this.unChooseSize);
        this.Choose = 2;
    } else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
       
};

