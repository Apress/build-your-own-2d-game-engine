"use strict";

Archer.eAssets_1 = Object.freeze({
    eStandLeftTexture: "assets/archerNew/stand_left1.png",
    eStandRightTexture: "assets/archerNew/stand_right1.png",
    eWalkLeftTexture: "assets/archerNew/walk_left1.png",
    eWalkRightTexture: "assets/archerNew/walk_right1.png",
    eShootLeftTexture: "assets/archerNew/shoot_left1.png",
    eShootRightTexture: "assets/archerNew/shoot_right1.png"
});

Archer.eAssets_2 = Object.freeze({
    eStandLeftTexture: "assets/archerNew/stand_left2.png",
    eStandRightTexture: "assets/archerNew/stand_right2.png",
    eWalkLeftTexture: "assets/archerNew/walk_left2.png",
    eWalkRightTexture: "assets/archerNew/walk_right2.png",
    eShootLeftTexture: "assets/archerNew/shoot_left2.png",
    eShootRightTexture: "assets/archerNew/shoot_right2.png"
});

Archer.eArcherState = Object.freeze({
    eStandLeft: 0,
    eStandRight: 1,
    eWalkLeft: 2,
    eWalkRight: 3,
    eShootLeft: 4,
    eShootRight: 5
});

Archer.eDirection = Object.freeze({
    eLeft: new vec2.fromValues(-1, 0),
    eRight: new vec2.fromValues(1, 0),
});

function Archer(
    atX, atY, atW, atH,
    aAllObjs, aObstacle, aDestroyable, aProps,
    player, index
) {
    this.mPlayer = player;
    this.mHp = 10;

    // for jump and double jump
    this.mJumpRemain = 2;

    this.mAllObjs = aAllObjs;
    this.mObstacle = aObstacle;
    this.mDestroyable = aDestroyable;
    this.mProps = aProps;

    this.mIndex = index;
    // Animation Members
    if(!this.mIndex)
        this.mStandLeft = new SpriteRenderable(Archer.eAssets_1.eStandLeftTexture);
    else
        this.mStandLeft = new SpriteRenderable(Archer.eAssets_2.eStandLeftTexture);
    this.mStandLeft.setColor([1, 1, 1, 0]);
    this.mStandLeft.getXform().setPosition(atX, atY);
    this.mStandLeft.getXform().setSize(atW, atH);
    this.mStandLeft.setElementPixelPositions(0, 80, 48, 128);

    if(!this.mIndex)
        this.mWalkLeft = new SpriteAnimateRenderable(Archer.eAssets_1.eWalkLeftTexture);
    else
        this.mWalkLeft = new SpriteAnimateRenderable(Archer.eAssets_2.eWalkLeftTexture);
    this.mWalkLeft.setColor([1, 1, 1, 0]);
    this.mWalkLeft.getXform().setPosition(atX, atY);
    this.mWalkLeft.getXform().setSize(atW, atH);
    this.mWalkLeft.setSpriteSequence(128, 0, 80, 80, 7, 0);
    this.mWalkLeft.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mWalkLeft.setAnimationSpeed(10);
    
    if(!this.mIndex)
        this.mShootLeft = new SpriteAnimateRenderable(Archer.eAssets_1.eShootLeftTexture);
    else
        this.mShootLeft = new SpriteAnimateRenderable(Archer.eAssets_2.eShootLeftTexture);
    this.mShootLeft.setColor([1, 1, 1, 0]);
    this.mShootLeft.getXform().setPosition(atX, atY);
    this.mShootLeft.getXform().setSize(atW, atH);
    this.mShootLeft.setSpriteSequence(128, 0, 80, 80, 5, 0);
    this.mShootLeft.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mShootLeft.setAnimationSpeed(30);

    // Animation Members
    if(!this.mIndex)
        this.mStandRight = new SpriteRenderable(Archer.eAssets_1.eStandRightTexture);
    else
        this.mStandRight = new SpriteRenderable(Archer.eAssets_2.eStandRightTexture);
    this.mStandRight.setColor([1, 1, 1, 0]);
    this.mStandRight.getXform().setPosition(atX, atY);
    this.mStandRight.getXform().setSize(atW, atH);
    this.mStandRight.setElementPixelPositions(48, 128, 48, 128);
    
    if(!this.mIndex)
        this.mWalkRight = new SpriteAnimateRenderable(Archer.eAssets_1.eWalkRightTexture);
    else
        this.mWalkRight = new SpriteAnimateRenderable(Archer.eAssets_2.eWalkRightTexture);
    this.mWalkRight.setColor([1, 1, 1, 0]);
    this.mWalkRight.getXform().setPosition(atX, atY);
    this.mWalkRight.getXform().setSize(atW, atH);
    this.mWalkRight.setSpriteSequence(128, 464, 80, 80, 7, 0);
    this.mWalkRight.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mWalkRight.setAnimationSpeed(10);

    if(!this.mIndex)
        this.mShootRight = new SpriteAnimateRenderable(Archer.eAssets_1.eShootRightTexture);
    else
        this.mShootRight = new SpriteAnimateRenderable(Archer.eAssets_2.eShootRightTexture);
    this.mShootRight.setColor([1, 1, 1, 0]);
    this.mShootRight.getXform().setPosition(atX, atY);
    this.mShootRight.getXform().setSize(atW, atH);
    this.mShootRight.setSpriteSequence(128, 112, 80, 80, 5, 0);
    this.mShootRight.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mShootRight.setAnimationSpeed(30);

    GameObject.call(this, this.mStandRight);

    this.eCurrentState = Archer.eArcherState.eStandRight;
    this.setCurrentFrontDir(Archer.eDirection.eRight);
    
    //Physics
    var r;
    r = new RigidRectangle(this.getXform(), atW - 6, atH - 4);
    r.setInertia(0);
    r.setRestitution(0);
    this.setRigidBody(r);

    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(Archer, GameObject);

Archer.prototype.update = function (aCamera) {
    GameObject.prototype.update.call(this);

    var xform = this.getRenderable().getXform();
    this.mStandLeft.setXform(xform);
    this.mStandRight.setXform(xform);
    this.mWalkLeft.setXform(xform);
    this.mWalkRight.setXform(xform);
    this.mShootLeft.setXform(xform);
    this.mShootRight.setXform(xform);

    this.mStandLeft.getXform().setRotationInRad(0);
    this.mStandRight.getXform().setRotationInRad(0);
    this.mWalkLeft.getXform().setRotationInRad(0);
    this.mWalkRight.getXform().setRotationInRad(0);
    this.mShootLeft.getXform().setRotationInRad(0);
    this.mShootRight.getXform().setRotationInRad(0);

    this.mWalkLeft.updateAnimation();
    this.mShootLeft.updateAnimation();
    this.mWalkRight.updateAnimation();
    this.mShootRight.updateAnimation();

    var i;

    // for jump and double jump
    var v = this.getRigidBody().getVelocity();
    if (this.mJumpRemain < 2 && Math.abs(v[0]) <= 0.1 && Math.abs(v[1]) <= 0.84) {
        var pos = this.getXform().getPosition();
        var size = this.getXform().getSize();

        for (i = 0; i < this.mAllObjs.size(); i++) {
            var objPos = this.mAllObjs.getObjectAt(i).getXform().getPosition();
            var objSize = this.mAllObjs.getObjectAt(i).getXform().getSize();

            var obj = this.mAllObjs.getObjectAt(i);

            if (obj instanceof Archer) {
                if (pos[1] - objPos[1] <= 10.0 &&
                    pos[1] - objPos[1] >= 9.8 &&
                    pos[0] - objPos[0] <= (size[0] + objSize[0]) / 2 + 1.0 &&
                    pos[0] - objPos[0] >= -(size[0] + objSize[0]) / 2 - 1.0) {
                    this.mJumpRemain = 2;
                }
            }
            else {
                if (pos[1] - objPos[1] <= 6.4 &&
                    pos[1] - objPos[1] >= 6.2 &&
                    pos[0] - objPos[0] <= (size[0] + objSize[0]) / 2 + 1.0 &&
                    pos[0] - objPos[0] >= -(size[0] + objSize[0]) / 2 - 1.0) {
                    this.mJumpRemain = 2;
                }
            }
        }
    }

    var obj;
    var collisionInfo;
    for (i = 0; i < this.mDestroyable.size(); i++) {
        obj = this.mDestroyable.getObjectAt(i);
        collisionInfo = new CollisionInfo();
        if (this.getRigidBody().collisionTest(obj.getRigidBody(), collisionInfo)) {
            if (obj instanceof LifePotion) {
                this.addHp(obj.getRestore());
                this.mProps.removeFromSet(obj);
            }
            else if (obj instanceof Bow) {
                this.getMoreArm(obj.getArmNum(), obj.getArmAmount());
                this.mProps.removeFromSet(obj);
            }
            this.mDestroyable.removeFromSet(obj);
            this.mAllObjs.removeFromSet(obj);
            break;
        }
    }

};

Archer.prototype.draw = function (aCamera) {
    if (this.eCurrentState === Archer.eArcherState.eStandLeft)
        this.setRenderable(this.mStandLeft);
    else if (this.eCurrentState === Archer.eArcherState.eStandRight)
        this.setRenderable(this.mStandRight);
    else if (this.eCurrentState === Archer.eArcherState.eWalkLeft)
        this.setRenderable(this.mWalkLeft);
    else if (this.eCurrentState === Archer.eArcherState.eWalkRight)
        this.setRenderable(this.mWalkRight);
    else if (this.eCurrentState === Archer.eArcherState.eShootLeft)
        this.setRenderable(this.mShootLeft);
    else if (this.eCurrentState === Archer.eArcherState.eShootRight)
        this.setRenderable(this.mShootRight);

    GameObject.prototype.draw.call(this, aCamera);
};

var kWASDDelta = 0.3;
Archer.prototype.keyControl = function () {
    // Finite State Machine
    switch (this.eCurrentState) {
        case Archer.eArcherState.eShootLeft: {
            if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
                this.eCurrentState = Archer.eArcherState.eStandLeft;
                this.setCurrentFrontDir(Archer.eDirection.eLeft);
            }
            break;
        }
        case Archer.eArcherState.eShootRight: {
            if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
                this.eCurrentState = Archer.eArcherState.eStandRight;
                this.setCurrentFrontDir(Archer.eDirection.eRight);
            }
            break;
        }
        case Archer.eArcherState.eStandLeft: {
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C && this.mJumpCount === 0)) {
                this.eCurrentState = Archer.eArcherState.eShootLeft;
                this.setCurrentFrontDir(Archer.eDirection.eLeft);
            }
            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
                this.eCurrentState = Archer.eArcherState.eWalkLeft;
                this.setCurrentFrontDir(Archer.eDirection.eLeft);
            }
            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
                this.eCurrentState = Archer.eArcherState.eWalkRight;
                this.setCurrentFrontDir(Archer.eDirection.eRight);
            }
            else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
                this.jump();
            }
            break;
        }
        case Archer.eArcherState.eStandRight: {
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C) && this.mJumpCount === 0) {
                this.eCurrentState = Archer.eArcherState.eShootRight;
                this.setCurrentFrontDir(Archer.eDirection.eRight);
            }
            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
                this.eCurrentState = Archer.eArcherState.eWalkRight;
                this.setCurrentFrontDir(Archer.eDirection.eRight);
            }
            else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
                this.eCurrentState = Archer.eArcherState.eWalkLeft;
                this.setCurrentFrontDir(Archer.eDirection.eLeft);
            }
            else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
                this.jump();
            }

            break;
        }
        case Archer.eArcherState.eWalkLeft: {
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C && this.mJumpCount === 0)) {
                this.eCurrentState = Archer.eArcherState.eShootLeft;
                this.setCurrentFrontDir(Archer.eDirection.eLeft);
            }
            else if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
                this.eCurrentState = Archer.eArcherState.eStandLeft;
                this.setCurrentFrontDir(Archer.eDirection.eLeft);
            }
            else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
                this.jump();
            }
            break;
        }
        case Archer.eArcherState.eWalkRight: {
            if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C && this.mJumpCount === 0)) {
                this.eCurrentState = Archer.eArcherState.eShootRight;
                this.setCurrentFrontDir(Archer.eDirection.eRight);
            }
            else if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
                this.eCurrentState = Archer.eArcherState.eStandRight;
                this.setCurrentFrontDir(Archer.eDirection.eRight);
            }
            else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
                this.jump();
            }
            break;
        }
    }

    // move
    var xform = this.getXform();
    switch (this.eCurrentState) {
        case Archer.eArcherState.eWalkLeft: {
            xform.incXPosBy(-kWASDDelta);
            break;
        }
        case Archer.eArcherState.eWalkRight: {
            xform.incXPosBy(kWASDDelta);
            break;
        }
        case Archer.eArcherState.eStandLeft:
        case Archer.eArcherState.eStandRight:
        case Archer.eArcherState.eShootLeft:
        case Archer.eArcherState.eShootRight: {
            break;
        }
    }

    this.getRigidBody().userSetsState();
};

Archer.prototype.setToStand = function () {
    switch (this.eCurrentState) {
        case Archer.eArcherState.eShootLeft: {
            this.eCurrentState = Archer.eArcherState.eStandLeft;
            break;
        }
        case Archer.eArcherState.eShootRight: {
            this.eCurrentState = Archer.eArcherState.eStandRight;
            break;
        }
        case Archer.eArcherState.eStandLeft: {
            this.eCurrentState = Archer.eArcherState.eStandLeft;
            break;
        }
        case Archer.eArcherState.eStandRight: {
            this.eCurrentState = Archer.eArcherState.eStandRight;
            break;
        }
        case Archer.eArcherState.eWalkLeft: {
            this.eCurrentState = Archer.eArcherState.eStandLeft;
            break;
        }
        case Archer.eArcherState.eWalkRight: {
            this.eCurrentState = Archer.eArcherState.eStandRight;
            break;
        }
    }
};

Archer.prototype.getHp = function () {
    return this.mHp;
};
Archer.prototype.addHp = function (delta) {
    this.mHp += delta;
    if (this.mHp > 10)
        this.mHp = 10;
};
Archer.prototype.loseHp = function (delta) {
    this.mHp -= delta;
    if (this.mHp < 0)
        this.mHp = 0;
};

Archer.prototype.jump = function () {
    if (this.mJumpRemain > 0) {
        var velocity = this.getRigidBody().getVelocity();
        this.getRigidBody().setVelocity(velocity[0], 40);
        this.mJumpRemain--;
    }
};

Archer.prototype.getMoreArm = function (armNum, armAmount) {
    this.mPlayer.getMoreArm(armNum, armAmount);
};

Archer.prototype.getCurrentState = function () {
    return this.eCurrentState;
};

Archer.prototype.setCurrentState = function (state) {
    this.eCurrentState = state;
};


Archer.loadAssets = function () {
    gEngine.Textures.loadTexture(Archer.eAssets_1.eStandRightTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_1.eWalkRightTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_1.eShootRightTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_1.eStandLeftTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_1.eWalkLeftTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_1.eShootLeftTexture);

    gEngine.Textures.loadTexture(Archer.eAssets_2.eStandRightTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_2.eWalkRightTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_2.eShootRightTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_2.eStandLeftTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_2.eWalkLeftTexture);
    gEngine.Textures.loadTexture(Archer.eAssets_2.eShootLeftTexture);
};

Archer.unloadAssets = function () {
    gEngine.Textures.unloadTexture(Archer.eAssets_1.eStandRightTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_1.eWalkRightTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_1.eShootRightTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_1.eStandLeftTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_1.eWalkLeftTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_1.eShootLeftTexture);

    gEngine.Textures.unloadTexture(Archer.eAssets_2.eStandRightTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_2.eWalkRightTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_2.eShootRightTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_2.eStandLeftTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_2.eWalkLeftTexture);
    gEngine.Textures.unloadTexture(Archer.eAssets_2.eShootLeftTexture);
};