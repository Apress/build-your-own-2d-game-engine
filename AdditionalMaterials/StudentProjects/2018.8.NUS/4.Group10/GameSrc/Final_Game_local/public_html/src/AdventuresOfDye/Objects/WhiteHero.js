/* File: WhiteHero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WhiteHero(spriteTexture) {
    this.kDelta = 3;
    this.kWidth = 24;
    this.kHeight = 48;
    this.mHp = 200;
    this.mDye = new SpriteAnimateRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(650, 200);
    this.mDye.getXform().setZPos(1);
    this.mDye.getXform().setSize(this.kWidth, this.kHeight);

    this.mHeroState = WhiteHero.eHeroState.eRunRight;
    this.mPreviousHeroState = WhiteHero.eHeroState.eRunLeft;
    this.mIsMoving = false;
    this.mCanJump = false;
    /****************************************************///music
    this.Jump =  "assets/"+"jump.wav";
    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mDye.setAnimationSpeed(2);         // show each element for mAnimSpeed updates

    var transform = new Transform();
    transform.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    // this.mJumpBox.setDrawBounds(true);

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kWidth / 1.9, this.kHeight);
    r.setMass(0.7);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);
    
    /*****************************************///weapon
    this.direct = null;
    this.sGun = "assets/"+"gun_white.png";
    this.bullet_lib = new bullet_lib(this.sGun, this.getXform(), this.direct);
    
}
gEngine.Core.inheritPrototype(WhiteHero, GameObject);

WhiteHero.eHeroState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});

WhiteHero.prototype.update = function () {
    GameObject.prototype.update.call(this);

    this.mJumpBox.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    /*************************************///weapon
    this.bullet_lib.update_position(this.getXform(), this.direct);
    // control by WASD
    var xform = this.getXform();
    this.mIsMoving = false;
    var v = this.getPhysicsComponent().getVelocity();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)||gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = WhiteHero.eHeroState.eRunLeft;
            this.mIsMoving = true;
           this.direct = 1;
        }
        else {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = WhiteHero.eHeroState.eJumpLeft;
            this.direct = 1;
        }
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)||gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = WhiteHero.eHeroState.eRunRight;
            this.mIsMoving = true;
            this.direct = 0;
        }
        else {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = WhiteHero.eHeroState.eJumpRight;
            this.direct = 0;
        }
        xform.incXPosBy(this.kDelta);
    }


    if (this.mCanJump === true) {
        if (this.mIsMoving === false) {
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === WhiteHero.eHeroState.eRunRight || this.mHeroState === WhiteHero.eHeroState.eJumpRight)
                this.mHeroState = WhiteHero.eHeroState.eFaceRight;
            if (this.mHeroState === WhiteHero.eHeroState.eRunLeft || this.mHeroState === WhiteHero.eHeroState.eJumpLeft)
                this.mHeroState = WhiteHero.eHeroState.eFaceLeft;
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.I)||gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
            gEngine.AudioClips.playACue(this.Jump);
            v[1] = 500; // Jump velocity
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === WhiteHero.eHeroState.eRunRight
                || this.mHeroState === WhiteHero.eHeroState.eFaceRight)
                this.mHeroState = WhiteHero.eHeroState.eJumpRight;
            if (this.mHeroState === WhiteHero.eHeroState.eRunLeft
                || this.mHeroState === WhiteHero.eHeroState.eFaceLeft)
                this.mHeroState = WhiteHero.eHeroState.eJumpLeft;
            this.mIsMoving = true;
            this.mJumpSkip=true;
        }
    }
    /*********************************************///weapon
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.H))
    {
        this.bullet_lib.fire();
    }
    
    this.changeAnimation();
    this.mDye.updateAnimation();
    this.mIsMoving = false;
    this.mCanJump = false;

};

WhiteHero.prototype.changeAnimation = function () {
     if (this.mHeroState !== this.mPreviousHeroState) {
        switch (this.mHeroState) {
            case WhiteHero.eHeroState.eFaceLeft:
                this.mDye.setSpriteSequence(128, 0, 64, 128, 1, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case WhiteHero.eHeroState.eFaceRight:
                this.mDye.setSpriteSequence(128, 0, 64, 128, 1, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case WhiteHero.eHeroState.eRunLeft:
                this.mDye.setSpriteSequence(128, 64, 64, 128, 4, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(10);
                break;
            case WhiteHero.eHeroState.eRunRight:
                this.mDye.setSpriteSequence(128, 64, 64, 128, 4, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(10);
                break;
            case WhiteHero.eHeroState.eJumpLeft:
                this.mDye.setSpriteSequence(128, 320, 64, 128, 1, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
            case WhiteHero.eHeroState.eJumpRight:
                this.mDye.setSpriteSequence(128, 320, 64, 128, 1, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
        }
    }
};

WhiteHero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

WhiteHero.prototype.canJump = function (b) {
    this.mCanJump = b;
};

WhiteHero.prototype.getJumpBox = function () {
    return this.mJumpBox;
};
WhiteHero.prototype.SetStatus = function(status){
    this.bullet_lib.SetStatus(status);
};
WhiteHero.prototype.Add_Hp = function(Hp){
    this.mHp += Hp;
    if(this.mHp > 200)
    {
        this.mHp = 200;
    }
};


