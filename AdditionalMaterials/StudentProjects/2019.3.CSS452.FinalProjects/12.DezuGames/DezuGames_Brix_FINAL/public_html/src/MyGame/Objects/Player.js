/* global gEngine, GameObject */

"use strict";

function Player(){
    this.mIsFalling = true;
    this.mPlayerMoveSpd = .4;//right and left player movement
    
    this.mPlayerObj = new Renderable();
    this.mPlayerObj.setColor([1,0,0,1]);
    this.mPlayerObj.getXform().setSize(5,5);
    //TODO @@@@@@@@@@@ set position back 
    this.mPlayerObj.getXform().setPosition(50,40);
    this.mOrigX = 50;
    this.mShake = false;
    this.mShaker = new ShakePosition(4,0,10,40);
    this.mPlayerSuccess = false; //if player reaches end or dies, change to proper scene
    this.mChangeScene = false;
    GameObject.call(this,this.mPlayerObj);
    var xf = this.getXform();
    var r = new RigidRectangle(xf,5,5);
    this.setRigidBody(r);

    r.setMass(1);
    r.setRestitution(0);
    r.setFriction(0);
    this.mOtherRenders = [];
    this.mOtherRenders[0] = new Renderable();
    this.mOtherRenders[0].setColor([1,1,1,1]);
    this.mOtherRenders[0].getXform().setSize(4,4);
    this.mOtherRenders[0].getXform().setPosition(50,40);
    this.mOtherRenders[1] = new Renderable();
    this.mOtherRenders[1].setColor([1,0,0,1]);
    this.mOtherRenders[1].getXform().setSize(3,3);
    this.mOtherRenders[1].getXform().setPosition(50,40);
    this.mOtherRenders[2]= new Renderable();
    this.mOtherRenders[2].setColor([1,1,1,1]);
    this.mOtherRenders[2].getXform().setSize(2,2);
    this.mOtherRenders[2].getXform().setPosition(50,40);
    this.mOtherRenders[3]= new Renderable();
    this.mOtherRenders[3].setColor([1,0,0,1]);
    this.mOtherRenders[3].getXform().setSize(1,1);
    this.mOtherRenders[3].getXform().setPosition(50,40);
}
gEngine.Core.inheritPrototype(Player,GameObject);

Player.prototype.update = function(){
    if(!this.mShaker.shakeDone()&&this.mShake){
        var center = this.mShaker.getShakeResults();
        this.getXform().setXPos(center[0]+this.mOrigX);
    }else{
        this.getRigidBody().setAngularVelocity(0);
        GameObject.prototype.update.call(this);
        var xform = this.getXform();
     
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
            xform.incXPosBy(this.mPlayerMoveSpd);
        }
        if(gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
            xform.incXPosBy(-this.mPlayerMoveSpd);
        }
        if(!this.mIsFalling){
            if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
                this.getRigidBody().setVelocity(0,45);
            }
        }
        this.mOrigX = xform.getXPos();
        this.mIsFalling = true;
    }
    var c = this.getXform().getPosition();
    this.mOtherRenders[0].getXform().setPosition(c[0],c[1]);
    this.mOtherRenders[1].getXform().setPosition(c[0],c[1]);
    this.mOtherRenders[2].getXform().setPosition(c[0],c[1]);
    this.mOtherRenders[3].getXform().setPosition(c[0],c[1]);
};

Player.prototype.getSuccess = function(){
    return this.mPlayerSuccess;
};

Player.prototype.isAlive = function(spikeSet,wcX,wcY,targetX,ghost, ghostEnabled){
   var status = [];
   var xform = this.getXform();
   var playBox = this.getBBox();
   var i;
   for(i=0;i<spikeSet.length;i++){
       var platXform = spikeSet[i].getXform();
       var platBox = new BoundingBox(platXform.getPosition(),platXform.getWidth(),platXform.getHeight());
       status[i] = platBox.boundCollideStatus(playBox);
   }
   
   if(ghostEnabled) {
        var gX = ghost.getXform();
        var gBox = new BoundingBox(gX.getPosition(),gX.getWidth(),gX.getHeight());
        var gStatus = gBox.boundCollideStatus(playBox);
        if(gStatus!==0){
            this.mChangeScene= true;
            this.mPlayerSuccess = false;
        }
   }
   
   for(i=0;i<status.length;i++){
       if(status[i]!==0){
           this.mChangeScene = true;
           this.mPlayerSuccess = false;
       }
   }
   var bottom = wcY - (xform.getHeight()/2);
   if(xform.getYPos()<bottom){
       this.mChangeScene = true;
       this.mPlayerSuccess = false;
   }
   var left = wcX - (xform.getWidth()/2);
   if(xform.getXPos()<left){
       this.mChangeScene = true;
       this.mPlayerSuccess = false;
   }
   if(xform.getXPos()>=targetX){
       this.mChangeScene = true;
       this.mPlayerSuccess = true;
   }
   if(!this.mPlayerSuccess && this.mChangeScene){
       this.mShake = true;
       ghost.setSpeed(0);
   }
   return this.mChangeScene;
};

Player.prototype.setFall = function(jump){
    this.mIsFalling = jump;
};

Player.prototype.shakeOver = function(){
    return this.mShaker.shakeDone();
};

Player.prototype.draw = function(cam){
    this.mPlayerObj.draw(cam);
    this.mOtherRenders[0].draw(cam);
    this.mOtherRenders[1].draw(cam);
    this.mOtherRenders[2].draw(cam);
    this.mOtherRenders[3].draw(cam);
};