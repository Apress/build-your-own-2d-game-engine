/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, normalMap, atX, atY, lgtSet) {
    this.kDelta = 0.1;
    this.kWidth = 2;
    this.kHeight = 8 / 3;

    if (normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }

    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setZPos(1);
    this.mDye.getXform().setSize(this.kWidth, this.kHeight);

    this.mHeroState = Hero.eHeroState.eRunRight;
    this.mPreviousHeroState = Hero.eHeroState.eRunLeft;
    this.mIsMoving = false;
    this.mCanJump = false;

    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mDye.setAnimationSpeed(2.5);         // show each element for mAnimSpeed updates                               


    this.mDye.addLight(lgtSet.getLightAt(2)); //jeb fix
    //this.mDye.addLight(lgtSet.getLightAt(3));
//    this.mDye.addLight(lgtSet.getLightAt(2));

    var transform = new Transform();
    transform.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(true);
    //this.setPhysicsComponent(this.mJumpBox);

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kWidth / 1.9, this.kHeight / 1.1);
    r.setMass(0.7);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);

}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.eHeroState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});


Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);

    this.mJumpBox.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);

    // control by WASD
    var xform = this.getXform();
    this.mIsMoving = false;
    var v = this.getPhysicsComponent().getVelocity();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = Hero.eHeroState.eRunLeft;
            this.mIsMoving = true;
        }

        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = Hero.eHeroState.eRunRight;
            this.mIsMoving = true;
        }

        xform.incXPosBy(this.kDelta);
    }


    if (this.mCanJump === true) {
        if (this.mIsMoving === false) {
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === Hero.eHeroState.eRunRight || this.mHeroState === Hero.eHeroState.eJumpRight)
                this.mHeroState = Hero.eHeroState.eFaceRight;
            if (this.mHeroState === Hero.eHeroState.eRunLeft || this.mHeroState === Hero.eHeroState.eJumpLeft)
                this.mHeroState = Hero.eHeroState.eFaceLeft;
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
            v[1] = 35; // Jump velocity
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === Hero.eHeroState.eRunRight
                    || this.mHeroState === Hero.eHeroState.eFaceRight)
                this.mHeroState = Hero.eHeroState.eJumpRight;
            if (this.mHeroState === Hero.eHeroState.eRunLeft
                    || this.mHeroState === Hero.eHeroState.eFaceLeft)
                this.mHeroState = Hero.eHeroState.eJumpLeft;
            this.mIsMoving = true;
        }
    }

    this.changeAnimation();
    this.mDye.updateAnimation();
    this.mIsMoving = false;
    this.mCanJump = false;
    
};

Hero.prototype.changeAnimation = function () {
    if (this.mHeroState !== this.mPreviousHeroState) {
        switch (this.mHeroState) {
            case Hero.eHeroState.eFaceLeft:
                this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case Hero.eHeroState.eFaceRight:
                this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(20);
                break;
            case Hero.eHeroState.eRunLeft:
                this.mDye.setSpriteSequence(1688, 0, 140, 180, 6, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
            case Hero.eHeroState.eRunRight:
                this.mDye.setSpriteSequence(1688, 0, 140, 180, 6, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(5);
                break;
            case Hero.eHeroState.eJumpLeft:
                this.mDye.setSpriteSequence(2048, 0, 140, 180, 10, 0);
                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(4);
                break;
            case Hero.eHeroState.eJumpRight:
                this.mDye.setSpriteSequence(2048, 0, 140, 180, 10, 0);
                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
                this.mDye.setAnimationSpeed(4);
                break;
        }
    }
};

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

Hero.prototype.canJump = function (b) {
    this.mCanJump = b;
};

Hero.prototype.getJumpBox = function () {
    return this.mJumpBox;
};





