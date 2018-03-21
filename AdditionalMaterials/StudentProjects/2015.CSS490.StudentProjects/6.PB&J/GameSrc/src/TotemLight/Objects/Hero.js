/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

function Hero(spriteTexture, atX, atY, lgtSet, healthBarTexture, lightBarTexture)
{
    this.kDelta = 0.1;
    this.kWidth = 2;
    this.kHeight = 2;
    this.mHeroLightOn = false;
    this.mHealthBar = new Bar(healthBarTexture,[1,0,0,1], 4, [-35,0], [3, 3], 0.5, lgtSet);
    this.mHealthBar.initialize();
    
    this.mLightBar = new LightBar(lightBarTexture, [0,0,1,1], 7, [0,0], [3,3], 0.5, lgtSet);
    this.mLightBar.initialize();
    this.mLightBar.setBarSize(4);
    
    this.mEnergyBar = new EnergyBar(healthBarTexture,[1,1,0,1], 20, [25,0], [3, 3], lgtSet);
    this.mEnergyBar.initialize();
    
    this.mStateTimeClick = 0;
    this.mLightTimeClick = 60 * 2;
    
    this.mHitTaken = false;
    this.mDir = 0;
    
    this.mLumi = new LightRenderable(spriteTexture);
    
    this.mLumi.setColor([1, 1, 1, 0]);
    this.mLumi.getXform().setPosition(atX, atY);
    this.mLumi.getXform().setZPos(1);
    this.mLumi.getXform().setSize(this.kWidth, this.kHeight);

    this.mHeroState = Hero.eHeroState.eRight;
    //this.mPreviousHeroState = Hero.eHeroState.e;
    this.mIsMoving = false;
    this.mCanJump = true;

    
    lgtSet.getLightAt(2).setLightTo(false);
    this.mLumi.addLight(lgtSet.getLightAt(2));
    
    var xform = new Transform();
    xform.setPosition(this.mLumi.getXform().getXPos(), this.mLumi.getXform().getYPos());
    
    this.mJumpBox = new RigidRectangle(xform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(false);
    
    GameObject.call(this, this.mLumi);
    
    var r = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    r.setMass(1.5);// 0.7
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(false);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);
    
    this.mLgt = lgtSet;
    this.mTimer = 0;
    
    this.mBossLevel = false;
};

gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.eHeroState = Object.freeze({
    eRight: 0,
    eLeft: 1,
    eJump: 2
    
});

Hero.prototype.update = function() 
{
    GameObject.prototype.update.call(this);
    
    this.mJumpBox.setPosition(this.mLumi.getXform().getXPos(), this.mLumi.getXform().getYPos() - this.kHeight / 2);
    
    var xform = this.getXform();
    this.mIsMoving = false;
    var v = this.getPhysicsComponent().getVelocity();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//        if (this.mCanJump === true) {
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = Hero.eHeroState.eLeft;
//            this.mIsMoving = true;
//        }

        xform.incXPosBy(-this.kDelta);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        if (this.mCanJump === true) {
           this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = Hero.eHeroState.eRight;
//            this.mIsMoving = true;
//        }

        xform.incXPosBy(this.kDelta);
    }
    
    //jumping logic
//    if(this.mCanJump === true)
//    {
//        if(this.mIsMoving === false)
//        {
//            this.mPreviousHeroState = this.mHeroState;
//            
//        }
//    }

//    if(this.mPreviousHeroState === this.mHeroState)
//    {
//        this.mCanJump = false;
//    }

    if(this.mCanJump === true)
    {
         if(gEngine.Input.isKeyClicked(gEngine.Input.keys.W))
        {
            if(this.mBossLevel)
            {
                v[1] = 21;
            }
            else
            {
                v[1] = 18;
            
            }
            //v[1] = 18;//jump velocity
            this.mPreviousHeroState = this.mHeroState;
            this.mHeroState = Hero.eHeroState.eJump;
            this.mIsMoving = true;

            //this.mCanJump = false;

        }       
    }
    
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        if(this.mEnergyBar.mDrawSize !== 0 && this.mBossLevel === true)
        {
            this.toggleLight();            
        }
        else if(this.mLightBar.mDrawSize !== 0)
        {
            this.toggleLight();            
        }  
    }
    
    if(this.mBossLevel === true)
    {
        this.mEnergyBar.update(); 
        
        if(this.mHeroLightOn === true)
        {
            this.mTimer += 4;
            if(this.mTimer > this.mLightTimeClick)
            {
                this.mEnergyBar.decreaseBar();
                this.mTimer = 0;

                if(this.mEnergyBar.mDrawSize === 0)
                {
                    this.toggleLight();
                }
            }
        }
        else {
            if(this.mEnergyBar.getBarSize() >= 0 && this.mEnergyBar.getBarSize() < 5) {
                this.mTimer += 2;
            }
            else if(this.mEnergyBar.getBarSize() >= 5 && this.mEnergyBar.getBarSize() < 15) {
                this.mTimer += 4;
            }
            else {
                this.mTimer += 8;
            }

            if(this.mTimer > this.mLightTimeClick)
            {
                this.mEnergyBar.increaseBar();
                this.mTimer = 0;
            }
        }

//        if(this.mHeroLightOn === true)
//        {
//            this.mEnergyBar.decreaseBar();
//
//            if(this.mEnergyBar.mDrawSize === 0)
//            {
//                this.toggleLight();
//            }
//        }
//        else {
//            this.mEnergyBar.increaseBar();
//        }
    }
    else
    {
        if(this.mHeroLightOn === true)
        {
                this.mLightBar.decreaseSize();
                if(this.mLightBar.mDrawSize === 0)
                {
                    this.toggleLight();
                }
        }
    }

    
    
    if(this.mHitTaken) {
        if(this.mStateTimeClick === 25) {
            this.mHitTaken = false;
            this.mStateTimeClick = 0;
        }
        else {
            this.mStateTimeClick += 1;
            this.mLumi.getXform().incXPosBy(this.mDir * 0.25);

            if(this.mStateTimeClick % 2 === 0) {
                this.mLumi.setColor([1,1,1,1]);
            }
            else {
                this.mLumi.setColor([1,1,1,0]);
            }
        }
    }

        
//    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
//    {
//        if(this.mLightBar.mDrawSize !== 0)
//        {
//            this.toggleLight();            
//        }        
//    }
    
//    if(this.mHeroLightOn === true)
//    {
//            this.mLightBar.decreaseSize();
//            if(this.mLightBar.mDrawSize === 0)
//            {
//                this.toggleLight();
//            }
//    }

    //this.changeAnimation();
    //this.mDye.updateAnimation();
    this.mIsMoving = false;
    this.mCanJump = false;
    
        
};

Hero.prototype.changeDir = function()
{
    if(this.mHeroState !== this.mPreviousHeroState)
    {
        switch(this.mHeroState)
        {
            case Hero.eHeroState.eLeft:

                break;
                
            case Hero.eHeroState.eRight:
                
                break;
                
            case Hero.eHeroState.eJump:
                
                break;
        }
    }
    
    
};

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mJumpBox.draw(aCamera);
};

Hero.prototype.canJump = function (b) {
    this.mCanJump = b;
};

Hero.prototype.getJumpBox = function () {
    return this.mJumpBox;
};

Hero.prototype.hitTaken = function (dir) {
    this.mHitTaken = true;
    this.mDir = dir;
    this.mHealthBar.decreaseBar();
};

Hero.prototype.toggleLight = function () {
    var lightOn = this.mLgt.getLightAt(2).isLightOn();
    this.mLgt.getLightAt(2).setLightTo(!lightOn);
    this.mHeroLightOn = !this.mHeroLightOn;
};

Hero.prototype.getLight = function () {
    return this.mHeroLightOn;
};

Hero.prototype.getHealthBar = function () {
    return this.mHealthBar;
};

Hero.prototype.getEnergyBar = function () {
    return this.mEnergyBar;
};

Hero.prototype.getLightBar = function() {
    return this.mLightBar;
};

Hero.prototype.decreaseHealthBar = function() {
    this.mHealthBar.decreaseBar();
};

Hero.prototype.decreaseLightBar = function() {
    this.mLightBar.decreaseBar();
};

//When hero is at boss level, this set to true
//default is false
Hero.prototype.isBossLevel = function(v)
{
    this.mBossLevel = v;
    this.mHealthBar.setTotalBarSize(9);
    this.mHealthBar.setBarSize(9);
    this.mHealthBar.initialize();
    var v = this.getPhysicsComponent().getVelocity();
    //v[1] = 25;
    
};




