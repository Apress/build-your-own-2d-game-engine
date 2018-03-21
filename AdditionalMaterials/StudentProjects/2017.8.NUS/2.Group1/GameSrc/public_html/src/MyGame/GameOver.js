/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 */
/*global gEngine: false, Transform, vec2, Scene: false Scene: false*/

function GameOver(player){
    
    
   this.score=player;
   this.mCamera=null;
   this.textfont="assets/fonts/Consolas-72";
   this.kBGM = "assets/sound/BGM.mp3";
   this.player1text=[];
   this.player2text=[];
   this.text=[];
   this.signal=null;
   this.winner=null;
   this.loser=null;
   if(player[0]>player[1]){
       this.winner=1;
       this.loser=2;
   }
   else if(player[0]===player[1]){
       this.winner=0;
       this.loser=0;
   }
   else{
       this.winner=2;
       this.loser=1;
   }
   //this.realScore=[0,0];
  // this.firework="assets/firework.png";
 // this.mfirework=null;
}
gEngine.Core.inheritPrototype(GameOver,Scene);

GameOver.prototype.loadScene=function(){
   gEngine.Fonts.loadFont(this.textfont);
   gEngine.AudioClips.loadAudio(this.kBGM);
   ///gEngine.Textures.loadTexture(this.firework);
};

GameOver.prototype.unloadScene=function(){
//     this.leftCamera.unloadScene();
//     this.rightCamera.unloadScene();
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGM);
     gEngine.Fonts.unloadFont(this.textfont);
    // gEngine.Textures.unloadTexture(this.mHeart);
    // gEngine.Textures.loadTexture(this.firework);
     
    if(this.signal===0){
     var nextLevel=new MyGame();
     //nextLevel.loadComplete=true;
     gEngine.Core.startScene(nextLevel);
    }
     
};

GameOver.prototype.initialize=function(){
    this.mCamera=new Camera(
       vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]          
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.text[0]=new FontRenderable("Game Over");
     this.text[0].setFont(this.textfont);
    this._initText(this.text[0], 39, 50, [1, 1, 1, 1], 4);
    
    this.text[1]=new FontRenderable("Player1 final score:     "+parseInt(this.score[0]));
     this.text[1].setFont(this.textfont);
    this._initText(this.text[1], 39, 25, [0.5,0,0,1], 2);
    
    this.text[2]=new FontRenderable("Player2 final score:     "+parseInt(this.score[1]));
     this.text[2].setFont(this.textfont);
    this._initText(this.text[2], 39, 20, [0,0,0.5, 1], 2);
    
    this.text[3]=new FontRenderable("The winner is player"+this.winner+"!!!");
     this.text[3].setFont(this.textfont);
    this._initText(this.text[3], 30, 35, [0,0,0, 0.5], 3);
    
    this.restartText  = new FontRenderable("PRESS S TO CONTINUE");
    this.restartText.setFont(this.textfont);
    this._initText(this.restartText, 39, 15, [0, 0, 0, 0.9], 2);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBGM);
//    this.mfirework=new TextureRenderable(this.firework);
//    this.mfirework.setColor([1,1,1,0]);
//    this.mfirework.getXform().setPosition(44,35);
//    this.mfirework.getXform().setSize(5,5);
};

GameOver.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};



GameOver.prototype.draw=function(){
    gEngine.Core.clearCanvas([0.9, 0.9,0.9, 1]); 
   // this.createViews(this.mCamera);
    this.mCamera.setupViewProjection();
    for(var i=0;i<this.text.length;i++){
        this.text[i].draw(this.mCamera.getVPMatrix());
    }
   // this.mfirework.draw(this.mCamera.getVPMatrix())
    this.restartText.draw(this.mCamera.getVPMatrix());
};



GameOver.prototype.update=function(){
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.S)){
            this.signal=0;
           gEngine.GameLoop.stop();
           document.getElementById("one1").style.display= "inline-block";
           document.getElementById("one2").style.display= "inline-block";
           document.getElementById("one3").style.display= "inline-block";
           document.getElementById("two1").style.display= "inline-block";
           document.getElementById("two2").style.display= "inline-block";
           document.getElementById("two3").style.display= "inline-block";
           document.getElementById("one").innerHTML=0;
           document.getElementById("two").innerHTML=0;
     }  
};

