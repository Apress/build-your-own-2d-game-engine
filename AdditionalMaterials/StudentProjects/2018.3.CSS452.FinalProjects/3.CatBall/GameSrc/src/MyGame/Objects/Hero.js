/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, spriteJSON, x, y, playerNum) {
    //this.animationChanged = true;
    this.playerNum = playerNum;
    this.startX = x;
    this.startY = y;
    
    this.xVel = 0;
    this.yVel = 0;
    this.kDelta = 5;
    this.maxSpeed = 15;
    //this.canJump = false;
    this.jumping = false;
    //this.holding = true;
    this.catBall = null;
    
    // player 1 faces the right, player 2 starts facing left
    this.facingRight;
    if(playerNum == 1){
        this.facingRight = true;
    } else if(playerNum = 2){
        this.facingRight = false;
    }
    
    var JSONParse = new JSONSpriteParser(spriteJSON, spriteTexture);
    this.currentAnimation = new SpriteAnimateRenderable(spriteTexture);
    
    if(this.playerNum == 1){
        this.currentAnimation.setColor([1, 0, 0, 0]);
    } else if(playerNum = 2){
        this.currentAnimation.setColor([0, 0, 1, 0]);
    }
    //this.currentAnimation.setColor([1, 1, 1, 0]);
    this.currentAnimation.getXform().setPosition(x, y);
    this.currentAnimation.getXform().setSize(4, 4);

    this.frameArray = JSONParse.mSpriteJSON.frames;
    this.currentAnimation.setSpriteSequence(
            1024 - this.frameArray[0].frame.y,
            this.frameArray[0].frame.x,
            128,
            128,
            this.frameArray[0].frame.w / 128,
            0 //no padding
            );
    this.currentAnimation.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.currentAnimation.setAnimationSpeed(20);
    GameObject.call(this, this.currentAnimation);
    
    
    
    // create and draw the rigidbody
    //var r = new RigidRectangle(this.getXform(), 3, 3);
    var r = new RigidCircle(this.getXform(), 2);
    r.setMass(5);
    r.setRestitution(0.1);
    r.setInertia(0.01);
    this.setRigidBody(r);
    //this.toggleDrawRigidShape();
    //this.gameOver = false;
    
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.resetPlayer = function(){
    this.getRigidBody().setVelocity(0, 0);
    this.getXform().setPosition(this.startX, this.startY);
    //this.gameOver = true;
    this.catBall.state = "held";
    
    if(this.playerNum == 1){
        this.catBall.throwAngle = 60;
        this.facingRight = true;
    } else if (this.playerNum == 2){
        this.catBall.throwAngle = 120;
        this.facingRight = false;
    }
    //this.dance = true;
}


Hero.prototype.setCatBall = function(catball){
    this.catBall = catball;
}

Hero.prototype.update = function () {
    //console.log(this.getRigidBody().getVelocity()[0]);
    
    if(this.xVel > 0){
        this.xVel -= this.kDelta / 2;
    } else if (this.xVel < 0){
        this.xVel += this.kDelta / 2;
    }
    
    if(this.getRigidBody().getVelocity()[0] < 0.5 && this.getRigidBody().getVelocity()[0] > -0.5){
        this.updateAnimationStatus();
    }
    
    this.currentAnimation.updateAnimation();
    this.getRigidBody().setAngularVelocity(0);
    this.yVel = this.getRigidBody().getVelocity();
    
    GameObject.prototype.update.call(this);
};

Hero.prototype.updateAnimationStatus = function(){
    // uncomment this to see states
    /*
    if(this.playerNum == 1){
        //console.log("jumping: " + this.jumping + ", facingRight: " + this.facingRight
        //        + " holding: " + this.catBall.isHeld());
        console.log(this.xVel);
        
    }
    */
    
   
    
    if (!this.jumping && this.facingRight && this.catBall.isHeld() &&
            this.getRigidBody().getVelocity()[0] < 0.5 && this.getRigidBody().getVelocity()[0] > -0.5){
        this.changeAnim(2);
    } else if (!this.jumping && this.facingRight && !this.catBall.isHeld() &&
            this.getRigidBody().getVelocity()[0] < 0.5 && this.getRigidBody().getVelocity()[0] > -0.5){
        this.changeAnim(3);
    } else if (!this.jumping && !this.facingRight && !this.catBall.isHeld() &&
            this.getRigidBody().getVelocity()[0] < 0.5 && this.getRigidBody().getVelocity()[0] > -0.5){
        this.changeAnim(1);
    } else if (!this.jumping && !this.facingRight && this.catBall.isHeld() &&
            this.getRigidBody().getVelocity()[0] < 0.5 && this.getRigidBody().getVelocity()[0] > -0.5){
        this.changeAnim(0);
    } else if(this.jumping && this.facingRight && this.catBall.isHeld()){
        this.changeAnim(5);
    } else if (this.jumping && this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(7);
    } else if (this.jumping && !this.facingRight && this.catBall.isHeld()){
        this.changeAnim(4);
    } else if (this.jumping && !this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(6);
    } else if (!this.jumping && this.facingRight && this.catBall.isHeld()){
        this.changeAnim(11);
    } else if (!this.jumping && !this.facingRight && this.catBall.isHeld()){
        this.changeAnim(9);
    } else if (!this.jumping && this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(10);
    } else if (!this.jumping && !this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(8);
    } 
    
}

Hero.prototype.changeAnim = function(i){
    this.currentAnimation.setSpriteSequence(
            1024 - this.frameArray[i].frame.y,
            this.frameArray[i].frame.x,
            128,
            128,
            this.frameArray[i].frame.w / 128,
            0 //no padding
            );
    
    if(i >=8){
        this.currentAnimation.setAnimationSpeed(10);
    } else {
        this.currentAnimation.setAnimationSpeed(20);
    }
}

Hero.prototype.draw = function(aCamera){
    //this.currentAnimation.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);
};

// Taken from Otto on Stack overflow:
// https://stackoverflow.com/a/11409944
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

Hero.prototype.moveLeft = function(){
    var changeAnim = false;
    if(this.facingRight){
        changeAnim = true;
        //this.changeThrowDirection();
    }
    
    if(changeAnim){
        this.xVel = 0;
        //changeAnim = false;
    }
    
    var lastVel = this.xVel;
    this.xVel -= this.kDelta;
    if(this.xVel <= -0.5 && lastVel > -0.5){
        changeAnim = true;
    }
    //this.xVel.Clamp(0, this.maxSpeed)
    //this.getXform().incXPosBy(-this.kDelta);
    //var yVel = this.getRigidBody().getVelocity();
    this.getRigidBody().setVelocity(clamp(this.xVel, -this.maxSpeed, this.maxSpeed), this.yVel[1]);
    this.facingRight = false;
    
    //adjustPositionBy = function(v, delta) {
    //this.getRigidBody().adjustPositionBy(this.getXform().getPosition(), this.kDelta);
    if(changeAnim){
        this.updateAnimationStatus();
        //this.changeThrowDirection();
        //this.changedDirection();
    }
};

Hero.prototype.moveRight = function(){
    var changeAnim = false;
    if(!this.facingRight){
        changeAnim = true;
        //this.changeThrowDirection();
    }
    
    if(changeAnim){
        this.xVel = 0;
    }
    
    var lastVel = this.xVel;
    this.xVel += this.kDelta;
    if(this.xVel >= 0.5 && lastVel < 0.5){
        changeAnim = true;
    }
    //this.xVel.Clamp(0, this.maxSpeed)
    //this.getXform().incXPosBy(this.kDelta);
    //console.log(this.getRigidBody());
    //var yVel = this.getRigidBody().getVelocity();
    this.getRigidBody().setVelocity(clamp(this.xVel, -this.maxSpeed, this.maxSpeed), this.yVel[1]);
    this.facingRight = true;
    
    if(changeAnim){
        this.updateAnimationStatus();
        
    }
};

Hero.prototype.changeThrowDirection = function(){
    if(this.catBall.throwAngle > 90){
        var a = this.catBall.throwAngle - 90;
        this.catBall.throwAngle = 90 - a;
    } else if(this.catBall.throwAngle < 90){
        var a = 90 - this.catBall.throwAngle;
        this.catBall.throwAngle = 90 + a;
    }
}

Hero.prototype.updateJumpStatus = function(gameObjectSet){
    var prevJump = this.jumping;
    this.jumping = !this.canJump(gameObjectSet);
    
    if(prevJump != this.jumping){
        this.updateAnimationStatus();
    }
}

Hero.prototype.jump = function(gameObjectSet){
    if(this.canJump(gameObjectSet)){
        this.jumping = true;
        this.getRigidBody().setVelocity(0, 26);
        
        // the player just jumped so update the animation status
        this.updateAnimationStatus();
    }
};

Hero.prototype.canJump = function(gameObjectSet){
    var tempPlayerBox = this.getBBox();
    tempPlayerBox.mLL[1] -= 0.3;
    
    var canJump = false;
    for(var i = 0; i < gameObjectSet.mSet.length; i++){
        //var temp = gameObjectSet.mSet[i].getBBox();
        if(gameObjectSet.mSet[i] != this){
            var temp = gameObjectSet.mSet[i].getBBox();
            //console.log(this.getBBox().boundCollideStatus(temp));
            if(tempPlayerBox.boundCollideStatus(temp) != 0){
                canJump = true;
            }
        }
    }
    return canJump;
}