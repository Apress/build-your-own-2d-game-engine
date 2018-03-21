/* File: Minion.js 
 *
 * Creates and initializes a Minion object
 * overrides the update funciton of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Minion.eMinionType = Object.freeze({
    eDarkCreeper: 0,
    eFishSeeker: 1,
    eFinalBoss: 2
});

function Minion(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kDelta = 0.1;
    this.kWidth = w;
    this.kHeight = h;
    this.kSpeed = 0.075;
    
    this.mCurrentState = 0;
    this.mStateTimeClick = 0;
    
    this.kChaseThreshold = 10;

    this.mProjectiles = new ParticleGameObjectSet();
    this.mType = type;
    
    this.mHero = null;

    // control of movement
    this.mInitialPosition = vec2.fromValues(atX, atY);
    this.mMovementRange = movementRange;

    if (normal === null) {
        this.mMinion = new LightRenderable(texture);
    } else {
        this.mMinion = new IllumRenderable(texture, normal);
    }

    this.light = this._createPointLight(atX, atY);
    lightSet.addToSet(this.light);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mMinion.addLight(lightSet.getLightAt(i));
    }

    this.changeSprite(atX, atY);
    GameObject.call(this, this.mMinion);

    //velocity and movementRange will come later
    var size = vec2.length(velocity);
    if (size > 0.001) {
        this.setCurrentFrontDir(velocity);
        this.setSpeed(this.kSpeed);
    }

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(1);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation();
    this.mProjectiles.update();
    GameObject.prototype.update.call(this);

    if (this.mType === Minion.eMinionType.eDefault || this.mType === Minion.eMinionType.eFishSeeker) {
//        var s = vec2.fromValues(0, 0);
//        vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
//        var len = vec2.length(s);
//        if (len > this.mMovementRange) {
//            var f = this.getCurrentFrontDir();
//            f[0] = -f[0];
//            f[1] = -f[1];
//        }
        this.light.set2DPosition(this.getXform().getPosition());
    }
};

Minion.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

Minion.prototype.changeSprite = function (atX, atY) {
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(this.kWidth, this.kHeight);
    this.mMinion.getXform().setZPos(2);

    switch (this.mType) {
        case Minion.eMinionType.eDarkCreeper:
            this.mMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
            this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
            this.mMinion.setAnimationSpeed(20);
            break;
        case Minion.eMinionType.eFishSeeker:
            this.mMinion.setSpriteSequence(164, 489, 100, 164, 1, 0);
            this.mMinion.setAnimationSpeed(1);
            break;
        case Minion.eMinionType.eFinalBoss:
            this.mMinion.setSpriteSequence(164, 608, 90, 164, 1, 0);
            this.mMinion.setAnimationSpeed(1);
            break;
    }
};

Minion.prototype._createPointLight = function (atX, atY) {
    var lgt = new Light();
    lgt.setLightType(0);
    lgt.setColor([1, 1, 1, 1]);
    lgt.setXPos(atX);
    lgt.setYPos(atY);
    lgt.setZPos(1);
    lgt.setNear(10);
    lgt.setFar(2);
    lgt.setIntensity(.75);
    lgt.setDropOff(20);
    lgt.setLightCastShadowTo(true);
    return lgt;
};

Minion.prototype.getProjectiles = function () {
    return this.mProjectiles;
};

Minion.prototype.setHero = function (hero) {
    this.mHero = hero;
};


Minion.prototype._distToHero = function() {
    var toHero = [];
    vec2.subtract(toHero, this.mHero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

Minion.prototype.getMinion = function() { return this.mMinion;};

Minion.prototype.getType = function() {return this.mType;};
