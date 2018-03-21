/* File: Bullet.js 
 *
 * Creates and initializes the Bullet (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bullet(spriteTexture, atX, atY, lgtSet, targetPos) {
    this.kDelta = 0.1;
    this.kWidth = 1;
    this.kHeight = 0.5;
    
    this.mBullet = new LightRenderable(spriteTexture);
    this.mBullet.setColor([1, 1, 1, 0]);
    this.mBullet.getXform().setPosition(atX, atY);
    //this.mBullet.getXform().setZPos(1);
    this.mBullet.getXform().setSize(this.kWidth, this.kHeight);

    var transform = new Transform();
    transform.setPosition(this.mBullet.getXform().getXPos(), this.mBullet.getXform().getYPos() - this.kHeight / 2);

    //this.setFrontDir(frontDir);
    GameObject.call(this, this.mBullet);

    this.lifeSpan = 50;
    this.rotateObjPointTo(targetPos,1);
    this.mMiniMapRenderable = new Renderable();
    this.mMiniMapRenderable.setColor([0,0,1,1]);
     
}
gEngine.Core.inheritPrototype(Bullet, GameObject);

Bullet.eBulletState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});

Bullet.prototype.destroy = function(){
    return this.lifeSpan < 0;
}


Bullet.prototype.update = function () {
      this.lifeSpan--;
      
      var pos = this.getXform().getPosition();
      vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), 0.08); 
   // var activeCount = 0;
    //var first
  //  this.mBullet.getXform().cloneTo(this.mMiniMapRenderable.getXform());
/*
    if(this.mWaypoint.length == 0){
  

        var deltaX = Math.pow(this.getXform().getPosition()[0] - this.mCarrierRef.getPosition()[0], 2);
        var deltaY = Math.pow(this.getXform().getPosition()[1]- this.mCarrierRef.getPosition()[1], 2);
        var dist = Math.sqrt(deltaX + deltaY);
        var targetPos = this.mCarrierRef.getPosition();
        for(var i = 0; i < this.mEnemyList.length; i++){
            var deltaX = Math.pow(this.getXform().getPosition()[0] - this.mEnemyList[i].getXform().getPosition()[0], 2);
            var deltaY = Math.pow(this.getXform().getPosition()[1]- this.mEnemyList[i].getXform().getPosition()[1], 2);
            var tempDist = Math.sqrt(deltaX + deltaY);
            if(tempDist<dist){
                targetPos = this.mEnemyList[i].getXform().getPosition();
                dist = tempDist;
            }
            else{
                
            }
        }
            
      
        /* Casey's reference, dont delete
        if(targetPos === this.mCarrierRef.getPosition() &&  dist < 3){
            //this.rotateObjPointAway(this.mCarrierRef.getPosition(), 1);
        }
        else if(targetPos[0] == this.mCarrierRef.getPosition()[0] && targetPos[1] == this.mCarrierRef.getPosition()[1]){
            this.rotateObjPointTo(this.mCarrierRef.getPosition(), 1);
        }
        else{
            this.rotateObjPointTo(targetPos, 1);
        }
        *//*
        if(targetPos === this.mCarrierRef.getPosition() &&  dist < 3){
            this.rotateObjPointAway(this.mCarrierRef.getPosition(), 1);
        }
        else if(targetPos[0] == this.mCarrierRef.getPosition()[0] && targetPos[1] == this.mCarrierRef.getPosition()[1]){
            this.rotateObjPointTo(this.mCarrierRef.getPosition(), 1);
        }
        else{
            if(dist < 2){
                
            }
            else{
                this.rotateObjPointTo(targetPos, 1);
            }
        }
    }
    else{
        var deltaX = Math.pow(this.getXform().getPosition()[0] - this.mWaypoint[0].getXform().getPosition()[0], 2);
        var deltaY = Math.pow(this.getXform().getPosition()[1]- this.mWaypoint[0].getXform().getPosition()[1], 2);
        var dist = Math.sqrt(deltaX + deltaY);
        if(dist < .1){
            //this.mWaypoint[0].deactivate();
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors,this.mWaypoint[0]);
            this.mWaypoint.shift();
        }
        else{
            this.rotateObjPointTo(this.mWaypoint[0].getXform().getPosition(), 1);
        }
    }
    
    var pos = this.getXform().getPosition();
    
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), 0.04); 
  */  
};

Bullet.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
   // this.mJumpBox.draw(aCamera);
};


