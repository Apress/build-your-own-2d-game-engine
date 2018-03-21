/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine */

function Player() {
    this.playerImagePath = "assets/player.png";
    this.IceAreaPath = "assets/IceArea.png";
    this.mColor = [];
    
    this.sprite1 = null;
    this.size1 = 15;
    this.speed1 = 1;

    this.dir1 = [0,0];
    
    
    this.sprite2 = null;
    this.size2 = 10;
    this.speed2 = 1;
    this.SpeedInc = 1.5;
    this.dir2 = [0,0];
    
    this.link = null;
    
    this.LvLife = 0;
    
    
    this.LvIce = 0;
    this.IceArea = null;
    this.castIce = false;
    
    this.LvFlash = 0;
    this.castFlash = false;
    
    this.load();
    this.init();
}

Player.prototype.load = function () {
    
};

Player.prototype.update = function() {
    
};

Player.prototype.init = function () {
    this.sprite1 = new GameObject(new SpriteRenderable(this.playerImagePath));
    this.sprite1.getXform().setPosition(0, 0);
    var color = this.sprite1.getRenderable().getColor();
    this.mColor = color;
    color[3] = 1;
    this.sprite1.getRenderable().setColor(color);
    this.sprite1.getXform().setSize(this.size1,this.size1);
    
    this.sprite2 = new GameObject(new SpriteRenderable(this.playerImagePath));
    this.sprite2.getXform().setPosition(0, 0);
    var color = this.sprite2.getRenderable().getColor();
    color[3] = 1;
    this.sprite2.getRenderable().setColor(color);
    this.sprite2.getXform().setSize(this.size2,this.size2);
   
    this.IceArea = new GameObject(new SpriteRenderable(this.IceAreaPath));
    this.IceArea.getRenderable().setColor([0,0.5,1,0]);
    this.IceArea.getXform().setSize(120,120);
    this.IceArea.getXform().setPosition(0,0);
    
    this.link = new LineRenderable(this.sprite1.getXform().getXPos(),
                                    this.sprite1.getXform().getYPos(),
                                    this.sprite2.getXform().getXPos(),
                                    this.sprite2.getXform().getYPos());
};

Player.prototype.unitDirction = function () {
    
    if((this.dir1[0] === 1 || this.dir1[0] === -1) && (this.dir1[1] === 1 || this.dir1[1] === -1)){
        var len1 = this.dir1[0] * this.dir1[0] + this.dir1[1] * this.dir1[1];
        var l1= 1 /len1;
        this.dir1 = [this.dir1[0]*l1,this.dir1[1]*l1];
    }
    
    if((this.dir2[0] === 1 || this.dir2[0] === -1) && (this.dir2[1] === 1 || this.dir2[1] === -1)){ 
        var len2 = this.dir2[0] * this.dir2[0] + this.dir2[1] * this.dir2[1];
        var l2 = 1 / len2;
        this.dir2 = [this.dir2[0]*l2,this.dir2[1]*l2];
    }
    
    
};

Player.prototype.updateIceArea = function(){
    if(this.LvIce !== 0){
        this.IceArea.getXform().setSize(120+(this.LvIce-1)*30,120+(this.LvIce-1)*30);
        this.IceArea.getRenderable().setColor([0,0.5,1,0.2]);
        var pos = this.sprite1.getXform().getPosition();
        this.IceArea.getXform().setPosition(pos[0],pos[1]);
    } else {
        this.IceArea.getRenderable().setColor([0,0.5,1,0]);
    }
};

Player.prototype.IceEffectFunc = function (enemy) {
    
    if(!this.castIce){
        enemy.speedInc = 1;
        return;
    }
    
    var pos = enemy.sprite.getXform().getPosition();
    var center = this.sprite1.getXform().getPosition();
    var xVar = Math.pow(pos[0] - center[0],2);
    var yVar = Math.pow(pos[1] - center[1],2);
    var length = Math.sqrt(xVar+yVar);
    var rad = this.IceArea.getXform().getHeight()/2;
    if(length < rad){
        enemy.speedInc = 1 - this.LvIce * 0.2;
    } else {
        enemy.speedInc = 1;
    }
    
};

Player.prototype.updateFlashSpeed = function() {
    if(this.castFlash){
        this.sprite1.getRenderable().setColor([1,1,0,1]);
        this.sprite2.getRenderable().setColor([1,1,0,1]);
        this.SpeedInc = 1 + this.LvFlash * 0.2;
    } else {
        this.sprite1.getRenderable().setColor(this.mColor);
        this.sprite2.getRenderable().setColor(this.mColor);
        this.SpeedInc = 1;
    }
    
};

Player.prototype.draw = function (camera) {
    this.updateFlashSpeed();
    this.sprite1.draw(camera);
    this.sprite2.draw(camera);
    if(this.castIce === true){
        this.updateIceArea();
        this.IceArea.draw(camera);
    }
    this.link.draw(camera);
    
};

Player.prototype.LinkUpdate = function (camera) {
    var pos1 = this.sprite1.getXform().getPosition();
    var pos2 = this.sprite2.getXform().getPosition();
    this.link.setVertices(pos1[0],pos1[1],pos2[0],pos2[1]);
    
    var xVar = Math.pow(pos1[0] - pos2[0],2);
    var yVar = Math.pow(pos1[1] - pos2[1],2);
    var length = Math.sqrt(xVar + yVar);
    
    this.link.setColor([1,(150-length)/150,(150-length)/150,1]);
    
    if(length > 150){
  
        return false;
    }
    
    return true;
    
};

Player.prototype.Input = function () {
    this.dir1 = [0,0];
    this.dir2 = [0,0];
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this.dir1[1] = 1;
    } else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this.dir1[1] = -1;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        this.dir1[0] = -1;
    } else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        this.dir1[0] = 1;
    }
    
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.I)){
        this.dir2[1] = 1;
    } else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.K)){
        this.dir2[1] = -1;
    }
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.J)){
        this.dir2[0] = -1;
    } else if(gEngine.Input.isKeyPressed(gEngine.Input.keys.L)){
        this.dir2[0] = 1;
    }
    
    //this.unitDirction();
    this.sprite1.getXform().incXPosBy(this.dir1[0] * this.speed2 * this.SpeedInc);
    this.sprite1.getXform().incYPosBy(this.dir1[1] * this.speed2 * this.SpeedInc);
    
    this.sprite2.getXform().incXPosBy(this.dir2[0] * this.speed2 * this.SpeedInc);
    this.sprite2.getXform().incYPosBy(this.dir2[1] * this.speed2 * this.SpeedInc);
};

Player.prototype.getWidthNow = function () {
    var width = Math.abs(this.sprite1.getXform().getXPos() - this.sprite2.getXform().getXPos());
    width+=360;
    var xWidth = 1280 / 720 * Math.abs(this.sprite1.getXform().getYPos() - this.sprite2.getXform().getYPos()) * 1.5;
    if(xWidth > width){
        width = xWidth;
    }
    if(width > 500){
        width = 500;
    }
    return width;
};

Player.prototype.getCenterNow = function () {
    
    var cx,cy;
    cx = (this.sprite2.getXform().getXPos() + this.sprite1.getXform().getXPos())/2;
    cy = (this.sprite2.getXform().getYPos() + this.sprite1.getXform().getYPos())/2;
    return [cx,cy];
};

Player.prototype.addEffice = function (effectCube){
    var pos = [];
    if(this.sprite1.pixelTouches(effectCube.sprite,pos) || this.sprite2.pixelTouches(effectCube.sprite,pos)){
        effectCube.sprite.getXform().setPosition(-100000,-100000);
        switch(effectCube.type){
            case 0:
                this.addLife();
                break;
            case 1:
                this.addIce();
                break;
            case 2:
                this.addFlash();
                break;
        }
    }
};

Player.prototype.collideEnemy = function ( enemy ){
    var pos = [];
    if(this.sprite1.pixelTouches(enemy.sprite,pos) || this.sprite2.pixelTouches(enemy.sprite,pos)){
        this.reduceLife();
        //enemy.remove();
        return true;
    }
    return false;
};

Player.prototype.PlayerEffict = function () {
    var pos1 = this.sprite1.getXform().getPosition();
    var pos2 = this.sprite2.getXform().getPosition();
    var xVar = Math.pow(pos1[0] - pos2[0],2);
    var yVar = Math.pow(pos1[1] - pos2[1],2);
    var length = Math.sqrt(xVar+yVar);
    
    if(length < 30*this.LvIce || length < 15*this.LvFlash){
        if(this.LvIce !== 0){
            this.castIce = true;
            this.castFlash = false;
        } else if(this.LvFlash !== 0){
            this.castFlash = true;
            this.castIce = false;
        }
    } else {
        this.castIce = false;
        this.castFlash = false;
    }
};

Player.prototype.getLvLife = function() {return this.LvLife;};
Player.prototype.getLvIce = function() {return this.LvIce;};
Player.prototype.getLvFlash = function() {return this.LvFlash;};

Player.prototype.addLife = function() {
    this.LvLife++;
    if(this.LvLife > 4){
        this.LvLife = 4;
    }
};

Player.prototype.reduceLife = function () {
    this.LvLife--;
    if(this.LvLife < 0){
        this.LvLife = 0;
    }
};



Player.prototype.addIce = function() {
    this.LvIce++;
    this.LvFlash = 0;
    if(this.LvIce > 3){
        this.LvIce = 3;
    }
};

Player.prototype.addFlash = function() {
    this.LvFlash++;
    this.LvIce = 0;
    if(this.LvFlash > 3){
        this.LvFlash = 3;
    }
};
