/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


MyGame.prototype.updateMiniCam = function () {
    var xf = this.mHero.getXform();
    var x = xf.getXPos();
    var y = xf.getYPos();
    this.mMini.panTo(x,y);
    this.mMini.update();
};