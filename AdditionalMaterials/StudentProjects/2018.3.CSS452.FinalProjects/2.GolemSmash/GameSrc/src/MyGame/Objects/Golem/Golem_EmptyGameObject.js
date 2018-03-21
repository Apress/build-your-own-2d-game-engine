/* File: Golem_EmptyGameObject.js 
 */

/*jslint node: true, vars: true */
/*global gEngine, EmptyGameObject, SpriteRenderable, vec2, Arrow, Platform, Config, IceArrow, Hero */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

/**
 * Constructor for the GolemEmptyGameObject. Each of these objects represents
 * a part of the Rigidbody set for the Golem class.
 * 
 * @param {Golem}   parent          The parent object this belongs to.
 * @param {float}   xOffset         X-offset form the center of the parent object.
 * @param {float}   yOffset         Y-offset from the center of the parent object.
 * @param {float}   multiplier      Damage multiplier for this part of the Golem.
 * @param {String}  bodyPart        Name of the body part this object represents.
 * @returns {GolemEmptyGameObject}
 */
function GolemEmptyGameObject(parent, xOffset, yOffset, multiplier, bodyPart) {
    this.mDamageMultiplier = multiplier;
    this.mIgnoreCollision = false;
    this.mBodyPart = bodyPart;
    EmptyGameObject.call(this, parent, xOffset, yOffset);
}
gEngine.Core.inheritPrototype(GolemEmptyGameObject, EmptyGameObject);

/**
 * Allows for user defined interactions between (this) and the parameter object.
 * Returning true skips the default Physics engine's handling of the collision.
 * 
 * This function cares specifically about collisions with Arrow objects and
 * the Hero.
 * 
 * @param {GameObject} other
 * @returns {Boolean}
 */
GolemEmptyGameObject.prototype.userCollisionHandling = function (other) {
    // We have a setting to always ignore collision.
    if (this.mIgnoreCollision === true) {
        return true;
    }
    
    // We don't ever want to process collisions with other GolemEmptyGameObject
    // instances, as this will ruin the arrangement of the rigidbodies.
    if (other instanceof GolemEmptyGameObject) {
        return true;
    }
    
    // Arrows can only collide one time, so check that early on.
    if (other instanceof Arrow) { 
        if (other.getCollided() === false) {
            // We've been hit by an arrow, so return the damage to the Golem
            // object.
            this.mParent.hit(other.getDamage() * this.mDamageMultiplier);
            
            // Ice arrows trigger a stun event for the Golem.
            if (other instanceof IceArrow) {
                this.mParent.stun(other.getEffectDuration());
            }
        }
    }
    
    // The only instance we care about special collisions with the Hero is
    // when the Golem is in the Smashing state and this object is a part
    //  of the fist the Golem uses to smash. If those conditions are all met,
    // trigger the smash event for the Golem.
    if (other instanceof Hero && 
        (this.mBodyPart === Config.Golem.Rigidbodies.RightHand.Name || 
        this.mBodyPart === Config.Golem.Rigidbodies.RightWrist.Name) && 
        this.mParent.getCurrentState() === Config.Golem.States.Smashing) {
        this.mParent.triggerSmashEvent(this);
    }
    
    // In all other cases, we want normal behavior to happen.
    return false;
};

/** 
 * Sets this object to ignore all collisions.
 * 
 * @returns {undefined}
 */
GolemEmptyGameObject.prototype.ignoreCollision = function () {
    this.mIgnoreCollision = true;
};

/**
 * Sets this object to not ignore collisions.
 * 
 * @returns {undefined}
 */
GolemEmptyGameObject.prototype.allowCollision = function() {
    this.mIgnoreCollision = false;
};

/**
 * Returns the name of the body part this object represents.
 * 
 * @returns {String}
 */
GolemEmptyGameObject.prototype.getBodyPart = function () {
    return this.mBodyPart;
};