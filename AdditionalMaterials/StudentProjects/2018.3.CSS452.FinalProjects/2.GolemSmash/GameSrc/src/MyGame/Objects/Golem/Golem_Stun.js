/* File: Golem_Stun.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Stuns the boss for a number of updates equal to the parameter.
 * 
 * @param {Number} time     Number of updates to hold the stun for.
 * @returns {undefined}
 */
Golem.prototype.stun = function (time) {
    this.mStunned = true;
    this.mStunTimeRemaining = time;
    this.mInterrupt = true;
};

/**
 * Update function for when the boss is stunned. We just decrement the
 * timer, and if it hits 0 we toggle off the stun variable.
 * 
 * @returns {undefined}
 */
Golem.prototype.updateStun = function () {
    this.mStunTimeRemaining--;
    if (this.mStunTimeRemaining <= 0) {
        this.mStunTimeRemaining = 0;
        this.mStunned = false;
    }
};