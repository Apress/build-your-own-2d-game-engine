/* global gEngine: false, GameObject: false, SpriteAnimateRenderable: false,
   vec2: false, BoundingBox: false */
"use strict";

function FloaterBoss(spriteSheet, posX, posY, initialState) {
    this.ogX = posX;
    this.ogY = posY;
    Boss.call(this, spriteSheet, posX, posY, 200);
    this.eFacing = {
        idle:0,
        left:1,
        right:2
    };
    
    this.activeState = {
        idle:0,
        setUpLeftDive:1,
        leftDive:2,
        setUpRightDive:3,
        rightDive:4,
        spawnMinions:5
    };
    this.currentState = initialState;
    this.nextState = initialState;
    
    this.mFacing = this.eFacing.idle;
    this.mPrev = -1;
    this.mRen.setAnimationSpeed(8);
    
    this.setState(0);
}
gEngine.Core.inheritPrototype(FloaterBoss, Boss);

// Sets which sprite or animated sequence to use on the sprite sheet
FloaterBoss.prototype._setSprite = function() {
    switch (this.mFacing) {
        case this.eFacing.idle:
            if(this.mPrev !== this.eFacing.idle){
                this.mRen.setSpriteSequence(128, 0, 48, 64, 3, 0);
                this.mPrev = this.eFacing.idle;
            }
            break;
                
        case this.eFacing.left:
            if(this.mPrev !== this.eFacing.left){
                this.mRen.setSpriteSequence(64, 0, 48, 64, 3, 0);
                this.mPrev = this.eFacing.left;
            }
            break;
        case this.eFacing.right:
            if(this.mPrev !== this.eFacing.right){
                this.mRen.setSpriteSequence(192, 0, 48, 64, 3, 0);
                this.mPrev = this.eFacing.right;
            }
            break;
        default:
            return;
    }
};

FloaterBoss.prototype.update = function(minionset, minionSheet, hero){
    //GameObject.prototype.update.call(this);
    
    var xform = this.getXform();
    // Bounding box
    this.mBoundBox.setPosition(xform.getPosition());

    this.timer++;
    this.executeState(minionset, minionSheet, hero);
    this._setSprite();
    this.mRen.updateAnimation();
    
        this.damageTimer++;
        if(this.damageTimer >= 90){
            this.damageTimer = 0;
            this.mRen.setColor([1, 1, 1, 0]);
        }
    
};

FloaterBoss.prototype.executeState = function(minionset, minionSheet, hero){
    if(this.timer > this.eventTime){
        this.pastState = this.currentState;
        this.currentState = this.nextState;
         this.setEventTime(4);
    }

    switch (this.currentState) {
        case this.activeState.idle:
            
                this.idle();
            
            break;
        case this.activeState.setUpLeftDive:
            
                this.setUpLeftDive(hero);
            
            break;
        case this.activeState.leftDive:
            
                this.leftDive();
            
            break;
        case this.activeState.setUpRightDive:
            
                this.setUpRightDive(hero);
            
            break;
        case this.activeState.rightDive:
            
                this.rightDive();
            
            break;
        case this.activeState.spawnMinions:
            if(this.currentState !== this.pastState){
                this.pastState = this.currentState;
                this.spawnMinions(this.getXform(), minionset, minionSheet);
            }
            break;
        default:
            return;
    }
};

FloaterBoss.prototype.idle = function(){
    if(this.speed !== this.ogSpeed){
        this.speed = this.ogSpeed;
        this.mRen.getXform().incRotationByRad(1);
    }
    this.setNextState(this.activeState.spawnMinions);
    this.moveTowards(this.ogX, this.ogY);
};

FloaterBoss.prototype.setUpLeftDive = function(hero){
    if(this.speed !== this.ogSpeed){
        this.speed = this.ogSpeed;
    }
    this.mFacing = this.eFacing.left;
    
    this.setNextState(this.activeState.leftDive);
    this.moveTowards(285, 75);
    //this.moveTowards(hero.getXform().getXPos() + 25, hero.getXform().getYPos());
};

FloaterBoss.prototype.leftDive = function(){
    if(this.speed === this.ogSpeed){
        this.speed *= 2;
        this.mRen.getXform().incRotationByRad(1);
    }
    this.setNextState(this.activeState.setUpRightDive);
    this.moveTowards(15, 75);
    //this.moveTowards(this.getXform().getXPos() - 25, this.getXform().getYPos());
};

FloaterBoss.prototype.setUpRightDive = function(hero){
    if(this.speed !== this.ogSpeed){
        this.speed = this.ogSpeed;
        this.mRen.getXform().incRotationByRad(-1);
    }
    this.mFacing = this.eFacing.right;
    
    this.setNextState(this.activeState.rightDive);
    this.moveTowards(15, 135);
    //this.moveTowards(hero.getXform().getXPos() + 25, hero.getXform().getYPos());
};

FloaterBoss.prototype.rightDive = function(){
    if(this.speed === this.ogSpeed){
        this.speed *= 2;
        this.mRen.getXform().incRotationByRad(-1);
    }
    
    this.setNextState(this.activeState.idle);
    this.moveTowards(285, 135);
    //this.moveTowards(this.getXform().getXPos() + 25, this.getXform().getYPos());
};

FloaterBoss.prototype.spawnMinions = function(xform, minionset, minionSheet){
    
    //console.log("Max hp: " + this.maxHP + " Current hp: " + this.mHP);
      for (var i = 0; i< 1+ ((this.maxHP - this.mHP) / 5); i++) {
       var xRand = Math.random() * 60;
       var yRand = Math.random() * 40;
       var m = new SphereMinion(minionSheet, (xform.getXPos() - 30) + xRand, xform.getYPos() - 20 + yRand);
       minionset.addToSet(m); 
    }
    this.setNextState(this.activeState.setUpLeftDive);
};

FloaterBoss.prototype.moveTowards = function(x, y){
    var xform = this.getXform();
    if(xform.getXPos() < x){
        xform.setXPos(xform.getXPos() + this.speed);
    };
    if(xform.getXPos() > x){
        xform.setXPos(xform.getXPos() - this.speed);
    };
    
    if(xform.getYPos() < y){
        xform.setYPos(xform.getYPos() + this.speed);
    };
    if(xform.getYPos() > y){
        xform.setYPos(xform.getYPos() - this.speed);
    };
    
};

FloaterBoss.prototype.bounceBack = function () {

};