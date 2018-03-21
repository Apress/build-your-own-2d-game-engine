/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global vec2, gEngine, Scene */
"use strict";


function RightView(){
    
    //this.mTime=0;
    this.rightCamera = null;
//    this.player2text=null;
//    this.fontofplayer="assets/fonts/Consolas-72";
}
gEngine.Core.inheritPrototype(RightView, Scene);

RightView.prototype.loadScene = function () {
    //gEngine.Fonts.loadFont(this.fontofplayer);
};

RightView.prototype.unloadScene = function () {
    //gEngine.Fonts.unloadFont(this.fontofplayer);
    // Step B: starts the next level
    //var nextLevel = new GameOver();  // next level to be loaded
   // gEngine.Core.startScene(nextLevel);
};

RightView.prototype.initialize=function(){
  this.rightCamera = new Camera(
        vec2.fromValues(20, 0),   // position of the camera
        100,                       // width of camera
        [432, 1, 427, 478]           // viewport (orgX, orgY, width, height)
    );
    
    this.rightCamera.setBackgroundColor([1,1,1,1]);
//     this.player2text=new FontRenderable("player2");
//    this.player2text.setFont(this.fontofplayer);
//     this._initText(this.player2text,83,83,[0,0,1,1],4);
};

//RightView.prototype._initText = function (font, posX, posY, color, textH) {
//    font.setColor(color);
//    font.getXform().setPosition(posX, posY);
//    font.setTextHeight(textH);
//};

RightView.prototype.draw = function (vpMatrix) {
    // Step A: clear the canvas
//   gEngine.Core.clearCanvas([1, 1, 1, 1]); // clear to light gray
    //this.player2text.draw(vpMatrix); 
};

RightView.prototype.getCamera = function() {
  return this.rightCamera;
};
RightView.prototype.updateWCcenter=function(snakehead){
    var pos= snakehead.getHeadPos();
    this.rightCamera.setWCCenter(pos[0],pos[1]);
 };



