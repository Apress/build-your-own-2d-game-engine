/* 
 * Hero.js
 * Creates and initializes the controllable Hero
 * Contains simple behaviors for Hero
 * 
 * By Steven Roberts and Tyler Green
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function Hero(texture, healthBar, normalMap, sound) {  
    //Create Hero
    if (normalMap === null) {
        this.mHero = new LightRenderable(texture);
    } else {
        this.mHero = new IllumRenderable(texture, normalMap);
    }
    
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(15, 50);
    this.mHero.getXform().setSize(5, 5);
    
    this.mHero.setAnimationSpeed(6);
    this.mHero.setSpriteSequence(64, 0, 18, 18, 6, 1);
    GameObject.call(this, this.mHero);
    
    this.kYDelta = 0.5; //Movement speed on y axis
    this.mSpinning = false;   //Animation State: Is the hero spinning?
    this.mDamaged = false;   //Animation State: Was recently damaged
    
    //Hero Life remaining. If depleted to 0, triggers scene change
    this.mHeroLife = healthBar;
//    this.mHeroLifeMax = 4;
//    this.mHeroLife = this.mHeroLifeMax;
//    
    //For tracking invulnerability frames (IFrames)
    this.mIsInvulnerable = false;
    this.mIFrames = 0;  //Set Iframe duration in hurtHeroLife function
    this.kIFrames = 120; //# of iFrames
    
    this.kGrunt = sound;
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.getHeroLife = function () {
    return this.mHeroLife.getLife();
};

//if outside source needs to know if hero has control
//true means hero is spinning, therefore has no control
Hero.prototype.isSpinning = function() {
    return this.mSpinning;
};

//For if hit by heal drone
Hero.prototype.heal = function (num) {
    this.mHeroLife.heal(num);
    if(this.mHeroLife > this.mHeroLifeMax) {
        this.mHeroLife = this.mHeroLifeMax;
    }
};

//For if hit by anything besides a heal drone
Hero.prototype.damage = function (num) {
    if (!this.mIsInvulnerable) {
        //Hero Damage calculations
        this.mHeroLife.damage(num);
        this.mIsInvulnerable = true;
        this.getRenderable().setColor([1, 0, 0, 0.4]);
        this.mIFrames = this.kIFrames;
        //Set Animation Frames to Damaged sequence
        this.mHero.setSpriteSequence(45, 0, 18, 18, 2, 1);
        this.mDamaged = true; //
        gEngine.AudioClips.playACue(this.kGrunt);
    }
};

//When hit by the bat: spin, and lose control
Hero.prototype.spin = function() {
    if(!this.mIsInvulnerable)
        this.mSpinning = true;
};

//Updates Hero status based on user keyboard inputs
Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mHero.updateAnimation();
    //Control using WASD (W and S here, A and D affect camera

    var heroXForm = this.getXform();
    if(this.mSpinning === false){
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            heroXForm.incYPosBy(this.kYDelta);
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            heroXForm.incYPosBy(-this.kYDelta);
        }
    } else {
        heroXForm.incRotationByDegree(-6);
    }
    //Verify if IFrames depelted. If no, deplete them. 
    if (this.mIFrames > 0){
        this.mIFrames--;
        //If half of I-frames gone, return to normal sprite sequence and regain control of character
        if(this.mIFrames <= this.kIFrames/2 && this.mDamaged){
            this.mSpinning = false;
            this.mDamaged = false;            
            this.mHero.setSpriteSequence(64, 0, 18, 18, 6, 1);            
        }
        if(this.mIFrames === 0) {
            this.mIsInvulnerable = false;
            this.getRenderable().setColor([1, 1, 1, 0]);
            heroXForm.setRotationInDegree(0);
        }
    }
};