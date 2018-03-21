/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, gCue3, gCue4 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
Hero.kCue = null;
function Hero(spriteTexture, atX, atY, bulletNum) {
    this.HeroType = 0;
    this.kDelta = 0.6;
    this.mHP = 5;
    this.mPower = 1;
    this.mBulletSpeed = 120;
    this.mBulletNum = 3;
    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setZPos(0);
    this.mDye.getXform().setSize(10, 10);
    this.mDye.setElementPixelPositions(0, 256, 0, 256);
    GameObject.call(this, this.mDye);
    
    // Support for following the path
//    this.mPath = aPath;
//    this.mPathIndex = 0;
//    this.mCurrentPathLength = 0;
//    this.mCurrentStartPos = null;
//    this._stopMovement();
    
    // Cover line segment in x-seconds
    this.mCoverInSeconds = 2;
    this.mHit = 0;
    this.mNumDestroy = 0;
    
    // Projectiles that the hero can shoot
    this.unableToShoot = false;
    this.BlockTime = 30;
    this.mProjectiles = new ProjectileSet(bulletNum);
    this.mMissleNum = 0;
    this.mMissles = new MissleSet();
    this.mPointNum = 0;
    this.mSuperSkillNum = 0;
    this.requiredPoint = 5;
    
    this.mShieldNum = 0;
    this.mShields = new ShieldSet();
    this.needUseShield = true;
    this.mSuperSkill = new SuperSkillSet();
    
    
    this.moveUp = gEngine.Input.keys.W;
    this.moveLeft = gEngine.Input.keys.A;
    this.moveDown = gEngine.Input.keys.S;
    this.moveRight = gEngine.Input.keys.D;
    this.calculator = 0;
    this.shotKey = gEngine.Input.keys.Space;
    this.shieldKey = gEngine.Input.keys.J;
    this.SuperSkillKey = gEngine.Input.keys.E;
    
    this.isfreezed = false;
    
}
gEngine.Core.inheritPrototype(Hero, GameObject);


Hero.prototype.update = function(OtherHero, StoneSet, allParticles, func, aCamera) {
    //calculate HP
    if(this.unableToShoot){
        this.calculator += 1;
        if(this.calculator >=this.BlockTime){
            this.unableToShoot = false;
            this.calculator = 0;
        }
    }
    
    this.mMissles.update(OtherHero,StoneSet,allParticles, func);
    
    var num = this.mProjectiles.update(OtherHero, StoneSet, allParticles, func, aCamera);
    this.mNumDestroy += num; 
    
    // update hero path
//    this._updatePath();
    
    // movement
    if(!this.isfreezed){
    this._moveByKeys(); 
    }
    
    if(this.mPointNum < 5){
        this.mBulletNum = 3;
    }
    else if(this.mPointNum <10){
        this.mBulletNum = 4;
    }
    else {
        this.mBulletNum = 5;
    }    
    
    if(this.mPointNum === this.requiredPoint){
        this.mSuperSkillNum += 1;
        this.requiredPoint += 5;
    }
    //new bullet
    if (gEngine.Input.isKeyPressed(this.shotKey)) {
        if(!this.unableToShoot){
        gEngine.AudioClips.playACue(Hero.kCue);
        this.mProjectiles.newAt(this.getXform().getPosition(),this.mPower,this.mBulletSpeed,this.mBulletNum, this.HeroType);
        this.unableToShoot = true;
        }
    }
    //fire missle
    if(gEngine.Input.isKeyClicked(this.shotKey)&&this.mMissleNum > 0){
        this.mMissles.newAt(this.getXform().getPosition());
        this.mMissleNum = this.mMissleNum -1;
    }
    if(gEngine.Input.isKeyClicked(this.shieldKey)&&this.mShieldNum > 0){
        if(this.needUseShield===true){
            this.mShields.newAt(this.getXform().getPosition());
            this.mShieldNum = this.mShieldNum - 1;
            this.needUseShield = false;
        }
    }
    
    if(gEngine.Input.isKeyClicked(this.SuperSkillKey)){
        if(this.mSuperSkillNum > 0){
            if(this.HeroType===2)
                gEngine.AudioClips.playACue(gCue3);
            else
            gEngine.AudioClips.playACue(gCue4);
        this.mSuperSkill.newAt(this,OtherHero, StoneSet);
        this.mSuperSkillNum --;
        
        }
    }
    
    this.mShields.update(this,StoneSet);
    this.mSuperSkill.update();

  
};


Hero.prototype.draw = function(aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mSuperSkill.draw(aCamera);
    this.mProjectiles.draw(aCamera);
    this.mMissles.draw(aCamera);
    this.mShields.draw(aCamera);
    
};

Hero.prototype.setShotKey = function(shot){
    this.shotKey = shot;
};
Hero.prototype.setMoveKeys = function(up,left,down,right){
    this.moveUp = up;
    this.moveLeft = left;
    this.moveDown = down;
    this.moveRight = right;
};
Hero.prototype.setPropKeys = function(shotKey,shieldKey,SuperSkillKey) {
    this.shotKey = shotKey;
    this.shieldKey = shieldKey;
    this.SuperSkillKey = SuperSkillKey;
};
Hero.prototype.setHP = function(num){
    this.mHP = num;
};
Hero.prototype.setSpeed = function(Speed){
    this.kDelta = Speed;  
};
Hero.prototype.setPower = function(Power){
    this.mPower = Power;
};
Hero.prototype.setBulletSpeed = function(Speed){
    this.mBulletSpeed = Speed;
};
Hero.prototype.setBulletNum = function(Num){
    this.mBulletNum = Num;
};
Hero.prototype.setBlockTime = function(time){
    this.BlockTime = time;
};
Hero.prototype.increaseMissleNum = function(){
    this.mMissleNum = this.mMissleNum + 1; 
};
Hero.prototype.decreaseMissleNum = function(){
    this.mMissleNum = this.mMissleNum - 1; 
};
Hero.prototype.increaseShieldNum = function(){
    this.mShieldNum = this.mShieldNum + 1; 
};
Hero.prototype.decreaseShieldNum = function(){
    this.mShieldNum = this.mShieldNum - 1; 
};
Hero.prototype.increasePointNum = function(){
    this.mPointNum = this.mPointNum + 1; 
};

Hero.prototype.hitOnce = function() {
    this.mHit++;
};

Hero.prototype.getStatus = function(){
    return  "Hero Hit: " + this.mHit + 
            "  Num Destroy: " + this.mNumDestroy +
            "  Projectile: " + this.mProjectiles.size();
};

Hero.prototype._moveByKeys = function() {
    var xf = this.getXform();
    if (gEngine.Input.isKeyPressed(this.moveUp)&& xf.getYPos()< 120)
        xf.incYPosBy(this.kDelta);
    if (gEngine.Input.isKeyPressed(this.moveLeft)&& xf.getXPos()> 0)
        xf.incXPosBy(-this.kDelta);
    if (gEngine.Input.isKeyPressed(this.moveDown)&& xf.getYPos() > 0)
        xf.incYPosBy(-this.kDelta);
    if (gEngine.Input.isKeyPressed(this.moveRight) && xf.getXPos() < 100)
        xf.incXPosBy(this.kDelta);
};
Hero.prototype.getHP = function(){
    return this.mHP;
};

Hero.prototype.increaseHP = function(num){
    this.mHP = this.mHP + num;
};

Hero.prototype.decreaseHP = function(num){
    this.mHP = this.mHP - num;
};
Hero.prototype.getMissleNum = function(){
    return this.mMissleNum;
};
Hero.prototype.getShieldNum = function(){
    return this.mShieldNum;
};
Hero.prototype.getSuperSkillNum = function(){
    return this.mSuperSkillNum;
};
Hero.prototype.setType1 = function(){
    this.setHP(12);
    this.setSpeed(0.7);
    this.setPower(4);
    this.setBlockTime(60);
    this.setBulletSpeed(90);
    this.HeroType = 0;
};

Hero.prototype.setType2 = function(){
    this.setHP(6);
    this.setSpeed(1.4);
    this.setPower(1);
    this.setBlockTime(50);
    this.setBulletSpeed(130);
    this.HeroType = 1;
};

Hero.prototype.setType3 = function(){
    this.setHP(8);
    this.setSpeed(1.2);
    this.setPower(1);
    this.setBlockTime(30);
    this.setBulletSpeed(130);
    this.HeroType = 2;
};

Hero.prototype.setType4 = function(){
    this.setHP(10);
    this.setSpeed(1);
    this.setPower(2);
    this.setBlockTime(45);
    this.setBulletSpeed(115);
    this.HeroType = 3;
};
Hero.prototype.setPlayer1Keys = function(){
    this.setMoveKeys(
            gEngine.Input.keys.W,
            gEngine.Input.keys.A,
            gEngine.Input.keys.S,
            gEngine.Input.keys.D
    );//hero1的按键信息及属性dwsawds
    this.setPropKeys(
            gEngine.Input.keys.Shift,
            gEngine.Input.keys.Q,
             gEngine.Input.keys.E
    );
};

Hero.prototype.setPlayer2Keys = function(){
    this.setMoveKeys(
            gEngine.Input.keys.I,
            gEngine.Input.keys.J,
            gEngine.Input.keys.K,
            gEngine.Input.keys.L
    );//hero1的按键信息及属性
    this.setPropKeys(
            gEngine.Input.keys.Space,
            gEngine.Input.keys.U,
            gEngine.Input.keys.O
    );
};