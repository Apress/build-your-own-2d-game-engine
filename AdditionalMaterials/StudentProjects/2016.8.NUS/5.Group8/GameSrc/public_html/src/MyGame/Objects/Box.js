/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Box(spriteTexture,x,y,type){
    this.type=0;//箱子类型1-3
    this.isThereBox=false;//判断这时候有没有箱子
    this.width=7;
    this.height=7;
    this.mBox = new SpriteRenderable(spriteTexture); //盒子的图形对象
    
    
    this.mBox.setColor([1,0,0,0]);
    this.mBox.getXform().setPosition(x,y);
    this.type=type;
    this.mBox.getXform().setSize(this.width,this.height);
   
    
    GameObject.call(this, this.mBox);
    
    var r = new RigidRectangle(this.getXform(), this.width, this.height-1);//箱子的刚体模型
    r.setMass(0.2);  // less dense than Minions
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    this.setPhysicsComponent(r);
    
}

gEngine.Core.inheritPrototype(Box, GameObject);
//生成箱子时候调用
Box.prototype.setDroped=function(){
    this.isThereBox=true;
};
//箱子被消耗时调用
Box.prototype.setUsed=function(){
     this.isThereBox= false; 
};

Box.prototype.draw=function(aCamera){
    if(this.isThereBox) {
        GameObject.prototype.draw.call(this,aCamera);
    }
   
};

Box.prototype.update = function() {
    GameObject.prototype.update.call(this);
    };