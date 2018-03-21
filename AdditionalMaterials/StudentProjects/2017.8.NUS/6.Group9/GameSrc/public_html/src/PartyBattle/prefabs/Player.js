/* 
 * File: Player.js
 * Created by phreeze Tang 24/7/2017
 * Defined player class.
 * 
 * change log:
 * 24/7/2017 create the file
 * 25/7/2017 add attack motion
 * 27/7/2017 different attack motion, cd time.
 */

/* global GameObject, gEngine */

"use strict";

function Player(
    avatarTexture, 
    armsTexture, 
    faceTexture, 
    grenadesPool,
    posX, posY,
    lRange, rRange,
    facingRight, 
    playerIndex
) { // character will facing right if facingRight === true
    this.kEggTexture = "assets/Egg.png";
    this.kCakeTexture = "assets/Cake.png";
    this.kMelonTexture = "assets/Melon.png";
    this.grenadesPool = grenadesPool;
    
    // key definations
    this.mKeysets = {
        up     : gEngine.Input.keys.W,
        down   : gEngine.Input.keys.S,
        left   : gEngine.Input.keys.A,
        right  : gEngine.Input.keys.D,
        skill1 : gEngine.Input.keys.T,
        skill2 : gEngine.Input.keys.Y,
        fire   : gEngine.Input.keys.J,
        ultra  : gEngine.Input.keys.Space
    };
    
    // player status
    this.sPlayerIndex = playerIndex;
    this.sHealth = null; // it should be guanteed that p1.h+p2.h = 100 (E.g.)
    this.sElevation = null; // angle
    this.sFacingRight = null; // whether player is facing right
    this.sEggCDTick = 0;
    this.sCakeCDTick = 0;
    this.sMelonCDTick = 0;
    this.sMelonRecoverTick = 0;
    this.sMaxEggCD = 45;
    this.sMaxCakeCD = 90;
    this.sMaxMelonCD = 120;
    this.sMaxMelonRecoverTime = 45;
    this.sLRange = lRange;
    this.sRRange = rRange;
    this.sFatigue = false;
    this.sShakeTime = 0;
    
    // status init
    if (facingRight) this.sFacingRight = 1;
    else this.sFacingRight = -1;
    
    // this.mPlayerAvatar = new SpriteRenderable(???);
    // this.mPlayerAvatar = new Renderable();
    // this.mPlayerAvatar.setColor([1.0, 0.0, 1.0, 1.0]);
    this.mPlayerAvatar = new SpriteRenderable(avatarTexture);
    this.mPlayerAvatar.setColor([1.0, 1.0, 1.0, 0.0]);
    this.mPlayerAvatar.getXform().setPosition(posX, posY);
    this.mPlayerAvatar.getXform().setSize(0.65, 2.0);
    if (facingRight) this.mPlayerAvatar.setElementPixelPositions(0, 21, 0, 64);
    else this.mPlayerAvatar.setElementPixelPositions(32, 53, 0, 64);
    GameObject.call(this, this.mPlayerAvatar);
    
    
    // this.mExpression = new SpriteRenderable(???);
    // this.mExpression = new Renderable();
    // this.mExpression.setColor([0.0, 1.0, 1.0, 1.0]);
    this.mExpression = new SpriteRenderable(faceTexture);
    this.mExpression.setColor([1.0, 1.0, 1.0, 0.0]);
    this.mExpression.getXform().setPosition(posX, posY + 0.7);
    this.mExpression.getXform().setSize(this.sFacingRight * 1.0, 1.0);
    this.mExpression.setElementUVCoordinate(0, 1, 0, 1);
    
    
    // this.mArms = new SpriteRenderable(???);
    // this.mArms = new Renderable();
    // this.mArms.setColor([0.6, 1.0, 0.3, 1.0]);
    this.mArms = new SpriteRenderable(armsTexture);
    this.mArms.setColor([1.0, 1.0, 1.0, 0.0]);
    this.mArms.getXform().setPosition(posX, posY + 0.1); // be careful with rotates
    this.mArms.getXform().setSize(2.0, this.sFacingRight * 0.7);
    this.mArms.setElementPixelPositions(0, 128, 0, 48);
    
    
    if (this.sFacingRight === 1) this.sElevation = 30.0;
    else this.sElevation = 180.0 - 30.0; // init shoot should be very close to each other. Guide.
    this.mArms.getXform().setRotationInDegree(this.sElevation);
};
gEngine.Core.inheritPrototype(Player, GameObject);


Player.prototype.setKeys = function (keySets) {
    this.mKeysets = {
        up     : keySets.up,
        down   : keySets.down,
        left   : keySets.left,
        right  : keySets.right,
        skill1 : keySets.skill1,
        skill2 : keySets.skill2,
        fire   : keySets.fire,
        ultra  : keySets.ultra
    };
};


Player.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mExpression.draw(aCamera);
    this.mArms.draw(aCamera);
};


Player.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.sMelonRecoverTick--;
    this.sEggCDTick--;
    this.sCakeCDTick--;
    this.sMelonCDTick--;
    
    if (this.sFatigue) {
        if (this.sShakeTime > 0) this.sShakeTime--;
        // change Icon
        
        // shake
        if ((this.sShakeTime <= 0) &&
           (gEngine.Input.isKeyClicked(this.mKeysets.up) ||
            gEngine.Input.isKeyClicked(this.mKeysets.down) ||
            gEngine.Input.isKeyClicked(this.mKeysets.left) ||
            gEngine.Input.isKeyClicked(this.mKeysets.right) ||
            gEngine.Input.isKeyClicked(this.mKeysets.skill1) ||
            gEngine.Input.isKeyClicked(this.mKeysets.skill2)
        )) {
            this.sShakeTime = 8;
        };
        
        if (this.sShakeTime > 0) if (this.sShakeTime % 2 === 0) {
            if ((this.sShakeTime / 2) % 2 === 0) {
                this.getXform().incXPosBy(0.2);
                this.mExpression.getXform().incXPosBy(0.2);
                this.mArms.getXform().incXPosBy(0.2);
            }
            else {
                this.getXform().incXPosBy(-0.2);
                this.mExpression.getXform().incXPosBy(-0.2);
                this.mArms.getXform().incXPosBy(-0.2);
            }    
        }
        
        return; 
    }
    
    // angle adjustment
    var deltaAngle = 1.5; // in degree
    if (this.sFacingRight === 1) {
        if (gEngine.Input.isKeyPressed(this.mKeysets.up)) {
            this.sElevation += deltaAngle;
            if (this.sElevation >= 90.0) this.sElevation = 90.0;
            this.mArms.getXform().setRotationInDegree(this.sElevation);
        }
        if (gEngine.Input.isKeyPressed(this.mKeysets.down)) {
            this.sElevation -= deltaAngle;
            if (this.sElevation <= -30.0) this.sElevation = -30.0; // it is not a mistake.
            this.mArms.getXform().setRotationInDegree(this.sElevation);
        }
    }
    else {
        if (gEngine.Input.isKeyPressed(this.mKeysets.up)) {
            this.sElevation -= deltaAngle;
            if (this.sElevation <= 90.0) this.sElevation = 90.0;
            this.mArms.getXform().setRotationInDegree(this.sElevation);
        }
        if (gEngine.Input.isKeyPressed(this.mKeysets.down)) {
            this.sElevation += deltaAngle;
            if (this.sElevation >= 210.0) this.sElevation = 210.0;
            this.mArms.getXform().setRotationInDegree(this.sElevation);
        }
    }

    // move action
    var deltaX = 0.1;
    if (gEngine.Input.isKeyPressed(this.mKeysets.left)) {
        this.getXform().incXPosBy(-deltaX);
        this.mExpression.getXform().incXPosBy(-deltaX);
        this.mArms.getXform().incXPosBy(-deltaX);
        if (this.getXform().getXPos() < this.sLRange) {
            this.getXform().setXPos(this.sLRange);
            this.mExpression.getXform().setXPos(this.sLRange);
            this.mArms.getXform().setXPos(this.sLRange);
        }
    }
    if (gEngine.Input.isKeyPressed(this.mKeysets.right)) {
        this.getXform().incXPosBy(deltaX);
        this.mExpression.getXform().incXPosBy(deltaX);
        this.mArms.getXform().incXPosBy(deltaX);
        if (this.getXform().getXPos() > this.sRRange) {
            this.getXform().setXPos(this.sRRange);
            this.mExpression.getXform().setXPos(this.sRRange);
            this.mArms.getXform().setXPos(this.sRRange);
        }
    }

    // fire in the hole
    // egg
    if (/*gEngine.Input.isKeyClicked(this.mKeysets.fire) && */this.sEggCDTick <= 0) {
        this.sEggCDTick = this.sMaxEggCD;
        var pos = this.getXform().getPosition();
        var tempG = new Grenade(
            this.kEggTexture, 
            pos[0], pos[1], 
            0.3,
            this.sElevation,
            this.sPlayerIndex,
            5,
            false
        );
        this.grenadesPool.addToSet(tempG);
    }
    // cake
    if (gEngine.Input.isKeyClicked(this.mKeysets.skill1) && this.sCakeCDTick <= 0) {
        this.sCakeCDTick = this.sMaxCakeCD;
        var pos = this.getXform().getPosition();
        var i, deltaAngle = 1.5;
        for (i = 0; i < 6; i++) {
            var tempG = new Grenade(
                this.kCakeTexture, 
                pos[0], pos[1], 
                0.3,
                this.sElevation + (i - 3) * deltaAngle,
                this.sPlayerIndex,
                5,
                false
            );
            this.grenadesPool.addToSet(tempG);
        }
    }
    // melon
    if (gEngine.Input.isKeyClicked(this.mKeysets.skill2) && this.sMelonCDTick <= 0) {
        this.sMelonCDTick = this.sMaxMelonCD;
        this.sMelonRecoverTick = this.sMaxMelonRecoverTime;
        var pos = this.getXform().getPosition();
        var tempG = new Grenade(
            this.kMelonTexture, 
            pos[0], pos[1], 
            0.8,
            this.sElevation, 
            this.sPlayerIndex, 
            7, 
            true
        );
        this.grenadesPool.addToSet(tempG);
    }
};