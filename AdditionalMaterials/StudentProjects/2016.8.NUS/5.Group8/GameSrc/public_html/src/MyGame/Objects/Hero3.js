/* File: Hero3.js 
 *
 * Creates and initializes the Hero3 (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var BulletTextureType1="assets/Bullet1.png";
var BulletTextureType2="assets/Bullet2.png";
var BulletTextureType3="assets/Bullet3.png";
var BulletTextureTypeDefault="assets/BulletDefault.png";
var BulletTextureArcher="assets/DoubleArrow.png";
var BulletTextureType4="";
var Hero3_animation = "assets/hero3_animation.png";  //animation

var shotSound="assets/shotSound.wav";
var manSound="assets/man.wav";
var womanSound="assets/woman.wav";
function Hero3(atX, atY,keyBoard) {
    this.kDelta = 0.6;//每次移动距离，速度
    
    this.HeroJumpCount =2;
    this.Hero_Sky;
    this.Hero_Board;//是否碰撞
    //
    //英雄属性
    this.MaxHP=20;//最大生命值
    this.HP=this.MaxHP;//当前生命值
    this.mShotSpeed=3;//射速从1-10
    this.mCanShot=100/this.mShotSpeed;//射击间隔时间
    this.shotTick=0;//记录射击时间
    this.mfaceDirection=[1,0];// 英雄面向的位置，默认朝右
    this.mGetHit = 0;//英雄被击中次数
    this.mHitEnermy = 0; //打中敌人的次数
    this.isMoving=false;
    this.isLeft=false;
    this.isRight=true;
    this.sound=manSound;
    this.keyBoard=keyBoard;
    this.ShotFire=false;
    
    this.gift=false;//是否正在放技能
    this.giftTick=0;//记录技能持续时间
    
    this.canUseGift=false;//是否可以用技能
    this.coldTick=0;//记录冷却时间
    
    
    this.mBullets = new BulletSet(FireBall);// 赋予英雄子弹
    this.mTraceBulletSet= new TraceBulletSet();
    
    this.effectTime=0;//记录箱子效果存在时间
    this.MaxEffectTime=500;//效果最大持续时间
    this.effectStartFlag=false;//效果是否开始
   
    this.curBulletTexture=BulletTextureArcher;
    
    this.mHero = new SpriteAnimateRenderable("assets/hero3_animation.png");

    this.mHero.setSpriteSequence(128, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                 124, 128,       // widthxheight in pixels
                                 2,              // number of elements in this sequence
                                 0);             // horizontal padding in between
    this.mHero.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mHero.setAnimationSpeed(10);
    
    //初始化图形对象
    this.mHero.setColor([0.8, 0.8, 0.8, 0]);
    this.mHero.getXform().setPosition(atX, atY);
    this.mHero.getXform().setSize(9, 9);
    
   
    GameObject.call(this, this.mHero);
    
    //设置英雄的刚体模型
    var r = new RigidRectangle(this.getXform(), 4, 9);
    r.setMass(2);  
    r.setRestitution(0);
    r.setColor([0.8, 0.8, 0.8, 1]);
    r.setDrawBounds(false);
    r.setFriction(10);
    this.setPhysicsComponent(r);
  
}
gEngine.Core.inheritPrototype(Hero3, GameObject);



Hero3.prototype.update = function(enemy,box,aCamera,platformSet) {
    GameObject.prototype.update.call(this);
    this._moveByKeys(); // wasd移动函数
    if(this.isMoving){
        this.mHero.updateAnimation();
    }
    
    //掉下去就死
    var a = this.getXform().getPosition();
    if(a[1]<0){
        this.HP=0;
    }
    //防止射击时间太大
    this.shotTick++;
    if(this.shotTick>1000){
        this.shotTick=this.mCanShot;
    }
    
    //记录技能冷却时及是否准备完毕
    this.coldTick++;
    if(this.coldTick>1500){
        this.coldTick-=1500;
        this.canUseGift=true;
    }
    
    //如果效果开始，则记时
    if(this.effectStartFlag===true){
        
        this.effectTime++;
        if(this.effectTime>=this.MaxEffectTime){
            this.effectTime=0;
            this.effectStartFlag=false;
            this.mBullets.BulletTexture=FireBall;
            this.mShotSpeed=3;
            this.mBullets.damage=2;
            this.mBullets.power=20;
            this.mCanShot=100/this.mShotSpeed;
        }
    }
     var v = this.getPhysicsComponent().getVelocity();
    //空气摩擦
    
   
           v[0]*= 0.98;

    //空格射击
    if(this.keyBoard===1){
    if ((gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)||this.ShotFire)&&this.shotTick>this.mCanShot) {
        gEngine.AudioClips.playACue(shotSound);
        this.mBullets.newAt(this.getXform().getPosition(),this.mfaceDirection);
        this.shotTick=0;
    }
}
    if(this.keyBoard===2){
        if ((gEngine.Input.isKeyPressed(gEngine.Input.keys.L)||this.ShotFire)&&this.shotTick>this.mCanShot) {
        gEngine.AudioClips.playACue(shotSound);
        this.mBullets.newAt(this.getXform().getPosition(),this.mfaceDirection);
        this.shotTick=0;
    }
    }
    // 更新子弹信息
    var num = this.mBullets.update(this,enemy, aCamera);
    this.mHitEnermy += num; 
    
    
    //如果有盒子，检查碰撞
    var p = vec2.fromValues(0, 0);
    if(box.isThereBox){
    if (this.pixelTouches(box, p)) {
            box.setUsed();//如果碰撞，则将标志设为无
            gEngine.AudioClips.playACue(boxSound);
            this.effectStartFlag=true;
            this.effectTime=0;
            if(this.HP+3>=this.MaxHP){
                this.HP=this.MaxHP;
            }
            else{this.HP+=3;}
            
           
           //光球，速度慢，伤害高
            if(box.type===1){
                this.mBullets.BulletTexture=BulletTextureType1;
                this.mBullets.damage=5;
                this.mBullets.power=40;
                this.mShotSpeed=1;
                this.mCanShot=100/this.mShotSpeed;
            }
            //激光，速度快，伤害低
            if(box.type===2){
                this.mBullets.BulletTexture=BulletTextureType2;
                this.mBullets.damage=1;
                this.mShotSpeed=8;
                this.mCanShot=100/this.mShotSpeed;
                
            }
            //火球，速度中等，伤害中等
             if(box.type===3){
                this.mBullets.BulletTexture=BulletTextureType3;
                this.mBullets.damage=3;
                this.mShotSpeed=3;
                this.mBullets.power=30;
                this.mCanShot=100/this.mShotSpeed;
            }
            
            if(box.type===4){
                if(this.HP+3>=this.MaxHP){
                    this.HP=this.MaxHP;
                }
                else{this.HP+=3;}
            }
           
            //
            //此处增添被击中英雄的行为
            //   
        }
    }
    
    //如果英雄技能正在放技能
    if(this.gift===true){
        this.giftTick++;
        if(this.giftTick>=400){//如果时间大于300tick，则不能继续放，并将冷却时间设为0
            this.gift=false;
            this.coldTick=0;
            this.giftTick=0;
            this.mShotSpeed=3;
            this.mCanShot=100/this.mShotSpeed;
            this.mBullets.power=20;
            this.ShotFire=false;
        }
    }
    
    
    this.Hero_Board = gEngine.Physics.processObjSet(this, platformSet);
    if(this.Hero_Board === false){
        this.Hero_Sky =true;
    }
    if(this.Hero_Sky && this.Hero_Board){
        this.HeroJumpCount=2;
        this.Hero_Sky = false;
    }   
    

};

//绘制函数
Hero3.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mBullets.draw(aCamera);
    this.mTraceBulletSet.draw(aCamera);
};

//统计被击中次数
Hero3.prototype.hitOnce = function() {
    this.mGetHit++;
};

Hero3.prototype.subHP = function(damage) {
    this.HP-=damage;
};
//返回战术统计
Hero3.prototype.getStatus = function(){
    if(this.canUseGift){
    return  "Health: " + this.HP+" Ready!";}
    else{return  "Health: " + this.HP+" Cooling!";}
//            + 
//            "  Num Destroy: " + this.mHitEnermy +
//            "  Bullet: " + this.mBullets.size();
};

//移动函数
Hero3.prototype._moveByKeys = function() {
    if(this.keyBoard===1){
    var v = this.getPhysicsComponent().getVelocity();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W))
    {
        if(this.HeroJumpCount ===2){
            v[1] += this.kDelta*90;
            gEngine.AudioClips.playACue(jumpSound);
        } 
        if(this.HeroJumpCount ===1){
            v[1] = this.kDelta*80; 
        } 
        this.HeroJumpCount--;
        
    }
    var a=0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        v[0] -= this.kDelta*6;
        if(v[0] < -50){
            v[0] = -50;
        }
        this.mfaceDirection=[-1,0];
        this.isMoving = true;
        a=1;
        
        //此处需要加上英雄转向动画
        if(this.isLeft===false)
        {
            this.mHero.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    124, 128,       // widthxheight in pixels
                                    2,              // number of elements in this sequence
                                    0);             // horizontal padding in between
            this.isLeft=true;
            this.isRight=false;
        }   
    }
    else{
      a=0;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
    {
        v[1] -= this.kDelta;
        
    }
    var d = 0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        v[0] += this.kDelta*6;
        if(v[0] > 50){
            v[0] =50;
        }
        this.mfaceDirection=[1,0];
        this.isMoving = true;
        d=1;
        //此处需要加上英雄转向动画
        if(this.isRight===false){
            this.mHero.setSpriteSequence(128, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                           124, 128,       // widthxheight in pixels
                           2,              // number of elements in this sequence
                           0);             // horizontal padding in between
            this.isRight=true;
            this.isLeft=false;
        }       
    }else{d=0;}
    
    if(a===0&&d===0){
        this.isMoving=false;
    }
    
    //英雄技能
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.E)&&this.canUseGift)
    {    
        this.gift=true;
        this.canUseGift=false;
        this.mShotSpeed=15;
        this.mCanShot=100/this.mShotSpeed;
        this.mBullets.power=80;
        this.mBullets.damage=2;
        gEngine.AudioClips.playACue(SpeedUpSound);
        this.ShotFire=true;
        
    }
    
    }
    
    if(this.keyBoard===2){
    var v = this.getPhysicsComponent().getVelocity();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
    {
        if(this.HeroJumpCount ===2){
            v[1] += this.kDelta*90;
            gEngine.AudioClips.playACue(jumpSound);
        } 
        if(this.HeroJumpCount ===1){
            v[1] = this.kDelta*80; 
 
        } 
        this.HeroJumpCount--;
        
    }
    var a=0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        v[0] -= this.kDelta*6;
        if(v[0] < -50){
            v[0] = -50;
        }
        this.mfaceDirection=[-1,0];
        this.isMoving = true;
        a=1;
        
        //此处需要加上英雄转向动画
        if(this.isLeft===false)
        {
            this.mHero.setSpriteSequence(256, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                                    124, 128,       // widthxheight in pixels
                                    2,              // number of elements in this sequence
                                    0);             // horizontal padding in between
            this.isLeft=true;
            this.isRight=false;
        }   
    }
    else{
      a=0;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
    {
        v[1] -= this.kDelta;
        
    }
    var d = 0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
    {
        v[0] += this.kDelta*6;
        if(v[0] > 50){
            v[0] =50;
        }
        this.mfaceDirection=[1,0];
        this.isMoving = true;
        d=1;
        //此处需要加上英雄转向动画
        if(this.isRight===false){
            this.mHero.setSpriteSequence(128, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
                           124, 128,       // widthxheight in pixels
                           2,              // number of elements in this sequence
                           0);             // horizontal padding in between
            this.isRight=true;
            this.isLeft=false;
        }       
    }else{d=0;}
    
    if(a===0&&d===0){
        this.isMoving=false;
    }
    
    //英雄技能
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.K)&&this.canUseGift)
    {    
        gEngine.AudioClips.playACue(SpeedUpSound);
        this.gift=true;
        this.mShotSpeed=15;
        this.mCanShot=100/this.mShotSpeed;
        this.mBullets.power=80;
        this.mBullets.damage=2;
        this.canUseGift=false;
        this.ShotFire=true;
    }
    
    }



     
};