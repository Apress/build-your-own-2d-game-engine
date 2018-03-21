/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 */
/*global gEngine: false, Transform: false Scene: false*/

function Reborn(Winner){
    
    
    this.leftchance=null;
  // this.mCamera=[];
   this.mCamera=null;
//   this.leftCamera = new LeftView();
//   this.rightCamera=new RightView();
   this.textfont="assets/fonts/Segment7-96";
   this.mHeart="assets/heart.png";
   this.player1heart=[];
   this.player2heart=[];
   this.mplayer1Text=null;
   this.mplayer2Text=null;
   this.restartText=null;
  
}
gEngine.Core.inheritPrototype(Reborn,Scene);

Reborn.prototype.loadScene=function(){
   gEngine.Fonts.loadFont(this.textfont);
   gEngine.Textures.loadTexture(this.mHeart);
   // this.mCamera.loadScene();
//    this.leftCamera.loadScene();
//    this.rightCamera.loadScene();
};

Reborn.prototype.unloadScene=function(){
//     this.leftCamera.unloadScene();
//     this.rightCamera.unloadScene();
     gEngine.Fonts.unloadFont(this.textfont);
     gEngine.Textures.unloadTexture(this.mHeart);
     var nextLevel=new MyGame();
     gEngine.Core.startScene(nextLevel);
};

Reborn.prototype.initialize=function(){
    this.mCamera=new Camera(
       vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]          
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.player1chance(3);
     this.player2chance(3);
     
    this.mplayer1Text  = new FontRenderable("player1:");
    this.mplayer1Text.setFont(this.textfont);
    this._initText(this.mplayer1Text, 2, 55, [1, 0, 0, 1], 2);
    
    this.mplayer2Text  = new FontRenderable("player2:");
    this.mplayer2Text.setFont(this.textfont);
    this._initText(this.mplayer2Text, 40, 55, [0, 0, 1, 1], 2);
    
    this.restartText  = new FontRenderable("PRESS 1 TO CONTINUE");
    this.restartText.setFont(this.textfont);
    this._initText(this.restartText, 5, 20, [0, 0, 0, 1], 3);
};

Reborn.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};


Reborn.prototype.player1chance=function(heart){
    for(var i=0;i<heart;i++){
    this.player1heart[i]=new TextureRenderable(this.mHeart);
    this.player1heart[i].setColor([1, 0, 0, 0.2]);  // tints red
    this.player1heart[i].getXform().setPosition(4+i*3, 44);
    this.player1heart[i].getXform().setSize(3, 3);
    }
};

Reborn.prototype.player2chance=function(heart){
    for(var i=0;i<heart;i++){
    this.player2heart[i]=new TextureRenderable(this.mHeart);
    this.player2heart[i].setColor([1, 0, 0, 0.2]);  // tints red
    this.player2heart[i].getXform().setPosition(40+i*3, 44);
    this.player2heart[i].getXform().setSize(3, 3);
    }
};
Reborn.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9,0.9, 1]); 
   // this.createViews(this.mCamera);
    this.mCamera.setupViewProjection();
    
    
    for(var i=0;i<3;i++){
        this.player1heart[i].draw(this.mCamera.getVPMatrix());
    }
    for(var i=0;i<3;i++){
        this.player2heart[i].draw(this.mCamera.getVPMatrix());
    }
    this.mplayer1Text.draw(this.mCamera.getVPMatrix());
    this.mplayer2Text.draw(this.mCamera.getVPMatrix());
    this.restartText.draw(this.mCamera.getVPMatrix());
};



Reborn.prototype.update=function(){
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.One)){
           gEngine.GameLoop.stop();
     }  
};

