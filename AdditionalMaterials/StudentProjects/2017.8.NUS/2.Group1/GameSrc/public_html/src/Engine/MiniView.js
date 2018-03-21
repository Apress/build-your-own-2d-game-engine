/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global vec2, gEngine */

function MiniView(){
    
    this.miniCamera=null; ``
}
gEngine.Core.inheritPrototype(MiniView, Scene);

MiniView.prototype.unloadScene = function () {
    //gEngine.Fonts.unloadFont(this.fontofplayer);
    // Step B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

MiniView.prototype.initialize=function(){
 this.miniCamera = new Camera(
        vec2.fromValues(0, 0),   // position of the camera
        200,                       // width of camera
        [330, 359, 200, 120]           // viewport (orgX, orgY, width, height)
    );
    this.miniCamera.setBackgroundColor([1,1,1, 0.1]);
     
};

//MiniView.prototype._initText = function (font, posX, posY, color, textH) {
//    font.setColor(color);
//    font.getXform().setPosition(posX, posY);
//    font.setTextHeight(textH);
//};

MiniView.prototype.draw = function (vpMatrix) {
    // Step A: clear the canvas
//    gEngine.Core.clearCanvas([1, 1, 1, 1]); // clear to light gray
   // this.player1text.draw(vpMatrix);
};

MiniView.prototype.getCamera = function() {
  return this.miniCamera;
};
