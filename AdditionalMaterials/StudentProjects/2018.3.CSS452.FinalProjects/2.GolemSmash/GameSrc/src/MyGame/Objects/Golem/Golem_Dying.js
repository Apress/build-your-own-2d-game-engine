/* File: Golem_Dying.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Update function for the dying state. This is the state where the boss
 * has been defeated and we're waiting for the death animation to complete
 * before we move to the "dead" state.
 * 
 * @returns {undefined}
 */
Golem.prototype._serviceDying = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want to ignore collisions because we're dead.
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        // Still want to be visible for the animation.
        this.setVisibility(true);
        this._animate(Config.Golem.Animations.Death, true);
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // When death anim is complete we transition to the dead state.
    if (this._animationComplete()) {
        this.switchToState(Config.Golem.States.Dead);
    }
    
    // All we have to do is update the animation.
    this.mGolem.updateAnimation();
};

/**
 * Update function for the "dead" state of the Golem. Nothing happens.
 * 
 * @returns {undefined}
 */
Golem.prototype._serviceDead = function () {
    // Initialize state.
    if (this.mCurrentStateInitialized === false) {
        // We want to ignore collisions because we're dead.
        if (this.mIgnoreCollision === false) {
            this.ignoreCollision();
            this.mIgnoreCollision = true;
        }
        
        this.setVisibility(false);
        this.mStateStartTime = Date.now();
        this.mMiscTracker = Date.now();
        this.mCurrentStateInitialized = true;
    }
    
    // No functionality here. The boss is just dead. Could
    // set expired to true, but honestly doesn't matter currently.
};