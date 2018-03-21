/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strick";

function TraceBullet(spriteTexture,x,y){
    this.width=4;  //子弹大小
    this.height=6;
    this.speed=0.3; //子弹的速度
    
    this.kDetectThreshold=10;
    this.kChaseThreshold=2 * this.kDetectThreshold;
    
    this.mTraceBullet = new SpriteRenderable(spriteTexture);
    this.mTraceBullet.setColor([1,1,1,0.1]);
    this.mTraceBullet.getXform().setPosition(x,y);
    this.mTraceBullet.getXform().setSize(this.width,this.height);
    
    GameObject.call(this,this.mTraceBullet);
    this.mExpired = false;
    this.setSpeed(this.speed);
    this.flyTick=0;
    
      var rigidShape = new RigidRectangle(this.getXform(), this.width, this.height);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(TraceBullet, GameObject);

TraceBullet.prototype.setExpired = function(){
    this.mExpired = true;
};

TraceBullet.prototype.hasExpired = function(){
    return this.mExpired;
};

TraceBullet.prototype.update = function(enemy){
    this._serviceChase(enemy);
    this.flyTick++;
};

TraceBullet.prototype._distToHero = function(enemy) {
    var toHero = [];
    vec2.subtract(toHero, enemy.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

TraceBullet.prototype._serviceChase = function(enemy) {
        
        
        if(this.flyTick>1000){ //跟踪弹的飞行距离
            this.setExpired();
            this.flyTick=0;
        }
        if (gEngine.Physics.processObjObj(this,enemy)) {
           enemy.hitOnce();
           this.setExpired();
           enemy.subHP(1);
        } else {
            // Give chase!
            this.mTargetPosition = enemy.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.05); // rotate rather quickly
            GameObject.prototype.update.call(this);
        }
   
};

