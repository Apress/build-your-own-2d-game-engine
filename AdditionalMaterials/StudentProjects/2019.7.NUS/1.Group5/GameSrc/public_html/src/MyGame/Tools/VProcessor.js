/* global vec2 */

function VProcessor(xform, a) {
    this.mXform = xform;
    this.mA = vec2.fromValues(0, a);
    this.mV = vec2.fromValues(0, 0);
    this.mLastFrameV = vec2.fromValues(0, 0);
    
    this.mAddV = vec2.fromValues(0, 0);
    
    this.mMaxV = vec2.fromValues(10000, 10000);
    this.mMinV = vec2.fromValues(-10000, -10000);
}

VProcessor.prototype.update = function() {
    var dt = gEngine.GameLoop.getUpdateIntervalInSeconds();
    
    // update acceleration
    vec2.scaleAndAdd(this.mV, this.mV, this.mA, dt);
    if (this.mV[0] > this.mMaxV[0]) this.mV[0] = this.mMaxV[0];
    if (this.mV[1] > this.mMaxV[1]) this.mV[1] = this.mMaxV[1];
    if (this.mV[0] < this.mMinV[0]) this.mV[0] = this.mMinV[0];
    if (this.mV[1] < this.mMinV[1]) this.mV[1] = this.mMinV[1];
    
    // linear motion
    var p = this.mXform.getPosition();
    vec2.scaleAndAdd(p, p, this.mV, dt);
    vec2.scaleAndAdd(p, p, this.mAddV, dt);
    
    this.mLastFrameV[0] = (this.mV[0] + this.mAddV[0]) * dt;
    this.mLastFrameV[1] = (this.mV[1] + this.mAddV[1]) * dt;
};

VProcessor.prototype.setV = function(x, y) {
    this.mV = vec2.fromValues(x, y);
};

VProcessor.prototype.setAddV = function(x, y) {
    this.mAddV = vec2.fromValues(x, y);
}

VProcessor.prototype.setXV = function(x) {
    this.mV[0] = x;
};

VProcessor.prototype.setYV = function(y) {
    this.mV[1] = y;
};

VProcessor.prototype.cleanXV = function() {
    this.mV[0] = 0;
};

VProcessor.prototype.setXA = function(a) {
    this.mA[0] = a;
}

VProcessor.prototype.setYA = function(a){
    this.mA = vec2.fromValues(0, a);
};

VProcessor.prototype.cleanYV = function() {
    this.mV[1] = 0;
};