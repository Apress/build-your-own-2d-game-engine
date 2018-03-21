
"use strict";  // Operate in Strict mode such that variables must be declared before used!

Fish.prototype.getCurrentPos = function(){      // vec2
    return this.mFishObj.getXform().getPosition();
};

Fish.prototype.setIsHungry = function(val){
    this.mIsHungry = val;
};