/* global gEngine: false, GameObject: false, SpriteAnimateRenderable: false,
   vec2: false, BoundingBox: false */
"use strict";

function Hobbes(spriteSheet, posX, posY) {

    // Hit Points
    this.mHP = 3;
    
    this.damageTimer = null;
    this.mInvincible = false;
    
    this.mRen = new LightRenderable(spriteSheet);
    this.mRen.setColor([1, 1, 1, 0]);
    this.mRen.getXform().setPosition(posX, posY);
    var width = 20;
    var height = 20;
    this.mRen.getXform().setSize(width, height);
    this.mRen.setSpriteSequence(511, 0, 128, 128, 0, 0);
    this.mRen.setAnimationType(
        SpriteAnimateRenderable.eAnimationType.eAnimateRight
    );
    this.mRen.setAnimationSpeed(15);

    GameObject.call(this, this.mRen);
    
    // Rigid body
    // Width and height of rigid body
    var mainRBWidth = width / 2;
    var mainRBHeight = height;
    // Rigid body
    var mainRB = new RigidRectangle(this.getXform(), mainRBWidth, mainRBHeight);
    mainRB.setRestitution(0);
    this.addRigidBody(mainRB);
    
    // Bounding box: hitbox for collision with enemies
    this.mBoundBox = new BoundingBox(
        vec2.fromValues(posX, posY),
        width / 2,
        height
    );
    // Bounding box for floor collision
    var floorBBoxWidth = width - 14;
    var floorBBoxHeight = .15;
    this.mFloorBBox = new BoundingBox(
        vec2.fromValues(posX, posY - (height / 2)),
        floorBBoxWidth,
        floorBBoxHeight
    );
    
    // Status flags
    // Standing on a Platform (being "on the ground")
    this.mOnGround = false;
    this.mJumpTime = null;
    this.mNumJumps = 0;
    
    // Facing left or right
    this.eFacingStates = Object.freeze({
        left: 0,
        right: 1
    });
    this.mFacingState = this.eFacingStates.left;
    // Sprite states
    this.eSpriteStates = Object.freeze({
        standingLeft: 0,
        standingLeftWithSquirtGun: 1,
        standingLeftWithBalloon: 2,
        walkingLeft: 3,
        walkingLeftWithSquirtGun: 4,
        walkingLeftWithBalloon: 5,
        jumpingLeft: 6,
        jumpingLeftWithSquirtGun: 7,
        jumpingLeftWithBalloon: 8,
        standingRight: 9,
        standingRightWithSquirtGun: 10,
        standingRightWithBalloon: 11,
        walkingRight: 12,
        walkingRightWithSquirtGun: 13,
        walkingRightWithBalloon: 14,
        jumpingRight: 15,
        jumpingRightWithSquirtGun: 16,
        jumpingRightWithBalloon: 17
    });
    this.mSpriteState = this.eSpriteStates.standingLeft;
    this.mPrevSpriteState = null;

    // Keep track of squirt gun and balloon timing
    this.mFiredSquirtGun = false;
    this.mFiredBalloon = false;
    this.mFiredWeaponTime = 0;
    
    //Water balloon and timer
    this.mHasBalloon = true;
    this.balloonTimer = null;
    this.squirtGunTimer = 0;
}
gEngine.Core.inheritPrototype(Hobbes, GameObject);

Hobbes.prototype.getHealth = function () {
    return this.mHP;
};

Hobbes.prototype._setOnGroundState = function(platformSet) {
    for (var i = 0; i < platformSet.size(); ++i) {
        if (this.mFloorBBox.intersectsBound(platformSet.getObjectAt(i).getBBox())) {
            this.mOnGround = true;
            this.mNumJumps = 0;
            var velocity = this.mRigidBodies[0].getVelocity();
            velocity[1] = 0;
            return;
        }
    }
    // Test failed, not on a Platform
    this.mOnGround = false;
};

Hobbes.prototype._setSpriteState = function(
    facing, onGround, walking, firedSquirtGun, firedBalloon) {
    // Inner function
    var _this = this;
    var setState = function(state) {
        _this.mPrevSpriteState = _this.mSpriteState;
        _this.mSpriteState = state;
    };
    // Set state
    switch (facing) {
        case this.eFacingStates.left:
            if (onGround) {
                if (walking) {
                    if (firedSquirtGun) {
                        setState(this.eSpriteStates.walkingLeftWithSquirtGun);
                    }
                    else if (firedBalloon) {
                        setState(this.eSpriteStates.walkingLeftWithBalloon);
                    }
                    else {
                        setState(this.eSpriteStates.walkingLeft);
                    }
                }
                else {
                    if (firedSquirtGun) {
                        setState(this.eSpriteStates.standingLeftWithSquirtGun);
                    }
                    else if (firedBalloon) {
                        setState(this.eSpriteStates.standingLeftWithBalloon);
                    }
                    else {
                        setState(this.eSpriteStates.standingLeft);
                    }
                }
            }
            else {
                if (firedSquirtGun) {
                    setState(this.eSpriteStates.jumpingLeftWithSquirtGun);
                }
                else if (firedBalloon) {
                    setState(this.eSpriteStates.jumpingLeftWithBalloon);
                }
                else {
                    setState(this.eSpriteStates.jumpingLeft);
                }
            }
            break;
        case this.eFacingStates.right:
            if (onGround) {
                if (walking) {
                    if (firedSquirtGun) {
                        setState(this.eSpriteStates.walkingRightWithSquirtGun);
                    }
                    else if (firedBalloon) {
                        setState(this.eSpriteStates.walkingRightWithBalloon);
                    }
                    else {
                        setState(this.eSpriteStates.walkingRight);
                    }
                }
                else {
                    if (firedSquirtGun) {
                        setState(this.eSpriteStates.standingRightWithSquirtGun);
                    }
                    else if (firedBalloon) {
                        setState(this.eSpriteStates.standingRightWithBalloon);
                    }
                    else {
                        setState(this.eSpriteStates.standingRight);
                    }
                }
            }
            else {
                if (firedSquirtGun) {
                    setState(this.eSpriteStates.jumpingRightWithSquirtGun);
                }
                else if (firedBalloon) {
                    setState(this.eSpriteStates.jumpingRightWithBalloon);
                }
                else {
                    setState(this.eSpriteStates.jumpingRight);
                }
            }
            break;
    }
};

// Sets which sprite or animated sequence to use on the sprite sheet
Hobbes.prototype._setSprite = function() {
    // Don't set sprite if nothing has changed
    if (this.mSpriteState === this.mPrevSpriteState) {
        return;
    }
    switch (this.mSpriteState) {
        case this.eSpriteStates.standingLeft:
            this.mRen.setSpriteSequence(511, 0, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.standingLeftWithSquirtGun:
            this.mRen.setSpriteSequence(511, 511, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.standingLeftWithBalloon:
            this.mRen.setSpriteSequence(511, 255, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.walkingLeft:
            this.mRen.setSpriteSequence(511, 0, 128, 128, 2, 0);
            break;
        case this.eSpriteStates.walkingLeftWithSquirtGun:
            this.mRen.setSpriteSequence(511, 511, 128, 128, 2, 0);
            break;
        case this.eSpriteStates.walkingLeftWithBalloon:
            this.mRen.setSpriteSequence(511, 255, 128, 128, 2, 0);
            break;
        case this.eSpriteStates.jumpingLeft:
            this.mRen.setSpriteSequence(255, 0, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.jumpingLeftWithSquirtGun:
            this.mRen.setSpriteSequence(255, 511, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.jumpingLeftWithBalloon:
            this.mRen.setSpriteSequence(255, 255, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.standingRight:
            this.mRen.setSpriteSequence(383, 0, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.standingRightWithSquirtGun:
            this.mRen.setSpriteSequence(383, 511, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.standingRightWithBalloon:
            this.mRen.setSpriteSequence(383, 255, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.walkingRight:
            this.mRen.setSpriteSequence(383, 0, 128, 128, 2, 0);
            break;
        case this.eSpriteStates.walkingRightWithSquirtGun:
            this.mRen.setSpriteSequence(383, 511, 128, 128, 2, 0);
            break;
        case this.eSpriteStates.walkingRightWithBalloon:
            this.mRen.setSpriteSequence(383, 255, 128, 128, 2, 0);
            break;
        case this.eSpriteStates.jumpingRight:
            this.mRen.setSpriteSequence(255, 127, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.jumpingRightWithSquirtGun:
            this.mRen.setSpriteSequence(255, 639, 128, 128, 0, 0);
            break;
        case this.eSpriteStates.jumpingRightWithBalloon:
            this.mRen.setSpriteSequence(255, 383, 128, 128, 0, 0);
            break;
    }
};

Hobbes.prototype.registerDamage = function () {
    this.mHP--;
    this.damageTimer = Date.now();
    this.mInvincible = true;
    this.mRen.setColor([1, 0, 0, .5]);
};

Hobbes.prototype.update = function(
    platformSet, enemySet, 
    squirtGunShots, squirtGunShotSprite, waterBalloonSprite, hurtSFX) {
    // Check if Hobbes is on ground by checking collisions with Platforms
    this._setOnGroundState(platformSet);
    // Determine if Hobbes is walking
    var walking = false;
    // Left and right arrow keys for movement
    var delta = 0.5;
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-delta);
        if (this.mOnGround) {
            walking = true; 
        }
        this.mFacingState = this.eFacingStates.left;
    }
    else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(delta);
        if (this.mOnGround) {
            walking = true;
        }
        this.mFacingState = this.eFacingStates.right;
    }
    // Up arrow key for jump
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) &&
        (this.mOnGround || (!this.mOnGround && this.mNumJumps === 1))) {
        var velocity = this.mRigidBodies[0].getVelocity();
        velocity[1] = 45;
        this.mOnGround = false;
        this.mNumJumps++;
        this.mJumpTime = Date.now();
    }
    
    this.mRigidBodies[0].setAngularVelocity(0);
    GameObject.prototype.update.call(this);
    
    // Check for turning invincibility time over
    if(this.mInvincible) {
        var currentTime = Date.now();
        if(currentTime - this.damageTimer > 2000)   {
            this.mInvincible = false;
            this.mRen.setColor([1, 1, 1, 0]);
        }
    }
    
    for(var i = 0; i < enemySet.size(); i++) {
        if (this.pixelTouches(enemySet.getObjectAt(i), [])) {
            if (!this.mInvincible) {
                console.log(hurtSFX);
                gEngine.AudioClips.playACue(hurtSFX);
                this.registerDamage();
            }
            enemySet.getObjectAt(i).bounceBack();
        }
    }
    
    // Fire squirt gun shots
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {

        if(Date.now() - this.squirtGunTimer >= 150) {
            this.squirtGunTimer = Date.now();
            this.mFiredSquirtGun = true;
            this.mFiredBalloon = false;
            this.mFiredWeaponTime = Date.now();
            if (this.mFacingState === this.eFacingStates.left) {
                var xPos = this.getXform().getPosition()[0] - 10;
                var yPos = this.getXform().getPosition()[1] +
                    (this.getXform().getHeight() / 4);
                var shot = new SquirtGunShot(
                    squirtGunShotSprite, xPos, yPos, true);
                squirtGunShots.addToSet(shot);
            }
            else { // facing right
                var xPos = this.getXform().getPosition()[0] + 10;
                var yPos = this.getXform().getPosition()[1] +
                    (this.getXform().getHeight() / 4);
                var shot = new SquirtGunShot(
                    squirtGunShotSprite, xPos, yPos, false);
                squirtGunShots.addToSet(shot);
            }
        }
    }
    
    // Throw water balloon
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K))   {
        if(this.mHasBalloon) {
            this.mFiredBalloon = true;
            this.mFiredSquirtGun = false;
            this.mFiredWeaponTime = Date.now();
            if (this.mFacingState === this.eFacingStates.left) {
                var xPos = this.getXform().getPosition()[0] - 10;
                var yPos = this.getXform().getPosition()[1] +
                           (this.getXform().getHeight() / 4);
                var shot = new WaterBalloon(
                        waterBalloonSprite, xPos, yPos, true);
                squirtGunShots.addToSet(shot);
            }
            else { //facing right
                var xPos = this.getXform().getPosition()[0] + 10;
                var yPos = this.getXform().getPosition()[1] +
                           (this.getXform().getHeight() / 4);
                var shot = new WaterBalloon(
                        waterBalloonSprite, xPos, yPos, false);
                squirtGunShots.addToSet(shot);
            }
            this.balloonTimer = Date.now();
            this.mHasBalloon = false;
        }
    }
    
    // Check if Balloon is ready
    if(!this.mHasBalloon) {
        if(Date.now() - this.balloonTimer >= 3000) {
            this.mHasBalloon = true;
        }
    }
    
    // Update sprite state and sprite
    this._setSpriteState(
        this.mFacingState,
        this.mOnGround,
        walking,
        this.mFiredSquirtGun,
        this.mFiredBalloon
    );
    this._setSprite();
    this.mRen.updateAnimation();
    
    // Update weapon fire times for sprite updating
    if ((Date.now() - this.mFiredWeaponTime) > 500) {
        this.mFiredBalloon = false;
        this.mFiredSquirtGun = false;
        this.mFiredWeaponTime = 0;
    }
    
    // If Hobbes is falling, increase speed at a smooth rate
    // until you reach terminal velocity
    if(this.mOnGround === false && this.mJumpTime !== null) {
        xform.incYPosBy(((Date.now() - this.mJumpTime)/3000) * -1.3);
    }
    
    // Bounding boxes
    var position = xform.getPosition();
    this.mBoundBox.setPosition(position);
    var floorXpos = position[0];
    var floorYpos = position[1] - (xform.getHeight() / 2);
    this.mFloorBBox.setPosition(vec2.fromValues(floorXpos, floorYpos));
    
    // Return true if Hobbes is dead
    if (this.mHP <= 0) {
        return true;
    }
    else {
        return false;
    }
};