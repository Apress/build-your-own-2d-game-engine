/* File: Merchant Ship.js 
 *
 * 商船（需要限定最大量）
 * 原始轨迹：从左到右直线行驶。到右边界后直接出去消失。
 * 被动攻击：受弹后，直线攻击。
 * 
 * 两个攻击功能：炮弹和直接撞击(同RN，只是攻击力度较弱)
 * 炮弹需调用shell.js
 * 
 * 总血量20（受弹4次die）[可变]
 * 击沉后设为null
 * 
 * 以下代码来自6.6的brain.js,有自动追随的功能
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Merchant(spriteTexture) {
    //this.kmerchant = "assets/merchant.png"; 
     this.kBullet = "assets/prop_bomb.png";
    this.kDeltaDegree = 1;
  //  this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.1;
    this.mMerchant = new SpriteRenderable(spriteTexture);
    this.mMerchant.setColor([1, 1, 1, 0]);
    this.mMerchant.getXform().setPosition(55, 40*Math.random()-18);
    this.mMerchant.getXform().setSize(10, 10);
    this.mMerchant.setElementPixelPositions(0, 64, 0, 64);//？？
 
    this.isAttack= false;//未攻击设为false，开始攻击设为true   
    
    GameObject.call(this, this.mMerchant);
    this.setSpeed(0.05); 
    this.HP = 5;
    
}
gEngine.Core.inheritPrototype(Merchant, GameObject);

Merchant.prototype.update = function (Timer,mBullet) {
  //  GameObject.prototype.update.call(this);  // default moving forward

    //直线运动---GameObject中有移动的，但是不一定对
   this.mMerchant.getXform().incXPosBy (-this.kDeltaSpeed);
//到最右后为0
    if( this.mMerchant.getXform().getXPos
            +this.mMerchant.getXform().getWidth/2=== -640){
     this.mMerchant= null;
}

//判断是否中弹---最好在mygame里写
/*if(this.isAttack===0 && this.mMerchant.pixelTouches()){
    this.isAttack===1;
    
    }*/
    /*if(this.isAttack===1){     
        var temp = new Bullet();
        temp.setPosition(this.merchant.getXform().getXPos-this.merchant.getXform().getWidth/2, this.merchant.getXform().getYPos);
        this.shell.push(temp);
        
    }*/
     Timer--;
        if(Timer <= 0){
        Timer = 100;
        this.fire(mBullet);
        }
      return Timer;
};

Merchant.prototype.IsAttack = function(){
    return this.isAttack;
};
Merchant.prototype.ChangeIsAttack = function(i){
  this.isAttack = i;
};

Merchant.prototype.fire = function (mBullet) {
   var merBullet = new BulletE(this.kBullet, this.mMerchant.getXform().getXPos(), this.mMerchant.getXform().getYPos() - 10, 1);
   mBullet.push(merBullet);
           
};

Merchant.prototype.decHP = function (deltaHp) {
    this.HP -= deltaHp;
};

Merchant.prototype.getHP = function () {
    return this.HP;
};



