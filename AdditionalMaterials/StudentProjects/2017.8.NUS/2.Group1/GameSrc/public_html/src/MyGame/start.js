/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 */
/*global gEngine: false, Transform: false Scene: false*/

function start(){
    
    
   this.kBGM = "assets/sound/BGM2.mp3";
   this.mCamera=null;
   this.img="assets/startindex.png";
   this.start=null;
   this.signal=null;
}
gEngine.Core.inheritPrototype(start,Scene);

start.prototype.loadScene=function(){
   
   gEngine.Textures.loadTexture(this.img);
   
   gEngine.AudioClips.loadAudio(this.kBGM);
   // this.mCamera.loadScene();
//    this.leftCamera.loadScene();
//    this.rightCamera.loadScene();
};

start.prototype.unloadScene=function(){
//     this.leftCamera.unloadScene();
//     this.rightCamera.unloadScene();
     //gEngine.Fonts.unloadFont(this.textfont);
     gEngine.AudioClips.stopBackgroundAudio();
     gEngine.AudioClips.unloadAudio(this.kBGM);
     gEngine.Textures.unloadTexture(this.img);
     if(this.signal===0){
         var nextLevel=new MyGame();
        gEngine.Core.startScene(nextLevel);  
     }
     if(this.signal===1){
         var nextLevel=new Tips();
        gEngine.Core.startScene(nextLevel);  
     }
     if(this.signal===2){
         var nextLevel=new Credit();
        gEngine.Core.startScene(nextLevel);  
     }
     
};

start.prototype.initialize=function(){
    this.mCamera=new Camera(
       vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]          
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.start = new TextureRenderable(this.img);
    this.start.setColor([1, 1, 1, 0]);
    this.start.getXform().setPosition(50,33);
    this.start.getXform().setSize(100, 50);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
};







start.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9,0.9, 1]); 
   // this.createViews(this.mCamera);
    this.mCamera.setupViewProjection();
    this.start.draw(this.mCamera.getVPMatrix());
    
//    for(var i=0;i<3;i++){
//        this.player1heart[i].draw(this.mCamera.getVPMatrix());
//    }
//    for(var i=0;i<3;i++){
//        this.player2heart[i].draw(this.mCamera.getVPMatrix());
//    }
//    this.mplayer1Text.draw(this.mCamera.getVPMatrix());
//    this.mplayer2Text.draw(this.mCamera.getVPMatrix());
//    this.restartText.draw(this.mCamera.getVPMatrix());
};



start.prototype.update=function(){
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
           this.signal=0;
           gEngine.GameLoop.stop();
     } 
      if(gEngine.Input.isKeyClicked(gEngine.Input.keys.T)){
           this.signal=1;
           gEngine.GameLoop.stop();
     } 
     if(gEngine.Input.isKeyClicked(gEngine.Input.keys.C)){
           this.signal=2;
           gEngine.GameLoop.stop();
     }  
};

