/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function IceCream(spriteTexture,Xindex,Yindex,buffNum,isEndless) {
    this.kIsEndless = isEndless;
    this.kXindex = Xindex;
    this.kYindex = Yindex;
    this.kHeight = 7;
    this.kWidth = 6;
    this.kHalfMeltTime = 10;
    this.kFullMeltTime = 20;
    this.kTrapDisappearTime = 50;
    this.kNoBuff_NotMelt_PixelPositions = [768,960,0,256];
    this.kNoBuff_HalfMelt_PixelPositions = [960,1152,0,256];
    this.kNoBuff_FullMelt_PixelPositions = [1152,1344,64,192];
    
    this.kSpeedUpBuff_NotMelt_PixelPositions = [768,960,256,512];
    this.kSpeedUpBuff_HalfMelt_PixelPositions = [960,1152,256,512];
    this.kSpeedUpBuff_FullMelt_PixelPositions = [1152,1344,320,448];
    
    this.kFireBuff_NotMelt_PixelPositions = [1344,1536,0,256];
    this.kFireBuff_HalfMelt_PixelPositions = [1536,1728,0,256];
    this.kFireBuff_FullMelt_PixelPositions = [1728,1920,64,192];
    this.kBuffEnum = {
        NO_BUFF:0,
        SPEED_UP_BUFF:1,
        FIRE_BUFF:2
    };
    this.kStateEnum = {
        NOT_MELT: 0,
        HALF_MELT: 1,
        FULL_MELT: 2,
        DROPING: 3,
        FLYING: 4,
        DISAPPEAR:5
    };
    this.kDecTemperatureEnum = {
        NOT_MELT: 5,
        HALF_MELT: 3,
        FULL_MELT: -1
    };
    this.mBuff = buffNum; 
    this.mState = this.kStateEnum.FLYING;
    this.mFrameCount = 0;
    
    this.mInitialPositionX = 60;
    this.kFlyingVelocity = 0;//正确的速度在下面
    
    this.kfailingTime = 1;
    if(!this.kIsEndless){
        this.kfailingTime = 2;
    }
    this.isDead = false;
    this.canBeKnocked = false;
    this.failingDistanceX = 20;
    this.failingDistanceY = 20;//在两秒之内完成降落
    this.relativeDistanceY = 1;//控制冰欺凌的相对位置
    this.failingFrameCount = 0;
    this.velocityX = this.failingDistanceX / (this.kfailingTime * 60);
    this.accerlateY = 2 * this.failingDistanceY / (this.kfailingTime * 60 * 60 * this.kfailingTime);
    
    this.kFlyingVelocity = this.velocityX;//飞行的真实速度
    
    this.mTargetPositionX = Xindex * 7 - 47;
    this.mTargetPositionY = Yindex * 7 - 47;
    
    
    this.mIceCream = new SpriteRenderable(spriteTexture);
    this.mIceCream.getXform().setPosition(this.mInitialPositionX ,this.mTargetPositionY + this.failingDistanceY + this.relativeDistanceY);
    this.mIceCream.getXform().setSize(this.kWidth, this.kHeight);
    this.mIceCream.setColor([0,0,0,0]);
    
    switch(this.mBuff){
        case this.kBuffEnum.NO_BUFF:
            this.mIceCream.setElementPixelPositions(this.kNoBuff_NotMelt_PixelPositions[0]+2,this.kNoBuff_NotMelt_PixelPositions[1],this.kNoBuff_NotMelt_PixelPositions[2],this.kNoBuff_NotMelt_PixelPositions[3]);    
            break;
        case this.kBuffEnum.SPEED_UP_BUFF:
            this.mIceCream.setElementPixelPositions(this.kSpeedUpBuff_NotMelt_PixelPositions[0]+2,this.kSpeedUpBuff_NotMelt_PixelPositions[1],this.kSpeedUpBuff_NotMelt_PixelPositions[2],this.kSpeedUpBuff_NotMelt_PixelPositions[3]); 
            break;
        case this.kBuffEnum.FIRE_BUFF:
            this.mIceCream.setElementPixelPositions(this.kFireBuff_NotMelt_PixelPositions[0]+2,this.kFireBuff_NotMelt_PixelPositions[1],this.kFireBuff_NotMelt_PixelPositions[2],this.kFireBuff_NotMelt_PixelPositions[3]);   
            break;
        
    }
    
    switch(this.mBuff){
        case this.kBuffEnum.NO_BUFF:
            this.kHalfMeltTime = 10;
            this.kFullMeltTime = 20;
            this.kTrapDisappearTime = 33;   break;
        case this.kBuffEnum.FIRE_BUFF:
            this.kHalfMeltTime = 8;
            this.kFullMeltTime = 16;
            this.kTrapDisappearTime = 33;   break;
        case this.kBuffEnum.SPEED_UP_BUFF:
            this.kHalfMeltTime = 10;
            this.kFullMeltTime = 20;
            this.kTrapDisappearTime = 37;   break;
        
    }
    this.arrow = null;
    GameObject.call(this,this.mIceCream);
    
    this.shadow = null;
}
gEngine.Core.inheritPrototype(IceCream, GameObject);


IceCream.prototype.update = function () {
    switch(this.mState){
        case this.kStateEnum.FLYING:
            this._fly();    break;
        case this.kStateEnum.DROPING:
            this._drop();   break;
        default:
            this._melt();   break;
    }
    
};

IceCream.prototype._fly = function(){
    //this.mTargetPositionX + this.failingDistanceX
    var xform = this.mIceCream.getXform();
    var targetXPos = this.mTargetPositionX + this.failingDistanceX;
    if(targetXPos - 0.1 <= xform.getXPos() && xform.getXPos() <= targetXPos + 0.1){
        xform.setXPos(targetXPos);
        this.mState = this.kStateEnum.DROPING;
    }else{
        xform.incXPosBy(-this.kFlyingVelocity);
    }
    
};

IceCream.prototype._drop = function(){
    var pos = this.mIceCream.getXform().getPosition();
    if(this.failingFrameCount >= this.kfailingTime * 60){
        pos[0] = this.mTargetPositionX;
        pos[1] = this.mTargetPositionY + this.relativeDistanceY;
        this.mState = this.kStateEnum.NOT_MELT;
        this.canBeKnocked = false;
    }else{
        this.failingFrameCount++;
        if(this.failingFrameCount >= this.kfailingTime * 2 / 3 * 60){
            this.canBeKnocked = true;
        }
        var xform = this.mIceCream.getXform();
        xform.incXPosBy(-this.velocityX);
        xform.incYPosBy(-this.accerlateY * this.failingFrameCount);
    }
};


IceCream.prototype._melt = function(){
    
    switch(this.mFrameCount){
        case this.kHalfMeltTime * 60:
            switch(this.mBuff){
                case this.kBuffEnum.NO_BUFF:
                    this.mIceCream.setElementPixelPositions(this.kNoBuff_HalfMelt_PixelPositions[0],this.kNoBuff_HalfMelt_PixelPositions[1],this.kNoBuff_HalfMelt_PixelPositions[2],this.kNoBuff_HalfMelt_PixelPositions[3]);    
                    break;
                case this.kBuffEnum.SPEED_UP_BUFF:
                    this.mIceCream.setElementPixelPositions(this.kSpeedUpBuff_HalfMelt_PixelPositions[0],this.kSpeedUpBuff_HalfMelt_PixelPositions[1],this.kSpeedUpBuff_HalfMelt_PixelPositions[2],this.kSpeedUpBuff_HalfMelt_PixelPositions[3]); break;
                case this.kBuffEnum.FIRE_BUFF:
                    this.mIceCream.setElementPixelPositions(this.kFireBuff_HalfMelt_PixelPositions[0],this.kFireBuff_HalfMelt_PixelPositions[1],this.kFireBuff_HalfMelt_PixelPositions[2],this.kFireBuff_HalfMelt_PixelPositions[3]);   break;
            }
                
            this.mState = this.kStateEnum.HALF_MELT;
            break;
            
        case this.kFullMeltTime * 60:
            switch(this.mBuff){
                case this.kBuffEnum.NO_BUFF:
                    this.mIceCream.setElementPixelPositions(this.kNoBuff_FullMelt_PixelPositions[0],this.kNoBuff_FullMelt_PixelPositions[1],this.kNoBuff_FullMelt_PixelPositions[2],this.kNoBuff_FullMelt_PixelPositions[3]);    break;
                case this.kBuffEnum.SPEED_UP_BUFF:
                    
                    this.mIceCream.setElementPixelPositions(this.kSpeedUpBuff_FullMelt_PixelPositions[0],this.kSpeedUpBuff_FullMelt_PixelPositions[1],this.kSpeedUpBuff_FullMelt_PixelPositions[2],this.kSpeedUpBuff_FullMelt_PixelPositions[3]); break;
                case this.kBuffEnum.FIRE_BUFF:
                    this.mIceCream.setElementPixelPositions(this.kFireBuff_FullMelt_PixelPositions[0],this.kFireBuff_FullMelt_PixelPositions[1],this.kFireBuff_FullMelt_PixelPositions[2],this.kFireBuff_FullMelt_PixelPositions[3]);   break;
            }
            this.mState = this.kStateEnum.FULL_MELT;
            break;
            
        case this.kTrapDisappearTime * 60:
            this.mState = this.kStateEnum.DISAPPEAR;
            this.isDead = true;
            break;
    }
    
    
    this.mFrameCount++;
};
