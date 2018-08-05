/* File: FirstHero.js
 *
 * Creates and initializes the FirstHero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FirstHero(spriteTexture, posX, posY) {
    this.kDelta = 3;
    this.kWidth = 24;
    this.kHeight = 48;
    this.mHp = 200;
    
    this.mDye = new SpriteAnimateRenderable("assets/First_Hero.png");
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(posX, posY);
    this.mDye.getXform().setZPos(1);
    this.mDye.getXform().setSize(this.kWidth, this.kHeight);
    
    this.mHeroState = FirstHero.eHeroState.eRunRight;
    this.mPreviousHeroState = FirstHero.eHeroState.eRunLeft;
    this.mIsMoving = false;
    this.mCanJump = false;


    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mDye.setAnimationSpeed(2);         // show each element for mAnimSpeed updates

    var transform = new Transform();
    transform.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(false);

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kWidth / 1.9, this.kHeight);
    r.setMass(0.7);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);
    /*********************************************///bullet_lib
    this.direct = 0;
    this.sGun = "assets/"+"gun_black.png";
    this.bullet_lib = new bullet_lib(this.sGun, this.getXform(), this.eHeroState);
    this.attack_status = true;
}
gEngine.Core.inheritPrototype(FirstHero, GameObject);

FirstHero.eHeroState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});

FirstHero.prototype.update = function () {
    GameObject.prototype.update.call(this);

    this.mJumpBox.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    /**********************************************///music
    this.Jump =  "assets/"+"jump.wav";
    
    
    /*********************************************///weapon
    this.bullet_lib.update_position(this.getXform(), this.direct);
    // control by WASD
    var xform = this.getXform();
    this.mIsMoving = false;
    var v = this.getPhysicsComponent().getVelocity();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = FirstHero.eHeroState.eRunLeft;
            this.mIsMoving = true;
            
        }
        else {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = FirstHero.eHeroState.eJumpLeft;
            
        }
        xform.incXPosBy(-this.kDelta);
        this.direct = 1;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = FirstHero.eHeroState.eRunRight;
            this.mIsMoving = true;
            
        }
        else {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = FirstHero.eHeroState.eJumpRight;
            
        }
        xform.incXPosBy(this.kDelta);
        this.direct = 0;
    }


    if (this.mCanJump === true) {
        if (this.mIsMoving === false) {
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === FirstHero.eHeroState.eRunRight || this.mHeroState === FirstHero.eHeroState.eJumpRight)
                this.mHeroState = FirstHero.eHeroState.eFaceRight;
            if (this.mHeroState === FirstHero.eHeroState.eRunLeft || this.mHeroState === FirstHero.eHeroState.eJumpLeft)
                this.mHeroState = FirstHero.eHeroState.eFaceLeft;
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            v[1] = 500; // Jump velocity
            gEngine.AudioClips.playACue(this.Jump);
            this.mJumping=true;
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === FirstHero.eHeroState.eRunRight
                || this.mHeroState === FirstHero.eHeroState.eFaceRight)
                this.mHeroState = FirstHero.eHeroState.eJumpRight;
            if (this.mHeroState === FirstHero.eHeroState.eRunLeft
                || this.mHeroState === FirstHero.eHeroState.eFaceLeft)
                this.mHeroState = FirstHero.eHeroState.eJumpLeft;
            this.mIsMoving = true;
            this.mJumpSkip=true;
        }
    }
    /**************************************///weapon
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)||gEngine.Input.isKeyPressed(gEngine.Input.keys.K))
    {
        var Pos_x = this.bullet_lib.position.getXPos();
        var Pos_y = this.bullet_lib.position.getYPos();
        
        this.bullet_lib.fire(Pos_x, Pos_y,this.direct);
        //fire_xpos_ypos_direction
        //fire_111_222_1

        var fireString;
        fireString = "fire_" + String(Pos_x) + "_" + String(Pos_y) + "_" +String(this.direct);
        gEngine.Network.send(fireString);
    }
    
    this.changeAnimation();
    this.mDye.updateAnimation();
    this.mIsMoving = false;
    this.mCanJump = false;

};

FirstHero.prototype.changeAnimation = function () {
    
    
    if (this.mHeroState !== this.mPreviousHeroState) {
        switch (this.mHeroState) {
            case FirstHero.eHeroState.eFaceLeft:
                this.mDye.setSpriteSequence(128, 0, 64, 128, 1, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case FirstHero.eHeroState.eFaceRight:
                this.mDye.setSpriteSequence(128, 0, 64, 128, 1, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case FirstHero.eHeroState.eRunLeft:
                this.mDye.setSpriteSequence(128, 64, 64, 128, 4, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(10);
                break;
            case FirstHero.eHeroState.eRunRight:
                this.mDye.setSpriteSequence(128, 64, 64, 128, 4, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(10);
                break;
            case FirstHero.eHeroState.eJumpLeft:
                this.mDye.setSpriteSequence(128, 320, 64, 128, 1, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
            case FirstHero.eHeroState.eJumpRight:
                this.mDye.setSpriteSequence(128, 320, 64, 128, 1, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
        }
    }

};

FirstHero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

FirstHero.prototype.canJump = function (b) {
    this.mCanJump = b;
};

FirstHero.prototype.getJumpBox = function () {
    return this.mJumpBox;
};
FirstHero.prototype.SetStatus = function(status){
    this.bullet_lib.SetStatus(status);
};
FirstHero.prototype.can_attack = function(){
    this.attack_status = true;
};
FirstHero.prototype.Add_Hp = function(Hp){
    this.mHp += Hp;
    if(this.mHp > 200)
    {
        this.mHp = 200;
    }
};


