

/* File: Hero.js 
 * Created By Camixxx
 * Creates and initializes the Hero ()
 * overrides the update function of GameObject to define
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable, gManager, SpriteAnimateRenderable: false */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Hero(renderableObj) {
 
    this.mRender = renderableObj;
  
    this.kXDelta = 0.2;
    this.kYDelta = 2.0;
    this.kMaxSpeed = 20;
    this.mGravity = -1.5;
    
    //动画
    this.mRender.setColor([1, 1, 1, 0]);
    this.mRender.getXform().setSize(3,3);
    this.mRender.getXform().setYPos(4);
    this.mRender.setSpriteSequence(128, 0,
                                102.4, 102,
                                5,
                                0);
    this.mRender.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mRender.setAnimationSpeed(10);
    
    GameObject.call(this,this.mRender);
    
    //刚体
    this.mRigid = new RigidCircle(this.mRender.getXform(), 1.5);
    this.mRigid.setMass(1.0);  // less dense than Minions
    this.mRigid.setRestitution(0);
    
    this.setPhysicsComponent(this.mRigid);   
}

gEngine.Core.inheritPrototype(Hero, GameObject);
Hero.prototype.update = function () {
    
    //超出屏幕死亡
    if(this.getXform().getXPos()< -20 || this.getXform().getYPos()< -10 || this.getXform().getYPos()> 10){
        this.Die();
    }
    
    //和红色 碰撞则死亡
    for( var i =0 ;i < gManager.ObjectPool.getObjectsByLayer(5).length;i++){
        var ob=gManager.ObjectPool.getObjectsByLayer(5)[i];
        if(this.getBBox().intersectsBound(ob.getBBox())) {
            this.Die();
        }
    }
    
    //前后速度控制
    var v = this.getPhysicsComponent().getVelocity();
    if ( gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        v[0] = -8;
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D )) {
        if(this.getXform().getXPos() < 10){
           v[0] = 8;
        }
    }
    
    if(this.getXform().getXPos() > 10){
          v[0] = -5;
    }
    
    //绘制动画
    this.mRender.updateAnimation();
    GameObject.prototype.update.call(this);
};
Hero.prototype.draw = function (camera) {
    
    GameObject.prototype.draw.call(this,camera);
};
 Hero.prototype.Die = function () {
     
   gEngine.GameLoop.stop();
};

Hero.prototype.Jump = function () { // y: current Ypos ,hight: the hight to jump
    var v = this.getPhysicsComponent().getVelocity(); 
    if(Math.abs(v[1]) < 3){
        v[1] = 13 * (-this.mGravity);
    }

};
     
Hero.prototype.antiJump= function () {  
   var g = this.getPhysicsComponent().getAcceleration();
   var g1 = [g[0], -g[1]];
   this.getPhysicsComponent().setAcceleration(g1);
   
   var w= this.getXform().getWidth();
   this.getXform().setWidth(-w);
   
   if(this.mGravity < 0){
     this.getXform().setRotationInDegree(180);    
    }else{
     this.getXform().setRotationInDegree(0);
    }
    this.mGravity = -this.mGravity ;
};
