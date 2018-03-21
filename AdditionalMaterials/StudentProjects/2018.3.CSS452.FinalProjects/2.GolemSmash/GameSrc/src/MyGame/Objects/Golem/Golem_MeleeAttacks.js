/* File: Golem_MeleeAttacks.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Update for the Smashing state.
 * 
 * @returns {undefined}
 */
Golem.prototype._serviceSmashing = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want collisions if the boss is smashing
        if (this.mIgnoreCollision === true) {
            this.allowCollision();
            this.mIgnoreCollision = false;
        }
        
        // Because we know this is only called when the state is being initialized,
        // we need to reset the boolean tracker we have for whether or not the
        // smash attack has already hit.
        this.mCurrentSmashAttackHit = false;
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Smash, true);
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // Obviously need to be facing the hero to smash it.
    this.faceHero();

    // Only exit condition for this state is the boss being dead or the smash
    // being done. 
    if (this.mCurrentHP <= 0) {
        // If the Golem's HP has hit 0, it obviously needs to die.
        this.switchToState(Config.Golem.States.Dying);
    } else if (this._animationComplete()) {
        // Animation is done, switch back to the previous state.
        this.switchToState(this.mPreviousState);
    }    
    
    //this.interpolate();
    this.mGolem.updateAnimation();
};