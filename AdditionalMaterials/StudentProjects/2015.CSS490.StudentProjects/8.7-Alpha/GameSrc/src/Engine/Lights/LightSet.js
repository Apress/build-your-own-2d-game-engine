/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: LightSet.js 
 * 
 * This file defines the Light set object for store lights
 */

function LightSet() {
    this.mSet = [];
}

LightSet.prototype.numLights = function () {
    return this.mSet.length;
};

LightSet.prototype.getLightAt = function (index) {
    return this.mSet[index];
};

LightSet.prototype.addToSet = function (light) {
    this.mSet.push(light);
};
