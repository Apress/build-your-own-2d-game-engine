/**
 * Created by MetaBlue on 11/30/15.
 */
// <editor-fold desc="Public Methods">

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function HeroGroupState(x, y) {
    this.kCycles = 300;  // number of cycles to complete the transition
    this.kRate = 0.1;  // rate of change for each cycle
    this.mXPos = new Interpolate(x, this.kCycles, this.kRate);
    this.mYPos = new Interpolate(y, this.kCycles, this.kRate);
}

HeroGroupState.prototype.getX = function () { return this.mXPos.getValue(); };
HeroGroupState.prototype.getY = function () { return this.mYPos.getValue(); };

HeroGroupState.prototype.setX = function (x) { this.mXPos.setAllValue(x); };
HeroGroupState.prototype.setY = function (y) { this.mYPos.setAllValue(y); };

HeroGroupState.prototype.shiftX = function (deltaX) { this.mXPos.setFinalValue(this.mXPos.getFinalValue() + deltaX); };
HeroGroupState.prototype.shiftY = function (deltaY) { this.mYPos.setFinalValue(this.mYPos.getFinalValue() + deltaY); };


HeroGroupState.prototype.update = function () {
    this.mXPos.updateInterpolation();
    this.mYPos.updateInterpolation();
};

HeroGroupState.prototype.configInterpolation = function (stiffness, duration) {
    this.mXPos.configInterpolation(stiffness, duration);
    this.mYPos.configInterpolation(stiffness, duration);
};

