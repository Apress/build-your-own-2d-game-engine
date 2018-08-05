/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function LaserMinion(atX, atY,  texture, w, h, state ) {
    this.kOffset = 4.7;
    this.kShootTimer = 20;
    this.mNumCycles = 0;
    this.mRange = 48;
    this.mStopRange = 32;
    this.state = state;
    this.kBulletTexture = "assets/jetpack.png";
    Minion.call(this, atX, atY, texture, w, h);
    if(this.state ==1)
    {
        this.getXform().setRotationInDegree(-45);
    }
    else{
        this.getXform().setRotationInDegree(45);
    }
}
gEngine.Core.inheritPrototype(LaserMinion,Minion);


LaserMinion.prototype.update = function () {
    Minion.prototype.update.call(this);
    var b,direct,rotate;
    if(this.state == 1)
    {
        direct = [Math.cos(Math.PI/4),Math.sin(Math.PI/4)];
        rotate = 45;
    }
    else{
            direct = [-Math.cos(Math.PI/4),Math.sin(Math.PI/4)];
            rotate = 135;
    }
        this.mNumCycles++;
        if(this.mNumCycles > this.kShootTimer){
            this.mNumCycles = 0;
            b = new Bullets(this.getXform().getXPos(), this.getXform().getYPos(),direct,rotate,this.kBulletTexture);
            this.mProjectiles.addToSet(b);
        }
    this.HP = 3;
  

};