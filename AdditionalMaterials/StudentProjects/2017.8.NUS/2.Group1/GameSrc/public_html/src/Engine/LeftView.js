/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global vec2, gEngine, Scene */
"use strict";


function LeftView(){
    
    this.leftCamera = null;

   // this.mTime=0;
   // this.pos=[];
    

//    this.player1text=null;
//    this.fontofplayer="assets/fonts/Consolas-72";
    

    
}
gEngine.Core.inheritPrototype(LeftView, Scene);

LeftView.prototype.loadScene = function () {
   // gEngine.Fonts.loadFont(this.fontofplayer);
};

LeftView.prototype.unloadScene = function () {
    //gEngine.Fonts.unloadFont(this.fontofplayer);
    // Step B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

LeftView.prototype.initialize=function(){
  this.leftCamera = new Camera(
        vec2.fromValues(-20, 0),   // position of the camera
        100,                       // width of camera
        [1, 1, 430, 478]           // viewport (orgX, orgY, width, height)
    );
    
    this.leftCamera.setBackgroundColor([1,1,1,1]);
//     this.player1text=new FontRenderable("player1");
//    this.player1text.setFont(this.fontofplayer);
//    this._initText(this.player1text,5,83,[1,0,0,1],4);
};

//LeftView.prototype._initText = function (font, posX, posY, color, textH) {
//    font.setColor(color);
//    font.getXform().setPosition(posX, posY);
//    font.setTextHeight(textH);
//};

LeftView.prototype.draw = function (vpMatrix) {
    // Step A: clear the canvas
//    gEngine.Core.clearCanvas([1, 1, 1, 1]); // clear to light gray
//    this.player1text.draw(vpMatrix);
};

LeftView.prototype.getCamera = function() {
  return this.leftCamera;
};

 LeftView.prototype.updateWCcenter=function(snakehead){
    //this.mTime++;
    var pos= snakehead.getHeadPos();


   
        //this.mTime+=-gEngine.GameLoop.kFPS*time;
        this.leftCamera.setWCCenter(pos[0],pos[1]);
    
 };
 
 
 LeftView.prototype.update=function(){
//      if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
//           gEngine.GameLoop.stop();
//       }
//     
//    this.leftCamera.setWCCenter(pos[0],pos[1]);


 };