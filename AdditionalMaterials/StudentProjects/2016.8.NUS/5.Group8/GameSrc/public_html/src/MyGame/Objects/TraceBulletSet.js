/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function TraceBulletSet(){
    GameObjectSet.call(this);
    this.kSpriteSheet =BulletTextureArrow;
    this.timeTick=0;
}
gEngine.Core.inheritPrototype(TraceBulletSet,GameObjectSet);

TraceBulletSet.prototype.update = function(hero,enemy){
    var x, y, d;
    x = hero.mHero.getXform().getXPos();//***********
    y = hero.mHero.getXform().getYPos();//***********
    this.timeTick++; //跟踪弹的频率
    if(this.timeTick>15){
    d = new TraceBullet(this.kSpriteSheet,x,y);
    this.addToSet(d);
    this.timeTick=0;
     }
    
    var i, obj;
       for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(enemy);
    }
};

TraceBulletSet.prototype.remove = function(enemy){
        var i, obj;
       for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        if (obj.hasExpired())
            this.removeFromSet(obj);
    }
    
    // update all objects
    for (i=0; i<this.size(); i++) {
        obj = this.getObjectAt(i);
        obj.update(enemy);
    }
};
