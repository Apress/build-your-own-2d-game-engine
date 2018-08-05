/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BloodBar(cx,cy,width,height,texture0,texture1){
    this.bloodBar =  new TextureRenderable(texture0);
    this.bloodBar.getXform().setXPos(cx);
    this.bloodBar.getXform().setYPos(cy);
    this.xPos = cx;
    this.yPos = cy;
    this.width = width;
    this.height = height;
    this.barLen  = height-4;
    this.bloodBar.getXform().setSize(width, this.height);
    this.bloodBar.setColor([1, 1, 1, 0]);
    this.bloodValue = new Renderable();
    this.bloodValue.getXform().setXPos(cx);
    this.bloodValue.getXform().setYPos(cy-2);
    this.bloodValue.getXform().setSize(width-1, this.barLen);
    this.bloodValue.setColor([1, 0, 0, 1]);
   
    this.bloodBarCarrot = new TextureRenderable(texture1);
    this.bloodBarCarrot.getXform().setXPos(50);
    this.bloodBarCarrot.getXform().setYPos(480);
    this.bloodBarCarrot.getXform().setSize(2, 2);
//    this.bloodBarCarrot.getXform().setXPos(1100);
//    this.bloodBarCarrot.getXform().setYPos(1374);
//    this.bloodBarCarrot.getXform().setSize(12, 12);
    
}

gEngine.Core.inheritPrototype(BloodBar, GameObject);

BloodBar.prototype.draw = function (aCamera){
    this.bloodBar.draw(aCamera);
   // this.bloodBarCarrot.draw(aCamera);
    this.bloodValue.draw(aCamera);
};
BloodBar.prototype.update = function(cheat){
    var xform  =cheat.getXform();
    this.xPos = xform.getXPos()-55;
    this.yPos = xform.getYPos()+10;
   this.bloodBar.getXform().setXPos(this.xPos);
   this.bloodBar.getXform().setYPos(this.yPos);
   this.bloodBarCarrot.getXform().setXPos(this.xPos);
   this.bloodBarCarrot.getXform().setYPos(this.yPos+20);
   this.bloodValue.getXform().setXPos(this.xPos);
   this.bloodValue.getXform().setYPos(this.yPos-(this.height/2)+(this.barLen/2));
   
    
};
BloodBar.prototype.setBarlen = function(speed){
    this.barLen  -=speed;
    this.bloodValue.getXform().setSize(this.width-1, this.barLen);
    this.bloodValue.getXform().incYPosBy(-(speed/2));
}
BloodBar.prototype.getBloodLen = function(){
    return this.barLen;
};