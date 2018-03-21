/* File: Plane.js 
 *
 * Creates and initializes the Plane (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!



function Plane(spriteTexture, atX, atY, lgtSet, carrierTrans, enemyList, waypoint) {
    this.kDelta = 0.1;
    this.kWidth = 1.5;
    this.kHeight = 1;
    this.coolDown = 0;
    this.kBullet = "assets/bullet.png";
    this.kCrossHair = "assets/crosshair.png";
    this.kHealthDelta = 0;
    this.mCarrierRef = carrierTrans;
    this.mEnemyList = enemyList;
    this.mWaypoint = [];
    this.damage = false;
    this.recover = false;
    this.bulletList = [];
    this.mToShoot = false;
    this.lgtSet = lgtSet;
    this.mPlane = new LightRenderable(spriteTexture);
    this.mPlane.setColor([1, 1, 1, 0]);
    this.mPlane.getXform().setPosition(atX, atY);
    this.mTakeOff = false;
    //this.mPlane.getXform().setZPos(1);
    this.mPlane.getXform().setSize(this.kWidth, this.kHeight);
    this.mCrossHair = null;
    this.prevTarget = null;
    if (this.mCarrierRef == null) {
        this.mColor = [1, 0, 0, .5];
    }
    else {
        this.mColor = [1, 1, 1, 0];
    }
    //Health bar
    this.mHealth = new Renderable();
    this.mHealth.setColor([1, 0, 0, 1]);
    this.mHealth.getXform().setSize(2.5, 0.3);
    this.mWasHit = false;
    this.mShot = false;

    var transform = new Transform();
    transform.setPosition(this.mPlane.getXform().getXPos(), this.mPlane.getXform().getYPos() - this.kHeight / 2);


    GameObject.call(this, this.mPlane);
    var front = this.getCurrentFrontDir();
    front[0] = 1;
    front[1] = 0;

    this.mMiniMapRenderable = new Renderable();
    this.mMiniMapRenderable.setColor([0, 0, 1, 1]);

}
gEngine.Core.inheritPrototype(Plane, GameObject);

Plane.ePlaneState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});

Plane.prototype.pushWaypoint = function (wayToAdd) {
    this.mWaypoint.push(wayToAdd);
};

Plane.prototype.getWaypoint = function () {
    return this.mWaypoint;
};


Plane.prototype.update = function () {
    this.mTakeOff;
    this.mShot = false;
    var activeCount = 0;
    this.mPlane.getXform().cloneTo(this.mMiniMapRenderable.getXform());

    this.mHealth.getXform().setPosition(this.mPlane.getXform().getXPos() + this.kHealthDelta,
            this.mPlane.getXform().getYPos() + 1.5);
    if (this.mWaypoint.length === 0) {

        if (this.mCarrierRef !== null) {
            var deltaX = Math.pow(this.getXform().getPosition()[0] - this.mCarrierRef.getPosition()[0], 2);
            var deltaY = Math.pow(this.getXform().getPosition()[1] - this.mCarrierRef.getPosition()[1], 2);
            var targetPos = this.mCarrierRef.getPosition();
        }
        else {
            var deltaX = 100;
            var deltaY = 100;
            var targetPos = [0, 0];
        }
        var dist = Math.sqrt(deltaX + deltaY);

        for (var i = 0; i < this.mEnemyList.length; i++) {
            var deltaX = Math.pow(this.getXform().getPosition()[0] - this.mEnemyList[i].getXform().getPosition()[0], 2);
            var deltaY = Math.pow(this.getXform().getPosition()[1] - this.mEnemyList[i].getXform().getPosition()[1], 2);
            var tempDist = Math.sqrt(deltaX + deltaY);
            if (tempDist < dist) {
                targetPos = this.mEnemyList[i].getXform().getPosition();
                this.mToShoot = true;
                dist = tempDist;
            }
            else {

            }
        }
        if (this.prevTarget != null && (Math.abs(this.prevTarget[0] - targetPos[0]) > 1 || Math.abs(this.prevTarget[1] != targetPos[1]) > 1)) {
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mCrossHair);
            this.mCrossHair = null;
        }
        else if (this.mCrossHair != null)
        {
            this.mCrossHair.getXform().setPosition(targetPos[0], targetPos[1]);
        }

        this.mHealth.getXform().setPosition(this.mPlane.getXform().getXPos() + this.kHealthDelta,
                this.mPlane.getXform().getYPos() + 1.5);

        if (this.mCarrierRef != null && targetPos === this.mCarrierRef.getPosition() && dist < 3) {
            this.rotateObjPointAway(this.mCarrierRef.getPosition(), 1);
            if (this.mCrossHair != null) {

                gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mCrossHair);
                this.mCrossHair = null;

            }
        }
        else if (this.mCarrierRef != null && targetPos[0] == this.mCarrierRef.getPosition()[0] && targetPos[1] == this.mCarrierRef.getPosition()[1]) {
            this.rotateObjPointTo(this.mCarrierRef.getPosition(), 1);
            ///*
            if (this.mCrossHair != null) {

                gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mCrossHair);
                this.mCrossHair = null;


            }
            //*/
        }
        else {
            ///*
            if (this.mCrossHair == null) {
                this.mCrossHair = new CrossHair(this.kCrossHair, targetPos[0], targetPos[1]);
                gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mCrossHair);
            }
            //*/
            if (dist <= 4) {
                var pos = this.getXform().getPosition();
                var frontDir = this.getCurrentFrontDir();
                var movingRight = frontDir[0] > 0;
                var movingLeft = frontDir[0] < 0;
                var movingUp = frontDir[1] > 0;
                var movingDown = frontDir[0] < 0;
                if ((movingRight && pos[0] - targetPos[0] < 0 || movingUp > 0 && pos[1] - targetPos[1] < 0)
                        || (frontDir[0] < 0 && pos[0] - targetPos[0] > 0 && frontDir[1] < 0 && pos[1] - targetPos[1] > 0)) {


                    if (this.coolDown > 35) {
                        this.coolDown = 0;
                        this.mBullet = new Bullet(this.kBullet, this.getXform().getXPos(), this.getXform().getYPos(), this.lgtSet, targetPos);
                        this.bulletList.push(this.mBullet);
                        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mBullet);
                    }
                    else {
                        this.coolDown++;
                    }
                }
            }
            else {


                this.rotateObjPointTo(targetPos, 1);
            }
        }
        this.prevTarget = [targetPos[0], targetPos[1]];
    }
    else {
        var deltaX = Math.pow(this.getXform().getPosition()[0] - this.mWaypoint[0].getXform().getPosition()[0], 2);
        var deltaY = Math.pow(this.getXform().getPosition()[1] - this.mWaypoint[0].getXform().getPosition()[1], 2);
        var dist = Math.sqrt(deltaX + deltaY);
        if (dist < .1) {
            //this.mWaypoint[0].deactivate();
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mWaypoint[0]);
            this.mWaypoint.shift();
        }
        else {
            this.rotateObjPointTo(this.mWaypoint[0].getXform().getPosition(), 1);
        }
    }
    for (var i = 0; i < this.mEnemyList.length; i++) {
        if (this.bulletList.length != 0 && this.bulletList[0].getBBox().intersectsBound(this.mEnemyList[i].getBBox()
                || this.bulletList[0].destroy())) {
            this.mEnemyList[i].takeDamage();
            this.mEnemyList[i].decHealth(.15);
            this.mShot = true;
            //this.mShot = false;
            gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.bulletList[0]);
            this.bulletList.shift();

        }
    }
    if (this.damage) {
        this.mColor[3] += .1;
        if (this.mColor[3] > .80) {
            this.damage = false;
            this.recover = true;
        }

    }
    if (this.recover) {
        this.mColor[3] -= .1;
        if (this.mColor[3] < .1) {
            this.recover = false;
        }
    }
    this.mPlane.setColor(this.mColor);

    var pos = this.getXform().getPosition();

    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), 0.04);
};

Plane.prototype.takeDamage = function () {

    this.damage = true;
    this.recover = false;

}

Plane.prototype.prepDestruction = function () {
    for (var i = 0; i < this.mWaypoint.length; i++) {
        gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mWaypoint[i]);
    }
    this.mWaypoint.shift();
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mCrossHair);
    this.mCrossHair = null;
    //gEngine.LayerManager.removeFromLayer(gEngine.eLayer.miniMap, this.mMiniMapRenderable);
}

Plane.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mHealth.draw(aCamera);
    // this.mJumpBox.draw(aCamera);
};


Plane.prototype.getHealth = function () {
    return this.mHealth.getXform().getWidth();
};

Plane.prototype.decHealth = function (value) {
    this.mHealth.getXform().incWidthBy(-value);
    this.kHealthDelta -= value / 2;
};

Plane.prototype.getMiniMapRenderable = function () {
    return this.mMiniMapRenderable;
};

Plane.prototype.wasHit = function () {
    return this.mWasHit;
};

Plane.prototype.didShoot = function () {
    return this.mShot;
};

Plane.prototype.isPlane = function () {
    return true;
}; 