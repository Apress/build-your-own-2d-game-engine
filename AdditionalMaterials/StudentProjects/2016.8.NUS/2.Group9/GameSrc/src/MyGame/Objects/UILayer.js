/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function UILayer() {
    this.IconPath = ["assets/LifeCube.png","assets/IceCube.png","assets/SpeedCube.png"];
    this.IconSize = 15;
    
    this.maxLife = 4;
    this.curLife = 1;
    this.LifeBar = [];
    
    this.maxIce = 3;
    this.curIce = 0;
    this.IceBar = [];
    
    this.maxFlash = 3;
    this.curFlash = 0;
    this.FlashBar = [];

}

UILayer.prototype.Init = function(){
    var i;
    for(i = 0 ; i < this.maxLife ; i++) {
        this.LifeBar[i] = new SpriteRenderable(this.IconPath[0]);
        var lifeColor = this.LifeBar[i].getColor();
        if(i < this.curLife){
            lifeColor[3] = 1;
        } else {
            lifeColor[3] = 0.5;
        }
        this.LifeBar[i].getXform().setPosition(-320 + this.IconSize + (this.IconSize + 10)*i,180 - (this.IconSize));
        //this.LifeBar[i].getXform().setPosition(-640 + (this.IconSize + 10)*i,360 - (this.IconSize - 10));
        this.LifeBar[i].getXform().setSize(this.IconSize,this.IconSize);
        this.LifeBar[i].setColor(lifeColor);
        
        
        this.IceBar[i] = new SpriteRenderable(this.IconPath[1]);
        var IceColor = this.IceBar[i].getColor();
        if(i < this.curIce){
            IceColor[3] = 1;
        } else {
            IceColor[3] = 0;
        }
        this.IceBar[i].getXform().setPosition(-320 + this.IconSize + (this.IconSize + 10)*i,180 - this.IconSize - (this.IconSize/2 + 10));
        this.IceBar[i].getXform().setSize(this.IconSize,this.IconSize);
        this.IceBar[i].setColor(IceColor);
        
        
        this.FlashBar[i] = new SpriteRenderable(this.IconPath[2]);
        var FlashColor = this.FlashBar[i].getColor();
        if(i < this.curFlash){
            FlashColor[3] = 1;
        } else {
            FlashColor[3] = 0 ;
        }
        this.FlashBar[i].getXform().setPosition(-320 + this.IconSize + (this.IconSize + 10)*i,180 - this.IconSize - (this.IconSize/2 + 10));;
        this.FlashBar[i].getXform().setSize(this.IconSize,this.IconSize);
        this.FlashBar[i].setColor(FlashColor);
    }
};

UILayer.prototype.draw = function (camera) {
    for(var i = 0 ; i < this.maxLife ; i++){
        var FlashColor = this.LifeBar[i].getColor();
        if(i < this.curLife){
            FlashColor[3] = 1;
        } else {
            FlashColor[3] = 0.5 ;
        }
        this.LifeBar[i].setColor(FlashColor);
        this.LifeBar[i].draw(camera);
        
        var FlashColor = this.IceBar[i].getColor();
        if(i < this.curIce){
            FlashColor[3] = 1;
        } else {
            FlashColor[3] = 0 ;
        }
        this.IceBar[i].setColor(FlashColor);
        this.IceBar[i].draw(camera);
        
        
        var FlashColor = this.FlashBar[i].getColor();
        if(i < this.curFlash){
            FlashColor[3] = 1;
        } else {
            FlashColor[3] = 0 ;
        }
        this.FlashBar[i].setColor(FlashColor);
        this.FlashBar[i].draw(camera);
    }
    
};

UILayer.prototype.updateData = function (l,i,f){
    this.curLife = l;
    this.curIce = i;
    this.curFlash = f;
};