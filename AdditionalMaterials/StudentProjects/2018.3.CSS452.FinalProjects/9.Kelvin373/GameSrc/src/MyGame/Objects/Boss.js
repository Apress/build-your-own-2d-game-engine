/* global gEngine: false, GameObject: false, SpriteAnimateRenderable: false,
   vec2: false, BoundingBox: false */
"use strict";

/*
 * Class: Boss.js
 * 
 * -generic class to represent our boss
 * If you want to add more states use the addState() method which takes a state function as the parameter
 * It is important that the method updates nextState and sets it to the what the next state should be
 * 
 * @param spriteSheet: bosses spritesheet used for animations
 * @param posX: posX in world coordinates
 * @param posY: posY in world coordinates
 * @param hp: the hp the boss has
 *** NOTE: Child classes should override _setSprite() method
 */


function Boss(spriteSheet, posX, posY, hp) {
    this.ogSpeed = .6;
    this.speed = this.ogSpeed;
    this.timer = 0;
    this.eventTime = 0;
    this.dmgTimer = 0;
    
    this.events = [0,1,2,3,4,5,6,7,8,9,10];
    
    this.state_idle = 0;    
    this.currentState = this.state_idle;
    this.nextState = this.state_idle;
    this.pastState = -1;
    
    // Hit Points
    this.maxHP = hp;
    this.mHP = hp;


    //boss Iframes
    this.damageTimer = null;
    //this.mInvincible = false;
    
    //the animation
    this.mRen = new SpriteAnimateRenderable(spriteSheet);
    this.mRen.setColor([1, 1, 1, 0]);
    this.mRen.getXform().setPosition(posX, posY);
    var width = 10;
    var height = 20;
    this.mRen.getXform().setSize(width, height);
    //Default, might want to change this
    this.mRen.setSpriteSequence(256, 0, 32, 64, 0, 0);
    this.mRen.setAnimationType(
        SpriteAnimateRenderable.eAnimationType.eAnimateRight
    );
    this.mRen.setAnimationSpeed(5);
    //we are a game object
    GameObject.call(this, this.mRen);
    
   // var rigidBody = new RigidRectangle(this.mRen.getXform(), width / 2, height);
        //rigidBody.setMass(0);
    //this.setRigidBody(rigidBody);
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
    
    this.mBoundBox = new BoundingBox(
        vec2.fromValues(posX, posY),
        width / 2,
        height
    );
    
    // Status flags
    // standing on a Platform (being "on the ground")
    this.mOnGround = false;
    // Facing left or right
    this.eFacing = Object.freeze({
        left:0,
        right:1
    });
    this.mFacing = this.eFacing.left;
    // Walking
    this.mPrevLeftWalking = false;
    this.mPrevRightWalking = false;
    this.mLeftWalking = false;
    this.mRightWalking = false;
}
gEngine.Core.inheritPrototype(Boss, GameObject);

// Sets which sprite or animated sequence to use on the sprite sheet
//Prolly want to rewrite manually for each boss
Boss.prototype._setSprite = function() {
    //Override in child classes
};

//Register that the boss has taken damage
Boss.prototype.registerDamage = function (damageTaken) {
    //if(!this.mInvincible){
        this.mHP -= damageTaken;
        this.damageTimer = Date.now();
       // this.mInvincible = true;
       
        this.mRen.setColor([1, 0, 0, .5]);

    //}
};


Boss.prototype.setNextState = function(state){
    this.nextState = state;
};

Boss.prototype.setState = function(state){
    this.currentState = state;
};

Boss.prototype.setEventTime = function(seconds){
    this.eventTime = this.timer + (seconds * 60);
};

Boss.prototype.isDead = function(){
    return this.mHP <= 0;
};

Boss.prototype.getHealth = function(){
  return this.mHP;  
};
