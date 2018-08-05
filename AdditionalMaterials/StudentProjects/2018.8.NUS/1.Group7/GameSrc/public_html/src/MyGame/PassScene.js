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

function PassScene(nowlevel,star){
    this.mCamera = null;
    this.mAllObjs = null;
    this.mMsg=null;
    this.mMsg1=null;
    this.mMsg2=null;
    this.mCui=null;
    this.mLevel= nowlevel;
    this.mStarnum=star;
    this.mStaritem = null;
    this.kStar = "assets/yellow.png";
    this.kBGM = "assets/Lopu.mp3";
    this.kbg ="assets/bg1.png";
    
    //console.log(this.mLevel);
}
gEngine.Core.inheritPrototype(PassScene, Scene);

PassScene.prototype.loadScene=function(){
    gEngine.Textures.loadTexture(this.kStar);
    gEngine.Textures.loadTexture(this.kbg);
   
};

PassScene.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kStar);
    gEngine.Textures.unloadTexture(this.kbg);
    
    if(this.mLevel===0){
         var nextLevel =new StartScene();
        gEngine.Core.startScene(nextLevel);
    }
    else if(this.mLevel===1){
        var nextLevel =new AllLevel(1);
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mLevel===2){
        var nextLevel =new AllLevel(2);
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mLevel===3){
        var nextLevel =new AllLevel(3);
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mLevel===4){
        var nextLevel =new AllLevel(4);
       gEngine.Core.startScene(nextLevel);
    }
    else if(this.mLevel===5){
        var nextLevel =new AllLevel(5);
       gEngine.Core.startScene(nextLevel);
    }
    
};

PassScene.prototype.initialize=function(){
    this.mCamera = new Camera(
        vec2.fromValues(400, 300), // position of the camera
        800,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.4,0.25,0.2, 1]);
   
    this.mbg = new TextureRenderable(this.kbg);
    this.mbg.getXform().setPosition(400,300);
    this.mbg.getXform().setSize(800,600);
     
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mMsg = new FontRenderable("You got");
    this.mMsg.setColor([1,1,1, 1]);
    this.mMsg.getXform().setPosition(350,350);
    this.mMsg.setTextHeight(30);
    
    this.mMsg1 = new FontRenderable("Press ENTER to continue");
    this.mMsg1.setColor([1,1,1, 1]);
    this.mMsg1.getXform().setPosition(270,150);
    this.mMsg1.setTextHeight(20);
    
    this.mStaritem = new TextureRenderable(this.kStar);
    this.mStaritem.setColor([1,1,1,0]);
    this.mStaritem.getXform().setPosition(370,250);
    this.mStaritem.getXform().setSize(50,50);
    
    //console.log(this.mLevel);
    var msg = " "+this.mStarnum;
    
    this.mMsg2 = new FontRenderable(msg);
    this.mMsg2.setColor([1,1,1, 1]);
    this.mMsg2.getXform().setPosition(390,260);
    this.mMsg2.setTextHeight(30);

};
PassScene.prototype.draw=function(){
    gEngine.Core.clearCanvas([1, 0.87, 0.87, 1.0]);
      
    this.mCamera.setupViewProjection();
    
    this.mbg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera); //mcamera->canvus? 
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    this.mStaritem.draw(this.mCamera);
    
};

PassScene.prototype.update=function(){
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Enter)) 
    {
        gEngine.GameLoop.stop();
    }
    
};

