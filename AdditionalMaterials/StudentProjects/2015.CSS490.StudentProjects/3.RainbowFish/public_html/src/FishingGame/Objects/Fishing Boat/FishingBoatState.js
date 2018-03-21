/*
 * @auth: Herbert Traut
 * @file: FishingBoatState.js
 * @date: 11-27-15
 * @brief: Interopation for the fishingboat
 */

function FishingBoatState(center) {
    this.kCycles = 300;  // number of cycles to complete the transition
    this.kRate = 0.1;  // rate of change for each cycle
    this.mCenter = new InterpolateVec2(center, this.kCycles, this.kRate);
}

// <editor-fold desc="Public Methods">
FishingBoatState.prototype.getCenter = function () { return this.mCenter.getValue(); };

FishingBoatState.prototype.setCenter = function (c) { this.mCenter.setFinalValue(c); };

FishingBoatState.prototype.updateFishingBoatState = function () {
    this.mCenter.updateInterpolation();
};

FishingBoatState.prototype.configInterpolation = function (stiffness, duration) {
    this.mCenter.configInterpolation(stiffness, duration);
};

FishingBoatState.prototype.isMoving = function () {
    return this.mCenter.getCyclesLeft() > 280;
};