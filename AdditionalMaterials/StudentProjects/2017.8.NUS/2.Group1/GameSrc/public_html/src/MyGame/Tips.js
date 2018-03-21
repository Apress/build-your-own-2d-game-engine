/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Tips(){
    
    this.mCamera=null;
    this.img="assets/Tips.png";
    this.tips=null;
    this.signal=null;
}
gEngine.Core.inheritPrototype(Tips,Scene);

Tips.prototype.loadScene=function(){
   
   gEngine.Textures.loadTexture(this.img);
   // this.mCamera.loadScene();
//    this.leftCamera.loadScene();
//    this.rightCamera.loadScene();
};

Tips.prototype.unloadScene=function(){
//     this.leftCamera.unloadScene();
//     this.rightCamera.unloadScene();
     //gEngine.Fonts.unloadFont(this.textfont);
     gEngine.Textures.unloadTexture(this.img);
     if(this.signal===0){
         var nextLevel=new MyGame();
        gEngine.Core.startScene(nextLevel);  
     }
     
};

Tips.prototype.initialize=function(){
    this.mCamera=new Camera(
       vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]          
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.tips = new TextureRenderable(this.img);
    this.tips.setColor([1, 1, 1, 0]);
    this.tips.getXform().setPosition(50,33);
    this.tips.getXform().setSize(100, 50);
};







Tips.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9,0.9, 1]); 
   // this.createViews(this.mCamera);
    this.mCamera.setupViewProjection();
    this.tips.draw(this.mCamera.getVPMatrix());
    
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



Tips.prototype.update=function(){
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
           this.signal=0;
           gEngine.GameLoop.stop();
     }  
};




