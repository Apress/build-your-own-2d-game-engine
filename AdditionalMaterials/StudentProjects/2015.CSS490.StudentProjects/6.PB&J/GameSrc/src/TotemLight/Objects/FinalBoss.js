"use strict";
FinalBoss.kReferencePosition = [
    [217, 13.5], // top-left
    [243, 13.5], // top-right
    [217, 8], // mid-left
    [243, 8], // mid-right
    [217, 3], // bot-left
    [243, 3], // bot-right
    [230, 8]    // middle
];

FinalBoss.eFinalBoss = Object.freeze({
    eGoTopLeft: 1,
    eGoTopRight: 2,
    eGoMidLeft: 3,
    eGoMidRight: 4,
    eGoBotLeft: 5,
    eGoBotRight: 6,
    eGoMid: 7,
    ePatrol: 0,
    eEnableBeam: 8,
    eWait: 9,
    eChase: 10,
    ePrepBeam: 11,
    eIncSize: 12,
    eDecSize: 13,
    eDropBoulder: 14,
    eShootLightning: 15,
    eLightningPrep: 16,
    eDie: 17,
    eChangeDifficulty: 18,
    eMakeDark: 19
});

function FinalBoss(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h, hero, camera) {
    this.KQuakeSound = "assets/Sounds/earthq.wav";

    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);
    this.kOffset = 4.7;
    this.kShootTimer = 90;
    this.origX = atX;
    this.origY = atY;
    this.facingleft = true;
    this.mHealthPoints = 100;
    this.mTargetPosition = vec2.fromValues(230, 8);
    this.initialize = false;
    this.mHero = hero;
    this.mCamera = camera;

    this.mDifficulty = [false, false, false];
    this.mSpeed = .1;
    this.mWaitDuration = 100;
    this.mInvulnarable = false;

    this.mBeamSet = new BeamSet(hero);
    this.mBoulderSet = new BoulderSet(hero);
    this.mLightningBolt = new LightningBolt(hero);
    this.mMakeDark = new MakeDark();

    this.mCurrentState = FinalBoss.eFinalBoss.ePatrol;
    this.mNumCycles = 0;
    
    this.mGlobalLght = 0.2;

    this.mLightningPrep = new LightningPrep(this);
    this.mHealthBar = new FinalBossHealth(this);
    this.mRenderComponent.setColor([0, 0, 0, 0.8]);

    this.mRenderComponent.getXform().setSize(1,1.5);
    
    this.light.setIntensity(0);

}
gEngine.Core.inheritPrototype(FinalBoss, Minion);

FinalBoss.prototype.update = function () {

    Minion.prototype.update.call(this);
    var i;
    this.mBeamSet.update();
    this.mBoulderSet.update();
    this.mLightningBolt.update();
    this.mLightningPrep.update();
    this.mHealthBar.update();
    this.mMakeDark.update();

    if(this.mHealthPoints === 74 && !this.mDifficulty[0]) {
        this.mCurrentState = FinalBoss.eFinalBoss.eChangeDifficulty;
        this.mDifficulty[0] = true;
    }
    else if (this.mHealthPoints === 50 && !this.mDifficulty[1]) {
        this.mCurrentState = FinalBoss.eFinalBoss.eChangeDifficulty;
        this.mDifficulty[1] = true;
    }
    else if (this.mHealthPoints === 24 && !this.mDifficulty[2]) {
        this.mCurrentState = FinalBoss.eFinalBoss.eChangeDifficulty;
        this.mDifficulty[2] = true;
    }
    

    if (this.mHealthPoints === 0) {
        this.mCurrentState = FinalBoss.eFinalBoss.eDie;
    }


    switch (this.mCurrentState) {
        case FinalBoss.eFinalBoss.ePatrol:
            this._servicePatrolStates();
            break;
        case FinalBoss.eFinalBoss.eWait:
            this._wait();
            break;
        case FinalBoss.eFinalBoss.eChase:
            this._chase();
            break;
        case FinalBoss.eFinalBoss.eEnableBeam:
            this._enableBeam();
            break;
        case FinalBoss.eFinalBoss.ePrepBeam:
            this._prepBeam();
            break;
        case FinalBoss.eFinalBoss.eIncSize:
            this._incSize();
            break;
        case FinalBoss.eFinalBoss.eDecSize:
            this._decSize();
            break;
        case FinalBoss.eFinalBoss.eDropBoulder:
            this._dropBoulder();
            break;
        case FinalBoss.eFinalBoss.eLightningPrep:
            this._lightningPrep();
            break;
        case FinalBoss.eFinalBoss.eShootLightning:
            this._shootLightning();
            break;
        case FinalBoss.eFinalBoss.eDie:
            this._die();
            break;
        case FinalBoss.eFinalBoss.eChangeDifficulty:
            this._changeDifficulty();
            break;
        case FinalBoss.eFinalBoss.eMakeDark:
            this._makeDark();
            break;

    }
};

FinalBoss.prototype._wait = function () {
    if (this.mStateTimeClick === this.mWaitDuration) {
        this.mStateTimeClick = 0;

        var rand = Math.random();
        if (rand <= .10 && rand >= 0) {
            this.mCurrentState = FinalBoss.eFinalBoss.eMakeDark;
        }
        else if (rand <= .35 && rand > .10) {
            this.mCurrentState = FinalBoss.eFinalBoss.ePrepBeam;
        }
        else if (rand <= .60 && rand > .35) {
            this.mCurrentState = FinalBoss.eFinalBoss.eLightningPrep;
        }
        else if (rand <= .85 && rand > .60) {
            this.mCurrentState = FinalBoss.eFinalBoss.eIncSize;
        }
        else {
            this.mCurrentState = FinalBoss.eFinalBoss.eChase;
        }

    }
    else {
        this.mStateTimeClick += 1;
    }
};

FinalBoss.prototype.draw = function (aCamera) {
    if (!this.initialize) {

        this.initialize = true;
    }
    GameObject.prototype.draw.call(this, aCamera);
    this.mBeamSet.draw(aCamera);
    this.mBoulderSet.draw(aCamera);
    this.mLightningBolt.draw(aCamera);
    this.mLightningPrep.draw(aCamera);
    this.mHealthBar.draw(aCamera);
};

FinalBoss.prototype._servicePatrolStates = function () {
    var toTarget = [];
    vec2.subtract(toTarget, this.mTargetPosition, this.getXform().getPosition());
    var d = vec2.length(toTarget);
    if (d > 1) {
        this.rotateObjPointTo(this.mTargetPosition, 0.1); // rotate rather quickly
    }
    else {
        this._computeNextState();
        this.mCurrentState = FinalBoss.eFinalBoss.eWait;
    }

    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());

};

FinalBoss.prototype._prepBeam = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FinalBoss.eFinalBoss.eEnableBeam;
        this.mRenderComponent.setColor([0, 0, 0, 0.8]);
/////////
//        if (this.mHealthPoints > 75) {
//            this.mBeamSet.setHitPoints(100);
//            this.mBeamSet.setWaitDur(this.mWaitDuration);
//        }
//        else if (this.mHealthPoints <= 75 && this.mHealthPoints > 50) {
//            this.mBeamSet.setHitPoints(75);
//            this.mBeamSet.setWaitDur(this.mWaitDuration);
//        }
//        else if (this.mHealthPoints <= 50 && this.mHealthPoints > 25) {
//            this.mBeamSet.setHitPoints(50);
//            this.mBeamSet.setWaitDur(this.mWaitDuration);
//        }
//        else if (this.mHealthPoints <= 25) {
//            this.mBeamSet.setHitPoints(25);
//            this.mBeamSet.setWaitDur(this.mWaitDuration);
//        }
/////////
    }
    else {
        if (this.mStateTimeClick % 2 === 0) {
            this.mRenderComponent.setColor([.5, 0, 0, 1]);
        }
        else {
            this.mRenderComponent.setColor([.6, 0, 0, 1]);
        }

        this.mStateTimeClick += 1;
    }
};

FinalBoss.prototype._incSize = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FinalBoss.eFinalBoss.eDecSize;
    }
    else {
        this.mRenderComponent.getXform().incHeightBy(.01);
        this.mRenderComponent.getXform().incWidthBy(.01);
        this.mRenderComponent.incColor(0.0109, 0.0054, 0.0039, 0);
        this.mStateTimeClick += 1;
    }
};

FinalBoss.prototype._decSize = function () {
    if (this.mStateTimeClick === 50) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FinalBoss.eFinalBoss.eDropBoulder;
        this.mRenderComponent.setColor([0, 0, 0, 0.8]);
    }
    else {
        this.mRenderComponent.getXform().incHeightBy(-.01);
        this.mRenderComponent.getXform().incWidthBy(-.01);
        this.mRenderComponent.incColor(-0.0109, -0.0054, -0.0039, 0);
        this.mStateTimeClick += 1;
    }
};

FinalBoss.prototype._computeNextState = function () {
    this.mCurrentState = this._getRandomState();

    var nextState = this._getRandomState();
    this.mTargetPosition = this._getRandomizedPosition(nextState);
};

FinalBoss.prototype._getRandomizedPosition = function (region) {
    var p = FinalBoss.kReferencePosition[region - 1];
    var x = p[0];
    var y = p[1];
    return vec2.fromValues(x, y);
};

FinalBoss.prototype._getRandomState = function () {
    var r = Math.random();
    var s;
    if (r < 0.15)
        s = FinalBoss.eFinalBoss.eGoTopLeft;
    else if (r < 0.30)
        s = FinalBoss.eFinalBoss.eGoTopRight;
    else if (r < 0.45)
        s = FinalBoss.eFinalBoss.eGoMidLeft;
    else if (r < 0.60)
        s = FinalBoss.eFinalBoss.eGoMidRight;
    else if (r < 0.75)
        s = FinalBoss.eFinalBoss.eGoBotLeft;
    else if (r < 0.90)
        s = FinalBoss.eFinalBoss.eGoBotRight;
    else
        s = FinalBoss.eFinalBoss.eGoMid;

    return s;
};

FinalBoss.prototype._chase = function () {
    this.mInvulnarable = true;
    if (this.mStateTimeClick === 400) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FinalBoss.eFinalBoss.ePatrol;
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mInvulnarable = false;
    }
    else {
        this.mStateTimeClick += 1;
        if (this.mStateTimeClick % 2 === 0) {
            this.mRenderComponent.setColor([.1, .1, .1, 1]);
        }
        else {
            this.mRenderComponent.setColor([1, 1, 0, 1]);
        }

        var p = vec2.fromValues(0, 0);

        if (this.pixelTouches(this.mHero, p)) {
            this.mCurrentState = FinalBoss.eFinalBoss.eWait;
            this.mInvulnarable = false;
            this.mStateTimeClick = 0;
            var dCreepXPos = this.mRenderComponent.getXform().getXPos();
            var heroXPos = this.mHero.getXform().getXPos();
            this.mRenderComponent.setColor([1, 1, 1, 0]);
            if (heroXPos > dCreepXPos) {
                this.mHero.hitTaken(1);
            }
            else {
                this.mHero.hitTaken(-1);
            }
        }

        this.mTargetPosition = this.mHero.getXform().getPosition();
        this.rotateObjPointTo(this.mTargetPosition, 0.05);
        var pos = this.getXform().getPosition();
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    }
};

FinalBoss.prototype._enableBeam = function () {
    this.mBeamSet.activate();
    this.mCurrentState = FinalBoss.eFinalBoss.ePatrol;
};

FinalBoss.prototype._dropBoulder = function () {
    this.mCamera.shake(-4, -4, 20, 30);
    gEngine.AudioClips.playACue(this.KQuakeSound);
    this.mBoulderSet.activate();
    this.mCurrentState = FinalBoss.eFinalBoss.ePatrol;
};

FinalBoss.prototype._shootLightning = function () {
    if (this.mHero.getLight()) {
        this.mLightningBolt.activate();
    }
    this.mCurrentState = FinalBoss.eFinalBoss.ePatrol;
};

FinalBoss.prototype._lightningPrep = function () {
    if (this.mStateTimeClick === this.mWaitDuration) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FinalBoss.eFinalBoss.eShootLightning;
    }
    else {
        this.mStateTimeClick += 1;
    }
    this.mLightningPrep.activate();
};

FinalBoss.prototype._die = function () {
    if (this.mStateTimeClick === 600) {
        this.mStateTimeClick = 0;
        this.mCurrentState = 30;
        //gEngine.DefaultResources.setGlobalAmbientIntensity(0);
        this.mHealthPoints = -100;
    }
    else {
        this.mRenderComponent.getXform().setPosition(100, 100);
        this.mStateTimeClick += 1;
        gEngine.DefaultResources.setGlobalAmbientIntensity(this.mGlobalLght);
        this.mGlobalLght += 0.001;
    }
};

FinalBoss.prototype._changeDifficulty = function () {
    this.mInvulnarable = true;
    if (this.mStateTimeClick === 300) {
        this.mStateTimeClick = 0;
        this.mCurrentState = FinalBoss.eFinalBoss.eWait;
        this.mInvulnarable = false;
        this.mRenderComponent.setColor([0, 0, 0, 0.8]);
        this.mRenderComponent.getXform().setSize(1,1.5);

//        if (this.mHealthPoints === 100) {
//        this.mWaitDuration = 200;
//        this.mBeamSet.setWaitDur(this.mWaitDuration);
//        this.mBeamSet.setHitPoints(100);
//        this.mBoulderSet.setHitPoints(100);
//        this.mSpeed = .1;
//    }
        if (this.mHealthPoints <= 75 && this.mHealthPoints > 50) {
            this.mWaitDuration = 100;
            this.mBeamSet.setWaitDur(this.mWaitDuration);
            this.mBeamSet.setHitPoints(75);
            this.mBoulderSet.setHitPoints(75);
            this.mSpeed = .125;
            this.mMakeDark.setDur(300);
        }
        else if (this.mHealthPoints <= 50 && this.mHealthPoints > 25) {
            this.mWaitDuration = 75;
            this.mBeamSet.setWaitDur(this.mWaitDuration);
            this.mBeamSet.setHitPoints(50);
            this.mBoulderSet.setHitPoints(50);
            this.mSpeed = .15;
            this.mMakeDark.setDur(400);
        }
        else if (this.mHealthPoints <= 25) {
            this.mWaitDuration = 50;
            this.mBeamSet.setWaitDur(this.mWaitDuration);
            this.mBeamSet.setHitPoints(25);
            this.mBoulderSet.setHitPoints(25);
            this.mSpeed = .175;
            this.mMakeDark.setDur(500);
        }
    }
    else {
        if(this.mStateTimeClick % 4 === 0) {
            this.mRenderComponent.setColor([1,0.4,0,1]);
        }
        else {
            this.mRenderComponent.setColor([0, 0, 0, 0.8]);
        }
        if(this.mStateTimeClick < 150) {
            this.mRenderComponent.getXform().incHeightBy(.01);
            //this.mRenderComponent.getXform().incRotationByDegree(10);
        }
        else {
            this.mRenderComponent.getXform().incHeightBy(-.01);
            //this.mRenderComponent.getXform().incRotationByDegree(-10);
        }
        this.mStateTimeClick += 1;
    }
};

FinalBoss.prototype.getHealth = function () {
    return this.mHealthPoints;
};

FinalBoss.prototype.decHealth = function () {
    if (!this.mInvulnarable) {
        if (this.mHealthPoints !== 0) {
            this.mHealthPoints -= 1;
        }
    }
};

FinalBoss.prototype.getInvulnarable = function () {
    return this.mInvulnarable;
};

FinalBoss.prototype.activateBeams = function () {
    this.mBeamSet.initActivateBeams();
};

FinalBoss.prototype._makeDark = function () {
    this.mCurrentState = FinalBoss.eFinalBoss.ePatrol;
    this.mMakeDark.activate();
};

