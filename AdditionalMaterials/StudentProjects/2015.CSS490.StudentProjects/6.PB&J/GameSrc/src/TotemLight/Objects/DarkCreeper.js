"use strict";

function DarkCreeper(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;
    this.origX = atX;
    this.origY = atY;
    this.facingleft = true;
    
    this.mIsMoving = false;
    this.mCanJump = false;

    this.mNumCycles = 0;
    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);
    this.mRenderComponent.setColor([0, 0, 0, 0.8]);
    this.light.setIntensity(0);
    
    var transform = new Transform();
    transform.setPosition(this.mRenderComponent.getXform().getXPos(), 
                  this.mRenderComponent.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(true);
    
    GameObject.call(this, this.mRenderComponent);
    
    var r = new RigidRectangle(this.getXform(), this.kWidth / 1.9, this.kHeight / 1.1);
    r.setMass(0.7);// 0.7
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(DarkCreeper, Minion);

DarkCreeper.prototype.update = function () {
    //Minion.prototype.update.call(this);
    this.mJumpBox.setPosition(this.mRenderComponent.getXform().getXPos(), 
                this.mRenderComponent.getXform().getYPos() - this.kHeight / 2);

    switch (this.mCurrentState) {
        case DarkCreeper.eDarkCreeperState.eStill:
            this._still();
            break;
        case DarkCreeper.eDarkCreeperState.eChase:
            this._chase();
            break;
        case DarkCreeper.eDarkCreeperState.eWait:
            this._wait();
            break;
        case DarkCreeper.eDarkCreeperState.eReturnPos:
            this._returnPos();
            break;
        case DarkCreeper.eDarkCreeperState.eDie:
            this._die();
            break;
        case DarkCreeper.eDarkCreeperState.eJump:
            this._jump();
            break;
    }
};

DarkCreeper.eDarkCreeperState = Object.freeze({
    eStill: 0,
    eChase: 1,
    eWait: 2,
    eReturnPos: 3,
    eDie: 4,
    eJump: 5
});

DarkCreeper.prototype._still = function() {
    if (this._distToHero(this.mHero) < 10) {
        this.mCurrentState = DarkCreeper.eDarkCreeperState.eChase;
    }
};

DarkCreeper.prototype._chase = function() {
    var p = vec2.fromValues(0, 0);
    var dCreepXPos = this.mRenderComponent.getXform().getXPos();
    var heroXPos = this.mHero.getXform().getXPos();
        
    if (this.pixelTouches(this.mHero, p)) {
            if(heroXPos > dCreepXPos) {
                this.mHero.hitTaken(1);
            }
            else {
                this.mHero.hitTaken(-1);
            }
            this.mCurrentState = DarkCreeper.eDarkCreeperState.eWait;
        } 
        // Chase hero
        else {
            if(heroXPos > dCreepXPos) {
                this.mRenderComponent.getXform().incXPosBy(.04);
            }
            else {
                this.mRenderComponent.getXform().incXPosBy(-.04);
            }
        }
};

DarkCreeper.prototype._wait = function() {
        if(this.mStateTimeClick === 100) {
        this.mStateTimeClick = 0;
        this.mCurrentState = DarkCreeper.eDarkCreeperState.eStill;
    }
    else {
        this.mStateTimeClick += 1;
    }
};

DarkCreeper.prototype._returnPos = function() {
    
};

DarkCreeper.prototype._die = function() {
    
};

DarkCreeper.prototype._jump = function() {
    
};

