/* File: Hero2.js 
 *
 * Creates and initializes the Hero2 (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
var Hero2JumpCount =2;
var Hero2_Sky;
var Hero2_Board;//是否碰撞
var BulletTextureType1="assets/Bullet1.png";
var BulletTextureType2="assets/Bullet2.png";
var BulletTextureType3="assets/Bullet3.png";
var BulletTextureSoldier="assets/SoldierBullet.png";
var Aim = false;
var Shot = false;
var BulletTextureType4="";
var Hero2_animation = "assets/hero2_animation.png";  //animation
var manSound="assets/man.wav";
var womanSound="assets/woman.wav";
var AimSound = "assets/AimSound.wav";
var ShotSound = "assets/shotSound.wav";
function Hero2(atX, atY,keyBoard) {
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
    
    
    this.mBullets = new BulletSet(BulletTextureSoldier);// 赋予英雄子弹
    
    this.effectTime=0;//记录箱子效果存在时间
    this.MaxEffectTime=500;//效果最大持续时间
    this.effectStartFlag=false;//效果是否开始
   
    this.curBulletTexture=BulletTextureTypeDefault;
    
    this.mHero = new SpriteAnimateRenderable("assets/hero2_animation.png");
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
    var r = new RigidRectangle(this.getXform(), 4, 8);
    r.setMass(2);  
    r.setRestitution(0);
    r.setColor([0.8, 0.8, 0.8, 1]);
    r.setDrawBounds(false);
    r.setFriction(10);
    this.setPhysicsComponent(r);
    
    
    //技能相关
    this.mShot = null;
    this.mBroken = null;
    this.CoolingTime = 1500;
    this.mSkillCooling = false;
    this.mShot = new SpriteRenderable(kShot);
    this.mShot.getXform().setPosition(80, -40);
    this.mShot.getXform().setSize(40, 40);
    this.mShot.setElementPixelPositions(0, 380, 132, 512);

    this.mBroken = new SpriteRenderable(kShot);
    this.mBroken.getXform().setPosition(80, -40);
    this.mBroken.getXform().setSize(30, 30);
    this.mBroken.setElementPixelPositions(0, 512, 512, 1024);
  
}
gEngine.Core.inheritPrototype(Hero2, GameObject);



Hero2.prototype.update = function(enemy,box,aCamera,platformSet) {
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
    //如果效果开始，则记时
    if(this.effectStartFlag===true){
        this.effectTime++;
        if(this.effectTime>=this.MaxEffectTime){
            this.effectTime=0;
            this.effectStartFlag=false;
            this.mBullets.BulletTexture=BulletTextureSoldier;
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
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&this.shotTick>this.mCanShot) {
        gEngine.AudioClips.playACue(shotSound);
        this.mBullets.newAt(this.getXform().getPosition(),this.mfaceDirection);
        this.shotTick=0;
    }
}
    if(this.keyBoard===2){
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)&&this.shotTick>this.mCanShot) {
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
    
    this.CoolingTime--;
    if(this.CoolingTime === 0 ){
        this.mSkillCooling = true;
    }
    if(this.keyBoard===1){
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)){
            if(this.mSkillCooling){
                gEngine.AudioClips.playACue(AimSound);
                Aim = true;
                var position = enemy.getXform().getPosition();
                this.mShot.getXform().setPosition(position[0], position[1]);
                this.CoolingTime = 1900;
                this.mSkillCooling=false;
            }
        }
    }

    if(this.keyBoard===2){
       if(gEngine.Input.isKeyClicked(gEngine.Input.keys.K)){
            if(this.mSkillCooling){
                gEngine.AudioClips.playACue(AimSound);
                Aim = true;
                var position = enemy.getXform().getPosition();
                this.mShot.getXform().setPosition(position[0], position[1]);
                this.CoolingTime = 1900;
                this.mSkillCooling=false;
            }
        }
    }
    
    
    if(Aim && this.CoolingTime<1700){
        gEngine.AudioClips.playACue(ShotSound);
        var Enemy_position = enemy.getXform().getPosition();
        position = this.mShot.getXform().getPosition();
        this.mBroken.getXform().setPosition(position[0],position[1]);
        var Distance = Math.pow( Enemy_position[0]-position[0] , 2) +Math.pow(Enemy_position[1]-position[1] , 2);
        if(Distance < 500){
            enemy.HP -=10;
        }
        Aim = false;
        Shot = true;
        }

    if(Shot && this.CoolingTime <1550){
        this.mShot.getXform().setPosition(80,-40);
        this.mBroken.getXform().setPosition(80,-40);
        Shot = false;
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
Hero2.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mBullets.draw(aCamera);
    this.mShot.draw(aCamera);
    this.mBroken.draw(aCamera);
};

//统计被击中次数
Hero2.prototype.hitOnce = function() {
    this.mGetHit++;
};

Hero2.prototype.subHP = function(damage) {
    this.HP-=damage;
};

//返回战术统计
Hero2.prototype.getStatus = function(){
    if(!this.mSkillCooling){
        return  "Health: " + this.HP +" Cooling";
    } 
    else{return "Health " + this.HP + " Ready";}
//            + 
//            "  Num Destroy: " + this.mHitEnermy +
//            "  Bullet: " + this.mBullets.size();
};

//移动函数
Hero2.prototype._moveByKeys = function() {
    if(this.keyBoard===1){
    var v = this.getPhysicsComponent().getVelocity();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W))
    {
        if(!Aim){
            if(this.HeroJumpCount ===2){
                v[1] += this.kDelta*90;
                gEngine.AudioClips.playACue(jumpSound);
            } 
            if(this.HeroJumpCount ===1){
                v[1] = this.kDelta*80; 
            } 
            this.HeroJumpCount--;
        }
        
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
       if(Aim){
           this.mShot.getXform().incYPosBy(1);
       }
   }
    var a=0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        if(!Aim){
        v[0] -= this.kDelta*6;
        if(v[0] < (-50) ){
            v[0] = (-50);
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
        this.mShot.getXform().incXPosBy(-1);
         a=0;
    }
 }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
    {
        if(!Aim){
        v[1] -= this.kDelta;
    }
    else{
        this.mShot.getXform().incYPosBy(-1);
    }
        
    }
    var d = 0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {  
        if(!Aim){
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
    }
    else{
        this.mShot.getXform().incXPosBy(1);
        d=0;
        
    }
};
    
    if(a===0&&d===0){
        this.isMoving=false;
    }
    
    }
    
    
    if(this.keyBoard===2){
    var v = this.getPhysicsComponent().getVelocity();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
    {
        if(!Aim){
            if(this.HeroJumpCount ===2){
                v[1] += this.kDelta*90;
                gEngine.AudioClips.playACue(jumpSound);
            } 
            if(this.HeroJumpCount ===1){
                v[1] = this.kDelta*80; 
            } 
            this.HeroJumpCount--;
        }
        
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)){
       if(Aim){
           this.mShot.getXform().incYPosBy(1);
       }
   }
    var a=0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        if(!Aim){
        v[0] -= this.kDelta*6;
        if(v[0] < (-50) ){
            v[0] = (-50);
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
        this.mShot.getXform().incXPosBy(-1);
         a=0;
    }
 }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
    {
        if(!Aim){
        v[1] -= this.kDelta;
    }
    else{
        this.mShot.getXform().incYPosBy(-1);
    }
        
    }
    var d = 0;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
    {  
        if(!Aim){
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
    }
    else{
        this.mShot.getXform().incXPosBy(1);
        d=0;
        
    }
};
    
    if(a===0&&d===0){
        this.isMoving=false;
    }
  }


     
};