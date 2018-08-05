//这个文件用来初始化第一关卡的各种功能
"use strict";

MyGame.prototype.CrashIntoMonster = function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i=0;i<this.mMonster.length;i++){
        if((xhero - this.mMonster[i].getXform().getXPos())>=-5&&
                (xhero - this.mMonster[i].getXform().getXPos())<=5&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-8&&
                (yhero - this.mMonster[i].getXform().getYPos())<=8&&(this.isMoving=== true)){
            this.mRestart = true;
            gEngine.GameLoop.stop();
        }
    }
};

MyGame.prototype.CrashIntoTrap = function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i = 0;i < this.mtrap.length ; i++){
        var trapx = this.mtrap[i].mXform.mPosition[0];
        var trapy = this.mtrap[i].mXform.mPosition[1];
        if(this.mtrap[i].mXform.mScale[1] > 1){
            if((xhero - trapx) <= 4 && (xhero - trapx) >= -4 && (yhero - trapy) >= 0 && (yhero - trapy) <= 6){
                this.mRestart = true;
                gEngine.GameLoop.stop();
            }
        }
    }
};


MyGame.prototype.chase=function(){
    var xhero = this.mHero.getXform().getXPos();
    var yhero = this.mHero.getXform().getYPos();
    var i;
    for(i=0;i<this.mMonster.length;i++){
        if((xhero - this.mMonster[i].getXform().getXPos())>=-20&&
                (xhero - this.mMonster[i].getXform().getXPos())<-5&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-5&&
                (yhero - this.mMonster[i].getXform().getYPos())<=5){
            this.mMonster[i].flag=-1;
            gEngine.AudioClips.playACue(this.kfindzombie);
            
        }
        else if((xhero - this.mMonster[i].getXform().getXPos())>5&&
                (xhero - this.mMonster[i].getXform().getXPos())<=20&&
                (yhero - this.mMonster[i].getXform().getYPos())>=-5&&
                (yhero - this.mMonster[i].getXform().getYPos())<=5){
            gEngine.AudioClips.playACue(this.kfindzombie);
            this.mMonster[i].flag=1;
        }
        else
            this.mMonster[i].flag=0;
    }
};

MyGame.prototype.elevatoraction = function (elevator,ylow,yhigh,istop,iselevatorcrash) {
    var ele1 = elevator;
    var ele1_h = ele1.mRenderComponent.mXform.mPosition[1];
    var ele1_x = ele1.mRenderComponent.mXform.mPosition[0];
    var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
    var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
    if(((ele1_h - yHero) > 2)&&((ele1_h - yHero) < 5)&&((ele1_x -xHero) > -6)&&((ele1_x - xHero) < 6)&&(istop === true)){
        iselevatorcrash = true;
    }
    for(var i = 0 ; i < this.mMonster.length ; i++ ){
        var xMonster = this.mMonster[i].mRenderComponent.mXform.mPosition[0];
        var yMonster = this.mMonster[i].mRenderComponent.mXform.mPosition[1];
        if(((ele1_h - yMonster) > 2)&&((ele1_h - yMonster) < 5)&&((ele1_x -xMonster) > -5)&&((ele1_x - xMonster) < 5)&&(istop === true))
        {
            iselevatorcrash = true;
        }
    }
    if(iselevatorcrash === false)
    {
        if((ele1_h-yhigh)<0 && istop === false)
        {
        ele1.mRenderComponent.mXform.mPosition[1]+=0.2;
        }
        if((ele1_h-yhigh)<0.001&&(ele1_h-yhigh)>0)
        {
            istop = true;
        }
        if((ele1_h-ylow)>0 && istop === true)
        {
            ele1.mRenderComponent.mXform.mPosition[1]-=0.2;
        }
        if((ele1_h-ylow)<0.0001)
        {
            istop = false;
        }
    }
    else{
        istop = false;
        iselevatorcrash = false;
    }
    
    //判断hero是否在elevator上，并移动hero
    if(((yHero-ele1_h) > 2)&&((yHero-ele1_h) < 5)&&((xHero-ele1_x) > -7)&&((xHero-ele1_x) < 7)&&(istop === true)){
        console.log(yHero);
        this.isOnElevator = true;
    }
    else{
       this.isOnElevator = false; 
    }
    if(this.isOnElevator === true){
        this.mHero.mRenderComponent.mXform.mPosition[1]-=0.2;
    }
    return [istop,iselevatorcrash];
};

MyGame.prototype.NetTrack = function(){
    var xTrack = this.mNetTrack.mXform.mPosition[0];
    var yTrack = this.mNetTrack.mXform.mPosition[1];
    var i = 0;
    var ripName = "";
    for(i=0;i<this.mMonster.length;i++){
        if((xTrack - this.mMonster[i].getXform().getXPos())>=-3&&
                (xTrack - this.mMonster[i].getXform().getXPos())<=3&&
                (yTrack - this.mMonster[i].getXform().getYPos())>=-8&&
                (yTrack - this.mMonster[i].getXform().getYPos())<=8){
            this.mMonster[i].mRenderComponent.mXform.mPosition[0] = -100;
            this.mMonster[i].mRenderComponent.mXform.mPosition[1] = -100;
            this.mNetTrack.mXform.mPosition[0] = -100;
            this.mNetTrack.mXform.mPosition[1] = -100;
            this.ripSet[this.ripNum].mXform.mPosition[0] = xTrack;
            this.ripSet[this.ripNum++].mXform.mPosition[1] = yTrack-1;
            return true;
        }
    }
    return false;
};

MyGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);
    light.setLightCastShadowTo(true);

    return light;
};

MyGame.prototype.bulletmove = function() {
    if(this.mbulletflag === 0){
        this.mbulletdirection = this.mdirection;
        var xHero = this.mHero.mRenderComponent.mXform.mPosition[0];
        var yHero = this.mHero.mRenderComponent.mXform.mPosition[1];
        this.mbullet.mXform.mPosition[0] = xHero;
        this.mbullet.mXform.mPosition[1] = yHero;
        this.mbulletflag = 1;
    }
};

MyGame.prototype.BulletCrashInto = function(){
var xbullet = this.mbullet.mXform.mPosition[0];
var ybullet = this.mbullet.mXform.mPosition[1];
for(var i=0;i<this.mMonster.length;i++){
if((xbullet - this.mMonster[i].getXform().getXPos())>=-5&&
        (xbullet - this.mMonster[i].getXform().getXPos())<=5&&
        (ybullet - this.mMonster[i].getXform().getYPos())>=-8&&
        (ybullet - this.mMonster[i].getXform().getYPos())<=8){
    
    this.ripSet[this.ripNum].mXform.mPosition[0] = xbullet;
    this.ripSet[this.ripNum++].mXform.mPosition[1] = ybullet-1;
    this.mMonster[i].mRenderComponent.mXform.mPosition[0] = -50;
    this.mMonster[i].mRenderComponent.mXform.mPosition[1] = -1000;
    
    
    this.mgunstate = false;
    this.mbullet.mXform.mPosition[1] = -50;
    this.mbullet.mXform.mPosition[0] = 20;
    this.mbulletflag = 0;
    return true;
}
}
if(xbullet>200||xbullet<-50){
    this.mgunstate = false;
    this.mbullet.mXform.mPosition[1] = -50;
    this.mbullet.mXform.mPosition[0] = 20;
    this.mbulletflag = 0;
}
};
MyGame.prototype.bulletjudge = function(){
if(this.mgunstate === true)
{
if(this.mbulletmovespeedflag!==0)
{
    this.mbulletmovespeedflag++;
    if(this.mbulletmovespeedflag === 5)
    {
        this.mbulletmovespeedflag=0;
    }
}
else if(this.mbulletflag === 1)
{                
    if(this.mbulletdirection === 1){
        this.mbullet.mXform.mPosition[0] += 5;
        this.mbulletmovespeedflag++;
    }
    else if(this.mbulletdirection === -1){
        this.mbullet.mXform.mPosition[0] -= 5;
        this.mbulletmovespeedflag++;
    }
}
    this.BulletCrashInto(); 

}
if(this.mgunstate === false){
    this.mGun1.mXform.mPosition[0] = -100;
    this.mGun1.mXform.mPosition[1] = -500;
    }
};

MyGame.prototype.showChest = function(){
        var hero = this.mHero;
        var floor = hero.floor;
        var xNow = hero.mRenderComponent.mXform.mPosition[0];

        switch(floor)
        {
            case 0:
                if((xNow>-10)&&(xNow<0)&&this.isChest0===false){
                    this.mRedTip.mXform.mPosition[0] = -5;
                    this.mRedTip.mXform.mPosition[1] = 12;
                }else{
                    this.mRedTip.mXform.mPosition[0] = -500;
                    this.mRedTip.mXform.mPosition[1] = -500;
                }
                break;
            case 1:
                
                    if((xNow>this.keyPosition[0][0]-5)&&(xNow<this.keyPosition[0][0]+5)&&this.iskey===false&&this.keyrandom===0){
                        this.mRedTip.mXform.mPosition[0] = this.keyPosition[0][0];
                        this.mRedTip.mXform.mPosition[1] = this.keyPosition[0][1]+5;
                    }else if((xNow>this.chestPosition[0][0]-5)&&(xNow<this.chestPosition[0][0]+5)&&this.isChest1===false&&this.chestrandom===0){
                        this.mRedTip.mXform.mPosition[0] = this.chestPosition[0][0];
                        this.mRedTip.mXform.mPosition[1] = this.chestPosition[0][1]+5;
                    }else if((xNow>this.chest3Position[0][0]-5)&&(xNow<this.chest3Position[0][0]+5)&&this.isChest3===false&&(this.chest3random === 0)){
                        this.mRedTip.mXform.mPosition[0] = this.chest3Position[0][0];
                        this.mRedTip.mXform.mPosition[1] = this.chest3Position[0][1]+5;
                    }else{
                        this.mRedTip.mXform.mPosition[0] = -500;
                        this.mRedTip.mXform.mPosition[1] = -500;
                    }
                break;
            case 2:
                
                    if((xNow>this.keyPosition[2][0]-5)&&(xNow<this.keyPosition[2][0]+5)&&this.iskey===false&&this.keyrandom===2){
                        this.mRedTip.mXform.mPosition[0] = this.keyPosition[2][0];
                        this.mRedTip.mXform.mPosition[1] = this.keyPosition[2][1]+5;
                    }else if((xNow>this.keyPosition[1][0]-5)&&(xNow<this.keyPosition[1][0]+5)&&this.iskey===false&&this.keyrandom===1){
                        this.mRedTip.mXform.mPosition[0] = this.keyPosition[1][0];
                        this.mRedTip.mXform.mPosition[1] = this.keyPosition[1][1]+5;
                    }else if((xNow>this.chestPosition[1][0]-5)&&(xNow<this.chestPosition[1][0]+5)&&this.isChest1===false&&this.chestrandom===1){
                        this.mRedTip.mXform.mPosition[0] = this.chestPosition[1][0];
                        this.mRedTip.mXform.mPosition[1] = this.chestPosition[1][1]+5;
                    }else if((xNow>this.chestPosition[2][0]-5)&&(xNow<this.chestPosition[2][0]+5)&&this.isChest1===false&&this.chestrandom===2){
                        this.mRedTip.mXform.mPosition[0] = this.chestPosition[2][0];
                        this.mRedTip.mXform.mPosition[1] = this.chestPosition[2][1]+5;
                    }else if((xNow>this.chest3Position[1][0]-5)&&(xNow<this.chest3Position[1][0]+5)&&this.isChest3===false&&(this.chest3random === 1)){
                        this.mRedTip.mXform.mPosition[0] = this.chest3Position[1][0];
                        this.mRedTip.mXform.mPosition[1] = this.chest3Position[1][1]+5;
                    }else if((xNow>this.chest3Position[2][0]-5)&&(xNow<this.chest3Position[2][0]+5)&&this.isChest3===false&&(this.chest3random === 2)){
                        this.mRedTip.mXform.mPosition[0] = this.chest3Position[2][0];
                        this.mRedTip.mXform.mPosition[1] = this.chest3Position[2][1]+5;
                    }else{
                        this.mRedTip.mXform.mPosition[0] = -500;
                        this.mRedTip.mXform.mPosition[1] = -500;
                    }
                break;
                
            case 3:
                    if(this.iskey===true){
                        if((xNow>-34)&&(xNow<-26)){
                        
                        }
                    }else if(this.iskey === false){
                        if((xNow<-34)&&(xNow>-26)){
                            
                        } 
                    };
                
                break;    
        }
};

MyGame.prototype.talk1fun = function (xhero,yhero) {
    if(this.talk1i === 0){
        this.mMsg.mText=this.talk1[this.talk1i];
        this.isMoving = false;
        this.talk1i++;
        this.isDialog = true;
    }
    else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) && this.isDialog === true){
            this.mMsg.mText=this.talk1[this.talk1i];
            this.talk1i++;
            this.isDialog = true;
    }
    if (this.talk1i > 7){
        this.isMoving = true;
        this.isDialog = false;
    }

};