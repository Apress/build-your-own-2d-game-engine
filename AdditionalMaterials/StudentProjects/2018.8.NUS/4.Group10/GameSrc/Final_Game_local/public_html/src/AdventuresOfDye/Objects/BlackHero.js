/* File: BlackHero.js
 *
 * Creates and initializes the BlackHero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BlackHero(spriteTexture) {
    this.kDelta = 3;
    this.kWidth = 24;
    this.kHeight = 48;
    this.mHp = 200;
    
    this.mDye = new SpriteAnimateRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(350, 380);
    this.mDye.getXform().setZPos(1);
    this.mDye.getXform().setSize(this.kWidth, this.kHeight);
    
    this.mHeroState = BlackHero.eHeroState.eRunRight;
    this.mPreviousHeroState = BlackHero.eHeroState.eRunLeft;
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
    this.direct = null;
    this.sGun = "assets/"+"gun_black.png";
    this.bullet_lib = new bullet_lib(this.sGun, this.getXform(), this.eHeroState);
    this.attack_status = true;
}
gEngine.Core.inheritPrototype(BlackHero, GameObject);

BlackHero.eHeroState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});

BlackHero.prototype.update = function () {
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
            this.mHeroState = BlackHero.eHeroState.eRunLeft;
            this.mIsMoving = true;
            this.direct = 1;
        }
        else {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = BlackHero.eHeroState.eJumpLeft;
            this.direct = 1;
        }
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = BlackHero.eHeroState.eRunRight;
            this.mIsMoving = true;
            this.direct = 0;
        }
        else {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = BlackHero.eHeroState.eJumpRight;
            this.direct = 0;
        }
        xform.incXPosBy(this.kDelta);
    }


    if (this.mCanJump === true) {
        if (this.mIsMoving === false) {
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === BlackHero.eHeroState.eRunRight || this.mHeroState === BlackHero.eHeroState.eJumpRight)
                this.mHeroState = BlackHero.eHeroState.eFaceRight;
            if (this.mHeroState === BlackHero.eHeroState.eRunLeft || this.mHeroState === BlackHero.eHeroState.eJumpLeft)
                this.mHeroState = BlackHero.eHeroState.eFaceLeft;
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            v[1] = 500; // Jump velocity
            gEngine.AudioClips.playACue(this.Jump);
            this.mJumping=true;
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === BlackHero.eHeroState.eRunRight
                || this.mHeroState === BlackHero.eHeroState.eFaceRight)
                this.mHeroState = BlackHero.eHeroState.eJumpRight;
            if (this.mHeroState === BlackHero.eHeroState.eRunLeft
                || this.mHeroState === BlackHero.eHeroState.eFaceLeft)
                this.mHeroState = BlackHero.eHeroState.eJumpLeft;
            this.mIsMoving = true;
            this.mJumpSkip=true;
        }
    }
    /**************************************///weapon
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.F)||gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
    {
        this.bullet_lib.fire();
    }
    
    this.changeAnimation();
    this.mDye.updateAnimation();
    this.mIsMoving = false;
    this.mCanJump = false;

};

BlackHero.prototype.changeAnimation = function () {

    if (this.mHeroState !== this.mPreviousHeroState) {
        switch (this.mHeroState) {
            case BlackHero.eHeroState.eFaceLeft:
                this.mDye.setSpriteSequence(128, 0, 64, 128, 1, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case BlackHero.eHeroState.eFaceRight:
                this.mDye.setSpriteSequence(128, 0, 64, 128, 1, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case BlackHero.eHeroState.eRunLeft:
                this.mDye.setSpriteSequence(128, 64, 64, 128, 4, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(10);
                break;
            case BlackHero.eHeroState.eRunRight:
                this.mDye.setSpriteSequence(128, 64, 64, 128, 4, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(10);
                break;
            case BlackHero.eHeroState.eJumpLeft:
                this.mDye.setSpriteSequence(128, 320, 64, 128, 1, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
            case BlackHero.eHeroState.eJumpRight:
                this.mDye.setSpriteSequence(128, 320, 64, 128, 1, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
        }
    }

};

BlackHero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

BlackHero.prototype.canJump = function (b) {
    this.mCanJump = b;
};

BlackHero.prototype.getJumpBox = function () {
    return this.mJumpBox;
};
BlackHero.prototype.SetStatus = function(status){
    this.bullet_lib.SetStatus(status);
};
BlackHero.prototype.can_attack = function(){
    this.attack_status = true;
};
BlackHero.prototype.Add_Hp = function(Hp){
    this.mHp += Hp;
    if(this.mHp > 200)
    {
        this.mHp = 200;
    }
};


