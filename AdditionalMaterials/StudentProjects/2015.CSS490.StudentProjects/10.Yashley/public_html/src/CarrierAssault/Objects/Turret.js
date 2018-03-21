/* File: Turret.js 
 *
 * Creates and initializes the Turret (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Turret(spriteTexture, atX, atY, lgtSet, planeList, backgroundRef, landRef, carrierRef) {
    this.kDelta = 0.1;
    this.kWidth = 2.3;
    this.kHeight = 1.3;
    this.kHealthDelta = 0;
    this.mBRef = backgroundRef;
    this.mLRef = landRef;
    this.mCarrierRef = carrierRef;
    //this.mTurret = new LightRenderable(spriteTexture);
    this.mTurret = new SpriteAnimateRenderable(spriteTexture);
    this.mTurret.setSpriteSequence(64, 0, // first element pixel position: top-left 64 is top of image, 0 is left of image
            85.33, 64, // widthxheight in pixels
            3, // number of elements in this sequence
            0);         // horizontal padding in between
    this.mTurret.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mTurret.setAnimationSpeed(5);
    this.mTurret.setColor([0, 0, 0, 0]);
    this.mColor = [1, 0, 0, 0];
    this.mTurret.getXform().setPosition(atX, atY);
    //this.mTurret.getXform().setZPos(1);
    this.mTurret.getXform().setSize(this.kWidth, this.kHeight);

    this.kSmoke = "assets/smoke_sprite.png";
    this.mSmoke = null;
    this.mSmokeList = [];
    this.mCounter = 0;

    this.mWasHit = false;
    this.mShot = false;





    this.mPlaneList = planeList; //list of planes to check through
    this.damage = false;
    //Health bar
    this.mHealth = new Renderable();
    this.mHealth.setColor([1, 0, 0, 1]);
    this.mHealth.getXform().setSize(2.5, 0.3);

    var transform = new Transform();
    transform.setPosition(this.mTurret.getXform().getXPos(), this.mTurret.getXform().getYPos() - this.kHeight / 2);

    GameObject.call(this, this.mTurret);
    var front = this.getCurrentFrontDir();
    front[0] = -1;
    front[1] = 0;

    this.mSpotLight = new Light();
    this.mSpotLight.setIntensity(0.5);
    this.mSpotLight.setLightType(2);
    this.mSpotLight.setDirection([-5, 1, -1]);
    this.mSpotLight.setColor([1, 1, 1, 1]);
    this.mSpotLight.setXPos(this.mTurret.getXform().getXPos());
    this.mSpotLight.setYPos(this.mTurret.getXform().getYPos());
    this.mSpotLight.setDirection([this.getCurrentFrontDir()[0], this.getCurrentFrontDir()[1], -1]);
    this.mSpotLight.setZPos(0);
    //UNCOMMENT LATER!!!
    this.mBRef.addLight(this.mSpotLight);
     this.mLRef.addLight(this.mSpotLight);
    this.mCarrierRef.addLight(this.mSpotLight);

    //this.mFlash1 = new TextureRenderable(shotTexture); 

    // this.mFlash2 = new TextureRenderable(shotTexture); 

    this.mIsVisible = true;


    this.mMiniMapRenderable = new Renderable();
    this.mMiniMapRenderable.setColor([1, 0, 0, 1]);

}
gEngine.Core.inheritPrototype(Turret, GameObject);

Turret.prototype.takeDamage = function () {
    this.damage = true;
    this.recover = false;
};

Turret.eTurretState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});


Turret.prototype.update = function () {
    this.mShot = false;
    this.mSpotLight.setDirection([this.getCurrentFrontDir()[0], this.getCurrentFrontDir()[1], -1]);


    while (this.mSmokeList.length != 0 && this.mSmokeList[0].destroy()) {
        gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mSmokeList[0]);
        this.mSmokeList.shift();
    }


    this.mTurret.getXform().cloneTo(this.mMiniMapRenderable.getXform());

    var kDelta = 0.15;
    GameObject.prototype.update.call(this);
    var pos = this.getXform().getPosition();
    // vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), .05)
    var dir = this.getCurrentFrontDir();

    this.mHealth.getXform().setPosition(this.mTurret.getXform().getXPos() + this.kHealthDelta,
            this.mTurret.getXform().getYPos() + 1.5);

    var min = 10;
    var index = 0;
    for (var i = 0; i < this.mPlaneList.length; i++) {
        var planePos = this.mPlaneList[i].getXform().getPosition();
        var turretPos = this.mTurret.getXform().getPosition();
        if (vec2.distance(planePos, turretPos) < min) {
            min = vec2.distance(planePos, turretPos);
            index = i;
        } else {

        }

    }
    if (min < 10) {
        this.mTurret.updateAnimation();
        this.mSmoke = new Smoke(this.kSmoke, this.mPlaneList[index].getXform().getXPos() + Math.random() - .5, this.mPlaneList[index].getXform().getYPos() + Math.random() - .5);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mSmoke);
        this.mSmokeList.push(this.mSmoke);

        this.mPlaneList[index].decHealth(0.0025);
        this.mShot = true;
        this.rotateObjPointTo(this.mPlaneList[index].getXform().getPosition(), 0.5);

    }
    if (this.getHealth() < 0) {

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
    this.mTurret.setColor(this.mColor);



};

Turret.prototype.getMiniMapRenderable = function () {
    return this.mMiniMapRenderable;
};

Turret.prototype.prepDestruction = function () {
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.miniMap, this.mMiniMapRenderable);
    for (var i = 0; i < this.mSmokeList.length; i++) {
        gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors, this.mSmokeList[i]);
        this.mSmokeList.splice(i, 1);
    }
};

Turret.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mHealth.draw(aCamera);
    //  this.mFlash1.draw(aCamera); 
    // this.mFlash2.draw(aCamera); 
    // this.mJumpBox.draw(aCamera);
};

Turret.prototype.getHealth = function () {
    return this.mHealth.getXform().getWidth();
};

Turret.prototype.decHealth = function (value) {
    this.mHealth.getXform().incWidthBy(-value);
    this.kHealthDelta -= value / 2;
};

Turret.prototype.getFrontDirection = function () {
    return this.getCurrentFrontDir();
};

Turret.prototype.getLight = function () {
    return this.mSpotLight;
};

Turret.prototype.wasHit = function () {
    return this.mWasHit;
};

Turret.prototype.didShoot = function () {
    return this.mShot;
};

Turret.prototype.damage = function (toDamage) {
    //this.mTurret.updateAnimation();
   // toDamage.decHealth(0.002);
   console.log("test"); 

}; 