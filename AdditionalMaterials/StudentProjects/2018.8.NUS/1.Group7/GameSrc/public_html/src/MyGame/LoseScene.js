/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  

function LoseScene(newlevel){
    this.mCamera = null;
    this.mAllObjs = null;
    this.mMsg=null;
    this.mMsg1=null;
    this.mCui=null;
    this.mnewlevel= newlevel;
}
gEngine.Core.inheritPrototype(LoseScene, Scene);

LoseScene.prototype.unloadScene=function(){
    
    if(this.mnewlevel===0){
         var nextLevel =new StartScene();
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mnewlevel===1){
        var nextLevel =new Level1();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mnewlevel===2){
        var nextLevel =new MyGame();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mnewlevel===3){
        var nextLevel =new Level3();
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mnewlevel===5){
        var nextLevel =new Level5();
       gEngine.Core.startScene(nextLevel);
    }
    
};

LoseScene.prototype.initialize=function(){
    this.mCamera = new Camera(
        vec2.fromValues(400, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mMsg = new FontRenderable("You didn't collect enough stars :(");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(130,350);
    this.mMsg.setTextHeight(30);
    
    this.mMsg1 = new FontRenderable("Press ENTER to restart this level~");
    this.mMsg1.setColor([0, 0, 0, 1]);
    this.mMsg1.getXform().setPosition(180,150);
    this.mMsg1.setTextHeight(20);

};
LoseScene.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
      
    this.mCamera.setupViewProjection();
    
    this.mMsg.draw(this.mCamera); //mcamera->canvus? 
    this.mMsg1.draw(this.mCamera);
};
LoseScene.prototype.update=function(){
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Enter)) 
    {
        gEngine.GameLoop.stop();
    }
};
