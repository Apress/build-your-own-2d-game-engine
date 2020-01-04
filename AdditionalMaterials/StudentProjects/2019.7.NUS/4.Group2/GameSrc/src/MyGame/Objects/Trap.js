/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Trap(spriteTexture, x, y){
    this.mTrap = new SpriteRenderable(spriteTexture);
    this.mTrap.setColor([1,1,1,0]);
    this.mTrap.getXform().setPosition(x, y);
    this.mTrap.getXform().setSize(5, 7);
    this.mTrap.setElementPixelPositions(0,64,0, 64);
    GameObject.call(this, this.mTrap);
    this.mTimer = 0;
    this.mHeight = 0;
    this.x = x;
    this.y = y;
}
gEngine.Core.inheritPrototype(Trap, GameObject);

Trap.prototype.update = function(x, y){
//    if(this.mTimer < 120)
//        this.mTimer++;
//    else if(this.mTimer >= 240)
//        this.mTimer = 0;
//    else{
//        this.mHeight = ( 60 - Math.abs(this.mTimer - 180) ) /20;
//        this.mTrap.getXform().setSize(15, this.mHeight);
//        this.mTimer++;
//    }
//    var disX = Math.abs(x - this.getXform().getXPos());
//    var disY = Math.abs(y - this.getXform().getYPos());
    var disX = Math.abs(x - this.x);
    var disY = Math.abs(y - this.y);
//    var status = 0;
//var disX = 6;
//var disY = 9;
    if(disX < 5 && disY < 10)
        return true;
    return false;
//    cupid.getXform().setPosition(100, 100);
};
