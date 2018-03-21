/* File: DyePack.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObjectSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BulletSet(texture) {
    GameObjectSet.call(this);
    
    //子弹属性
    this.BulletTexture=texture;//默认皮肤
    this.power=20;//默认威力
    this.damage=2;//默认伤害
}
gEngine.Core.inheritPrototype(BulletSet, GameObjectSet);

BulletSet.prototype.update = function(hero,enemy,aCamera) {
    // 删除子弹集中所有已过期的子弹
    var i, obj;
    var numHit = 0;
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // 统计击中的子弹
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.update(hero,enemy, aCamera))
            numHit++;
    }
    return numHit;
};

//在子弹集中新建子弹
BulletSet.prototype.newAt = function(pos,direction) {
    var p = new Bullet(pos[0], pos[1],this.power,this.damage,this.BulletTexture);
    p.setCurrentFrontDir(direction);
    this.addToSet(p);
};
