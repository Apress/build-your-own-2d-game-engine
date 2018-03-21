"use strict";

function FishSeeker(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;
    this.origX = atX;
    this.origY = atY;
    this.facingleft = true;
    
    this.mHitSound = "assets/Sounds/TotemLightHit.wav";


    this.mNumCycles = 0;
    this.mSpotlight = this._createSpotLight(atX, atY, velocity);
    lightSet.addToSet(this.mSpotlight);
    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);
    this.mRenderComponent.setColor([0, 0, 0, 0.8]);
    this.light.setColor([0, 1, 0, 1]);

    this.origDirX = this.getCurrentFrontDir()[0];
    this.origDirY = this.getCurrentFrontDir()[1];
    
    this.setSpeed(0.05);

}
gEngine.Core.inheritPrototype(FishSeeker, Minion);

FishSeeker.prototype.update = function () {
    Minion.prototype.update.call(this);

    var p = [0, 0];
    p[0] = this.getXform().getXPos() + this.kOffset;
    p[1] = this.getXform().getYPos();
    this.mSpotlight.set2DPosition(p);

    switch (this.mCurrentState) {
        case FishSeeker.eFishSeekerState.ePatrol:
            this._patrol();
            break;
        case FishSeeker.eFishSeekerState.eChase:
            this._chase();
            break;
        case FishSeeker.eFishSeekerState.eWait:
            this._wait();
            break;
        case FishSeeker.eFishSeekerState.eColorChangeRed:
            this._colorToRed();
            break;
        case FishSeeker.eFishSeekerState.eColorChangeGreen:
            this._colorToGreen();
            break;
        case FishSeeker.eFishSeekerState.eDie:
            this._die();
            break;
        case FishSeeker.eFishSeekerState.eReturnPos:
            this._returnPos();
            break;
        case FishSeeker.eFishSeekerState.eGrowLight:
            this._growLight();
            break;
        case FishSeeker.eFishSeekerState.eShrinkLight:
            this._shrinkLight();
            break;
    }
};


FishSeeker.prototype._createSpotLight = function (atX, atY, velocity) {
    var lgt = new Light();
    lgt.setLightType(2);
    lgt.setColor([0, 1, 0, 1]);
    lgt.setXPos(atX - this.kOffset);
    lgt.setYPos(atY);
    lgt.setZPos(0.7);
    lgt.setDirection([-1, 0, -2]);
    lgt.setNear(15);
    lgt.setFar(15);
    lgt.setInner(0.1);
    lgt.setOuter(0.2);
    lgt.setIntensity(15);
    lgt.setDropOff(2);
    lgt.setLightCastShadowTo(true);
    return lgt;
};

FishSeeker.eFishSeekerState = Object.freeze({
    ePatrol: 0,
    eChase: 1,
    eColorChangeGreen: 2,
    eColorChangeRed: 3,
    eWait: 4,
    eReturnPos: 5,
    eDie: 6,
    eGrowLight: 7,
    eShrinkLight: 8
});

FishSeeker.prototype._returnPos = function () {

    if (this.mStateTimeClick === 25) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FishSeeker.eFishSeekerState.ePatrol;
        this.mSpotlight.setIntensity(5);
        this.mRenderComponent.setColor([0, 0, 0, .8]);
        this.mRenderComponent.getXform().setPosition(this.mInitialPosition[0],
                this.mInitialPosition[1]);                                      //////!!!!!!!!!!!! Horizontal
                this.mCurrentFrontDir = vec2.fromValues(1, 0);               ////////////// willl not return to orig verticle
    }
    else {
        this.mStateTimeClick += 1;
        if (this.mStateTimeClick % 2 === 0) {
            this.mRenderComponent.setColor([0, 1, 0, 1]);
        }
        else {
            this.mRenderComponent.setColor([0, 0, 1, 1]);
        }
    }
};

FishSeeker.prototype._patrol = function () {

    if (this.isHeroVisable() && this.mHero.getLight()) {
        // Transition to cool down
        this.mCurrentState = FishSeeker.eFishSeekerState.eColorChangeRed;
    }
    else {
        var s = vec2.fromValues(0, 0);
        vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
        var len = vec2.length(s);
        if (len > this.mMovementRange) {
            var f = this.getCurrentFrontDir();
            f[0] = -f[0];
            f[1] = -f[1];
            this.facingleft = !this.facingleft;
            //this.light.setXPos(this.mRenderComponent.getXform().getXPos() + this.kOffset);
        }
        var pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    }

};

FishSeeker.prototype._colorToRed = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FishSeeker.eFishSeekerState.eGrowLight;
        this.mSpotlight.setIntensity(0);
        this.light.setIntensity(1);
        
    }
    else {
        this.mSpotlight.incColor(0.02, -0.02, 0);
        this.mStateTimeClick += 1;
    }
};

FishSeeker.prototype._growLight = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FishSeeker.eFishSeekerState.eChase;
        this.mRenderComponent.setColor([0.8, 0.8, 0.8, 0]);
    }
    else {
        this.light.incColor(0.02, -0.02, 0);
        this.light.incFar(.2);
        this.mStateTimeClick += 1;
        var xf = this.getXform();
        if (this.mStateTimeClick % 2 === 0) {
            xf.incRotationByRad(-.2);
            this.mRenderComponent.setColor([1, 0, 0, 1]);
        }
        else {
            xf.incRotationByRad(.2);
            this.mRenderComponent.setColor([1, 0, 0, 0]);
        }
    }
};

FishSeeker.prototype._chase = function () {
    if (this._distToHero(this.mHero) > 12 /*|| !this.mHero.getLight()*/) {
        this.mCurrentState = FishSeeker.eFishSeekerState.eShrinkLight;
    }
    else {
        var p = vec2.fromValues(0, 0);
        var dCreepXPos = this.mRenderComponent.getXform().getXPos();
        var heroXPos = this.mHero.getXform().getXPos();
        
        
        //Joscelyn's code
        var collisionInfo = new CollisionInfo();
        var heroBox = this.mHero.getPhysicsComponent();
        var collided;
        collided = this.getPhysicsComponent().collided(heroBox, collisionInfo);

        if (collided) {
            if (heroXPos > dCreepXPos) {
                this.mHero.hitTaken(1);
            }
            else {
                this.mHero.hitTaken(-1);
            }
            gEngine.AudioClips.playACue(this.mHitSound);
            //this.mHero.getHealthBar().decreaseBar();
            this.mCurrentState = FishSeeker.eFishSeekerState.eWait;
        }
        else {
            this.mTargetPosition = this.mHero.getXform().getPosition();
            this.rotateObjPointTo(this.mTargetPosition, 0.05);
            var pos = this.getXform().getPosition();
            vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
        }
    }
};

FishSeeker.prototype.isHeroVisable = function () {
    var hPos = this.mHero.getXform().getPosition();
    var fsPos = this.mRenderComponent.getXform().getPosition();
    if (hPos[0] < fsPos[0] && hPos[0] > fsPos[0] - 11 &&
            hPos[1] < fsPos[1] + 2 && hPos[1] > fsPos[1] - 2) {
        return true;
    }
    return false;
};

FishSeeker.prototype.isHeroVisableRight = function () {
    var hPos = this.mHero.getXform().getPosition();
    var fsPos = this.mRenderComponent.getXform().getPosition();
    if (hPos[0] > fsPos[0] && hPos[0] < fsPos[0] + 11 &&
            hPos[1] < fsPos[1] + 2 && hPos[1] > fsPos[1] - 2) {
        return true;
    }
    return false;
};

FishSeeker.prototype._wait = function () {
    if (this.mStateTimeClick === 25) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FishSeeker.eFishSeekerState.eDie;
    }
    else {
        this.mStateTimeClick += 1;
        if (this.mStateTimeClick % 2 === 0) {
            this.mRenderComponent.setColor([1, 1, 1, 1]);
        }
        else {
            this.mRenderComponent.setColor([1, 0, 0, 1]);
        }
    }
};

FishSeeker.prototype._colorToGreen = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FishSeeker.eFishSeekerState.eReturnPos;
    }
    else {
        this.mSpotlight.incColor(-.02, .02, 0);
        this.mStateTimeClick += 1;
    }
};

FishSeeker.prototype._die = function () {
    this.mRenderComponent.getXform().setPosition(100, 100);
};

FishSeeker.prototype._shrinkLight = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FishSeeker.eFishSeekerState.eColorChangeGreen;
        this.mRenderComponent.setColor([0.8, 0.8, 0.8, 0]);
    }
    else {
        this.light.incColor(-0.02, +0.02, 0);
        this.light.incFar(-.2);
        this.mStateTimeClick += 1;
        var xf = this.getXform();
        if (this.mStateTimeClick % 2 === 0) {
            xf.incRotationByRad(-.2);
            this.mRenderComponent.setColor([0, 1, 0, 1]);
        }
        else {
            xf.incRotationByRad(.2);
            this.mRenderComponent.setColor([1, 0, 0, 0]);
        }
    }
};





