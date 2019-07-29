/* global gEngine */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, bulletTexture, atX, atY, mirror, faceLeft) {
    this.kJumpSound = "assets/Sound/jump.mp3";
    this.kBloodSound = "assets/Sound/blood.mp3";

    this.kWidth = 33.6;
    this.kHeight = 48;
    this.kMirror = mirror;
    this.kTex = spriteTexture;
    this.kRTex = "assets/EmptyActionR.png";

    this.mIsDead = false;
    this.mIsGoingLeft = false;
    this.mIsGoingUp = false;
    this.mIsGoingRight = false;

    this.mHoldSpace = 10;
    this.mJumpTime = 0;
    this.mInAir = true;
    this.mAirFrames = 0;
    this.mFacing = mirror;

    this.mControl = true;

    this.mHero = new SpriteRenderable(spriteTexture);
    if (mirror < 0)
        this.mHero.setTexture(this.kRTex);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(atX, atY);
    this.mHero.getXform().setSize(this.kWidth, this.kHeight);
    this.mHero.setElementPixelPositions(0, 56, 177, 256);
    if (faceLeft) {
        this.mFacing = -mirror;
        this.mHero.setElementPixelPositions(0, 56, 97, 175);
    }

    this.mTexLeft = 0;
    this.mTexDown = 177;
    this.mKeepMoving = 0;
    this.mIsShooting = 0;

    GameObject.call(this, this.mHero);

    this.mBulletSet = new BulletSet(bulletTexture, this.getXform().getPosition());

    this.kBOffset = 1.8;
    this.kBWidthDec = 16;
    this.mBLines = [];
    for (var i = 0; i < 4; i++) {
        this.mBLines[i] = new LineRenderable();
        this.mBLines[i].setColor([1, 1, 1, 1]);
    }

    this.mVP = new VProcessor(this.getXform(), -2300 * this.kMirror);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.cleanStatus = function (aCamera) {
    var cHeight = aCamera.getWCHeight();
    var cWidth = aCamera.getWCWidth();

    this.mIsDead = false;
//    if (this.mIsGoingUp) {
//        this.mIsGoingUp = false;
//        this.getXform().incYPosBy(-cHeight);
//    }
    if (this.mIsGoingLeft) {
        this.mIsGoingLeft = false;
        this.getXform().incXPosBy(cWidth);
    }
    if (this.mIsGoingRight) {
        this.mIsGoingRight = false;
        this.getXform().incXPosBy(-cWidth);
    }

    if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.Left) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mVP.setXV(0);
    }
    this.mBulletSet.clean();
}

Hero.prototype.drawBBox = function (aCamera) {
    var box = this.getBBox();
    this.mBLines[0].setFirstVertex(box.minX(), box.minY());
    this.mBLines[0].setSecondVertex(box.minX(), box.maxY());
    this.mBLines[1].setFirstVertex(box.minX(), box.maxY());
    this.mBLines[1].setSecondVertex(box.maxX(), box.maxY());
    this.mBLines[2].setFirstVertex(box.maxX(), box.maxY());
    this.mBLines[2].setSecondVertex(box.maxX(), box.minY());
    this.mBLines[3].setFirstVertex(box.maxX(), box.minY());
    this.mBLines[3].setSecondVertex(box.minX(), box.minY());

    for (var i = 0; i < 4; i++) {
        this.mBLines[i].draw(aCamera);
    }
};

Hero.prototype.getBBox = function () {
    var xform = this.getXform();
    var pos = xform.getPosition();
    var b = new BoundingBox(vec2.fromValues(pos[0] + this.kBOffset * this.mFacing, pos[1]), xform.getWidth() - this.kBWidthDec, xform.getHeight());
    return b;
};

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mBulletSet.draw(aCamera);
};

Hero.prototype.youDied = function () {
    if (this.mIsDead)
        return;

    this.mIsDead = true;
    this.mVP.setYV(0);
    this.mHero.setElementPixelPositions(112, 168, 17, 95);
    if (this.kMirror > 0)
        this.getXform().incRotationByDegree(-90);
    else
        this.getXform().incRotationByDegree(90);
    //this.getXform().incYPosBy(- (this.kHeight - this.kWidth * 0.89) / 2 * this.kMirror);
    gEngine.AudioClips.playACue(this.kBloodSound, 32);
};

Hero.prototype.setMirror = function (mirror) {
    this.kMirror = mirror;
    this.mVP.setYA(-2300 * this.kMirror);
};

Hero.prototype.setControl = function (control) {
    this.mControl = control;
};

Hero.prototype.getControl = function () {
    return this.mControl;
};

Hero.prototype.update = function () {
    if (!this.isVisible())
        return;
    if (this.mIsDead) {
        this.mVP.setXV(0);
        this.mVP.setAddV(0, 0);
        if (this.getXform().getPosition()[1] > -500 && this.getXform().getPosition()[1] < 500)
            this.mVP.update();
        return;
    }
    if (this.mIsGoingLeft || this.mIsGoingRight)
        return;

    if (this.mControl) {
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C) && this.mBulletSet.size() < 5) {
            this.mIsShooting = 9;
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            this.mFacing = -this.kMirror;
            this.mVP.setXV(-210 * this.kMirror);
        }
        if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Left)) {
            this.mVP.setXV(0);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            this.mFacing = this.kMirror;
            this.mVP.setXV(210 * this.kMirror);
        }
        if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Right)) {
            this.mVP.setXV(0);
        }

        var maxJump = gEngine.Mine.saveStatus.tribleJump ? 3 : 2;
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
            if (this.mAirFrames >= 3 && this.mJumpTime == 0)
                this.mJumpTime = 1;
            this.mJumpTime++;
            if (this.mJumpTime <= maxJump) {
                if (this.kMirror > 0)
                    gEngine.AudioClips.playACue(this.kJumpSound, 32);
            }
            else this.mHoldSpace = 0;
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space) && this.mHoldSpace > 0 && this.mJumpTime <= maxJump) {
            this.mHoldSpace--;
            if (this.mJumpTime == 1)
                this.mVP.setYV(580 * this.kMirror);
            else
                this.mVP.setYV(450 * this.kMirror);
        }
        if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
            this.mHoldSpace = 10;
        }
    }

    if (this.mInAir)
        this.mVP.setAddV(0, 0);

    this.mBulletSet.update(this.mFacing, this.mControl, this.kMirror);
    this.mVP.update();
    //console.log(this.mVP.mV);
    //console.log(this.getXform().getPosition()[0]);
    //console.log(this.getXform().getPosition()[1] - this.getXform().getHeight() / 2, this.mVP.mLastFrameV[1]);

    this.mKeepMoving++;
    if (this.mIsShooting > 0)
        this.mIsShooting--;
    if (this.mKeepMoving >= 5 * 6)
        this.mKeepMoving = 0;
    if (this.mVP.mV[0] === 0)
        this.mKeepMoving = 0;
    if (this.mFacing > 0)
        this.mTexDown = 177;
    else
        this.mTexDown = 97;

    this.mTexLeft = Math.floor(this.mKeepMoving / 5) * 56;
    if (this.mAirFrames >= 3) {
        if (this.mVP.mV[1] > 0)
            this.mTexLeft = 6 * 56;
        if (this.mVP.mV[1] < 0)
            this.mTexLeft = 8 * 56;
        if (Math.abs(this.mVP.mV[1]) <= 200)
            this.mTexLeft = 7 * 56;
        //console.log(Math.abs(this.mVP.mV[1]));
    }
    if (this.mIsShooting) {
        this.mTexDown = 17;
        if (this.mFacing > 0)
            this.mTexLeft = 0;
        else
            this.mTexLeft = 56;
    }

    if (this.kMirror > 0)
        this.mHero.setTexture(this.kTex);
    else
        this.mHero.setTexture(this.kRTex);
    this.mHero.setElementPixelPositions(this.mTexLeft, this.mTexLeft + 56, this.mTexDown, this.mTexDown + 78);
};