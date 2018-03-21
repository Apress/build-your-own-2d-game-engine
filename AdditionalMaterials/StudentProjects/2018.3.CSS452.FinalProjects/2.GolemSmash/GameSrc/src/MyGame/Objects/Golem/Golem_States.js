/* File: Golem_States.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Update function for the Golem's state. It picks a state-specific update
 * function to call based on the mCurrentState variable.
 * 
 * @returns {undefined}
 */
Golem.prototype.updateState = function () {
    switch (this.mCurrentState) {
        case Config.Golem.States.WaitingToSpawn:
            this._serviceWaitingToSpawn();
            break;
        case Config.Golem.States.Spawning:
            this._serviceSpawning();
            break;
        case Config.Golem.States.Idle:
            this._serviceIdle();
            break;
        case Config.Golem.States.Patrolling:
            this._servicePatrolling();
            break;
        case Config.Golem.States.Smashing:
            this._serviceSmashing();
            break;
        case Config.Golem.States.Dying:
            this._serviceDying();
            break;
        case Config.Golem.States.Dead:
            this._serviceDead();
            break;
        default: console.log('Invalid Golem state');
            break;
    }
};

/**
 * Handles the mundane logic for transitioning out of a state.
 * 
 * @param {Config.Golem.States} state   State to switch to.
 * @returns {undefined}
 */
Golem.prototype.switchToState = function (state) {
    // Always reset the animation sequence reference, as having this set
    // to an incompatible value will absolutely ruin the hitboxes for the Golem.
    this.mCurrentRigidbodyAnimationSequenceReference = null;
    
    // Also, this is a great time to reset the Rigidbody offsets, so everything is
    // in a perfect condition when we initialize our new state.
    this.forceRigidbodyOffsetsBackToNormal();
    
    // Track the previous state. This is a variable used in some decision makaing
    // processes, as well as a way to return to a state if an interrupt-style event
    // occurred.
    this.mPreviousState = this.mCurrentState;
    this.mCurrentState = state;
    this.mCurrentStateInitialized = false;
};