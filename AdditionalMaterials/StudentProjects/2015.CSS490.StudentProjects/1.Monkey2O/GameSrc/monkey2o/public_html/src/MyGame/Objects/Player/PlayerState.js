'use strict';

function PlayerState(center) {
  this.mCenter = new InterpolateVec2(center, PlayerState.constants.cycles, PlayerState.constants.rate);
  this.mState = PlayerState.constants.states.normal;
}

//------------------------------------------------------------------------------
PlayerState.constants = Object.freeze({
  cycles: 300, // number of cycles to complete the transition
  rate: 0.1,   // rate of change for each cycle
  states: Object.freeze({
    normal: 0,
    incapacitated: 1
  })
});

//------------------------------------------------------------------------------
PlayerState.prototype.getCenter = function() {
  return this.mCenter.getValue();
};

//------------------------------------------------------------------------------
PlayerState.prototype.setCenter = function(c) {
  this.mCenter.setFinalValue(c);
};

//------------------------------------------------------------------------------
PlayerState.prototype.update = function() {
  this.mCenter.updateInterpolation();
};

//------------------------------------------------------------------------------
PlayerState.prototype.configInterpolation = function (stiffness, duration) {
  this.mCenter.configInterpolation(stiffness, duration);
};

//------------------------------------------------------------------------------
PlayerState.prototype.setState = function(state) {
  this.mState = state;
};

//------------------------------------------------------------------------------
PlayerState.prototype.getState = function() {
  return this.mState;
};
