/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

DarkCreep.eDarkCreepState = Object.freeze({
    eStill: 0,
    eRunAway: 1,
    eRunTowards: 2,
    eWait: 3,
    eDie: 4
});

function DarkCreep(spriteTexture, normalMap, atX, atY, lgtSet, hero) {
    this.mHero = hero;
    this.kDelta = 0.1;
    this.kWidth = 2;
    this.kHeight = 8 / 3;
    this.originalXLoc = atX;
    this.originalYLoc = atY;
    this.mHitSound = "assets/Sounds/TotemLightHit.wav";
    
    this.kDetectThreshold = 10;
    this.kChaseThreshold = this.kDetectThreshold;
    
    this.mCurrentState = 0;
    this.mStateTimeClick = 0;

    if (normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }

    this.mDye.setColor([0, 0, 0, 1]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setZPos(1);
    this.mDye.getXform().setSize(this.kWidth, this.kHeight);

    this.mIsMoving = false;
    this.mCanJump = false;

    this.mDye.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mDye.setAnimationSpeed(15);         // show each element for mAnimSpeed updates  
    this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);


    this.mDye.addLight(lgtSet.getLightAt(2)); //jeb fix
    //this.mDye.addLight(lgtSet.getLightAt(3));
//    this.mDye.addLight(lgtSet.getLightAt(2));

    var transform = new Transform();
    transform.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(true);
    //this.setPhysicsComponent(this.mJumpBox);

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kWidth / 1.9, this.kHeight / 1.1);
    r.setMass(1);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);

}
gEngine.Core.inheritPrototype(DarkCreep, GameObject);

DarkCreep.prototype.update = function () {
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());

    if (this.mPhysicsComponent !== null) {
        this.mPhysicsComponent.update();
    }
    
    switch (this.mCurrentState) {
        case DarkCreep.eDarkCreepState.eStill: 
            this._still(this.mHero);
            break;        
        case DarkCreep.eDarkCreepState.eRunAway: 
            this._runAway(this.mHero);
            break;
        case DarkCreep.eDarkCreepState.eRunTowards:
            this._runTowards(this.mHero);
            break;
        case DarkCreep.eDarkCreepState.eWait:
            this._wait();
            break;
        case DarkCreep.eDarkCreepState.eDie:
            this._die();
            break;
    }
    
    //this.changeAnimation();
    this.mDye.updateAnimation();
};

DarkCreep.prototype.changeAnimation = function () {
//    if (this.mHeroState !== this.mPreviousHeroState) {
//        switch (this.mHeroState) {
//            case DarkCreep.eHeroState.eFaceLeft:
//                this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);
//                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(20);
//                break;
//            case DarkCreep.eHeroState.eFaceRight:
//                this.mDye.setSpriteSequence(1508, 0, 140, 180, 3, 0);
//                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(20);
//                break;
//            case DarkCreep.eHeroState.eRunLeft:
//                this.mDye.setSpriteSequence(1688, 0, 140, 180, 6, 0);
//                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(5);
//                break;
//            case DarkCreep.eHeroState.eRunRight:
//                this.mDye.setSpriteSequence(1688, 0, 140, 180, 6, 0);
//                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(5);
//                break;
//            case DarkCreep.eHeroState.eJumpLeft:
//                this.mDye.setSpriteSequence(2048, 0, 140, 180, 10, 0);
//                this.mDye.getXform().setSize(-this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(4);
//                break;
//            case DarkCreep.eHeroState.eJumpRight:
//                this.mDye.setSpriteSequence(2048, 0, 140, 180, 10, 0);
//                this.mDye.getXform().setSize(this.kWidth, this.kHeight);
//                this.mDye.setAnimationSpeed(4);
//                break;
//        }
//    }
};

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

DarkCreep.prototype.canJump = function (b) {
    this.mCanJump = b;
};

DarkCreep.prototype._distToHero = function(hero) {
    var toHero = [];
    vec2.subtract(toHero, hero.getXform().getPosition(), this.getXform().getPosition());
    return vec2.length(toHero);
};

DarkCreep.prototype.getJumpBox = function () {
    return this.mJumpBox;
};

DarkCreep.prototype._wait = function() {
    if(this.mStateTimeClick === 100) {
        this.mStateTimeClick = 0;
        this.mCurrentState = DarkCreep.eDarkCreepState.eStill;
    }
    else {
        this.mStateTimeClick += 1;
    }
};

DarkCreep.prototype._still = function(hero) {
    
    if (this._distToHero(hero) < this.kChaseThreshold) {
        // transition to chase!
        this.mCurrentState = DarkCreep.eDarkCreepState.eRunTowards;
        //this.mStateTimeClick = 0;
        this.mTargetPosition = hero.getXform().getPosition();
    }
    
    var curPos = this.mRenderComponent.getXform().getXPos();
    
    if(this.originalXLoc > (curPos + 5) || 
            this.originalXLoc < (curPos - 5)) {
        if(this.mStateTimeClick === 200) {
            //this.mRenderComponent.getXform().setPosition(this.originalXLoc, this.originalYLoc);
        }
        this.mStateTimeClick += 1;
    }
};

DarkCreep.prototype._runAway = function(hero) {
        if (this._distToHero(hero) > this.kChaseThreshold) {
        // Transition to cool down
        this.mCurrentState = DarkCreep.eDarkCreepState.eStill;
        this.mStateTimeClick = 0;
//        if(hero light on) {
//            this.mCurrentState = DarkCreep.eDarkCreepState.eRunAway;
//        }
    } else {
        var p = vec2.fromValues(0, 0);
        var dCreepXPos = this.mRenderComponent.getXform().getXPos();
        var heroXPos = this.mHero.getXform().getXPos();
                
        var collisionInfo = new CollisionInfo();
        var heroBox = this.mHero.getPhysicsComponent();
        var collided;
        collided = this.getPhysicsComponent().collided(heroBox, collisionInfo);

        // DarkCreep touches Hero
        if (collided) {
            if(heroXPos > dCreepXPos) {
                this.mHero.hitTaken(1);
            }
            else {
                this.mHero.hitTaken(-1);
            }
            //this.mHero.getHealthBar().decreaseBar();
            this.mCurrentState = DarkCreep.eDarkCreepState.eWait;
        } 
        // Chase hero
        else {
            if (this.mHero.getLight()) {
                if (heroXPos > dCreepXPos) {
                    this.mRenderComponent.getXform().incXPosBy(-.12);
                }
                else {
                    this.mRenderComponent.getXform().incXPosBy(.12);
                }
            } 
            else {
                this.mCurrentState = DarkCreep.eDarkCreepState.eRunTowards;
            }
        }
   }
   GameObject.prototype.update.call(this);
};

DarkCreep.prototype._runTowards = function(hero) {
    if (this._distToHero(hero) > this.kChaseThreshold) {
        // Transition to cool down
        this.mCurrentState = DarkCreep.eDarkCreepState.eStill;
        this.mStateTimeClick = 0;
//        if(hero light on) {
//            this.mCurrentState = DarkCreep.eDarkCreepState.eRunAway;
//        }
    } else {
        var p = vec2.fromValues(0, 0);
        var dCreepXPos = this.mRenderComponent.getXform().getXPos();
        var heroXPos = this.mHero.getXform().getXPos();
        
        
        var collisionInfo = new CollisionInfo();
        var heroBox = this.mHero.getPhysicsComponent();
        var collided;
        collided = this.getPhysicsComponent().collided(heroBox, collisionInfo);

        
        // DarkCreep touches Hero
        if (collided) {
            if(heroXPos > dCreepXPos) {
                this.mHero.hitTaken(1);
            }
            else {
                this.mHero.hitTaken(-1);
            }
            gEngine.AudioClips.playACue(this.mHitSound);
            //this.mHero.getHealthBar().decreaseBar();
            this.mCurrentState = DarkCreep.eDarkCreepState.eWait;
        } 
        // Chase hero
        else {
            if (!this.mHero.getLight()) {
                if (heroXPos > dCreepXPos) {
                    this.mRenderComponent.getXform().incXPosBy(.04);
                }
                else {
                    this.mRenderComponent.getXform().incXPosBy(-.04);
                }
            } 
            else {
                this.mCurrentState = DarkCreep.eDarkCreepState.eRunAway;
            }
        }
   }
   GameObject.prototype.update.call(this);
};

DarkCreep.prototype._die = function() {
    this.mRenderComponent.getXform().setPosition(100, 100);
};

DarkCreep.prototype._wait = function () {
    if (this.mStateTimeClick === 25) {
        this.mStateTimeClick = 0;
        this.mCurrentState = DarkCreep.eDarkCreepState.eDie;
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



