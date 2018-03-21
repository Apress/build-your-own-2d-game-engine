/* File: Hero.js 
 *
 *海盗船
 *玩家使用WASD控制方向，SPACE来发射炮弹
 *
 * 到边界后，不出界，只能玩家控制转向，否则不能动。
 * HP总值100，每受弹一次减5
 *   HP在无战斗（连续不受弹m秒）时，每n秒恢复1点[可变]
 * 
 * EXP累计，一艘商船20，一艘RN30（等同血量）。达到500，win[可变]
 * 
 * 以下代码来自10.1的hero.js
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero( spriteTexture) {
    this.kDelta = 0.3;
    this.kbullet = "assets/prop_bomb.png";
    this.ksuperbullet = "assets/bullet2.png";
     this.kCue = "assets/sounds/fire.mp3";
    this.mHero = new SpriteRenderable(spriteTexture);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero .getXform().setPosition(0, 0);
    this.mHero .getXform().setSize(10, 10);
    this.mHero .setElementPixelPositions(64, 128, 0, 64);
    
    this.mHP = 100;
    this.mEXP = 0;
    this.se = 0;
    this.flag = 0;
    GameObject.call(this, this.mHero );
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function (mBullet,Bflag,FireCD) {
    // control by WASD
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        if(xform.getYPos() < 20){
            xform.incYPosBy(this.kDelta);
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if(xform.getYPos() > -20){
            xform.incYPosBy(-this.kDelta); 
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if(xform.getXPos() > -45){
            xform.incXPosBy(-this.kDelta);
            this.mHero .setElementPixelPositions(0, 64, 0, 64);
            this.flag = 1;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if(xform.getXPos() < 45){
            xform.incXPosBy(this.kDelta);
            this.mHero.setElementPixelPositions(64, 128, 0, 64);
            this.flag = 0;
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&Bflag === 0&&FireCD <= 0) {

        var heroBullet = new BulletH(
                this.kbullet, this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos() - 7.5, this.flag);       
        mBullet.push(heroBullet);
        gEngine.AudioClips.playACue(this.kCue);
 
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)&&Bflag === 1&&FireCD <= 0) {
        this.se = 0;
        var heroBullet = new SuperBulletH(
                this.ksuperbullet, this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos() - 7.5, this.flag, this.se);       
        mBullet.push(heroBullet);
        this.se = 1;
        var heroBullet = new SuperBulletH(
                this.ksuperbullet, this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos() - 7.5, this.flag, this.se);       
        mBullet.push(heroBullet);
        this.se = 2;
        var heroBullet = new SuperBulletH(
                this.ksuperbullet, this.mHero.getXform().getXPos(), this.mHero.getXform().getYPos() - 7.5, this.flag, this.se);       
        mBullet.push(heroBullet);
        gEngine.AudioClips.playACue(this.kCue);
    }
    
    if(this.mHP<= 0){
   var nextLevel = new GameOver();  // load the next level
   gEngine.Core.startScene(nextLevel);
}

if(this.mEXP>= 500){
   var nextLevel = new NextLevel();  // load the next level
   gEngine.Core.startScene(nextLevel);
}
};

Hero.prototype.getHP = function(){
    return this.mHP;
};

Hero.prototype.decHP = function(deltaHp){
    this.mHP -= deltaHp;
};
Hero.prototype.incHP = function(deltaHp){
    this.mHP += deltaHp;
};
Hero.prototype.getEXP = function(){
    return this.mEXP;
};

Hero.prototype.incExp = function(deltaExp){
    this.mEXP += deltaExp;
};

Hero.prototype.decEXP = function (deltaEXP) {
    this.mEXP -= deltaEXP;
};

Hero.prototype.incSpeed = function(deltaExp){
    this.kDelta += deltaExp;
};
Hero.prototype.getSpeed = function(){
    return this.kDelta;
};