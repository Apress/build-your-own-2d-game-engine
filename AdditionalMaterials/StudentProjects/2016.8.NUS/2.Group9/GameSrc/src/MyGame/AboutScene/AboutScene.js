/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, vec2, Scene */

function AboutScene() {
    var canvas=document.getElementById("GLCanvas");           
    this.WinSize = [canvas.width,canvas.height];
    
    this.universeLayer = null;
    
    this.backTips = null;
    
    this.tip1Path = "assets/tip1.png";
    this.tip2Path = "assets/tip2.png";
    this.tip3Path = "assets/tip3.png";
    this.teamPath = "assets/team.png";
    
    this.tips = [];
    this.NowTips = 0;
    this.TipsUp = true;
    this.TipsDown = false;
            
}


gEngine.Core.inheritPrototype(AboutScene, Scene);


AboutScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.tip1Path);
    gEngine.Textures.loadTexture(this.tip2Path);
    gEngine.Textures.loadTexture(this.tip3Path);
    gEngine.Textures.loadTexture(this.teamPath);
};

AboutScene.prototype.unloadScene = function () {
    var nextLevel = new ChooseScene();
    gEngine.Core.startScene(nextLevel);
};

AboutScene.prototype.initialize = function () {
    
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
    
    this.tips[0] = new SpriteRenderable(this.tip1Path);
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.tip1Path);
    this.tips[0].getXform().setPosition(0, 0);
    this.tips[0].setColor([1,1,1,1]);
    this.tips[0].getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
    
    this.tips[1] = new SpriteRenderable(this.tip2Path);
    texInfo = gEngine.ResourceMap.retrieveAsset(this.tip2Path);
    this.tips[1].getXform().setPosition(0, 0);
    this.tips[1].setColor([1,1,1,0]);
    this.tips[1].getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
    
    this.tips[2] = new SpriteRenderable(this.tip3Path);
    texInfo = gEngine.ResourceMap.retrieveAsset(this.tip3Path);
    this.tips[2].getXform().setPosition(0, 0);
    this.tips[2].setColor([1,1,1,0]);
    this.tips[2].getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
    
    this.tips[3] = new SpriteRenderable(this.teamPath);
    texInfo = gEngine.ResourceMap.retrieveAsset(this.teamPath);
    this.tips[3].getXform().setPosition(0, 0);
    this.tips[3].setColor([1,1,1,0]);
    this.tips[3].getXform().setSize(texInfo.mWidth/2, texInfo.mHeight/2);
    
    
    
};

AboutScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1,1,1,1]); // clear to light gray
    this.mCamera.setupViewProjection();
    this.moveCamera.setupViewProjection();
    this.universeLayer.draw(this.moveCamera);
    for(var i = 0 ; i < this.tips.length ; i++){
    this.tips[i].draw(this.mCamera);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
AboutScene.prototype.update = function () {

    var center = this.moveCamera.getWCCenter();
    center[0]+=0.1;
    this.moveCamera.setWCCenter(center[0],center[1]);

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        for(var i = 0 ; i < this.tips.length ; i++){
            this.tips[i].setColor([1,1,1,0]);
        }
        this.NowTips++;
        if(this.NowTips >= this.tips.length){
            this.NowTips = 0;
        }
        this.tips[this.NowTips].setColor([1,1,1,1]);
        
    }

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
       gEngine.GameLoop.stop();
    }
    
    
       
};


