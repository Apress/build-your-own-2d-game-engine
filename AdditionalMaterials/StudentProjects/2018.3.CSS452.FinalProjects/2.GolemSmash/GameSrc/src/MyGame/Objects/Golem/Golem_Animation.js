/* File: Golem_Animation.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteAnimateRenderable, vec2, Arrow, Platform, Config, Golem */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Initializes an animation for the Golem.
 * 
 * @param {Config.Golem.Animation}  animation   The animation to begin.
 * @param {Boolean}                 reset       Whether the previous animation should be reset.
 *                                              This should almost always be true.
 * @returns {undefined}
 */
Golem.prototype._animate = function (animation, reset) {
    // This for loop ensures we don't try to start any invalid animations. For the
    // animation parameter to be used, it has to match one of the defined animations
    // in the Config_Golem file.
    for (var animType in Config.Golem.Animations) {
        if (Config.Golem.Animations[animType] === animation) {
            // Set the animation properties.
            this.mGolem.setSpriteSequence(
                animation.TopLeftX,
                animation.TopLeftY,
                animation.Width,
                animation.Height,
                animation.Count,
                animation.Padding
            );
            this.mGolem.setAnimationType(animation.Type.call());
            this.mGolem.setAnimationSpeed(animation.Speed);
           
            // If the animation requires the Golem's rigidbodies to be adjusted
            // accordingly, we'll need to create a reference to the animation name
            // so we know which animation we're currently in the process of doing.
            if (animation.AnimateRigidbodies === true) {
                this.mCurrentRigidbodyAnimationSequenceReference = animation.Name;
            } else {
                this.mCurrentRigidbodyAnimationSequenceReference = null;
            }
            
            // We found our animation, no need to continue.
            break;
        }
    }
    
    // Reset the animation according to the parameter. This should be a given, but we have
    // a check incase something comes up where we wouldn't want this behavior.
    if (reset === true) {
        this.mGolem.resetAnimation();
    }
};

/**
 * Checks if the current animation has completed. This is called when a specific
 * animation requires a transition as soon as that animation completes. This does
 * not really apply to "swaying" animation types.
 * 
 * @returns {Boolean}
 */
Golem.prototype._animationComplete = function () {
    if (this.mGolem.mCurrentElm >= this.mGolem.mNumElems - 1) {
        return true;
    }
    return false;
};

/**
 * Forces the boss to face the hero .
 * 
 * @returns {undefined}
 */
Golem.prototype.faceHero = function () {
    var golemXform = this.mGolem.getXform();
    var heroXform = this.mHero.getXform();

    if (heroXform.getXPos() < golemXform.getXPos() && 
        this.mFacing === Config.Golem.States.FacingRight) {
        this.switchDirection();
    } else if (heroXform.getXPos() > golemXform.getXPos() &&
        this.mFacing === Config.Golem.States.FacingLeft) {
        this.switchDirection();
    }
};