/* File: Bullet.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Bullet.kSpeed = 100 / (0.8 * 60);  
        // across the entire screen in 0.5 seconds


function Bullet(x, y,power,damage,bulletTexture) {
    //子弹大小
    this.bulletWidth = 4;
    this.bulletHeight = 4;
    this.BulletTexture=bulletTexture;
    this.mPower = power;
    this.damage=damage;
            
    //子弹属性
    var r = new TextureRenderable(this.BulletTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.bulletWidth, this.bulletHeight);
    GameObject.call(this, r);
    
    //子弹方向
    this.setCurrentFrontDir([1, 0]);
    this.setSpeed(Bullet.kSpeed);
    // Expired 初始化为假
    this.mExpired = false;
    

}
gEngine.Core.inheritPrototype(Bullet, GameObject);

//子弹过期
Bullet.prototype.setExpired = function() {
    this.mExpired = true;
};

Bullet.prototype.hasExpired = function() {
    return this.mExpired;
};

//子弹更新
Bullet.prototype.update = function(hero,enemy, aCamera) {
    GameObject.prototype.update.call(this);
    var hit = false;
    
    //子弹出了边界就消失
    if (aCamera.collideWCBound(this.getXform(), 1.1) !== 
            BoundingBox.eboundCollideStatus.eInside)
            this.setExpired();
    
    
    var p = vec2.fromValues(0, 0);
    
    //子弹击中英雄就消失
        if (this.pixelTouches(enemy, p)) {
            this.setExpired();
            gEngine.AudioClips.playACue(enemy.sound)
            hit = true;
            enemy.HP-=this.damage;
            ;
            //
            //此处增添被击中英雄的行为
            //
            var Velocity = enemy.getPhysicsComponent().getVelocity();
            var Direction = this.getCurrentFrontDir();
            Velocity[0] += (Direction[0] * this.mPower); 

            
        }
    
    
    return hit;
};