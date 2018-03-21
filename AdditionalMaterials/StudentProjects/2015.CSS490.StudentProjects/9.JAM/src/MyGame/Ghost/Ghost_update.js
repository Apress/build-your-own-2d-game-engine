/* File: DyePack.js
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2, DyePack */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
// update states
Ghost.prototype.update = function(hero, aCamera) {
    switch (this.mCurrentState) {
        // wait before screen entry
        case Ghost.eGhostState.eWait:
            this._serviceWait(aCamera);
            break;
        // up or down
        case Ghost.eGhostState.eRising:
        case Ghost.eGhostState.eFalling:
            this._servicePatrolStates(hero);
            break;
        // dead flee
        case Ghost.eGhostState.eDied:
            this._serviceDied(hero);
            this._serviceFlee(hero, aCamera);
            break;
    }
};

// place dead texture at spot of live object
Ghost.prototype._serviceDied = function (hero) {
    var pos = this.getXform().getPosition();
    this.mDeadGhost.getXform().setPosition(pos[0], pos[1]);
};

// run across the screen to the right
Ghost.prototype._serviceFlee = function (hero, aCamera) {
    // remove projectile if exits the screen
    if (aCamera.collideWCBound(this.mDeadGhost.getXform(), 1.1) === BoundingBox.eboundCollideStatus.eOutside) {
        this.setExpired();
    }
    // hit hero on collision with ghost
    var p = vec2.fromValues(0, 0);
    if (this.pixelTouches(hero, p)) {
        hero.hitOnce();
    }
    // fly left at 60wc per second
    var fleeSpeed = 1;
    this.getXform().setXPos(this.getXform().getXPos() - fleeSpeed);
};

// distance from ghost to middle of the screen
Ghost.prototype._distToCam = function (aCamera) {
    return this.getXform().getXPos() - aCamera.getWCCenter()[0];
};

// sets ghost to wait until reaching the screen
Ghost.prototype._serviceWait = function (aCamera) {
    if (this._distToCam(aCamera) < aCamera.getWCWidth()/2) {
        this.mCurrentState = Ghost.eGhostState.eRising;
    }
};

//on collision hit both the hero and the ghost
Ghost.prototype._servicePatrolStates = function (hero) {
    // Check for collision
    var p = vec2.fromValues(0, 0);
    if (this.pixelTouches(hero, p)) {
        hero.hitOnce();
        this.hitOnce();
    }
    // Continue patrolling!
    if (this.mCurrentState === Ghost.eGhostState.eRising) this._serviceRising();
    else this._serviceFalling();
};

// go up
Ghost.prototype._serviceRising = function () {
    // Continue patrolling!
    var deltaY = 0.1;
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    this.getXform().setPosition(x, y + deltaY);
    this.mStateTimeTick++;

    if (this.mStateTimeTick > 60) {
        this.mStateTimeTick = 0;
        this.mCurrentState = Ghost.eGhostState.eFalling;
    }
};

// come down
Ghost.prototype._serviceFalling = function () {
    // Continue patrolling!
    var deltaY = -0.1;
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    this.getXform().setPosition(x, y + deltaY);
    this.mStateTimeTick++;

    if (this.mStateTimeTick > 60) {
        this.mStateTimeTick = 0;
        this.mCurrentState = Ghost.eGhostState.eRising;
    }
};